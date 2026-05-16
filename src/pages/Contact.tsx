import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { analytics } from '@/lib/analytics';

// ─────────────────────────────────────────────────────────────────────────────
// Formspree endpoint — set VITE_FORMSPREE_ID in your .env.local
// Get your Form ID from: https://formspree.io → New Form → contact@iosonx.com
// Format: https://formspree.io/f/YOUR_FORM_ID
// ─────────────────────────────────────────────────────────────────────────────
// Form ID can be overridden via VITE_FORMSPREE_ID in .env.local
const FORMSPREE_URL = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID ?? 'mkoydyee'}`;

// ── Animation helper ──────────────────────────────────────────────────────────
const fd = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { delay: d, duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
});

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// ── Shared input style ────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 8,
  border: '1px solid rgba(0,0,0,0.12)',
  background: '#FFFFFF',
  fontSize: 14,
  color: '#0D0D0D',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
  appearance: 'none',
};

const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#2563EB';
    e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)';
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(0,0,0,0.12)';
    e.target.style.boxShadow = 'none';
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form      = e.currentTarget;
    const formData  = new FormData(form);
    const email     = (formData.get('email') as string) ?? '';

    // Reject honeypot-filled submissions on the client side too
    if (formData.get('_gotcha')) {
      setStatus('success'); // Silently succeed — it's a bot
      return;
    }

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setSubmittedEmail(email);
        setStatus('success');
        analytics.track('contact_form_submitted', {
          page: 'contact',
          has_company: Boolean(formData.get('company')),
        });
        form.reset();
      } else {
        // Formspree returns { errors: [{message}] } on validation failure
        console.error('[Formspree]', json);
        setStatus('error');
      }
    } catch (err) {
      console.error('[Formspree] Network error:', err);
      setStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact — IOSON</title>
        <meta
          name="description"
          content="Get in touch with IOSON. Reach us at contact@iosonx.com or visit us in Vijay Nagar, Indore."
        />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(48px,7vw,72px)' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{ maxWidth: 520 }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 18 }}>
              Contact
            </div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 14px' }}>
              Let's talk.
            </h1>
            <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1rem)', color: '#404040', lineHeight: 1.78 }}>
              Whether you have a clear brief or just a challenge you're trying to solve — tell us
              what you're dealing with and we'll tell you honestly whether we can help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#FAFAFA', padding: 'clamp(48px,7vw,72px) 0 clamp(64px,10vw,112px)', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <div className="contact-grid">

            {/* ── Form column ─────────────────────────────────────────────── */}
            <motion.div {...fd(0.05)}>

              {/* ── Success state ─────────────────────────────────────────── */}
              {status === 'success' ? (
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(22,163,74,.2)', borderRadius: 16, padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
                  <CheckCircle
                    size={40}
                    aria-hidden="true"
                    style={{ color: '#16A34A', margin: '0 auto 16px' }}
                  />
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0D0D0D', marginBottom: 10, fontFamily: "'Space Grotesk', sans-serif" }}>
                    Message sent!
                  </h2>
                  <p style={{ fontSize: 14, color: '#404040', lineHeight: 1.7, marginBottom: 8 }}>
                    We've received your message{submittedEmail ? ` and sent a confirmation to ` : '.'}
                    {submittedEmail && <strong>{submittedEmail}</strong>}
                    {submittedEmail ? '.' : ''}
                  </p>
                  <p style={{ fontSize: 12.5, color: '#888', lineHeight: 1.6 }}>
                    We'll get back to you within one business day. Usually faster.
                  </p>
                </div>
              ) : (
                /* ── Formspree-powered contact form ─────────────────────── */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 16, padding: 'clamp(24px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  {/* ── Honeypot — hidden from humans, traps bots ── */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ display: 'none' }}
                  />

                  {/* ── Formspree redirect override (stay on same page) ── */}
                  <input type="hidden" name="_subject" value="New enquiry from IOSON website" />

                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0D0D0D', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>
                      Send a message
                    </h2>
                    <p style={{ fontSize: 12.5, color: '#888', margin: 0 }}>
                      We respond within 24 hours. No spam, no commitments.
                    </p>
                  </div>

                  {/* Name + Email row */}
                  <div className="contact-form-row">
                    <div style={{ flex: 1 }}>
                      <label htmlFor="contact-name" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 6 }}>
                        Your name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Amit Sharma"
                        autoComplete="name"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="contact-email" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 6 }}>
                        Email address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="amit@company.com"
                        autoComplete="email"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="contact-company" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 6 }}>
                      Company or organisation{' '}
                      <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Your Canteen / City Corporation"
                      autoComplete="organization"
                      style={inputStyle}
                      {...focusHandlers}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 6 }}>
                      What are you dealing with? *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your operation and the problem you're trying to solve. The more specific, the better."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                      onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {/* Error banner */}
                  {status === 'error' && (
                    <div
                      role="alert"
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', borderRadius: 8, background: 'rgba(220,38,38,.05)', border: '1px solid rgba(220,38,38,.2)', fontSize: 13, color: '#B91C1C' }}
                    >
                      <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
                      <span>
                        Something went wrong. Please try again or email us directly at{' '}
                        <a href="mailto:contact@iosonx.com" style={{ color: '#B91C1C', fontWeight: 600, textDecoration: 'underline' }}>
                          contact@iosonx.com
                        </a>
                        .
                      </span>
                    </div>
                  )}

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      aria-busy={status === 'loading'}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        padding: '13px 26px',
                        borderRadius: 7,
                        background: status === 'loading' ? '#999' : '#0D0D0D',
                        color: '#FFFFFF',
                        fontSize: 14,
                        fontWeight: 700,
                        border: 'none',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        transition: 'background .18s, opacity .18s',
                        minHeight: 46,
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '-.01em',
                      }}
                      onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.background = '#1A1A1A'; }}
                      onMouseLeave={e => { if (status !== 'loading') e.currentTarget.style.background = '#0D0D0D'; }}
                    >
                      {status === 'loading' ? (
                        <>
                          <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#FFF', animation: 'btn-spin .65s linear infinite', display: 'inline-block' }} />
                          Sending…
                        </>
                      ) : (
                        <>Send message <ArrowRight size={14} aria-hidden="true" /></>
                      )}
                    </button>
                    <p style={{ fontSize: 11.5, color: '#999', marginTop: 10, lineHeight: 1.5 }}>
                      No spam. No commitments. We respond within 24 hours.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>

            {/* ── Contact info column ──────────────────────────────────────── */}
            <motion.div {...fd(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 14, padding: 'clamp(22px,3vw,30px)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D', marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Get in touch directly
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a
                    href="mailto:contact@iosonx.com"
                    style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#2563EB', textDecoration: 'none', fontWeight: 500, transition: 'color .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#1D4ED8'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#2563EB'; }}
                  >
                    <Mail size={14} style={{ flexShrink: 0 }} aria-hidden="true" />
                    contact@iosonx.com
                  </a>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#404040' }}>
                    <MapPin size={14} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                    <div>Vijay Nagar, Indore<br />Madhya Pradesh, India</div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 14, padding: 'clamp(22px,3vw,30px)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D', marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>
                  What happens next?
                </h3>
                {[
                  { n: '1', t: 'We read everything', b: 'Your message gets personal attention — not a ticket number.' },
                  { n: '2', t: 'We reply within 1 business day', b: "Usually faster. We'll tell you if your problem is in our scope and what we'd suggest." },
                  { n: '3', t: 'We schedule a conversation', b: 'A short call to understand the details before we propose anything.' },
                ].map((s, i, arr) => (
                  <div
                    key={s.n}
                    style={{ display: 'flex', gap: 12, paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,.06)' : 'none' }}
                  >
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(37,99,235,.08)', border: '1px solid rgba(37,99,235,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#2563EB', flexShrink: 0 }}>
                      {s.n}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0D0D0D', marginBottom: 3 }}>{s.t}</div>
                      <div style={{ fontSize: 12.5, color: '#666', lineHeight: 1.6 }}>{s.b}</div>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: flex-start;
        }
        .contact-form-row { display: flex; gap: 1rem; }
        @keyframes btn-spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .contact-form-row { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
