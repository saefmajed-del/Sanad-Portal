/* ============================================================
   SANAD demo content
   ============================================================ */
export const SAMPLE_POLICY = `سياسة المشتريات والعقود الداخلية — مسودة ٢٠٢٦

المادة ١ — النطاق
تسري هذه السياسة على جميع عمليات الشراء التي تتم لحساب المنشأة، وتشمل العقود، وأوامر الشراء، والاتفاقيات الإطارية، والخدمات الاستشارية.

المادة ٢ — الصلاحيات
يحق لمدير الإدارة اعتماد طلبات الشراء حتى ٥٠٠,٠٠٠ ريال. ما يزيد عن ذلك يُرفع إلى الإدارة العليا.

المادة ٣ — المورّدون
يجب أن يكون المورّد مسجلاً في قائمة المورّدين المعتمدين قبل إصدار أمر الشراء.

المادة ٤ — حالات الطوارئ
في حالات الطوارئ، يحق للمسؤول المباشر تجاوز الإجراءات العادية للشراء وإصدار أمر الشراء فوراً.

المادة ٥ — التوثيق
يتم توثيق جميع المشتريات في النظام الإلكتروني للمنشأة.

المادة ٦ — المراجعة
تخضع المشتريات لمراجعة دورية من قبل إدارة المراجعة الداخلية.`;

export type Severity = "HIGH" | "MED" | "LOW";

export interface Finding {
  id: string;
  severity: Severity;
  titleAr: string;
  citationAr: string;
  detailAr: string;
  standardAr: string;
}

export const FINDINGS: Finding[] = [
  {
    id: "F-001",
    severity: "HIGH",
    titleAr: "غياب مبدأ فصل المسؤوليات (Segregation of Duties)",
    citationAr: "المادة ٢ — الصلاحيات",
    detailAr:
      "السياسة تمنح صلاحية الاعتماد دون فصلها عن المطالبة والاستلام، ما يفتح ثغرة احتيال أو خطأ غير مكتشف. أي شخص يطلب يستطيع أيضاً أن يعتمد ويستلم.",
    standardAr: "COSO 2013 — Principle 12  •  IIA Standard 2120",
  },
  {
    id: "F-002",
    severity: "HIGH",
    titleAr: "تعريف «حالات الطوارئ» مفتوح بلا حدود ولا رقابة لاحقة",
    citationAr: "المادة ٤ — حالات الطوارئ",
    detailAr:
      "السياسة تسمح بتجاوز كل الإجراءات دون: تعريف للطوارئ، سقف مالي، موافقة لاحقة، أو تقرير. هذا أعلى مصدر مخاطر تجاوز إجراءات الشراء عالمياً.",
    standardAr: "ISA 315  •  Risk-Based Procurement Controls",
  },
  {
    id: "F-003",
    severity: "HIGH",
    titleAr: "غياب سقف لتركّز المورّد (Vendor Concentration)",
    citationAr: "غياب في المادة ٣",
    detailAr:
      "لا يوجد سقف تراكمي للمشتريات من مورّد واحد خلال السنة. تركّز المورّد فوق ٢٠٪ يُعتبر مخاطرة عالية تستدعي ضوابط إضافية.",
    standardAr: "IIA Practice Guide on Procurement",
  },
  {
    id: "F-004",
    severity: "MED",
    titleAr: "معايير إدراج المورّد المعتمد غير محددة",
    citationAr: "المادة ٣ — المورّدون",
    detailAr:
      "تذكر السياسة «قائمة معتمدين» دون متطلبات الإدراج: السجل التجاري، الزكاة والضريبة، الـ GOSI، تقييم الأداء، أو due diligence.",
    standardAr: "Saudi PDPL  •  ISO 37001 (Anti-Bribery)",
  },
  {
    id: "F-005",
    severity: "MED",
    titleAr: "لا توجد ضوابط للمشتريات الصغيرة المتكررة",
    citationAr: "غياب في المادة ٢",
    detailAr:
      "السياسة تركّز على المبالغ الكبيرة فقط. المشتريات الصغيرة (تحت ٥,٠٠٠ ريال) لا تخضع لأي ضابط، ما يفتح نمط «التقسيم لتفادي الموافقة».",
    standardAr: "IIA Standard 2130 — Control Activities",
  },
  {
    id: "F-006",
    severity: "LOW",
    titleAr: "تكرار المراجعة الدورية غير محدد",
    citationAr: "المادة ٦ — المراجعة",
    detailAr:
      "السياسة تذكر «مراجعة دورية» بدون تحديد التكرار. الممارسة الفضلى: ربع سنوية على الأقل، مع مراجعة شاملة سنوية.",
    standardAr: "IIA Standard 2010 — Planning",
  },
];

