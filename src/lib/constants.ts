export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || ""

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

/* ── Multi-step contact flow ───────────────────────────── */

export const PROJECT_TYPE_IDS = [
  "web-app",
  "ai-agent",
  "ecommerce",
  "infra",
  "other",
] as const

export type ProjectTypeId = (typeof PROJECT_TYPE_IDS)[number]

export interface ProjectType {
  id: ProjectTypeId
  label: string
  desc: string
  icon: string
  /** Maps to the legacy `service` value sent with form submissions */
  service: string
  /** Base complexity contribution (1–5) for the live estimate */
  complexity: number
}

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: "web-app",
    label: "Web App / Platform",
    desc: "SaaS products, dashboards, internal tools",
    icon: "AppWindow",
    service: "Custom Web Applications",
    complexity: 3,
  },
  {
    id: "ai-agent",
    label: "AI Agent / Automation",
    desc: "RAG systems, copilots, autonomous workflows",
    icon: "Sparkles",
    service: "AI Agent Development",
    complexity: 4,
  },
  {
    id: "ecommerce",
    label: "E-Commerce / Storefront",
    desc: "Headless commerce built to survive launch spikes",
    icon: "ShoppingBag",
    service: "Custom Web Applications",
    complexity: 3,
  },
  {
    id: "infra",
    label: "Cloud / DevOps",
    desc: "Kubernetes, CI/CD, observability, migrations",
    icon: "Container",
    service: "DevOps & Infrastructure",
    complexity: 3,
  },
  {
    id: "other",
    label: "Something else",
    desc: "Not sure yet — help me scope it",
    icon: "Compass",
    service: "Solution Architecture",
    complexity: 2,
  },
]

export const BUDGET_IDS = ["s", "m", "l", "xl", "unsure"] as const

export type BudgetId = (typeof BUDGET_IDS)[number]

export interface BudgetOption {
  id: BudgetId
  label: string
  note: string
  /** Scope adjustment applied to the complexity estimate */
  scope: number
}

export const BUDGETS: BudgetOption[] = [
  { id: "s", label: "< $25k", note: "MVP / proof of concept", scope: -1 },
  { id: "m", label: "$25k – $75k", note: "Production product", scope: 0 },
  { id: "l", label: "$75k – $150k", note: "Scaled platform", scope: 1 },
  { id: "xl", label: "$150k+", note: "Enterprise program", scope: 2 },
  { id: "unsure", label: "Not sure yet", note: "Guide me", scope: 0 },
]

export const COMPLEXITY_LEVELS = [
  { score: 1, label: "Focused", timeline: "4–6 wks" },
  { score: 2, label: "Moderate", timeline: "6–9 wks" },
  { score: 3, label: "Substantial", timeline: "9–12 wks" },
  { score: 4, label: "Complex", timeline: "12–16 wks" },
  { score: 5, label: "Ambitious", timeline: "16+ wks" },
] as const

export function estimateComplexity(
  typeId: ProjectTypeId | "",
  budgetId: BudgetId | "",
): number {
  if (!typeId) return 0
  const type = PROJECT_TYPES.find((t) => t.id === typeId)
  const budget = BUDGETS.find((b) => b.id === budgetId)
  const base = type?.complexity ?? 3
  const scope = budget?.scope ?? 0
  return Math.min(5, Math.max(1, base + scope))
}

export function complexityMeta(score: number) {
  return COMPLEXITY_LEVELS.find((l) => l.score === score) ?? COMPLEXITY_LEVELS[0]
}

export const CONTACT_EMAIL = "hello@alchemysolution.org"
export const CONTACT_PHONE = "+880 1340-993493"

// wa.me expects digits only — no "+", spaces or dashes
export const WHATSAPP_NUMBER = "8801340993493"
export const WHATSAPP_GREETING =
  "Hi Alchemy! I found you through your website and I'd like to talk about a project."

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

// Zoho Calendar appointment booking page (public link). Override with PUBLIC_BOOKING_URL.
export const BOOKING_URL: string =
  import.meta.env.PUBLIC_BOOKING_URL ||
  "https://calendar.zoho.com/zc/view/slot-booking/0801123ca7af85696ccdf8c800e256ea0000c1ba5c1174889cda290a36ecbeaf404033181a6b72a9060a812a144e0aad38aaf25e335a6998f66bed91a63267b3"
