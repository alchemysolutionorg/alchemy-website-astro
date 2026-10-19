import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

export interface LoopClock {
  /** Bumps on every completed cycle and on restart() — use it as a remount key
      so framer-motion `initial → animate` replays cleanly. */
  key: number;
  /** 0 → 1 through the current cycle; freezes while paused (drives the progress
      bar and the end-of-cycle fade-out). */
  progress: MotionValue<number>;
  restart: () => void;
}

/**
 * Single rAF clock for the scene loop (docs/services_and_logo_decisions.md §4).
 * Pausing freezes the elapsed time, so the progress bar, the fade-out window
 * (last 400ms of the cycle) and the scene remount all stay in sync.
 */
export function useLoopKey(
  ms: number,
  running: boolean,
  onCycle?: () => void
): LoopClock {
  const [key, setKey] = useState(0);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const onCycleRef = useRef<(() => void) | undefined>(onCycle);
  onCycleRef.current = onCycle;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      if (elapsed.current >= ms) {
        elapsed.current %= ms;
        setKey((k) => k + 1);
        onCycleRef.current?.();
      }
      progress.set(Math.min(elapsed.current / ms, 1));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ms, running, progress]);

  const restart = useCallback(() => {
    elapsed.current = 0;
    progress.set(0);
    setKey((k) => k + 1);
  }, [progress]);

  return { key, progress, restart };
}
