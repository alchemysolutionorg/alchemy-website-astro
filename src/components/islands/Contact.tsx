import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Loader2, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema"
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT, SERVICE_OPTIONS } from "@/lib/constants"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

interface ContactProps {
  title?: string
  subtitle?: string
}

const inputStyle =
  "w-full px-5 py-4 rounded-xl bg-background/50 border outline-none transition-all"

function inputBorder(error: boolean) {
  return error
    ? "border-destructive/50 focus:border-destructive focus:ring-1 focus:ring-destructive"
    : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
}

export function Contact({ title, subtitle }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      service: "",
      botcheck: "",
    },
  })

  async function onSubmit(values: ContactFormValues) {
    if (!WEB3FORMS_ACCESS_KEY) {
      toast.info(
        "Form is not yet connected. Set PUBLIC_WEB3FORMS_ACCESS_KEY in your environment.",
      )
      setIsSubmitting(true)
      await new Promise((r) => setTimeout(r, 1000))
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
          ...values,
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
    setSubmitted(false)
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-16 rounded-3xl shadow-2xl">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
              {title || (
                <>
                  Begin the{" "}
                  <span className="text-gradient">Transformation</span>
                </>
              )}
            </motion.h2>
            <p className="text-lg text-muted-foreground">
              {subtitle ||
                "Ready to transmute your vision into reality? Tell us about your project, and let's craft something legendary together."}
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <motion.div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold font-display mb-2">
                  Transmission Received
                </h3>
                <p className="text-muted-foreground">
                  We'll be in touch within 24 hours.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <Form {...form}>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
              >
                {/* Honeypot — hidden from users, bots fill it */}
                <div className="hidden" aria-hidden="true">
                  <FormField
                    control={form.control}
                    name="botcheck"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input {...field} tabIndex={-1} autoComplete="off" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="ml-1">Name</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            placeholder="Your Name"
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
                            type="email"
                            placeholder="you@company.com"
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
                  name="service"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="ml-1">
                        Service Interested In
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className={cn(
                            inputStyle,
                            inputBorder(!!fieldState.error),
                            "appearance-none",
                          )}
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="ml-1">
                        Project Details
                      </FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={4}
                          placeholder="What are we building?"
                          className={cn(
                            inputStyle,
                            inputBorder(!!fieldState.error),
                            "resize-none",
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Transmission"
                  )}
                </button>
              </motion.form>
            </Form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
