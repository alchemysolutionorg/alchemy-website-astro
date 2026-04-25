import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactProps {
  data?: {
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    successMessage?: string;
    submitButtonText?: string;
    submittingButtonText?: string;
    whatsappNumber?: string;
    whatsappName?: string;
  };
}

type FormFields = {
  name: string;
  phone: string;
  company: string;
  email: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;
type TouchedFields = Partial<Record<keyof FormFields, boolean>>;

const SERVICE_OPTIONS = [
  'Web Design & Development',
  'Mobile App Development',
  'UI/UX Design',
  'Brand Identity',
  'SEO & Digital Marketing',
  'Consulting',
  'Other'
];

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.name.trim()) {
    errors.name = 'Name is required.';
  } else if (fields.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^\d{6,15}$/.test(fields.phone.replace(/\s/g, ''))) {
    errors.phone = 'Enter a valid phone number (6–15 digits).';
  }

  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!fields.service) {
    errors.service = 'Please select a service.';
  }

  if (!fields.message.trim()) {
    errors.message = 'Please tell us about your project.';
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className='text-xs text-red-400 mt-1 ml-1 flex items-center gap-1'
        >
          <svg
            className='w-3 h-3 flex-shrink-0'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function Contact({ data }: ContactProps) {
  const title = data?.title || 'Begin the Transformation';
  const titleHighlight = data?.titleHighlight || 'Transformation';
  const subtitle =
    data?.subtitle ||
    "Ready to transmute your vision into reality? Tell us about your project, and let's craft something legendary together.";
  const successMessage =
    data?.successMessage ||
    "Transmission Received\nWe'll be in touch within 24 hours.";
  const submitButtonText = data?.submitButtonText || "Let's talk business";
  const submittingButtonText = data?.submittingButtonText || 'Sending...';
  const whatsappNumber = data?.whatsappNumber || '1234567890';
  const whatsappName = data?.whatsappName || 'Ships Lim';

  const [formState, setFormState] = useState<FormFields>({
    name: '',
    phone: '',
    company: '',
    email: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const successLines = successMessage.split('\n');
  const successTitle = successLines[0] || 'Transmission Received';
  const successSubtitle =
    successLines.slice(1).join('\n') || "We'll be in touch within 24 hours.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  function handleChange(field: keyof FormFields, value: string) {
    const updated = { ...formState, [field]: value };
    setFormState(updated);
    if (touched[field]) {
      const newErrors = validate(updated);
      setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
    }
  }

  function handleBlur(field: keyof FormFields) {
    setTouched(prev => ({ ...prev, [field]: true }));
    const newErrors = validate(formState);
    setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const allTouched: TouchedFields = Object.fromEntries(
      Object.keys(formState).map(k => [k, true])
    );
    setTouched(allTouched);

    const newErrors = validate(formState);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    // TODO: Replace with real submission logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  }

  function inputClass(field: keyof FormFields) {
    const hasError = touched[field] && errors[field];
    return [
      'w-full px-5 py-4 rounded-xl bg-background/50 border outline-none transition-all',
      hasError
        ? 'border-red-400/70 focus:border-red-400 focus:ring-1 focus:ring-red-400/50'
        : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'
    ].join(' ');
  }

  return (
    <section id='contact' className='py-32 relative overflow-hidden'>
      <div className='absolute inset-0 bg-primary/5 dark:bg-primary/10' />

      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-4xl mx-auto glass-card p-8 md:p-16 rounded-3xl shadow-2xl'>
          {/* Heading */}
          <div className='text-center mb-12'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-4xl md:text-6xl font-display font-bold mb-6'
            >
              {title.includes(titleHighlight) ? (
                title.split(titleHighlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className='text-gradient'>{titleHighlight}</span>
                    )}
                  </span>
                ))
              ) : (
                <>
                  {title}{' '}
                  <span className='text-gradient'>{titleHighlight}</span>
                </>
              )}
            </motion.h2>
            <p className='text-lg text-muted-foreground'>{subtitle}</p>
          </div>

          {/* Success state */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className='text-center py-12'
            >
              <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center'>
                <svg
                  className='w-8 h-8 text-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <h3 className='text-2xl font-bold font-display mb-2'>
                {successTitle}
              </h3>
              <p className='text-muted-foreground'>{successSubtitle}</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className='space-y-6'
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Row 1 — Name + Phone */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Name */}
                <div className='space-y-1'>
                  <label htmlFor='name' className='text-sm font-medium ml-1'>
                    Name <span className='text-red-400'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      value={formState.name}
                      onChange={e => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder='Your Name'
                      className={inputClass('name') + ' pr-12'}
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40'>
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                        />
                      </svg>
                    </span>
                  </div>
                  <FieldError
                    message={touched.name ? errors.name : undefined}
                  />
                </div>

                {/* Phone — simple, no country code */}
                <div className='space-y-1'>
                  <label htmlFor='phone' className='text-sm font-medium ml-1'>
                    Phone <span className='text-red-400'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      id='phone'
                      name='phone'
                      type='tel'
                      inputMode='numeric'
                      value={formState.phone}
                      onChange={e =>
                        handleChange(
                          'phone',
                          e.target.value.replace(/[^\d\s]/g, '')
                        )
                      }
                      onBlur={() => handleBlur('phone')}
                      placeholder='Your Phone Number'
                      className={inputClass('phone') + ' pr-12'}
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40'>
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                        />
                      </svg>
                    </span>
                  </div>
                  <FieldError
                    message={touched.phone ? errors.phone : undefined}
                  />
                </div>
              </div>

              {/* Row 2 — Company + Email */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Company (optional) */}
                <div className='space-y-1'>
                  <label htmlFor='company' className='text-sm font-medium ml-1'>
                    Company{' '}
                    <span className='text-muted-foreground/50 text-xs font-normal'>
                      (optional)
                    </span>
                  </label>
                  <div className='relative'>
                    <input
                      id='company'
                      name='company'
                      type='text'
                      value={formState.company}
                      onChange={e => handleChange('company', e.target.value)}
                      placeholder='Your Company'
                      className={inputClass('company') + ' pr-12'}
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40'>
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                        />
                      </svg>
                    </span>
                  </div>
                  {/* No error for optional field */}
                </div>

                {/* Email */}
                <div className='space-y-1'>
                  <label htmlFor='email' className='text-sm font-medium ml-1'>
                    Email <span className='text-red-400'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      value={formState.email}
                      onChange={e => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder='you@company.com'
                      className={inputClass('email') + ' pr-12'}
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40'>
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                    </span>
                  </div>
                  <FieldError
                    message={touched.email ? errors.email : undefined}
                  />
                </div>
              </div>

              {/* Row 3 — Select Service */}
              <div className='space-y-1'>
                <label htmlFor='service' className='text-sm font-medium ml-1'>
                  Select Service <span className='text-red-400'>*</span>
                </label>
                <div className='relative'>
                  <select
                    id='service'
                    name='service'
                    value={formState.service}
                    onChange={e => handleChange('service', e.target.value)}
                    onBlur={() => handleBlur('service')}
                    className={[
                      inputClass('service'),
                      'appearance-none pr-12 cursor-pointer',
                      !formState.service ? 'text-muted-foreground' : ''
                    ].join(' ')}
                  >
                    <option value='' disabled hidden>
                      Select Service
                    </option>
                    {SERVICE_OPTIONS.map(opt => (
                      <option
                        key={opt}
                        value={opt}
                        className='text-foreground bg-background'
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40'>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </span>
                </div>
                <FieldError
                  message={touched.service ? errors.service : undefined}
                />
              </div>

              {/* Row 4 — Message */}
              <div className='space-y-1'>
                <label htmlFor='message' className='text-sm font-medium ml-1'>
                  Message <span className='text-red-400'>*</span>
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={4}
                  value={formState.message}
                  onChange={e => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  placeholder='What are we building?'
                  className={inputClass('message') + ' resize-none'}
                />
                <FieldError
                  message={touched.message ? errors.message : undefined}
                />
              </div>

              {/* Row 5 — Submit + WhatsApp */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='py-4 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {isSubmitting ? submittingButtonText : submitButtonText}
                  {!isSubmitting && (
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  )}
                </button>

                <a
                  href={whatsappUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='py-3 px-5 rounded-xl border border-white/10 bg-background/50 hover:bg-background/80 transition-all flex items-center gap-3 group'
                >
                  <div className='w-10 h-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold text-sm'>
                    {whatsappName.charAt(0)}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-primary font-semibold text-sm group-hover:underline truncate'>
                      Wanna chat instead?
                    </p>
                    <p className='text-muted-foreground text-xs truncate'>
                      Book a consult with <strong>{whatsappName}</strong>!
                    </p>
                  </div>
                  <svg
                    className='w-6 h-6 text-green-400 flex-shrink-0'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                  </svg>
                </a>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
