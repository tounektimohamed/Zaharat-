import React, { useState } from 'react';
import { ZahraUser, StageId, DomainId } from '../types';
import { PATROLS, STAGES, DOMAINS, ACTIVITIES_DATABASE } from '../data/curriculumData';
import { X, Send, Sparkles, AlertCircle, BookOpen } from 'lucide-react';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  zaharat: ZahraUser[];
  onAssignTask: (taskData: {
    title: string;
    description: string;
    assignedToType: 'ALL' | 'PATROL' | 'ZAHRA';
    targetId?: string;
    stageId?: StageId;
    domainId?: DomainId;
    dueDate?: string;
  }) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  zaharat,
  onAssignTask
}) => {
  if (!isOpen) return null;

  const [selectedActivityId, setSelectedActivityId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedToType, setAssignedToType] = useState<'ALL' | 'PATROL' | 'ZAHRA'>('ALL');
  const [targetId, setTargetId] = useState('');
  const [stageId, setStageId] = useState<StageId>('nadhar');
  const [domainId, setDomainId] = useState<DomainId>('scout');
  const [dueDate, setDueDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectCurriculumActivity = (actId: string) => {
    setSelectedActivityId(actId);
    if (actId) {
      const act = ACTIVITIES_DATABASE.find(a => a.id === actId);
      if (act) {
        setTitle(act.title);
        setStageId(act.stageId);
        setDomainId(act.domainId);
        setDescription(`إنجاز النشاط الكشفي المقترح: "${act.title}" الخاص بمرحلة (${STAGES.find(s => s.id === act.stageId)?.name}) ورفيق الأدغال (${act.companion}).`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setErrorMsg('يرجى كتابة عنوان المهمة والتفاصيل الكافية للزهرات.');
      return;
    }

    onAssignTask({
      title: title.trim(),
      description: description.trim(),
      assignedToType,
      targetId: assignedToType !== 'ALL' ? targetId : undefined,
      stageId,
      domainId,
      dueDate: dueDate || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-800">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="p-2 bg-amber-400 text-blue-950 rounded-xl font-bold">
              👑
            </div>
            <div>
              <h3 className="font-bold text-base text-amber-300">إرسال مهمة وتكليف نشاط للزهرات</h3>
              <p className="text-xs text-blue-200 font-sans">توجيه الأنشطة والتكليفات مع تنبيه فوري</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-blue-200 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-sans">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center space-x-2 space-x-reverse">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Select from Full Activities Curriculum Dropdown */}
          <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 space-y-1.5">
            <label className="font-bold text-blue-950 flex items-center space-x-1 space-x-reverse">
              <BookOpen className="w-3.5 h-3.5 text-blue-700" />
              <span>اختيار نشاط من دروب داون جميع الأنشطة (اختياري):</span>
            </label>
            <select
              value={selectedActivityId}
              onChange={(e) => handleSelectCurriculumActivity(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-blue-300 bg-white font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">-- أو ادخلي عنوان مخصص أدناه --</option>
              {STAGES.map((st) => (
                <optgroup key={st.id} label={`🌟 ${st.name}`}>
                  {ACTIVITIES_DATABASE.filter(a => a.stageId === st.id).map(act => (
                    <option key={act.id} value={act.id}>
                      #{act.number} - {act.title} ({act.companion})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-gray-900 block mb-1">عنوان المهمة أو النشاط الكشفي:</label>
            <input
              type="text"
              required
              placeholder="مثال: إتقان العقدة المربعة وتنظيف ركن السداسي..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-gray-900 block mb-1">المستهدفون بالتكليف:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAssignedToType('ALL')}
                className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                  assignedToType === 'ALL'
                    ? 'bg-amber-400 text-blue-950 border-amber-500 shadow-xs'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                الباقة كاملة 🌺
              </button>

              <button
                type="button"
                onClick={() => setAssignedToType('PATROL')}
                className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                  assignedToType === 'PATROL'
                    ? 'bg-amber-400 text-blue-950 border-amber-500 shadow-xs'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                سداسي محدد 🚩
              </button>

              <button
                type="button"
                onClick={() => setAssignedToType('ZAHRA')}
                className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                  assignedToType === 'ZAHRA'
                    ? 'bg-amber-400 text-blue-950 border-amber-500 shadow-xs'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                زهرة فردية 🌸
              </button>
            </div>
          </div>

          {assignedToType === 'PATROL' && (
            <div>
              <label className="font-bold text-gray-900 block mb-1">اختر السداسي:</label>
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 font-bold cursor-pointer"
              >
                <option value="">-- اختر السداسي --</option>
                {PATROLS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}

          {assignedToType === 'ZAHRA' && (
            <div>
              <label className="font-bold text-gray-900 block mb-1">اختر الزهرة المستهدفة:</label>
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 font-bold cursor-pointer"
              >
                <option value="">-- اختر الزهرة --</option>
                {zaharat.map((z) => (
                  <option key={z.id} value={z.id}>{z.name} ({z.patrolRole || 'زهرة'})</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="font-bold text-gray-900 block mb-1">تفاصيل وتوجيهات المهمة:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتبي شرحاً موجزاً للمطلوب وإرشادات التنفيذ للتدرج الكشفي..."
              className="w-full p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-xs"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2 space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-600 font-bold cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-6 py-2 rounded-xl shadow-md flex items-center space-x-1.5 space-x-reverse cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>إرسال التكليف والتنبيه الفوري</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
