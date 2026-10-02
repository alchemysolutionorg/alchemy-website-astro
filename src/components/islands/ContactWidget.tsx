import { useEffect, useId, useRef, useState } from "react"
import { CalendarDays, ChevronRight, MessageCircle, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  WHATSAPP_GREETING,
  whatsappUrl,
} from "@/lib/constants"

/* ── WhatsApp logo (same path as Footer.astro) ───────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ── Option row ──────────────────────────────────────────── */
interface OptionProps {
  href: string
  icon: React.ReactNode
  iconClass: string
  title: string
  subtitle: string
  external?: boolean
  onSelect?: () => void
}

function Option({ href, icon, iconClass, title, subtitle, external, onSelect }: OptionProps) {
  return (
    <a
      href={href}
      onClick={onSelect}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-xl border border-border bg-background/60 p-3.5 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-lg", iconClass)}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-foreground">{title}</span>
        <span className="block text-sm text-muted-foreground">{subtitle}</span>
      </span>
      <ChevronRight
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        aria-hidden="true"
      />
    </a>
  )
}

/* ── Widget ──────────────────────────────────────────────── */
export function ContactWidget() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const panelId = useId()
  const titleId = useId()

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches)
    const t = window.setTimeout(() => setMounted(true), 600)
    return () => window.clearTimeout(t)
  }, [])

  // Escape + outside click close the card
  useEffect(() => {
    if (!open) return

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    function onPointer(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open])

  // Move focus into the card when it opens
  useEffect(() => {
    if (!open) return
    // Wait a frame so React has removed `inert` before we focus
    const raf = requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("a")?.focus(),
    )
    return () => cancelAnimationFrame(raf)
  }, [open])

  const close = () => setOpen(false)

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6",
        "transition-[opacity,transform] duration-500 motion-reduce:transition-none",
        mounted ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      {/* Card */}
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        inert={!open}
        className={cn(
          "absolute bottom-full right-0 mb-3 w-[calc(100vw-2rem)] max-w-[360px] origin-bottom-right overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/30",
          "duration-200 ease-out motion-reduce:transition-none",
          // Visibility flips instantly on open (so focus can land), but is
          // transitioned on close so the fade-out stays visible
          open
            ? "visible translate-y-0 scale-100 opacity-100 transition-[opacity,transform]"
            : "invisible translate-y-3 scale-95 opacity-0 transition-[opacity,transform,visibility]",
        )}
      >
        <div className="relative bg-gradient-to-br from-primary/25 via-primary/10 to-transparent px-5 pb-4 pt-5">
          <button
            type="button"
            onClick={() => {
              close()
              buttonRef.current?.focus()
            }}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 id={titleId} className="font-display text-lg font-bold">
            Talk to Alchemy
          </h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
            We usually reply within a few hours
          </p>
        </div>

        <div className="space-y-2.5 p-4">
          <Option
            href={whatsappUrl(WHATSAPP_GREETING)}
            external={!isTouch}
            onSelect={close}
            icon={<WhatsAppIcon className="h-5 w-5" />}
            iconClass="bg-green-500/15 text-green-500"
            title="Chat on WhatsApp"
            subtitle="Quick questions, fast replies"
          />
          <Option
            href="/#contact"
            onSelect={close}
            icon={<MessageCircle className="h-5 w-5" />}
            iconClass="bg-accent/15 text-accent"
            title="Send us a message"
            subtitle="Tell us about your project"
          />
          {BOOKING_URL && (
            <Option
              href={BOOKING_URL}
              external
              onSelect={close}
              icon={<CalendarDays className="h-5 w-5" />}
              iconClass="bg-primary/15 text-primary"
              title="Book a 30-min call"
              subtitle="Pick a time that suits you"
            />
          )}
        </div>

        <p className="border-t border-border px-5 py-3 text-center text-sm text-muted-foreground">
          or email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>

      {/* Floating button */}
      <div className="group relative flex items-center">
        <span
          className={cn(
            "pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium shadow-lg md:block",
            "translate-x-1 opacity-0 transition-[opacity,transform] duration-200",
            !open && "group-hover:translate-x-0 group-hover:opacity-100",
          )}
          aria-hidden="true"
        >
          Chat with us
        </span>

        {/* One-time attention ring */}
        {mounted && !open && (
          <span
            className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-[ping_1.5s_ease-out_2] motion-reduce:hidden"
            aria-hidden="true"
          />
        )}

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close contact options" : "Contact us"}
          aria-expanded={open}
          aria-controls={panelId}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/40 transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          <MessageCircle
            className={cn(
              "absolute h-6 w-6 transition-[opacity,transform] duration-200",
              open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
            )}
            aria-hidden="true"
          />
          <X
            className={cn(
              "absolute h-6 w-6 transition-[opacity,transform] duration-200",
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
            )}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  )
}

export default ContactWidget
