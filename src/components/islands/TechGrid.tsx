import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
// Tree-shaken imports - react-icons has sideEffects:false, so unused icons are removed in production
import {
  SiSpring, SiGo, SiPython, SiDjango, SiFastapi,
  SiNodedotjs, SiNestjs, SiExpress, SiTypescript, SiRust,
  SiReact, SiNextdotjs, SiAstro, SiSvelte, SiVite, SiTailwindcss, SiFramer,
  SiDocker, SiKubernetes, SiTerraform, SiAnsible, SiRedhat,
  SiGithubactions, SiJenkins, SiPrometheus, SiGrafana, SiLinux,
  SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiClaude, SiAnthropic, SiOpenai, SiLangchain, SiHuggingface,
  SiMistralai, SiOllama, SiReplicate, SiVercel,
  SiLanggraph, SiNvidia, SiPytorch, SiBun, SiPnpm,
  SiCloudflare, SiArgo, SiOpentelemetry, SiSupabase, SiPrisma, SiDrizzle,
} from "react-icons/si";

/* ── Custom SVG icons ───────────────────────────────────── */
function JavaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-full h-full"}>
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.159.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" />
    </svg>
  );
}

function McpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-full h-full"}>
      <circle cx="5" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="19" r="2.5" fill="currentColor" stroke="none" />
      <line x1="7.5" y1="11" x2="16.5" y2="6" />
      <line x1="7.5" y1="13" x2="16.5" y2="18" />
      <line x1="19" y1="7.5" x2="19" y2="16.5" strokeDasharray="2 2" />
    </svg>
  );
}

function MultiAgentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-full h-full"}>
      <circle cx="12" cy="4" r="2.5" opacity="0.9" />
      <circle cx="4" cy="18" r="2.5" opacity="0.9" />
      <circle cx="20" cy="18" r="2.5" opacity="0.9" />
      <circle cx="12" cy="12" r="2" opacity="0.6" />
      <line x1="12" y1="6.5" x2="12" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10.5" y1="13.5" x2="5.5" y2="16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13.5" y1="13.5" x2="18.5" y2="16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="6.5" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

/* ── Icon map ────────────────────────────────────────────── */
const iconMap: Record<string, React.ReactNode> = {
  "Claude": <SiClaude />,
  "MCP": <McpIcon />,
  "Multi-Agent": <MultiAgentIcon />,
  "LangChain": <SiLangchain />,
  "OpenAI": <SiOpenai />,
  "Anthropic": <SiAnthropic />,
  "Mistral AI": <SiMistralai />,
  "Hugging Face": <SiHuggingface />,
  "Ollama": <SiOllama />,
  "Replicate": <SiReplicate />,
  "React.js": <SiReact />,
  "Next.js": <SiNextdotjs />,
  "TypeScript": <SiTypescript />,
  "Tailwind CSS": <SiTailwindcss />,
  "Vite": <SiVite />,
  "SvelteKit": <SiSvelte />,
  "Astro.js": <SiAstro />,
  "Framer Motion": <SiFramer />,
  "Vercel": <SiVercel />,
  "Java": <JavaIcon />,
  "Spring Boot": <SiSpring />,
  "Go": <SiGo />,
  "Python": <SiPython />,
  "FastAPI": <SiFastapi />,
  "Django": <SiDjango />,
  "Node.js": <SiNodedotjs />,
  "NestJS": <SiNestjs />,
  "Express": <SiExpress />,
  "Rust": <SiRust />,
  "Docker": <SiDocker />,
  "Kubernetes": <SiKubernetes />,
  "Terraform": <SiTerraform />,
  "Ansible": <SiAnsible />,
  "Red Hat": <SiRedhat />,
  "GitHub Actions": <SiGithubactions />,
  "Jenkins": <SiJenkins />,
  "Prometheus": <SiPrometheus />,
  "Grafana": <SiGrafana />,
  "Linux": <SiLinux />,
  "PostgreSQL": <SiPostgresql />,
  "MongoDB": <SiMongodb />,
  "Redis": <SiRedis />,
  "MySQL": <SiMysql />,
  "LangGraph": <SiLanggraph />,
  "NVIDIA": <SiNvidia />,
  "PyTorch": <SiPytorch />,
  "Bun": <SiBun />,
  "pnpm": <SiPnpm />,
  "Cloudflare": <SiCloudflare />,
  "Argo CD": <SiArgo />,
  "OpenTelemetry": <SiOpentelemetry />,
  "Supabase": <SiSupabase />,
  "Prisma": <SiPrisma />,
  "Drizzle": <SiDrizzle />,
};

/* ── Category styles ─────────────────────────────────────── */
type Category = "ai" | "frontend" | "backend" | "devops" | "database";

