import React from "react";
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
} from "react-icons/si";
import { motion } from "framer-motion";

/* ── Custom SVG icons ───────────────────────────────────── */
function JavaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-full h-full"}>
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" />
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
};

/* ── Category styles ─────────────────────────────────────── */
type Category = "ai" | "frontend" | "backend" | "devops" | "database";

const catStyle: Record<Category, { color: string; glow: string }> = {
  ai:       { color: "#a855f7", glow: "rgba(168,85,247,0.25)" },
  frontend: { color: "#60a5fa", glow: "rgba(96,165,250,0.22)" },
  backend:  { color: "#34d399", glow: "rgba(52,211,153,0.22)" },
  devops:   { color: "#fb923c", glow: "rgba(251,146,60,0.22)" },
  database: { color: "#facc15", glow: "rgba(250,204,21,0.22)" },
};

/* ── Props ───────────────────────────────────────────────── */
interface TechItem {
  name: string;
  color: string;
  category: Category;
}

interface TechGridProps {
  techStack: TechItem[];
}

/* ── Single tech card ───────────────────────────────────── */
function TechCard({ tech, index }: { tech: TechItem; index: number }) {
  const cat = catStyle[tech.category];
  const icon = iconMap[tech.name] || <div className="w-4 h-4 rounded-full" style={{ background: tech.color }} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.022, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.04, transition: { duration: 0.18 } }}
      className="group relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl glass-card border border-white/8 cursor-default overflow-hidden"
      style={{ minHeight: "96px" }}
    >
      {/* Category accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: cat.color }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(circle at 50% 40%, ${cat.glow} 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="relative z-10 w-9 h-9 text-[2rem] flex items-center justify-center transition-all duration-300"
        style={{ color: tech.color }}
      >
        <motion.div
          className="w-full h-full flex items-center justify-center"
          whileHover={{ filter: `drop-shadow(0 0 10px ${tech.color}99)` }}
        >
          {icon}
        </motion.div>
      </div>

      {/* Name */}
      <span className="relative z-10 text-[10px] font-semibold text-center text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-tight">
        {tech.name}
      </span>

      {/* Category dot */}
      <div
        className="absolute bottom-2 right-2.5 w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"
        style={{ background: cat.color }}
      />
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export function TechGrid({ techStack }: TechGridProps) {
  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
        gridAutoRows: "96px",
      }}
    >
      {techStack.map((tech, i) => (
        <TechCard key={tech.name} tech={tech} index={i} />
      ))}
    </div>
  );
}

export default TechGrid;