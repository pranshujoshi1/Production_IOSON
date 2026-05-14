import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { CTABanner } from '@/components/sections/CTABanner';

const EASE = [0.22, 1, 0.36, 1] as unknown as Easing;
const fd = (d = 0) => ({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-40px' }, transition: { delay: d, duration: 0.52, ease: EASE } });


const timeline = [
  { year: 'March 2026', title: 'Founded', body: 'IOSON started with a clear observation: most operational problems in businesses — canteens, water networks, factory workflows — were caused by manual processes that no one had bothered to digitise properly. We decided to start fixing them.' },
  { year: ' April 2026', title: 'Thalii ships', body: 'Thalii v1.0 launched as a QR-based meal subscription system for food-service businesses. The core insight: paper registers and coupon books were creating daily disputes that no one could resolve. Digital tracking fixed this immediately.' },
  { year: 'April 2026', title: 'Expanding', body: 'Thalii enters more deployments. Pramaan approaches field-ready status. The engineering team grows and the product roadmap expands into more operational domains.' },
  { year: 'May 2026', title: 'Pramaan begins', body: 'We started development on Pramaan — a sensor-driven water quality monitoring system for real-time contamination detection. Currently in active development with field prototype testing underway.' },
];

const principles = [
  { n: '01', h: 'Production-grade, not demo-grade', b: 'A system that works in the demo room often fails in the field. We build for real conditions — connectivity gaps, power fluctuations, and users who don\'t read instructions.' },
  { n: '02', h: 'Honest engineering timelines',      b: 'We don\'t overpromise delivery dates to win contracts. We\'d rather tell you something takes longer and ship something that actually works.' },
  { n: '03', h: 'Systems that last',                 b: 'Every product is designed to be maintained, extended, and understood — by the team that builds it and the people who come after.' },
  { n: '04', h: 'Real-world validation',             b: 'We test in real environments, not just test labs. The gap between a controlled environment and actual operation is exactly where most software fails.' },
  { n: '05', h: 'Clarity over complexity',           b: 'If you can\'t explain how the system works to a non-technical operator in five minutes, it\'s too complex. Simplicity is a design constraint, not an afterthought.' },
  { n: '06', h: 'No black boxes',                    b: 'Every system we build is explainable, auditable, and transparent. If something goes wrong, you\'ll know exactly why and exactly what to do.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — IOSON</title>
        <meta name="description" content="IOSON is a small engineering team building practical IoT and software systems for real operational problems. Founded to replace manual processes with reliable digital infrastructure." />
        <meta property="og:title" content="About IOSON — Intelligent Systems Engineering" />
        <meta property="og:description" content="A focused engineering team building practical technology for real operational problems." />
      </Helmet>

      {/* Hero */}
      <section style={{ background: '#FFFFFF', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(48px,7vw,80px)' }}>
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22,1,0.36,1] as const }} style={{ maxWidth: 660 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 18 }}>About IOSON</div>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,4.25rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.04em', lineHeight: 1.04, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 18px' }}>
              We engineer systems that actually work.
            </h1>
            <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)', color: '#404040', lineHeight: 1.78, maxWidth: 520 }}>
              IOSON is a small, focused engineering team. We build IoT monitoring systems and operational software for businesses dealing with real, practical problems — not theoretical ones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origin */}
      <section style={{ background: '#FAFAFA', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <div className="about-origin">
            <motion.div {...fd(0.05)}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>Why We Exist</div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.625rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", margin: 0 }}>
                Most operational problems are unsolved not because solutions don't exist — but because no one built the right one.
              </h2>
            </motion.div>
            <motion.div {...fd(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'We started IOSON with a simple belief — technology should solve real operational problems, not complicate them. Across industries, we saw businesses struggling with disconnected workflows, manual processes, and systems that were either too expensive, too complex, or simply not built for how people actually work..',
                'IOSON was created to build practical digital systems that are reliable, scalable, and easy to use in real-world environments. We focus on creating solutions that improve operational visibility, reduce repetitive work, and help businesses move toward smarter and more efficient processes.',
                'Our approach is simple: understand the problem deeply, design with practicality in mind, and build technology that delivers measurable value in everyday operations.',
              ].map((p, i) => (
                <p key={i} style={{ fontSize: 'clamp(0.875rem,1.4vw,0.9375rem)', color: '#404040', lineHeight: 1.8, margin: 0 }}>{p}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Timeline</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", margin: 0 }}>Where we've been</h2>
          </motion.div>
          <div>
            {timeline.map((t, i) => (
              <motion.div key={i} {...fd(i * 0.08)} style={{ display: 'flex', gap: 'clamp(1.5rem,4vw,4rem)', padding: 'clamp(22px,3vw,30px) 0', borderBottom: i < timeline.length - 1 ? '1px solid rgba(0,0,0,.07)' : 'none', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 'clamp(0.875rem,1.5vw,1rem)', fontWeight: 700, color: '#2563EB', fontFamily: "'Space Grotesk',sans-serif", flexShrink: 0, minWidth: 40 }}>{t.year}</div>
                <div>
                  <div style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)', fontWeight: 700, color: '#0D0D0D', marginBottom: 7, fontFamily: "'Space Grotesk',sans-serif" }}>{t.title}</div>
                  <p style={{ fontSize: 13.5, color: '#404040', lineHeight: 1.74, margin: 0 }}>{t.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section style={{ background: '#FAFAFA', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ marginBottom: 'clamp(2.5rem,5vw,3.5rem)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>How We Build</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", margin: 0 }}>Engineering principles we actually follow</h2>
          </motion.div>
          <div className="about-principles">
            {principles.map((p, i) => (
              <motion.div key={p.n} {...fd(i * 0.06)}>
                <div style={{ padding: 'clamp(22px,3vw,32px)', borderTop: '1px solid rgba(0,0,0,.07)', height: '100%' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color: '#2563EB', marginBottom: 12 }}>{p.n}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D', marginBottom: 9, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.3 }}>{p.h}</div>
                  <p style={{ fontSize: 13, color: '#404040', lineHeight: 1.74, margin: 0 }}>{p.b}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner/>

      <style>{`
        .about-origin {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem,5vw,5rem);
          align-items: flex-start;
        }
        .about-principles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(0,0,0,.07);
        }
        @media (max-width: 900px) {
          .about-principles { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .about-origin { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .about-principles { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