export interface Recommendation {
  id: string;
  titleAr: string;
  bodyAr: string;
  linkedFindingId: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "R-001",
    linkedFindingId: "F-001",
    titleAr: "إضافة فصل صريح للمسؤوليات",
    bodyAr:
      "تعديل المادة ٢ لإضافة: «لا يجوز أن يجتمع دوران من الأدوار التالية في شخص واحد: طالب الشراء، معتمد الطلب، مستلم البضاعة».",
  },
  {
    id: "R-002",
    linkedFindingId: "F-002",
    titleAr: "إعادة صياغة بند الطوارئ",
    bodyAr:
      "تعريف دقيق للطوارئ + سقف مالي + موافقة لاحقة خلال ٤٨ ساعة + تقرير شهري للإدارة العليا بكل تجاوز.",
  },
  {
    id: "R-003",
    linkedFindingId: "F-003",
    titleAr: "إضافة سقف تركّز المورّد",
    bodyAr:
      "إدراج المادة ٣.١: «لا تتجاوز قيمة المشتريات السنوية من مورّد واحد ١٥٪ من الإجمالي إلا بموافقة لجنة العقود».",
  },
  {
    id: "R-004",
    linkedFindingId: "F-004",
    titleAr: "معايير إدراج المورّد",
    bodyAr:
      "إضافة مادة فرعية: السجل التجاري الساري، شهادة الزكاة، اشتراك GOSI، تقييم سنوي، فحص PDPL.",
  },
  {
    id: "R-005",
    linkedFindingId: "F-005",
    titleAr: "ضوابط المشتريات الصغيرة",
    bodyAr:
      "إضافة المادة ٧: سقف الطلب الواحد ٥,٠٠٠ ريال، حد شهري ٢٠,٠٠٠ ريال للموظف، تقرير شهري، منع تقسيم الفواتير.",
  },
  {
    id: "R-006",
    linkedFindingId: "F-006",
    titleAr: "تحديد دورية المراجعة",
    bodyAr:
      "المراجعة ربع سنوية على الأقل، مع مراجعة شاملة سنوية، وتقرير للجنة المراجعة في غضون ١٥ يوماً من نهاية الفترة.",
  },
];

export const COMPLIANCE_BREAKDOWN = {
  total: 22,
  aligned: 12,
  partial: 6,
  missing: 4,
  score: 68,
};

export const ANALYSIS_PHASES = [
  { label: "قراءة بنية السياسة", ms: 700 },
  { label: "استخراج الضوابط من النص", ms: 900 },
  { label: "مقارنة بمعايير COSO و IIA", ms: 1100 },
  { label: "كشف الفجوات والمخاطر", ms: 900 },
  { label: "صياغة التوصيات والاستشهادات", ms: 700 },
];

export const LAUNCH_DATE = new Date("2026-05-20T09:00:00+03:00");

/* ============================================================
   90-Second Journey content
   ============================================================ */
export type JourneyAccent = "gold" | "green" | "amber" | "navy" | "red";
export type VisualKey =
  | "gap"        // Beat 1 — Governance Gap Surfaces
  | "profile"    // Beat 2 — Risk Profile radar
  | "custody"    // Beat 3 — Chain of Custody (PUDU)
  | "devices"    // Beat 4 — Device Fleet Integrity (SOTI)
  | "decision"   // Beat 5 — Human Auditor Decides
  | "loop";      // Beat 6 — Policy Amended · Loop Closed

