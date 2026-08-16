import React, { useState, useMemo, useEffect } from 'react';
import { ZahraUser, StageId, DomainId } from '../types';
import { STAGES, DOMAINS, ACTIVITIES_DATABASE, BADGES_LIST } from '../data/curriculumData';
import { convertFileToBase64 } from '../lib/firebase';
import { 
  X, 
  Upload, 
  Check, 
  Sparkles, 
  Camera, 
  FileText, 
  Send,
  AlertCircle,
  Award,
  Search,
  CheckCircle2,
  Filter,
  ListFilter,
  Medal
} from 'lucide-react';

interface ActivitySubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: ZahraUser;
  initialBadgeId?: string;
  initialBadgeReqIndex?: number;
  initialActivityId?: string;
  onSubmit: (submissionData: {
    activityId?: string;
    badgeId?: string;
    badgeRequirementIndex?: number;
    activityTitle: string;
    stageId: StageId;
    domainId: DomainId;
    description: string;
    proofBase64?: string;
    proofFileName?: string;
  }) => void;
}

export const ActivitySubmissionModal: React.FC<ActivitySubmissionModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  initialBadgeId,
  initialBadgeReqIndex,
  initialActivityId,
  onSubmit
}) => {
  if (!isOpen) return null;

  // Submission Target: 'ACTIVITY' (regular curriculum) or 'BADGE_REQ' (specific badge requirement)
  const [submissionType, setSubmissionType] = useState<'ACTIVITY' | 'BADGE_REQ'>(
    initialBadgeId ? 'BADGE_REQ' : 'ACTIVITY'
  );

  // For Badge Submission
  const [selectedBadgeId, setSelectedBadgeId] = useState<string>(initialBadgeId || BADGES_LIST[0]?.id || '');
  const [selectedBadgeReqIndex, setSelectedBadgeReqIndex] = useState<number>(initialBadgeReqIndex ?? 0);

  // View Mode for Activities: 'ALL_ACTIVITIES' or 'BY_CATEGORY'
  const [viewMode, setViewMode] = useState<'BY_CATEGORY' | 'ALL_ACTIVITIES'>('ALL_ACTIVITIES');
  
  const [selectedStage, setSelectedStage] = useState<StageId>(currentUser.stageId || 'nadhar');
  const [selectedDomain, setSelectedDomain] = useState<DomainId>('spiritual');
  const [selectedActivityId, setSelectedActivityId] = useState<string>(initialActivityId || '');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  
  const [proofBase64, setProofBase64] = useState<string>('');
  const [proofFileName, setProofFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (initialBadgeId) {
      setSubmissionType('BADGE_REQ');
      setSelectedBadgeId(initialBadgeId);
      if (initialBadgeReqIndex !== undefined) {
        setSelectedBadgeReqIndex(initialBadgeReqIndex);
      }
    } else if (initialActivityId) {
      setSubmissionType('ACTIVITY');
      setSelectedActivityId(initialActivityId);
      const actObj = ACTIVITIES_DATABASE.find(a => a.id === initialActivityId);
      if (actObj) {
        setSelectedStage(actObj.stageId);
        setSelectedDomain(actObj.domainId);
      }
    }
  }, [initialBadgeId, initialBadgeReqIndex, initialActivityId]);

  // Selected Badge Object
  const selectedBadge = useMemo(() => {
    return BADGES_LIST.find(b => b.id === selectedBadgeId) || BADGES_LIST[0];
  }, [selectedBadgeId]);

  // Helper to check if an activity is completed by this Zahra
  const isActivityCompleted = (actId: string) => {
    return currentUser.completedActivityIds && currentUser.completedActivityIds.includes(actId);
  };

  // Helper to check if a badge requirement is completed
  const isBadgeReqCompleted = (badgeId: string, reqIdx: number) => {
    const key = `${badgeId}_req-${reqIdx}`;
    return currentUser.completedBadgeRequirements && currentUser.completedBadgeRequirements.includes(key);
  };

  // Filtered list for "BY_CATEGORY"
  const categoryActivities = useMemo(() => {
    return ACTIVITIES_DATABASE.filter(a => {
      if (a.stageId !== selectedStage || a.domainId !== selectedDomain) return false;
      if (hideCompleted && isActivityCompleted(a.id)) return false;
      if (searchFilter.trim() && !a.title.includes(searchFilter.trim())) return false;
      return true;
    });
  }, [selectedStage, selectedDomain, searchFilter, hideCompleted, currentUser.completedActivityIds]);

  // Filtered list for "ALL_ACTIVITIES"
  const allFilteredActivities = useMemo(() => {
    return ACTIVITIES_DATABASE.filter(a => {
      if (hideCompleted && isActivityCompleted(a.id)) return false;
      if (searchFilter.trim()) {
        const query = searchFilter.trim().toLowerCase();
        const stageName = STAGES.find(s => s.id === a.stageId)?.name || '';
        const domainName = DOMAINS.find(d => d.id === a.domainId)?.name || '';
        return a.title.toLowerCase().includes(query) || 
               a.companion.toLowerCase().includes(query) ||
               stageName.toLowerCase().includes(query) ||
               domainName.toLowerCase().includes(query);
      }
      return true;
    });
  }, [searchFilter, hideCompleted, currentUser.completedActivityIds]);

  const handleSelectActivity = (actId: string) => {
    setSelectedActivityId(actId);
    if (actId) {
      setCustomTitle('');
      const actObj = ACTIVITIES_DATABASE.find(a => a.id === actId);
      if (actObj) {
        setSelectedStage(actObj.stageId);
        setSelectedDomain(actObj.domainId);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('حجم الملف كبير جداً. يرجى اختيار صورة أو ملف أقل من 5 ميغابايت.');
      return;
    }

    try {
      setIsUploading(true);
      setErrorMsg('');
      const base64Str = await convertFileToBase64(file);
      setProofBase64(base64Str);
      setProofFileName(file.name);
    } catch (err) {
      console.error(err);
      setErrorMsg('تعذر تحميل الملف المرفق. يرجى اختيار صورة أو وثيقة أخرى.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (submissionType === 'BADGE_REQ') {
      if (!selectedBadge) {
        setErrorMsg('يرجى اختيار شارة الهواية.');
        return;
      }

      const reqText = selectedBadge.requirements[selectedBadgeReqIndex] || 'متطلب شارة الهواية';
      const badgeTitle = `${selectedBadge.icon} ${selectedBadge.name} - ${reqText}`;

      if (!description.trim()) {
        setErrorMsg('يرجى كتابة ما قمتِ به لاجتياز هذا المتطلب الخاص بالشارة.');
        return;
      }

      onSubmit({
        badgeId: selectedBadge.id,
        badgeRequirementIndex: selectedBadgeReqIndex,
        activityTitle: badgeTitle,
        stageId: currentUser.stageId || 'nadhar',
        domainId: 'mental',
        description: description.trim(),
        proofBase64: proofBase64 || undefined,
        proofFileName: proofFileName || undefined
      });

      onClose();
      return;
    }

    // Activity Mode
    let finalTitle = customTitle.trim();
    let finalStage = selectedStage;
    let finalDomain = selectedDomain;

    if (selectedActivityId) {
      const actObj = ACTIVITIES_DATABASE.find(a => a.id === selectedActivityId);
      if (actObj) {
        finalTitle = actObj.title;
        finalStage = actObj.stageId;
        finalDomain = actObj.domainId;
      }
    }

    if (!finalTitle) {
      setErrorMsg('يرجى اختيار نشاط من القائمة أو كتابة عنوان النشاط.');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('يرجى تدوين وصف موجز لما قمت به أو تعلمته في هذا النشاط.');
      return;
    }

    onSubmit({
      activityId: selectedActivityId || undefined,
      activityTitle: finalTitle,
      stageId: finalStage,
      domainId: finalDomain,
      description: description.trim(),
      proofBase64: proofBase64 || undefined,
      proofFileName: proofFileName || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-800 shrink-0">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="p-2 bg-amber-400 text-blue-950 rounded-xl font-bold">
              🌺
            </div>
            <div>
              <h3 className="font-bold text-base text-amber-300">
                {submissionType === 'BADGE_REQ' ? 'إرسال إثبات متطلب شارة هواية 🏅' : 'تسجيل نشاط وإرسال إثبات مصور 📸'}
              </h3>
              <p className="text-xs text-blue-200 font-sans">
                الزهرة: {currentUser.name} • {currentUser.patrolRole || 'سداسي'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-blue-800 text-blue-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmitForm} className="p-5 overflow-y-auto space-y-4 text-xs font-sans">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center space-x-2 space-x-reverse">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submission Main Type Tabs */}
          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 gap-1">
            <button
              type="button"
              onClick={() => setSubmissionType('ACTIVITY')}
              className={`flex-1 py-2 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1.5 space-x-reverse cursor-pointer ${
                submissionType === 'ACTIVITY'
                  ? 'bg-blue-900 text-amber-300 shadow-xs'
                  : 'text-gray-700 hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>أنشطة المنهاج الكشفي الستة</span>
            </button>

            <button
              type="button"
              onClick={() => setSubmissionType('BADGE_REQ')}
              className={`flex-1 py-2 rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1.5 space-x-reverse cursor-pointer ${
                submissionType === 'BADGE_REQ'
                  ? 'bg-purple-900 text-amber-300 shadow-xs'
                  : 'text-gray-700 hover:bg-white/60'
              }`}
            >
              <Medal className="w-4 h-4" />
              <span>متطلبات شارات الهواية ({BADGES_LIST.length} شارات) 🏅</span>
            </button>
          </div>

          {/* BADGE SUBMISSION SECTION */}
          {submissionType === 'BADGE_REQ' ? (
            <div className="space-y-4 bg-purple-50/60 p-4 rounded-2xl border border-purple-200 animate-in fade-in">
              <div className="space-y-1.5">
                <label className="font-bold text-purple-950 block">1. اختاري شارة الهواية المراد اجتيازها:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                  {BADGES_LIST.map((badge) => {
                    const isSelected = selectedBadgeId === badge.id;
                    const isEarned = currentUser.badgesEarned?.includes(badge.id);
                    return (
                      <button
                        key={badge.id}
                        type="button"
                        onClick={() => {
                          setSelectedBadgeId(badge.id);
                          setSelectedBadgeReqIndex(0);
                        }}
                        className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex items-center space-x-2 space-x-reverse ${
                          isSelected
                            ? 'bg-purple-900 text-white border-purple-900 ring-2 ring-purple-300 shadow-xs'
                            : isEarned
                            ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                            : 'bg-white text-gray-800 border-purple-100 hover:bg-purple-100/50'
                        }`}
                      >
                        <span className="text-xl shrink-0">{badge.icon}</span>
                        <div className="min-w-0">
                          <div className="font-bold text-[11px] truncate">{badge.name}</div>
                          <div className={`text-[9px] ${isSelected ? 'text-purple-200' : 'text-gray-500'}`}>
                            {isEarned ? 'مكتسبة 🏅' : badge.category}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Requirements Selector */}
              {selectedBadge && (
                <div className="space-y-2 pt-2 border-t border-purple-200">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-purple-950 block">2. اختاري المتطلب الذي قمتِ بإنجازه:</label>
                    <span className="text-[10px] text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded-full">
                      {selectedBadge.icon} {selectedBadge.name}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedBadge.requirements.map((req, rIdx) => {
                      const isSelectedReq = selectedBadgeReqIndex === rIdx;
                      const isReqDone = isBadgeReqCompleted(selectedBadge.id, rIdx);

                      return (
                        <div
                          key={rIdx}
                          onClick={() => setSelectedBadgeReqIndex(rIdx)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start space-x-2.5 space-x-reverse ${
                            isSelectedReq
                              ? 'bg-white border-purple-600 ring-2 ring-purple-400 shadow-sm'
                              : 'bg-white/80 border-purple-100 hover:bg-white'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isReqDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                                isSelectedReq ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-400'
                              }`}>
                                {rIdx + 1}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-gray-800 font-semibold leading-relaxed text-[11px]">{req}</div>
                            {isReqDone && (
                              <span className="text-[9px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded-md mt-1 inline-block">
                                تم قبوله مسبقاً من القائدة ✅
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ACTIVITY MODE */
            <>
              {/* Mode Selector & Search Bar */}
              <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  
                  <div className="flex items-center space-x-1.5 space-x-reverse">
                    <button
                      type="button"
                      onClick={() => setViewMode('ALL_ACTIVITIES')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs flex items-center space-x-1 space-x-reverse cursor-pointer ${
                        viewMode === 'ALL_ACTIVITIES'
                          ? 'bg-amber-400 text-blue-950 shadow-xs'
                          : 'bg-white text-gray-700 hover:bg-blue-100 border border-blue-200'
                      }`}
                    >
                      <ListFilter className="w-3.5 h-3.5" />
                      <span>جميع الأنشطة (الـ 160)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode('BY_CATEGORY')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs flex items-center space-x-1 space-x-reverse cursor-pointer ${
                        viewMode === 'BY_CATEGORY'
                          ? 'bg-amber-400 text-blue-950 shadow-xs'
                          : 'bg-white text-gray-700 hover:bg-blue-100 border border-blue-200'
                      }`}
                    >
                      <Filter className="w-3.5 h-3.5" />
                      <span>تصفح حسب المرحلة والمجال</span>
                    </button>
                  </div>

                  {/* Hide Completed Checkbox */}
                  <label className="flex items-center space-x-1.5 space-x-reverse text-[11px] font-bold text-blue-950 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hideCompleted}
                      onChange={(e) => setHideCompleted(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>إخفاء الأنشطة المنجزة سابقاً</span>
                  </label>

                </div>

                {/* Quick Live Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 بحث سريع في عنوان النشاط أو رفيق الأدغال..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-blue-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchFilter && (
                    <button
                      type="button"
                      onClick={() => setSearchFilter('')}
                      className="absolute left-2.5 top-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* View Mode 1: Full Dropdown (All 160 activities) */}
              {viewMode === 'ALL_ACTIVITIES' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-gray-900 block">اختاري النشاط من المنهاج الكشفي الكامل:</label>
                    <span className="text-[10px] text-blue-600 font-bold">
                      {allFilteredActivities.length} نشاط متاح
                    </span>
                  </div>
                  
                  <select
                    value={selectedActivityId}
                    onChange={(e) => handleSelectActivity(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-gray-300 bg-white text-xs font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="">-- اختاري النشاط الذي أنجزتِه --</option>
                    {allFilteredActivities.map((act) => {
                      const stageName = STAGES.find(s => s.id === act.stageId)?.name || '';
                      const domainName = DOMAINS.find(d => d.id === act.domainId)?.name || '';
                      const completed = isActivityCompleted(act.id);
                      return (
                        <option key={act.id} value={act.id} className={completed ? "text-emerald-700 bg-emerald-50" : ""}>
                          {completed ? "✅ " : "🌸 "} [{stageName} • {domainName}] {act.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {/* View Mode 2: By Category (Stage & Domain) */}
              {viewMode === 'BY_CATEGORY' && (
                <div className="space-y-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
                  
                  {/* Stage Tabs */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">المرحلة الكشفية:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {STAGES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setSelectedStage(s.id);
                            setSelectedActivityId('');
                          }}
                          className={`p-2 rounded-xl text-[11px] font-bold transition-all truncate cursor-pointer ${
                            selectedStage === s.id
                              ? 'bg-blue-900 text-white shadow-xs'
                              : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Domain Tabs */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">المجال التربوي ورفيق الأدغال:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {DOMAINS.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setSelectedDomain(d.id);
                            setSelectedActivityId('');
                          }}
                          className={`p-2 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1.5 space-x-reverse truncate cursor-pointer ${
                            selectedDomain === d.id
                              ? 'bg-amber-400 text-blue-950 shadow-xs'
                              : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          <span>🐾</span>
                          <span className="truncate">{d.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activities in Selected Category */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      الأنشطة المقررة ({categoryActivities.length} نشاط):
                    </label>
                    <div className="space-y-1 max-h-40 overflow-y-auto p-1">
                      {categoryActivities.map((act) => {
                        const isSelected = selectedActivityId === act.id;
                        const isDone = isActivityCompleted(act.id);

                        return (
                          <div
                            key={act.id}
                            onClick={() => handleSelectActivity(act.id)}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                                : isDone
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                                : 'bg-white text-gray-800 border-gray-200 hover:bg-blue-50'
                            }`}
                          >
                            <div className="flex items-center space-x-2 space-x-reverse min-w-0">
                              <span>{isDone ? '✅' : '🌸'}</span>
                              <span className="font-bold truncate">{act.title}</span>
                            </div>
                            <span className="text-[10px] opacity-75 shrink-0">{act.companion}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* Or Custom Activity Title */}
              <div className="space-y-1 pt-1">
                <label className="font-bold text-gray-700 block">أو كتابة عنوان نشاط حر / مبادرة كشفية خاصة:</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => {
                    setCustomTitle(e.target.value);
                    if (e.target.value) setSelectedActivityId('');
                  }}
                  placeholder="مثال: مبادرة تنظيف حديقة الحي، تحضير وجبة صحية مع العائلة..."
                  className="w-full p-2.5 rounded-2xl border border-gray-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Description */}
          <div className="space-y-1">
            <label className="font-bold text-gray-900 block">توضيح طريقة الإنجاز وما تعلمته في هذا النشاط أو المتطلب:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتبي ملخصاً عما قمتِ بإنجازه في البيت، السداسي، المدرسة، أو المخيم..."
              className="w-full p-3 rounded-2xl border border-gray-300 text-xs focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Upload Proof File */}
          <div className="space-y-2">
            <label className="font-bold text-gray-900 block">
              إرفاق صورة أو وثيقة تثبت إنجاز النشاط / المتطلب:
            </label>

            {proofBase64 ? (
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-300 flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse min-w-0">
                  <img
                    src={proofBase64}
                    alt="معاينة الصورة"
                    className="w-14 h-14 object-cover rounded-xl border border-blue-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-blue-950 truncate">{proofFileName}</div>
                    <div className="text-[10px] text-blue-700">تم إرفاق الملف بنجاح ✅</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setProofBase64('');
                    setProofFileName('');
                  }}
                  className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-100 font-bold cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-blue-300 bg-blue-50/30 hover:bg-blue-50 rounded-2xl p-6 text-center cursor-pointer block transition-all">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Camera className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                <div className="font-bold text-xs text-blue-950">اضغطي هنا لالتقاط صورة أو تحميل ملف الإثبات</div>
                <p className="text-[10px] text-gray-500 mt-0.5">يدعم الصور والمستندات والشهادات</p>
              </label>
            )}
          </div>

          {/* Submit Action */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-bold cursor-pointer"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-6 py-2.5 rounded-xl shadow-md flex items-center space-x-2 space-x-reverse transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الإثبات للقائدة للتقييم 🚀</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
