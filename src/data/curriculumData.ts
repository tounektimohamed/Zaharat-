import { StageInfo, DomainInfo, ActivityItem, BadgeItem, Patrol, ZahraUser, StageId, DomainId } from '../types';

export const STAGES: StageInfo[] = [
  {
    id: 'yafe',
    name: 'الإكليل اليافع (مرحلة القبول)',
    minAge: 7,
    maxAge: 10,
    color: '#EAB308', // Amber / Gold
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    duration: 'من 3 إلى 4 أسابيع (مرحلة القبول والوعد)',
    requirementsCount: 20,
    badgesRequired: 0,
    description: 'مرحلة الانتماء والقبول للصبية، تتوج بحفل القبول وارتداء الزي وتأدية الوعد الكشفي وصوت الأدغال.'
  },
  {
    id: 'nadhar',
    name: 'الإكليل النضر',
    minAge: 8,
    maxAge: 11,
    color: '#22C55E', // Green
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    duration: 'من سنة إلى سنة ونصف',
    requirementsCount: 44,
    badgesRequired: 3,
    description: 'درجة النضر (اللون الأخضر) تعني النماء والحيوية، تتطلب إنجاز الأنشطة الأساسية في المجالات الستة.'
  },
  {
    id: 'atar',
    name: 'الإكليل العطر',
    minAge: 9,
    maxAge: 11,
    color: '#A855F7', // Purple
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    duration: 'من سنة إلى سنة ونصف',
    requirementsCount: 52,
    badgesRequired: 5,
    description: 'تنشأ الأزهار العطرة فتفوح شذاها بالمهارات والتفوق وتتطلب 5 شارات هواية على الأقل.'
  },
  {
    id: 'muthmir',
    name: 'الإكليل المثمر',
    minAge: 10,
    maxAge: 12,
    color: '#EF4444', // Red / Orange
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    duration: 'من 12 إلى 14 شهراً',
    requirementsCount: 44,
    badgesRequired: 7,
    description: 'تتحول الأزهار إلى ثمار ناضجة تتأهل للارتقاء إلى فرقة المرشدات بكل ثقة وقيادة.'
  }
];

export const DOMAINS: DomainInfo[] = [
  {
    id: 'spiritual',
    name: 'الجانب الروحي',
    symbolicPlace: 'الصحراء',
    animalCompanion: "K'aa",
    animalNameArabic: 'كا (الثعبان الحكيم)',
    color: '#D97706', // Warm desert amber
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconName: 'Moon',
    description: 'الصبر والالتزام بالعبادات والارتقاء بالأخلاق ومعرفة نعم الله تعالى.'
  },
  {
    id: 'mental',
    name: 'الجانب العقلي',
    symbolicPlace: 'الشلالات',
    animalCompanion: 'Appo',
    animalNameArabic: 'أبو (الفيل العادل)',
    color: '#0284C7', // Waterfall blue
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    iconName: 'Brain',
    description: 'انسياب المعرفة وتنمية القدرات العقلية والبحث والابتكار والحلول الذكية.'
  },
  {
    id: 'social',
    name: 'الجانب الاجتماعي',
    symbolicPlace: 'القرية',
    animalCompanion: 'Baguira',
    animalNameArabic: 'باغيرا (النمر الأسود)',
    color: '#059669', // Emerald
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconName: 'Users',
    description: 'التواصل والقيادة والتضامن مع المجتمع والعيش بانسجام ومساعدة الآخرين.'
  },
  {
    id: 'emotional',
    name: 'الجانب الانفعالي',
    symbolicPlace: 'الكهف',
    animalCompanion: 'Balo',
    animalNameArabic: 'بالو (الدب اللطيف)',
    color: '#7C3AED', // Purple
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconName: 'Heart',
    description: 'التأمل والهدوء والتحكم في المشاعر والتعبير عن الذات ونشر السعادة.'
  },
  {
    id: 'physical',
    name: 'الجانب البدني',
    symbolicPlace: 'الجبال',
    animalCompanion: 'Akila',
    animalNameArabic: 'أكيلا (الذئب القائد)',
    color: '#DC2626', // Red
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    iconName: 'Activity',
    description: 'بذل المجهود والتسلق والحفاظ على صحة الجسم واللياقة والسلامة الشخصية.'
  },
  {
    id: 'scout',
    name: 'الجانب الكشفي',
    symbolicPlace: 'الغابة',
    animalCompanion: 'Tippi',
    animalNameArabic: 'تيبي (فتاة الأدغال)',
    color: '#16A34A', // Scout Forest Green
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconName: 'Compass',
    description: 'التقاليد والمهارات الكشفية وحياة الخلاء والعقد والنيران والمغامرة.'
  }
];

export const JUNGLE_STORY = {
  title: 'قصة فتاة الأدغال Tippi وأصدقائها',
  summary: 'تدور أحداث الإطار الرمزي لمرحلة الزهرات في الأدغال حيث تجتاز الزهرة متطلبات كل درجة بمرافقة أصدقائها الحيوانات الذين يمثلون قيم الحركة الكشفية.',
  text: `في يوم من أيام فصل الصيف الحارق بجلوب القارة الإفريقية، رزق الأبوان سيلفي وتيبي بطفلتهما "تيبي Tippi". كانت الفتاة بهية الطلعة حسنة الملامح، نبتت بين أحضان الطبيعة وألفت حياة الأدغال.
تعلمت تيبي من الدب بالو Balo الحب والمرح والنشاط، ومن النمر باغيرا Baguira المشاركة والتسامح وحماية الضعفاء، ومن الثعبان كا K'aa الحكمة والاحترام، ومن الفيل أبو Appo العدل والوفاء، ومن الذئب أكيلا Akila القيادة والحرية.`,
  companions: [
    { name: 'Balo (بالو)', role: 'الدب الأسود', trait: 'المرح، الحب، السعادة والصداقة', color: '#B45309' },
    { name: 'Baguira (باغيرا)', role: 'النمر الأسود', trait: 'المشاركة، الانسجام، مساعدة الآخرين', color: '#1F2937' },
    { name: "K'aa (كا)", role: 'الثعبان', trait: 'الحكمة، الاحترام، السلام، العبادات', color: '#15803D' },
    { name: 'Appo (أبو)', role: 'الفيل', trait: 'قاضي الأدغال، العدل، الصدق، الحرية', color: '#4338CA' },
    { name: 'Akila (أكيلا)', role: 'الذئب', trait: 'مثال وقدوة، القيادة، التواصل والتواضع', color: '#B91C1C' }
  ]
};

export const SCOUT_LAW = [
  '1. الزّهرة تحبّ الله ووطنها.',
  '2. الزّهرة تحبّ والديها وتطيعهما.',
  '3. الزّهرة تحبّ النّظافة والنّظام.',
  '4. الزّهرة مجتهدة في أعمالها.',
  '5. الزّهرة صادقة في قولها وتحترم متاع غيرها.'
];

export const SCOUT_PROMISE = 'أعد بأن أبذل جهدي لأقوم بواجبي نحو الله والوطن و أن أساعد الناس و أعمل بقانون الزهرات.';

