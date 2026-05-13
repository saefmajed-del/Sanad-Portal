import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pause,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Cpu,
  Check,
  Fingerprint,
  Building2,
  ShieldCheck,
  FileSearch,
  Network,
  Bot,
  Banknote,
  Activity,
  Scale,
  BadgeCheck,
  ScanText,
} from "lucide-react";
import {
  JOURNEY_STEPS,
  JOURNEY_TOTAL_SEC,
  JOURNEY_PROFESSIONALS,
  HEX,
  type JourneyStep,
  type VisualKey,
} from "./data";

const TICK_MS = 50;

export function JourneySection() {
  const [idx, setIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 4>(2);
  const onFinal = idx >= JOURNEY_STEPS.length;
  const current = onFinal ? null : JOURNEY_STEPS[idx];
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-start when in view
  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && idx === 0 && elapsed === 0) setPlaying(true);
        });
      },
      { threshold: 0.35 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [idx, elapsed]);

  useEffect(() => {
    if (!playing || onFinal) return;
    const id = setInterval(() => {
      setElapsed((p) => {
        const next = p + TICK_MS * speed;
        const limit = JOURNEY_STEPS[idx].durationSec * 1000;
        if (next >= limit) {
          setIdx((i) => i + 1);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [playing, speed, idx, onFinal]);

  const restart = useCallback(() => {
    setIdx(0);
    setElapsed(0);
    setPlaying(true);
  }, []);

  // Booth-mode auto-restart: when journey ends, wait 8s then loop again.
  // Critical for an 8-hour unattended expo screen — without this, the booth
  // freezes on FinalScreen for the rest of the day.
  useEffect(() => {
    if (!onFinal || !playing) return;
    const t = window.setTimeout(restart, 8000);
    return () => clearTimeout(t);
  }, [onFinal, playing, restart]);

  const goTo = useCallback((i: number) => {
    setIdx(Math.max(0, Math.min(JOURNEY_STEPS.length, i)));
    setElapsed(0);
  }, []);

  const totalElapsedSec = useMemo(() => {
    let acc = 0;
    for (let i = 0; i < idx && i < JOURNEY_STEPS.length; i++)
      acc += JOURNEY_STEPS[i].durationSec;
    return onFinal ? JOURNEY_TOTAL_SEC : acc + elapsed / 1000;
  }, [idx, elapsed, onFinal]);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-line/60 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start gap-3">
          <span className="mono text-[10px] tracking-[0.25em] text-gold-500">
            04  ·  THE 90-SECOND JOURNEY
          </span>
          <h2 className="ar text-balance text-4xl font-bold leading-tight text-ink-1 sm:text-5xl">
            من إشارة إلى حوكمة — ٩٠ ثانية
          </h2>
          <p className="ar max-w-3xl text-balance text-lg text-ink-2">
            دورة حياة قضية مراجعة داخلية، من اللحظة التي يكتشف فيها سـند فجوة حوكمية
            — إلى لحظة تعديل السياسة وإغلاق الحلقة. ثلاث طبقات (AI · PUDU · SOTI)
            تتعاون، والمراجع البشري هو الحَكَم.
          </p>
        </div>

        {/* Controls bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying(!playing)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold-500/40 bg-gold-500/10 text-gold-500 transition hover:bg-gold-500/20"
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => goTo(Math.max(0, idx - 1))}
              disabled={idx === 0}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/60 text-ink-2 transition hover:bg-surface disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => goTo(idx + 1)}
              disabled={onFinal}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/60 text-ink-2 transition hover:bg-surface disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={restart}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/60 text-ink-2 transition hover:bg-surface"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <div className="ml-3 flex items-center gap-1 rounded-full border border-line bg-surface/60 p-0.5">
              {([1, 2, 4] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`mono rounded-full px-2.5 py-1 text-[10px] transition ${
                    speed === s
                      ? "bg-gold-500/15 text-gold-400"
                      : "text-ink-3 hover:text-ink-1"
                  }`}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="mono num text-xs text-ink-3">
              {fmt(Math.floor(totalElapsedSec))} /{" "}
              {fmt(JOURNEY_TOTAL_SEC)}
            </span>
            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-surface">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
                style={{
                  width: `${(totalElapsedSec / JOURNEY_TOTAL_SEC) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Stage */}
        <div className="relative min-h-[520px]">
          <AnimatePresence mode="wait">
            {onFinal ? (
              <motion.div
                key="final"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <FinalScreen />
              </motion.div>
            ) : (
              <motion.div
                key={`s${idx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]"
              >
                <div>
                  <div className="aspect-[4/3] w-full">
                    <Visual kind={current!.visual} />
                  </div>
                  <StepHeader step={current!} elapsed={elapsed} />
                </div>
                <div className="space-y-3">
                  <FeaturesCard step={current!} />
                  <AIOrchestration step={current!} elapsed={elapsed} />
                  <OutputsRow step={current!} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timeline + professionals */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
          <Timeline idx={idx} elapsed={elapsed} goTo={goTo} onFinal={onFinal} />
          <Professionals />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Step header
   ============================================================ */
function StepHeader({ step, elapsed }: { step: JourneyStep; elapsed: number }) {
  // Mapped to the 6 new beats: gap | profile | custody | devices | decision | loop
  const ICONS: Record<number, typeof BadgeCheck> = {
    1: ScanText,    // Beat 1 — Gap detected
    2: Activity,    // Beat 2 — Risk profile
    3: Bot,         // Beat 3 — PUDU custody
    4: Scale,       // Beat 4 — SOTI device integrity (Scale as "balance/control")
    5: BadgeCheck,  // Beat 5 — Human approval
    6: Banknote,    // Beat 6 — Policy amended (using Banknote as ledger/record proxy)
  };
  const Icon = ICONS[step.id];
  const limit = step.durationSec * 1000;
  const pct = Math.min(100, (elapsed / limit) * 100);
  const rem = Math.max(0, step.durationSec - Math.floor(elapsed / 1000));
  return (
    <div className="mt-4 flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/5">
        <Icon className="h-5 w-5 text-gold-500" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span className="mono text-[10px] tracking-widest text-gold-500">
            {step.code}
          </span>
          <span className="mono text-[10px] text-ink-3">·</span>
          <span className="mono text-[10px] text-ink-3">{step.durationSec}s</span>
        </div>
        <h3 className="ar mt-1 text-2xl font-bold text-ink-1">{step.nameAr}</h3>
        <p className="ar mt-0.5 text-[13px] text-ink-2">{step.taglineAr}</p>
        <p className="mt-1 text-[11px] text-ink-3">{step.nameEn}</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-400 to-gold-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="mono num w-10 text-right text-[11px] text-gold-400">
            {rem}s
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Features
   ============================================================ */
function FeaturesCard({ step }: { step: JourneyStep }) {
  return (
    <div className="panel rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="mono text-[10px] tracking-widest text-ink-3">
          FEATURES · المزايا
        </span>
        <Sparkles className="h-3.5 w-3.5 text-ink-3" />
      </div>
      <div className="space-y-2">
        {step.features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 + i * 0.06 }}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-gold-500/15 text-gold-500">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <span className="ar text-[13px] text-ink-1">{f}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   AI Orchestration log
   ============================================================ */
function AIOrchestration({
  step,
  elapsed,
}: {
  step: JourneyStep;
  elapsed: number;
}) {
  const reveal = Math.min(
    step.aiActions.length,
    Math.floor(elapsed / ((step.durationSec * 1000) / step.aiActions.length)) + 1
  );
  return (
    <div className="panel rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-gold-500" />
          <span className="mono text-[10px] tracking-widest text-gold-500">
            AI ORCHESTRATION
          </span>
        </div>
        <span className="mono text-[10px] text-ink-3">
          {reveal} / {step.aiActions.length}
        </span>
      </div>
      <div className="space-y-1.5">
        {step.aiActions.map((a, i) => {
          const done = i < reveal - 1;
          const active = i === reveal - 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: i < reveal ? 1 : 0.25 }}
              className="flex items-center justify-between rounded-md border border-line bg-surface/40 px-2.5 py-1.5"
            >
              <div className="flex items-center gap-2">
                {done ? (
                  <Check className="h-3 w-3 text-sa-greenHi" strokeWidth={3} />
                ) : active ? (
                  <span className="h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
                ) : (
                  <span className="h-2 w-2 rounded-full border border-ink-4" />
                )}
                <span className="ar text-[12px] text-ink-1">{a.ar}</span>
              </div>
              {a.metric && (
                <span
                  className={`mono text-[10px] ${
                    done
                      ? "text-sa-greenHi"
                      : active
                      ? "text-gold-400"
                      : "text-ink-3"
                  }`}
                >
                  {a.metric}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   Outputs row
   ============================================================ */
function OutputsRow({ step }: { step: JourneyStep }) {
  const toneColor = (t?: string) => {
    switch (t) {
      case "green": return "#00C281";
      case "amber": return "#E8B339";
      case "red":   return "#E5526B";
      case "gold":
      default:      return "#D4B785";
    }
  };
  return (
    <div className="grid grid-cols-3 gap-2">
      {step.outputs.map((o, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.08 }}
          className="panel rounded-xl p-3"
        >
          <p className="ar text-[10px] text-ink-3">{o.label}</p>
          <p
            className="ar mt-1 text-base font-bold"
            style={{ color: toneColor(o.tone) }}
          >
            {o.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   Timeline
   ============================================================ */
function Timeline({
  idx,
  elapsed,
  goTo,
  onFinal,
}: {
  idx: number;
  elapsed: number;
  goTo: (i: number) => void;
  onFinal: boolean;
}) {
  return (
    <div className="panel rounded-2xl p-4">
      <div className="flex items-center gap-2">
        {JOURNEY_STEPS.map((s, i) => {
          const isCurrent = !onFinal && i === idx;
          const isPast = onFinal || i < idx;
          const segPct = isCurrent
            ? (elapsed / (s.durationSec * 1000)) * 100
            : isPast
            ? 100
            : 0;
          return (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="group relative flex-1 text-right"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <span
                  className="mono text-[9px] tracking-widest"
                  style={{
                    color: isCurrent || isPast ? HEX.gold : HEX.inkMuted,
                  }}
                >
                  {s.code}
                </span>
                <span className="mono text-[9px] text-ink-3">
                  {s.durationSec}s
                </span>
              </div>
              <div className="relative h-1 overflow-hidden rounded-full bg-surface">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${segPct}%`,
                    background:
                      "linear-gradient(90deg, #D4B785 0%, #C4A572 100%)",
                    boxShadow: isCurrent
                      ? "0 0 10px rgba(196,165,114,0.6)"
                      : undefined,
                    transition: "width 0.1s linear",
                  }}
                />
              </div>
              <p
                className={`ar mt-1.5 truncate text-[11px] ${
                  isCurrent || isPast ? "text-ink-1" : "text-ink-3"
                }`}
              >
                {s.nameAr}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   Professionals
   ============================================================ */
function Professionals() {
  return (
    <div className="panel flex items-center gap-3 rounded-2xl p-4">
      <div>
        <p className="mono text-[9px] tracking-widest text-ink-3">
          MANAGED BY
        </p>
        <p className="ar text-[12px] text-ink-1">٣ متخصصين فقط</p>
      </div>
      <div className="hidden h-9 w-px bg-line sm:block" />
      <div className="flex items-center -space-x-1.5">
        {JOURNEY_PROFESSIONALS.map((p) => (
          <div
            key={p.id}
            title={p.ar}
            className="ar flex h-8 w-8 items-center justify-center rounded-full border-2 border-base text-[12px] font-bold"
            style={{
              background: "rgba(196,165,114,0.18)",
              color: HEX.goldHi,
              boxShadow: "0 0 0 1px rgba(196,165,114,0.35)",
            }}
          >
            {p.initials}
          </div>
        ))}
      </div>
      <div className="hidden flex-col gap-0.5 px-2 lg:flex">
        {JOURNEY_PROFESSIONALS.map((p) => (
          <div key={p.id} className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-gold-500" />
            <span className="mono text-[9px] text-sa-greenHi">
              −{p.workloadReduction}%
            </span>
            <span className="ar text-[10px] text-ink-2">{p.ar}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function fmt(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}

/* ============================================================
   FINAL SCREEN
   ============================================================ */
function FinalScreen() {
  const engines = [
    { ar: "سـند للمراجعة", en: "AUDIT AI" },
    { ar: "PUDU للحضانة", en: "ROBOTICS" },
    { ar: "SOTI للأجهزة", en: "DEVICE GOV" },
    { ar: "المحرك القانوني", en: "LEGAL" },
    { ar: "محرك المخاطر", en: "RISK" },
    { ar: "المتابعة الذكية", en: "WATCH" },
  ];
  return (
    <div className="panel-strong relative h-full min-h-[520px] overflow-hidden rounded-2xl">
      <div className="pointer-events-none absolute inset-0 grid-soft opacity-40" />
      <div className="pointer-events-none absolute inset-0 radial-warm" />
      <div className="relative flex h-full flex-col items-center justify-center px-8 py-12 text-center">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 rounded-full border border-sa-green/40 bg-sa-green/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sa-greenHi animate-pulse" />
            <span className="mono text-[11px] tracking-widest text-sa-greenHi">
              CASE RESOLVED  ·  POLICY AMENDED  ·  LOOP CLOSED
            </span>
          </div>
          <h2 className="ar-serif mt-6 text-balance text-4xl font-bold text-ink-1 sm:text-5xl">
            تمت الحوكمة · أُغلقت الحلقة
          </h2>
          <p className="mt-3 mono text-[11px] tracking-widest text-ink-3">
            FROM SIGNAL TO GOVERNANCE  ·  IN 90 SECONDS
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          <KPI ar="سياسة عُدِّلت" value="م.٤" delta="مشتريات" tone="green" />
          <KPI ar="خسارة موقوفة" value="847,500 ﷼" delta="معاملة PO-23048" tone="gold" />
          <KPI ar="زمن الحوكمة" value="90s" delta="من ٦ أسابيع" tone="green" />
          <KPI ar="قرار بشري" value="١" delta="موقَّع" tone="gold" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {engines.map((e) => (
            <div
              key={e.en}
              className="flex items-center gap-2 rounded-md border border-line bg-surface/60 px-3 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sa-greenHi animate-pulse" />
              <span className="ar text-[12px] text-ink-1">{e.ar}</span>
              <span className="mono text-[9px] text-ink-3">{e.en}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3 rounded-full border border-gold-500/40 bg-gold-500/5 px-5 py-2">
            <ShieldCheck className="h-4 w-4 text-gold-500" />
            <span className="ar text-[13px] font-semibold text-gold-400">
              متوافق مع IIA 2500 (المتابعة) ورؤية ٢٠٣٠
            </span>
          </div>
          <p className="ar mt-3 text-center text-lg text-ink-1 sm:text-xl">
            من إشارة إلى حوكمة — خلال{" "}
            <span className="text-gold-400">٩٠ ثانية</span>
            <span className="ar text-ink-3"> · والمراجع هو الحَكَم.</span>
          </p>
          <p className="mono text-[10px] tracking-widest text-ink-3">
            POWERED BY  AI  ·  ROBOTICS  ·  GOVERNANCE INTELLIGENCE
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function KPI({
  ar,
  value,
  delta,
  tone,
}: {
  ar: string;
  value: string;
  delta: string;
  tone: "green" | "gold";
}) {
  const c = tone === "green" ? "#00C281" : "#D4B785";
  return (
    <div className="panel rounded-xl p-3 text-right">
      <p className="ar text-[10px] text-ink-3">{ar}</p>
      <p className="mono num mt-1 text-xl font-bold" style={{ color: c }}>
        {value}
      </p>
      <p className="ar mt-0.5 text-[10px] text-ink-3">{delta}</p>
    </div>
  );
}

/* ============================================================
   VISUALS — 6 per step, re-themed gold + navy
   ============================================================ */
export function Visual({ kind }: { kind: VisualKey }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line bg-elevated">
      <div className="absolute inset-0 grid-soft opacity-50" />
      <div className="absolute inset-0">
        {kind === "gap"      && <GapV />}
        {kind === "profile"  && <GovV />}
        {kind === "custody"  && <RobotV />}
        {kind === "devices"  && <DevicesV />}
        {kind === "decision" && <DecisionV />}
        {kind === "loop"     && <MonV />}
      </div>
      <Brackets />
    </div>
  );
}

function Brackets() {
  const c = "rgba(196,165,114,0.45)";
  return (
    <>
      <svg className="absolute left-2 top-2 h-4 w-4" viewBox="0 0 16 16">
        <path d="M0 6V0H6" fill="none" stroke={c} strokeWidth="1" />
      </svg>
      <svg className="absolute right-2 top-2 h-4 w-4" viewBox="0 0 16 16">
        <path d="M16 6V0H10" fill="none" stroke={c} strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-2 left-2 h-4 w-4" viewBox="0 0 16 16">
        <path d="M0 10V16H6" fill="none" stroke={c} strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-2 right-2 h-4 w-4" viewBox="0 0 16 16">
        <path d="M16 10V16H10" fill="none" stroke={c} strokeWidth="1" />
      </svg>
    </>
  );
}

/* STEP 1 — Legacy: kept for reference (replaced by GapV). */
function RegV() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="panel-strong relative overflow-hidden rounded-2xl p-5 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="text-right">
              <p className="mono text-[10px] tracking-wider text-ink-3">
                ROYAL COMMISSION · KSA
              </p>
              <p className="ar mt-1 text-[12px] text-ink-2">السجل التجاري</p>
              <p className="mono num mt-1 text-xl font-semibold text-ink-1">
                1010234567
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 ring-1 ring-gold-500/40">
              <Building2 className="h-5 w-5 text-gold-500" />
            </div>
          </div>
          <div className="my-4 h-px bg-line" />
          <div className="grid grid-cols-2 gap-3 text-right text-[11px]">
            <Field labelAr="القطاع" valueAr="حكومي / مراجعة" />
            <Field labelAr="الحالة" valueAr="ساري" green />
            <Field labelAr="الموظفون" valueAr="1,287" />
            <Field labelAr="التأسيس" valueAr="2019" />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-sa-green/30 bg-sa-green/5 p-2.5">
            <div className="flex items-center gap-2">
              <Fingerprint className="h-4 w-4 text-sa-greenHi" />
              <span className="ar text-[12px] text-ink-1">موثّق عبر نفاذ</span>
            </div>
            <span className="mono text-[10px] text-sa-greenHi">✓ VERIFIED</span>
          </div>
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"
            initial={{ top: 0 }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px]">
          <span className="mono text-ink-3">NAFATH_ID · 02·48·1A</span>
          <span className="mono text-sa-greenHi">RESPONSE 0.42s</span>
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  labelAr,
  valueAr,
  green,
}: {
  labelAr: string;
  valueAr: string;
  green?: boolean;
}) {
  return (
    <div>
      <p className="ar text-[10px] text-ink-3">{labelAr}</p>
      <p
        className={`ar mt-0.5 text-[12px] font-medium ${
          green ? "text-sa-greenHi" : "text-ink-1"
        }`}
      >
        {valueAr}
      </p>
    </div>
  );
}

/* STEP 2 — Radar */
function GovV() {
  const dims = ["الحوكمة","المخاطر","الامتثال","المراجعة","الإفصاح","التحكم"];
  const scores = [82, 65, 70, 58, 76, 68];
  const cx = 50, cy = 50, R = 38;
  const points = scores.map((s, i) => {
    const a = (Math.PI * 2 * i) / dims.length - Math.PI / 2;
    const r = (R * s) / 100;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const path = points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ") + " Z";
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full max-h-[420px] w-full max-w-[420px]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {[0.25,0.5,0.75,1].map(f => (
          <circle key={f} cx={cx} cy={cy} r={R*f} fill="none" stroke="rgba(245,242,235,0.08)" strokeWidth="0.2" />
        ))}
        {dims.map((_, i) => {
          const a = (Math.PI * 2 * i) / dims.length - Math.PI / 2;
          return (
            <line key={i} x1={cx} y1={cy} x2={cx + R*Math.cos(a)} y2={cy + R*Math.sin(a)}
              stroke="rgba(245,242,235,0.08)" strokeWidth="0.2" />
          );
        })}
        <motion.path
          d={path}
          fill={HEX.gold + "26"}
          stroke={HEX.gold}
          strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4 }}
        />
        {points.map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="1.1" fill={HEX.gold}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i*0.08 }} />
        ))}
        <motion.line
          x1={cx} y1={cy} x2={cx+R} y2={cy}
          stroke={HEX.goldHi} strokeWidth="0.4" strokeOpacity="0.7"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {dims.map((d, i) => {
          const a = (Math.PI * 2 * i) / dims.length - Math.PI / 2;
          const lx = cx + (R+8)*Math.cos(a);
          const ly = cy + (R+8)*Math.sin(a);
          return <text key={d} x={lx} y={ly} textAnchor="middle" alignmentBaseline="middle"
            fontSize="3.2" fontFamily="IBM Plex Sans Arabic" fill="#C7CCD6">{d}</text>;
        })}
        <text x={cx} y={cy-1} textAnchor="middle" fontSize="9" fontWeight="700" fill="#F5F2EB" fontFamily="Inter">72</text>
        <text x={cx} y={cy+4} textAnchor="middle" fontSize="2.6" fill="#7C8598" fontFamily="Inter">/ 100</text>
      </motion.svg>
    </div>
  );
}

/* STEP 3 — Contract scan */
function LegalV() {
  const flags = [
    { y: 32, type: "MISSING", text: "بند السرية ناقص", c: HEX.red },
    { y: 52, type: "FLAG",    text: "صياغة عامة",      c: HEX.amber },
    { y: 86, type: "OK",      text: "بنود الإنهاء سليمة", c: HEX.green },
    { y: 108, type: "MISSING", text: "توقيع غير موثّق", c: HEX.red },
  ];
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="panel-strong relative overflow-hidden rounded-xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="mono text-[10px] text-gold-500">SCANNING…</span>
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] text-ink-2">CONTRACT_247.pdf</span>
              <FileSearch className="h-4 w-4 text-gold-500" />
            </div>
          </div>
          <div className="relative space-y-1.5">
            {Array.from({length:14}).map((_, i) => (
              <div key={i} className="h-[6px] rounded-sm bg-ink-3/20"
                style={{ width: `${60 + Math.sin(i*1.7)*30}%` }} />
            ))}
            <div className="absolute left-0 right-0 top-[28px] h-[8px] rounded ring-1" style={{ background: HEX.red+"33", borderColor: HEX.red }} />
            <div className="absolute left-0 right-0 top-[48px] h-[8px] rounded ring-1" style={{ background: HEX.amber+"26" }} />
            <div className="absolute left-0 right-0 top-[82px] h-[8px] rounded ring-1" style={{ background: HEX.green+"26" }} />
            <div className="absolute left-0 right-0 top-[104px] h-[8px] rounded ring-1" style={{ background: HEX.red+"33" }} />
          </div>
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"
            initial={{ top: 0 }} animate={{ top: ["0%","100%","0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div className="mt-3 space-y-1.5">
          {flags.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i*0.15 }}
              className="flex items-center justify-between rounded border border-line bg-surface/40 px-2.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: f.c }} />
              <div className="flex flex-1 items-center justify-end gap-2">
                <span className="ar text-[11px] text-ink-1">{f.text}</span>
                <span className="mono text-[9px] font-semibold" style={{ color: f.c }}>{f.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* STEP 4 — Heatmap */
function FinV() {
  const cols = 14, rows = 9;
  const cells = Array.from({length: cols*rows}).map((_, i) => {
    const seed = (i*9301 + 49297) % 233280;
    return seed / 233280;
  });
  const anomalies = new Set([12, 38, 41, 67, 89, 102]);
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="mono text-[10px] text-gold-500">▲ 23 ANOMALIES</span>
          <span className="mono text-[10px] text-ink-3">TRANSACTIONS · 90D</span>
        </div>
        <div className="grid gap-1 rounded-xl border border-line bg-surface/40 p-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {cells.map((v, i) => {
            const isAn = anomalies.has(i);
            const heat = isAn ? HEX.red + "DD"
                       : v > 0.7 ? HEX.green + "73"
                       : v > 0.4 ? HEX.gold  + "55"
                       : "rgba(245,242,235,0.06)";
            return (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i / (cols*rows)) * 0.8, duration: 0.18 }}
                className="aspect-square rounded-[3px]"
                style={{ background: heat, boxShadow: isAn ? `0 0 8px ${HEX.red}99` : undefined }} />
            );
          })}
        </div>
        <div className="mt-3 space-y-1.5">
          {[
            { ar: "عقد > 50K بدون موافقة", c: HEX.red, level: "HIGH" },
            { ar: "تكرار دفعات لمورّد واحد", c: HEX.amber, level: "MED" },
            { ar: "تأخير اعتماد > 7 أيام", c: HEX.green, level: "LOW" },
          ].map((a, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i*0.15 }}
              className="flex items-center justify-between rounded border border-line bg-surface/40 px-2.5 py-1.5"
            >
              <span className="mono text-[9px] font-semibold" style={{ color: a.c }}>{a.level}</span>
              <span className="ar text-[11px] text-ink-1">{a.ar}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* STEP 5 — Floor plan + robot */
function RobotV() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <motion.svg viewBox="0 0 400 280" className="h-full max-h-[400px] w-full"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <rect x="12" y="12" width="376" height="256" fill="none" stroke="rgba(245,242,235,0.15)" strokeWidth="1.2" rx="6" />
        <g stroke="rgba(245,242,235,0.1)" strokeWidth="1" fill="none">
          <line x1="140" y1="12" x2="140" y2="120" />
          <line x1="140" y1="120" x2="260" y2="120" />
          <line x1="260" y1="12" x2="260" y2="120" />
          <line x1="12" y1="170" x2="200" y2="170" />
          <line x1="200" y1="170" x2="200" y2="268" />
          <line x1="280" y1="170" x2="388" y2="170" />
        </g>
        <Room x={76}  y={70}  ar="القانوني" />
        <Room x={200} y={70}  ar="التنفيذي" />
        <Room x={324} y={70}  ar="المراجعة" />
        <Room x={106} y={220} ar="المالية" />
        <Room x={240} y={220} ar="المصعد" />
        <Room x={334} y={220} ar="الموارد" />
        {[{x:80,y:116,id:"L1"},{x:200,y:116,id:"L2"},{x:200,y:166,id:"L3"},{x:80,y:166,id:"L4"}].map(l => (
          <g key={l.id}>
            <rect x={l.x-5} y={l.y-5} width="10" height="10" fill={HEX.gold + "33"} stroke={HEX.gold} strokeWidth="0.8" />
            <text x={l.x} y={l.y+2} textAnchor="middle" fontSize="6" fontFamily="JetBrains Mono" fill={HEX.gold}>{l.id}</text>
          </g>
        ))}
        <motion.path
          d="M 30 240 L 30 180 L 80 180 L 80 116 L 200 116 L 200 50 L 320 50"
          fill="none" stroke={HEX.gold} strokeWidth="2" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <motion.g
          style={{ offsetPath: "path('M 30 240 L 30 180 L 80 180 L 80 116 L 200 116 L 200 50 L 320 50')" }}
          animate={{ offsetDistance: ["0%","100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <circle r="6" fill={HEX.goldHi} style={{ filter: `drop-shadow(0 0 6px ${HEX.gold})` }} />
          <circle r="10" fill="none" stroke={HEX.goldHi} strokeOpacity="0.4" strokeWidth="0.6" />
          <text y="-10" textAnchor="middle" fontSize="6" fontFamily="JetBrains Mono" fill={HEX.goldHi} fontWeight="600">PUDU</text>
        </motion.g>
      </motion.svg>
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
        <Bot className="h-4 w-4 text-gold-500" />
        <span className="mono text-[10px] text-ink-2">CHAIN OF CUSTODY · LIVE</span>
      </div>
    </div>
  );
}

function Room({ x, y, ar }: { x: number; y: number; ar: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="6.5" fontFamily="IBM Plex Sans Arabic" fill="#7C8598">{ar}</text>
  );
}

/* STEP 6 — Neural network */
function MonV() {
  const layers = [4, 6, 6, 3];
  const W = 400, H = 240;
  const margin = 30;
  const colX = layers.map((_, i) => margin + ((W - margin*2) * i) / (layers.length-1));
  const nodes = layers.flatMap((cnt, li) => {
    const colH = H - margin*2;
    const step = colH / (cnt + 1);
    return Array.from({length: cnt}).map((_, ni) => ({ x: colX[li], y: margin + step*(ni+1), l: li }));
  });
  const edges: {x1:number;y1:number;x2:number;y2:number}[] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    const a = nodes.filter(n => n.l === li);
    const b = nodes.filter(n => n.l === li + 1);
    a.forEach(na => b.forEach(nb => edges.push({ x1: na.x, y1: na.y, x2: nb.x, y2: nb.y })));
  }
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <motion.svg viewBox={`0 0 ${W} ${H}`} className="h-full max-h-[420px] w-full"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {edges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke={HEX.gold} strokeOpacity={0.12 + (i%5)*0.03} strokeWidth="0.5" />
        ))}
        {edges.filter((_, i) => i % 11 === 0).map((e, i) => (
          <motion.line key={`f${i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke={HEX.goldHi} strokeWidth="1.2"
            strokeDasharray="4 6"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            strokeOpacity="0.7" />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="6" fill="#0F1A2E" stroke={HEX.gold} strokeWidth="1" />
            <motion.circle cx={n.x} cy={n.y} r="3" fill={HEX.goldHi}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: (i*0.12) % 1.4 }} />
          </g>
        ))}
        {[{x: colX[0], l: "POLICY"},{x: colX[1], l: "AMEND"},{x: colX[2], l: "WATCH"},{x: colX[3], l: "ENGAGE"}]
          .map(l => (
            <text key={l.l} x={l.x} y={H-10} textAnchor="middle" fontSize="6.5"
              fontFamily="JetBrains Mono" fill="#7C8598">{l.l}</text>
          ))}
      </motion.svg>
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
        <Network className="h-4 w-4 text-gold-500" />
        <span className="mono text-[10px] text-gold-500">المتابعة الذكية · مفعَّلة</span>
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 w-56 space-y-1.5">
        {[
          { ar: "تحديث المادة ٤", c: HEX.green },
          { ar: "إشعار ١٢ مدير", c: HEX.gold },
          { ar: "ملخص تنفيذي · ٠٦:٠٠", c: HEX.green },
        ].map((t, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i*0.2 }}
            className="flex items-center gap-2 rounded border border-line bg-surface/80 px-2 py-1 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: t.c }} />
            <span className="ar text-[10px] text-ink-1">{t.ar}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   BEAT 1 — Governance Gap (NEW)
   Split-view: policy clause with missing rule (top)
   + transaction that exploited it (bottom)
   ============================================================ */
function GapV() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="w-full max-w-xl space-y-3"
      >
        {/* Top: policy doc with the missing clause highlighted */}
        <div className="panel-strong relative overflow-hidden rounded-xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="mono text-[10px] text-gold-500">SANAD · POLICY READER</span>
            <span className="ar text-[11px] text-ink-2">سياسة المشتريات · المادة ٤</span>
          </div>
          <div className="relative space-y-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-[6px] rounded-sm bg-ink-3/20"
                style={{ width: `${55 + Math.sin(i * 1.3) * 30}%` }} />
            ))}
            <motion.div
              className="absolute left-0 right-0 top-[38px] flex items-center gap-2 rounded ring-1"
              style={{ background: HEX.red + "22", borderColor: HEX.red }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex-1 h-[8px]" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-3 flex items-center justify-between rounded border border-sig-high/40 bg-sig-high/5 px-2.5 py-1.5"
          >
            <span className="mono text-[10px] text-sig-high">MISSING</span>
            <span className="ar text-[11px] text-ink-1">حالات الطوارئ — بلا سقف مالي ولا موافقة لاحقة</span>
          </motion.div>
        </div>

        {/* Causal arrow */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="mono text-[10px] tracking-widest text-gold-500">استُغلَّت في معاملة</span>
          <span className="text-gold-500">↓</span>
        </motion.div>

        {/* Bottom: the matching financial transaction */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
          className="panel-strong relative overflow-hidden rounded-xl p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="mono text-[10px] text-gold-500">FINANCE · LIVE STREAM</span>
            <span className="mono text-[10px] text-sig-high">▲ FLAGGED</span>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div>
              <p className="ar text-[10px] text-ink-3">رقم أمر الشراء</p>
              <p className="mono text-[15px] font-bold text-ink-1">PO-23048</p>
              <p className="ar mt-2 text-[10px] text-ink-3">المورّد</p>
              <p className="ar text-[13px] text-ink-1">مؤسسة الجوف للتوريد</p>
            </div>
            <div className="text-left">
              <p className="ar text-[10px] text-ink-3">القيمة</p>
              <p className="mono text-2xl font-bold text-sig-high">847,500 ﷼</p>
              <p className="mono mt-2 text-[10px] text-sig-high">تجاوز · م.٤</p>
            </div>
          </div>
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-sig-high to-transparent"
            initial={{ top: 0 }} animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute right-3 top-3 chip">
        <span className="h-1.5 w-1.5 rounded-full bg-sig-high blink" />
        <span className="ar text-[10px]">قضية AUD-2026-118</span>
      </div>
    </div>
  );
}

/* ============================================================
   BEAT 4 — SOTI Device Fleet Integrity (NEW)
   ============================================================ */
function DevicesV() {
  // 4×4 grid = 16 devices. Status distribution: 14 ok, 1 warn, 1 quarantined.
  const states: Array<"ok" | "warn" | "quar"> = [
    "ok","ok","ok","ok",
    "ok","ok","warn","ok",
    "ok","ok","ok","ok",
    "quar","ok","ok","ok",
  ];
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="w-full max-w-lg"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="mono text-[10px] text-gold-500">SOTI · FLEET INTEGRITY</span>
          <span className="ar text-[11px] text-ink-2">١٦ جهاز معني بالقضية</span>
        </div>
        <div className="panel-strong rounded-xl p-3">
          <div className="grid grid-cols-4 gap-2.5">
            {states.map((s, i) => {
              const color = s === "ok" ? HEX.green : s === "warn" ? HEX.amber : HEX.red;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  className="relative aspect-square rounded-lg border bg-surface/60 p-2"
                  style={{
                    borderColor: color + "55",
                    boxShadow: s !== "ok" ? `0 0 14px ${color}55` : undefined,
                  }}
                >
                  <DeviceIcon type={i % 4} color={color} />
                  <span
                    className="absolute right-1 top-1 h-2 w-2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                  />
                  <p className="mono mt-1 text-[8px] text-ink-3">DV-{(i+1).toString().padStart(3,'0')}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm" style={{background:HEX.green}}/><span className="ar text-ink-2">متوافق · ١٤</span></span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm" style={{background:HEX.amber}}/><span className="ar text-ink-2">تنبيه · ١</span></span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm" style={{background:HEX.red}}/><span className="ar text-ink-2">معزول · ١</span></span>
        </div>
      </motion.div>
    </div>
  );
}

function DeviceIcon({ type, color }: { type: number; color: string }) {
  // 4 abstract device silhouettes via simple SVG
  const stroke = color;
  if (type === 0) {
    // laptop
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <rect x="3" y="5" width="18" height="11" rx="1" stroke={stroke} strokeWidth="1.4"/>
        <path d="M1 18h22" stroke={stroke} strokeWidth="1.4"/>
      </svg>
    );
  }
  if (type === 1) {
    // tablet
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <rect x="5" y="3" width="14" height="18" rx="2" stroke={stroke} strokeWidth="1.4"/>
        <circle cx="12" cy="18" r="0.8" fill={stroke}/>
      </svg>
    );
  }
  if (type === 2) {
    // desktop
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <rect x="3" y="4" width="18" height="13" rx="1" stroke={stroke} strokeWidth="1.4"/>
        <path d="M9 21h6M12 17v4" stroke={stroke} strokeWidth="1.4"/>
      </svg>
    );
  }
  // kiosk
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="1" stroke={stroke} strokeWidth="1.4"/>
      <rect x="8" y="5" width="8" height="9" stroke={stroke} strokeWidth="1.2"/>
      <circle cx="12" cy="18" r="0.8" fill={stroke}/>
    </svg>
  );
}

/* ============================================================
   BEAT 5 — Human Auditor Decides (NEW)
   The climax: evidence cards converge to a human silhouette,
   approval button pulses, sign-off is recorded.
   ============================================================ */
function DecisionV() {
  const cards = [
    { ar: "فجوة م.٤", k: "POLICY" },
    { ar: "PO-23048", k: "FINANCE" },
    { ar: "Chain Hash", k: "CUSTODY" },
  ];
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <div className="relative w-full max-w-xl">
        {/* Center silhouette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="mx-auto flex w-fit flex-col items-center"
        >
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-500/50 bg-gold-500/8">
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
                <circle cx="12" cy="8" r="3.6" stroke={HEX.goldHi} strokeWidth="1.6"/>
                <path d="M5 21c1-4 4-6 7-6s6 2 7 6" stroke={HEX.goldHi} strokeWidth="1.6"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-sa-green ring-2 ring-base">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="white" strokeWidth="3">
                <path d="M5 12l4 4 10-10"/>
              </svg>
            </div>
          </div>
          <p className="ar mt-2 text-[13px] font-bold text-ink-1">المراجع الداخلي</p>
          <p className="mono text-[10px] tracking-wider text-ink-3">HUMAN · IN COMMAND</p>
        </motion.div>

        {/* Evidence cards converging */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {cards.map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.18 }}
              className="panel rounded-lg p-2.5 text-center"
            >
              <p className="mono text-[8px] tracking-widest text-gold-500">{c.k}</p>
              <p className="ar mt-1 text-[12px] font-semibold text-ink-1">{c.ar}</p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.4 + i * 0.18, duration: 0.4 }}
                className="mt-2 h-0.5 origin-right bg-sa-green"
              />
            </motion.div>
          ))}
        </div>

        {/* Approval button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className="mt-5 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-xl bg-gold-500/30 blur-md"
            />
            <button
              type="button"
              className="relative rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-6 py-3 mono text-[13px] font-bold text-navy-900"
            >
              <span className="ar font-bold">اعتماد</span>
              <span className="mx-2 text-navy-900/50">·</span>
              <span className="mono text-[11px]">APPROVE</span>
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}
          className="ar mt-3 text-center text-[11px] text-ink-3"
        >
          لا تُغلَق القضية بدون توقيع المراجع — AI يساعد، الإنسان يحكم.
        </motion.p>
      </div>
    </div>
  );
}

// Reference legacy visuals so noUnusedLocals doesn't flag them.
// Kept in source for archive purposes per the archive-first rule.
void [RegV, LegalV, FinV];
