import React, { useState, useMemo } from 'react';
import { ZahraUser, StageId, DomainId } from '../types';
import { STAGES, DOMAINS, ACTIVITIES_DATABASE } from '../data/curriculumData';
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
  ListFilter
} from 'lucide-react';

interface ActivitySubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: ZahraUser;
  onSubmit: (submissionData: {
    activityId?: string;
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
  onSubmit
}) => {
  if (!isOpen) return null;

  // View Mode: 'BY_CATEGORY' (Stage & Domain) or 'ALL_ACTIVITIES' (Dropdown with all 160 activities)
  const [viewMode, setViewMode] = useState<'BY_CATEGORY' | 'ALL_ACTIVITIES'>('ALL_ACTIVITIES');
  
  const [selectedStage, setSelectedStage] = useState<StageId>(currentUser.stageId || 'nadhar');
  const [selectedDomain, setSelectedDomain] = useState<DomainId>('spiritual');
  const [selectedActivityId, setSelectedActivityId] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  
  const [proofBase64, setProofBase64] = useState<string>('');
  const [proofFileName, setProofFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Helper to check if an activity is completed by this Zahra
  const isActivityCompleted = (actId: string) => {
    return currentUser.completedActivityIds && currentUser.completedActivityIds.includes(actId);
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
      setErrorMsg('تعذر تحويل الملف إلى Base64. يرجى اختيار صورة أخرى.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

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

  const selectedActivityObject = ACTIVITIES_DATABASE.find(a => a.id === selectedActivityId);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-800 shrink-0">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="p-2 bg-amber-400 text-blue-950 rounded-xl font-bold">
              🌺
            </div>
            <div>
              <h3 className="font-bold text-base text-amber-300">تسجيل نشاط وإرسال إثبات مصور</h3>
              <p className="text-xs text-blue-200 font-sans">الزهرة: {currentUser.name} • الرصيد المنجز: {currentUser.completedActivityIds?.length || 0} نشاطاً</p>
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
                className="w-full pl-8 pr-3 py-2 bg-white border border-blue-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter('')}
                  className="absolute left-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Mode 1: BY CATEGORY (Stage + Domain Selector) */}
          {viewMode === 'BY_CATEGORY' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in">
              <div>
                <label className="font-bold text-gray-800 block mb-1">درجة التدرج الكشفي:</label>
                <select
                  value={selectedStage}
                  onChange={(e) => {
                    setSelectedStage(e.target.value as StageId);
                    setSelectedActivityId('');
                  }}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {STAGES.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-800 block mb-1">المجال التنموي (الرمزي):</label>
                <select
                  value={selectedDomain}
                  onChange={(e) => {
                    setSelectedDomain(e.target.value as DomainId);
                    setSelectedActivityId('');
                  }}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {DOMAINS.map((dom) => (
                    <option key={dom.id} value={dom.id}>
                      {dom.name} - ({dom.symbolicPlace})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Main Activity Dropdown Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-gray-900 block">
                {viewMode === 'ALL_ACTIVITIES' ? 'قائمة جميع أنشطة المنهاج الكشفي:' : 'اختر النشاط من المجال المحدد:'}
              </label>
              <span className="text-[11px] text-gray-500">
                ({viewMode === 'ALL_ACTIVITIES' ? allFilteredActivities.length : categoryActivities.length} نشاطاً متوفراً)
              </span>
            </div>

            {viewMode === 'ALL_ACTIVITIES' ? (
              <select
                value={selectedActivityId}
                onChange={(e) => handleSelectActivity(e.target.value)}
                className="w-full p-3 rounded-2xl border-2 border-blue-400 bg-blue-50/40 text-xs font-bold text-blue-950 focus:ring-2 focus:ring-blue-500 leading-relaxed cursor-pointer"
              >
                <option value="">-- اختر نشاطاً من قائمة المنهاج الشاملة ({allFilteredActivities.length}) أو اكتب نشاطك أدناه --</option>
                
                {STAGES.map((stage) => {
                  const stageActs = allFilteredActivities.filter(a => a.stageId === stage.id);
                  if (stageActs.length === 0) return null;

                  return (
                    <optgroup key={stage.id} label={`🌟 ${stage.name} (${stage.duration})`}>
                      {stageActs.map((act) => {
                        const done = isActivityCompleted(act.id);
                        const domObj = DOMAINS.find(d => d.id === act.domainId);
                        return (
                          <option key={act.id} value={act.id}>
                            {done ? '✅ [منجز مسبقاً] ' : '▫️ '} 
                            [{domObj?.name || act.domainId}] #{act.number} - {act.title} (الرفيق: {act.companion})
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
              </select>
            ) : (
              <select
                value={selectedActivityId}
                onChange={(e) => handleSelectActivity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-blue-300 bg-blue-50/50 text-xs font-bold text-blue-950 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">-- اختر من أنشطة المجال المحدد ({categoryActivities.length}) أو سجل نشاطاً مخصصاً --</option>
                {categoryActivities.map((act) => {
                  const done = isActivityCompleted(act.id);
                  return (
                    <option key={act.id} value={act.id}>
                      {done ? '✅ [منجز مسبقاً] ' : '▫️ '} #{act.number} - {act.title}
                    </option>
                  );
                })}
              </select>
            )}

            {/* Selected Activity Details Pill */}
            {selectedActivityObject && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 flex items-start space-x-2 space-x-reverse mt-1">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-black text-xs text-amber-900">
                    #{selectedActivityObject.number} - {selectedActivityObject.title}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium">
                    المرحلة: <strong>{STAGES.find(s => s.id === selectedActivityObject.stageId)?.name}</strong> • 
                    المجال: <strong>{DOMAINS.find(d => d.id === selectedActivityObject.domainId)?.name}</strong> • 
                    الرفيق الرمزي: <strong>{selectedActivityObject.companion}</strong>
                    {isActivityCompleted(selectedActivityObject.id) && (
                      <span className="mr-2 text-blue-800 font-bold bg-blue-100 px-2 py-0.5 rounded-full">
                        ✅ تم اجتيازه مسبقاً
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Custom Activity Title fallback */}
            {!selectedActivityId && (
              <div className="mt-2 space-y-1">
                <label className="font-bold text-gray-700 block text-[11px]">أو ادخلي عنوان نشاط كشفي مخصص:</label>
                <input
                  type="text"
                  placeholder="اكتبي عنوان النشاط الكشفي الذي أنجزتِه..."
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Step 3: Description */}
          <div className="space-y-1">
            <label className="font-bold text-gray-900 block">توضيح طريقة الإنجاز وما تعلمته في هذا النشاط:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتبي ملخصاً عما قمتِ بإنجازه في البيت، السداسي، المدرسة، أو المخيم..."
              className="w-full p-3 rounded-2xl border border-gray-300 text-xs focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Step 4: Upload Proof File (Base64) */}
          <div className="space-y-2">
            <label className="font-bold text-gray-900 block">
              تحميل صورة أو ملف إثبات (Base64 Proof):
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
                    <div className="text-[10px] text-blue-700">تم تحويل الملف وتجهيزه بالإثبات (Base64) ✅</div>
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
                <p className="text-[10px] text-gray-500 mt-0.5">يدعم الصور والمستندات (سيتم تشفير الإثبات بصيغة Base64)</p>
              </label>
            )}
          </div>

          {/* Submit Action */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200 font-bold cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-1.5 space-x-reverse cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>إرسال النشاط للقائدة للتقييم</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
