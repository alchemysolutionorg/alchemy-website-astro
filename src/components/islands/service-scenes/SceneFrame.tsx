import { type ReactNode } from "react";
import { motion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SceneFrameProps {
  /** Mono window title, e.g. "alchemy — agents". */
  title: string;
  compact?: boolean;
  /** End-of-cycle fade applied to the body only — chrome stays opaque. */
  fade?: MotionValue<number>;
  className?: string;
  children: ReactNode;
}

/* Shared dark "terminal window" chrome — same style as the hero mission-control
   panel. Always dark, in both light and dark page themes (docs §1). */
export function SceneFrame({
  title,
  compact,
  fade,
  className,
  children,
}: SceneFrameProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d16] text-zinc-100 shadow-[0_40px_120px_-24px_rgba(124,58,237,0.45)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-gradient-to-r from-transparent via-white/25 to-transparent lg:block" />
      <div
        className={cn(
          "flex shrink-0 items-center gap-3 border-b border-white/[0.06] bg-white/[0.02]",
          compact ? "px-3 py-2" : "px-4 py-2.5 sm:px-5"
        )}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <span className="truncate font-mono text-[11px] text-zinc-500">
          {title}
        </span>
        <span className="ml-auto shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] tracking-wide text-zinc-500">
          illustrative
        </span>
      </div>
      <motion.div
        style={fade ? { opacity: fade } : undefined}
        className="relative min-h-0 flex-1 overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
}
