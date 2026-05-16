import { motion } from 'framer-motion';

const pillars = [
  {
    icon: '⚙',
    title: 'Engineering-first, always',
    body: 'We care about how systems work, not just how they look in demos. Every product is designed to run reliably in real environments — not just ideal test conditions.',
  },
  {
    icon: '✓',
    title: 'Deployed in real operations',
    body: 'Thalii is actively used by food-service businesses for subscription management and daily redemption tracking. Pramaan is in active development for water quality monitoring.',
  },
  {
    icon: '◎',
    title: 'Built for people who run things',
    body: 'Our products are built for canteen managers, operations teams, and facility owners — not for investors. The workflows are practical, the interfaces are simple.',
  },
];

const testimonials = [
  {
    quote: "Managing monthly meal subscriptions used to mean registers, manual counting, and constant errors. Thalii just handles it — we know exactly who paid, who redeemed, who hasn't.",
    name: 'Operations Manager',
    org: 'Corporate Cafeteria, Indore',
  },
  {
    quote: "The QR scanning takes less than two seconds per customer. Staff don't need training. It just works the way you'd expect it to work.",
    name: 'Canteen Supervisor',
    org: 'University Campus',
  },
];

const fd = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
});

export function TrustSection() {
  return (
    <section aria-label="Why businesses choose IOSON" style={{ background: '#FAFAFA', padding: 'clamp(64px,9vw,100px) 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="container-custom">

        {/* Header */}
        <motion.div {...fd()} style={{ maxWidth: 560, marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 14 }}>
            Why IOSON
          </div>
          <h2 style={{
            fontSize: 'clamp(1.5rem,3.5vw,2.625rem)', fontWeight: 700,
            color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1,
            fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 14px',
          }}>
            Built for operations that can't afford to fail.
          </h2>
          <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.72, margin: 0 }}>
            We are a small, focused engineering team. We build systems that work in the real world — canteens, water networks, factory floors. Not systems that work in presentations.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="trust-pillars">
          {pillars.map((p, i) => (
            <motion.div key={p.title} {...fd(i * 0.08)}>
              <div className="trust-card" style={{ height: '100%' }}>
                <div style={{ fontSize: 22, marginBottom: 16, lineHeight: 1 }} aria-hidden="true">{p.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0D0D0D', marginBottom: 10, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: '#404040', lineHeight: 1.74, margin: 0 }}>{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="trust-testimonials">
          {testimonials.map((t, i) => (
            <motion.div key={i} {...fd(0.1 + i * 0.1)}>
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 14,
                padding: 'clamp(22px,3vw,32px)',
                height: '100%',
              }}>
                <div style={{ fontSize: 28, lineHeight: 1, color: 'rgba(0,0,0,0.12)', marginBottom: 14, fontFamily: 'Georgia,serif' }} aria-hidden="true">"</div>
                <p style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.76, fontStyle: 'italic', marginBottom: 20 }}>{t.quote}</p>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0D0D0D' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{t.org}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div {...fd(0.2)} className="trust-bar">
          {[
            { value: '99.98%', label: 'Uptime delivered' },
            { value: '<2s',    label: 'QR scan time'     },
            { value: '2+',     label: 'Live products'    },
            { value: '100%',   label: 'SLA met'          },
          ].map((s, i) => (
            <div key={i} className="trust-stat">
              <div style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#888' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* ── Pillars: 3-col → 2-col → 1-col ── */
        .trust-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 900px) {
          .trust-pillars { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .trust-pillars { grid-template-columns: 1fr; }
        }

        /* ── Testimonials: 2-col → 1-col ── */
        .trust-testimonials {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 640px) {
          .trust-testimonials { grid-template-columns: 1fr; }
        }

        /* ── Trust bar: 4-col → 2-col, border-based separators ── */
        .trust-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 12px;
          overflow: hidden;
        }
        .trust-stat {
          background: #FFFFFF;
          padding: clamp(20px,3vw,30px) clamp(16px,2.5vw,28px);
          border-right:  1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        /* 4-col: last in each row */
        .trust-stat:nth-child(4n)         { border-right: none; }
        /* 4-col: all items are in the only row */
        .trust-stat:nth-last-child(-n+4)  { border-bottom: none; }

        @media (max-width: 640px) {
          .trust-bar { grid-template-columns: repeat(2, 1fr); }
          /* Reset 4-col overrides */
          .trust-stat                       { border-right: 1px solid rgba(0,0,0,0.08); border-bottom: 1px solid rgba(0,0,0,0.08); }
          .trust-stat:nth-child(2n)         { border-right: none; }
          .trust-stat:nth-last-child(-n+2)  { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
