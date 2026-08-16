import React, { useState } from 'react';
import { ZahraUser, Submission, AssignedTask, StageId, DomainId } from '../types';
import { STAGES, DOMAINS, BADGES_LIST, PATROLS } from '../data/curriculumData';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Send, 
  BookOpen, 
  Camera, 
  Star, 
  TrendingUp, 
  LogOut,
  Calendar,
  Phone,
  Compass,
  FileCheck2
} from 'lucide-react';

interface ZahraDashboardProps {
  zahra: ZahraUser;
  submissions: Submission[];
  tasks: AssignedTask[];
  onOpenSubmitProof: (preSelectedActivity?: { activityId?: string; stageId: StageId; domainId: DomainId }) => void;
  onNavigateTab: (tab: string) => void;
  onLogout: () => void;
}

export const ZahraDashboard: React.FC<ZahraDashboardProps> = ({
  zahra,
  submissions,
  tasks,
  onOpenSubmitProof,
  onNavigateTab,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'tasks' | 'badges'>('overview');

  // Filter submissions for this Zahra
  const mySubmissions = submissions.filter(s => s.zahraId === zahra.id);
  const pendingSubs = mySubmissions.filter(s => s.status === 'PENDING');
  const approvedSubs = mySubmissions.filter(s => s.status === 'APPROVED');
  const rejectedSubs = mySubmissions.filter(s => s.status === 'REJECTED');

  // Filter tasks assigned to this Zahra, her patrol, or ALL
  const myTasks = tasks.filter(t => 
    t.assignedToType === 'ALL' ||
    (t.assignedToType === 'PATROL' && t.targetId === zahra.patrolId) ||
    (t.assignedToType === 'ZAHRA' && t.targetId === zahra.id)
  );

  const currentStage = STAGES.find(s => s.id === zahra.stageId) || STAGES[0];
  const myPatrol = PATROLS.find(p => p.id === zahra.patrolId) || PATROLS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Zahra Welcome Banner */}
      <div 
        className="rounded-3xl p-5 sm:p-6 shadow-xl border text-white relative overflow-hidden transition-all"
        style={{ backgroundColor: myPatrol.colorHex }}
      >
        <div className="absolute top-0 left-0 -mt-10 -ml-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white text-blue-950 font-black text-3xl flex items-center justify-center shadow-lg border-2 border-amber-300 shrink-0">
              🌸
            </div>
            <div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="bg-amber-400 text-blue-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-xs">
                  حساب الزهرة
                </span>
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {myPatrol.name} • {zahra.patrolRole || 'زهرة'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                مرحباً بكِ يا زهرة: {zahra.name} 🌺
              </h2>
              <div className="flex items-center space-x-4 space-x-reverse text-xs text-white/90 mt-1 font-semibold">
                <span>الدرجة الكشفية: <strong className="text-amber-300">{currentStage.name}</strong></span>
                <span>• الرصيد: <strong className="text-amber-300">{zahra.points} نقطة</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Upload Button */}
          <div className="flex items-center space-x-2 space-x-reverse shrink-0">
            <button
              onClick={() => onOpenSubmitProof()}
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-4 sm:px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 space-x-reverse transition-all active:scale-95 border-2 border-white text-xs cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>إرسال إثبات نشاط مصور</span>
            </button>
            <button
              onClick={onLogout}
              className="p-3 bg-white/15 hover:bg-white/25 text-white rounded-2xl transition-all border border-white/30 text-xs font-bold cursor-pointer"
              title="تسجيل الخروج أو تبديل الحساب"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center space-x-3 space-x-reverse">
          <div className="p-2.5 sm:p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-gray-900">{zahra.points}</div>
            <div className="text-[11px] font-bold text-gray-500">نقاطي الكشفية</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center space-x-3 space-x-reverse">
          <div className="p-2.5 sm:p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-purple-600">{zahra.badgesEarned.length}</div>
            <div className="text-[11px] font-bold text-gray-500">شارات مكتسبة</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center space-x-3 space-x-reverse">
          <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-blue-600">{approvedSubs.length}</div>
            <div className="text-[11px] font-bold text-gray-500">أنشطة مقبولة</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center space-x-3 space-x-reverse">
          <div className="p-2.5 sm:p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-rose-600">{pendingSubs.length}</div>
            <div className="text-[11px] font-bold text-gray-500">أنشطة قيد المراجعة</div>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto space-x-2 space-x-reverse border-b border-gray-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'overview' ? 'bg-blue-900 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          نظرة عامة والأنشطة 📌
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'submissions' ? 'bg-blue-900 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          إثباتاتي المرسلة ({mySubmissions.length}) 📸
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'tasks' ? 'bg-blue-900 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          تكليفات القائدة ({myTasks.length}) 👑
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'badges' ? 'bg-blue-900 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          سجل شاراتي ({zahra.badgesEarned.length}) 🏆
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Stage & Progress Info */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base">درجتك الكشفية الحالية: {currentStage.name}</h3>
              <button
                onClick={() => onNavigateTab('map')}
                className="text-xs font-bold text-blue-700 hover:underline flex items-center space-x-1 space-x-reverse cursor-pointer"
              >
                <span>خارطة التدرج الكاملة</span>
                <Compass className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-2">
              <p className="text-amber-900 leading-relaxed font-sans">{currentStage.description}</p>
              <div className="flex flex-wrap gap-3 font-bold text-amber-950 pt-1">
                <span>المدة المقررة: {currentStage.duration}</span>
                <span>• عدد الأنشطة: {currentStage.requirementsCount} نشاطاً</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-xs text-gray-800">اختصارات للبدء الفوري:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigateTab('catalog')}
                  className="p-4 bg-blue-50 hover:bg-blue-100/80 rounded-2xl border border-blue-200 text-right space-y-1 transition-all cursor-pointer"
                >
                  <div className="font-bold text-xs text-blue-950 flex items-center justify-between">
                    <span>تصفح المنهاج والأنشطة</span>
                    <BookOpen className="w-4 h-4 text-blue-700" />
                  </div>
                  <p className="text-[11px] text-blue-800 font-sans">
                    اختر نشاطاً من المجالات الستة وقومي بإنجازه وإرفاق الصورة.
                  </p>
                </button>

                <button
                  onClick={() => onOpenSubmitProof()}
                  className="p-4 bg-amber-50 hover:bg-amber-100/80 rounded-2xl border border-amber-200 text-right space-y-1 transition-all cursor-pointer"
                >
                  <div className="font-bold text-xs text-amber-950 flex items-center justify-between">
                    <span>رفع إثبات نشاط مباشر</span>
                    <Camera className="w-4 h-4 text-amber-700" />
                  </div>
                  <p className="text-[11px] text-amber-800 font-sans">
                    التقطي صورة لإنجازك وارفعيها مباشرة للقائدة للتقييم.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Leader Feedback & Profile Sidebar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-base">ملاحظات وتقييم القائدة</h3>
            
            {mySubmissions.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                لم تقومي بإرسال أي إثبات نشاط بعد. ابدئي بإنجاز نشاطك الأول!
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {mySubmissions.map(s => (
                  <div key={s.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 line-clamp-1">{s.activityTitle}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        s.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' :
                        s.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {s.status === 'APPROVED' ? 'مقبول ✅' : s.status === 'REJECTED' ? 'تعديل مطلوب ❌' : 'قيد النظر ⏳'}
                      </span>
                    </div>
                    {s.leaderFeedback && (
                      <p className="text-[11px] text-blue-900 bg-white p-2 rounded-xl border border-blue-100 font-sans">
                        💬 <strong>ملاحظة القائدة:</strong> {s.leaderFeedback}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Submissions History */}
      {activeTab === 'submissions' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base">سجل إثباتاتي المصورة المرسلة</h3>
            <button
              onClick={() => onOpenSubmitProof()}
              className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 space-x-reverse cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>إرسال إثبات جديد</span>
            </button>
          </div>

          {mySubmissions.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              لا توجد إثباتات مرسلة حالياً.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mySubmissions.map((s) => (
                <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    {s.proofBase64 && (
                      <img src={s.proofBase64} alt="إثبات" className="w-20 h-20 rounded-xl object-cover border shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-gray-900">{s.activityTitle}</div>
                      <p className="text-[11px] text-gray-600 line-clamp-2 mt-0.5 font-sans">{s.description}</p>
                      <div className="text-[10px] text-gray-400 mt-1">
                        التاريخ: {new Date(s.submittedAt).toLocaleDateString('ar-TN')}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                    <span className={`font-bold text-[11px] px-2.5 py-0.5 rounded-full ${
                      s.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' :
                      s.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {s.status === 'APPROVED' ? `مقبول (+${s.pointsAwarded || 0} نقطة)` : s.status === 'REJECTED' ? 'بحاجة لتعديل' : 'بانتظار تقييم القائدة'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Tasks */}
      {activeTab === 'tasks' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-900 text-base">التكليفات الموجهة لكِ من القائدة</h3>

          {myTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              لا توجد تكليفات جديدة موجهة لكِ حالياً.
            </div>
          ) : (
            <div className="space-y-3">
              {myTasks.map((t) => (
                <div key={t.id} className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-amber-200 text-amber-950 font-black px-2 py-0.5 rounded-full">
                      تكليف من القائدة
                    </span>
                    <h4 className="font-bold text-sm text-gray-900">{t.title}</h4>
                    <p className="text-xs text-gray-700 font-sans leading-relaxed">{t.description}</p>
                    {t.dueDate && (
                      <div className="text-[10px] text-amber-900 font-bold">
                        تاريخ التسليم الأقصى: {t.dueDate}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenSubmitProof({
                      stageId: t.stageId || zahra.stageId,
                      domainId: t.domainId || 'scout'
                    })}
                    className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0 cursor-pointer"
                  >
                    إنجاز ورفع الإثبات 📸
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Badges */}
      {activeTab === 'badges' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-900 text-base">شارة الهواية المكتسبة وشارات المنهاج</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {BADGES_LIST.map((badge) => {
              const isEarned = zahra.badgesEarned.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border text-center space-y-1 transition-all ${
                    isEarned ? 'bg-amber-50 border-amber-300 shadow-xs' : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-3xl">{badge.icon}</div>
                  <div className="font-bold text-xs text-gray-900">{badge.name}</div>
                  <div className="text-[10px] text-gray-500 font-sans">{badge.category}</div>
                  <div className={`text-[10px] font-bold mt-1 inline-block px-2 py-0.5 rounded-full ${
                    isEarned ? 'bg-amber-200 text-amber-900' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isEarned ? 'مكتسبة 🏆' : 'غير مكتسبة'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
