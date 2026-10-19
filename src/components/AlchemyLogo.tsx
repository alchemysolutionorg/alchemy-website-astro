import { useId } from "react";
import { cn } from "@/lib/utils";

/* Spark A mark: the A = alchemical triangle, the gold spark = transmutation / AI.
   Paths come from docs/design/logo/logo-mark.svg (mark) and logo-tile.svg (tile). */
const A_PATH = "M32 4 L58 60 H47 L32 27 L17 60 H6 Z";
const SPARK_PATH =
  "M32 38 Q34.2 44.8 41 47 Q34.2 49.2 32 56 Q29.8 49.2 23 47 Q29.8 44.8 32 38 Z";
const TILE_SPARK_PATH =
  "M32 36 Q34.6 44.4 43 47 Q34.6 49.6 32 58 Q29.4 49.6 21 47 Q29.4 44.4 32 36 Z";

interface AlchemyLogoProps {
  variant?: "mark" | "tile";
  size?: number;
  /** Legacy props kept for existing callers (Footer, 404). */
  width?: number;
  height?: number;
  className?: string;
}

export function AlchemyLogo({
  variant = "mark",
  size = 36,
  width,
  height,
  className,
}: AlchemyLogoProps) {
  const uid = useId().replace(/:/g, "");
  const aId = `alchemy-a-${uid}`;
  const sparkId = `alchemy-spark-${uid}`;
  const tileId = `alchemy-tile-${uid}`;

  const w = width ?? size;
  const h = height ?? size;

  if (variant === "tile") {
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={tileId}
            x1="0"
            y1="64"
            x2="64"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#3B0F8C" />
            <stop offset="1" stopColor="#8B3DFF" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="15" fill={`url(#${tileId})`} />
        <g transform="translate(11 9) scale(0.66)">
          <path d={A_PATH} fill="#FFFFFF" />
          <path d={TILE_SPARK_PATH} fill="#FCD34D" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "[--a1:#6D28D9] [--a2:#A78BFA] dark:[--a1:#7B26F2] dark:[--a2:#C4B5FD]",
        className
      )}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={aId}
          x1="6"
          y1="60"
          x2="58"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" style={{ stopColor: "var(--a1)" }} />
          <stop offset="1" style={{ stopColor: "var(--a2)" }} />
        </linearGradient>
        <linearGradient
          id={sparkId}
          x1="24"
          y1="39"
          x2="40"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path d={A_PATH} fill={`url(#${aId})`} />
      <path className="logo-spark" d={SPARK_PATH} fill={`url(#${sparkId})`} />
    </svg>
  );
}