export const JUNGLE_VOICE = [
  '1. أمتثل لكلام القائدة',
  '2. أحب صديقاتي',
  '3. أنصت لصديقاتي',
  '4. أمرح كثيراً',
  '5. أسير على خطى Tippi'
];

export const BADGES_LIST: BadgeItem[] = [
  {
    id: 'badge-1',
    name: 'شارة الحاسوب والرقمنة',
    category: 'الجانب العقلي والتقني',
    icon: '💻',
    description: 'إتقان استخدام الحاسوب والوسائل الرقمية بأمان وإبداع.',
    requirements: [
      '1. التعرف على المكونات الأساسية للحاسوب (الشاشة، الفأرة، لوحة المفاتيح، الوحدة المركزية).',
      '2. كتابة نص قصير ومنسق أو بطاقة تهنئة للسداسي باستخدام برنامج معالجة النصوص.',
      '3. معرفة القواعد الذهبية للاستخدام الآمن للإنترنت وحماية الخصوصية وكلمات المرور.',
      '4. إنجاز رسم كشفي أو تصميم بطاقة دعوة إلكترونية لنشاط الباقة.'
    ]
  },
  {
    id: 'badge-2',
    name: 'شارة الإسعافية الصغرى',
    category: 'الصحة والسلامة',
    icon: '🩹',
    description: 'الإلمام بالإسعافات الأولية البسيطة والتعامل مع الطوارئ اليومية.',
    requirements: [
      '1. معرفة محتويات صيدلية السداسي وحقيبة الإسعافات الأولية وكيفية استخدام كل أداة.',
      '2. تطهير وضماد جرح بسيط أو خدش بطريقة صحية ونظيفة.',
      '3. معرفة أرقام الطوارئ الوطنية (الحماية المدنية 198، الإسعاف الطبي 190، الشرطة 197).',
      '4. التدرب على التصرف السليم عند حدوث رعاف أو حرق خفيف أو لسعة حشرة.'
    ]
  },
  {
    id: 'badge-3',
    name: 'شارة صديقة البيئة والطبيعة',
    category: 'البيئة والاستكشاف',
    icon: '🌱',
    description: 'حماية الطبيعة، غرس النباتات، والمحافظة على النظافة والفرز الإيكولوجي.',
    requirements: [
      '1. غرس نبتة أو شتلة والاعتناء بها وسقيها ومتابعة نموها لمدة 3 أسابيع.',
      '2. تطبيق مبادئ فرز النفايات (بلاستيك، ورق، عضوي) في مقر الباقة والبيت.',
      '3. صنع مجسم أو أداة مفيدة باستخدام مواد مسترجعة وقابلة لإعادة التدوير.',
      '4. المشاركة في حملة نظافة لحديقة عامة أو شاطئ أو محيط مقر الفوج.'
    ]
  },
  {
    id: 'badge-4',
    name: 'شارة الطاهية الصغرى',
    category: 'المهارات الحياتية والمنزلية',
    icon: '🍳',
    description: 'إعداد الوجبات الغذائية الصحية الخفيفة وتنظيم المائدة بأناقة.',
    requirements: [
      '1. إعداد سلطة صحية أو طبق فواكه منسق لسداسيتها دون مساعدة.',
      '2. تحضير مشروب طبيعي منعش (عصير برتقال، ليموناضة) وتقديمه بلباقة.',
      '3. ترتيب مائدة الطعام وفق القواعد السليمة وغسل الأواني بعد الانتهاء.',
      '4. معرفة قواعد السلامة في المطبخ (الحذر من الأدوات الحادة والموقد).'
    ]
  },
  {
    id: 'badge-5',
    name: 'شارة الفنانة والرسامة',
    category: 'الفنون والأشغال اليدوية',
    icon: '🎨',
    description: 'تنمية الحس الجمالي والإبداع في الرسم والأشغال اليدوية الكشفية.',
    requirements: [
      '1. رسم لوحتين تعبران عن رمزيات الزهرات والطبيعة التونسية بألوان مائية أو خشبية.',
      '2. صنع تحفة يدوية أو حلي تقليدية أو أوريغامي (طي الورق) لتزيين زاوية السداسي.',
      '3. تصميم وتزيين شعار خاص بالسداسي أو إكليل كشفي مبتكر.',
      '4. تقديم معرض مصغر للأشغال اليدوية أمام قائدات وزهرات الباقة.'
    ]
  },
  {
    id: 'badge-6',
    name: 'شارة الرياضية النشيطة',
    category: 'اللياقة البدنية والصحة',
    icon: '⚽',
    description: 'المحافظة على اللياقة البدنية والروح الرياضية في الألعاب الفردية والجماعية.',
    requirements: [
      '1. إتقان حركات الجمباز الأساسية وتمارين التوازن والمرونة.',
      '2. المشاركة الفعالة في 3 مباريات لألعاب جماعية (كرة اليد، السلة، التتابع).',
      '3. معرفة فوائد التغذية الصحية المتوازنة وشرب الماء الكافي للرياضي.',
      '4. التحلي بالروح الرياضية العالية وتقبل النتيجة وتشجيع الصديقات.'
    ]
  },
  {
    id: 'badge-7',
    name: 'شارة الصحفية الصغيرة',
    category: 'الإعلام والتواصل',
    icon: '📰',
    description: 'كتابة التقارير الكشفية، التصوير الفوتوغرافي، وتوثيق أنشطة الباقة.',
    requirements: [
      '1. كتابة تقرير صحفي مشوق عن رحلة أو مخيم أو نشاط مميز قامت به الباقة.',
      '2. إجراء مقابلة حوارية قصيرة مع قائدة الفرقة أو إحدى الزهرات وتدوينها.',
      '3. التقاط 5 صور فوتوغرافية احترافية تعبر عن روح الأخوة الكشفية.',
      '4. المساهمة في إعداد مجلة الحائط أو النشرة الدورية للسداسي.'
    ]
  },
  {
    id: 'badge-8',
    name: 'شارة القارئة الشغوفة',
    category: 'الثقافة والأدب',
    icon: '📚',
    description: 'المطالعة الواعية، تلخيص القصص، وإثراء الرصيد اللغوي والتعبيري.',
    requirements: [
      '1. قراءة 3 قصص أو كتب ملائمة لسن الزهرة وتلخيص العبر المستفادة منها.',
      '2. سرد إحدى القصص لزهرات السداسي بأسلوب درامي تعبيري مشوق.',
      '3. حفظ قصيدة أو مقطوعة أدبية وإلقاؤها بنبرة صوتية واثقة.',
      '4. الحفاظ على الكتب وتنظيم مكتبة صغيرة في البيت أو ركن السداسي.'
    ]
  },
  {
    id: 'badge-9',
    name: 'شارة الطهي الخلوي والحياة في الخلاء',
    category: 'التقاليد والمهارات الكشفية',
    icon: '🏕️',
    description: 'إتقان فنون الحياة في الطبيعة والمخيمات وإعداد الطعام الخلوي.',
    requirements: [
      '1. معرفة قواعد اختيار مكان الطهي الخلوي الآمن بعيداً عن الأشجار الجافة.',
      '2. تجهيز موقد كشفي بسيط والتدرب على إشعال وإطفاء النار بأمان تحت إشراف القائدة.',
      '3. إعداد وجبة خلوية بسيطة (شواء بطاطا، بيض مسلوق، خبز كشفي) في الخلاء.',
      '4. تنظيف مكان الطهي تماماً وترك الموقع أنظف مما كان عليه (أثر لا يُرى).'
    ]
  },
  {
    id: 'badge-10',
    name: 'شارة حافظة القرآن الكريم والقيم',
    category: 'الجانب الروحي والأخلاقي',
    icon: '🕌',
    description: 'حفظ آيات من الذكر الحكيم والتحلي بالأخلاق والآداب الإسلامية الفاضلة.',
    requirements: [
      '1. حفظ حزب من القرآن الكريم وتلاوته تلاوة سليمة مع أحكام التجويد الأساسية.',
      '2. حفظ وشرح 3 أحاديث نبوية شريفة تحث على الصدق، الأمانة، ومساعدة المحتاج.',
      '3. إتقان الوضوء والصلاة المفروضة والمحافظة عليها في أوقاتها.',
      '4. تقديم عمل خيري أو مساعدة تطوعية لشخص محتاج أو لكبير السن.'
    ]
  }
];

