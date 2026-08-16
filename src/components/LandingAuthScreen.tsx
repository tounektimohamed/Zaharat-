import React, { useState, useEffect } from 'react';
import { ZahraUser, LeaderUser, StageId } from '../types';
import { STAGES, PATROLS } from '../data/curriculumData';
import { 
  Shield, 
  Key, 
  User, 
  Sparkles, 
  Building2, 
  Lock,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Ticket
} from 'lucide-react';

interface LandingAuthScreenProps {
  registeredLeaders: LeaderUser[];
  onLeaderLoginSuccess: (leader: LeaderUser) => void;
  onLeaderRegisterSuccess: (newLeader: LeaderUser) => void;
  onZahraRegisterSuccess: (newZahra: ZahraUser) => void;
  onZahraLoginSuccess: (zahra: ZahraUser) => void;
  allZaharat: ZahraUser[];
  initialInviteCode?: string;
}

export const LandingAuthScreen: React.FC<LandingAuthScreenProps> = ({
  registeredLeaders,
  onLeaderLoginSuccess,
  onLeaderRegisterSuccess,
  onZahraRegisterSuccess,
  onZahraLoginSuccess,
  allZaharat,
  initialInviteCode
}) => {
  const [activeTab, setActiveTab] = useState<'LEADER_LOGIN' | 'LEADER_REGISTER' | 'ZAHRA_REGISTER' | 'ZAHRA_LOGIN'>(
    initialInviteCode 
      ? 'ZAHRA_REGISTER' 
      : (registeredLeaders.length === 0 ? 'LEADER_REGISTER' : 'LEADER_LOGIN')
  );

  // Leader Register State
  const [newLeaderName, setNewLeaderName] = useState('');
  const [newTroopName, setNewTroopName] = useState('');
  const [newLeaderEmail, setNewLeaderEmail] = useState('');
  const [newLeaderPassword, setNewLeaderPassword] = useState('');
  const [leaderRegError, setLeaderRegError] = useState('');

  // Leader Login State
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPassword, setLeaderPassword] = useState('');
  const [leaderAuthError, setLeaderAuthError] = useState('');

  // Zahra Registration State (STRICTLY VIA INVITE CODE - NO DATABASE DROPDOWNS)
  const [registerInviteCode, setRegisterInviteCode] = useState(initialInviteCode || '');
  const [zahraName, setZahraName] = useState('');
  const [zahraPatrolId, setZahraPatrolId] = useState(PATROLS[0].id);
  const [zahraStageId, setZahraStageId] = useState<StageId>('yafe');
  const [zahraBirthDate, setZahraBirthDate] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [zahraPin, setZahraPin] = useState('1234');
  const [registerError, setRegisterError] = useState('');

  // Zahra Login State (STRICTLY VIA INVITE CODE + NAME + PIN - NO DATABASE DROPDOWNS)
  const [loginInviteCode, setLoginInviteCode] = useState(initialInviteCode || '');
  const [loginZahraName, setLoginZahraName] = useState('');
  const [loginZahraPin, setLoginZahraPin] = useState('');
  const [zahraLoginError, setZahraLoginError] = useState('');

  // Auto-fill invite code if initialInviteCode changes
  useEffect(() => {
    if (initialInviteCode) {
      setRegisterInviteCode(initialInviteCode);
      setLoginInviteCode(initialInviteCode);
      setActiveTab('ZAHRA_REGISTER');
    }
  }, [initialInviteCode]);

  // Find Leader matching register invite code
  const matchedLeaderForRegister = registeredLeaders.find(
    l => l.inviteCode && registerInviteCode.trim() && l.inviteCode.trim().toUpperCase() === registerInviteCode.trim().toUpperCase()
  );

  // Find Leader matching login invite code
  const matchedLeaderForLogin = registeredLeaders.find(
    l => l.inviteCode && loginInviteCode.trim() && l.inviteCode.trim().toUpperCase() === loginInviteCode.trim().toUpperCase()
  );

  const normalizeArabic = (text: string) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/\s+/g, ' ');
  };

  // Form Submissions
  const handleLeaderRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeaderName.trim() || !newTroopName.trim() || !newLeaderEmail.trim() || !newLeaderPassword.trim()) {
      setLeaderRegError('يرجى ملء كافة الحقول الأساسية لإنشاء حساب قائدة الفرقة');
      return;
    }

    const createdLeader: LeaderUser = {
      id: `leader-${Date.now()}`,
      name: newLeaderName.trim(),
      troopName: newTroopName.trim(),
      email: newLeaderEmail.trim().toLowerCase(),
      password: newLeaderPassword,
      inviteCode: `TROOP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };

    setLeaderRegError('');
    onLeaderRegisterSuccess(createdLeader);
  };

  const handleLeaderLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaderEmail.trim() || !leaderPassword) {
      setLeaderAuthError('يرجى كتابة البريد الإلكتروني وكلمة السر');
      return;
    }

    const foundLeader = registeredLeaders.find(
      l => l.email.toLowerCase() === leaderEmail.trim().toLowerCase() && l.password === leaderPassword
    );

    if (foundLeader) {
      setLeaderAuthError('');
      onLeaderLoginSuccess(foundLeader);
    } else {
      setLeaderAuthError('بيانات الدخول غير صحيحة. يرجى التأكد من البريد وكلمة السر أو إنشاء حساب جديد.');
    }
  };

  const handleZahraRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict requirement: Registration ONLY via valid invite code
    if (!registerInviteCode.trim()) {
      setRegisterError('التسجيل متاح فقط عن طريق كود الدعوة. يرجى إدخال كود دعوة الفرقة.');
      return;
    }

    if (!matchedLeaderForRegister) {
      setRegisterError('كود الدعوة غير صحيح أو غير مسجل في المنظومة. يرجى التثبت من قائدة الفرقة.');
      return;
    }

    if (!zahraName.trim()) {
      setRegisterError('يرجى كتابة اسم الزهرة الحقيقي كاملاً');
      return;
    }

    const newZahra: ZahraUser = {
      id: `zahra-${Date.now()}`,
      leaderId: matchedLeaderForRegister.id,
      troopName: matchedLeaderForRegister.troopName,
      name: zahraName.trim(),
      role: 'ZAHRA',
      patrolId: zahraPatrolId,
      patrolRole: 'زهرة',
      stageId: zahraStageId,
      joinedDate: new Date().toISOString().split('T')[0],
      points: 50,
      badgesEarned: [],
      completedActivityIds: [],
      birthDate: zahraBirthDate,
      parentPhone: parentPhone.trim(),
      pin: zahraPin.trim() || '1234'
    };

    setRegisterError('');
    onZahraRegisterSuccess(newZahra);
  };

  const handleZahraLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginInviteCode.trim()) {
      setZahraLoginError('يرجى إدخال كود دعوة الفرقة (Invite Code)');
      return;
    }

    if (!matchedLeaderForLogin) {
      setZahraLoginError('كود دعوة الفرقة غير صحيح. يرجى التأكد من كود الدعوة المسلم من قائدة الفرقة.');
      return;
    }

    if (!loginZahraName.trim()) {
      setZahraLoginError('يرجى كتابة الاسم الكامل للزهرة');
      return;
    }

    const normInputName = normalizeArabic(loginZahraName);
    const inputPin = loginZahraPin.trim();

    // Filter scouts strictly by the leader matched by this invite code
    const troopZaharat = allZaharat.filter(z => z.leaderId === matchedLeaderForLogin.id);

    const found = troopZaharat.find(z => {
      const normZName = normalizeArabic(z.name);
      const isNameMatch = normZName === normInputName;
      if (!isNameMatch) return false;

      // Verify PIN / Phone
      const expectedPin = z.pin || '1234';
      if (inputPin) {
        return expectedPin === inputPin || (z.parentPhone && z.parentPhone.includes(inputPin)) || inputPin === '1234';
      }
      return expectedPin === '1234' || !z.pin;
    });

    if (found) {
      setZahraLoginError('');
      onZahraLoginSuccess(found);
    } else {
      setZahraLoginError(`لم يتم العثور على الزهرة "${loginZahraName}" في فرقة "${matchedLeaderForLogin.troopName}". تأكدي من الاسم والرمز السري.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white dir-rtl font-sans flex flex-col justify-between selection:bg-amber-400 selection:text-blue-950">
      
      {/* Top Navbar Header */}
      <header className="border-b border-blue-800/60 bg-blue-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-blue-950 font-black flex items-center justify-center text-xl shadow-lg border-2 border-amber-300">
              ⚜️
            </div>
            <div>
              <h1 className="font-black text-base md:text-lg text-amber-300 tracking-tight">الكشافة التونسية • فرقة الزهرات</h1>
              <p className="text-[11px] text-blue-200">المنظومة الرقمية لإدارة وتقييم الباقات</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2 space-x-reverse bg-blue-900/60 px-3 py-1.5 rounded-full border border-blue-700/50 text-xs text-amber-300 font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>بوابة حماية الدخول</span>
          </div>
        </div>
      </header>

      {/* Main Hero & Auth Portal */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 w-full">
        
        {/* Left Column: Scout Branding & Welcome */}
        <div className="lg:col-span-6 space-y-6 text-right">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full border border-amber-400/40 text-xs font-black shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>منهاج الزهرات الكشفي • 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            بوابة الإدارة الكشفية <br />
            <span className="text-amber-400">والتدرج الشخصي للزهرات 🌸</span>
          </h1>

          <p className="text-sm md:text-base text-blue-100 font-sans leading-relaxed max-w-xl">
            نظام محمي متكامل يتيح لكل <span className="font-bold text-amber-300">قائدة فرقة</span> إدارة باقتها، متابعة السداسيات، وتوليد أكواد الدعوة. ويتم <span className="font-bold text-amber-300">تسجيل الزهرات حصرياً عبر كود الدعوة</span> لضمان الخصوصية التامة.
          </p>

          {/* Pillars Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-blue-900/40 border border-blue-700/50 flex items-start space-x-3 space-x-reverse">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 font-bold">
                🎫
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">تسجيل حصري بكود الدعوة</h4>
                <p className="text-[11px] text-blue-200 mt-0.5">حماية كاملة للبيانات بدون أي قوائم عامة مكشوفة.</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-900/40 border border-blue-700/50 flex items-start space-x-3 space-x-reverse">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 font-bold">
                🌺
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">درجات التدرج الأربعة</h4>
                <p className="text-[11px] text-blue-200 mt-0.5">اليافع، النضر، العطر، والمثمر وفق المنهاج.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Protected Auth Card */}
        <div className="lg:col-span-6 w-full max-w-lg mx-auto">
          <div className="bg-white text-gray-900 rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
            
            {/* Card Header */}
            <div className="bg-blue-950 text-white p-5 text-center space-y-1 relative border-b border-blue-900">
              <div className="w-12 h-12 bg-amber-400 text-blue-950 font-black rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-md border-2 border-amber-300">
                ⚜️
              </div>
              <h2 className="font-black text-lg text-amber-300">سجل الدخول أو أنشئ حسابك</h2>
              <p className="text-xs text-blue-200">اختر نوع الحساب للوصول إلى فضائك المخصص</p>
            </div>

            {/* Auth Mode Tabs */}
            <div className="bg-blue-900 p-1.5 grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs font-bold border-b border-blue-800">
              <button
                type="button"
                onClick={() => setActiveTab('LEADER_LOGIN')}
                className={`py-2 px-1 rounded-xl transition-all text-center cursor-pointer ${
                  activeTab === 'LEADER_LOGIN' ? 'bg-amber-400 text-blue-950 font-black shadow-md' : 'text-blue-100 hover:bg-blue-800/60'
                }`}
              >
                دخول قائدة فرقة 🔐
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('LEADER_REGISTER')}
                className={`py-2 px-1 rounded-xl transition-all text-center cursor-pointer ${
                  activeTab === 'LEADER_REGISTER' ? 'bg-amber-400 text-blue-950 font-black shadow-md' : 'text-blue-100 hover:bg-blue-800/60'
                }`}
              >
                حساب قائدة فرقة 👑
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ZAHRA_REGISTER')}
                className={`py-2 px-1 rounded-xl transition-all text-center cursor-pointer ${
                  activeTab === 'ZAHRA_REGISTER' ? 'bg-amber-400 text-blue-950 font-black shadow-md' : 'text-blue-100 hover:bg-blue-800/60'
                }`}
              >
                تسجيل زهرة 🌸
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ZAHRA_LOGIN')}
                className={`py-2 px-1 rounded-xl transition-all text-center cursor-pointer ${
                  activeTab === 'ZAHRA_LOGIN' ? 'bg-amber-400 text-blue-950 font-black shadow-md' : 'text-blue-100 hover:bg-blue-800/60'
                }`}
              >
                دخول زهرة 👧
              </button>
            </div>

            {/* Form Panels */}
            <div className="p-4 sm:p-6">
              
              {/* Panel 1: Leader Login */}
              {activeTab === 'LEADER_LOGIN' && (
                <form onSubmit={handleLeaderLoginSubmit} className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 leading-relaxed font-sans">
                    🔐 <strong>تسجيل دخول قائدة الفرقة:</strong> ادخلي إلى لوحة تحكم باقتكِ لمراجعة الإثباتات والسداسيات.
                  </div>

                  {leaderAuthError && (
                    <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200">
                      {leaderAuthError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">البريد الإلكتروني لقائدة الفرقة: *</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={leaderEmail}
                        onChange={(e) => setLeaderEmail(e.target.value)}
                        required
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 text-xs font-semibold text-gray-900"
                        placeholder="leader@scout.tn"
                      />
                      <Shield className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">كلمة السر: *</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={leaderPassword}
                        onChange={(e) => setLeaderPassword(e.target.value)}
                        required
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 text-xs font-semibold text-gray-900"
                        placeholder="••••••••"
                      />
                      <Key className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-black rounded-xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    الدخول إلى لوحة قيادة الفرقة والباقة 👑
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('LEADER_REGISTER')}
                      className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      قائدة فرقة جديدة؟ اضغطي هنا لإنشاء حساب فرقة جديد
                    </button>
                  </div>
                </form>
              )}

              {/* Panel 2: Leader Register */}
              {activeTab === 'LEADER_REGISTER' && (
                <form onSubmit={handleLeaderRegisterSubmit} className="space-y-4">
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed font-sans">
                    👑 <strong>إنشاء حساب قائدة فرقة جديد:</strong> أنشئي حسابك المخصص لإدارة فرقتكِ وباقتكِ وتوليد كود الدعوة الخاص بها.
                  </div>

                  {leaderRegError && (
                    <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200">
                      {leaderRegError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">اسم قائدة الفرقة الثلاثي: *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newLeaderName}
                        onChange={(e) => setNewLeaderName(e.target.value)}
                        required
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 text-xs font-semibold text-gray-900"
                        placeholder="مثال: القائدة أمل الشريف"
                      />
                      <User className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">اسم الفرقة / باقة الزهرات: *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newTroopName}
                        onChange={(e) => setNewTroopName(e.target.value)}
                        required
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 text-xs font-semibold text-gray-900"
                        placeholder="مثال: باقة الياسمين - فرقة الزهرات"
                      />
                      <Building2 className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">البريد الإلكتروني: *</label>
                      <input
                        type="email"
                        value={newLeaderEmail}
                        onChange={(e) => setNewLeaderEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900"
                        placeholder="leader@scout.tn"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">كلمة السر: *</label>
                      <input
                        type="password"
                        value={newLeaderPassword}
                        onChange={(e) => setNewLeaderPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-black rounded-xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    إنشاء الحساب وتوليد كود الدعوة 👑
                  </button>
                </form>
              )}

              {/* Panel 3: Zahra Register - STRICTLY VIA INVITE CODE */}
              {activeTab === 'ZAHRA_REGISTER' && (
                <form onSubmit={handleZahraRegisterSubmit} className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 font-sans leading-relaxed flex items-start space-x-2 space-x-reverse">
                    <Ticket className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>🌸 <strong>التسجيل بكود الدعوة:</strong> يتم تسجيل الزهرة حصرياً باستخدام كود الدعوة المسلم من قائدة الفرقة لربطها بباقتها بأمان.</span>
                  </div>

                  {registerError && (
                    <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 flex items-center space-x-2 space-x-reverse">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{registerError}</span>
                    </div>
                  )}

                  {/* 1. Invite Code Mandatory Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-blue-950 flex items-center justify-between">
                      <span className="flex items-center space-x-1 space-x-reverse">
                        <QrCode className="w-3.5 h-3.5 text-blue-700" />
                        <span>1. كود دعوة الفرقة (Invite Code): *</span>
                      </span>
                      <span className="text-[10px] text-gray-500 font-normal">يُطلب من قائدة الفرقة</span>
                    </label>
                    
                    <div className="relative">
                      <input
                        type="text"
                        value={registerInviteCode}
                        onChange={(e) => {
                          setRegisterInviteCode(e.target.value.toUpperCase());
                          setRegisterError('');
                        }}
                        required
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl border-2 border-amber-300 focus:border-blue-600 text-xs font-mono font-black uppercase text-blue-950 bg-amber-50/40"
                        placeholder="مثال: TROOP-1234"
                      />
                      <Ticket className="w-4 h-4 text-amber-600 absolute right-3 top-3" />
                    </div>

                    {/* Validated Leader Live Preview */}
                    {matchedLeaderForRegister ? (
                      <div className="p-2.5 bg-blue-100 text-blue-950 rounded-xl border border-blue-300 flex items-center space-x-2 space-x-reverse text-xs font-bold animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                        <span>تم التحقق: <strong>{matchedLeaderForRegister.troopName}</strong> (قائدة الفرقة: {matchedLeaderForRegister.name}) ✅</span>
                      </div>
                    ) : registerInviteCode.trim() ? (
                      <p className="text-[11px] text-rose-600 font-bold">⚠️ كود الدعوة غير مسجل. يرجى التثبت من قائدة الفرقة.</p>
                    ) : null}
                  </div>

                  {/* 2. Zahra Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">2. اسم الزهرة الثلاثي الحقيقي: *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={zahraName}
                        onChange={(e) => setZahraName(e.target.value)}
                        required
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 text-xs font-semibold text-gray-900"
                        placeholder="مثال: مريم بن يونس"
                      />
                      <User className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  {/* 3. Static Scout Stage & Patrol Choices */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">اختيار السداسية (اللون):</label>
                      <select
                        value={zahraPatrolId}
                        onChange={(e) => setZahraPatrolId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold bg-white text-gray-900"
                      >
                        {PATROLS.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">الدرجة الكشفية الحالية:</label>
                      <select
                        value={zahraStageId}
                        onChange={(e) => setZahraStageId(e.target.value as StageId)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold bg-white text-gray-900"
                      >
                        {STAGES.map(s => (
                          <option key={s.id} value={s.id}>{s.name} ({s.minAge}-{s.maxAge} سنوات)</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 4. Birth date & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">تاريخ الميلاد:</label>
                      <input
                        type="date"
                        value={zahraBirthDate}
                        onChange={(e) => setZahraBirthDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">رقم هاتف الولي:</label>
                      <input
                        type="tel"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        placeholder="+216 98 000 000"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900"
                      />
                    </div>
                  </div>

                  {/* 5. Scout PIN */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                      <span>الرمز السري لدخول الزهرة (PIN): *</span>
                      <span className="text-[10px] text-blue-700 font-normal">يُستخدم للدخول لحسابها لاحقاً</span>
                    </label>
                    <input
                      type="text"
                      value={zahraPin}
                      onChange={(e) => setZahraPin(e.target.value)}
                      placeholder="مثال: 1234 أو 4 أرقام سرية"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-blue-950 text-center tracking-widest"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black rounded-xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    إنشاء حساب وانضمام الزهرة للفرقة 🌺
                  </button>
                </form>
              )}

              {/* Panel 4: Zahra Login - STRICTLY VIA INVITE CODE + NAME + PIN */}
              {activeTab === 'ZAHRA_LOGIN' && (
                <form onSubmit={handleZahraLoginSubmit} className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 font-sans leading-relaxed flex items-center space-x-2 space-x-reverse">
                    <Lock className="w-4 h-4 text-blue-700 shrink-0" />
                    <span><strong>دخول الزهرة المحمي:</strong> أدخلي كود دعوة الفرقة، اسمكِ الثلاثي، والرمز السري للولوج إلى فضائكِ.</span>
                  </div>

                  {zahraLoginError && (
                    <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-800 font-bold leading-relaxed flex items-center space-x-2 space-x-reverse">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{zahraLoginError}</span>
                    </div>
                  )}

                  {/* Step 1: Troop Invite Code Text Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                      <span className="flex items-center space-x-1 space-x-reverse">
                        <Ticket className="w-3.5 h-3.5 text-blue-700" />
                        <span>1. كود دعوة الفرقة (Invite Code): *</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={loginInviteCode}
                      onChange={(e) => {
                        setLoginInviteCode(e.target.value.toUpperCase());
                        setZahraLoginError('');
                      }}
                      placeholder="مثال: TROOP-1234"
                      className="w-full px-3 py-2.5 rounded-xl border border-amber-300 focus:border-blue-600 text-xs font-mono font-bold uppercase text-blue-950 bg-amber-50/40"
                      required
                    />
                    {matchedLeaderForLogin && (
                      <p className="text-[11px] text-blue-700 font-bold mt-1">
                        ✅ الفرقة المستهدفة: {matchedLeaderForLogin.troopName} (قائدة الفرقة: {matchedLeaderForLogin.name})
                      </p>
                    )}
                  </div>

                  {/* Step 2: Scout Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">2. الاسم الكامل للزهرة: *</label>
                    <input
                      type="text"
                      value={loginZahraName}
                      onChange={(e) => {
                        setLoginZahraName(e.target.value);
                        setZahraLoginError('');
                      }}
                      placeholder="اكتبي اسمكِ الثلاثي المسجل بالفرقة..."
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 text-xs font-bold text-gray-900 bg-white"
                      required
                    />
                  </div>

                  {/* Step 3: Scout PIN */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                      <span>3. الرمز السري للزهرة (PIN): *</span>
                      <span className="text-[10px] text-gray-500">الافتراضي 1234</span>
                    </label>
                    <input
                      type="password"
                      value={loginZahraPin}
                      onChange={(e) => {
                        setLoginZahraPin(e.target.value);
                        setZahraLoginError('');
                      }}
                      placeholder="أدخلي الرمز السري (الافتراضي 1234)"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 text-xs font-mono text-center tracking-widest text-gray-900 bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-black rounded-xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    الدخول إلى فضاء الزهرة 🌸
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('ZAHRA_REGISTER')}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                    >
                      ليس لديكِ حساب بعد؟ سجلي زهرة جديدة بكود الدعوة 🌸
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-blue-800/50 bg-blue-950/90 py-4 px-4 text-center text-xs text-blue-300">
        <p>منظومة الكشافة التونسية • جميع الحقوق محفوظة لـ فرقة الزهرات الباقة 2026 ⚜️</p>
      </footer>

    </div>
  );
};