const catStyle: Record<Category, { color: string; glow: string; label: string }> = {
  ai:       { color: "#a855f7", glow: "rgba(168,85,247,0.25)", label: "AI / ML" },
  frontend: { color: "#60a5fa", glow: "rgba(96,165,250,0.22)", label: "Frontend" },
  backend:  { color: "#34d399", glow: "rgba(52,211,153,0.22)", label: "Backend" },
  devops:   { color: "#fb923c", glow: "rgba(251,146,60,0.22)", label: "DevOps" },
  database: { color: "#facc15", glow: "rgba(250,204,21,0.22)", label: "Database" },
};

/* ── Props ──────────────────────────────────────────────── */
interface TechItem {
  name: string;
  color: string;
  category: Category;
}

interface TechGridProps {
  techStack: TechItem[];
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* ── Single tech card (plain DOM, CSS hover) ─────────────── */
const TechCard = React.memo(function TechCard({ tech, hidden }: { tech: TechItem; hidden: boolean }) {
  const cat = catStyle[tech.category];
  const icon = iconMap[tech.name] || <div className="w-4 h-4 rounded-full" style={{ background: tech.color }} />;

  return (
    <div
      data-name={tech.name}
      className={`tech-tile group relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border cursor-default overflow-hidden bg-white/60 dark:bg-white/5 border-black/[0.07] dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[translate,scale] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03]${hidden ? " hidden" : ""}`}
      style={{ minHeight: "96px" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: cat.color }}
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 50% 40%, ${cat.glow} 0%, transparent 70%)` }}
      />

      <div
        className="relative z-10 w-9 h-9 text-[2rem] flex items-center justify-center"
        style={{ color: tech.color }}
      >
        {icon}
      </div>

      <span className="relative z-10 text-[10px] font-semibold text-center text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-tight">
        {tech.name}
      </span>

      <div
        className="absolute bottom-2 right-2.5 w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"
        style={{ background: cat.color }}
      />
    </div>
  );
});

/* ── Main component ─────────────────────────────────────── */
type Filter = "all" | Category;

export function TechGrid({ techStack }: TechGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const prevRects = useRef<Map<string, DOMRect> | null>(null);
  const prevHeight = useRef<number | null>(null);
  const reduced = useRef(false);

  useLayoutEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: techStack.length };
    techStack.forEach((t) => {
      c[t.category] = (c[t.category] || 0) + 1;
    });
    return c;
  }, [techStack]);

  const filters: Filter[] = ["all", "ai", "frontend", "backend", "devops", "database"];

  const switchFilter = (next: Filter) => {
    if (next === filter) return;
    const grid = gridRef.current;
    if (grid) {
      const rects = new Map<string, DOMRect>();
      Array.from(grid.children).forEach((el) => {
        const node = el as HTMLElement;
        const rect = node.getBoundingClientRect();
        if (rect.width > 0) rects.set(node.dataset.name || "", rect);
      });
      prevRects.current = rects;
      prevHeight.current = grid.getBoundingClientRect().height;
    }
    setFilter(next);
  };

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || reduced.current) return;

    const first = prevRects.current;
    const firstH = prevHeight.current;
    prevRects.current = null;
    prevHeight.current = null;

    const nodes = Array.from(grid.children) as HTMLElement[];
    let entered = 0;

    nodes.forEach((el) => {
      if (el.classList.contains("hidden")) return;
      const name = el.dataset.name || "";
      const from = first?.get(name);
      const to = el.getBoundingClientRect();
      if (from) {
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        if (dx || dy) {
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
            { duration: 300, easing: EASE },
          );
        }
      } else {
        el.animate(
          [{ opacity: 0, transform: "scale(0.88)" }, { opacity: 1, transform: "scale(1)" }],
          { duration: 240, delay: Math.min(entered * 10, 120), easing: "ease-out", fill: "backwards" },
        );
        entered += 1;
      }
    });

    if (firstH != null) {
      const lastH = grid.getBoundingClientRect().height;
      if (firstH !== lastH) {
        grid.animate(
          [{ height: `${firstH}px` }, { height: `${lastH}px` }],
          { duration: 300, easing: EASE },
        );
      }
    }
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6" role="group" aria-label="Filter technologies by category">
        {filters.map((f) => {
          const active = filter === f;
          const color = f === "all" ? "#a78bfa" : catStyle[f].color;
          const label = f === "all" ? "All" : catStyle[f].label;
          return (
            <button
              key={f}
              type="button"
              onClick={() => switchFilter(f)}
              aria-pressed={active}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer border"
              style={{
                color: active ? color : "hsl(var(--muted-foreground))",
                background: active ? `${color}1a` : "hsl(var(--foreground) / 0.04)",
                borderColor: active ? `${color}55` : "hsl(var(--foreground) / 0.10)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full transition-transform duration-300"
                style={{ background: color, transform: active ? "scale(1.35)" : "scale(1)" }}
              />
              {label}
              <span className="tabular-nums opacity-60">{counts[f] || 0}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={gridRef}
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
          gridAutoRows: "96px",
        }}
      >
        {techStack.map((tech) => (
          <TechCard key={tech.name} tech={tech} hidden={filter !== "all" && tech.category !== filter} />
        ))}
      </div>
    </div>
  );
}

export default TechGrid;