export interface JourneyStep {
  id: number;
  code: string;
  durationSec: number;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  accent: JourneyAccent;
  visual: VisualKey;
  features: string[];
  aiActions: { ar: string; metric?: string }[];
  outputs: { label: string; value: string; tone?: "green" | "amber" | "red" | "gold" }[];
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    code: "ACT 1 · BEAT 1",
    durationSec: 15,
    nameAr: "كشف فجوة حوكمية",
    nameEn: "Governance Gap Surfaces",
    taglineAr: "سـند يرصد بنداً قانونياً ناقصاً، والمالية تكتشف المعاملة التي استغلّته",
    accent: "gold",
    visual: "gap",
    features: [
      "مراجعة آلية للسياسات وكشف الفجوات",
      "ربط الفجوة بالمعاملة المالية المرتبطة",
      "كشف نمط «تجاوز إجراءات» في الوقت الفعلي",
      "تتبّع الأنظمة المعنية (PDPL · IIA · COSO)",
      "إنشاء قضية مراجعة موثّقة تلقائياً",
    ],
    aiActions: [
      { ar: "فحص السياسة", metric: "مشتريات · م.٤" },
      { ar: "البند الناقص", metric: "حالات الطوارئ — بلا سقف" },
      { ar: "معاملة مرتبطة", metric: "PO-23048" },
      { ar: "قيمة المعاملة", metric: "847,500 ﷼" },
      { ar: "قضية مفتوحة", metric: "AUD-2026-118" },
    ],
    outputs: [
      { label: "فجوة قانونية", value: "بند ٤", tone: "red" },
      { label: "معاملة استغلال", value: "PO-23048", tone: "amber" },
      { label: "حالة القضية", value: "مفتوحة", tone: "gold" },
    ],
  },
  {
    id: 2,
    code: "ACT 1 · BEAT 2",
    durationSec: 12,
    nameAr: "بطاقة المخاطر",
    nameEn: "Risk Profile Snapshot",
    taglineAr: "تقييم لحظي للشدة والتعرّض التنظيمي ونطاق التأثير",
    accent: "gold",
    visual: "profile",
    features: [
      "تقييم الشدة على ٦ أبعاد",
      "قياس التعرّض التنظيمي",
      "تحديد نطاق التأثير",
      "ربط بمعايير IIA ٢١٢٠ و COSO 2013",
      "ترشيح القضية للمستوى المناسب",
    ],
    aiActions: [
      { ar: "الشدة", metric: "عالية · 78/100" },
      { ar: "التعرّض التنظيمي", metric: "PDPL · IIA 2120" },
      { ar: "النطاق", metric: "إدارة + مورّد" },
      { ar: "مستوى التصعيد", metric: "مدير المراجعة" },
    ],
    outputs: [
      { label: "درجة المخاطر", value: "78 / 100", tone: "red" },
      { label: "التصنيف", value: "عالٍ", tone: "amber" },
      { label: "التصعيد", value: "إلى مدير المراجعة", tone: "gold" },
    ],
  },
  {
    id: 3,
    code: "ACT 2 · BEAT 3",
    durationSec: 13,
    nameAr: "سلسلة الحضانة بـ PUDU",
    nameEn: "Chain of Custody (PUDU)",
    taglineAr: "نقل الملف الموقّع بأمان مصرفي مع توثيق غير قابل للتعديل",
    accent: "navy",
    visual: "custody",
    features: [
      "نقل الملفات الورقية الموقّعة بين الإدارات",
      "خزائن مؤمّنة بمصادقة QR + Hash",
      "توثيق كل نقطة استلام (Tamper-evident)",
      "تكامل مع المصاعد والممرات الآمنة",
      "تسجيل سلسلة الحضانة في السجل التنفيذي",
    ],
    aiActions: [
      { ar: "روبوت PUDU", metric: "FlashBot · جاهز" },
      { ar: "نقطة الانطلاق", metric: "إدارة المالية · ط٣" },
      { ar: "الوجهة", metric: "مكتب المراجع · ط٥" },
      { ar: "Hash السلسلة", metric: "0x8F2A…E1C" },
      { ar: "سلامة الملف", metric: "مختومة" },
    ],
    outputs: [
      { label: "PUDU", value: "في المسار", tone: "green" },
      { label: "Chain Hash", value: "مُسجَّل", tone: "gold" },
      { label: "Tamper-Proof", value: "نعم", tone: "green" },
    ],
  },
  {
    id: 4,
    code: "ACT 2 · BEAT 4",
    durationSec: 12,
    nameAr: "سلامة أسطول الأجهزة",
    nameEn: "Device Fleet Integrity (SOTI)",
    taglineAr: "كل جهاز شارك في القضية موثَّق، مشفّر، وغير مخترق",
    accent: "gold",
    visual: "devices",
    features: [
      "حصر كل الأجهزة المعنية بالقضية",
      "التحقق من الامتثال والتشفير لحظياً",
      "كشف أي جهاز خارج السياسة",
      "عزل تلقائي عند الاشتباه",
      "سجل أجهزة مرتبط بسجل القضية",
    ],
    aiActions: [
      { ar: "أجهزة معنية", metric: "16" },
      { ar: "متوافقة", metric: "14" },
      { ar: "تنبيه ضعف امتثال", metric: "1" },
      { ar: "معزولة احتياطياً", metric: "1" },
      { ar: "حالة الأسطول", metric: "آمن" },
    ],
    outputs: [
      { label: "متوافقة", value: "14 / 16", tone: "green" },
      { label: "تنبيهات", value: "1", tone: "amber" },
      { label: "معزولة", value: "1", tone: "red" },
    ],
  },
  {
    id: 5,
    code: "ACT 3 · BEAT 5",
    durationSec: 15,
    nameAr: "قرار المراجع البشري",
    nameEn: "Human Auditor Decides",
    taglineAr: "كل ما تم — جاهز للاعتماد. الحكم للإنسان، دائماً.",
    accent: "gold",
    visual: "decision",
    features: [
      "عرض كل الأدلة في لوحة واحدة",
      "ربط الفجوة بالمعاملة بسلسلة الحضانة بأسطول الأجهزة",
      "عرض ٣ توصيات قابلة للتعديل",
      "زر اعتماد رسمي — لا تُغلق قضية بدونه",
      "توقيع رقمي يُسجَّل في السجل التنفيذي",
    ],
    aiActions: [
      { ar: "الملخص جاهز للمراجع", metric: "✓" },
      { ar: "الأدلة المعروضة", metric: "3 / 3" },
      { ar: "التوصيات المقترحة", metric: "تعديل المادة ٤" },
      { ar: "بانتظار قرار المراجع", metric: "..." },
      { ar: "تم الاعتماد", metric: "✓ موقَّع" },
    ],
    outputs: [
      { label: "الأدلة", value: "كاملة", tone: "green" },
      { label: "القرار", value: "اعتماد", tone: "gold" },
      { label: "التوقيع", value: "موثَّق", tone: "green" },
    ],
  },
  {
    id: 6,
    code: "ACT 3 · BEAT 6",
    durationSec: 13,
    nameAr: "تعديل السياسة · الحلقة تُغلق",
    nameEn: "Policy Amended · Loop Closes",
    taglineAr: "السياسة نفسها تتحدّث. الثغرة تُسد. المتابعة الذكية مستمرة.",
    accent: "gold",
    visual: "loop",
    features: [
      "تحديث المادة المعنية في السياسة آلياً (بعد اعتماد المراجع)",
      "إشعار المدراء المعنيين بالتغيير",
      "متابعة ذكية مستمرة لرصد فجوات جديدة",
      "ملخص تنفيذي يومي للقيادة",
      "إقفال القضية في السجل التنفيذي",
    ],
    aiActions: [
      { ar: "المادة المُعدَّلة", metric: "م.٤ — حالات الطوارئ" },
      { ar: "إشعار الإدارة", metric: "12 مدير" },
      { ar: "وضع المتابعة", metric: "ذاتي · مفعَّل" },
      { ar: "الفجوات المماثلة الجديدة", metric: "0" },
      { ar: "إغلاق القضية", metric: "AUD-2026-118 ✓" },
    ],
    outputs: [
      { label: "السياسة", value: "محدَّثة", tone: "green" },
      { label: "المتابعة", value: "مفعَّلة", tone: "gold" },
      { label: "القضية", value: "مُغلقة", tone: "green" },
    ],
  },
];

export const JOURNEY_TOTAL_SEC = JOURNEY_STEPS.reduce(
  (a, s) => a + s.durationSec,
  0
);

export interface JourneyPro {
  id: string;
  ar: string;
  en: string;
  initials: string;
  workloadReduction: number;
}

export const JOURNEY_PROFESSIONALS: JourneyPro[] = [
  { id: "lawyer", ar: "المستشار القانوني", en: "Lawyer", initials: "ق", workloadReduction: 78 },
  { id: "auditor", ar: "المراجع الداخلي", en: "Internal Auditor", initials: "م", workloadReduction: 83 },
  { id: "compliance", ar: "مسؤول الالتزام المالي", en: "Compliance Officer", initials: "إ", workloadReduction: 71 },
];

export const HEX = {
  gold:  "#C4A572",
  goldHi:"#D4B785",
  green: "#00C281",
  amber: "#E8B339",
  red:   "#E5526B",
  navy:  "#1E3461",
  inkMuted: "#7C8598",
};