export const PATROLS: Patrol[] = [
  {
    id: 'red-patrol',
    name: 'سداسي الحمر (الأحمر)',
    colorHex: '#EF4444',
    bgHex: '#FEF2F2',
    flagBorderColor: 'صفراء',
    flagLandColor: 'حمراء',
    membersCount: 4,
    motto: 'النشاط والشجاعة'
  },
  {
    id: 'yellow-patrol',
    name: 'سداسي الصفر (الأصفر)',
    colorHex: '#EAB308',
    bgHex: '#FEFCE8',
    flagBorderColor: 'زرقاء',
    flagLandColor: 'صفراء',
    membersCount: 4,
    motto: 'النور والإبداع'
  },
  {
    id: 'blue-patrol',
    name: 'سداسي الزرق (الأزرق)',
    colorHex: '#3B82F6',
    bgHex: '#EFF6FF',
    flagBorderColor: 'بيضاء',
    flagLandColor: 'زرقاء',
    membersCount: 3,
    motto: 'الوفاء والتضامن'
  },
  {
    id: 'green-patrol',
    name: 'سداسي الخضر (الأخضر)',
    colorHex: '#22C55E',
    bgHex: '#F0FDF4',
    flagBorderColor: 'ورديّة',
    flagLandColor: 'خضراء',
    membersCount: 3,
    motto: 'الطبيعة والأمل'
  }
];

