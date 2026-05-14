import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Cpu, RotateCcw, ArrowLeft } from "lucide-react";
import { JOURNEY_STEPS } from "./data";
import { Visual } from "./journey";

/* ============================================================
   Per-beat interactive prompt + CTA + result copy
   ============================================================ */
const PROMPTS = [
  {
    instructAr: "أنت المراجع الداخلي. سـند جاهز لفحص سياسة المشتريات.",
    ctaAr: "شغّل سـند",
    resultAr: "كشف فجوة في المادة ٤ — معاملة PO-23048 استغلّتها (847,500 ﷼).",
  },
  {
    instructAr: "نقيس شدّة الفجوة والتعرّض التنظيمي.",
    ctaAr: "احسب درجة المخاطر",
    resultAr: "درجة المخاطر 78/100 — مستوى عالٍ، صُعِّدت لمدير المراجعة.",
  },
  {
    instructAr: "PUDU FlashBot يحمل الملف الموقّع بين الإدارات.",
    ctaAr: "فعّل سلسلة الحضانة",
    resultAr: "الملف انتقل بأمان — Hash 0x8F2A…E1C موثّق في السجل.",
  },
  {
    instructAr: "SOTI يتحقّق من سلامة كل جهاز شارك في القضية.",
    ctaAr: "افحص أسطول الأجهزة",
    resultAr: "١٤ متوافق · ١ تنبيه · ١ معزول احتياطياً — لا اختراق.",
  },
  {
    instructAr: "كل الأدلة معك. أنت من يقرّر. اضغط للاعتماد.",
    ctaAr: "اعتماد",
    resultAr: "اعتُمدت التوصية وتم توقيعها رقمياً في السجل التنفيذي.",
  },
  {
    instructAr: "السياسة تُحدَّث تلقائياً، والمتابعة الذكية مستمرة.",
    ctaAr: "أغلق القضية",
    resultAr: "القضية AUD-2026-118 مغلقة · المادة ٤ معدّلة · ١٢ مدير أُبلغوا.",
  },
];

type Phase = "prompt" | "running" | "result";

