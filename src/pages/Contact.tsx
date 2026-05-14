import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Mail, ArrowRight } from 'lucide-react';

const fd = (d = 0) => ({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-40px' }, transition: { delay: d, duration: 0.52, ease: [0.22,1,0.36,1] } });

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 8,
    border: '1px solid rgba(0,0,0,0.12)', background: '#FFFFFF',
    fontSize: 14, color: '#0D0D0D', fontFamily: "'Inter',sans-serif",
    outline: 'none', transition: 'border-color .2s, box-shadow .2s',
    appearance: 'none',
  };

  return (
    <>
      <Helmet>
        <title>Contact — IOSON</title>
        <meta name="description" content="Get in touch with IOSON. Reach us at contact@iosonx.com or visit us in Vijay Nagar, Indore." />
      </Helmet>

      {/* Hero */}
      <section style={{ background: '#FFFFFF', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(48px,7vw,72px)' }}>
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} style={{ maxWidth: 520 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 18 }}>Contact</div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 14px' }}>
              Let's talk.
            </h1>
            <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1rem)', color: '#404040', lineHeight: 1.78 }}>
              Whether you have a clear brief or just a challenge you're trying to solve — tell us what you're dealing with and we'll tell you honestly whether we can help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section style={{ background: '#FAFAFA', padding: 'clamp(48px,7vw,72px) 0 clamp(64px,10vw,112px)', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <div className="contact-grid">
            {/* Form */}
            <motion.div {...fd(0.05)}>
              {sent ? (
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(22,163,74,.2)', borderRadius: 16, padding: 'clamp(32px,5vw,56px)', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0D0D0D', marginBottom: 10, fontFamily: "'Space Grotesk',sans-serif" }}>Message sent.</h2>
                  <p style={{ fontSize: 14, color: '#404040', lineHeight: 1.7 }}>We'll get back to you at {form.email || 'your email'} within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 16, padding: 'clamp(24px,4vw,44px)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0D0D0D', fontFamily: "'Space Grotesk',sans-serif", marginBottom: 4 }}>Send a message</h2>

                  <div className="contact-form-row">
                    <div style={{ flex: 1 }}>
                      <label htmlFor="contact-name" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 6 }}>Your name *</label>
                      <input id="contact-name" required type="text" placeholder="Amit Sharma" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none'; }}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label htmlFor="contact-email" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 6 }}>Email address *</label>
                      <input id="contact-email" required type="email" placeholder="amit@company.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none'; }}/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-company" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 6 }}>Company or organisation <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span></label>
                    <input id="contact-company" type="text" placeholder="Your Canteen / City Corporation" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none'; }}/>
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 6 }}>What are you dealing with? *</label>
                    <textarea id="contact-message" required rows={5} placeholder="Tell us about your operation and the problem you're trying to solve. The more specific, the better." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                      onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,.1)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none'; }}/>
                  </div>

                  <button type="submit" disabled={sending} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 24px', borderRadius: 7, background: sending ? '#888' : '#0D0D0D', color: '#FFFFFF', fontSize: 14, fontWeight: 700, border: 'none', cursor: sending ? 'not-allowed' : 'pointer', transition: 'background .2s', minHeight: 44, fontFamily: "'Inter',sans-serif" }}
                    onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#1A1A1A'; }}
                    onMouseLeave={e => { if (!sending) e.currentTarget.style.background = '#0D0D0D'; }}>
                    {sending ? 'Sending…' : 'Send message'} {!sending && <ArrowRight size={14} aria-hidden="true"/>}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact info */}
            <motion.div {...fd(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 14, padding: 'clamp(22px,3vw,30px)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D', marginBottom: 16, fontFamily: "'Space Grotesk',sans-serif" }}>Get in touch directly</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a href="mailto:contact@iosonx.com" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#2563EB', textDecoration: 'none', fontWeight: 500, transition: 'color .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#1D4ED8'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#2563EB'; }}>
                    <Mail size={14} style={{ flexShrink: 0 }} aria-hidden="true"/> contact@iosonx.com
                  </a>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#404040' }}>
                    <MapPin size={14} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true"/>
                    <div>Vijay Nagar, Indore<br/>Madhya Pradesh, India</div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 14, padding: 'clamp(22px,3vw,30px)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D', marginBottom: 12, fontFamily: "'Space Grotesk',sans-serif" }}>What happens next?</h3>
                {[
                  { n: '1', t: 'We read everything', b: 'Your message gets personal attention — not a ticket number.' },
                  { n: '2', t: 'We reply within 1 business day', b: "Usually faster. We'll tell you if your problem is in our scope and what we'd suggest." },
                  { n: '3', t: 'We schedule a conversation', b: 'A short call to understand the details before we propose anything.' },
                ].map(s => (
                  <div key={s.n} style={{ display: 'flex', gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid rgba(0,0,0,.06)' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(37,99,235,.08)', border: '1px solid rgba(37,99,235,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#2563EB', flexShrink: 0 }}>{s.n}</div>
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
          gap: clamp(2rem,4vw,4rem);
          align-items: flex-start;
        }
        .contact-form-row {
          display: flex;
          gap: 1rem;
        }
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