export const ACTIVITIES_DATABASE: ActivityItem[] = [
  // ==========================================
  // --- 1. مرحلة الإكليل اليافع (Yafe - القبول والوعد) --- 20 نشاطاً
  // ==========================================
  // الجانب الروحي (الصحراء - الرفيق كا K'aa)
  { id: 'yafe-1', stageId: 'yafe', domainId: 'spiritual', number: 1, title: 'أحفظ سورة الفاتحة وسورتي الإخلاص والمعوذتين وأتلوها مرتلة', companion: "K'aa" },
  { id: 'yafe-2', stageId: 'yafe', domainId: 'spiritual', number: 2, title: 'أتعرف على أركان الإسلام الخمسة وأنطق الشهادتين بخشوع', companion: "K'aa" },
  { id: 'yafe-3', stageId: 'yafe', domainId: 'spiritual', number: 3, title: 'أتعلم وأردد دعاء قبل الأكل وبعده ودعاء الكشافة التونسية', companion: "K'aa" },
  { id: 'yafe-4', stageId: 'yafe', domainId: 'spiritual', number: 4, title: 'ألتزم ببر والديّ وطاعتهما ومساعدتهما في البيت يومياً', companion: "K'aa" },

  // الجانب العقلي (الشلالات - الرفيق أبو Appo)
  { id: 'yafe-5', stageId: 'yafe', domainId: 'mental', number: 5, title: 'أتعرف على قصة فتاة الأدغال تيبي Tippi والحيوانات الخمسة', companion: 'Appo' },
  { id: 'yafe-6', stageId: 'yafe', domainId: 'mental', number: 6, title: 'أميّز صفات رفقاء الأدغال (بالو، باغيرا، كا، أبو، أكيلا) ورمزياتهم', companion: 'Appo' },
  { id: 'yafe-7', stageId: 'yafe', domainId: 'mental', number: 7, title: 'أتعرف على سداسيتي (الاسم، اللون، العلم، الصيحة وشعار السداسي)', companion: 'Appo' },

  // الجانب الاجتماعي (القرية - الرفيق باغيرا Baguira)
  { id: 'yafe-8', stageId: 'yafe', domainId: 'social', number: 8, title: 'أتعرف على قائدات الباقة ورائدة ومساعدة سداسيتي وأسماء صديقاتي', companion: 'Baguira' },
  { id: 'yafe-9', stageId: 'yafe', domainId: 'social', number: 9, title: 'أشارك في ألعاب التعارف والاندماج مع السداسي بروح المرح والألفة', companion: 'Baguira' },
  { id: 'yafe-10', stageId: 'yafe', domainId: 'social', number: 10, title: 'أحفظ نشيد الزهرات التونسية ونشيد الباقة الخاص بفرقتنا', companion: 'Baguira' },

  // الجانب الانفعالي (الكهف - الرفيق بالو Balo)
  { id: 'yafe-11', stageId: 'yafe', domainId: 'emotional', number: 11, title: 'أتقن وأردد صوت الأدغال (صيحة الزهرات) بالحركات الإيقاعية', companion: 'Balo' },
  { id: 'yafe-12', stageId: 'yafe', domainId: 'emotional', number: 12, title: 'أعبّر عن فرحتي واعتزازي بالانتماء إلى حركة الزهرات والكشافة', companion: 'Balo' },
  { id: 'yafe-13', stageId: 'yafe', domainId: 'emotional', number: 13, title: 'أشارك في لعبة تمثيلية تعبيرية تحاكي إحدى مغامرات تيبي في الغابة', companion: 'Balo' },

  // الجانب البدني (الجبال - الرفيق أكيلا Akila)
  { id: 'yafe-14', stageId: 'yafe', domainId: 'physical', number: 14, title: 'أطبّق الطريقة السليمة لغسل اليدين بالماء والصابون وتنظيف أسناني', companion: 'Akila' },
  { id: 'yafe-15', stageId: 'yafe', domainId: 'physical', number: 15, title: 'أمارس التمارين الصباحية والحركات الإحمائية بنشاط وحيوية', companion: 'Akila' },
  { id: 'yafe-16', stageId: 'yafe', domainId: 'physical', number: 16, title: 'أتعرف على أهمية شرب الماء الكافي وتناول الوجبات الصحية المتوازنة', companion: 'Akila' },

  // الجانب الكشفي (الغابة - الرفيقة تيبي Tippi)
  { id: 'yafe-17', stageId: 'yafe', domainId: 'scout', number: 17, title: 'أحفظ وأفهم وعد الزهرات وأشرح معناه لقائدتي', companion: 'Tippi' },
  { id: 'yafe-18', stageId: 'yafe', domainId: 'scout', number: 18, title: 'أحفظ بنود قانون الزهرات الخمسة وأعمل بها في حياتي اليومية', companion: 'Tippi' },
  { id: 'yafe-19', stageId: 'yafe', domainId: 'scout', number: 19, title: 'أتقن أداء التحية الكشفية للزهرات والاصطفاف في دائرة الباقة', companion: 'Tippi' },
  { id: 'yafe-20', stageId: 'yafe', domainId: 'scout', number: 20, title: 'أتعرف على الزي الكشفي للزهرة والمنديل وأشارك في حفل القبول والوعد', companion: 'Tippi' },

  // ==========================================
  // --- 2. درجة الإكليل النضر (Nadhar - اللون الأخضر) --- 44 نشاطاً
  // ==========================================
  // الجانب الروحي (كا K'aa)
  { id: 'nadhar-1', stageId: 'nadhar', domainId: 'spiritual', number: 1, title: 'أتعرف على شخصية وطنية أو إسلامية رائدة وأروي قصتها وأدوارها', companion: "K'aa" },
  { id: 'nadhar-2', stageId: 'nadhar', domainId: 'spiritual', number: 2, title: 'أتلو آيات الصوم والصلاة بخشوع وأوضح فضلها لصديقاتي', companion: "K'aa" },
  { id: 'nadhar-3', stageId: 'nadhar', domainId: 'spiritual', number: 3, title: 'أعلم أفراد سداسيتي الكيفية الصحيحة للوضوء الكامل', companion: "K'aa" },
  { id: 'nadhar-4', stageId: 'nadhar', domainId: 'spiritual', number: 4, title: 'أشارك في تمثيل مشهد مسرحي هادف حول بر الوالدين والإحسان إليهما', companion: "K'aa" },
  { id: 'nadhar-5', stageId: 'nadhar', domainId: 'spiritual', number: 5, title: 'أشارك في حملة تطوعية لتنظيف وترتيب مسجد الحي أو النادي الكشفي', companion: "K'aa" },
  { id: 'nadhar-6', stageId: 'nadhar', domainId: 'spiritual', number: 6, title: 'أتعرف على 5 من صفات الرسول صلى الله عليه وسلم وأقتدي بها', companion: "K'aa" },
  { id: 'nadhar-7', stageId: 'nadhar', domainId: 'spiritual', number: 7, title: 'أذكر 3 نعم أنعم الله بها علينا وكيفية الحفاظ عليها وشكرها', companion: "K'aa" },
  { id: 'nadhar-8', stageId: 'nadhar', domainId: 'spiritual', number: 8, title: 'ألتزم بالصدق في جميع أقوالي وأفعالي مع عائلتي وقائداتي', companion: "K'aa" },

  // الجانب العقلي (أبو Appo)
  { id: 'nadhar-9', stageId: 'nadhar', domainId: 'mental', number: 9, title: 'أصنع صندوقاً مبتكراً أو حافظة لترتيب أدواتي وأغراضي الكشفية', companion: 'Appo' },
  { id: 'nadhar-10', stageId: 'nadhar', domainId: 'mental', number: 10, title: 'أعد بحثاً مبسطاً حول الحواس الخمس والأمراض التي قد تصيبها وطرق الوقاية', companion: 'Appo' },
  { id: 'nadhar-11', stageId: 'nadhar', domainId: 'mental', number: 11, title: 'أضع جدولاً أسبوعياً منظماً للمراجعة المدرسية وألتزم به بدقة', companion: 'Appo' },
  { id: 'nadhar-12', stageId: 'nadhar', domainId: 'mental', number: 12, title: 'أقرأ قصة هادفة وألخص أحداثها الرئيسية في صفحة واحدة مع رسم معبر', companion: 'Appo' },
  { id: 'nadhar-13', stageId: 'nadhar', domainId: 'mental', number: 13, title: 'أتعلم حل الألغاز المنطقية وألعاب الكلمات المتقاطعة مع سداسيتي', companion: 'Appo' },
  { id: 'nadhar-14', stageId: 'nadhar', domainId: 'mental', number: 14, title: 'أتعرف على خريطة الجمهورية التونسية وأحدد موقع مدينتي عليها', companion: 'Appo' },
  { id: 'nadhar-15', stageId: 'nadhar', domainId: 'mental', number: 15, title: 'أنجز تجربة علمية بسيطة (دورة الماء أو نمو النبتة) وأعرض نتائجها', companion: 'Appo' },
  { id: 'nadhar-16', stageId: 'nadhar', domainId: 'mental', number: 16, title: 'أتعلم كيفية ترشيد استهلاك الكهرباء والماء في المنزل والمدرسة', companion: 'Appo' },

  // الجانب الاجتماعي (باغيرا Baguira)
  { id: 'nadhar-17', stageId: 'nadhar', domainId: 'social', number: 17, title: 'أشارك بفاعلية في مباراة ثقافة عامة بين سداسيات الباقة', companion: 'Baguira' },
  { id: 'nadhar-18', stageId: 'nadhar', domainId: 'social', number: 18, title: 'أعرض 3 بحوث ومجلات حائطية مختلفة في ركن السداسي', companion: 'Baguira' },
  { id: 'nadhar-19', stageId: 'nadhar', domainId: 'social', number: 19, title: 'أشارك في صياغة ميثاق النظام الداخلي للسداسي والالتزام ببنوده', companion: 'Baguira' },
  { id: 'nadhar-20', stageId: 'nadhar', domainId: 'social', number: 20, title: 'أشارك في تنظيم وتزيين مقر النادي بمناسبة عيد ميلاد إحدى الزهرات', companion: 'Baguira' },
  { id: 'nadhar-21', stageId: 'nadhar', domainId: 'social', number: 21, title: 'أتعلم كيفية استقبال الضيوف والترحيب بهم بآداب اللياقة وحسن المعاملة', companion: 'Baguira' },
  { id: 'nadhar-22', stageId: 'nadhar', domainId: 'social', number: 22, title: 'أشارك في عمل تضامني خيري (جمع ألعاب أو ملابس للمحتاجين)', companion: 'Baguira' },
  { id: 'nadhar-23', stageId: 'nadhar', domainId: 'social', number: 23, title: 'أحافظ على نظافة حديقة الحي أو المدرسة وأغرس شتلة جديدة', companion: 'Baguira' },

  // الجانب الانفعالي (بالو Balo)
  { id: 'nadhar-24', stageId: 'nadhar', domainId: 'emotional', number: 24, title: 'أدوّن حسناتي وأعمالي الإيجابية اليومية في مفكرة السداسي الخاصة بي', companion: 'Balo' },
  { id: 'nadhar-25', stageId: 'nadhar', domainId: 'emotional', number: 25, title: 'أتعلم ضبط النفس والتحكم في الغضب عند مواجهة المواقف الصعبة', companion: 'Balo' },
  { id: 'nadhar-26', stageId: 'nadhar', domainId: 'emotional', number: 26, title: 'أعبّر عن مشاعري بالرسم أو الكتابة وأشارك زميلاتي لحظات الفرح', companion: 'Balo' },
  { id: 'nadhar-27', stageId: 'nadhar', domainId: 'emotional', number: 27, title: 'أشارك في أداء رقصة فلكلورية أو لعبة حركية مرحة في حفل السمر', companion: 'Balo' },
  { id: 'nadhar-28', stageId: 'nadhar', domainId: 'emotional', number: 28, title: 'أساعد زميلتي الخجولة في الاندماج والمشاركة في أنشطة السداسي', companion: 'Balo' },
  { id: 'nadhar-29', stageId: 'nadhar', domainId: 'emotional', number: 29, title: 'أشكر كل من يقدم لي مساعدة أو معروفاً بابتسامة وكلمات طيبة', companion: 'Balo' },

  // الجانب البدني (أكيلا Akila)
  { id: 'nadhar-30', stageId: 'nadhar', domainId: 'physical', number: 30, title: 'أتولى التحكيم العادل في مسابقة رياضية أو ثقافية بين السداسيات', companion: 'Akila' },
  { id: 'nadhar-31', stageId: 'nadhar', domainId: 'physical', number: 31, title: 'أشارك في حملة تحسيسية حول المحافظة على نظافة الأيدي وصحة الجسم', companion: 'Akila' },
  { id: 'nadhar-32', stageId: 'nadhar', domainId: 'physical', number: 32, title: 'أتناول الخضر والفواكه الطازجة بانتظام طيلة أيام المخيم والنشاط', companion: 'Akila' },
  { id: 'nadhar-33', stageId: 'nadhar', domainId: 'physical', number: 33, title: 'أسهم في إعداد وجبة غذائية خفيفة وصحية ومتوازنة لأفراد السداسي', companion: 'Akila' },
  { id: 'nadhar-34', stageId: 'nadhar', domainId: 'physical', number: 34, title: 'أغسل يدي وقدمي قبل الأكل وبعده وأحافظ على نظافتي الشخصية', companion: 'Akila' },
  { id: 'nadhar-35', stageId: 'nadhar', domainId: 'physical', number: 35, title: 'أعلم أفراد السداسي الطريقة السليمة والصحية لتنظيف الأسنان', companion: 'Akila' },
  { id: 'nadhar-36', stageId: 'nadhar', domainId: 'physical', number: 36, title: 'أرتب سريري وخزانة ملابسي وأدواتي المدرسية يومياً دون طلب', companion: 'Akila' },
  { id: 'nadhar-37', stageId: 'nadhar', domainId: 'physical', number: 37, title: 'أمارس رياضة المشي أو الجري في الطبيعة بانتظام مع الفرقة', companion: 'Akila' },

  // الجانب الكشفي (تيبي Tippi)
  { id: 'nadhar-38', stageId: 'nadhar', domainId: 'scout', number: 38, title: 'أساعد أفراد السداسي في صنع مجسم لشعار القسم وركن السداسي', companion: 'Tippi' },
  { id: 'nadhar-39', stageId: 'nadhar', domainId: 'scout', number: 39, title: 'أشارك بانتظام في مخيم آخر الأسبوع للفرقة وأنفذ التعليمات الكشفية', companion: 'Tippi' },
  { id: 'nadhar-40', stageId: 'nadhar', domainId: 'scout', number: 40, title: 'أرتب وأنظف ركن سداسيتي بمقر الفرقة مرة كل شهر على الأقل', companion: 'Tippi' },
  { id: 'nadhar-41', stageId: 'nadhar', domainId: 'scout', number: 41, title: 'أتقن العقدة البسيطة وعقدة الرفقاء الكشفية وأشرح استخداماتها', companion: 'Tippi' },
  { id: 'nadhar-42', stageId: 'nadhar', domainId: 'scout', number: 42, title: 'أتعرف على علامات التتبع والاتجاهات الكشفية في الغابة والخلاء', companion: 'Tippi' },
  { id: 'nadhar-43', stageId: 'nadhar', domainId: 'scout', number: 43, title: 'أتعلم طي المنديل الكشفي (الفولار) وارتداء الزي الكشفي كاملاً بأناقة', companion: 'Tippi' },
  { id: 'nadhar-44', stageId: 'nadhar', domainId: 'scout', number: 44, title: 'أشارك في مراسم تحية العلم التونسي والنشيد الوطني بالانضباط الكشفي', companion: 'Tippi' },

  // ==========================================
  // --- 3. درجة الإكليل العطر (Atar - اللون البنفسجي) --- 52 نشاطاً
  // ==========================================
  // الجانب الروحي (كا K'aa)
  { id: 'atar-1', stageId: 'atar', domainId: 'spiritual', number: 1, title: 'أتعرف على 10 من أسماء الله الحسنى ومعانيها الجليلة', companion: "K'aa" },
  { id: 'atar-2', stageId: 'atar', domainId: 'spiritual', number: 2, title: 'أحفظ سورة الأعلى وسورة الطارق وأتلوها مجودة على قائدتي', companion: "K'aa" },
  { id: 'atar-3', stageId: 'atar', domainId: 'spiritual', number: 3, title: 'أؤدي الصلوات الخمس بانتظام وفي أوقاتها المحددة بخشوع', companion: "K'aa" },
  { id: 'atar-4', stageId: 'atar', domainId: 'spiritual', number: 4, title: 'أحفظ 3 أحاديث نبوية شريفة عن الصدق وحسن الخلق والأمانة', companion: "K'aa" },
  { id: 'atar-5', stageId: 'atar', domainId: 'spiritual', number: 5, title: 'أتعلم آداب زيارة المريض وصلة الرحم وأزور أقاربي بانتظام', companion: "K'aa" },
  { id: 'atar-6', stageId: 'atar', domainId: 'spiritual', number: 6, title: 'أشارك في تنظيم مسابقة قرآنية دينية داخل باقة الزهرات', companion: "K'aa" },
  { id: 'atar-7', stageId: 'atar', domainId: 'spiritual', number: 7, title: 'أتعرف على آداب المسجد وأحافظ على الهدوء والنظافة داخله', companion: "K'aa" },
  { id: 'atar-8', stageId: 'atar', domainId: 'spiritual', number: 8, title: 'أطبّق خلق التسامح والعفو عند المقدرة مع زميلاتي في الباقة', companion: "K'aa" },
  { id: 'atar-9', stageId: 'atar', domainId: 'spiritual', number: 9, title: 'أشارك في نشاط إفطار صائم أو توزيع التمور في شهر رمضان المبارك', companion: "K'aa" },

  // الجانب العقلي (أبو Appo)
  { id: 'atar-10', stageId: 'atar', domainId: 'mental', number: 10, title: 'أنجز بحثاً مصوراً عن الوسائل السمعية والبصرية وأميّز بين إيجابياتها وسلبياتها', companion: 'Appo' },
  { id: 'atar-11', stageId: 'atar', domainId: 'mental', number: 11, title: 'أحفظ معلومات سداسيتي وباقتي وفرقتي على وسيط رقمي أو ملف إلكتروني', companion: 'Appo' },
  { id: 'atar-12', stageId: 'atar', domainId: 'mental', number: 12, title: 'أتقن البحث المعجمي باستعمال القاموس وترتيب الكلمات حسب الأصول', companion: 'Appo' },
  { id: 'atar-13', stageId: 'atar', domainId: 'mental', number: 13, title: 'أحسن استعمال وسائل التكنولوجيا الحديثة وأحافظ على أمن معلوماتي وسلامتي', companion: 'Appo' },
  { id: 'atar-14', stageId: 'atar', domainId: 'mental', number: 14, title: 'أعد معجمي المصور الشخصي باللغتين العربية والفرنسية أو الإنجليزية', companion: 'Appo' },
  { id: 'atar-15', stageId: 'atar', domainId: 'mental', number: 15, title: 'أبتكر لعبة فكرية تعليمية وأقدمها لسداسيتي في النشاط الأسبوعي', companion: 'Appo' },
  { id: 'atar-16', stageId: 'atar', domainId: 'mental', number: 16, title: 'أتعرف على المعالم التاريخية والأثرية الهامة في تونس وقيمتها الحضارية', companion: 'Appo' },
  { id: 'atar-17', stageId: 'atar', domainId: 'mental', number: 17, title: 'أجمع عينات من النباتات البرية وأصنفها في دفتر الأعشاب الكشفي', companion: 'Appo' },
  { id: 'atar-18', stageId: 'atar', domainId: 'mental', number: 18, title: 'أصمم لوحة جدارية توعوية عن حماية البيئة والتنوع البيولوجي', companion: 'Appo' },

  // الجانب الاجتماعي (باغيرا Baguira)
  { id: 'atar-19', stageId: 'atar', domainId: 'social', number: 19, title: 'أدير حواراً هادفاً في اجتماع السداسي بروح ديمقراطية واحترام الرأي الآخر', companion: 'Baguira' },
  { id: 'atar-20', stageId: 'atar', domainId: 'social', number: 20, title: 'أراسل زهرة من فرقة أخرى بـ 3 تقنيات تواصل مختلفة (رسالة، بريد، بطاقة)', companion: 'Baguira' },
  { id: 'atar-21', stageId: 'atar', domainId: 'social', number: 21, title: 'أقود سداسيتي في تنفيذ مشروع خدمة عامة في الحي السكني أو المدرسة', companion: 'Baguira' },
  { id: 'atar-22', stageId: 'atar', domainId: 'social', number: 22, title: 'أتعرف على حقوق الطفل وأشارك في حلقة نقاش حول حماية الأطفال', companion: 'Baguira' },
  { id: 'atar-23', stageId: 'atar', domainId: 'social', number: 23, title: 'أنظم مسابقة ثقافية وفنية لأطفال الحي لتعريفهم بالحركة الكشفية', companion: 'Baguira' },
  { id: 'atar-24', stageId: 'atar', domainId: 'social', number: 24, title: 'أتعلم مبادئ الإسعافات الأولية والتصرف عند الحوادث البسيطة', companion: 'Baguira' },
  { id: 'atar-25', stageId: 'atar', domainId: 'social', number: 25, title: 'أشارك في حملة التبرع بالكتب المدرسية والقصص لأطفال الأرياف', companion: 'Baguira' },
  { id: 'atar-26', stageId: 'atar', domainId: 'social', number: 26, title: 'أساعد زهرة مستجدة في تعلم تقاليد الباقة ومرافقتها كأخت كبرى', companion: 'Baguira' },
  { id: 'atar-27', stageId: 'atar', domainId: 'social', number: 27, title: 'أشارك في الاحتفال بالأعياد الوطنية والمناسبات الكشفية', companion: 'Baguira' },

  // الجانب الانفعالي (بالو Balo)
  { id: 'atar-28', stageId: 'atar', domainId: 'emotional', number: 28, title: 'أكتب مسرحية قصيرة هادفة وأوزع الأدوار على عضوات سداسيتي', companion: 'Balo' },
  { id: 'atar-29', stageId: 'atar', domainId: 'emotional', number: 29, title: 'أتعلم مهارة الاستماع النشط والتعاطف مع صديقتي عند حزنها ومواساتها', companion: 'Balo' },
  { id: 'atar-30', stageId: 'atar', domainId: 'emotional', number: 30, title: 'أبتكر نشيداً أو صيحة جديدة خاصة بسداسيتي وألحنها بإتقان', companion: 'Balo' },
  { id: 'atar-31', stageId: 'atar', domainId: 'emotional', number: 31, title: 'أمارس تمارين الاسترخاء والتنفس السليم لتخفيف التوتر والقلق', companion: 'Balo' },
  { id: 'atar-32', stageId: 'atar', domainId: 'emotional', number: 32, title: 'أحافظ على روح التفاؤل والابتسامة ونشر الطاقة الإيجابية في الباقة', companion: 'Balo' },
  { id: 'atar-33', stageId: 'atar', domainId: 'emotional', number: 33, title: 'أعبر عن شكري وتقديري لقائدتي ببطاقة معايدة ورسالة محبة مصنوعة يدوياً', companion: 'Balo' },
  { id: 'atar-34', stageId: 'atar', domainId: 'emotional', number: 34, title: 'أتقبل الملاحظات البناءة بروح رياضية وأسعى لتطوير مهاراتي', companion: 'Balo' },

  // الجانب البدني (أكيلا Akila)
  { id: 'atar-35', stageId: 'atar', domainId: 'physical', number: 35, title: 'أستحم وأغسل شعري وجسمي بانتظام حفاظاً على النظافة والصحة والنشاط', companion: 'Akila' },
  { id: 'atar-36', stageId: 'atar', domainId: 'physical', number: 36, title: 'أحترم قواعد حفظ الصحة والسلامة الغذائية في البيت والمخيم الكشفي', companion: 'Akila' },
  { id: 'atar-37', stageId: 'atar', domainId: 'physical', number: 37, title: 'أتقن مهارة إسعاف الجروح والحروق السطحية والنزيف الأنفي البسيط', companion: 'Akila' },
  { id: 'atar-38', stageId: 'atar', domainId: 'physical', number: 38, title: 'أشارك في سباق تتابعي أو دوري كرة السلة / الطائرة للباقة', companion: 'Akila' },
  { id: 'atar-39', stageId: 'atar', domainId: 'physical', number: 39, title: 'أتعلم كيفية الجلوس والوقوف السليم للحفاظ على صحة العمود الفقري', companion: 'Akila' },
  { id: 'atar-40', stageId: 'atar', domainId: 'physical', number: 40, title: 'أشارك في مسير كشفي على الأقدام لمسافة 3 كم في الطبيعة', companion: 'Akila' },
  { id: 'atar-41', stageId: 'atar', domainId: 'physical', number: 41, title: 'أتعرف على الأطعمة الغنية بالفيتامينات والمعادن الضرورية للنمو', companion: 'Akila' },
  { id: 'atar-42', stageId: 'atar', domainId: 'physical', number: 42, title: 'أجتاز اختبار اللياقة والرشاقة والقفز والتوازن بنجاح', companion: 'Akila' },
  { id: 'atar-43', stageId: 'atar', domainId: 'physical', number: 43, title: 'أمتنع عن تناول المشروبات الغازية والأطعمة الضارة بصحة الجسم', companion: 'Akila' },

  // الجانب الكشفي (تيبي Tippi)
  { id: 'atar-44', stageId: 'atar', domainId: 'scout', number: 44, title: 'ألتزم بالطقوس الكشفية ومراسم تحية العلم والاصطفاف بصورة متقنة', companion: 'Tippi' },
  { id: 'atar-45', stageId: 'atar', domainId: 'scout', number: 45, title: 'أميّز 4 أنواع من النيران الكشفية (الهرمية، النجمية، العاكسة، الخندقية)', companion: 'Tippi' },
  { id: 'atar-46', stageId: 'atar', domainId: 'scout', number: 46, title: 'أسمي الاتجاهات الأصلية والفرعية الثمانية باستخدام البوصلة الكشفية', companion: 'Tippi' },
  { id: 'atar-47', stageId: 'atar', domainId: 'scout', number: 47, title: 'أتقن ربط 4 عقد كشفية أساسية (المربعة، الوتدية، التوصيلية، السماك)', companion: 'Tippi' },
  { id: 'atar-48', stageId: 'atar', domainId: 'scout', number: 48, title: 'أشارك في نصب وتجهيز خيمة كشفية صغيرة وترتيب أمتعتها بالخلاء', companion: 'Tippi' },
  { id: 'atar-49', stageId: 'atar', domainId: 'scout', number: 49, title: 'أتعلم رموز وشفرات التخاطب الكشفي (مورس أو الإشارات السرية)', companion: 'Tippi' },
  { id: 'atar-50', stageId: 'atar', domainId: 'scout', number: 50, title: 'أشارك في طهي وجبة بيض أو شواء في الهواء الطلق بمخيم الباقة', companion: 'Tippi' },
  { id: 'atar-51', stageId: 'atar', domainId: 'scout', number: 51, title: 'أصنع نموذجاً كشفياً خشبياً مصغراً لبرج مراقبة أو جسر بالحبال والعصي', companion: 'Tippi' },
  { id: 'atar-52', stageId: 'atar', domainId: 'scout', number: 52, title: 'أحقق متطلبات نيل 5 شارات هواية كشفية متنوعة ومعتمدة', companion: 'Tippi' },

  // ==========================================
  // --- 4. درجة الإكليل المثمر (Muthmir - اللون الأحمر) --- 44 نشاطاً
  // ==========================================
  // الجانب الروحي (كا K'aa)
  { id: 'muthmir-1', stageId: 'muthmir', domainId: 'spiritual', number: 1, title: 'أحفظ سورة النبأ وسورة النازعات بتجويد وترتيل سليم ومتقن', companion: "K'aa" },
  { id: 'muthmir-2', stageId: 'muthmir', domainId: 'spiritual', number: 2, title: 'أتعلم وأشرح سيرة النبي صلى الله عليه وسلم وهجرته المباركة إلى المدينة', companion: "K'aa" },
  { id: 'muthmir-3', stageId: 'muthmir', domainId: 'spiritual', number: 3, title: 'أقود دعاء الختام وتلاوة القرآن في نهاية اجتماع الباقة الأسبوعي', companion: "K'aa" },
  { id: 'muthmir-4', stageId: 'muthmir', domainId: 'spiritual', number: 4, title: 'أعد بحثاً عن دور المرأة الرائد في التاريخ الإسلامي والحضارة الإنسانية', companion: "K'aa" },
  { id: 'muthmir-5', stageId: 'muthmir', domainId: 'spiritual', number: 5, title: 'ألتزم بالسلوك الأخلاقي القويم وأكون قدوة حسنة لجميع زهرات الباقة', companion: "K'aa" },
  { id: 'muthmir-6', stageId: 'muthmir', domainId: 'spiritual', number: 6, title: 'أشارك في تنظيم ندوة توعوية حول الأخوة الكشفية ونبذ التنمر والعنف', companion: "K'aa" },
  { id: 'muthmir-7', stageId: 'muthmir', domainId: 'spiritual', number: 7, title: 'أتعرف على سنن الوضوء والصلاة ونوافل العبادات وفضل قيام الليل', companion: "K'aa" },
  { id: 'muthmir-8', stageId: 'muthmir', domainId: 'spiritual', number: 8, title: 'أشارك في عمل تطوعي إنساني كبير بالتعاون مع الهلال الأحمر التونسي', companion: "K'aa" },

  // الجانب العقلي (أبو Appo)
  { id: 'muthmir-9', stageId: 'muthmir', domainId: 'mental', number: 9, title: 'أزور مركز إعلامية موجهة للطفل وأتعرف على البرمجة وتطبيقات الذكاء الاصطناعي', companion: 'Appo' },
  { id: 'muthmir-10', stageId: 'muthmir', domainId: 'mental', number: 10, title: 'أصنف مجموعة من المعلومات والبيانات حسب تخصصاتها في جداول رقمية منظمة', companion: 'Appo' },
  { id: 'muthmir-11', stageId: 'muthmir', domainId: 'mental', number: 11, title: 'أشارك في تأسيس وتغذية مكتبة باقة الزهرات بالكتب القيمة وتصنيفها', companion: 'Appo' },
  { id: 'muthmir-12', stageId: 'muthmir', domainId: 'mental', number: 12, title: 'أعد تقريراً صحفياً شاملاً عن المخيم السنوي مع إجراء مقابلات وصور', companion: 'Appo' },
  { id: 'muthmir-13', stageId: 'muthmir', domainId: 'mental', number: 13, title: 'أبتكر حلاً هندسياً ذكياً لإعادة تدوير البلاستيك والورق في مقر الفرقة', companion: 'Appo' },
  { id: 'muthmir-14', stageId: 'muthmir', domainId: 'mental', number: 14, title: 'أتعرف على النجوم والمجموعات النجمية واستخدامها في تحديد الاتجاهات ليلاً', companion: 'Appo' },
  { id: 'muthmir-15', stageId: 'muthmir', domainId: 'mental', number: 15, title: 'أقدم عرضاً تقديمياً رقمياً أمام الفرقة حول موضوع علمي أو بيئي هام', companion: 'Appo' },
  { id: 'muthmir-16', stageId: 'muthmir', domainId: 'mental', number: 16, title: 'أتعلم التخطيط المالي البسيط وإدارة ميزانية السداسي للمشاريع والأنشطة', companion: 'Appo' },

  // الجانب الاجتماعي (باغيرا Baguira)
  { id: 'muthmir-17', stageId: 'muthmir', domainId: 'social', number: 17, title: 'أقوم بتوثيق أنشطة الباقة والسداسي وإعداد نشرة إخبارية لصفحة الفرقة', companion: 'Baguira' },
  { id: 'muthmir-18', stageId: 'muthmir', domainId: 'social', number: 18, title: 'أتولى قيادة سداسيتي كرائدة سداسي وأدير اجتماعات السداسي بكفاءة', companion: 'Baguira' },
  { id: 'muthmir-19', stageId: 'muthmir', domainId: 'social', number: 19, title: 'أشارك في مجلس شرف الباقة وأسهم في تقييم الخطط والبرامج الكشفية', companion: 'Baguira' },
  { id: 'muthmir-20', stageId: 'muthmir', domainId: 'social', number: 20, title: 'أنظم يوماً مفتوحاً لاستقبال فتيات الحي وتعريفهن بفرقة الزهرات', companion: 'Baguira' },
  { id: 'muthmir-21', stageId: 'muthmir', domainId: 'social', number: 21, title: 'أشارك في نشاط مجتمعي لحماية شواطئ وغابات تونس من التلوث والحرائق', companion: 'Baguira' },
  { id: 'muthmir-22', stageId: 'muthmir', domainId: 'social', number: 22, title: 'أتعلم مهارات حل النزاعات والتوفيق والوساطة الإيجابية بين الزميلات', companion: 'Baguira' },
  { id: 'muthmir-23', stageId: 'muthmir', domainId: 'social', number: 23, title: 'أنسق مع قائدتي لتنظيم زيارة تفقدية وتضامنية لدار المسنين أو الأيتام', companion: 'Baguira' },

  // الجانب الانفعالي (بالو Balo)
  { id: 'muthmir-24', stageId: 'muthmir', domainId: 'emotional', number: 24, title: 'أشرف على إعداد وتقديم فقرات حفل السمر الختامي للمخيم الصيفي', companion: 'Balo' },
  { id: 'muthmir-25', stageId: 'muthmir', domainId: 'emotional', number: 25, title: 'أعزز الثقة بالنفس لدى الزهرات الصغيرات وأشجعهن على التحدث والإبداع', companion: 'Balo' },
  { id: 'muthmir-26', stageId: 'muthmir', domainId: 'emotional', number: 26, title: 'أعبر عن مشاعري ومواقفي بجرأة وأدب وشجاعة أدبية في المواقف الصعبة', companion: 'Balo' },
  { id: 'muthmir-27', stageId: 'muthmir', domainId: 'emotional', number: 27, title: 'أصمم ونفذ ألعاباً نفسية وحركية تزيد من ترابط وتماسك الباقة', companion: 'Balo' },
  { id: 'muthmir-28', stageId: 'muthmir', domainId: 'emotional', number: 28, title: 'أستعد نفسياً ومعنوياً للارتقاء والانتقال إلى مرحلة المرشدات بكل فخر', companion: 'Balo' },
  { id: 'muthmir-29', stageId: 'muthmir', domainId: 'emotional', number: 29, title: 'أوثق مسيرتي الكشفية في ألبوم ذكريات كشفي يخلد مراحل الزهرات', companion: 'Balo' },

  // الجانب البدني (أكيلا Akila)
  { id: 'muthmir-30', stageId: 'muthmir', domainId: 'physical', number: 30, title: 'أقوم بتمارين وتطبيقات عملية شاملة لمختلف حالات الإسعافات الأولية ونقل المصاب', companion: 'Akila' },
  { id: 'muthmir-31', stageId: 'muthmir', domainId: 'physical', number: 31, title: 'أقود التمارين الرياضية الصباحية للباقة كاملة مع أداء الصيحات الحماسية', companion: 'Akila' },
  { id: 'muthmir-32', stageId: 'muthmir', domainId: 'physical', number: 32, title: 'أشارك في رحلة خلوية استكشافية ومسير طويل في الطبيعة لمسافة 5 كم', companion: 'Akila' },
  { id: 'muthmir-33', stageId: 'muthmir', domainId: 'physical', number: 33, title: 'أتعلم مهارات الدفاع عن النفس والسلامة الشخصية والتصرف في الطوارئ', companion: 'Akila' },
  { id: 'muthmir-34', stageId: 'muthmir', domainId: 'physical', number: 34, title: 'أعد برنامجاً رياضياً وغذائياً متكاملاً لسداسيتي خلال أيام المخيم', companion: 'Akila' },
  { id: 'muthmir-35', stageId: 'muthmir', domainId: 'physical', number: 35, title: 'أتقن السباحة الأساسية وقواعد السلامة في المسابح والشواطئ البحرية', companion: 'Akila' },
  { id: 'muthmir-36', stageId: 'muthmir', domainId: 'physical', number: 36, title: 'أحافظ على أعلى درجات اللياقة البدنية والوزن الصحي والنوم المبكر', companion: 'Akila' },
  { id: 'muthmir-37', stageId: 'muthmir', domainId: 'physical', number: 37, title: 'أرشد زميلاتي للوقاية من ضربات الشمس والإجهاد الحراري في الخلاء', companion: 'Akila' },

  // الجانب الكشفي (تيبي Tippi)
  { id: 'muthmir-38', stageId: 'muthmir', domainId: 'scout', number: 38, title: 'أتقن العقد الكشفية المتقدمة (الفراشة، السماك المزدوجة، الدورة الخانقة، والربطات)', companion: 'Tippi' },
  { id: 'muthmir-39', stageId: 'muthmir', domainId: 'scout', number: 39, title: 'أشارك في قيادة وإعداد وتنفيذ حفل سمر ختامي للباقة مع أداء صيحة متميزة', companion: 'Tippi' },
  { id: 'muthmir-40', stageId: 'muthmir', domainId: 'scout', number: 40, title: 'أشارك في طهي خلوي متكامل باستخدام النيران الكشفية وإعداد الخبز الكشفي', companion: 'Tippi' },
  { id: 'muthmir-41', stageId: 'muthmir', domainId: 'scout', number: 41, title: 'أقود سداسيتي في لعبة استكشاف كبرى بالخلاء والاعتماد على الخريطة والبوصلة', companion: 'Tippi' },
  { id: 'muthmir-42', stageId: 'muthmir', domainId: 'scout', number: 42, title: 'أشرف على ركن السداسي وسجل تاريخ السداسي والعهدة وأدوات المخيم', companion: 'Tippi' },
  { id: 'muthmir-43', stageId: 'muthmir', domainId: 'scout', number: 43, title: 'أحقق متطلبات 7 شارات هواية كشفية معتمدة على الأقل وألصقها بالخارطة', companion: 'Tippi' },
  { id: 'muthmir-44', stageId: 'muthmir', domainId: 'scout', number: 44, title: 'أجتاز متطلبات حفل الارتقاء إلى فرقة المرشدات بكل جدارة واستحقاق', companion: 'Tippi' }
];

export const INITIAL_ZAHARAT: ZahraUser[] = [];

export const LEADER_PROFILE = {
  id: 'leader-khawla',
  name: 'القائدة خولة الطرابلسي',
  role: 'LEADER' as const,
  title: 'قائدة فرقة وباقة الزهرات - الكشافة التونسية',
  woodBadge: true,
  troopName: 'باقة زهرات الياسمين - فرقة الزهرات',
  city: 'تونس العاصمة',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
};
