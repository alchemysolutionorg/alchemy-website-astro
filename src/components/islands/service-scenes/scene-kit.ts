import type { MotionValue } from "framer-motion";

/* Shared scene constants — storyboard timings use the same ease as the ContactForm. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export interface SceneProps {
  /** prefers-reduced-motion: skip all animation, render the storyboard's final frame. */
  reduced?: boolean;
  /** Mobile layout (~280px): hide secondary columns. */
  compact?: boolean;
  /** End-of-cycle fade-out (last 400ms) applied to the scene body only. */
  fade?: MotionValue<number>;
}

/** Spread onto a motion element to appear at `delay` seconds, or render final under reduced motion. */
export function appear(reduced: boolean | undefined, delay: number, y = 12) {
  return reduced
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.45, ease: EASE },
      };
}
