import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { ProjectTypeId } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AgentScene } from "./service-scenes/AgentScene";
import { WebAppScene } from "./service-scenes/WebAppScene";
import { CommerceScene } from "./service-scenes/CommerceScene";
import { PipelineScene } from "./service-scenes/PipelineScene";
import { BlueprintScene } from "./service-scenes/BlueprintScene";
import { useLoopKey } from "./service-scenes/useLoopKey";
import { EASE, type SceneProps } from "./service-scenes/scene-kit";

/* ── Data ───────────────────────────────────────────────── */

export type SceneId = "agent" | "webapp" | "commerce" | "pipeline" | "blueprint";

interface Service {
  label: string;
  headline: string;
  description: string;
  bestFor: string;
  tags: string[];
  projectType: ProjectTypeId;
  scene: SceneId;
}

interface Props {
  data?: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    services?: Service[];
  };
}

const SceneMap: Record<SceneId, ComponentType<SceneProps>> = {
  agent: AgentScene,
  webapp: WebAppScene,
  commerce: CommerceScene,
  pipeline: PipelineScene,
  blueprint: BlueprintScene,
};

const defaultServices: Service[] = [
  {
    label: "AI Agents & Automation",
    headline: "Put busywork on autopilot.",
    description:
      "AI agents that read your documents, answer your team, and run workflows inside Slack, Jira and your own tools.",
    bestFor: "Teams buried in tickets, docs and manual processes",
    tags: ["RAG", "Copilots", "Workflow Automation"],
    projectType: "ai-agent",
    scene: "agent",
  },
  {
    label: "Web Apps & Platforms",
    headline: "Software your customers love to use.",
    description:
      "Fast, reliable web apps, from first MVP to platforms serving millions.",
    bestFor: "SaaS products, dashboards, internal tools",
    tags: ["React / Next.js", "APIs", "Scalable Backends"],
    projectType: "web-app",
    scene: "webapp",
  },
  {
    label: "E-Commerce",
    headline: "Stores that sell, even on launch day.",
    description:
      "Headless storefronts that load in under a second and stay up during your biggest drops.",
    bestFor: "DTC brands and retailers outgrowing their platform",
    tags: ["Shopify Headless", "Edge Caching", "Personalisation"],
    projectType: "ecommerce",
    scene: "commerce",
  },
  {
    label: "Cloud & DevOps",
    headline: "Ship every day. Never go down.",
    description:
      "Automated pipelines and resilient infrastructure on any cloud or on-premise, with full monitoring.",
    bestFor: "Teams with slow releases or fragile servers",
    tags: ["Kubernetes", "Terraform", "CI/CD", "Observability"],
    projectType: "infra",
    scene: "pipeline",
  },
  {
    label: "Architecture & Strategy",
    headline: "The right plan before the first line of code.",
    description:
      "Senior architects map your system, cut cloud costs, and set a roadmap that scales.",
    bestFor: "Founders and CTOs facing a big technical decision",
    tags: ["System Design", "Cost Optimisation", "Roadmaps"],
    projectType: "other",
    scene: "blueprint",
  },
];

/* ── Helpers ────────────────────────────────────────────── */

declare global {
  interface Window {
    /* Bridge for the not-yet-hydrated contact island (client:visible). */
    __alchemyPendingService?: ProjectTypeId;
  }
}

/** True when the focused element shows a focus ring (i.e. keyboard-driven). */
function keyFocusable(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    typeof target.matches === "function" &&
    target.matches(":focus-visible")
  );
}

function talkAbout(projectType: ProjectTypeId) {
  // The contact form hydrates only when it scrolls into view, which happens
  // after this dispatch — the token survives until then.
  window.__alchemyPendingService = projectType;
  window.dispatchEvent(
    new CustomEvent("alchemy:select-service", { detail: projectType })
  );
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .querySelector("#contact")
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

function TalkLink({
  projectType,
  compact,
}: {
  projectType: ProjectTypeId;
  compact?: boolean;
}) {
  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        talkAbout(projectType);
      }}
      className={cn(
        "group/talk inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        compact ? "mt-3 text-sm" : "mt-4 text-sm"
      )}
    >
      Talk about this
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/talk:translate-x-1" />
    </a>
  );
}

function ServiceDetail({ service }: { service: Service }) {
  return (
    <>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <p className="mt-2.5 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Best for:</span>{" "}
        {service.bestFor}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/[0.06] bg-foreground/5 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground dark:border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
      <TalkLink projectType={service.projectType} />
    </>
  );
}

/* ── Component ──────────────────────────────────────────── */

