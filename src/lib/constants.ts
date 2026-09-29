export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || ""

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

export const SERVICE_OPTIONS = [
  { value: "", label: "Select a service" },
  { value: "Scalable Software Solutions", label: "Scalable Software Solutions" },
  { value: "AI Agent Development", label: "AI Agent Development" },
  { value: "Custom Web Applications", label: "Custom Web Applications" },
  { value: "DevOps & Infrastructure", label: "DevOps & Infrastructure" },
  { value: "Solution Architecture", label: "Solution Architecture" },
  { value: "other", label: "Other" },
] as const

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
