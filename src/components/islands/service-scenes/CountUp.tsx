import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { EASE } from "./scene-kit";

export const usNumber = (n: number) =>
  Math.round(n).toLocaleString("en-US");

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  /** Seconds from scene mount — matches the storyboard timeline. */
  delay?: number;
  reduced?: boolean;
  format?: (n: number) => string;
  className?: string;
}

export function CountUp({
  from = 0,
  to,
  duration = 1,
  delay = 0,
  reduced,
  format = usNumber,
  className,
}: CountUpProps) {
  const [value, setValue] = useState(reduced ? to : from);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    setValue(from);
    const controls = animate(from, to, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [from, to, duration, delay, reduced]);

  return <span className={className}>{format(value)}</span>;
}
