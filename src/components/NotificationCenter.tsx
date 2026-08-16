import React from 'react';
import { AppNotification } from '../types';
import { Bell, Check, CheckCircle2, XCircle, FileText, Sparkles, X, Info } from 'lucide-react';

interface NotificationCenterProps {
  notifications: AppNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectSubmission?: (submissionId: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onSelectSubmission
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-start">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-800">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="p-2 bg-amber-400 text-blue-950 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-amber-300">مركز التنبيهات والإشعارات</h3>
              <p className="text-xs text-blue-200 font-sans">تنبيهات فورية لتقييم المهام والتقدم الكشفي</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-blue-800 text-blue-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-blue-950">
            عدد التنبيهات ({notifications.length})
          </span>
          {notifications.some(n => !n.read) && (
            <button
              onClick={onMarkAllAsRead}
              className="text-blue-700 hover:text-blue-900 font-bold flex items-center space-x-1 space-x-reverse cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>تحديد الكل كمقروء</span>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <Sparkles className="w-10 h-10 mx-auto text-blue-300 animate-pulse" />
              <p className="text-sm font-semibold text-gray-600">لا توجد تنبيهات جديدة حالياً</p>
              <p className="text-xs text-gray-400">ستظهر هنا التنبيهات الفورية عند إنجاز المهام أو تقييم الأنشطة.</p>
            </div>
          ) : (
            notifications.map((notif) => {
              let icon = <Info className="w-5 h-5 text-blue-500" />;
              let bg = 'bg-gray-50 border-gray-200';

              if (notif.type === 'SUBMISSION_NEW') {
                icon = <FileText className="w-5 h-5 text-amber-600" />;
                bg = 'bg-amber-50 border-amber-200';
              } else if (notif.type === 'SUBMISSION_APPROVED') {
                icon = <CheckCircle2 className="w-5 h-5 text-blue-600" />;
                bg = 'bg-blue-50 border-blue-200';
              } else if (notif.type === 'SUBMISSION_REJECTED') {
                icon = <XCircle className="w-5 h-5 text-rose-600" />;
                bg = 'bg-rose-50 border-rose-200';
              } else if (notif.type === 'TASK_ASSIGNED') {
                icon = <Sparkles className="w-5 h-5 text-purple-600" />;
                bg = 'bg-purple-50 border-purple-200';
              }

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    if (notif.relatedSubmissionId && onSelectSubmission) {
                      onSelectSubmission(notif.relatedSubmissionId);
                      onClose();
                    }
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${bg} ${
                    !notif.read ? 'ring-2 ring-blue-500 shadow-sm' : 'opacity-85'
                  }`}
                >
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 mt-0.5">
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-xs text-gray-900 truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {new Date(notif.timestamp).toLocaleTimeString('ar-TN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-sans">
                        {notif.message}
                      </p>
                      {notif.relatedSubmissionId && (
                        <span className="inline-block mt-2 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                          اضغط للمعاينة والتقييم 👈
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t text-center text-[11px] text-gray-500">
          الكشافة التونسية • قسم الزهرات - إشعار فوري لحظي
        </div>

      </div>
    </div>
  );
};
