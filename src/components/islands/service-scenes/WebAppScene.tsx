import { useId } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { SceneFrame } from "./SceneFrame";
import { CountUp } from "./CountUp";
import { EASE, appear, type SceneProps } from "./scene-kit";

const KPIS = [
  { label: "Revenue", to: 48.2, format: (n: number) => `$${n.toFixed(1)}k`, delta: "▲ 12%" },
  { label: "Active users", to: 3914, format: (n: number) => Math.round(n).toLocaleString("en-US"), delta: "" },
  { label: "Churn", to: 1.8, format: (n: number) => `${n.toFixed(1)}%`, delta: "" },
];

const ROWS = [
  { name: "alpha-team", status: "Active", amount: "$1,299" },
  { name: "beta-team", status: "Pending", amount: "$890" },
  { name: "gamma-team", status: "Active", amount: "$2,150" },
];

const LINE_PATH =
  "M0,82 C24,78 40,66 66,68 C92,70 108,50 138,52 C168,54 186,34 214,36 C242,38 264,24 300,16";
const AREA_PATH = `${LINE_PATH} L300,100 L0,100 Z`;

/* Storyboard §3.2 — Wireframe → Product (6s loop). */
export function WebAppScene({ reduced, compact, fade }: SceneProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <SceneFrame title="alchemy — app" compact={compact} fade={fade}>
      <div className="flex h-full flex-col gap-2.5 p-3">
        {/* mini browser bar */}
        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <Lock className="h-3 w-3 shrink-0 text-emerald-400/80" />
          <span className="truncate font-mono text-[10px] text-zinc-400">
            app.yourproduct.com/dashboard
          </span>
        </div>

        <div className="flex min-h-0 flex-1 gap-2.5">
          {/* sidebar skeleton → real */}
          {!compact && (
            <div className="relative w-24 shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
              <motion.div
                className="absolute inset-0 flex flex-col gap-2 p-2"
                initial={reduced ? false : { opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={reduced ? { duration: 0 } : { delay: 1.2, duration: 0.3 }}
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-5 animate-pulse rounded bg-zinc-700/40" />
                ))}
              </motion.div>
              <motion.div
                className="flex flex-col gap-1"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={
                  reduced ? { duration: 0 } : { delay: 1.3, duration: 0.4, ease: EASE }
                }
              >
                {["Dashboard", "Customers", "Payments", "Settings"].map((n, i) => (
                  <div
                    key={n}
                    className={
                      i === 0
                        ? "rounded-md bg-violet-400/10 px-2 py-1.5 text-[9px] font-semibold text-violet-300"
                        : "px-2 py-1.5 text-[9px] text-zinc-500"
                    }
                  >
                    {n}
                  </div>
                ))}
              </motion.div>
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            {/* 0.0–1.0 KPI skeletons → 1.2–2.4 real cards counting up */}
            <div className="grid shrink-0 grid-cols-3 gap-2">
              {KPIS.map((kpi, i) => (
                <div
                  key={kpi.label}
                  className="relative h-[68px] overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5"
                >
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-center gap-1.5 p-2.5"
                    initial={reduced ? false : { opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={
                      reduced ? { duration: 0 } : { delay: 1.2 + i * 0.15, duration: 0.25 }
                    }
                  >
                    <div className="h-2 w-10 animate-pulse rounded bg-zinc-700/40" />
                    <div className="h-4 w-14 animate-pulse rounded bg-zinc-700/40" />
                  </motion.div>
                  <motion.div
                    className="flex h-full flex-col justify-center"
                    initial={reduced ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { delay: 1.2 + i * 0.15, duration: 0.4, ease: EASE }
                    }
                  >
                    <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                      {kpi.label}
                    </div>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <CountUp
                        to={kpi.to}
                        format={kpi.format}
                        delay={1.2 + i * 0.15}
                        duration={0.9}
                        reduced={reduced}
                        className="font-display text-base font-bold text-zinc-100"
                      />
                      {kpi.delta && (
                        <motion.span
                          initial={reduced ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={
                            reduced
                              ? { duration: 0 }
                              : { delay: 2.1 + i * 0.15, duration: 0.3 }
                          }
                          className="text-[9px] font-semibold text-emerald-400"
                        >
                          {kpi.delta}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* 2.4–3.6 chart line draws in */}
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <motion.div
                className="absolute inset-2 animate-pulse rounded bg-zinc-700/30"
                initial={reduced ? false : { opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={reduced ? { duration: 0 } : { delay: 2.4, duration: 0.3 }}
              />
              <motion.svg
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
                className="h-full w-full p-2"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={reduced ? { duration: 0 } : { delay: 2.35, duration: 0.2 }}
              >
                <defs>
                  <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={AREA_PATH}
                  fill={`url(#${uid}-area)`}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={
                    reduced ? { duration: 0 } : { delay: 2.8, duration: 0.8 }
                  }
                />
                <motion.path
                  d={LINE_PATH}
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { delay: 2.4, duration: 1.2, ease: EASE }
                  }
                />
              </motion.svg>

              {/* 4.6–5.4 performance ring counts 0 → 100, turns emerald */}
              <motion.div
                {...appear(reduced, 4.6, 6)}
                className="absolute right-2 top-2 flex flex-col items-center rounded-xl bg-[#0b0d16]/85 p-1.5"
              >
                <div className="relative h-11 w-11">
                  <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="rgb(255 255 255 / 0.08)"
                      strokeWidth="4"
                    />
                    <motion.circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={reduced ? false : { pathLength: 0, stroke: "#a78bfa" }}
                      animate={{ pathLength: 1, stroke: ["#a78bfa", "#a78bfa", "#34d399"] }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : {
                              pathLength: { delay: 4.6, duration: 0.8, ease: "linear" },
                              stroke: { delay: 4.6, duration: 0.8, times: [0, 0.85, 1] },
                            }
                      }
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <CountUp
                      to={100}
                      delay={4.6}
                      duration={0.8}
                      reduced={reduced}
                      className="font-display text-[11px] font-bold text-zinc-100"
                    />
                  </div>
                </div>
                <div className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-zinc-500">
                  Performance
                </div>
              </motion.div>
            </div>

            {/* 3.6–4.6 table rows slide in */}
            {!compact && (
              <div className="flex shrink-0 flex-col gap-1.5">
                {ROWS.map((row, i) => (
                  <motion.div
                    key={row.name}
                    initial={reduced ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { delay: 3.6 + i * 0.3, duration: 0.4, ease: EASE }
                    }
                    className="flex items-center justify-between rounded-md border border-white/[0.04] bg-white/[0.02] px-2.5 py-1.5"
                  >
                    <span className="font-mono text-[10px] text-zinc-400">
                      {row.name}
                    </span>
                    <span
                      className={
                        row.status === "Active"
                          ? "rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-medium text-emerald-300"
                          : "rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[9px] font-medium text-amber-300"
                      }
                    >
                      {row.status}
                    </span>
                    <span className="text-[10px] font-semibold text-zinc-300">
                      {row.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
