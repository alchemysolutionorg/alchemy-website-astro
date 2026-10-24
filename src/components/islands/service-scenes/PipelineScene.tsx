import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SceneFrame } from "./SceneFrame";
import { CountUp } from "./CountUp";
import { EASE, type SceneProps } from "./scene-kit";

const NODES = [
  { label: "Commit", caption: "a3f9c1" },
  { label: "Tests", caption: "214 passed" },
  { label: "Build", caption: "1.2 MB" },
  { label: "Deploy", caption: "zero-downtime" },
  { label: "Live", caption: "v2.4.1" },
];
const NODE_DELAY = 0.2;
const NODE_STEP = 0.75;

/* Storyboard §3.4 — Commit → Live, auto-scaling (6s loop). */
export function PipelineScene({ reduced, compact, fade }: SceneProps) {
  const checkDelay = (i: number) => NODE_DELAY + i * NODE_STEP;
  const motionT = (delay: number, duration = 0.35) =>
    reduced ? { duration: 0 } : { delay, duration, ease: EASE };

  return (
    <SceneFrame title="alchemy — deploy" compact={compact} fade={fade}>
      <div
        className={
          compact
            ? "flex h-full flex-col justify-center gap-5 p-3"
            : "flex h-full flex-col justify-center gap-8 p-5"
        }
      >
        {/* pipeline nodes */}
        <div className="relative px-[2%]">
          <div
            className="absolute left-[11%] right-[11%] top-4 h-0.5 bg-zinc-800"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[11%] right-[11%] top-4 h-0.5 origin-left rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: NODE_DELAY, duration: 3.0, ease: "linear" }
            }
            aria-hidden="true"
          />
          {/* glowing travelling dot */}
          <motion.div
            className="absolute top-4 -mt-[3px] h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_10px_3px_rgba(167,139,250,0.9)]"
            initial={reduced ? false : { left: "11%", opacity: 0 }}
            animate={reduced ? { opacity: 0 } : { left: "89%", opacity: [0, 1, 1, 0] }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    left: { delay: NODE_DELAY, duration: 3.0, ease: "linear" },
                    opacity: { duration: 3.4, times: [0, 0.06, 0.92, 1] },
                  }
            }
            aria-hidden="true"
          />

          <div className="relative flex items-start justify-between">
            {NODES.map((n, i) => (
              <div
                key={n.label}
                className="flex w-[19%] flex-col items-center gap-1.5"
              >
                <div
                  className={
                    compact
                      ? "relative grid h-7 w-7 place-items-center rounded-full border-2 border-zinc-700 bg-[#12141f]"
                      : "relative grid h-8 w-8 place-items-center rounded-full border-2 border-zinc-700 bg-[#12141f]"
                  }
                >
                  <motion.span
                    className="absolute inset-[-2px] rounded-full border-2 border-emerald-400 bg-[#0d1512]"
                    initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={motionT(checkDelay(i))}
                  />
                  <motion.span
                    className="relative flex"
                    initial={reduced ? false : { opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={motionT(checkDelay(i) + 0.08)}
                  >
                    <Check
                      className={
                        compact ? "h-3.5 w-3.5 text-emerald-400" : "h-4 w-4 text-emerald-400"
                      }
                      strokeWidth={3}
                    />
                  </motion.span>
                </div>
                <span
                  className={
                    compact
                      ? "font-mono text-[9px] text-zinc-400"
                      : "text-[10px] font-medium text-zinc-400"
                  }
                >
                  {n.label}
                </span>
                {!compact && (
                  <motion.span
                    className="font-mono text-[9px] text-zinc-600"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={motionT(checkDelay(i) + 0.25, 0.3)}
                  >
                    {n.caption}
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* servers + load */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionT(1.0, 0.4)}
          className="flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
        >
          <div className="flex min-w-0 flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Servers
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => {
                const isNew = i >= 2;
                const delay = isNew ? 2.2 + (i - 2) * 0.12 : 1.0;
                return (
                  <motion.span
                    key={i}
                    className={
                      isNew
                        ? "h-6 w-6 rounded-md border border-violet-400/50 bg-gradient-to-b from-violet-500/25 to-zinc-900"
                        : "h-6 w-6 rounded-md border border-zinc-600 bg-gradient-to-b from-zinc-800 to-zinc-900"
                    }
                    initial={reduced ? false : { opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      reduced ? { duration: 0 } : { delay, duration: 0.3, ease: EASE }
                    }
                  />
                );
              })}
            </div>
          </div>

          <div className="flex w-36 shrink-0 flex-col gap-2 sm:w-44">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Load
              </span>
              <span className="relative h-4 w-12 text-right font-mono text-[11px] font-semibold">
                <motion.span
                  className="absolute inset-0 text-amber-300"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={reduced ? { opacity: 0 } : { opacity: [0, 1, 1, 0] }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 1.8, delay: 1.4, times: [0, 0.3, 0.8, 1] }
                  }
                >
                  85%
                </motion.span>
                <motion.span
                  className="absolute inset-0 text-emerald-300"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={motionT(3.05, 0.3)}
                >
                  40%
                </motion.span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full origin-left rounded-full"
                initial={
                  reduced
                    ? false
                    : { scaleX: 0.05, backgroundColor: "#fbbf24" }
                }
                animate={
                  reduced
                    ? { scaleX: 0.4, backgroundColor: "#34d399" }
                    : {
                        scaleX: [0.05, 0.85, 0.4],
                        backgroundColor: ["#fbbf24", "#fbbf24", "#34d399"],
                      }
                }
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 2.2, delay: 1.0, times: [0, 0.55, 1], ease: "linear" }
                }
              />
            </div>
          </div>
        </motion.div>

        {/* 4.2 — footer counters */}
        {!compact && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionT(4.2, 0.4)}
            className="flex gap-8 border-t border-white/[0.06] pt-4"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Deploys this week
              </div>
              <CountUp
                to={38}
                delay={4.2}
                duration={0.6}
                reduced={reduced}
                className="font-display text-lg font-bold text-zinc-100"
              />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Uptime
              </div>
              <span className="font-display text-lg font-bold text-emerald-300">
                99.99%
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </SceneFrame>
  );
}
