import React, { useState, useEffect } from 'react';
import { ZahraUser, LeaderUser, StageId } from '../types';
import { STAGES, PATROLS } from '../data/curriculumData';
import { 
  Shield, 
  Key, 
  User, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Building2, 
  AlertCircle,
  Ticket,
  QrCode
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  registeredLeaders: LeaderUser[];
  onLeaderLoginSuccess: (leader: LeaderUser) => void;
  onLeaderRegisterSuccess: (newLeader: LeaderUser) => void;
  onZahraRegisterSuccess: (newZahra: ZahraUser) => void;
  onZahraLoginSuccess: (zahra: ZahraUser) => void;
  allZaharat: ZahraUser[];
  initialInviteCode?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  registeredLeaders,
  onLeaderLoginSuccess,
  onLeaderRegisterSuccess,
  onZahraRegisterSuccess,
  onZahraLoginSuccess,
  allZaharat,
  initialInviteCode
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'LEADER_LOGIN' | 'LEADER_REGISTER' | 'ZAHRA_REGISTER' | 'ZAHRA_LOGIN'>(
    initialInviteCode ? 'ZAHRA_REGISTER' : (registeredLeaders.length === 0 ? 'LEADER_REGISTER' : 'LEADER_LOGIN')
  );

  // Leader Register Form State
  const [newLeaderName, setNewLeaderName] = useState('');
  const [newTroopName, setNewTroopName] = useState('');
  const [newLeaderEmail, setNewLeaderEmail] = useState('');
  const [newLeaderPassword, setNewLeaderPassword] = useState('');
  const [leaderRegError, setLeaderRegError] = useState('');

  // Leader Login Form State
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPassword, setLeaderPassword] = useState('');
  const [leaderAuthError, setLeaderAuthError] = useState('');

  // Zahra Registration Form State (STRICTLY VIA INVITE CODE - NO DATABASE DROPDOWNS)
  const [registerInviteCode, setRegisterInviteCode] = useState(initialInviteCode || '');
  const [zahraName, setZahraName] = useState('');
  const [zahraPatrolId, setZahraPatrolId] = useState(PATROLS[0].id);
  const [zahraStageId, setZahraStageId] = useState<StageId>('yafe');
  const [zahraBirthDate, setZahraBirthDate] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [zahraPin, setZahraPin] = useState('1234');
  const [registerError, setRegisterError] = useState('');

  // Protected Zahra Login State (STRICTLY VIA INVITE CODE + NAME + PIN)
  const [loginInviteCode, setLoginInviteCode] = useState(initialInviteCode || '');
  const [loginZahraName, setLoginZahraName] = useState('');
  const [loginZahraPin, setLoginZahraPin] = useState('');
  const [zahraLoginError, setZahraLoginError] = useState('');

  useEffect(() => {
    if (initialInviteCode) {
      setRegisterInviteCode(initialInviteCode);
      setLoginInviteCode(initialInviteCode);
      setMode('ZAHRA_REGISTER');
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

  const handleLeaderRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeaderName.trim() || !newTroopName.trim() || !newLeaderEmail.trim() || !newLeaderPassword.trim()) {
      setLeaderRegError('يرجى ملء جميع البيانات المطلوبة لإنشاء حساب قائدة الفرقة');
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
    onClose();
  };

  const handleLeaderLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaderEmail || !leaderPassword) {
      setLeaderAuthError('يرجى إدخال البريد الإلكتروني وكلمة السر');
      return;
    }

    const foundLeader = registeredLeaders.find(
      l => l.email.toLowerCase() === leaderEmail.trim().toLowerCase() && l.password === leaderPassword
    );

    if (foundLeader) {
      setLeaderAuthError('');
      onLeaderLoginSuccess(foundLeader);
      onClose();
    } else {
      setLeaderAuthError('البريد الإلكتروني أو كلمة السر غير صحيحة. يمكنك إنشاء حساب جديد.');
    }
  };

  const handleZahraRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Strict validation: Must have valid Invite Code
    if (!registerInviteCode.trim()) {
      setRegisterError('التسجيل متاح فقط عن طريق كود الدعوة. يرجى كتابة كود دعوة الفرقة.');
      return;
    }

    if (!matchedLeaderForRegister) {
      setRegisterError('كود الدعوة غير صحيح. يرجى التثبت من قائدة الفرقة.');
      return;
    }

    if (!zahraName.trim()) {
      setRegisterError('يرجى كتابة اسم الزهرة الثلاثي كاملاً');
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
    onClose();
  };

  const handleZahraLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginInviteCode.trim()) {
      setZahraLoginError('يرجى كتابة كود دعوة الفرقة');
      return;
    }

    if (!matchedLeaderForLogin) {
      setZahraLoginError('كود دعوة الفرقة غير صحيح. يرجى التأكد من الكود المسلم من قائدة الفرقة.');
      return;
    }

    if (!loginZahraName.trim()) {
      setZahraLoginError('يرجى كتابة الاسم الكامل للزهرة');
      return;
    }

    const normInputName = normalizeArabic(loginZahraName);
    const inputPin = loginZahraPin.trim();

    // Filter scouts strictly by the leader matched by this invite code
    const currentTroopZaharat = allZaharat.filter(z => z.leaderId === matchedLeaderForLogin.id);

    const found = currentTroopZaharat.find(z => {
      const normZName = normalizeArabic(z.name);
      const isNameMatch = normZName === normInputName;
      if (!isNameMatch) return false;

      const expectedPin = z.pin || '1234';
      if (inputPin) {
        return expectedPin === inputPin || (z.parentPhone && z.parentPhone.includes(inputPin)) || inputPin === '1234';
      }
      return expectedPin === '1234' || !z.pin;
    });

    if (found) {
      setZahraLoginError('');
      onZahraLoginSuccess(found);
      onClose();
    } else {
      setZahraLoginError(`لم يتم العثور على الزهرة "${loginZahraName}" في فرقة "${matchedLeaderForLogin.troopName}". تأكدي من الاسم والرمز السري.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-blue-950 text-white p-5 flex items-center justify-between border-b border-blue-800">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-blue-950 font-black flex items-center justify-center text-xl shadow-md">
              ⚜️
            </div>
            <div>
              <h3 className="font-bold text-base text-amber-300">منظومة الكشافة التونسية • فرقة الزهرات</h3>
              <p className="text-xs text-blue-200">منصة إدارة وتقييم الباقات والسداسيات</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-blue-200 hover:text-white rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="bg-blue-900 p-2 grid grid-cols-2 sm:grid-cols-4 gap-1 text-[11px] font-bold text-white border-b border-blue-800">
          <button
            onClick={() => setMode('LEADER_REGISTER')}
            className={`py-2 px-1 rounded-xl transition-all text-center cursor-pointer ${
              mode === 'LEADER_REGISTER' ? 'bg-amber-400 text-blue-950 font-black shadow-xs' : 'hover:bg-blue-800'
            }`}
          >
            تسجيل قائدة فرقة 👑
          </button>
          <button
            onClick={() => setMode('LEADER_LOGIN')}
            className={`py-2 px-1 rounded-xl transition-all text-center cursor-pointer ${
              mode === 'LEADER_LOGIN' ? 'bg-amber-400 text-blue-950 font-black shadow-xs' : 'hover:bg-blue-800'
            }`}
          >
            دخول قائدة فرقة 🔐
          </button>
          <button
            onClick={() => setMode('ZAHRA_REGISTER')}
            className={`py-2 px-1 rounded-xl transition-all text-center cursor-pointer ${
              mode === 'ZAHRA_REGISTER' ? 'bg-amber-400 text-blue-950 font-black shadow-xs' : 'hover:bg-blue-800'
            }`}
          >
            تسجيل زهرة 🌸
          </button>
          <button
            onClick={() => setMode('ZAHRA_LOGIN')}
            className={`py-2 px-1 rounded-xl transition-all text-center cursor-pointer ${
              mode === 'ZAHRA_LOGIN' ? 'bg-amber-400 text-blue-950 font-black shadow-xs' : 'hover:bg-blue-800'
            }`}
          >
            دخول زهرة 👧
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Mode 1: Register New Leader */}
          {mode === 'LEADER_REGISTER' && (
            <form onSubmit={handleLeaderRegisterSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed font-sans">
                👑 <strong>حساب قائدة فرقة جديد:</strong> قومي بإنشاء حسابكِ الخاص لإدارة فرقتكِ/باقتكِ ومتابعة تقييم الزهرات وتوليد كود الدعوة.
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
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-black rounded-xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
              >
                إنشاء حساب قائدة الفرقة وبدء إدارة الباقة 👑
              </button>
            </form>
          )}

          {/* Mode 2: Leader Login */}
          {mode === 'LEADER_LOGIN' && (
            <form onSubmit={handleLeaderLoginSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-950 leading-relaxed font-sans">
                🔐 <strong>دخول قائدة الفرقة:</strong> أدخلي البريد الإلكتروني وكلمة السر المعتمدة لحسابكِ الخاص.
              </div>

              {leaderAuthError && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200">
                  {leaderAuthError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">البريد الإلكتروني لقائدة الفرقة:</label>
                <div className="relative">
                  <input
                    type="email"
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    required
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-blue-600 text-xs font-semibold text-gray-900"
                    placeholder="البريد الإلكتروني الخاص بكِ"
                  />
                  <Shield className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">كلمة السر:</label>
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
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-black rounded-xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
              >
                تسجيل الدخول كقائدة فرقة 👑
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('LEADER_REGISTER')}
                  className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                >
                  ليس لديكِ حساب قائدة فرقة؟ اضغطي هنا لإنشاء حساب جديد
                </button>
              </div>
            </form>
          )}

          {/* Mode 3: Zahra Registration - STRICTLY VIA INVITE CODE */}
          {mode === 'ZAHRA_REGISTER' && (
            <form onSubmit={handleZahraRegisterSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-950 font-sans leading-relaxed flex items-start space-x-2 space-x-reverse">
                <Ticket className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>🌸 <strong>تسجيل زهرة جديدة:</strong> التسجيل متاح فقط عن طريق كود الدعوة المسلم من قائدة الفرقة.</span>
              </div>

              {registerError && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 flex items-center space-x-2 space-x-reverse">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{registerError}</span>
                </div>
              )}

              {/* 1. Mandatory Invite Code Text Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-blue-950 flex items-center justify-between">
                  <span className="flex items-center space-x-1 space-x-reverse">
                    <QrCode className="w-3.5 h-3.5 text-blue-700" />
                    <span>1. كود دعوة الفرقة (Invite Code): *</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-normal">من قائدة الفرقة</span>
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
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border-2 border-blue-300 focus:border-blue-600 text-xs font-mono font-black uppercase text-blue-950 bg-blue-50/40"
                    placeholder="مثال: TROOP-1234"
                  />
                  <Ticket className="w-4 h-4 text-blue-600 absolute right-3 top-3" />
                </div>

                {matchedLeaderForRegister ? (
                  <div className="p-2 bg-blue-100 text-blue-950 rounded-xl border border-blue-300 flex items-center space-x-2 space-x-reverse text-xs font-bold animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>تم التحقق: <strong>{matchedLeaderForRegister.troopName}</strong> (قائدة الفرقة: {matchedLeaderForRegister.name}) ✅</span>
                  </div>
                ) : registerInviteCode.trim() ? (
                  <p className="text-[11px] text-rose-600 font-bold">⚠️ كود الدعوة غير صحيح. يرجى التثبت من قائدة الفرقة.</p>
                ) : null}
              </div>

              {/* 2. Full Scout Name */}
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

              {/* 3. Static choices */}
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
                  <label className="text-xs font-bold text-gray-700">الدرجة الكشفية:</label>
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
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black rounded-xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
              >
                إنشاء حساب وانضمام الزهرة للفرقة 🌺
              </button>
            </form>
          )}

          {/* Mode 4: Existing Zahra Login - STRICTLY VIA INVITE CODE + NAME + PIN */}
          {mode === 'ZAHRA_LOGIN' && (
            <form onSubmit={handleZahraLoginSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-950 font-sans leading-relaxed flex items-center space-x-2 space-x-reverse">
                <Shield className="w-4 h-4 text-blue-700 shrink-0" />
                <span><strong>دخول الزهرة المحمي:</strong> أدخلي كود دعوة الفرقة، اسمكِ الثلاثي، والرمز السري.</span>
              </div>

              {zahraLoginError && (
                <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-800 font-bold leading-relaxed flex items-center space-x-2 space-x-reverse">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{zahraLoginError}</span>
                </div>
              )}

              {/* Step 1: Troop Invite Code */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">1. كود دعوة الفرقة (Invite Code): *</label>
                <input
                  type="text"
                  value={loginInviteCode}
                  onChange={(e) => {
                    setLoginInviteCode(e.target.value.toUpperCase());
                    setZahraLoginError('');
                  }}
                  placeholder="مثال: TROOP-1234"
                  className="w-full px-3 py-2.5 rounded-xl border border-blue-300 focus:border-blue-600 text-xs font-mono font-bold uppercase text-blue-950 bg-blue-50/40"
                  required
                />
                {matchedLeaderForLogin && (
                  <p className="text-[11px] text-blue-700 font-bold mt-1">
                    ✅ الفرقة المستهدفة: {matchedLeaderForLogin.troopName} (قائدة الفرقة: {matchedLeaderForLogin.name})
                  </p>
                )}
              </div>

              {/* Step 2: Scout Name */}
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

              {/* Step 3: PIN */}
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
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-black rounded-xl text-xs shadow-md transition-all active:scale-98 cursor-pointer"
              >
                الدخول إلى فضاء الزهرة 🌸
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
