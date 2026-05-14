import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Activity, Bell, Radio, Cpu, FileText, Droplets } from 'lucide-react';
import { CTABanner } from '@/components/sections/CTABanner';

const fd = (d = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { delay: d, duration: 0.55, ease: [0.22,1,0.36,1] as const } });

const features = [
  { Icon: Activity,  title: 'Multi-parameter water sensing',    desc: 'Continuous monitoring of pH, turbidity, TDS, temperature, and dissolved oxygen — simultaneously, from the same sensor node.' },
  { Icon: Bell,      title: 'Instant contamination alerts',      desc: 'When any parameter exceeds safe thresholds, alerts go out immediately via SMS, app notification, and email. No manual checking.' },
  { Icon: Radio,     title: 'Edge processing for reliability',   desc: 'Anomaly detection runs on the device itself, not in the cloud. Alerts fire even when internet connectivity is interrupted.' },
  { Icon: Cpu,       title: 'Sensor network management',         desc: 'A central dashboard shows every deployed node, its health status, last reading, and calibration schedule.' },
  { Icon: FileText,  title: 'Compliance-ready reporting',        desc: 'Automated reports with timestamped sensor data, suitable for regulatory audits and environmental compliance submissions.' },
  { Icon: Droplets,  title: 'Trend analysis and early warning',  desc: 'Gradual quality degradation can be detected before it becomes a crisis — not just when a threshold is suddenly crossed.' },
];

const useCases = [
  { title: 'Municipal water distribution',  desc: 'Monitor contamination events across city-scale pipeline networks in real time.' },
  { title: 'Industrial effluent control',   desc: 'Ensure industrial discharge continuously meets environmental standards.' },
  { title: 'Drinking water source protection', desc: 'Guard bore wells, reservoirs, and treatment plant outputs with live monitoring.' },
  { title: 'Aquaculture water management', desc: 'Maintain precise water conditions for fish farms to optimize yield and reduce risk.' },
];

