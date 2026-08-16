import React, { useState } from 'react';
import { Submission, ZahraUser, BadgeItem } from '../types';
import { BADGES_LIST } from '../data/curriculumData';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Award, 
  FileText, 
  Send, 
  Sparkles, 
  X, 
  Check, 
  AlertCircle,
  Filter,
  Image as ImageIcon
} from 'lucide-react';

interface SubmissionsReviewProps {
  submissions: Submission[];
  zaharat: ZahraUser[];
  onApproveSubmission: (subId: string, points: number, badgeId?: string, feedback?: string) => void;
  onRejectSubmission: (subId: string, feedback: string) => void;
  selectedSubmissionId?: string;
  onClearSelectedSubmission?: () => void;
}

export const SubmissionsReview: React.FC<SubmissionsReviewProps> = ({
  submissions,
  zaharat,
  onApproveSubmission,
  onRejectSubmission,
  selectedSubmissionId,
  onClearSelectedSubmission
}) => {
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [reviewingSub, setReviewingSub] = useState<Submission | null>(
    selectedSubmissionId ? submissions.find(s => s.id === selectedSubmissionId) || null : null
  );

  // Modal State for Reviewing
  const [pointsToAward, setPointsToAward] = useState<number>(50);
  const [badgeToAward, setBadgeToAward] = useState<string>('');
  const [leaderFeedback, setLeaderFeedback] = useState<string>('');
  const [reviewAction, setReviewAction] = useState<'APPROVE' | 'REJECT' | null>(null);
  const [imageZoomUrl, setImageZoomUrl] = useState<string | null>(null);

  const filteredSubmissions = submissions.filter(s => {
    if (filterStatus === 'ALL') return true;
    return s.status === filterStatus;
  });

  const handleOpenReview = (sub: Submission) => {
    setReviewingSub(sub);
    setPointsToAward(sub.pointsAwarded || (sub.badgeId ? 25 : 50));
    setBadgeToAward(sub.badgeAwarded || sub.badgeId || '');
    setLeaderFeedback(sub.leaderFeedback || '');
    setReviewAction(null);
  };

  const handleExecuteReview = () => {
    if (!reviewingSub || !reviewAction) return;

    if (reviewAction === 'APPROVE') {
      onApproveSubmission(
        reviewingSub.id,
        pointsToAward,
        badgeToAward || undefined,
        leaderFeedback || 'ممتازة يا زهرة! عمل رائع وتألق كشفي مبارك.'
      );
    } else {
      if (!leaderFeedback.trim()) {
        alert('يرجى كتابة سبب عدم القبول وتوجيهات للزهرة لتتمكن من تعديل الإثبات.');
        return;
      }
      onRejectSubmission(reviewingSub.id, leaderFeedback);
    }

    setReviewingSub(null);
    if (onClearSelectedSubmission) onClearSelectedSubmission();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 rounded-3xl shadow-lg border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="bg-amber-400 text-blue-950 font-black text-xs px-2.5 py-0.5 rounded-full">
              صندوق التقييم والمتابعة التربوية
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
            مراجعة وتسجيل أنشطة الزهرات
          </h2>
          <p className="text-xs text-blue-200 mt-0.5 max-w-2xl font-sans">
            تقوم القائدة بالمعاينة الدقيقة للإثباتات المحملة، ثم القبول مع إسناد الشارات والنقاط، أو الرفض مع تقديم الملاحظات التربوية.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-blue-950/80 p-1.5 rounded-2xl border border-blue-700/60 text-xs shrink-0">
          <button
            onClick={() => setFilterStatus('PENDING')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 space-x-reverse cursor-pointer ${
              filterStatus === 'PENDING' ? 'bg-amber-400 text-blue-950 shadow-xs' : 'text-blue-200 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-800" />
            <span>قيد المراجعة ({submissions.filter(s => s.status === 'PENDING').length})</span>
          </button>

          <button
            onClick={() => setFilterStatus('APPROVED')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 space-x-reverse cursor-pointer ${
              filterStatus === 'APPROVED' ? 'bg-amber-400 text-blue-950 shadow-xs' : 'text-blue-200 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" />
            <span>مقبولة ({submissions.filter(s => s.status === 'APPROVED').length})</span>
          </button>

          <button
            onClick={() => setFilterStatus('REJECTED')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 space-x-reverse cursor-pointer ${
              filterStatus === 'REJECTED' ? 'bg-amber-400 text-blue-950 shadow-xs' : 'text-blue-200 hover:text-white'
            }`}
          >
            <XCircle className="w-3.5 h-3.5 text-rose-800" />
            <span>مرفوضة ({submissions.filter(s => s.status === 'REJECTED').length})</span>
          </button>

          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              filterStatus === 'ALL' ? 'bg-amber-400 text-blue-950 shadow-xs' : 'text-blue-200 hover:text-white'
            }`}
          >
            الكل ({submissions.length})
          </button>
        </div>
      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-2">
          <FileText className="w-12 h-12 text-blue-400 mx-auto" />
          <h3 className="font-bold text-gray-800 text-base">لا توجد طلبات أنشطة ضمن التصفية الحالية</h3>
          <p className="text-xs text-gray-500">اختر تصفية أخرى أو انتظر قيام الزهرات بإرسال أنشطتهن.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSubmissions.map((sub) => {
            const isPending = sub.status === 'PENDING';
            const isApproved = sub.status === 'APPROVED';
            const isRejected = sub.status === 'REJECTED';

            return (
              <div
                key={sub.id}
                className={`bg-white rounded-3xl p-5 border shadow-sm transition-all flex flex-col justify-between space-y-4 ${
                  isPending ? 'border-amber-300 ring-1 ring-amber-200 bg-gradient-to-b from-white to-amber-50/20' : ''
                } ${isApproved ? 'border-blue-200 bg-blue-50/10' : ''} ${
                  isRejected ? 'border-rose-200 bg-rose-50/10' : ''
                }`}
              >
                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm shadow-xs border border-amber-200 shrink-0">
                        🌸
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{sub.zahraName}</h4>
                        <div className="text-[11px] text-gray-500">
                          الدرجة: {sub.stageId === 'nadhar' ? 'النضر 🟢' : sub.stageId === 'atar' ? 'العطر 🟣' : 'المثمر 🔴'}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs flex items-center space-x-1 space-x-reverse shrink-0 ${
                        isPending ? 'bg-amber-100 text-amber-900 border-amber-300' : ''
                      } ${isApproved ? 'bg-blue-100 text-blue-900 border-blue-300' : ''} ${
                        isRejected ? 'bg-rose-100 text-rose-900 border-rose-300' : ''
                      }`}
                    >
                      {isPending && <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />}
                      {isApproved && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      {isRejected && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                      <span>
                        {isPending ? 'قيد المراجعة والتقييم' : isApproved ? 'مقبول ✅' : 'مرفوض ❌'}
                      </span>
                    </span>
                  </div>

                  {/* Activity Details */}
                  <div className="bg-gray-50/80 p-3 rounded-2xl border border-gray-100 space-y-1 text-xs">
                    <div className="font-bold text-blue-950 flex items-center space-x-1.5 space-x-reverse">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{sub.activityTitle}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-sans mt-1">
                      {sub.description}
                    </p>
                  </div>

                  {/* Proof Attachment */}
                  {sub.proofBase64 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-gray-500 flex items-center space-x-1 space-x-reverse">
                        <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                        <span>الملف / الصورة المرفقة كإثبات للإنجاز:</span>
                      </div>
                      <div className="relative group overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                        <img
                          src={sub.proofBase64}
                          alt="إثبات الزهرة"
                          className="w-full h-44 object-cover group-hover:scale-105 transition-all duration-300 cursor-pointer"
                          onClick={() => setImageZoomUrl(sub.proofBase64 || null)}
                        />
                        <div
                          onClick={() => setImageZoomUrl(sub.proofBase64 || null)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white text-xs font-bold gap-2 cursor-pointer"
                        >
                          <Eye className="w-5 h-5" />
                          <span>تكبير الصورة ومعاينتها</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Leader Feedback if evaluated */}
                  {sub.leaderFeedback && (
                    <div
                      className={`p-3 rounded-2xl border text-xs space-y-0.5 ${
                        isApproved ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      <div className="font-bold text-[11px] flex items-center space-x-1 space-x-reverse">
                        <span>ملاحظة القائدة:</span>
                      </div>
                      <p className="font-sans leading-relaxed text-xs">{sub.leaderFeedback}</p>
                      {sub.pointsAwarded && (
                        <div className="mt-1 font-bold text-blue-700 text-[11px]">
                          🏆 النقاط الممنوحة: +{sub.pointsAwarded} نقطة
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-gray-400">
                    تاريخ الإرسال: {new Date(sub.submittedAt).toLocaleDateString('ar-TN')}
                  </span>

                  <button
                    onClick={() => handleOpenReview(sub)}
                    className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs flex items-center space-x-1.5 space-x-reverse transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-amber-300" />
                    <span>{isPending ? 'تقييم واتخاذ قرار' : 'تعديل التقييم'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal Dialog */}
      {reviewingSub && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-800 shrink-0">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="p-2 bg-amber-400 text-blue-950 rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-amber-300">تقييم نشاط الزهرة</h3>
                  <p className="text-xs text-blue-200">الزهرة: {reviewingSub.zahraName}</p>
                </div>
              </div>
              <button
                onClick={() => setReviewingSub(null)}
                className="p-1.5 rounded-lg hover:bg-blue-800 text-blue-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs font-sans">
              
              {/* Activity Info */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 space-y-1">
                <div className="font-bold text-xs">عنوان النشاط: {reviewingSub.activityTitle}</div>
                <div className="text-gray-700 font-sans leading-relaxed">{reviewingSub.description}</div>
              </div>

              {/* Base64 Image Preview */}
              {reviewingSub.proofBase64 && (
                <div className="space-y-1">
                  <div className="font-bold text-gray-700">الصورة المحملة كإثبات:</div>
                  <img
                    src={reviewingSub.proofBase64}
                    alt="معاينة الإثبات"
                    className="w-full max-h-56 object-contain rounded-2xl border border-gray-200 bg-black/5 cursor-pointer"
                    onClick={() => setImageZoomUrl(reviewingSub.proofBase64 || null)}
                  />
                </div>
              )}

              {/* Decision Selector */}
              <div className="space-y-2 pt-2">
                <label className="font-bold text-gray-900 block text-sm">قرار القائدة:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReviewAction('APPROVE')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-2 space-x-reverse transition-all cursor-pointer ${
                      reviewAction === 'APPROVE'
                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300 shadow-md'
                        : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>قبول النشاط ✅</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewAction('REJECT')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-2 space-x-reverse transition-all cursor-pointer ${
                      reviewAction === 'REJECT'
                        ? 'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-300 shadow-md'
                        : 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <XCircle className="w-5 h-5" />
                    <span>طلب تعديل / رفض ❌</span>
                  </button>
                </div>
              </div>

              {/* If Approved Options */}
              {reviewAction === 'APPROVE' && (
                <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200 space-y-3 animate-in fade-in">
                  <div>
                    <label className="font-bold text-blue-950 block mb-1">
                      النقاط الممنوحة للزهرة:
                    </label>
                    <input
                      type="number"
                      value={pointsToAward}
                      onChange={(e) => setPointsToAward(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-blue-300 bg-white font-bold text-blue-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-blue-950 block mb-1">
                      إسناد شارة هواية اختيارية (إن وجدت):
                    </label>
                    <select
                      value={badgeToAward}
                      onChange={(e) => setBadgeToAward(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-blue-300 bg-white text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="">-- بدون شارة جديدة --</option>
                      {BADGES_LIST.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.icon} {b.name} ({b.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Leader Note Input */}
              {reviewAction && (
                <div className="space-y-1">
                  <label className="font-bold text-gray-900 block">
                    ملاحظات القائدة والتوجيهات الكشفية:
                  </label>
                  <textarea
                    rows={3}
                    value={leaderFeedback}
                    onChange={(e) => setLeaderFeedback(e.target.value)}
                    placeholder={
                      reviewAction === 'APPROVE'
                        ? 'اكتبي كلمة تشجيعية للزهرة (مثال: أحسنتِ المتابعة يا زهرة، إنجاز رائع!)...'
                        : 'اكتبي للزهرة سبب عدم القبول والتعديل المطلوب (مثال: يرجى إيضاح الصورة وتدوين عناصر العقدة الكشفية)...'
                    }
                    className="w-full p-3 rounded-2xl border border-gray-300 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-2 space-x-reverse shrink-0">
              <button
                onClick={() => setReviewingSub(null)}
                className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200 text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                onClick={handleExecuteReview}
                disabled={!reviewAction}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs shadow-md disabled:opacity-50 transition-all flex items-center space-x-1.5 space-x-reverse cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>حفظ التقييم وإرسال التنبيه الفوري</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {imageZoomUrl && (
        <div
          onClick={() => setImageZoomUrl(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={imageZoomUrl}
              alt="صورة مكبرة للإثبات"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border-2 border-white/20"
            />
            <button
              onClick={() => setImageZoomUrl(null)}
              className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
