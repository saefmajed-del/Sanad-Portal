import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScanSearch,
  ShieldCheck,
  Sparkles,
  ArrowDownLeft,
  ArrowDownRight,
  FileText,
  GitCompareArrows,
  Lightbulb,
  Quote,
  AlertTriangle,
  CircleAlert,
  Info,
  CheckCircle2,
  Cpu,
  ClipboardCheck,
  Calendar,
  ChevronLeft,
  Building2,
  Bot,
  Smartphone,
  Network,
} from "lucide-react";
import {
  SAMPLE_POLICY,
  FINDINGS,
  RECOMMENDATIONS,
  COMPLIANCE_BREAKDOWN,
  ANALYSIS_PHASES,
  LAUNCH_DATE,
  type Severity,
  type Finding,
  type Recommendation,
} from "./data";
import { JourneySection } from "./journey";

type AnalysisState = "idle" | "running" | "done";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-base">
      <BackgroundLayers />
      <Header />
      <main className="relative">
        <Hero />
        <DemoSection />
        <HowItWorks />
        <JourneySection />
        <RoadmapSection />
        <LaunchCard />
        <Footer />
      </main>
    </div>
  );
}

/* =====================================================================
   Background ambient layers
   ===================================================================== */
function BackgroundLayers() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 grid-soft opacity-60" />
      <div className="pointer-events-none fixed inset-0 radial-warm" />
      <div className="pointer-events-none fixed inset-0 radial-cool" />
    </>
  );
}

/* =====================================================================
   Header
   ===================================================================== */
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-base/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-4">
          <Logomark />
          <div className="hidden h-6 w-px bg-line md:block" />
          <div className="hidden items-center gap-2 mono text-[10px] tracking-[0.22em] text-ink-3 md:flex">
            <span>RAQEEM</span>
            <span className="text-ink-4">×</span>
            <span>SAVVY WORLD</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="chip-green hidden lg:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-sa-greenHi" />
            <span className="ar">شهر التوعية بالمراجعة الداخلية</span>
          </span>
          <span className="chip-gold">
            <Calendar className="h-3 w-3" />
            <span className="ar">إطلاق: ٢٠ مايو ٢٠٢٦</span>
          </span>
        </div>
      </div>
    </header>
  );
}

function Logomark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gold-500/40 bg-gradient-to-br from-gold-500/15 to-gold-500/0">
        <ShieldCheck className="h-4 w-4 text-gold-500" />
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gold-500/15" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="ar-serif text-lg font-bold tracking-wide text-ink-1">
          راصد
        </span>
        <span className="mono text-[9px] tracking-[0.2em] text-ink-3">
          RASSED · GOVERNANCE
        </span>
      </div>
    </div>
  );
}

/* =====================================================================
   Hero
   ===================================================================== */