export default function Services({ data }: Props) {
  const services = data?.services?.length ? data.services : defaultServices;
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  // Pause reasons are tracked separately so mouse and keyboard can never
  // overwrite each other through one shared flag.
  const [listHover, setListHover] = useState(false);
  const [keyFocus, setKeyFocus] = useState(false);
  const listActiveAt = useRef(0);

  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Deferred so the first client render matches SSR markup (no hydration mismatch
  // for reduced-motion users); flips immediately after mount.
  const prefersReduced = useReducedMotion() ?? false;
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(prefersReduced), [prefersReduced]);

  const inView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const advance = useCallback(
    () => setActive((i) => (i + 1) % services.length),
    [services.length]
  );

  // Engagement-based hover pause: the tab list pauses the loop only while the
  // pointer is actively moving over it, and resumes ~2s after it goes still.
  // Presence alone never pauses, so a cursor merely resting over the column
  // (or left behind when the page scrolls under it) can't freeze the carousel.
  useEffect(() => {
    if (!listHover) return;
    const id = window.setInterval(() => {
      if (performance.now() - listActiveAt.current > 2000) setListHover(false);
    }, 400);
    return () => window.clearInterval(id);
  }, [listHover]);

  const engageList = useCallback(() => {
    listActiveAt.current = performance.now();
    setListHover(true);
  }, []);

  const running = isDesktop && inView && !listHover && !keyFocus && !reduced;
  const clock = useLoopKey(6000, running, advance);
  const fadeOpacity = useTransform(clock.progress, (p) =>
    p > 14 / 15 ? (1 - p) * 15 : 1
  );

  const select = (i: number) => {
    setActive(i);
    clock.restart();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next: number | null = null;
    if (e.key === "ArrowDown") next = (i + 1) % services.length;
    else if (e.key === "ArrowUp") next = (i - 1 + services.length) % services.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = services.length - 1;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  // Scenes play their one-shot timeline on mount. Remount them (and reset the
  // loop clock) each time the section scrolls into view, so arriving visitors
  // always see the storyboard from the start instead of a finished frame.
  const [viewKey, setViewKey] = useState(0);
  const prevInView = useRef(inView);
  const { restart: restartClock } = clock;
  useEffect(() => {
    if (inView && !prevInView.current) {
      restartClock();
      setViewKey((k) => k + 1);
      // Arriving visitors always start on the first service, matching the
      // intended flow: scroll in → first tab plays → advances to the next.
      setActive(0);
    }
    if (!inView) {
      // The pointer/keyboard can leave the section while it is off-screen
      // without our handlers firing — drop stale pauses so the loop always
      // runs when the section scrolls back into view.
      setListHover(false);
      setKeyFocus(false);
    }
    prevInView.current = inView;
  }, [inView, restartClock]);

  const activeService = services[active];
  const ActiveScene = SceneMap[activeService.scene];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32"
    >
      <div className="container mx-auto px-6">
        {/* header */}
        <div className="mb-14 text-center lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary"
          >
            What we do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-display text-4xl font-bold md:text-5xl"
          >
            {data?.sectionTitle ?? (
              <>
                What we build <span className="text-gradient">for you</span>
              </>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            {data?.sectionSubtitle ||
              "Five ways we turn ideas into production software."}
          </motion.p>
        </div>

        {/* ── Desktop: list + stage ── */}
        <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Services"
            className="flex flex-col gap-2 self-start"
            onMouseMove={engageList}
            onWheel={engageList}
            onMouseLeave={() => setListHover(false)}
            onFocus={(e) => {
              // Pause only for keyboard-driven focus; a mouse click on a tab
              // focuses it too, but that must not freeze the loop.
              if (e.currentTarget.contains(e.target as Node) && keyFocusable(e.target)) {
                setKeyFocus(true);
              }
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setKeyFocus(false);
              }
            }}
          >
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={s.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`service-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="services-stage"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "relative cursor-pointer rounded-2xl border p-4 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "border-primary/30 bg-card/70 shadow-lg shadow-primary/5 backdrop-blur-sm"
                      : "border-transparent opacity-60 hover:opacity-90"
                  )}
                >
                  <div className="font-display text-lg font-bold leading-snug">
                    {s.label}
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 text-sm",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {s.headline}
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <ServiceDetail service={s} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isActive && !reduced && (
                    <motion.div
                      aria-hidden="true"
                      style={{ scaleX: clock.progress }}
                      className="absolute bottom-2 left-4 right-4 h-0.5 origin-left rounded-full bg-primary"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28 h-[520px] self-start">
            <div
              id="services-stage"
              role="tabpanel"
              aria-labelledby={`service-tab-${active}`}
              className="h-full"
            >
              <div className="h-full" aria-hidden="true">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeService.scene}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    // Short exit: at cycle end the scene has already faded to 0
                    // via the clock-driven `fade`, and a long mode="wait" exit
                    // would make every scene start behind the progress bar.
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.12, ease: EASE } }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="h-full"
                  >
                    <ActiveScene
                      key={`${activeService.scene}-${clock.key}`}
                      reduced={reduced}
                      fade={fadeOpacity}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile / tablet: accordion ── */}
        <div className="flex flex-col gap-3 lg:hidden">
          {services.map((s, i) => {
            const Scene = SceneMap[s.scene];
            const open = i === mobileOpen;
            return (
              <div
                key={s.label}
                className="glass-card overflow-hidden rounded-2xl bg-background/40"
              >
                <button
                  id={`service-m-tab-${i}`}
                  aria-expanded={open}
                  aria-controls={`service-m-panel-${i}`}
                  onClick={() => setMobileOpen(i)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-base font-bold leading-snug">
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {s.headline}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-muted-foreground"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`service-m-panel-${i}`}
                      role="region"
                      aria-labelledby={`service-m-tab-${i}`}
                      key="panel"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <div className="h-[280px]" aria-hidden="true">
                          <Scene
                            key={`${s.scene}-${viewKey}`}
                            reduced={reduced}
                            compact
                          />
                        </div>
                        <ServiceDetail service={s} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
