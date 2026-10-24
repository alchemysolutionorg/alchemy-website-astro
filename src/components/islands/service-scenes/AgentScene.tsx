import { motion } from "framer-motion";
import { CheckCircle2, FileText, Loader2, Zap } from "lucide-react";
import { AlchemyLogo } from "@/components/AlchemyLogo";
import { SceneFrame } from "./SceneFrame";
import { EASE, appear, type SceneProps } from "./scene-kit";

const CHANNELS = ["support", "ops", "sales"];
const DOCS = ["refund-policy.pdf", "eu-terms.md", "support-handbook.docx"];
const CITATIONS = ["[1] refund-policy.pdf §4.2", "[2] eu-terms.md"];
const ANSWER =
  "EU customers can request a full refund within 14 days of delivery. Digital goods are excluded once downloaded.".split(
    " "
  );

/* Storyboard §3.1 — Ask → Retrieve → Answer (6s loop). */
export function AgentScene({ reduced, compact, fade }: SceneProps) {
  return (
    <SceneFrame title="alchemy — agents" compact={compact} fade={fade}>
      <div className="flex h-full">
        {!compact && (
          <div className="w-32 shrink-0 border-r border-white/[0.06] p-3">
            <div className="mb-2 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
              Channels
            </div>
            <div className="flex flex-col gap-1">
              {CHANNELS.map((c) => (
                <div
                  key={c}
                  className={
                    c === "support"
                      ? "rounded-md bg-violet-400/10 px-2 py-1 font-mono text-[11px] text-violet-300"
                      : "rounded-md px-2 py-1 font-mono text-[11px] text-zinc-500"
                  }
                >
                  # {c}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-1.5 px-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[9px] text-zinc-600">
                agent online
              </span>
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col p-4">
          {/* 0.3 — user message slides up */}
          <motion.div {...appear(reduced, 0.3)} className="flex items-start gap-2.5">
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-[10px] font-bold text-white">
              JD
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-3.5 py-2 text-[13px] leading-relaxed text-zinc-200">
              What's our refund policy for EU customers?
            </div>
          </motion.div>

          {/* 1.0 — agent row with searching status */}
          <motion.div {...appear(reduced, 1.0, 8)} className="mt-4 flex items-center gap-2.5">
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <AlchemyLogo size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-zinc-100">
                Alchemy Agent
              </div>
              <motion.div
                initial={reduced ? false : { opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={
                  reduced ? { duration: 0 } : { delay: 2.7, duration: 0.3 }
                }
                className="mt-0.5 flex items-center gap-1.5"
              >
                {!reduced && (
                  <Loader2 className="h-3 w-3 animate-spin text-violet-300" />
                )}
                <span className="font-mono text-[10px] text-zinc-500">
                  Searching knowledge base…
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* 1.2–2.4 — document chips fly in, then get emerald ticks */}
          <div className="mt-3 flex flex-wrap gap-1.5 pl-[38px]">
            {DOCS.map((name, i) => (
              <motion.div
                key={name}
                initial={reduced ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: 1.2 + i * 0.3, duration: 0.35, ease: EASE }
                }
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-zinc-400"
              >
                <FileText className="h-3 w-3 shrink-0 text-zinc-500" />
                {name}
                <motion.span
                  initial={reduced ? false : { opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          delay: 1.2 + i * 0.3 + 0.4,
                          duration: 0.25,
                          ease: EASE,
                        }
                  }
                  className="flex"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* 2.6–4.2 — answer types out word by word */}
          <motion.div {...appear(reduced, 2.6, 8)} className="mt-4 pl-[38px]">
            <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-violet-400/20 bg-violet-400/[0.08] px-3.5 py-2.5 text-[13px] leading-relaxed text-zinc-200">
              {ANSWER.map((w, i) => (
                <motion.span
                  key={i}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          delay: 2.6 + (i * 1.6) / ANSWER.length,
                          duration: 0.05,
                        }
                  }
                >
                  {w}{" "}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* 4.2 — citation chips pop in */}
          <div className="mt-3 flex flex-wrap gap-1.5 pl-[38px]">
            {CITATIONS.map((c, i) => (
              <motion.span
                key={c}
                initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { delay: 4.2 + i * 0.12, duration: 0.3, ease: EASE }
                }
                className="rounded-md border border-violet-400/40 px-2 py-0.5 font-mono text-[10px] text-violet-300"
              >
                {c}
              </motion.span>
            ))}
          </div>

          {/* 4.5 — gold result badge at the bottom */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced ? { duration: 0 } : { delay: 4.5, duration: 0.4, ease: EASE }
            }
            className="mt-auto pt-4"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[11px] font-medium text-amber-300">
              <Zap className="h-3 w-3" />
              Answered in 2.1s · sources cited
            </span>
          </motion.div>
        </div>
      </div>
    </SceneFrame>
  );
}
