import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Code2, Sparkles, Layout, Container, Lightbulb, AppWindow } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  colorFrom?: string;
  colorTo?: string;
  border?: string;
}

interface Props {
  data?: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    services?: Service[];
  };
}

const IconMap: Record<string, React.ElementType> = {
  Code2,
  Sparkles,
  Layout,
  Container,
  Lightbulb,
  AppWindow,
};

const defaultServices: Service[] = [
  {
    icon: "Code2",
    title: "Scalable Software Solutions",
    description: "Highly available, enterprise-grade development engineered to handle massive scale. We build the robust backbones that power industry-leading platforms.",
    tags: ["Microservices", "High Availability", "Cloud Native"],
    colorFrom: "from-primary/20",
    colorTo: "to-primary/5",
    border: "border-primary/20",
  },
  {
    icon: "Sparkles",
    title: "AI Agent Development",
    description: "Custom AI automation that transforms business workflows. We implement autonomous systems that learn, adapt, and drive exponential productivity.",
    tags: ["LLM Integration", "Workflow Automation", "RAG Systems"],
    colorFrom: "from-accent/20",
    colorTo: "to-accent/5",
    border: "border-accent/20",
  },
  {
    icon: "AppWindow",
    title: "Custom Web Applications",
    description: "High-performance, complex web applications built with modern frameworks. We deliver intuitive, accessible, and blindingly fast frontend interfaces backed by robust APIs.",
    tags: ["React", "Next.js", "Astro", "Full-Stack"],
    colorFrom: "from-blue-500/20",
    colorTo: "to-blue-500/5",
    border: "border-blue-400/20",
  },
  {
    icon: "Container",
    title: "DevOps & Infrastructure",
    description: "End-to-end DevOps pipelines on cloud and on-premise. We design and operate resilient infrastructure with full observability, automation, and zero-downtime deployments.",
    tags: ["Kubernetes", "Terraform", "CI/CD", "Observability"],
    colorFrom: "from-emerald-500/20",
    colorTo: "to-emerald-500/5",
    border: "border-emerald-400/20",
  },
  {
    icon: "Lightbulb",
    title: "Solution Architecture",
    description: "Strategic consultation for cost-optimized, scalable, fault-tolerant, and highly available systems. We define architecture blueprints, deployment strategies, and technology roadmaps that scale with your ambitions.",
    tags: ["System Design", "Cost Optimization", "Cloud Architecture"],
    colorFrom: "from-amber-500/20",
    colorTo: "to-amber-500/5",
    border: "border-amber-400/20",
  },
];

const SpotlightCard = ({ service, index }: { service: Service; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const IconComponent = IconMap[service.icon] || Code2;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`glass-card p-8 rounded-3xl group relative overflow-hidden ${service.border} border h-full flex flex-col bg-background/40 backdrop-blur-sm`}
    >
      {/* Dynamic Glow Effect following the mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      
      {/* Background static gradient that appears on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.colorFrom} ${service.colorTo} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-black/[0.06] bg-black/[0.04] text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:border-white/10 dark:bg-white/5">
          <IconComponent className="h-6 w-6" />
        </div>
        
        <h3 className="text-xl font-bold mb-3 font-display group-hover:text-primary transition-colors">{service.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base flex-grow">
          {service.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {service.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium border border-black/[0.06] bg-foreground/5 text-muted-foreground transition-colors group-hover:bg-foreground/10 group-hover:text-foreground dark:border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Services({ data }: Props) {
  const services = data?.services || defaultServices;

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-widest uppercase text-primary mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            The Five Pillars of{" "}
            <span className="text-gradient">Transformation</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {data?.sectionSubtitle || "From code to cloud, from idea to production — we cover every dimension of modern software delivery with precision and craft."}
          </motion.p>
        </div>

        {/* Top row — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {services.slice(0, 3).map((service, index) => (
            <SpotlightCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom row — 2 wider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.slice(3).map((service, index) => (
            <SpotlightCard key={service.title} service={service} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
