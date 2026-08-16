import React, { useState } from 'react';
import { SCOUT_LAW, SCOUT_PROMISE, JUNGLE_VOICE, JUNGLE_STORY, DOMAINS, STAGES, BADGES_LIST } from '../data/curriculumData';
import { X, BookOpen, Compass, Shield, Award, Heart, Sparkles, Feather, CheckCircle2 } from 'lucide-react';

interface HandbookGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HandbookGuideModal: React.FC<HandbookGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeSection, setActiveSection] = useState<'promise' | 'story' | 'domains' | 'stages' | 'badges'>('promise');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-800 shrink-0">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-blue-950 font-black flex items-center justify-center text-lg">
              📖
            </div>
            <div>
              <h3 className="font-bold text-base text-amber-300">دليل قائدة الباقة - الكشافة التونسية</h3>
              <p className="text-xs text-blue-200">المنهاج التربوي والإطار الرمزي لقسم الزهرات</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-blue-200 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs Bar */}
        <div className="bg-blue-900 p-2 flex space-x-2 space-x-reverse overflow-x-auto text-xs font-bold text-white shrink-0 border-b border-blue-800">
          <button
            onClick={() => setActiveSection('promise')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'promise' ? 'bg-amber-400 text-blue-950 font-black shadow-xs' : 'hover:bg-blue-800'
            }`}
          >
            الوعد والقانون وصوت الأدغال 📜
          </button>

          <button
            onClick={() => setActiveSection('story')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'story' ? 'bg-amber-400 text-blue-950 font-black shadow-xs' : 'hover:bg-blue-800'
            }`}
          >
            قصة Tippi وشخصيات الأدغال 🌴
          </button>

          <button
            onClick={() => setActiveSection('domains')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'domains' ? 'bg-amber-400 text-blue-950 font-black shadow-xs' : 'hover:bg-blue-800'
            }`}
          >
            المجالات الستة والرمزيات 🐾
          </button>

          <button
            onClick={() => setActiveSection('stages')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'stages' ? 'bg-amber-400 text-blue-950 font-black shadow-xs' : 'hover:bg-blue-800'
            }`}
          >
            مراحل وساعات التدرج ⏳
          </button>

          <button
            onClick={() => setActiveSection('badges')}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'badges' ? 'bg-amber-400 text-blue-950 font-black shadow-xs' : 'hover:bg-blue-800'
            }`}
          >
            شارات الهواية ومتطلباتها 🏅
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs leading-relaxed font-sans text-gray-800">
          
          {/* Section 1: Promise & Law */}
          {activeSection === 'promise' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Promise */}
              <div className="p-5 bg-amber-50 rounded-3xl border-2 border-amber-300 space-y-2 text-center">
                <span className="text-2xl">📜</span>
                <h4 className="font-black text-amber-950 text-base">نص وعد الزهرة:</h4>
                <p className="text-sm font-bold text-amber-900 max-w-xl mx-auto leading-relaxed">
                  "{SCOUT_PROMISE}"
                </p>
              </div>

              {/* Scout Law */}
              <div className="p-5 bg-blue-50 rounded-3xl border border-blue-200 space-y-3">
                <h4 className="font-black text-blue-950 text-sm flex items-center space-x-2 space-x-reverse">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>قانون الزهرة (الـ 5 بنود):</span>
                </h4>
                <div className="space-y-2">
                  {SCOUT_LAW.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-blue-100 font-bold text-blue-950 shadow-2xs">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Jungle Voice */}
              <div className="p-5 bg-purple-50 rounded-3xl border border-purple-200 space-y-3">
                <h4 className="font-black text-purple-950 text-sm flex items-center space-x-2 space-x-reverse">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>صوت الأدغال (ميثاق زهرات الباقة):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {JUNGLE_VOICE.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-purple-100 font-bold text-purple-950">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Section 2: Story & Companions */}
          {activeSection === 'story' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                <h4 className="font-black text-blue-950 text-sm">{JUNGLE_STORY.title}</h4>
                <p className="text-gray-700 leading-relaxed font-sans">{JUNGLE_STORY.text}</p>
              </div>

              <h4 className="font-black text-gray-900 text-sm">شخصيات أصدقاء الأدغال والقيم الكشفية:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {JUNGLE_STORY.companions.map((comp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border bg-white shadow-2xs space-y-1">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-xl">🐾</span>
                      <div>
                        <div className="font-bold text-xs text-gray-900">{comp.name}</div>
                        <div className="text-[10px] text-gray-500">{comp.role}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs font-bold text-blue-900 bg-blue-50 p-2 rounded-xl">
                      القيم: {comp.trait}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Domains */}
          {activeSection === 'domains' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-black text-gray-900 text-sm">المجالات التنموية الستة والرمزيات المكانية:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOMAINS.map((dom) => (
                  <div
                    key={dom.id}
                    className="p-4 rounded-2xl border bg-white shadow-2xs space-y-2"
                    style={{ borderColor: dom.borderColor }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-gray-900">{dom.name}</div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        مكان الرمزية: {dom.symbolicPlace}
                      </span>
                    </div>
                    <div className="text-xs text-blue-900 font-bold">
                      الرفيق: {dom.animalNameArabic}
                    </div>
                    <p className="text-gray-600 text-[11px] leading-relaxed font-sans">
                      {dom.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Stages */}
          {activeSection === 'stages' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-black text-gray-900 text-sm">مراحل ومتطلبات التدرج الشخصي للزهرة:</h4>
              <div className="space-y-3">
                {STAGES.map((stage) => (
                  <div key={stage.id} className="p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-gray-900">{stage.name}</span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${stage.badgeBg}`}>
                        المدة: {stage.duration}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-sans">{stage.description}</p>
                    <div className="flex items-center space-x-4 space-x-reverse text-[11px] font-bold text-blue-900 pt-1">
                      <span>الأنشطة المقررة: {stage.requirementsCount} نشاطاً</span>
                      <span>• شارات الهواية المطلوبة: {stage.badgesRequired} شارات</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Badges & Requirements */}
          {activeSection === 'badges' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="font-black text-xs text-amber-950">دليل شارات الهواية الكشفية ومتطلبات الاستحقاق:</div>
                <p className="text-[11px] text-amber-900 mt-0.5 font-sans leading-relaxed">
                  تمنح القائدة شارة الهواية للزهرة بعد إنجاز الشروط الأربعة الخاصة بكل شارة وتوثيقها، لترصيع سترة الزهرة ودولاب إنجازاتها الكشفية.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {BADGES_LIST.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-2.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2.5 space-x-reverse">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-xl shrink-0">
                          {badge.icon}
                        </div>
                        <div>
                          <div className="font-black text-xs text-gray-900">{badge.name}</div>
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                            {badge.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-600 font-sans mt-2 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 space-y-1.5 bg-gray-50/60 p-2.5 rounded-xl">
                      <div className="font-bold text-[11px] text-blue-950 flex items-center space-x-1.5 space-x-reverse">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>متطلبات وشروط الحصول على الشارة:</span>
                      </div>
                      <ul className="space-y-1">
                        {badge.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="text-[10px] text-gray-700 flex items-start space-x-1.5 space-x-reverse font-sans">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs cursor-pointer"
          >
            إغلاق الدليل
          </button>
        </div>

      </div>
    </div>
  );
};
