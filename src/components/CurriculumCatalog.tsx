import React, { useState } from 'react';
import { StageId, DomainId, ActivityItem, ZahraUser, Submission } from '../types';
import { STAGES, DOMAINS, ACTIVITIES_DATABASE } from '../data/curriculumData';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Search, 
  Sparkles, 
  Send, 
  Compass, 
  Award, 
  Filter,
  Check
} from 'lucide-react';

interface CurriculumCatalogProps {
  currentUser: { type: 'LEADER' } | { type: 'ZAHRA'; zahra: ZahraUser };
  submissions: Submission[];
  onOpenSubmitProofWithActivity: (activityId: string, stageId: StageId, domainId: DomainId) => void;
}

export const CurriculumCatalog: React.FC<CurriculumCatalogProps> = ({
  currentUser,
  submissions,
  onOpenSubmitProofWithActivity
}) => {
  const isZahra = currentUser.type === 'ZAHRA';
  const zahraObj = isZahra ? currentUser.zahra : null;

  const [selectedStage, setSelectedStage] = useState<StageId>(
    isZahra && zahraObj ? zahraObj.stageId : 'nadhar'
  );
  const [selectedDomain, setSelectedDomain] = useState<DomainId | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredActivities = ACTIVITIES_DATABASE.filter((act) => {
    if (act.stageId !== selectedStage) return false;
    if (selectedDomain !== 'ALL' && act.domainId !== selectedDomain) return false;
    if (searchQuery.trim() && !act.title.includes(searchQuery.trim())) return false;
    return true;
  });

  const activeStageInfo = STAGES.find(s => s.id === selectedStage);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 rounded-3xl shadow-lg border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="bg-amber-400 text-blue-950 font-black text-xs px-2.5 py-0.5 rounded-full">
              دليل الأنشطة والمنهاج التونسي
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
            منهاج الأنشطة والتدرج الشخصي
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed font-sans">
            قائمة الأنشطة الشاملة المقررة لجميع المراحل: الإكليل اليافع (القبول والوعد)، الإكليل النضر، الإكليل العطر، والإكليل المثمر، مقسمة حسب المجالات التربوية الستة ورفقاء الأدغال.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative shrink-0 w-full md:w-64">
          <input
            type="text"
            placeholder="بحث في الأنشطة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-blue-900/90 border border-blue-700 text-xs text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <Search className="w-4 h-4 text-blue-300 absolute left-3 top-3" />
        </div>
      </div>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STAGES.map((stage) => {
          const isSelected = selectedStage === stage.id;
          const isMyStage = isZahra && zahraObj?.stageId === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between relative cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 text-blue-950 border-amber-500 ring-2 ring-amber-300 shadow-md font-black'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              {isMyStage && (
                <span className="absolute -top-2.5 right-3 bg-blue-900 text-amber-300 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs border border-blue-700">
                  درجتكِ المباشرة 🌸
                </span>
              )}
              <div>
                <div className="text-xs font-bold text-gray-500 mb-1">{stage.duration}</div>
                <div className="text-base font-black">{stage.name}</div>
              </div>
              <div className="mt-2 text-[11px] font-bold opacity-80">
                {stage.requirementsCount} نشاطاً مقرراً
              </div>
            </button>
          );
        })}
      </div>

      {/* Domain Filter Buttons */}
      <div className="bg-white p-3 rounded-2xl shadow-xs border border-gray-100 flex items-center space-x-2 space-x-reverse overflow-x-auto scrollbar-none text-xs">
        <span className="font-bold text-gray-700 shrink-0 flex items-center space-x-1 space-x-reverse">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>تصفية المجال:</span>
        </span>

        <button
          onClick={() => setSelectedDomain('ALL')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
            selectedDomain === 'ALL'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          جميع المجالات (الستة)
        </button>

        {DOMAINS.map((dom) => {
          const isSelected = selectedDomain === dom.id;
          return (
            <button
              key={dom.id}
              onClick={() => setSelectedDomain(dom.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center space-x-1.5 space-x-reverse cursor-pointer ${
                isSelected
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{dom.name}</span>
              <span className="text-[10px] opacity-75">({dom.symbolicPlace})</span>
            </button>
          );
        })}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map((act) => {
          const domObj = DOMAINS.find(d => d.id === act.domainId);

          // Check status for current Zahra
          let isCompleted = false;
          let isPending = false;

          if (zahraObj) {
            isCompleted = zahraObj.completedActivityIds.includes(act.id);
            isPending = submissions.some(
              s => s.zahraId === zahraObj.id && s.activityId === act.id && s.status === 'PENDING'
            );
          }

          return (
            <div
              key={act.id}
              className={`bg-white rounded-3xl p-5 border shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-3 ${
                isCompleted ? 'border-blue-300 bg-blue-50/20' : 'border-gray-200'
              }`}
            >
              <div className="space-y-2">
                
                {/* Top Badge Meta */}
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className="font-bold px-2.5 py-0.5 rounded-full border shadow-2xs"
                    style={{
                      backgroundColor: domObj?.bgColor || '#f3f4f6',
                      color: domObj?.color || '#1f2937',
                      borderColor: domObj?.borderColor || '#e5e7eb'
                    }}
                  >
                    {domObj?.name} • {domObj?.symbolicPlace}
                  </span>

                  <span className="font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    الرفيق: {act.companion}
                  </span>
                </div>

                {/* Activity Number & Title */}
                <div className="flex items-start space-x-2 space-x-reverse pt-1">
                  <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0 border border-amber-300">
                    #{act.number}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 leading-snug">
                    {act.title}
                  </h4>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                
                {isCompleted ? (
                  <div className="text-xs font-bold text-blue-900 flex items-center space-x-1 space-x-reverse bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-700" />
                    <span>منجز وموثق ✅</span>
                  </div>
                ) : isPending ? (
                  <div className="text-xs font-bold text-amber-800 flex items-center space-x-1 space-x-reverse bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300">
                    <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                    <span>قيد تقييم القائدة...</span>
                  </div>
                ) : isZahra ? (
                  <button
                    onClick={() => onOpenSubmitProofWithActivity(act.id, act.stageId, act.domainId)}
                    className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-3 rounded-xl text-xs shadow-xs flex items-center justify-center space-x-1.5 space-x-reverse transition-all active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>إرسال إثبات النشاط</span>
                  </button>
                ) : (
                  <div className="text-[11px] font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200">
                    نشاط متاح للزهرات للإنجاز والإرسال ⚜️
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
