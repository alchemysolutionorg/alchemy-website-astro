import { motion } from "framer-motion";
import { SceneFrame } from "./SceneFrame";
import { CountUp, usNumber } from "./CountUp";
import { EASE, type SceneProps } from "./scene-kit";

/* Diagram geometry (viewBox 0 0 320 272) — Users → CDN → API Gateway →
   [Auth · Orders · Search] → Postgres + Redis */
const BOXES = [
  { id: "Users", x: 122, y: 10, w: 76, h: 26, delay: 0 },
  { id: "CDN", x: 122, y: 54, w: 76, h: 26, delay: 0.25 },
  { id: "API Gateway", x: 100, y: 98, w: 120, h: 26, delay: 0.5 },
  { id: "Auth", x: 34, y: 152, w: 76, h: 24, delay: 0.85 },
  { id: "Orders", x: 122, y: 152, w: 76, h: 24, delay: 1.0 },
  { id: "Search", x: 210, y: 152, w: 76, h: 24, delay: 1.15 },
  { id: "Postgres", x: 88, y: 224, w: 76, h: 26, delay: 1.45 },
  { id: "Redis", x: 194, y: 224, w: 76, h: 26, delay: 1.6 },
];

const EDGES: { x1: number; y1: number; x2: number; y2: number; delay: number }[] =
  [
    { x1: 160, y1: 36, x2: 160, y2: 54, delay: 0.15 },
    { x1: 160, y1: 80, x2: 160, y2: 98, delay: 0.4 },
    { x1: 160, y1: 124, x2: 74, y2: 150, delay: 0.75 },
    { x1: 160, y1: 124, x2: 160, y2: 150, delay: 0.8 },
    { x1: 160, y1: 124, x2: 246, y2: 150, delay: 0.85 },
    { x1: 72, y1: 176, x2: 116, y2: 222, delay: 1.3 },
    { x1: 158, y1: 176, x2: 132, y2: 222, delay: 1.35 },
    { x1: 164, y1: 176, x2: 224, y2: 222, delay: 1.4 },
    { x1: 248, y1: 176, x2: 240, y2: 222, delay: 1.45 },
  ];

const NOTES = [
  { text: "cached at edge", className: "left-[3%] top-[16%] -rotate-6", delay: 2.0 },
  { text: "auto-scaling", className: "right-[2%] top-[42%] rotate-3", delay: 2.3 },
  { text: "multi-region", className: "bottom-[6%] left-[6%] -rotate-3", delay: 2.6 },
];

/* Storyboard §3.5 — Plan the system, cut the cost (6s loop). */
export function BlueprintScene({ reduced, compact, fade }: SceneProps) {
  return (
    <SceneFrame title="alchemy — architecture" compact={compact} fade={fade}>
      <div className={compact ? "flex h-full flex-col" : "flex h-full"}>
        {/* diagram */}
        <div className="relative min-h-0 min-w-0 flex-1">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(139,92,246,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,.08) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
            aria-hidden="true"
          />
          <svg
            viewBox="0 0 320 272"
            className="relative h-full w-full p-2"
            preserveAspectRatio="xMidYMid meet"
          >
            {EDGES.map((e, i) => (
              <g key={i}>
                <motion.line
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke="#52525b"
                  strokeWidth="1.5"
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { delay: e.delay, duration: 0.3, ease: EASE }
                  }
                />
                <motion.circle
                  cx={e.x2}
                  cy={e.y2}
                  r="1.8"
                  fill="#71717a"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={
                    reduced ? { duration: 0 } : { delay: e.delay + 0.25, duration: 0.2 }
                  }
                />
              </g>
            ))}
            {BOXES.map((b) => (
              <g key={b.id}>
                <motion.rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="6"
                  fill="rgba(139,92,246,0.07)"
                  stroke="rgba(167,139,250,0.65)"
                  strokeWidth="1.5"
                  initial={reduced ? false : { pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          pathLength: { delay: b.delay, duration: 0.5, ease: EASE },
                          fillOpacity: { delay: b.delay + 0.3, duration: 0.3 },
                        }
                  }
                />
                <motion.text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="Menlo, monospace"
                  fontSize="9"
                  fill="#d4d4d8"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={
                    reduced ? { duration: 0 } : { delay: b.delay + 0.25, duration: 0.3 }
                  }
                >
                  {b.id}
                </motion.text>
              </g>
            ))}
          </svg>

          {/* 2.0–3.0 sticky-note annotations */}
          {!compact &&
            NOTES.map((n) => (
              <motion.span
                key={n.text}
                className={`absolute ${n.className} rounded-[3px] bg-amber-200/95 px-1.5 py-1 text-[9px] font-semibold text-amber-950 shadow-md`}
                initial={reduced ? false : { opacity: 0, y: 6, rotate: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: n.delay, duration: 0.35, ease: EASE }
                }
              >
                {n.text}
              </motion.span>
            ))}
        </div>

        {/* cost panel */}
        <div
          className={
            compact
              ? "flex shrink-0 items-center justify-between gap-3 border-t border-white/[0.06] p-3"
              : "flex w-[38%] shrink-0 flex-col justify-center gap-6 border-l border-white/[0.06] p-5"
          }
        >
          <div className={compact ? "" : "flex flex-col gap-2"}>
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Monthly cloud cost
            </span>
            <CountUp
              from={18400}
              to={11200}
              delay={2.5}
              duration={2.0}
              reduced={reduced}
              format={(n) => `$${usNumber(n)}`}
              className={
                compact
                  ? "font-display text-xl font-bold text-zinc-100"
                  : "font-display text-3xl font-bold text-zinc-100"
              }
            />
          </div>

          <div className={compact ? "hidden sm:block sm:flex-1" : "w-full"}>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full origin-left rounded-full bg-violet-400"
                initial={reduced ? false : { scaleX: 1 }}
                animate={{ scaleX: 0.61 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: 2.5, duration: 2.0, ease: "linear" }
                }
              />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[9px] text-zinc-600">
              <span>before</span>
              <span>after</span>
            </div>
          </div>

          <motion.span
            className={
              compact
                ? "inline-flex w-fit rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 font-display text-sm font-bold text-amber-300"
                : "inline-flex w-fit rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1.5 font-display text-lg font-bold text-amber-300 shadow-[0_0_24px_-6px_rgba(252,211,77,0.5)]"
            }
            initial={reduced ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduced ? { duration: 0 } : { delay: 4.5, duration: 0.35, ease: EASE }
            }
          >
            −39%
          </motion.span>
        </div>
      </div>
    </SceneFrame>
  );
}
