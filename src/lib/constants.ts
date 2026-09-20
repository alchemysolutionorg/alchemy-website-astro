export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || ""

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

export const SERVICE_OPTIONS = [
  { value: "", label: "Select a service" },
  { value: "Scalable Software Solutions", label: "Scalable Software Solutions" },
  { value: "AI Agent Development", label: "AI Agent Development" },
  { value: "Modern Web Design", label: "Modern Web Design" },
  { value: "DevOps & Infrastructure", label: "DevOps & Infrastructure" },
  { value: "Solution Architecture", label: "Solution Architecture" },
  { value: "other", label: "Other" },
] as const
