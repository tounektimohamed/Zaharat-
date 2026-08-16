import React, { useState } from 'react';
import { ZahraUser, StageId, LeaderNote } from '../types';
import { STAGES, PATROLS, BADGES_LIST } from '../data/curriculumData';
import { 
  Users, 
  UserPlus, 
  Award, 
  Phone, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  X, 
  Check, 
  Edit3,
  Heart
} from 'lucide-react';

interface ZaharatRosterProps {
  zaharat: ZahraUser[];
  onAddZahra: (newZahra: ZahraUser) => void;
  onUpdateZahra: (updated: ZahraUser) => void;
}

export const ZaharatRoster: React.FC<ZaharatRosterProps> = ({
  zaharat,
  onAddZahra,
  onUpdateZahra
}) => {
  const [selectedPatrol, setSelectedPatrol] = useState<string>('ALL');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [inspectingZahra, setInspectingZahra] = useState<ZahraUser | null>(null);

  // New Zahra Form state
  const [newName, setNewName] = useState('');
  const [newPatrol, setNewPatrol] = useState('red-patrol');
  const [newRole, setNewRole] = useState<'عريفة' | 'مساعدة عريفة' | 'منشطة' | 'إعلامية' | 'ماهرة' | 'متصرفة' | 'زهرة'>('زهرة');
  const [newStage, setNewStage] = useState<StageId>('nadhar');
  const [newPhone, setNewPhone] = useState('');

  const filteredZaharat = zaharat.filter(z => {
    if (selectedPatrol !== 'ALL' && z.patrolId !== selectedPatrol) return false;
    if (selectedStage !== 'ALL' && z.stageId !== selectedStage) return false;
    return true;
  });

  const handleCreateZahra = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const created: ZahraUser = {
      id: `zahra-${Date.now()}`,
      name: newName.trim(),
      role: 'ZAHRA',
      patrolId: newPatrol,
      patrolRole: newRole,
      stageId: newStage,
      joinedDate: new Date().toISOString().split('T')[0],
      points: 50,
      badgesEarned: [],
      completedActivityIds: [],
      parentPhone: newPhone.trim() || undefined,
      pin: '1234'
    };

    onAddZahra(created);
    setShowAddModal(false);
    setNewName('');
    setNewPhone('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 rounded-3xl shadow-lg border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="bg-amber-400 text-blue-950 font-black text-xs px-2.5 py-0.5 rounded-full">
              سجل الباقة والسداسيات
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
            إدارة سجل الزهرات والسداسيات
          </h2>
          <p className="text-xs text-blue-200 mt-0.5 max-w-2xl font-sans">
            عرض معلومات زهرات الباقة الكشفية، توزيع المهام داخل السداسي وتحديث درجات التدرج الشخصي.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-4 py-2.5 rounded-xl text-xs shadow-md flex items-center space-x-2 space-x-reverse shrink-0 transition-all active:scale-95 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>إضافة زهرة جديدة للفرقة</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Patrol Filter */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="font-bold text-gray-700">تصفية بالسداسي:</span>
          <select
            value={selectedPatrol}
            onChange={(e) => setSelectedPatrol(e.target.value)}
            className="p-2 rounded-xl border border-gray-300 font-bold text-gray-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL">جميع السداسيات</option>
            {PATROLS.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Stage Filter */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="font-bold text-gray-700">تصفية بالدرجة:</span>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="p-2 rounded-xl border border-gray-300 font-bold text-gray-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL">جميع الدرجات</option>
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="text-gray-500 font-bold">
          عدد الزهرات المعروضات: {filteredZaharat.length} زهرة
        </div>

      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredZaharat.map((z) => {
          const patrolObj = PATROLS.find(p => p.id === z.patrolId);
          const stageObj = STAGES.find(s => s.id === z.stageId);

          return (
            <div
              key={z.id}
              className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 font-black text-xl flex items-center justify-center border border-amber-300 shadow-2xs">
                      🌸
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">{z.name}</h3>
                      <div className="text-[11px] font-semibold text-blue-900">
                        {z.patrolRole || 'زهرة'}
                      </div>
                    </div>
                  </div>

                  <span
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: patrolObj?.bgHex || '#f3f4f6',
                      borderColor: patrolObj?.colorHex || '#d1d5db',
                      color: patrolObj?.colorHex || '#111827'
                    }}
                  >
                    {patrolObj?.name || 'سداسي'}
                  </span>
                </div>

                {/* Info Pills */}
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-xs space-y-1.5">
                  <div className="flex justify-between text-gray-600 font-sans">
                    <span>الدرجة الكشفية:</span>
                    <strong className="text-blue-950">{stageObj?.name}</strong>
                  </div>
                  <div className="flex justify-between text-gray-600 font-sans">
                    <span>نقاط التدرج:</span>
                    <strong className="text-amber-600">{z.points} نقطة ⭐️</strong>
                  </div>
                  <div className="flex justify-between text-gray-600 font-sans">
                    <span>أنشطة موثقة:</span>
                    <strong className="text-blue-700">{z.completedActivityIds.length} أنشطة</strong>
                  </div>
                </div>

              </div>

              <button
                onClick={() => setInspectingZahra(z)}
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 rounded-xl text-xs shadow-2xs transition-all flex items-center justify-center space-x-1 space-x-reverse cursor-pointer"
              >
                <span>فتح بطاقة الزهرة والسجل الكشفي</span>
              </button>

            </div>
          );
        })}
      </div>

      {/* Add Zahra Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-800">
              <h3 className="font-bold text-base text-amber-300">إضافة زهرة جديدة إلى الفرقة</h3>
              <button onClick={() => setShowAddModal(false)} className="text-blue-200 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateZahra} className="p-5 space-y-3 text-xs font-sans">
              <div>
                <label className="font-bold text-gray-900 block mb-1">الاسم واللقب للزهرة:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مريم بن صلاح"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-900 block mb-1">السداسي:</label>
                  <select
                    value={newPatrol}
                    onChange={(e) => setNewPatrol(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 font-bold"
                  >
                    {PATROLS.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-900 block mb-1">دورها بالسداسي:</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 font-bold"
                  >
                    <option value="عريفة">عريفة السداسي 👑</option>
                    <option value="مساعدة عريفة">مساعدة عريفة ⭐️</option>
                    <option value="منشطة">منشطة (أناشيد)</option>
                    <option value="إعلامية">إعلامية</option>
                    <option value="ماهرة">ماهرة</option>
                    <option value="متصرفة">متصرفة (حصالة)</option>
                    <option value="زهرة">زهرة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-900 block mb-1">درجة التدرج الكشفي الأولى:</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as StageId)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 font-bold"
                >
                  {STAGES.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-900 block mb-1">رقم هاتف الولي (اختياري):</label>
                <input
                  type="text"
                  placeholder="+216 ..."
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2 space-x-reverse border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-amber-400 text-blue-950 font-black px-5 py-2 rounded-xl shadow-md cursor-pointer hover:bg-amber-300"
                >
                  حفظ وتسجيل الزهرة
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Inspect Zahra Modal */}
      {inspectingZahra && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-800">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-2xl">🌸</span>
                <div>
                  <h3 className="font-bold text-base text-amber-300">{inspectingZahra.name}</h3>
                  <div className="text-xs text-blue-200">بطاقة المتابعة الشخصية والسجل الذهبي</div>
                </div>
              </div>
              <button onClick={() => setInspectingZahra(null)} className="text-blue-200 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs font-sans">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 grid grid-cols-3 gap-3">
                <div>
                  <span className="text-gray-500 block text-[10px]">الدور بالسداسي:</span>
                  <strong className="text-blue-950 text-xs font-bold">{inspectingZahra.patrolRole || 'زهرة'}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">النقاط المكتسبة:</span>
                  <strong className="text-amber-600 text-xs font-bold">{inspectingZahra.points} نقطة ⭐️</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">الرمز السري (PIN):</span>
                  <code className="text-blue-900 text-xs font-mono font-bold bg-blue-100 px-1.5 py-0.5 rounded">{inspectingZahra.pin || '1234'}</code>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">شارات الهواية المكتسبة ({inspectingZahra.badgesEarned.length}):</h4>
                <div className="flex flex-wrap gap-2">
                  {inspectingZahra.badgesEarned.map(badgeId => {
                    const bObj = BADGES_LIST.find(b => b.id === badgeId);
                    return (
                      <span key={badgeId} className="px-2.5 py-1 bg-purple-100 text-purple-900 rounded-xl font-bold border border-purple-200 text-[11px]">
                        {bObj?.icon} {bObj?.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setInspectingZahra(null)}
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl cursor-pointer"
                >
                  إلغاء وإغلاق البطاقة
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
