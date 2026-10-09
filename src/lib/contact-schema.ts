import { z } from "zod"

import { BUDGET_IDS, PROJECT_TYPE_IDS } from "@/lib/constants"

export const contactFormSchema = z.object({
  projectType: z.enum(PROJECT_TYPE_IDS, {
    required_error: "Pick what you want to build",
  }),
  budget: z.enum(BUDGET_IDS, {
    required_error: "Pick a budget range",
  }),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().optional(),
  botcheck: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
