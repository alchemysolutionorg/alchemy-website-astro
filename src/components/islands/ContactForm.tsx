import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { toast } from "sonner"
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Compass,
  Container,
  Loader2,
  ShoppingBag,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema"
import {
  BOOKING_URL,
  BUDGETS,
  PROJECT_TYPES,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  complexityMeta,
  estimateComplexity,
  type BudgetId,
  type ProjectTypeId,
} from "@/lib/constants"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

/* ── Icons ──────────────────────────────────────────────── */
const IconMap: Record<string, React.ElementType> = {
  AppWindow,
  Sparkles,
  ShoppingBag,
  Container,
  Compass,
}

const TOTAL_STEPS = 3
const EASE = [0.22, 1, 0.36, 1] as const

const inputStyle =
  "w-full px-5 py-4 rounded-xl bg-black/[0.03] dark:bg-background/50 border outline-none transition-all"

function inputBorder(error: boolean) {
  return error
    ? "border-destructive/50 focus:border-destructive focus:ring-1 focus:ring-destructive"
    : "border-black/10 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
}

/* ── Pointer spotlight (CSS-var driven, no React re-render) ── */
function spotlight(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty("--sx", `${e.clientX - r.left}px`)
  el.style.setProperty("--sy", `${e.clientY - r.top}px`)
}

/* ── Step transition variants ───────────────────────────── */
const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 44 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -44 }),
}

interface ContactFormProps {
  title?: string
  subtitle?: string
}

