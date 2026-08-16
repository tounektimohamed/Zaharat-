import React, { useState } from 'react';
import { ZahraUser, LeaderUser, Role } from '../types';
import { 
  Award, 
  Bell, 
  BookOpen, 
  Sparkles, 
  UserCheck, 
  Users, 
  ShieldCheck, 
  Compass,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  LogOut,
  UserPlus
} from 'lucide-react';

interface HeaderProps {
  currentUser: { type: 'LEADER'; leader?: LeaderUser } | { type: 'ZAHRA'; zahra: ZahraUser };
  allZaharat: ZahraUser[];
  onSwitchUser: (userType: 'LEADER' | string) => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  unreadNotifsCount: number;
  onOpenNotifs: () => void;
  onOpenHandbook: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  allZaharat,
  onSwitchUser,
  onOpenAuthModal,
  onLogout,
  unreadNotifsCount,
  onOpenNotifs,
  onOpenHandbook,
  activeTab,
  setActiveTab
}) => {
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);

  const isLeader = currentUser.type === 'LEADER';
  const currentLeader = isLeader ? (currentUser as { type: 'LEADER'; leader?: LeaderUser }).leader : null;
  const currentZahra = !isLeader ? (currentUser as { type: 'ZAHRA'; zahra: ZahraUser }).zahra : null;

  const leaderDisplayName = currentLeader ? currentLeader.name : 'قائدة الفرقة والباقة';
  const leaderTroopName = currentLeader ? currentLeader.troopName : 'فرقة الزهرات';

  return (
    <header className="bg-blue-950 text-white shadow-xl sticky top-0 z-40 border-b border-blue-900">
      {/* Top Banner / Scout Identity */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 p-1 flex items-center justify-center shadow-md border-2 border-amber-300 text-blue-950 font-black text-xl shrink-0">
              ⚜️
            </div>
            <div>
              <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-1">
                <h1 className="text-base sm:text-lg md:text-xl font-black tracking-wide text-amber-300">
                  تطبيق زهرات الكشافة التونسية
                </h1>
                <span className="bg-blue-900 text-amber-300 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full border border-blue-700 font-bold">
                  قسم الزهرات • الأزرق والأصفر
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-blue-200 mt-0.5">
                منظومة إدارة الباقة والتدرج الشخصي والتثبت من الأنشطة
              </p>
            </div>
          </div>

          {/* Action Bar & User Selector */}
          <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse justify-between md:justify-end">
            
            {/* Guidebook Button */}
            <button
              onClick={onOpenHandbook}
              className="flex items-center space-x-1.5 space-x-reverse bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-3 py-2 rounded-xl text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">دليل الباقة الكشفي</span>
              <span className="sm:hidden">الدليل 📖</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifs}
              className="relative p-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-blue-100 transition-all border border-blue-700/60 cursor-pointer"
              title="التنبيهات والإشعارات"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-blue-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce border-2 border-blue-950">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Role / User Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSwitchMenu(!showSwitchMenu)}
                className="flex items-center space-x-2 space-x-reverse bg-blue-900 hover:bg-blue-800 text-white px-2.5 sm:px-3 py-1.5 rounded-xl border border-blue-700 text-xs shadow transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-amber-400 text-blue-950 font-black flex items-center justify-center text-xs shrink-0 border border-amber-300">
                  {isLeader ? '👑' : '🌸'}
                </div>
                <div className="text-right hidden sm:block">
                  <div className="font-black text-amber-300">
                    {isLeader ? leaderDisplayName : currentZahra?.name}
                  </div>
                  <div className="text-[10px] text-blue-200">
                    {isLeader ? (currentLeader ? currentLeader.troopName : 'قائدة الفرقة') : `زهرة - ${currentZahra?.patrolRole || 'سداسي'}`}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
              </button>

              {/* Account Profile Menu */}
              {showSwitchMenu && (
                <div className="absolute left-0 mt-2 w-72 bg-white text-gray-800 rounded-2xl shadow-2xl border border-blue-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 text-[11px] font-bold text-blue-900 bg-blue-50 mb-2 border-y border-blue-100 flex items-center justify-between">
                    <span>بيانات الحساب المسجل:</span>
                    <span className="bg-amber-300 text-blue-950 text-[10px] px-2 py-0.5 rounded-full font-black">
                      {isLeader ? 'حساب قائدة فرقة 👑' : 'حساب زهرة 🌸'}
                    </span>
                  </div>

                  {/* Logged in User Card */}
                  {isLeader ? (
                    <div className="px-4 py-2 space-y-2">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 font-black text-lg flex items-center justify-center shrink-0 shadow-sm border border-amber-300">
                          👑
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-sm text-blue-950 truncate">{leaderDisplayName}</div>
                          <div className="text-xs text-gray-500 font-semibold">{leaderTroopName}</div>
                          {currentLeader?.email && (
                            <div className="text-[10px] text-gray-400 font-mono truncate">{currentLeader.email}</div>
                          )}
                        </div>
                      </div>

                      {/* Invite Code Quick Copy */}
                      {currentLeader?.inviteCode && (
                        <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-amber-800 font-bold block">رمز دعوة فرقتكِ:</span>
                            <code className="font-mono font-bold text-blue-950">{currentLeader.inviteCode}</code>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(currentLeader.inviteCode);
                              alert(`تم نسخ كود دعوة الفرقة: ${currentLeader.inviteCode}`);
                            }}
                            className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-blue-950 text-[11px] font-black rounded-lg shadow-xs cursor-pointer"
                          >
                            نسخ 📋
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-2 space-y-1.5">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 font-black text-lg flex items-center justify-center shrink-0 border border-blue-300">
                          🌸
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-sm text-gray-900 truncate">{currentZahra?.name}</div>
                          <div className="text-xs text-blue-700 font-bold">{currentZahra?.troopName || 'فرقة الزهرات'}</div>
                          <div className="text-[11px] text-gray-500">
                            {currentZahra?.patrolRole || 'زهرة'} • {currentZahra?.points || 0} نقطة ⭐️
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-100 my-2"></div>

                  {/* Leader Actions */}
                  {isLeader && (
                    <>
                      <button
                        onClick={() => {
                          onOpenAuthModal();
                          setShowSwitchMenu(false);
                        }}
                        className="w-full text-right px-4 py-2.5 text-xs font-bold text-blue-900 bg-blue-50/60 hover:bg-blue-100 flex items-center space-x-2 space-x-reverse transition-colors cursor-pointer"
                      >
                        <UserPlus className="w-4 h-4 text-blue-700 shrink-0" />
                        <span>تسجيل قائدة جديدة أو زهرة في الفرقة</span>
                      </button>
                      <div className="border-t border-gray-100 my-2"></div>
                    </>
                  )}

                  {/* Logout Button */}
                  <div className="px-3">
                    <button
                      onClick={() => {
                        onLogout();
                        setShowSwitchMenu(false);
                      }}
                      className="w-full text-center px-4 py-2.5 text-xs font-black text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 flex items-center justify-center space-x-2 space-x-reverse transition-all active:scale-98 shadow-xs cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>تسجيل الخروج والعودة لصفحة الدخول 🚪</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1.5 space-x-reverse mt-3 overflow-x-auto pb-1 scrollbar-none border-t border-blue-900 pt-2 text-xs font-bold">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 space-x-reverse whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-amber-400 text-blue-950 shadow-md font-black'
                : 'text-blue-100 hover:bg-blue-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{isLeader ? 'لوحة إدارة وتقييم الباقة 👑' : 'فضائي الكشفي الخاص 🌸'}</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 space-x-reverse whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-amber-400 text-blue-950 shadow-md font-black'
                : 'text-blue-100 hover:bg-blue-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>منهاج وأنشطة الزهرات</span>
          </button>

          {/* Leader-only Tab: Submissions Review */}
          {isLeader && (
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 space-x-reverse whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'submissions'
                  ? 'bg-amber-400 text-blue-950 shadow-md font-black'
                  : 'text-blue-100 hover:bg-blue-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>مراجعة وتقييم الإثباتات 📝</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 space-x-reverse whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-amber-400 text-blue-950 shadow-md font-black'
                : 'text-blue-100 hover:bg-blue-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLeader ? 'خارطة تدرج الباقة' : 'خارطة تدرجي الشخصي'}</span>
          </button>

          {/* Leader-only Tab: Troop Roster */}
          {isLeader && (
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-3.5 py-2 rounded-xl flex items-center space-x-1.5 space-x-reverse whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'roster'
                  ? 'bg-amber-400 text-blue-950 shadow-md font-black'
                  : 'text-blue-100 hover:bg-blue-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>سجل زهرات وسداسيات الفرقة 👥</span>
            </button>
          )}

        </nav>
      </div>
    </header>
  );
};
