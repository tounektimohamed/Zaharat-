import React, { useState } from 'react';
import { ZahraUser, StageId } from '../types';
import { STAGES, DOMAINS, BADGES_LIST, ACTIVITIES_DATABASE } from '../data/curriculumData';
import { Sparkles, Award, Compass, CheckCircle2, Star, Trophy, Users } from 'lucide-react';

interface ProgressionMapProps {
  currentUser?: { type: 'LEADER' } | { type: 'ZAHRA'; zahra: ZahraUser };
  zaharat: ZahraUser[];
  currentZahraId?: string;
  onSelectZahra?: (id: string) => void;
}

export const ProgressionMap: React.FC<ProgressionMapProps> = ({
  currentUser,
  zaharat,
  currentZahraId,
  onSelectZahra
}) => {
  const isZahra = currentUser?.type === 'ZAHRA';
  const zahraUser = isZahra ? currentUser.zahra : null;

  const [leaderInspectedId, setLeaderInspectedId] = useState<string>(
    currentZahraId || (zaharat[0] ? zaharat[0].id : '')
  );

  const activeZahraId = isZahra 
    ? zahraUser!.id 
    : (leaderInspectedId || (zaharat[0] ? zaharat[0].id : ''));

  const activeZahra = isZahra
    ? zahraUser!
    : (zaharat.find(z => z.id === activeZahraId) || zaharat[0]);

  if (!activeZahra) {
    return (
      <div className="p-8 text-center text-gray-500">لا توجد زهرات مسجلات في الفرقة حالياً.</div>
    );
  }

  const currentStageInfo = STAGES.find(s => s.id === activeZahra.stageId) || STAGES[1];

  // Calculate domain stats for active Zahra
  const domainStats = DOMAINS.map((dom) => {
    const domainActivities = ACTIVITIES_DATABASE.filter(
      a => a.stageId === activeZahra.stageId && a.domainId === dom.id
    );
    const completedInDomain = domainActivities.filter(a =>
      activeZahra.completedActivityIds.includes(a.id)
    );
    const percentage = domainActivities.length > 0
      ? Math.round((completedInDomain.length / domainActivities.length) * 100)
      : 0;

    return {
      domain: dom,
      totalCount: domainActivities.length,
      completedCount: completedInDomain.length,
      percentage
    };
  });

  const totalActivitiesInStage = ACTIVITIES_DATABASE.filter(a => a.stageId === activeZahra.stageId).length;
  const totalCompletedInStage = ACTIVITIES_DATABASE.filter(a => a.stageId === activeZahra.stageId && activeZahra.completedActivityIds.includes(a.id)).length;
  const overallPercentage = totalActivitiesInStage > 0 ? Math.round((totalCompletedInStage / totalActivitiesInStage) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 rounded-3xl shadow-lg border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="bg-amber-400 text-blue-950 font-black text-xs px-2.5 py-0.5 rounded-full">
              خارطة التدرج الكشفي للزهرات
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
            خارطة التدرج والشارات للزهرة
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed font-sans">
            متابعة دقيقة لإلصاق ملصقات الحيوانات وشارات الهواية عبر القطاعات الستة لخارطة التدرج الشخصي (المنهاج التونسي - الأزرق والأصفر).
          </p>
        </div>

        {/* Scout Selector (Leader Only) */}
        {!isZahra ? (
          <div className="shrink-0 bg-blue-900/90 p-2 rounded-2xl border border-blue-700">
            <label className="text-[10px] text-blue-200 font-bold block mb-1">اختر الزهرة لمتابعة الخارطة:</label>
            <select
              value={activeZahra.id}
              onChange={(e) => {
                setLeaderInspectedId(e.target.value);
                if (onSelectZahra) onSelectZahra(e.target.value);
              }}
              className="p-2 rounded-xl bg-white text-blue-950 font-bold text-xs focus:outline-none cursor-pointer"
            >
              {zaharat.map((z) => (
                <option key={z.id} value={z.id}>
                  🌸 {z.name} ({z.patrolRole || 'زهرة'})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="shrink-0 bg-blue-900/90 px-4 py-2 rounded-2xl border border-blue-700 text-xs font-bold text-amber-300 flex items-center space-x-2 space-x-reverse">
            <span>🌸</span>
            <span>خارطتكِ الكشفية الشخصية يا {activeZahra.name}</span>
          </div>
        )}
      </div>

      {/* Scout Profile Card & Overall Progress */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-100 text-amber-900 font-black text-2xl flex items-center justify-center border-2 border-amber-300 shadow-xs shrink-0">
              🌸
            </div>
            <div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <h3 className="text-base sm:text-lg font-black text-gray-900">{activeZahra.name}</h3>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${currentStageInfo.badgeBg}`}>
                  {currentStageInfo.name}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                نقاط التدرج الكشفي: <strong className="text-amber-600">{activeZahra.points} نقطة ⭐️</strong> • عدد الشارات المكتسبة: <strong className="text-purple-600">{activeZahra.badgesEarned.length} شارات 🏆</strong>
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 bg-blue-50 p-3 rounded-2xl border border-blue-200 text-xs space-y-1.5">
            <div className="flex justify-between font-bold text-blue-950">
              <span>نسبة انجاز الخارطة الكلية:</span>
              <span>{overallPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                style={{ width: `${overallPercentage}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-blue-700">
              أنشطة مكتملة: {totalCompletedInStage} من أصل {totalActivitiesInStage} نشاطاً مقرراً
            </div>
          </div>

        </div>

        {/* Visual Map sectors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          
          {/* Wheel Visual Sector representation (1 Col) */}
          <div className="bg-gradient-to-b from-amber-50/50 to-blue-50/50 rounded-3xl p-6 border border-blue-100 flex flex-col items-center justify-center text-center space-y-4 relative">
            <div className="font-black text-sm text-blue-950 flex items-center space-x-1.5 space-x-reverse">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>قطاعات خارطة التدرج والحيوانات</span>
            </div>

            {/* Circular Map Layout Simulation */}
            <div className="relative w-56 h-56 rounded-full border-4 border-amber-400 bg-white shadow-xl flex items-center justify-center p-2">
              
              {/* Center Circle (Tippi) */}
              <div className="w-20 h-20 rounded-full bg-blue-900 text-amber-300 font-bold flex flex-col items-center justify-center border-2 border-amber-300 shadow-md z-10">
                <span className="text-lg">👧</span>
                <span className="text-[10px] font-black">Tippi (الغابة)</span>
              </div>

              {/* Surrounding Sector Badges */}
              {DOMAINS.map((dom, idx) => {
                const stat = domainStats.find(s => s.domain.id === dom.id);
                const isDone = stat && stat.percentage >= 80;

                // Radial positions for 5 outer animals around center
                const angles = [0, 72, 144, 216, 288];
                const angle = angles[idx % 5];
                const radius = 80;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={dom.id}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-sm transition-all ${
                      isDone
                        ? 'bg-amber-400 text-blue-950 border-white ring-2 ring-amber-500 scale-110'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                    title={`${dom.name} (${dom.animalNameArabic}) - ${stat?.percentage}%`}
                  >
                    <span>{isDone ? '🦁' : '🐾'}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-gray-600 font-sans leading-relaxed max-w-xs">
              عند إتمام أنشطة كل مجال بالكامل تقوم القائدة بإلصاق ملصق الحيوان الرمزي على خارطة الزهرة التفاعلية!
            </p>
          </div>

          {/* Detailed Domain Progress Bars (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center space-x-2 space-x-reverse">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>تقدم الزهرة في المجالات الستة:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {domainStats.map(({ domain, totalCount, completedCount, percentage }) => (
                <div
                  key={domain.id}
                  className="p-3.5 rounded-2xl border bg-white shadow-2xs space-y-2"
                  style={{ borderColor: domain.borderColor }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-base">🐾</span>
                      <div>
                        <div className="font-bold text-xs text-gray-900">{domain.name}</div>
                        <div className="text-[10px] text-gray-500">{domain.animalNameArabic}</div>
                      </div>
                    </div>
                    <span className="font-black text-xs text-blue-700">{percentage}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: domain.color
                      }}
                    ></div>
                  </div>

                  <div className="text-[10px] text-gray-500 text-left font-mono">
                    {completedCount} / {totalCount} نشاطاً موثقاً
                  </div>
                </div>
              ))}
            </div>

            {/* Badges Earned Cabinet */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <h4 className="font-bold text-xs text-gray-900 flex items-center space-x-2 space-x-reverse">
                <Award className="w-4 h-4 text-purple-600" />
                <span>دولاب شارات الهواية المكتسبة:</span>
              </h4>

              {activeZahra.badgesEarned.length === 0 ? (
                <div className="p-3 bg-gray-50 rounded-2xl text-center text-[11px] text-gray-500">
                  لم تتلقَ الزهرة أي شارات هواية بعد.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {activeZahra.badgesEarned.map((badgeId) => {
                    const badgeObj = BADGES_LIST.find(b => b.id === badgeId);
                    if (!badgeObj) return null;
                    return (
                      <div
                        key={badgeObj.id}
                        className="p-2 bg-purple-50 rounded-2xl border border-purple-200 text-purple-900 text-xs font-bold flex items-center space-x-1.5 space-x-reverse shadow-2xs"
                      >
                        <span className="text-base">{badgeObj.icon}</span>
                        <span>{badgeObj.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
