import React from 'react';
import { ZahraUser, LeaderUser, Submission, Patrol } from '../types';
import { STAGES, PATROLS, DOMAINS } from '../data/curriculumData';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  PlusCircle, 
  Compass, 
  Sparkles,
  BookOpen,
  Send,
  Eye,
  FileCheck2
} from 'lucide-react';

interface LeaderDashboardProps {
  currentLeader?: LeaderUser | null;
  zaharat: ZahraUser[];
  submissions: Submission[];
  onOpenAssignTask: () => void;
  onOpenSubmitProof: () => void;
  onSelectSubmission: (subId: string) => void;
  onNavigateTab: (tab: string) => void;
  onQuickApprove: (subId: string) => void;
  onQuickReject: (subId: string) => void;
}

export const LeaderDashboard: React.FC<LeaderDashboardProps> = ({
  currentLeader,
  zaharat,
  submissions,
  onOpenAssignTask,
  onOpenSubmitProof,
  onSelectSubmission,
  onNavigateTab,
  onQuickApprove,
  onQuickReject
}) => {
  const pendingSubmissions = submissions.filter(s => s.status === 'PENDING');
  const approvedSubmissions = submissions.filter(s => s.status === 'APPROVED');
  const totalBadgesEarned = zaharat.reduce((acc, curr) => acc + curr.badgesEarned.length, 0);

  const leaderName = currentLeader ? currentLeader.name : 'القائدة';
  const troopName = currentLeader ? currentLeader.troopName : 'فرقة الزهرات';
  const inviteCode = currentLeader?.inviteCode || 'ZAHARA-TROOP-2026';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-blue-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 -mt-10 -ml-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 text-blue-950 font-black text-2xl flex items-center justify-center shadow-lg border-2 border-amber-300 shrink-0">
              👑
            </div>
            <div>
              <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-1">
                <span className="bg-amber-400 text-blue-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-xs">
                  دليل قائدة الفرقة والباقة
                </span>
                <span className="text-blue-200 text-xs">{troopName} ⚜️</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                مرحباً بكِ، القائدة {leaderName}
              </h2>
              <p className="text-xs text-blue-100 mt-1 max-w-xl leading-relaxed font-sans">
                مرحباً بكِ في منظومة قيادة الفرقة والباقة. يمكنكِ متابعة التدرج الشخصي لكل زهرة، تقييم الأنشطة المحملة بالإثباتات المصورة (Base64)، وإدارة السداسيات وفق منهاج الزهرات التونسي (الأزرق والأصفر).
              </p>
            </div>
          </div>

          {/* Leader Quick Buttons */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={onOpenAssignTask}
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center space-x-2 space-x-reverse transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>إرسال مهمة جديدة للباقة</span>
            </button>
            <button
              onClick={() => onNavigateTab('submissions')}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-blue-700 shadow-md flex items-center space-x-2 space-x-reverse transition-all cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-amber-300" />
              <span>تقييم الأنشطة ({pendingSubmissions.length})</span>
            </button>
          </div>

        </div>
      </div>

      {/* Leader Invite Link Box */}
      <div className="bg-amber-50 rounded-3xl p-5 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 space-x-reverse font-black text-amber-950 text-sm">
            <span>🎫</span>
            <span>كود دعوة وانضمام الزهرات الخاص بالقائدة ({leaderName})</span>
          </div>
          <p className="text-xs text-amber-900 font-sans leading-relaxed">
            شاركي كود الدعوة هذا مع الزهرات للتسجيل الحصري في فرقتكِ وباقاتكِ (رمز الدعوة: <code className="font-mono bg-amber-200 px-2 py-0.5 rounded text-blue-950 font-black">{inviteCode}</code>):
          </p>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(inviteCode);
            alert(`تم نسخ كود دعوة الفرقة: ${inviteCode}\nيمكن للزهرة إدخاله مباشرة في صفحة التسجيل.`);
          }}
          className="bg-blue-900 hover:bg-blue-950 text-white font-black px-5 py-3 rounded-2xl text-xs shadow-md shrink-0 flex items-center justify-center space-x-2 space-x-reverse transition-all active:scale-95 border border-blue-800 cursor-pointer"
        >
          <span>📋 نسخ كود دعوة الفرقة</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3 sm:space-x-4 space-x-reverse">
          <div className="p-2.5 sm:p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 shrink-0">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-gray-900">{zaharat.length}</div>
            <div className="text-[11px] sm:text-xs font-bold text-gray-500">إجمالي زهرات الفرقة</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3 sm:space-x-4 space-x-reverse">
          <div className="p-2.5 sm:p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 shrink-0">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-rose-600">{pendingSubmissions.length}</div>
            <div className="text-[11px] sm:text-xs font-bold text-gray-500">أنشطة بانتظار التقييم</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3 sm:space-x-4 space-x-reverse">
          <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 shrink-0">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-blue-600">{approvedSubmissions.length}</div>
            <div className="text-[11px] sm:text-xs font-bold text-gray-500">أنشطة مقبولة وموثقة</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3 sm:space-x-4 space-x-reverse">
          <div className="p-2.5 sm:p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 shrink-0">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-600">{totalBadgesEarned}</div>
            <div className="text-[11px] sm:text-xs font-bold text-gray-500">شارات هواية مكتسبة</div>
          </div>
        </div>

      </div>

      {/* Main Section: Pending Submissions & Patrols Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pending Submissions Queue (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                طلب إنجاز نشاط بحاجة لتقييم القائدة
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('submissions')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
            >
              عرض الكل ({pendingSubmissions.length})
            </button>
          </div>

          {pendingSubmissions.length === 0 ? (
            <div className="text-center py-10 bg-blue-50/50 rounded-2xl border border-blue-100/60 p-6">
              <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-blue-950">جميع الأنشطة تم تقييمها بنجاح!</h4>
              <p className="text-xs text-gray-500 mt-1">لا توجد إثباتات معلقة حالياً. أحسنتِ المتابعة يا قائدة.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-3 space-x-reverse min-w-0">
                    {/* Proof Thumbnail */}
                    {sub.proofBase64 ? (
                      <img
                        src={sub.proofBase64}
                        alt="إثبات النشاط"
                        className="w-16 h-16 rounded-xl object-cover border border-amber-300 shrink-0 shadow-xs cursor-pointer"
                        onClick={() => onSelectSubmission(sub.id)}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-200">
                        📄 ملف
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="font-bold text-sm text-gray-900">{sub.zahraName}</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                          {sub.stageId === 'nadhar' ? 'النضر' : sub.stageId === 'atar' ? 'العطر' : 'المثمر'}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-amber-950 mt-1 line-clamp-1">
                        النشاط: {sub.activityTitle}
                      </h5>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-0.5 leading-relaxed font-sans">
                        {sub.description}
                      </p>
                      <div className="text-[10px] text-gray-400 mt-1">
                        تاريخ الإرسال: {new Date(sub.submittedAt).toLocaleDateString('ar-TN')}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 space-x-reverse shrink-0">
                    <button
                      onClick={() => onSelectSubmission(sub.id)}
                      className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-bold flex items-center space-x-1 space-x-reverse cursor-pointer"
                      title="معاينة الإثبات كاملاً"
                    >
                      <Eye className="w-4 h-4 text-blue-700" />
                      <span className="hidden sm:inline">معاينة</span>
                    </button>
                    <button
                      onClick={() => onQuickApprove(sub.id)}
                      className="px-3 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs flex items-center space-x-1 space-x-reverse cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>قبول</span>
                    </button>
                    <button
                      onClick={() => onQuickReject(sub.id)}
                      className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center space-x-1 space-x-reverse cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>رفض</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Patrols & Sixes Overview Sidebar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">حالة السداسيات (الباقة)</h3>
            <button
              onClick={() => onNavigateTab('roster')}
              className="text-xs text-blue-700 font-bold hover:underline cursor-pointer"
            >
              سجل الزهرات
            </button>
          </div>

          <div className="space-y-3">
            {PATROLS.map((patrol) => {
              const members = zaharat.filter(z => z.patrolId === patrol.id);
              const leaderZahra = members.find(m => m.patrolRole === 'عريفة');

              return (
                <div
                  key={patrol.id}
                  className="p-3.5 rounded-2xl border transition-all"
                  style={{ backgroundColor: patrol.bgHex, borderColor: `${patrol.colorHex}40` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: patrol.colorHex }}
                      ></div>
                      <span className="font-bold text-xs text-gray-900">{patrol.name}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-white/80 rounded-full text-gray-700 shadow-xs">
                      {members.length} زهرات
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-gray-600 flex items-center justify-between">
                    <span>العريفة: {leaderZahra ? leaderZahra.name : 'لم تُحدد بعد'}</span>
                    <span className="text-[11px] font-semibold text-blue-900">{patrol.motto}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200/80 text-xs text-blue-900 space-y-1">
            <div className="font-bold flex items-center space-x-1.5 space-x-reverse">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>مقتطف كشفي من الدليل:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-blue-800 font-sans">
              "نظام السداسيات هو أساس الطريقة الكشفية في قسم الزهرات لتنمية روح التعاون وتوزيع المسؤوليات بين الفتيات."
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