export function JourneyExperience({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("prompt");

  // Reset internal state when re-opened
  useEffect(() => {
    if (open) {
      setIdx(0);
      setPhase("prompt");
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const isFinal = idx >= JOURNEY_STEPS.length;
  const step = !isFinal ? JOURNEY_STEPS[idx] : null;
  const prompt = !isFinal ? PROMPTS[idx] : null;

  const startStep = () => {
    setPhase("running");
    window.setTimeout(() => setPhase("result"), 2200);
  };

  const next = () => {
    setIdx((i) => i + 1);
    setPhase("prompt");
  };

  const restart = () => {
    setIdx(0);
    setPhase("prompt");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-base/95 p-6 backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute inset-0 grid-soft opacity-30" />
          <div className="pointer-events-none absolute inset-0 radial-warm" />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-ink-2 transition hover:bg-surface"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Progress dots */}
          <div className="absolute left-1/2 top-7 z-10 flex -translate-x-1/2 items-center gap-2">
            {JOURNEY_STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isFinal || i < idx
                    ? "w-6 bg-gold-500"
                    : i === idx
                    ? "w-10 bg-gold-500 glow-gold"
                    : "w-4 bg-line"
                }`}
              />
            ))}
            <span className="ar mr-3 text-[11px] text-ink-3">
              {isFinal ? "اكتمل" : `${idx + 1} / ${JOURNEY_STEPS.length}`}
            </span>
          </div>

          {/* Stage */}
          <div className="relative w-full max-w-5xl">
            <AnimatePresence mode="wait">
              {isFinal ? (
                <FinalSuccess
                  key="final"
                  onRestart={restart}
                  onClose={onClose}
                />
              ) : (
                <BeatStage
                  key={`b-${idx}-${phase}`}
                  idx={idx}
                  step={step!}
                  prompt={prompt!}
                  phase={phase}
                  onStart={startStep}
                  onNext={next}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   BeatStage — left: visual, right: prompt panel
   ============================================================ */
function BeatStage({
  idx,
  step,
  prompt,
  phase,
  onStart,
  onNext,
}: {
  idx: number;
  step: (typeof JOURNEY_STEPS)[number];
  prompt: (typeof PROMPTS)[number];
  phase: Phase;
  onStart: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]"
    >
      {/* LEFT — Visual area */}
      <div className="relative aspect-[4/3] w-full">
        {phase === "prompt" ? (
          <div className="grid h-full place-items-center rounded-2xl border border-line bg-elevated/60">
            <div className="text-center">
              <Sparkles className="mx-auto h-14 w-14 text-gold-500/40" strokeWidth={1.2} />
              <p className="ar mt-4 text-[12px] text-ink-3">
                اضغط الزرّ لبدء هذه الخطوة
              </p>
            </div>
          </div>
        ) : (
          <Visual kind={step.visual} />
        )}
      </div>

      {/* RIGHT — Interaction panel */}
      <div className="panel-strong relative flex flex-col rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <span className="mono text-[10px] tracking-[0.25em] text-gold-500">
            خطوة {idx + 1} من {JOURNEY_STEPS.length}
          </span>
          <span className="mono text-[10px] text-ink-3">~ {step.durationSec}s</span>
        </div>

        <h2 className="ar-serif mt-4 text-3xl font-bold leading-tight text-ink-1">
          {step.nameAr}
        </h2>
        <p className="mt-1 text-[12px] text-ink-3">{step.nameEn}</p>

        <p className="ar mt-5 text-balance text-[15px] leading-relaxed text-ink-2">
          {prompt.instructAr}
        </p>

        {/* Conditional content per phase */}
        <div className="mt-auto pt-6">
          {phase === "prompt" && (
            <button
              type="button"
              onClick={onStart}
              className="btn-primary w-full justify-center text-base"
            >
              <Sparkles className="h-4 w-4" />
              <span className="ar font-bold">{prompt.ctaAr}</span>
            </button>
          )}

          {phase === "running" && (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-gold-500/30 bg-gold-500/5 px-4 py-4">
              <Cpu className="h-4 w-4 animate-spin text-gold-500" />
              <span className="ar shimmer-text text-[14px] font-semibold">
                جاري التنفيذ...
              </span>
            </div>
          )}

          {phase === "result" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-start gap-3 rounded-xl border border-sa-green/30 bg-sa-green/5 px-4 py-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sa-greenHi" strokeWidth={3} />
                <p className="ar text-[14px] leading-relaxed text-ink-1">
                  {prompt.resultAr}
                </p>
              </motion.div>
              <motion.button
                type="button"
                onClick={onNext}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="btn-primary mt-4 w-full justify-center"
              >
                <span className="ar font-bold">
                  {idx === JOURNEY_STEPS.length - 1 ? "إنهاء التجربة" : "الخطوة التالية"}
                </span>
                <ArrowLeft className="h-4 w-4" />
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   FinalSuccess — case resolved screen
   ============================================================ */
function FinalSuccess({
  onRestart,
  onClose,
}: {
  onRestart: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="panel-strong relative mx-auto max-w-3xl overflow-hidden rounded-2xl px-10 py-14 text-center"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-sa-green/10 blur-3xl" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sa-green/15 ring-2 ring-sa-green/50"
      >
        <Check className="h-10 w-10 text-sa-greenHi" strokeWidth={3} />
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-sa-green/40 bg-sa-green/5 px-4 py-1.5 mx-auto w-fit">
        <span className="h-1.5 w-1.5 rounded-full bg-sa-greenHi animate-pulse" />
        <span className="mono text-[11px] tracking-widest text-sa-greenHi">
          CASE RESOLVED  ·  POLICY AMENDED
        </span>
      </div>

      <h2 className="ar-serif mt-5 text-4xl font-bold text-ink-1 sm:text-5xl">
        أحسنت — تمت الحوكمة
      </h2>
      <p className="ar mt-4 text-[15px] text-ink-2">
        أنت — كمراجع داخلي — أتممت دورة حياة قضية كاملة. الذكاء اكتشف، الروبوت نقل،
        الأجهزة تأكّدت، وأنت قرّرت. كل ذلك في <span className="text-gold-400">٩٠ ثانية</span>.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KPI label="سياسة معدّلة" value="م.٤" />
        <KPI label="خسارة موقوفة" value="847K ﷼" />
        <KPI label="زمن الحوكمة" value="٩٠ث" />
        <KPI label="القرار البشري" value="موقَّع ✓" />
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 rounded-xl border border-line bg-surface/60 px-5 py-3 text-[14px] font-semibold text-ink-1 transition hover:bg-surface"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="ar">جرّب قضية أخرى</span>
        </button>
        <button onClick={onClose} className="btn-primary">
          <span className="ar font-bold">العودة إلى الرئيسية</span>
        </button>
      </div>

      <p className="mono mt-6 text-[10px] tracking-widest text-ink-3">
        POWERED BY  AI  ·  ROBOTICS  ·  GOVERNANCE INTELLIGENCE
      </p>
    </motion.div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface/40 px-3 py-3">
      <p className="ar text-[11px] text-ink-3">{label}</p>
      <p className="mono mt-1 text-xl font-bold text-gold-400">{value}</p>
    </div>
  );
}
