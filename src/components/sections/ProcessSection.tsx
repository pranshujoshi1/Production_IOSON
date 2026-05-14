import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Understand the operation first',
    body: 'We start by understanding how your business actually runs — the daily workflows, the manual steps, and where things break down. We don\'t start with code.',
  },
  {
    number: '02',
    title: 'Design the right system',
    body: 'Architecture before code. Every sensor topology, data pipeline, and interface is designed for reliability and long-term maintainability — not just the demo.',
  },
  {
    number: '03',
    title: 'Build and test in real conditions',
    body: 'We ship iteratively and validate in real environments, not just test labs. The gap between a demo and production is exactly where we focus.',
  },
  {
    number: '04',
    title: 'Deploy, monitor, and stay',
    body: 'After launch, we provide live dashboards, performance monitoring, and iterative improvements as your operation grows. We don\'t disappear after delivery.',
  },
];

const fd = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
});

export function ProcessSection() {
  return (
    <section aria-label="How we work" style={{ background: '#FFFFFF', padding: 'clamp(64px,9vw,100px) 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="container-custom">
        <motion.div {...fd()} style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)', maxWidth: 560 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>
            How We Work
          </div>
          <h2 style={{
            fontSize: 'clamp(1.5rem,3.5vw,2.625rem)', fontWeight: 700,
            color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1,
            fontFamily: "'Space Grotesk',sans-serif", margin: 0,
          }}>
            From first conversation to live deployment
          </h2>
        </motion.div>

        <div className="process-grid">
          {steps.map((s, i) => (
            <motion.div key={i} {...fd(i * 0.08)} className="process-step">
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#2563EB', marginBottom: 16 }}>{s.number}</div>
              <h3 style={{
                fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)', fontWeight: 700,
                color: '#0D0D0D', letterSpacing: '-.02em',
                marginBottom: 10, fontFamily: "'Space Grotesk',sans-serif",
              }}>{s.title}</h3>
              <p style={{ fontSize: 13.5, color: '#404040', lineHeight: 1.76, margin: 0 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(0,0,0,0.07);
          border-radius: 14px;
          overflow: hidden;
        }
        .process-step {
          background: #FFFFFF;
          padding: clamp(28px,4vw,44px) clamp(22px,3.5vw,40px);
        }
        @media (max-width: 640px) {
          .process-grid { grid-template-columns: 1fr; }
          .process-step { border-radius: 0; }
        }
      `}</style>
    </section>
  );
}
