import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ── Types ───────────────────────────────────────────────── */
interface HeroData {
  badgeText?: string;
  headlinePrefix?: string;
  typewriterWords?: string[];
  headlineSuffix?: string;
  subheadline?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  stats?: Array<{ value: string; label: string }>;
}

interface HeroProps {
  data?: HeroData;
}

/* ── Particle canvas ──────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }[] = [];

    const colors = ["#a78bfa", "#818cf8", "#c084fc", "#f59e0b", "#60a5fa"];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function spawn() {
      particles.length = 0;
      const count = Math.floor((window.innerWidth * window.innerHeight) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.4,
          alpha: Math.random() * 0.55 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(139,92,246,${0.12 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.6;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    spawn();
    draw();

    const onResize = () => { resize(); spawn(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80 dark:opacity-70"
      style={{ contain: 'strict' }}
    />
  );
}

/* ── Typewriter ───────────────────────────────────────────── */
function Typewriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex, words]);

  return (
    <span className="text-gradient relative inline-block min-w-[12ch]">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[0.85em] bg-primary align-middle ml-1 rounded-sm"
      />
    </span>
  );
}

/* ── Floating shapes ──────────────────────────────────────── */
const floatingShapes = [
  { className: "top-28 right-[8%] w-20 h-20 border border-primary/60 dark:border-primary/40 rounded-xl", duration: 7, rotate: [0, 12, 0], delay: 0 },
  { className: "bottom-28 left-[8%] w-28 h-28 border border-accent/50 dark:border-accent/30 rounded-full", duration: 9, rotate: [0, -15, 0], delay: 1 },
  { className: "top-1/2 right-[3%] w-10 h-10 border border-blue-400/60 dark:border-blue-400/40 rounded-md rotate-45", duration: 5.5, rotate: [45, 80, 45], delay: 0.5 },
  { className: "top-[15%] left-[5%] w-14 h-14 border border-amber-400/45 dark:border-amber-400/25 rounded-full", duration: 11, rotate: [0, 30, 0], delay: 2 },
  { className: "bottom-[15%] right-[15%] w-8 h-8 bg-primary/20 dark:bg-primary/10 rounded-full", duration: 6, rotate: [0, 0, 0], delay: 0.8 },
  { className: "top-[35%] left-[12%] w-6 h-6 border border-emerald-400/50 dark:border-emerald-400/30 rounded-sm rotate-12", duration: 8, rotate: [12, 45, 12], delay: 1.5 },
];

/* ── Orbit ring ───────────────────────────────────────────── */
function OrbitRing() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block" style={{ contain: 'layout' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="w-[600px] h-[600px] border border-primary/20 dark:border-primary/10 rounded-full relative"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/70 dark:bg-primary/60 shadow-lg shadow-primary/40" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-accent/70 dark:bg-accent/60" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute inset-12 border border-accent/15 dark:border-accent/8 rounded-full"
      >
        <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400/70 dark:bg-blue-400/60" />
      </motion.div>
    </div>
  );
}

/* ── Mouse parallax blob ──────────────────────────────────── */
function ParallaxBlob({ color, size, baseX, baseY, depth }: {
  color: string; size: number; baseX: string; baseY: string; depth: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * depth;
      const dy = (e.clientY / window.innerHeight - 0.5) * depth;
      mouseX.set(dx);
      mouseY.set(dy);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY, depth]);

  return (
    <motion.div
      style={{ x: springX, y: springY, left: baseX, top: baseY, contain: 'layout style' }}
      className="absolute pointer-events-none rounded-full"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 6 + depth * 0.3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="rounded-full blur-[100px] opacity-45 dark:opacity-30"
        style={{ width: size, height: size, background: color }}
      />
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export function Hero({ data }: HeroProps) {
  const words = data?.typewriterWords || ["Extraordinary", "Unstoppable", "Transformative", "Legendary"];
  const stats = data?.stats || [
    { value: "50+", label: "Projects Delivered" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "5x", label: "Faster Delivery" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Particle field */}
      <ParticleCanvas />

      {/* Parallax blobs */}
      <ParallaxBlob color="#7c3aed" size={500} baseX="10%" baseY="15%" depth={40} />
      <ParallaxBlob color="#0ea5e9" size={400} baseX="55%" baseY="50%" depth={60} />
      <ParallaxBlob color="#f59e0b" size={300} baseX="70%" baseY="10%" depth={30} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orbit decorations */}
      <OrbitRing />

      {/* Floating geometry */}
      {floatingShapes.map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -18, 0], rotate: s.rotate }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          className={`absolute backdrop-blur-sm hidden lg:block ${s.className}`}
          style={{ contain: 'layout' }}
        />
      ))}

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center min-h-[60vh]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border border-primary/30 will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-accent"
          />
          <span className="text-sm font-medium tracking-wide">{data?.badgeText || "Transmuting Complexity Into Elegance"}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold max-w-5xl tracking-tight leading-[1.1] mb-8 will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          {data?.headlinePrefix || "We Build"}{" "}
          <Typewriter words={words} />{" "}
          <br className="hidden md:block" />
          {data?.headlineSuffix || "Digital Realities"}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          {data?.subheadline || "Like the ancient art of alchemy, we transform raw ideas into powerful, world-class software. Code meets mysticism. Engineering becomes magic."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20 min-h-[56px] will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          <motion.a
            href={data?.primaryCta?.href || "#contact"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-cta-primary"
            className="px-8 py-4 rounded-full bg-foreground text-background dark:bg-primary dark:text-primary-foreground font-semibold text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-2 group"
          >
            {data?.primaryCta?.text || "Initiate Project"}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
          <motion.a
            href={data?.secondaryCta?.href || "#services"}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-cta-secondary"
            className="px-8 py-4 rounded-full glass-card border border-white/20 font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            {data?.secondaryCta?.text || "Explore Services"}
          </motion.a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden min-h-[88px]"
          style={{ contain: 'layout' }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: "rgba(139,92,246,0.08)" }}
              className="px-6 py-4 text-center transition-colors"
            >
              <div className="text-2xl font-display font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
export default Hero;