function Hero() {
  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/5 px-4 py-1.5">
            <Sparkles className="h-3 w-3 text-gold-500" />
            <span className="ar text-[11px] font-medium tracking-wide text-gold-400">
              أول منصة سعودية للحوكمة الذكية المتكاملة
            </span>
          </div>

          <h1 className="ar-serif mt-7 text-7xl font-bold leading-none tracking-tight text-ink-1 sm:text-8xl">
            راصــد
          </h1>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold-500/40" />
            <span className="mono text-[11px] tracking-[0.32em] text-ink-3">
              RASSED  ·  GOVERNANCE INTELLIGENCE
            </span>
            <span className="h-px w-12 bg-gold-500/40" />
          </div>

          <p className="ar mt-8 text-balance text-2xl font-medium leading-relaxed text-ink-1 sm:text-3xl">
            ثلاث طبقات. منظومة واحدة. حوكمة سعودية ذكية.
          </p>
          <p className="mt-4 text-[15px] text-ink-3">
            AI Intelligence  ·  Robotics  ·  Device Governance — built for Saudi enterprise.
          </p>

          {/* Three pillars */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3">
            <PillarChip ar="ذكاء" en="AI LAYER" subAr="سـند · Audit AI" />
            <PillarChip ar="حركة" en="PHYSICAL LAYER" subAr="PUDU · Chain of Custody" />
            <PillarChip ar="تحكّم" en="DEVICE LAYER" subAr="SOTI · Governance" />
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <div className="panel relative rounded-2xl px-6 py-5 text-right">
              <Quote className="absolute right-4 top-4 h-4 w-4 text-gold-500/50" />
              <p className="ar-serif text-lg leading-loose text-ink-1">
                «المؤسسات لا تحتاج فرق تشغيل ضخمة بعد اليوم.
                <span className="text-gold-400"> الذكاء يراقب، الروبوتات تنقل، والحوكمة تدير. </span>
                ٣ متخصصين فقط يقررون.»
              </p>
              <p className="ar mt-3 text-xs text-ink-3">— راصد · رقيم × Savvy World</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-2">
            <span className="mono text-[10px] tracking-widest text-ink-3">
              EXPERIENCE  ·  SCROLL
            </span>
            <div className="h-10 w-px bg-gradient-to-b from-gold-500/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =====================================================================
   Demo section — the live analyzer
   ===================================================================== */
function DemoSection() {
  const [policy, setPolicy] = useState(SAMPLE_POLICY);
  const [state, setState] = useState<AnalysisState>("idle");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const phaseTimeouts = useRef<number[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    setState("idle");
    setPhaseIdx(0);
    phaseTimeouts.current.forEach(clearTimeout);
    phaseTimeouts.current = [];
  }, []);

  const analyze = useCallback(() => {
    setState("running");
    setPhaseIdx(0);
    let acc = 0;
    phaseTimeouts.current = ANALYSIS_PHASES.map((p, i) => {
      acc += p.ms;
      return window.setTimeout(() => {
        setPhaseIdx(i + 1);
        if (i === ANALYSIS_PHASES.length - 1) {
          setState("done");
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
      }, acc);
    });
  }, []);

  useEffect(() => () => phaseTimeouts.current.forEach(clearTimeout), []);

  return (
    <section className="relative border-t border-line/60 bg-base/50 py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-12 flex flex-col items-start gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono text-[10px] tracking-[0.25em] text-gold-500">
              FIRST MODULE  ·  LIVE TODAY
            </span>
            <span className="chip-gold">
              <span className="ar text-[11px]">سـند · Sanad</span>
            </span>
          </div>
          <h2 className="ar text-balance text-4xl font-bold text-ink-1 sm:text-5xl">
            جرّب سـند الآن
          </h2>
          <p className="ar max-w-2xl text-balance text-lg text-ink-2">
            أول وحدات راصد — مساعد المراجعة الذكي.
            ألصق سياسة داخلية، يستخرج الضوابط، يقارنها بـ COSO و IIA،
            ويكشف الفجوات بالاستشهاد الدقيق.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.05fr]">
          <PolicyInputPanel
            value={policy}
            onChange={setPolicy}
            state={state}
            onAnalyze={analyze}
            onReset={reset}
          />
          <div ref={resultsRef}>
            <OutputPanel state={state} phaseIdx={phaseIdx} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyInputPanel({
  value,
  onChange,
  state,
  onAnalyze,
  onReset,
}: {
  value: string;
  onChange: (v: string) => void;
  state: AnalysisState;
  onAnalyze: () => void;
  onReset: () => void;
}) {
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  const running = state === "running";
  return (
    <div className="panel relative overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink-4" />
            <span className="h-2 w-2 rounded-full bg-ink-4" />
            <span className="h-2 w-2 rounded-full bg-ink-4" />
          </div>
          <span className="mono ml-3 text-[10px] tracking-wide text-ink-3">
            POLICY_INPUT.docx
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono num text-[10px] text-ink-3">{wordCount} words</span>
          <button
            onClick={() => onChange(SAMPLE_POLICY)}
            disabled={running}
            className="mono rounded-md border border-line bg-surface/40 px-2 py-1 text-[10px] tracking-wide text-ink-2 transition hover:bg-surface/80 disabled:opacity-40"
          >
            LOAD SAMPLE
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          dir="rtl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={running}
          spellCheck={false}
          className="ar-serif min-h-[420px] w-full resize-none bg-transparent px-6 py-5 text-[15px] leading-[2.1] text-ink-1 placeholder:text-ink-3 focus:outline-none disabled:opacity-60"
          placeholder="ألصق هنا فقرة من سياسة داخلية، أو عقد، أو إجراء..."
        />
        <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-gold-500/40" />
        <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-gold-500/40" />
        <span className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-b border-r border-gold-500/40" />
        <span className="pointer-events-none absolute left-3 bottom-3 h-3 w-3 border-b border-l border-gold-500/40" />
      </div>

      <div className="flex items-center justify-between border-t border-line bg-elevated/40 px-5 py-4">
        <div className="flex items-center gap-2 text-[11px] text-ink-3">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="ar">يعمل محلياً — البيانات لا تغادر متصفحك</span>
        </div>
        <div className="flex items-center gap-2">
          {state !== "idle" && (
            <button
              onClick={onReset}
              disabled={running}
              className="btn-ghost text-[12px] disabled:opacity-40"
            >
              <span className="ar">جلسة جديدة</span>
            </button>
          )}
          <button onClick={onAnalyze} disabled={running || !value.trim()} className="btn-primary">
            {running ? (
              <>
                <Cpu className="h-4 w-4 animate-spin" />
                <span className="ar">يحلّل...</span>
              </>
            ) : (
              <>
                <ScanSearch className="h-4 w-4" />
                <span className="ar">حلّل بسـند</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function OutputPanel({ state, phaseIdx }: { state: AnalysisState; phaseIdx: number }) {
  return (
    <div className="panel relative overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-line bg-elevated/40 px-5 py-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
          <span className="mono text-[10px] tracking-wide text-gold-500">
            SANAD_REPORT
          </span>
        </div>
        <span className="mono text-[10px] text-ink-3">
          {state === "idle"
            ? "AWAITING"
            : state === "running"
            ? "ANALYZING"
            : "READY"}
        </span>
      </div>
      <div className="min-h-[420px]">
        <AnimatePresence mode="wait">
          {state === "idle" && <IdleState key="idle" />}
          {state === "running" && <RunningState key="running" phaseIdx={phaseIdx} />}
          {state === "done" && <DoneState key="done" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function IdleState() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="flex h-full min-h-[420px] flex-col items-center justify-center px-8 py-10 text-center"
    >
      <div className="relative">
        <FileText className="h-14 w-14 text-ink-4" strokeWidth={1.2} />
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gold-500/5 blur-2xl" />
      </div>
      <p className="ar mt-6 text-balance text-lg text-ink-2">
        التقرير يظهر هنا بعد أن يضغط المراجع زر «حلّل بسـند».
      </p>
      <p className="mt-2 text-[12px] text-ink-3">
        Findings · Recommendations · Citations · Compliance Score
      </p>
      <div className="mt-8 flex items-center gap-2">
        <ArrowDownLeft className="h-4 w-4 text-gold-500" />
        <span className="ar text-xs text-ink-3">يمكنك تعديل النموذج يساراً</span>
        <ArrowDownRight className="h-4 w-4 text-gold-500" />
      </div>
    </motion.div>
  );
}

function RunningState({ phaseIdx }: { phaseIdx: number }) {
  const total = ANALYSIS_PHASES.length;
  const pct = (phaseIdx / total) * 100;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="flex h-full min-h-[420px] flex-col px-8 py-10"
    >
      <div className="mb-8">
        <p className="mono text-[10px] tracking-[0.25em] text-gold-500">ANALYSIS IN PROGRESS</p>
        <p className="ar mt-2 shimmer-text text-2xl font-bold">
          {ANALYSIS_PHASES[Math.min(phaseIdx, total - 1)]?.label}...
        </p>
      </div>
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-surface">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ boxShadow: "0 0 16px rgba(196,165,114,0.4)" }}
        />
      </div>
      <div className="mt-3 flex justify-between mono num text-[10px] text-ink-3">
        <span>STEP {Math.min(phaseIdx + 1, total)} / {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="mt-8 space-y-2.5">
        {ANALYSIS_PHASES.map((p, i) => {
          const done = i < phaseIdx;
          const active = i === phaseIdx;
          return (
            <div key={i}
              className={`flex items-center justify-between rounded-md border border-line bg-surface/30 px-3 py-2 transition ${
                active ? "border-gold-500/40" : ""
              }`}>
              <div className="flex items-center gap-2.5">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 text-sa-greenHi" strokeWidth={2} />
                ) : active ? (
                  <Cpu className="h-4 w-4 animate-spin text-gold-500" />
                ) : (
                  <span className="h-3 w-3 rounded-full border border-ink-4" />
                )}
                <span className={`ar text-[13px] ${done || active ? "text-ink-1" : "text-ink-3"}`}>
                  {p.label}
                </span>
              </div>
              {done && <span className="mono text-[10px] text-sa-greenHi">DONE</span>}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function DoneState() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="px-5 py-6 lg:px-7"
    >
      <ScorePanel />
      <SectionDivider label="الفجوات المرصودة" sublabel="FINDINGS" count={FINDINGS.length} />
      <FindingsList />
      <SectionDivider label="التوصيات" sublabel="RECOMMENDATIONS" count={RECOMMENDATIONS.length} />
      <RecommendationsList />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-elevated/40 px-4 py-3">
        <div className="flex items-center gap-2 text-[12px] text-ink-3">
          <ClipboardCheck className="h-4 w-4 text-gold-500" />
          <span className="ar">جاهز للتصدير كتقرير مراجعة موقّع</span>
        </div>
        <button className="btn-primary text-[13px]">
          <span className="ar">تصدير التقرير الكامل</span>
        </button>
      </div>
    </motion.div>
  );
}

function ScorePanel() {
  const { score, aligned, partial, missing, total } = COMPLIANCE_BREAKDOWN;
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let id: number;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setShown(Math.round(score * eased));
      if (k < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [score]);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr]">
      <Gauge value={shown} />
      <div className="grid grid-cols-3 gap-3">
        <StatBlock label="مطابق" value={aligned} of={total} color="green" />
        <StatBlock label="جزئي" value={partial} of={total} color="warn" />
        <StatBlock label="ناقص" value={missing} of={total} color="high" />
        <div className="col-span-3 mt-1 rounded-lg border border-line bg-surface/30 px-3 py-2">
          <p className="ar text-[11px] text-ink-3">القراءة الإجمالية</p>
          <p className="ar mt-1 text-[13px] text-ink-1">
            السياسة جيدة في الهيكل، لكن تحتاج تعزيز
            <span className="text-sig-high"> ضوابط الطوارئ </span>
            و<span className="text-sig-high"> فصل المسؤوليات </span>
            قبل الاعتماد النهائي.
          </p>
        </div>
      </div>
    </div>
  );
}

function Gauge({ value }: { value: number }) {
  const radius = 64;
  const stroke = 10;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="relative flex h-[170px] w-[170px] items-center justify-center">
      <svg viewBox="0 0 160 160" className="absolute inset-0">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(245,242,235,0.06)" strokeWidth={stroke} />
        <circle cx="80" cy="80" r={radius} fill="none" stroke="url(#gold-grad)" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 80 80)" style={{ transition: "stroke-dashoffset 0.05s linear" }} />
        <defs>
          <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4B785" />
            <stop offset="100%" stopColor="#A88B5C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <div className="mono num text-5xl font-bold leading-none text-ink-1">{value}</div>
        <div className="mono mt-1 text-[10px] tracking-widest text-ink-3">/ 100 · COMPLIANCE</div>
      </div>
    </div>
  );
}

function StatBlock({
  label, value, of, color,
}: {
  label: string;
  value: number;
  of: number;
  color: "green" | "warn" | "high";
}) {
  const c = {
    green: "text-sa-greenHi",
    warn:  "text-sig-warn",
    high:  "text-sig-high",
  }[color];
  return (
    <div className="rounded-lg border border-line bg-surface/30 px-3 py-3">
      <p className="ar text-[11px] text-ink-3">{label}</p>
      <p className={`mono num mt-1 text-2xl font-bold ${c}`}>
        {value}<span className="text-sm text-ink-3">/{of}</span>
      </p>
    </div>
  );
}

function SectionDivider({ label, sublabel, count }: { label: string; sublabel: string; count: number }) {
  return (
    <div className="mt-8 mb-4 flex items-center gap-3">
      <span className="ar text-[15px] font-bold text-ink-1">{label}</span>
      <span className="chip text-[10px]">{count}</span>
      <span className="mono text-[10px] tracking-widest text-ink-3">{sublabel}</span>
      <div className="flex-1 divider-gold" />
    </div>
  );
}

function FindingsList() {
  return (
    <div className="space-y-2.5">
      {FINDINGS.map((f, i) => <FindingCard key={f.id} f={f} index={i} />)}
    </div>
  );
}

function severityMeta(s: Severity) {
  switch (s) {
    case "HIGH":
      return { label: "حرجة", en: "HIGH", color: "text-sig-high",
        bg: "bg-sig-high/10", ring: "ring-sig-high/30", icon: AlertTriangle };
    case "MED":
      return { label: "متوسطة", en: "MED", color: "text-sig-warn",
        bg: "bg-sig-warn/10", ring: "ring-sig-warn/30", icon: CircleAlert };
    case "LOW":
      return { label: "منخفضة", en: "LOW", color: "text-ink-2",
        bg: "bg-ink-2/10", ring: "ring-ink-3/30", icon: Info };
  }
}

function FindingCard({ f, index }: { f: Finding; index: number }) {
  const m = severityMeta(f.severity);
  const Icon = m.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.4 }}
      className={`relative overflow-hidden rounded-xl border border-line bg-surface/30 px-4 py-3.5 ring-1 ring-inset ${m.ring}`}
    >
      <div className="flex items-start gap-3">
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${m.bg}`}>
          <Icon className={`h-3.5 w-3.5 ${m.color}`} strokeWidth={2.3} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`mono text-[10px] font-bold tracking-wider ${m.color}`}>{m.en}</span>
            <span className="mono text-[9px] text-ink-3">·</span>
            <span className="mono text-[10px] text-ink-3">{f.id}</span>
            <span className="ar text-[10px] text-ink-3">({m.label})</span>
          </div>
          <p className="ar mt-1 text-[14.5px] font-semibold leading-relaxed text-ink-1">{f.titleAr}</p>
          <p className="ar mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{f.detailAr}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="ar inline-flex items-center gap-1.5 text-[11px] text-ink-3">
              <Quote className="h-3 w-3 text-gold-500" />
              {f.citationAr}
            </span>
            <span className="hidden h-3 w-px bg-line sm:inline-block" />
            <span className="mono text-[10px] tracking-wide text-ink-3">{f.standardAr}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RecommendationsList() {
  return (
    <div className="space-y-2.5">
      {RECOMMENDATIONS.map((r, i) => <RecommendationCard key={r.id} r={r} index={i} />)}
    </div>
  );
}

function RecommendationCard({ r, index }: { r: Recommendation; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.07, duration: 0.4 }}
      className="rounded-xl border border-line bg-surface/30 px-4 py-3.5"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gold-500/15 text-gold-500">
          <Lightbulb className="h-3.5 w-3.5" strokeWidth={2.3} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono text-[10px] font-bold tracking-wider text-gold-500">{r.id}</span>
            <span className="mono text-[9px] text-ink-3">→</span>
            <span className="mono text-[10px] text-ink-3">{r.linkedFindingId}</span>
          </div>
          <p className="ar mt-1 text-[14.5px] font-semibold leading-relaxed text-ink-1">{r.titleAr}</p>
          <p className="ar mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{r.bodyAr}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* =====================================================================
   How سند works
   ===================================================================== */
function HowItWorks() {
  const steps = [
    { icon: FileText, n: "01", titleAr: "يقرأ",
      bodyAr: "يستخرج بنية السياسة، المواد، والضوابط، ويبني خريطة كاملة للنص.", en: "READ" },
    { icon: GitCompareArrows, n: "02", titleAr: "يقارن",
      bodyAr: "يقابل الضوابط بمعايير COSO و IIA و PDPL، ويعلّم الفجوات بدقة.", en: "COMPARE" },
    { icon: Lightbulb, n: "03", titleAr: "يقترح",
      bodyAr: "يصيغ توصيات قابلة للتنفيذ مع الاستشهاد لكل ضابط — جاهزة للاعتماد.", en: "RECOMMEND" },
  ];
  return (
    <section className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-12 flex flex-col items-start gap-3">
          <span className="mono text-[10px] tracking-[0.25em] text-gold-500">
            02  ·  HOW SANAD WORKS
          </span>
          <h2 className="ar text-4xl font-bold text-ink-1 sm:text-5xl">
            ثلاث خطوات. دقيقة واحدة. تقرير موثَّق.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="panel relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-500/5 blur-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] tracking-widest text-ink-3">
                    {s.n}  ·  {s.en}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/5">
                    <s.icon className="h-4 w-4 text-gold-500" />
                  </div>
                </div>
                <p className="ar-serif mt-5 text-3xl font-bold text-ink-1">{s.titleAr}</p>
                <p className="ar mt-2 text-[14px] leading-relaxed text-ink-2">{s.bodyAr}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   Pillar chip (used in Hero)
   ===================================================================== */
function PillarChip({ ar, en, subAr }: { ar: string; en: string; subAr: string }) {
  return (
    <div className="panel rounded-xl px-3 py-3 text-center">
      <p className="ar text-[14px] font-bold text-ink-1">{ar}</p>
      <p className="mono mt-1 text-[9px] tracking-widest text-gold-500">{en}</p>
      <p className="ar mt-1.5 text-[10px] text-ink-3">{subAr}</p>
    </div>
  );
}

/* =====================================================================
   Roadmap section — RASSED platform growth path
   ===================================================================== */
function RoadmapSection() {
  const milestones = [
    {
      q: "Q2 · 2026",
      en: "AI LAYER",
      ar: "طبقة الذكاء",
      title: "سـند — Audit Intelligence",
      bodyAr: "مساعد المراجعة الذكي. كشف فجوات الضوابط واستشهاد المعايير.",
      tag: "LIVE TODAY",
      tagAr: "متاحة الآن",
      icon: ShieldCheck,
      tone: "active" as const,
    },
    {
      q: "Q3 · 2026",
      en: "PHYSICAL LAYER",
      ar: "طبقة الحركة",
      title: "PUDU FlashBot — Chain of Custody",
      bodyAr: "شراكة استراتيجية موقّعة مع PUDU. أول نشر سعودي قيد التنفيذ — نقل الوثائق بأمان مصرفي، خزائن مؤمّنة، سلسلة حضانة موثّقة.",
      tag: "ACTIVE PARTNERSHIP",
      tagAr: "شراكة فعّالة",
      icon: Bot,
      tone: "active" as const,
    },
    {
      q: "Q4 · 2026",
      en: "DEVICE LAYER",
      ar: "طبقة الأجهزة",
      title: "SOTI — Device Governance",
      bodyAr: "حوكمة الأجهزة، التحكم عن بُعد، الامتثال السياسي، سجلات المراجعة.",
      tag: "Q4 ROADMAP",
      tagAr: "مخطط",
      icon: Smartphone,
      tone: "later" as const,
    },
    {
      q: "2027",
      en: "COMMAND CENTER",
      ar: "مركز القيادة",
      title: "RASSED Executive Console",
      bodyAr: "غرفة عمليات حوكمة موحّدة — ذكاء + روبوتات + أجهزة في شاشة واحدة.",
      tag: "VISION",
      tagAr: "الرؤية",
      icon: Network,
      tone: "vision" as const,
    },
  ];

  return (
    <section className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-12 flex flex-col items-start gap-3">
          <span className="mono text-[10px] tracking-[0.25em] text-gold-500">
            03  ·  ROADMAP  ·  WHAT'S NEXT
          </span>
          <h2 className="ar text-balance text-4xl font-bold leading-tight text-ink-1 sm:text-5xl">
            راصد ليست أداة واحدة — منظومة كاملة
          </h2>
          <p className="ar max-w-3xl text-balance text-lg text-ink-2">
            نبدأ بسـند اليوم. تكتمل المنظومة على ٣ مراحل خلال ١٨ شهراً —
            ذكاء، حركة، تحكّم، مركز قيادة.
          </p>
        </div>

        {/* Horizontal milestones */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            const isActive = m.tone === "active";
            const tagColor = {
              active: "bg-sa-green/10 text-sa-greenHi border-sa-green/30",
              next:   "bg-gold-500/10 text-gold-400 border-gold-500/30",
              later:  "bg-surface text-ink-2 border-line",
              vision: "bg-surface text-ink-3 border-line",
            }[m.tone];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={`panel relative overflow-hidden rounded-2xl p-5 ${
                  isActive ? "ring-1 ring-gold-500/40" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                      isActive
                        ? "border-gold-500/40 bg-gold-500/10"
                        : "border-line bg-surface/40"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-gold-500" : "text-ink-2"
                      }`}
                    />
                  </div>
                  <span
                    className={`mono inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] tracking-widest ${tagColor}`}
                  >
                    {isActive && (
                      <span className="h-1 w-1 rounded-full bg-sa-greenHi animate-pulse" />
                    )}
                    {m.tag}
                  </span>
                </div>
                <p className="mono mt-4 text-[10px] tracking-widest text-ink-3">
                  {m.q}  ·  {m.en}
                </p>
                <p className="ar mt-1 text-[13px] text-ink-3">{m.ar}</p>
                <h3 className="ar mt-2 text-[18px] font-bold text-ink-1">
                  {m.title}
                </h3>
                <p className="ar mt-2 text-[13px] leading-relaxed text-ink-2">
                  {m.bodyAr}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="panel-strong mt-10 rounded-3xl px-8 py-10 text-center"
        >
          <p className="mono text-[10px] tracking-[0.3em] text-gold-500">
            ONE PLATFORM  ·  ONE GOVERNANCE  ·  ONE TEAM
          </p>
          <p className="ar-serif mt-4 text-balance text-2xl font-bold leading-relaxed text-ink-1 sm:text-3xl">
            <span className="text-gold-400">PUDU</span> ينفذ  ·{" "}
            <span className="text-gold-400">SOTI</span> يدير  ·{" "}
            <span className="text-gold-400">راصد</span> يحكم الدورة كاملة
          </p>
          <p className="ar mt-4 text-[14px] text-ink-3">
            نحو حوكمة سعودية ذكية متوافقة مع رؤية ٢٠٣٠.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* =====================================================================
   Launch
   ===================================================================== */
function LaunchCard() {
  const [r, setR] = useState(() => diffToNow(LAUNCH_DATE));
  useEffect(() => {
    const id = setInterval(() => setR(diffToNow(LAUNCH_DATE)), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative border-t border-line/60 py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="panel-strong relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14"
        >
          <div className="pointer-events-none absolute inset-0 grid-soft opacity-30" />
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold-500/8 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-sa-green/8 blur-3xl" />
          <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="mono text-[10px] tracking-[0.25em] text-gold-500">
                04  ·  LAUNCH MOMENT
              </span>
              <h2 className="ar mt-4 text-balance text-4xl font-bold leading-tight text-ink-1 sm:text-5xl">
                ٢٠ مايو ٢٠٢٦
                <br />
                <span className="text-gold-400">إطلاق راصد</span>
                <span className="ar text-2xl text-ink-2"> · يوم المراجعة الداخلية</span>
              </h2>
              <p className="ar mt-5 max-w-xl text-balance text-lg leading-relaxed text-ink-2">
                في هذا اليوم — تُكشف منصة <span className="text-gold-400">راصد</span> رسمياً،
                بأول وحداتها <span className="text-gold-400">سـند</span>،
                هدية لكل مراجع داخلي ضمن شهر التوعية الدولي.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="chip-gold">
                  <Building2 className="h-3 w-3" />
                  <span className="ar">رقيم للحلول الذكية</span>
                </span>
                <span className="chip-green">
                  <ShieldCheck className="h-3 w-3" />
                  <span className="ar">الهيئة الملكية للجبيل وينبع</span>
                </span>
                <span className="chip">
                  <Sparkles className="h-3 w-3" />
                  <span className="ar">Savvy World — التقنية والروبوت</span>
                </span>
              </div>
            </div>
            <div className="w-full lg:w-auto">
              <CountdownCard r={r} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CountdownCard({ r }: { r: { d: number; h: number; m: number; s: number; past: boolean } }) {
  if (r.past) {
    return (
      <div className="panel rounded-2xl p-6 text-center">
        <p className="ar-serif text-3xl font-bold text-gold-400">الإطلاق اليوم</p>
        <p className="mono mt-2 text-xs text-ink-3">SANAD IS LIVE</p>
      </div>
    );
  }
  return (
    <div className="panel rounded-2xl p-5">
      <p className="mono mb-3 text-[10px] tracking-widest text-ink-3">COUNTDOWN TO LAUNCH</p>
      <div className="grid grid-cols-4 gap-2">
        <Tick value={r.d} label="يوم" en="DAY" />
        <Tick value={r.h} label="ساعة" en="HR" />
        <Tick value={r.m} label="دقيقة" en="MIN" />
        <Tick value={r.s} label="ثانية" en="SEC" />
      </div>
    </div>
  );
}

function Tick({ value, label, en }: { value: number; label: string; en: string }) {
  return (
    <div className="rounded-xl border border-line bg-elevated/60 px-3 py-3 text-center">
      <div className="mono num text-3xl font-bold text-ink-1">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="ar mt-1 text-[10px] text-ink-3">{label}</div>
      <div className="mono text-[8px] tracking-widest text-ink-4">{en}</div>
    </div>
  );
}

function diffToNow(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, past: true };
  return {
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms % 86_400_000) / 3_600_000),
    m: Math.floor((ms % 3_600_000) / 60_000),
    s: Math.floor((ms % 60_000) / 1000),
    past: false,
  };
}

/* =====================================================================
   Footer
   ===================================================================== */
function Footer() {
  return (
    <footer className="relative border-t border-line/60 bg-base py-12">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Logomark />
            <ChevronLeft className="h-4 w-4 text-ink-4" />
            <span className="ar text-[13px] text-ink-2">
              منصة الحوكمة السعودية الذكية
            </span>
          </div>
          <div className="flex flex-col gap-1 text-[11px] mono text-ink-3 lg:text-right">
            <span>RASSED v0.1 · Concept Edition</span>
            <span>POWERED BY  AI  ·  ROBOTICS  ·  GOVERNANCE INTELLIGENCE</span>
            <span>رقيم × Savvy World  ·  Launch 2026-05-20</span>
          </div>
        </div>
        <div className="mt-8 border-t border-line pt-6">
          <p className="ar-serif text-center text-[15px] leading-loose text-ink-1">
            <span className="text-gold-400">PUDU</span> ينفذ  ·{" "}
            <span className="text-gold-400">SOTI</span> يدير  ·{" "}
            <span className="text-gold-400">راصد</span> يحكم الدورة كاملة
          </p>
          <p className="ar mt-3 text-center text-[12px] text-ink-3">
            «المؤسسات لا تحتاج فرق ضخمة. الذكاء يراقب، الروبوتات تنقل، الحوكمة تدير، والفريق يقرر.»
          </p>
        </div>
      </div>
    </footer>
  );
}
