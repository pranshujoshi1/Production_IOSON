import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { MapPin, Mail, ArrowRight, CheckCircle, AlertCircle, Clock, MessageSquare, Phone } from 'lucide-react';
import { analytics } from '@/lib/analytics';

const FORMSPREE_URL = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID ?? 'mkoydyee'}`;

const fd = (d = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { delay: d, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/* ─── Dot grid ───────────────────────────────────────────────────────── */
function DotGrid({ dark = false }: { dark?: boolean }) {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `radial-gradient(circle, ${dark ? 'rgba(255,255,255,.055)' : 'rgba(0,0,0,.055)'} 1px, transparent 1px)`,
      backgroundSize: '28px 28px',
    }} />
  );
}

/* ─── Input styles ───────────────────────────────────────────────────── */
const baseInput: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  padding: '12px 16px',
  borderRadius: 10,
  border: '1.5px solid rgba(0,0,0,.1)',
  background: '#FAFAFA',
  fontSize: 14,
  color: '#0D0D0D',
  fontFamily: "'Space Grotesk', sans-serif",
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s, background .2s',
};

const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = '#2563EB';
  e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)';
  e.target.style.background = '#fff';
};
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = 'rgba(0,0,0,.1)';
  e.target.style.boxShadow = 'none';
  e.target.style.background = '#FAFAFA';
};

/* ─── Steps data ─────────────────────────────────────────────────────── */
const steps = [
  { n: '01', icon: MessageSquare, title: 'We read everything', body: 'Your message gets personal attention — not a ticket number or an auto-responder.' },
  { n: '02', icon: Clock, title: 'Reply within 1 business day', body: "Usually faster. We'll tell you if your problem is in our scope and what we'd suggest." },
  { n: '03', icon: Phone, title: 'We schedule a conversation', body: 'A short call to understand the details before we propose anything concrete.' },
];

/* ─────────────────────────────────────────────────────────────────────── */

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get('email') as string) ?? '';
    if (formData.get('_gotcha')) { setStatus('success'); return; }
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
        analytics.track('contact_form_submitted', { page: 'contact', has_company: Boolean(formData.get('company')) });
        form.reset();
      } else {
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
        <meta name="description" content="Get in touch with IOSON. Reach us at contact@iosonx.com or visit us in Vijay Nagar, Indore." />
      </Helmet>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          background: '#0A0A0A',
          paddingTop: 'clamp(100px,15vw,136px)',
          paddingBottom: 'clamp(60px,9vw,96px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <DotGrid dark />

        {/* Blue glow */}
        <div aria-hidden="true" style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: '#2563EB', filter: 'blur(100px)', opacity: .1, top: -100, left: -80, pointerEvents: 'none' }} />
        {/* Green glow */}
        <div aria-hidden="true" style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', background: '#22C55E', filter: 'blur(90px)', opacity: .08, bottom: -60, right: -60, pointerEvents: 'none' }} />

        {/* Parallax ghost text */}
        <motion.div aria-hidden="true" style={{
          position: 'absolute', right: '-2%', top: '50%', translateY: '-50%',
          fontSize: 'clamp(10rem,20vw,18rem)', fontWeight: 900, letterSpacing: '-.07em',
          color: 'rgba(255,255,255,.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          fontFamily: "'Space Grotesk', sans-serif", y: ghostY, opacity: ghostOpacity,
        }}>
          HI
        </motion.div>

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} style={{ maxWidth: 600 }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,.3)' }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)' }}>Contact</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem,6.5vw,5.25rem)', fontWeight: 800,
              color: '#F0F0F0', letterSpacing: '-.05em', lineHeight: 1.01,
              fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 20px',
            }}>
              Let's&nbsp;<span style={{ color: '#2563EB' }}>talk.</span>
            </h1>

            <p style={{ fontSize: 'clamp(0.9375rem,1.4vw,1.0625rem)', color: 'rgba(255,255,255,.45)', lineHeight: 1.78, maxWidth: 440, margin: 0 }}>
              Whether you have a clear brief or just a challenge you're trying to solve — tell us what you're dealing with and we'll be honest about whether we can help.
            </p>

            {/* Quick contact chips */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 36 }}>
              <a href="mailto:contact@iosonx.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 20,
                border: '1.5px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.05)',
                fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.75)',
                textDecoration: 'none', transition: 'border-color .2s, background .2s',
                backdropFilter: 'blur(8px)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.background = 'rgba(37,99,235,.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; e.currentTarget.style.background = 'rgba(255,255,255,.05)'; }}
              >
                <Mail size={11} /> contact@iosonx.com
              </a>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 20,
                border: '1.5px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.05)',
                fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.5)',
                backdropFilter: 'blur(8px)',
              }}>
                <MapPin size={11} /> Vijay Nagar, Indore
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <section style={{ background: '#F5F5F5', padding: 'clamp(56px,8vw,88px) 0 clamp(72px,10vw,120px)', position: 'relative', overflow: 'hidden' }}>
        <DotGrid />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div className="contact-grid">

            {/* ── FORM ─────────────────────────────────────────────────── */}
            <motion.div {...fd(0.05)}>
              {status === 'success' ? (
                /* Success card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: '#fff', border: '1.5px solid rgba(34,197,94,.2)', borderRadius: 18,
                    padding: 'clamp(40px,6vw,64px)', textAlign: 'center',
                    boxShadow: '0 24px 56px rgba(0,0,0,.08)',
                  }}
                >
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircle size={26} color="#16A34A" aria-hidden="true" />
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0D0D0D', marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-.03em' }}>
                    Message sent!
                  </h2>
                  <p style={{ fontSize: 14, color: '#4B4B4B', lineHeight: 1.75, marginBottom: 6 }}>
                    We've received your message{submittedEmail ? ' and sent a confirmation to ' : '.'}
                    {submittedEmail && <strong style={{ color: '#0D0D0D' }}>{submittedEmail}</strong>}
                    {submittedEmail ? '.' : ''}
                  </p>
                  <p style={{ fontSize: 12.5, color: '#8C8C8C', lineHeight: 1.6 }}>
                    We'll get back to you within one business day. Usually faster.
                  </p>
                </motion.div>
              ) : (
                /* Form card */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid rgba(0,0,0,.07)',
                    borderRadius: 18,
                    padding: 'clamp(28px,4vw,48px)',
                    display: 'flex', flexDirection: 'column', gap: '1.35rem',
                    boxShadow: '0 24px 56px rgba(0,0,0,.07)',
                  }}
                >
                  <input type="text" name="_gotcha" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
                  <input type="hidden" name="_subject" value="New enquiry from IOSON website" />

                  {/* Form header */}
                  <div style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0D0D0D', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-.03em', marginBottom: 5 }}>
                      Send a message
                    </h2>
                    <p style={{ fontSize: 13, color: '#8C8C8C', margin: 0 }}>
                      No spam. No commitments. We respond within 24 hours.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="form-row">
                    <div style={{ flex: 1 }}>
                      <label htmlFor="contact-name" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4B4B4B', marginBottom: 7, letterSpacing: '.01em' }}>
                        Your name <span style={{ color: '#2563EB' }}>*</span>
                      </label>
                      <input id="contact-name" name="name" type="text" required placeholder="Amit Sharma" autoComplete="name" style={baseInput} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="contact-email" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4B4B4B', marginBottom: 7, letterSpacing: '.01em' }}>
                        Email address <span style={{ color: '#2563EB' }}>*</span>
                      </label>
                      <input id="contact-email" name="email" type="email" required placeholder="amit@company.com" autoComplete="email" style={baseInput} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="contact-company" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4B4B4B', marginBottom: 7, letterSpacing: '.01em' }}>
                      Company or organisation <span style={{ fontWeight: 400, color: '#8C8C8C' }}>(optional)</span>
                    </label>
                    <input id="contact-company" name="company" type="text" placeholder="Your Canteen / City Corporation" autoComplete="organization" style={baseInput} onFocus={onFocus} onBlur={onBlur} />
                  </div>

                  {/* Interest */}
                  <div>
                    <label htmlFor="contact-interest" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4B4B4B', marginBottom: 7, letterSpacing: '.01em' }}>
                      What are you interested in?
                    </label>
                    <select id="contact-interest" name="interest" style={{ ...baseInput, cursor: 'pointer', color: '#4B4B4B' }}
                      onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)'; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,.1)'; e.target.style.boxShadow = 'none'; e.target.style.background = '#FAFAFA'; }}
                    >
                      <option value="">Select an option…</option>
                      <option value="thalii">Thalii — Meal Subscription Platform</option>
                      <option value="pramaan">Pramaan — Water Quality Monitoring</option>
                      <option value="automation">Process Automation</option>
                      <option value="iot">IoT & Sensor Systems</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#4B4B4B', marginBottom: 7, letterSpacing: '.01em' }}>
                      What are you dealing with? <span style={{ color: '#2563EB' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message" name="message" required rows={5}
                      placeholder="Tell us about your operation and the problem you're trying to solve. The more specific, the better."
                      style={{ ...baseInput, resize: 'vertical', minHeight: 120 }}
                      onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)'; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,.1)'; e.target.style.boxShadow = 'none'; e.target.style.background = '#FAFAFA'; }}
                    />
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', borderRadius: 9, background: 'rgba(220,38,38,.05)', border: '1px solid rgba(220,38,38,.18)', fontSize: 13, color: '#B91C1C' }}>
                      <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
                      <span>Something went wrong. Try again or email <a href="mailto:contact@iosonx.com" style={{ color: '#B91C1C', fontWeight: 700, textDecoration: 'underline' }}>contact@iosonx.com</a> directly.</span>
                    </div>
                  )}

                  {/* Submit */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 9,
                        padding: '13px 26px', borderRadius: 9,
                        background: status === 'loading' ? '#8C8C8C' : '#0D0D0D',
                        color: '#fff', fontSize: 14, fontWeight: 700, border: 'none',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        transition: 'background .18s, transform .18s, box-shadow .18s',
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: '-.01em',
                      }}
                      onMouseEnter={e => {
                        if (status !== 'loading') {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,.22)';
                        }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {status === 'loading' ? (
                        <>
                          <span style={{ width: 13, height: 13, borderRadius: '50%', border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', animation: 'btn-spin .65s linear infinite', display: 'inline-block' }} />
                          Sending…
                        </>
                      ) : (
                        <>Send message <ArrowRight size={13} /></>
                      )}
                    </button>
                    <span style={{ fontSize: 12, color: '#8C8C8C' }}>No spam. Usually faster than 24h.</span>
                  </div>
                </form>
              )}
            </motion.div>

            {/* ── SIDEBAR ───────────────────────────────────────────────── */}
            <motion.div {...fd(0.14)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Direct contact card */}
              <div style={{
                background: '#fff',
                border: '1.5px solid rgba(0,0,0,.07)',
                borderRadius: 16,
                padding: 'clamp(22px,3vw,32px)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,.05)',
              }}>
                <div aria-hidden={true} style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', background: '#2563EB', filter: 'blur(70px)', opacity: .05, top: -60, right: -60, pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,.35)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ display: 'inline-block', width: 16, height: 1, background: 'currentColor' }} />
                    Direct contact
                  </div>

                  {/* Email row */}
                  <a
                    href="mailto:contact@iosonx.com"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px',
                      background: '#FAFAFA', border: '1.5px solid rgba(0,0,0,.07)',
                      borderRadius: 10, textDecoration: 'none', marginBottom: 8,
                      transition: 'border-color .2s, background .2s, box-shadow .2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#2563EB';
                      e.currentTarget.style.background = 'rgba(37,99,235,.04)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,.07)';
                      e.currentTarget.style.background = '#FAFAFA';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(37,99,235,.08)', border: '1px solid rgba(37,99,235,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={14} color="#2563EB" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: 'rgba(0,0,0,.35)', fontWeight: 600, marginBottom: 2 }}>Email us</div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0D0D0D', fontFamily: "'Space Grotesk', sans-serif" }}>contact@iosonx.com</div>
                    </div>
                    <ArrowRight size={13} color="rgba(0,0,0,.2)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                  </a>

                  {/* Location row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px',
                    background: '#FAFAFA', border: '1.5px solid rgba(0,0,0,.07)', borderRadius: 10,
                  }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={14} color="#22C55E" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: 'rgba(0,0,0,.35)', fontWeight: 600, marginBottom: 2 }}>Our office</div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0D0D0D', fontFamily: "'Space Grotesk', sans-serif" }}>Vijay Nagar, Indore</div>
                      <div style={{ fontSize: 11, color: 'rgba(0,0,0,.4)', marginTop: 1 }}>Madhya Pradesh, India</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div style={{ background: '#fff', border: '1.5px solid rgba(0,0,0,.07)', borderRadius: 16, padding: 'clamp(22px,3vw,32px)', boxShadow: '0 8px 24px rgba(0,0,0,.05)' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,.35)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ display: 'inline-block', width: 16, height: 1, background: 'currentColor' }} />
                  What happens next
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.n} style={{ display: 'flex', gap: 14, paddingBottom: i < steps.length - 1 ? 20 : 0, marginBottom: i < steps.length - 1 ? 20 : 0, position: 'relative' }}>
                        {i < steps.length - 1 && (
                          <div aria-hidden={true} style={{ position: 'absolute', left: 16, top: 36, bottom: -20, width: 1, background: 'rgba(0,0,0,.07)' }} />
                        )}
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(37,99,235,.07)', border: '1px solid rgba(37,99,235,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={14} color="#2563EB" />
                        </div>
                        <div style={{ paddingTop: 2 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0D0D0D', marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</div>
                          <div style={{ fontSize: 12.5, color: '#6B6B6B', lineHeight: 1.65 }}>{s.body}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Response time badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
                background: 'rgba(34,197,94,.06)', border: '1px solid rgba(34,197,94,.18)', borderRadius: 12,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', flexShrink: 0, animation: 'pulseDot 2s ease-in-out infinite' }} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0D0D0D' }}>Typically responds in &lt;4 hours</div>
                  <div style={{ fontSize: 11.5, color: '#6B6B6B', marginTop: 1 }}>During business hours, Mon&ndash;Sat</div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes btn-spin { to { transform: rotate(360deg); } }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .45; transform: scale(.75); }
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: flex-start;
        }
        .form-row { display: flex; gap: 1rem; }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .form-row { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