export default function Pramaan() {
  return (
    <>
      <Helmet>
        <title>Pramaan — Smart Water Quality Monitoring | IOSON</title>
        <meta name="description" content="Pramaan is an intelligent IoT water quality monitoring system currently in active development. Real-time contamination detection for municipal and industrial deployments." />
      </Helmet>

      {/* Hero */}
      <section style={{ background: '#FFFFFF', paddingTop: 'clamp(96px,14vw,128px)', paddingBottom: 'clamp(48px,7vw,80px)' }}>
        <div className="container-custom">
          {/* Development notice banner */}
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)', borderRadius: 10, padding: '12px 18px', marginBottom: 36, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span className="amber-dot" style={{ marginTop: 4, flexShrink: 0 }} aria-hidden="true"/>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E', marginBottom: 3 }}>Currently in active development</div>
              <div style={{ fontSize: 13, color: '#78350F', lineHeight: 1.6 }}>
                Building an intelligent water quality monitoring system designed for real-time contamination detection and operational visibility. Field deployment coming soon.
              </div>
            </div>
          </motion.div>

          <div className="pramaan-hero">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22,1,0.36,1] as const }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ padding: '3px 11px', borderRadius: 100, background: 'rgba(37,99,235,.07)', border: '1px solid rgba(37,99,235,.2)', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2563EB' }}>IoT Water Monitoring</span>
                <span className="tag-amber">In Development</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-.045em', lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif", margin: '0 0 14px' }}>Pramaan</h1>
              <p style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)', fontWeight: 600, color: '#2563EB', marginBottom: 16 }}>Intelligent Water Quality Monitoring System</p>
              <p style={{ fontSize: 'clamp(0.875rem,1.4vw,1rem)', color: '#404040', lineHeight: 1.78, marginBottom: 28, maxWidth: 500 }}>
                A precision sensor network that monitors water quality parameters continuously, detects contamination the moment it occurs, and alerts the right people before public health is impacted. Currently in active development for municipal and industrial deployments.
              </p>
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary">Express Interest <ArrowRight size={13} aria-hidden="true"/></Link>
                <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 18px', borderRadius: 7, border: '1px solid rgba(0,0,0,.1)', color: '#666', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'border-color .2s,color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.22)'; e.currentTarget.style.color = '#0D0D0D'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.1)'; e.currentTarget.style.color = '#666'; }}>
                  <ArrowLeft size={12} aria-hidden="true"/> All Products
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.22, duration: 0.85, ease: [0.22,1,0.36,1] as const }} className="pramaan-visual">
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,.08)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.08)', maxWidth: 320 }}>
                <div style={{ padding: '11px 16px', background: '#FAFAFA', borderBottom: '1px solid rgba(0,0,0,.05)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Droplets size={12} style={{ color: '#2563EB' }} aria-hidden="true"/>
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: '#404040' }}>Pramaan — Sensor Preview</span>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="amber-dot" aria-hidden="true"/>
                    <span style={{ fontSize: 10, color: '#D97706', fontWeight: 600 }}>In Dev</span>
                  </span>
                </div>
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[{ l: 'pH Level', v: '7.2', u: '' },{ l: 'Turbidity', v: '1.8', u: 'NTU' },{ l: 'TDS', v: '340', u: 'ppm' },{ l: 'Temperature', v: '22.4', u: '°C' }].map((p, i, arr) => (
                    <div key={p.l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,.05)' : 'none' }}>
                      <span style={{ fontSize: 12, color: '#404040', fontWeight: 500 }}>{p.l}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#0D0D0D', fontVariantNumeric: 'tabular-nums' }}>{p.v}{p.u && ` ${p.u}`}</span>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} aria-hidden="true"/>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '9px 18px', background: '#FAFAFA', borderTop: '1px solid rgba(0,0,0,.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: '#888' }}>Node #42 — Prototype</span>
                  <span style={{ fontSize: 10, color: '#D97706', fontWeight: 600 }}>Dev build</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: '#FAFAFA', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>System Capabilities</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", margin: 0 }}>Engineered for precision water monitoring.</h2>
          </motion.div>
          <div className="pramaan-features">
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div key={title} {...fd(i * 0.07)}>
                <div style={{ padding: 'clamp(20px,3vw,28px)', borderTop: '1px solid rgba(0,0,0,.07)', height: '100%' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(37,99,235,.07)', border: '1px solid rgba(37,99,235,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, color: '#2563EB' }}><Icon size={15} aria-hidden="true"/></div>
                  <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#0D0D0D', marginBottom: 7, fontFamily: "'Space Grotesk',sans-serif" }}>{title}</h3>
                  <p style={{ fontSize: 13, color: '#404040', lineHeight: 1.74, margin: 0 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(56px,9vw,96px) 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="container-custom">
          <motion.div {...fd()} style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>Planned Deployments</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2.5rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.03em', lineHeight: 1.1, fontFamily: "'Space Grotesk',sans-serif", margin: 0 }}>Where Pramaan will deploy</h2>
          </motion.div>
          <div className="pramaan-usecases">
            {useCases.map((uc, i) => (
              <motion.div key={uc.title} {...fd(i * 0.08)}>
                <div style={{ background: '#FAFAFA', border: '1px solid rgba(0,0,0,.07)', borderRadius: 12, padding: 'clamp(20px,3vw,28px)', height: '100%', transition: 'border-color .2s,box-shadow .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,.14)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(0,0,0,.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,.07)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0D0D0D', marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif" }}>{uc.title}</h3>
                  <p style={{ fontSize: 13, color: '#404040', lineHeight: 1.72, margin: 0 }}>{uc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Early access CTA */}
          <motion.div {...fd(0.2)} style={{ marginTop: 'clamp(2.5rem,5vw,4rem)', background: 'rgba(217,119,6,.05)', border: '1px solid rgba(217,119,6,.18)', borderRadius: 14, padding: 'clamp(24px,4vw,36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E', marginBottom: 6 }}>Interested in early access?</div>
              <p style={{ fontSize: 13.5, color: '#78350F', lineHeight: 1.65, margin: 0, maxWidth: 500 }}>
                If you're a municipality, water utility, or industrial operator looking for real-time water quality monitoring, we'd like to talk to you about early deployment partnerships.
              </p>
            </div>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 7, background: '#92400E', color: '#FFFFFF', fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'opacity .2s', whiteSpace: 'nowrap', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
              Get in touch <ArrowRight size={13} aria-hidden="true"/>
            </Link>
          </motion.div>
        </div>
      </section>

      <CTABanner/>

      <style>{`
        .pramaan-hero     { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2.5rem,5vw,5rem); align-items: center; }
        .pramaan-features { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(0,0,0,.07); }
        .pramaan-usecases { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem; }
        @media (max-width: 900px) { .pramaan-features { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 768px) { .pramaan-hero { grid-template-columns: 1fr; } .pramaan-visual { display: none !important; } .pramaan-usecases { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .pramaan-features { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
