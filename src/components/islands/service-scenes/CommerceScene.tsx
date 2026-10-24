import { useId } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { SceneFrame } from "./SceneFrame";
import { CountUp, usNumber } from "./CountUp";
import { EASE, appear, type SceneProps } from "./scene-kit";

const TOASTS = ["Order #10421 · $129", "#10422 · $129", "#10423 · $129"];

const SPARK_PATH =
  "M0,68 L55,66 C70,66 78,60 92,44 C106,28 116,20 138,18 C168,15 198,22 228,16 C258,10 278,18 300,12";
const SPARK_AREA = `${SPARK_PATH} L300,80 L0,80 Z`;

/* Storyboard §3.3 — Launch-day traffic spike (6s loop). */
export function CommerceScene({ reduced, compact, fade }: SceneProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <SceneFrame title="alchemy — storefront" compact={compact} fade={fade}>
      <div className="flex h-full gap-4 p-4">
        {/* product card (hidden on mobile) */}
        {!compact && (
          <div className="flex w-[38%] shrink-0 flex-col gap-2.5">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500/70 to-amber-400/70">
              <div
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl"
                aria-hidden="true"
              />
              <span className="absolute left-2 top-2 rounded-full border border-amber-300/50 bg-black/50 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider text-amber-300">
                Limited Drop
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-zinc-100">
                Drop 01
              </span>
              <span className="font-display text-lg font-bold text-zinc-100">
                $129
              </span>
            </div>
            <motion.button
              type="button"
              tabIndex={-1}
              initial={reduced ? false : { scale: 1 }}
              animate={reduced ? undefined : { scale: [1, 0.95, 1] }}
              transition={
                reduced ? undefined : { delay: 1.4, duration: 0.35, ease: EASE }
              }
              className="w-full rounded-lg bg-violet-500 py-2 text-xs font-semibold text-white"
            >
              Add to cart
            </motion.button>
          </div>
        )}

        {/* traffic + revenue column */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex shrink-0 items-start justify-between gap-2">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Visitors / min
              </div>
              <CountUp
                from={1200}
                to={48000}
                delay={1.0}
                duration={1.5}
                reduced={reduced}
                format={usNumber}
                className="font-display text-2xl font-bold text-zinc-100"
              />
            </div>
            {/* 1.0 — DROP LIVE pill starts pulsing */}
            <motion.span
              {...appear(reduced, 1.0, 6)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-amber-300"
            >
              <motion.span
                aria-hidden="true"
                animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
                transition={
                  reduced ? undefined : { duration: 1, repeat: Infinity }
                }
              >
                ●
              </motion.span>
              DROP LIVE
            </motion.span>
          </div>

          {/* 1.0–2.5 sparkline spikes; page-load badge stays emerald */}
          <div className="relative h-24 shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] sm:h-28">
            <svg
              viewBox="0 0 300 80"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <defs>
                <linearGradient id={`${uid}-spark`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={SPARK_AREA}
                fill={`url(#${uid}-spark)`}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={reduced ? { duration: 0 } : { delay: 2.0, duration: 0.8 }}
              />
              <motion.path
                d={SPARK_PATH}
                fill="none"
                stroke="#a78bfa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: [0, 0.16, 1] }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 2.5, times: [0, 0.4, 1], ease: "linear" }
                }
              />
            </svg>
            <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] font-medium text-emerald-300">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Page load 0.4s
            </span>
          </div>

          {/* 2.5–4.5 orders + revenue; 4.5 uptime stat */}
          <div className="flex min-h-0 flex-1 items-end justify-between gap-3">
            <div className="flex shrink-0 flex-col gap-2">
              <motion.div
                {...appear(reduced, 2.5, 8)}
                className="flex flex-col"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Revenue
                </span>
                <CountUp
                  to={186450}
                  delay={2.5}
                  duration={2.0}
                  reduced={reduced}
                  format={(n) => `$${usNumber(n)}`}
                  className="font-display text-xl font-bold text-zinc-100"
                />
              </motion.div>
              <motion.div
                {...appear(reduced, 4.5, 6)}
                className="flex items-center gap-1.5 text-[11px] text-zinc-300"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Checkout uptime <span className="font-semibold text-zinc-100">100%</span>
              </motion.div>
            </div>

            <div className="flex w-40 shrink-0 flex-col items-end gap-1.5 sm:w-44">
              {TOASTS.map((t, i) => (
                <motion.div
                  key={t}
                  initial={reduced ? false : { opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { delay: 2.5 + i * 0.45, duration: 0.35, ease: EASE }
                  }
                  className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-[#12141f] px-2.5 py-1.5 shadow-lg shadow-black/40"
                >
                  <ShoppingBag className="h-3 w-3 shrink-0 text-emerald-400" />
                  <span className="truncate font-mono text-[10px] text-zinc-300">
                    {t}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