export function ContactForm({ title, subtitle }: ContactFormProps) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const advanceTimer = useRef<number | undefined>(undefined)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      botcheck: "",
    },
  })

  const projectType = form.watch("projectType")
  const budget = form.watch("budget")
  const score = estimateComplexity(projectType ?? "", budget ?? "")

  useEffect(() => () => window.clearTimeout(advanceTimer.current), [])

  // Move focus to the step heading for screen-reader + keyboard users
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [step])

  function goto(next: number) {
    window.clearTimeout(advanceTimer.current)
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  function scheduleAdvance(to: number) {
    window.clearTimeout(advanceTimer.current)
    advanceTimer.current = window.setTimeout(() => goto(to), 340)
  }

  function chooseType(id: ProjectTypeId) {
    form.setValue("projectType", id, { shouldValidate: true })
    scheduleAdvance(2)
  }

  function chooseBudget(id: BudgetId) {
    form.setValue("budget", id, { shouldValidate: true })
    scheduleAdvance(3)
  }

  async function onSubmit(values: ContactFormValues) {
    const type = PROJECT_TYPES.find((t) => t.id === values.projectType)
    const budgetOpt = BUDGETS.find((b) => b.id === values.budget)
    const meta = complexityMeta(score)
    const summary = `${type?.label ?? ""} · ${budgetOpt?.label ?? ""} · est. ${meta.timeline}`

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.info(
        "Form is not yet connected. Set PUBLIC_WEB3FORMS_ACCESS_KEY in your environment.",
      )
      setIsSubmitting(true)
      await new Promise((r) => setTimeout(r, 900))
      setSubmitted(true)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: values.name,
          email: values.email,
          company: values.company || "",
          message: values.message || summary,
          service: type?.service || "",
          project_type: type?.label || "",
          budget: budgetOpt?.label || "",
          estimate: `${meta.label} · ${meta.timeline}`,
          botcheck: values.botcheck || "",
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        toast.success("Message sent successfully! We'll be in touch.")
      } else {
        toast.error(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleReset() {
    form.reset()
    setStep(1)
    setDirection(1)
    setSubmitted(false)
  }

  const typeMeta = PROJECT_TYPES.find((t) => t.id === projectType)
  const budgetMeta = BUDGETS.find((b) => b.id === budget)
  const meta = complexityMeta(score)

  return (
    <MotionConfig reducedMotion="user">
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[320px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <style>{`
          .cf-card { position: relative; overflow: hidden; }
          .cf-card > .cf-spot {
            position: absolute; inset: 0; opacity: 0; pointer-events: none;
            transition: opacity 0.3s ease;
            background: radial-gradient(320px circle at var(--sx, 50%) var(--sy, 50%), rgba(255,255,255,0.07), transparent 45%);
          }
          .cf-card:hover > .cf-spot { opacity: 1; }
          @media (prefers-reduced-motion: reduce) {
            .cf-card > .cf-spot { transition: none; }
          }
        `}</style>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-widest uppercase text-primary mb-4"
            >
              Start a Project
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              {title || (
                <>
                  Begin the <span className="text-gradient">Transformation</span>
                </>
              )}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {subtitle ||
                "Three quick questions. No forms-walls, no jargon — tell us what you're dreaming up and we'll map the fastest route to shipping it."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-5xl mx-auto"
          >
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/30">
              {submitted ? (
                <SuccessPanel onReset={handleReset} />
              ) : (
                <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
                  {/* ── Steps ── */}
                  <div className="p-6 sm:p-10 lg:p-12">
                    {/* progress */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(
                          (n) => (
                            <span
                              key={n}
                              className={cn(
                                "h-1 w-9 rounded-full overflow-hidden bg-black/10 dark:bg-white/10",
                              )}
                            >
                              <span
                                className={cn(
                                  "block h-full w-full origin-left rounded-full transition-transform duration-500 ease-out",
                                  n <= step
                                    ? "scale-x-100 bg-gradient-to-r from-primary to-accent"
                                    : "scale-x-0",
                                )}
                              />
                            </span>
                          ),
                        )}
                      </div>
                      <span className="font-mono text-xs text-muted-foreground tabular-nums tracking-widest">
                        STEP {step} / {TOTAL_STEPS}
                      </span>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                        <AnimatePresence mode="wait" custom={direction} initial={false}>
                          <motion.div
                            key={step}
                            custom={direction}
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.32, ease: EASE }}
                            className="min-h-[380px] sm:min-h-[400px]"
                          >
                            {step === 1 && (
                              <StepShell
                                headingRef={headingRef}
                                eyebrow="The vision"
                                title="What are you looking to build?"
                                hint="Pick the closest match — we'll refine the details together."
                              >
                                <div className="grid sm:grid-cols-2 gap-3">
                                  {PROJECT_TYPES.map((t, i) => {
                                    const Icon = IconMap[t.icon] || AppWindow
                                    const selected = projectType === t.id
                                    return (
                                      <button
                                        key={t.id}
                                        type="button"
                                        data-testid={`cf-option-${t.id}`}
                                        onPointerMove={spotlight}
                                        onClick={() => chooseType(t.id)}
                                        aria-pressed={selected}
                                        className={cn(
                                          "cf-card group text-left rounded-2xl border p-5 outline-none transition-[border-color,background-color,transform,box-shadow] duration-200",
                                          "hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary",
                                          i === PROJECT_TYPES.length - 1 &&
                                            "sm:col-span-2",
                                          selected
                                            ? "border-primary/60 bg-primary/10 shadow-lg shadow-primary/10"
                                            : "border-black/[0.08] bg-black/[0.02] hover:border-black/20 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25",
                                        )}
                                      >
                                        <span className="cf-spot" aria-hidden="true" />
                                        <span className="relative z-10 flex items-start gap-4">
                                          <span
                                            className={cn(
                                              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors",
                                              selected
                                                ? "bg-primary/20 border-primary/40 text-primary"
                                                : "bg-black/[0.04] border-black/[0.08] text-muted-foreground group-hover:text-primary dark:bg-white/5 dark:border-white/10",
                                            )}
                                          >
                                            <Icon className="h-5 w-5" />
                                          </span>
                                          <span className="min-w-0 flex-1">
                                            <span className="flex items-center justify-between gap-2">
                                              <span className="font-display font-bold text-base">
                                                {t.label}
                                              </span>
                                              <span
                                                className={cn(
                                                  "flex h-5 w-5 items-center justify-center rounded-full border transition-[opacity,transform] duration-200",
                                                  selected
                                                    ? "bg-primary border-primary text-primary-foreground scale-100 opacity-100"
                                                    : "border-black/20 dark:border-white/20 scale-75 opacity-0",
                                                )}
                                                aria-hidden="true"
                                              >
                                                <Check className="h-3 w-3" />
                                              </span>
                                            </span>
                                            <span className="mt-1 block text-sm text-muted-foreground">
                                              {t.desc}
                                            </span>
                                          </span>
                                        </span>
                                      </button>
                                    )
                                  })}
                                </div>
                              </StepShell>
                            )}

                            {step === 2 && (
                              <StepShell
                                headingRef={headingRef}
                                eyebrow="The scale"
                                title="What is the scale of this project?"
                                hint="This helps us understand the scope and the team required."
                              >
                                <div className="grid gap-3">
                                  {BUDGETS.map((b) => {
                                    const selected = budget === b.id
                                    return (
                                      <button
                                        key={b.id}
                                        type="button"
                                        data-testid={`cf-budget-${b.id}`}
                                        onPointerMove={spotlight}
                                        onClick={() => chooseBudget(b.id)}
                                        aria-pressed={selected}
                                        className={cn(
                                          "cf-card group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left outline-none transition-[border-color,background-color,transform] duration-200",
                                          "hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary",
                                          selected
                                            ? "border-primary/60 bg-primary/10"
                                            : "border-black/[0.08] bg-black/[0.02] hover:border-black/20 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25",
                                        )}
                                      >
                                        <span className="cf-spot" aria-hidden="true" />
                                        <span className="relative z-10 flex items-center gap-4">
                                          <span
                                            className={cn(
                                              "font-display font-bold text-lg tabular-nums",
                                              selected ? "text-primary" : "text-foreground",
                                            )}
                                          >
                                            {b.label}
                                          </span>
                                          <span className="text-sm text-muted-foreground">
                                            {b.note}
                                          </span>
                                        </span>
                                        <span
                                          className={cn(
                                            "relative z-10 h-4 w-4 shrink-0 rounded-full border transition-colors",
                                            selected
                                              ? "border-primary bg-primary shadow-[0_0_0_4px] shadow-primary/20"
                                              : "border-black/25 group-hover:border-black/50 dark:border-white/25 dark:group-hover:border-white/50",
                                          )}
                                          aria-hidden="true"
                                        />
                                      </button>
                                    )
                                  })}
                                </div>
                              </StepShell>
                            )}

                            {step === 3 && (
                              <StepShell
                                headingRef={headingRef}
                                eyebrow="The handoff"
                                title="Where should we send the plan?"
                                hint="We reply within one business day with next steps."
                              >
                                <div className="space-y-5">
                                  <div className="grid sm:grid-cols-2 gap-5">
                                    <FormField
                                      control={form.control}
                                      name="name"
                                      render={({ field, fieldState }) => (
                                        <FormItem>
                                          <FormLabel className="ml-1">Name</FormLabel>
                                          <FormControl>
                                            <input
                                              {...field}
                                              data-testid="cf-name"
                                              placeholder="Your name"
                                              autoComplete="name"
                                              className={cn(
                                                inputStyle,
                                                inputBorder(!!fieldState.error),
                                              )}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={form.control}
                                      name="email"
                                      render={({ field, fieldState }) => (
                                        <FormItem>
                                          <FormLabel className="ml-1">Email</FormLabel>
                                          <FormControl>
                                            <input
                                              {...field}
                                              data-testid="cf-email"
                                              type="email"
                                              placeholder="you@company.com"
                                              autoComplete="email"
                                              className={cn(
                                                inputStyle,
                                                inputBorder(!!fieldState.error),
                                              )}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>

                                  <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="ml-1">
                                          Company <span className="text-muted-foreground font-normal">(optional)</span>
                                        </FormLabel>
                                        <FormControl>
                                          <input
                                            {...field}
                                            data-testid="cf-company"
                                            placeholder="Acme Inc."
                                            autoComplete="organization"
                                            className={cn(inputStyle, inputBorder(false))}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="ml-1">
                                          Anything else? <span className="text-muted-foreground font-normal">(optional)</span>
                                        </FormLabel>
                                        <FormControl>
                                          <textarea
                                            {...field}
                                            data-testid="cf-message"
                                            rows={3}
                                            placeholder="Timelines, constraints, references — whatever helps."
                                            className={cn(
                                              inputStyle,
                                              inputBorder(false),
                                              "resize-none",
                                            )}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {/* Honeypot — hidden from users, bots fill it */}
                                  <div className="hidden" aria-hidden="true">
                                    <FormField
                                      control={form.control}
                                      name="botcheck"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <input
                                              {...field}
                                              tabIndex={-1}
                                              autoComplete="off"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>

                                  <button
                                    type="submit"
                                    data-testid="cf-submit"
                                    disabled={isSubmitting}
                                    className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {isSubmitting ? (
                                      <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Sending…
                                      </>
                                    ) : (
                                      <>
                                        Send my project brief
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                      </>
                                    )}
                                  </button>
                                </div>
                              </StepShell>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* footer nav */}
                        <div className="mt-8 flex items-center justify-between gap-4">
                          {step > 1 ? (
                            <button
                              type="button"
                              data-testid="cf-back"
                              onClick={() => goto(step - 1)}
                              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              <ArrowLeft className="h-4 w-4" />
                              Back
                            </button>
                          ) : (
                            <span />
                          )}

                          {step < 3 && (
                            <span className="text-sm text-muted-foreground">
                              Select an option to continue
                            </span>
                          )}
                        </div>
                      </form>
                    </Form>
                  </div>

                  {/* ── Live estimate ── */}
                  <aside className="border-t lg:border-t-0 lg:border-l border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Live estimate
                      </span>
                    </div>

                    <div className="font-display text-xl font-bold mb-6">
                      {score ? meta.label : "Awaiting inputs"}
                    </div>

                    <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span>Complexity</span>
                      <span className="tabular-nums">{score}/5</span>
                    </div>
                    <div className="mb-6 flex gap-1.5" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                        <span
                          key={n}
                          className="h-2 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10"
                        >
                          <span
                            className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-primary to-accent transition-transform duration-500 ease-out"
                            style={{ transform: `scaleX(${score >= n ? 1 : 0})` }}
                          />
                        </span>
                      ))}
                    </div>

                    <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Time to market
                    </div>
                    <div className="font-display text-3xl font-black">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={score || "none"}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.28, ease: EASE }}
                          className="inline-block text-gradient"
                        >
                          {score ? meta.timeline : "—"}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="my-6 h-px bg-black/[0.08] dark:bg-white/10" />

                    <dl className="space-y-3 text-sm">
                      <div className="flex items-start justify-between gap-3">
                        <dt className="text-muted-foreground">Build</dt>
                        <dd className="text-right font-medium">
                          {typeMeta ? typeMeta.label : "—"}
                        </dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="text-muted-foreground">Scale</dt>
                        <dd className="text-right font-medium">
                          {budgetMeta ? budgetMeta.label : "—"}
                        </dd>
                      </div>
                    </dl>

                    <p
                      className="mt-6 text-xs leading-relaxed text-muted-foreground"
                      aria-live="polite"
                    >
                      {score
                        ? `Rough guide: ${/^[aeiou]/i.test(meta.label) ? "an" : "a"} ${meta.label.toLowerCase()} build, ~${meta.timeline} to market. Final scope is confirmed on a free discovery call.`
                        : "Rough guide only — pick an option and watch this update. Final scope is confirmed on a free discovery call."}
                    </p>
                  </aside>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}

/* ── Step wrapper ───────────────────────────────────────── */
interface StepShellProps {
  eyebrow: string
  title: string
  hint: string
  headingRef: React.RefObject<HTMLHeadingElement | null>
  children: React.ReactNode
}

function StepShell({ eyebrow, title, hint, headingRef, children }: StepShellProps) {
  return (
    <div>
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
          {eyebrow}
        </p>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl md:text-3xl font-display font-bold outline-none"
        >
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  )
}

/* ── Success panel ──────────────────────────────────────── */
function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-16 px-8 space-y-6"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
        className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center"
      >
        <CheckCircle2 className="w-8 h-8 text-primary" />
      </motion.div>
      <div>
        <h3 className="text-2xl font-bold font-display mb-2">Transmission Received</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your brief is in. We'll be in touch within one business day with a plan and a
          discovery-call slot.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Send Another Message
        </button>
        {BOOKING_URL && (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] font-medium hover:border-primary/40 hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Book a call now
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default ContactForm
