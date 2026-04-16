import React, { useState } from "react";
import { motion } from "framer-motion";

interface ContactProps {
  title?: string;
  subtitle?: string;
}

export function Contact({ title, subtitle }: ContactProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Integrate with your form backend (e.g., Formspree, Netlify Forms, or custom API)
    // For now, simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

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
              {title || <>Begin the <span className="text-gradient">Transformation</span></>}
            </motion.h2>
            <p className="text-lg text-muted-foreground">
              {subtitle || "Ready to transmute your vision into reality? Tell us about your project, and let's craft something legendary together."}
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-display mb-2">Transmission Received</h3>
              <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium ml-1">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-5 py-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium ml-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-5 py-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium ml-1">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="What are we building?"
                  className="w-full px-5 py-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Transmission"}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
