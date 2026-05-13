import { motion } from "framer-motion";
import { Bot, PackageCheck, Smartphone, MoveUpRight, Zap } from "lucide-react";

const zones = [
  {
    id: 1,
    title: "اكتشف",
    subtitle: "DISCOVER",
    description: "روبوت G1 يستقبلك بلهجة نجدية أصيلة ويرشدك عبر الرحلة.",
    icon: <Bot className="h-8 w-8 text-sa-gold-500" />,
    color: "rgba(196, 165, 114, 0.1)",
    accent: "#C4A572",
    pos: "top-10 left-10",
    delay: 0.1
  },
  {
    id: 2,
    title: "تحقّق",
    subtitle: "VERIFY",
    description: "FlashBot يضمن تسلسل عهدة الوثائق المادية بين الخزائن الذكية.",
    icon: <PackageCheck className="h-8 w-8 text-sa-gold-400" />,
    color: "rgba(196, 165, 114, 0.15)",
    accent: "#D4B785",
    pos: "top-40 right-10",
    delay: 0.2
  },
  {
    id: 3,
    title: "قرّر",
    subtitle: "DECIDE",
    description: "نظام 'سند' يحلل البيانات ويترك القرار النهائي للمراجع البشري.",
    icon: <Smartphone className="h-8 w-8 text-sa-gold-300" />,
    color: "rgba(196, 165, 114, 0.2)",
    accent: "#FBF9F4",
    pos: "bottom-10 left-1/4",
    delay: 0.3
  }
];

export function BoothMockup() {
  return (
    <section className="relative overflow-hidden bg-ink-1 py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-sa-gold-500/20 bg-sa-gold-500/5 px-4 py-1.5 mb-6"
          >
            <Zap className="h-3.5 w-3.5 text-sa-gold-500" />
            <span className="mono text-[10px] uppercase tracking-widest text-sa-gold-500">The 3-Zone Architecture</span>
          </motion.div>
          
          <h2 className="ar text-4xl font-bold text-ink-6 lg:text-5xl">تصميم منصة راصد</h2>
          <p className="mt-4 text-ink-3 max-w-2xl mx-auto">
            رحلة تفاعلية من ٣ محطات تجسد الحوكمة الذكية: من الإشارة (G1) إلى العهدة (PUDU) وصولاً إلى القرار (سند).
          </p>
        </div>

        <div className="relative mx-auto max-w-[1000px] h-[600px] [perspective:2000px]">
          {/* Base Floor */}
          <div className="absolute inset-0 bg-ink-2/30 rounded-[60px] border border-line/20 [transform:rotateX(60deg)_rotateZ(-10deg)] shadow-2xl overflow-hidden">
             <div className="absolute inset-0 grid-soft opacity-20" />
             <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-sa-gold-500/50 to-transparent" />
          </div>

          {/* Zones */}
          {zones.map((zone) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: zone.delay, duration: 0.8 }}
              viewport={{ once: true }}
              className={`absolute ${zone.pos} z-10 w-64 p-6 rounded-2xl border border-sa-gold-500/10 bg-base/80 backdrop-blur-xl shadow-xl hover:border-sa-gold-500/30 transition-colors group`}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-ink-1/50 border border-line/50 group-hover:scale-110 transition-transform">
                {zone.icon}
              </div>
              
              <div className="flex items-center justify-between mb-1">
                <span className="mono text-[10px] text-sa-gold-500/60 font-medium">{zone.subtitle}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-sa-gold-500" />
              </div>
              
              <h3 className="ar text-xl font-bold text-ink-6 mb-3">{zone.title}</h3>
              <p className="ar text-xs leading-relaxed text-ink-3">{zone.description}</p>
              
              <div className="mt-6 flex items-center gap-2 text-sa-gold-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="mono text-[9px] uppercase tracking-tighter">Explore Zone</span>
                <MoveUpRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}

          {/* Connectors (Simulated data paths) */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full [transform:rotateX(60deg)_rotateZ(-10deg)]" viewBox="0 0 1000 600">
            <motion.path
              d="M 200,100 Q 500,300 800,200"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="2"
              strokeDasharray="10 20"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C4A572" stopOpacity="0" />
                <stop offset="50%" stopColor="#C4A572" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#C4A572" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
