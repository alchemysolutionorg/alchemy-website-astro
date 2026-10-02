import React, { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ── Types ──────────────────────────────────────────────── */
interface Cta {
  text: string;
  href: string;
  external?: boolean;
}

interface HeroData {
  badgeText?: string;
  headline?: string;
  headlineAccent?: string;
  subheadline?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  stats?: Array<{ value: string; label: string }>;
}

interface HeroProps {
  data?: HeroData;
}

/* ── Mission control script ──────────────────────────────── */
type LineTone = "prompt" | "dim" | "ok" | "agent";

interface ScriptLine {
  tone: LineTone;
  text: string;
}

const DEPLOY_SCRIPT: ScriptLine[] = [
  { tone: "prompt", text: "alchemy deploy --prod" },
  { tone: "dim", text: "▸ tests      214 passed in 38s" },
  { tone: "dim", text: "▸ build      bundle 1.2 MB · 0 warnings" },
  { tone: "dim", text: "▸ preview    https://pr-482.alchemy.dev" },
  { tone: "ok", text: "✓ promoted to production in 4.2s" },
  { tone: "agent", text: "● agent watching error rates — all green" },
];

const TONE_CLASS: Record<LineTone, string> = {
  prompt: "text-zinc-100",
  dim: "text-zinc-400",
  ok: "text-emerald-400",
  agent: "text-amber-300",
};

const DEPLOY_BARS = [38, 62, 45, 74, 58, 88, 66, 95];

/* ── Reduced motion helper ───────────────────────────────── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

/* ── Typed deploy console ────────────────────────────────── */
function DeployConsole({ reduced }: { reduced: boolean }) {
  const [line, setLine] = useState(reduced ? DEPLOY_SCRIPT.length : 0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduced) {
      setLine(DEPLOY_SCRIPT.length);
      return;
    }
    if (line >= DEPLOY_SCRIPT.length) {
      const hold = window.setTimeout(() => {
        setLine(0);
        setChars(0);
      }, 4200);
      return () => window.clearTimeout(hold);
    }
    const current = DEPLOY_SCRIPT[line].text;
    if (chars < current.length) {
      const t = window.setTimeout(() => setChars((c) => c + 1), 16);
      return () => window.clearTimeout(t);
    }
    const pause = window.setTimeout(() => {
      setLine((l) => l + 1);
      setChars(0);
    }, line === 0 ? 420 : 240);
    return () => window.clearTimeout(pause);
  }, [line, chars, reduced]);

  return (
    <div className="px-5 py-4 sm:px-6 sm:py-5 text-[12.5px] leading-6 sm:text-[13px] sm:leading-7 min-h-[13.5rem] sm:min-h-[15rem]">
      {DEPLOY_SCRIPT.slice(0, line).map((l, i) => (
        <div key={i} className={TONE_CLASS[l.tone]}>
          {l.tone === "prompt" && <span className="text-violet-400">$ </span>}
          {l.text}
        </div>
      ))}
      {line < DEPLOY_SCRIPT.length && (
        <div className={TONE_CLASS[DEPLOY_SCRIPT[line].tone]}>
          {DEPLOY_SCRIPT[line].tone === "prompt" && (
            <span className="text-violet-400">$ </span>
          )}
          {DEPLOY_SCRIPT[line].text.slice(0, chars)}
          <span
            className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] rounded-[1px] bg-violet-400 [animation:hero-caret_1s_steps(1)_infinite]"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

/* ── Status rail ─────────────────────────────────────────── */
function StatusRail() {
  return (
    <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06] md:grid-cols-1 md:divide-x-0 md:divide-y md:border-l md:border-t-0">
      <div className="px-4 py-4 sm:px-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          Production
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm font-medium text-zinc-100">live</span>
        </div>
        <div className="mt-1 text-[11px] text-zinc-500">p95 142ms</div>
      </div>

      <div className="px-4 py-4 sm:px-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          Deploys / week
        </div>
        <div className="mt-2 flex h-8 items-end gap-1" aria-hidden="true">
          {DEPLOY_BARS.map((h, i) => (
            <span
              key={i}
              className={
                i === DEPLOY_BARS.length - 1
                  ? "w-1.5 rounded-sm bg-violet-400"
                  : "w-1.5 rounded-sm bg-white/15"
              }
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-4 sm:px-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          Lighthouse
        </div>
        <div className="mt-1.5 font-display text-2xl font-bold text-zinc-100">
          100
        </div>
        <div className="mt-1 whitespace-nowrap text-[10px] text-emerald-400 max-sm:sr-only">
          perf · a11y · seo
        </div>
      </div>
    </div>
  );
}

/* ── Mission control card (tilt on pointer devices) ──────── */
function MissionControl({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), {
    stiffness: 140,
    damping: 18,
  });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!fine || reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative [perspective:1600px]"
    >
      <div
        className="absolute -inset-8 rounded-[3rem] bg-primary/20 blur-3xl dark:bg-primary/25"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 56, rotateX: 14 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={fine && !reduced ? { rotateX, rotateY } : undefined}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d16] text-left font-mono shadow-[0_40px_120px_-24px_rgba(124,58,237,0.45)] [transform-style:preserve-3d]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden="true" />

        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="truncate text-[11px] text-zinc-500">
            alchemy — mission control
          </span>
          <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] text-emerald-300 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            zero-downtime
          </span>
        </div>

        <div className="grid md:grid-cols-[1.6fr_1fr]">
          <DeployConsole reduced={reduced} />
          <StatusRail />
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export function Hero({ data }: HeroProps) {
  const reduced = usePrefersReducedMotion();

  const stats = data?.stats || [
    { value: "50+", label: "projects shipped" },
    { value: "99.9%", label: "uptime on what we operate" },
    { value: "5×", label: "faster delivery with AI tooling" },
    { value: "24/7", label: "support & on-call" },
  ];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
        {/* Masked grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--primary) / 0.08) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary) / 0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 90% 65% at 50% 30%, black 25%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 65% at 50% 30%, black 25%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Aurora glows */}
        <div
          className="hero-aurora pointer-events-none absolute -top-[28%] left-1/2 h-[70vh] w-[90vw] max-w-[1100px] -translate-x-1/2 rounded-full blur-[110px] [animation:hero-aurora_18s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--primary) / 0.28), transparent 72%)",
          }}
          aria-hidden="true"
        />
        <div
          className="hero-aurora pointer-events-none absolute right-[-14%] top-[24%] h-[46vh] w-[44vw] max-w-[620px] rounded-full blur-[110px] [animation:hero-aurora_24s_ease-in-out_infinite_reverse]"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--accent) / 0.14), transparent 72%)",
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <motion.div
              {...fade(0)}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-xs tracking-wide text-muted-foreground">
                {data?.badgeText || "AI-native engineering studio"}
              </span>
            </motion.div>

            <motion.h1
              {...fade(0.1)}
              className="mt-8 font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]"
            >
              {data?.headline || "Software that"}
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient sm:whitespace-nowrap">
                {data?.headlineAccent || "ships itself."}
              </span>
            </motion.h1>

            <motion.p
              {...fade(0.22)}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {data?.subheadline ||
                "We design, build and operate production-grade web platforms, autonomous AI agents and cloud infrastructure — engineered with autonomous tooling that cuts delivery time in half."}
            </motion.p>

            <motion.div
              {...fade(0.34)}
              className="mt-10 flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row"
            >
              <a
                href={data?.primaryCta?.href || "#contact"}
                data-testid="button-cta-primary"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:shadow-primary/40 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {data?.primaryCta?.text || "Start a project"}
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a
                href={data?.secondaryCta?.href || "#services"}
                data-testid="button-cta-secondary"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {data?.secondaryCta?.text || "Explore services"}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto mt-20 max-w-5xl"
          >
            <MissionControl reduced={reduced} />
          </motion.div>

          <motion.div
            {...fade(0.7)}
            className="mx-auto mt-16 flex max-w-4xl flex-wrap items-stretch justify-center divide-border/70 max-md:gap-y-6 md:divide-x"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-8 text-center md:px-10">
                <div className="font-display text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-xs tracking-wide text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
          aria-hidden="true"
        />
      </section>
    </MotionConfig>
  );
}

export default Hero;
