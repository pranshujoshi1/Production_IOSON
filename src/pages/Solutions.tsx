import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Droplets, LayoutDashboard, Cpu, Zap,
  CheckCircle, ExternalLink, Activity
} from 'lucide-react';
import { CTABanner } from '@/components/sections/CTABanner';
import { useRef } from 'react';

/* ─── Fade helper ────────────────────────────────────────────────────── */
const fd = (d = 0, y = 20) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { delay: d, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─── Solution data ──────────────────────────────────────────────────── */
const solutions = [
  {
    id: 'monitoring',
    index: '01',
    eyebrow: 'Water & Environmental',
    title: 'Real-time quality\nmonitoring',
    body: 'Sensor networks that measure water quality parameters continuously — pH, turbidity, TDS, dissolved oxygen — and alert the right people the moment something goes wrong. Not after the fact. Not manually.',
    details: [
      'Multi-parameter IoT sensor nodes',
      'Instant contamination alerts via SMS + app',
      'Regulatory compliance reporting',
      'Edge processing for reliability without internet',
      'Central dashboard for all nodes',
    ],
    product: 'Pramaan',
    productHref: '/products/pramaan',
    productStatus: 'In Development',
    accent: '#22C55E',
    icon: Droplets,
    dark: true,
    stat: { value: '99.9%', label: 'detection accuracy' },
  },
  {
    id: 'software',
    index: '02',
    eyebrow: 'Operational Software',
    title: 'Digital workflow\ninfrastructure',
    body: 'We replace paper-based and manually-operated workflows with reliable digital systems — subscription platforms, operational dashboards, record management, and customer-facing portals that actually get used.',
    details: [
      'QR-based transaction systems',
      'Subscription and billing management',
      'Real-time operational dashboards',
      'Customer self-service portals',
      'Audit-ready transaction logs',
    ],
    product: 'Thalii',
    productHref: '/products/thalii',
    productStatus: 'Live',
    accent: '#2563EB',
    icon: LayoutDashboard,
    dark: false,
    stat: { value: '2.4k', label: 'daily transactions' },
  },
  {
    id: 'automation',
    index: '03',
    eyebrow: 'Process Automation',
    title: 'Replace manual\nprocesses',
    body: "Most operational inefficiency comes from manually-maintained records, manual notifications, and manual reconciliation. We identify these steps and automate them in a way that the team actually adopts.",
    details: [
      'Automated subscription renewal flows',
      'Alert escalation pipelines',
      'Data reconciliation and reporting',
      'Workflow-triggered communications',
      'Exception handling systems',
    ],
    product: null,
    productHref: null,
    productStatus: null,
    accent: '#F59E0B',
    icon: Zap,
    dark: true,
    stat: { value: '80%', label: 'manual effort reduced' },
  },
  {
    id: 'iot',
    index: '04',
    eyebrow: 'IoT & Edge Computing',
    title: 'Sensor systems that\nwork in the field',
    body: "There's a large gap between an IoT prototype and a production-grade sensor system. We design and build sensor networks that account for connectivity failure, power variance, and physical installation constraints.",
    details: [
      'Custom sensor node design',
      'Edge processing for offline operation',
      'Secure data transmission and storage',
      'Remote node management',
      'Field installation protocols',
    ],
    product: null,
    productHref: null,
    productStatus: null,
    accent: '#8B5CF6',
    icon: Cpu,
    dark: false,
    stat: { value: '<50ms', label: 'edge response time' },
  },
];

/* ─── Dot-grid background ────────────────────────────────────────────── */
function DotGrid({ dark }: { dark: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, ${dark ? 'rgba(255,255,255,.055)' : 'rgba(0,0,0,.055)'} 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }}
    />
  );
}

/* ─── Glowing orb ────────────────────────────────────────────────────── */
function Orb({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        borderRadius: '50%',
        background: color,
        filter: 'blur(90px)',
        opacity: 0.14,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

/* ─── Capability row item ────────────────────────────────────────────── */
function CapItem({
  text,
  accent,
  dark,
  delay,
}: {
  text: string;
  accent: string;
  dark: boolean;
  delay: number;
}) {
  const border = dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.07)';
  const bg = dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.025)';
  const textColor = dark ? 'rgba(255,255,255,.65)' : 'rgba(0,0,0,.6)';

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease: 'easeOut' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 16px',
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 9,
        transition: 'border-color .22s, background .22s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}50`;
        (e.currentTarget as HTMLElement).style.background = `${accent}08`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = border;
        (e.currentTarget as HTMLElement).style.background = bg;
      }}
    >
      <CheckCircle size={13} style={{ color: accent, flexShrink: 0 }} aria-hidden="true" />
      <span style={{ fontSize: 13, color: textColor, lineHeight: 1.5 }}>{text}</span>
    </motion.div>
  );
}

/* ─── Product badge ──────────────────────────────────────────────────── */
function ProductBadge({
  product,
  href,
  status,
  accent,
  dark,
}: {
  product: string;
  href: string;
  status: string;
  accent: string;
  dark: boolean;
}) {
  const isLive = status === 'Live';
  return (
    <motion.div
      {...fd(0.3)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 18px',
        background: dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.03)',
        border: `1px solid ${dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)'}`,
        borderRadius: 12,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.35)', marginBottom: 2 }}>
          Our Product
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: dark ? '#F0F0F0' : '#0D0D0D', fontFamily: "'Space Grotesk', sans-serif" }}>
          {product}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '4px 10px',
          borderRadius: 20,
          background: isLive ? `${accent}18` : 'rgba(245,158,11,.14)',
          border: `1px solid ${isLive ? `${accent}30` : 'rgba(245,158,11,.25)'}`,
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: isLive ? accent : '#F59E0B',
            display: 'inline-block',
            animation: isLive ? 'pulseDot 2s ease-in-out infinite' : 'none',
          }}
        />
        <span style={{ fontSize: 10, fontWeight: 700, color: isLive ? accent : '#F59E0B' }}>{status}</span>
      </div>

      <Link
        to={href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 12,
          fontWeight: 700,
          color: accent,
          textDecoration: 'none',
          transition: 'opacity .2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      >
        View <ExternalLink size={11} aria-hidden="true" />
      </Link>
    </motion.div>
  );
}

/* ─── Single solution section ────────────────────────────────────────── */
function SolutionSection({ s, i }: { s: (typeof solutions)[0]; i: number }) {
  const { dark, accent } = s;
  const Icon = s.icon;
  const reversed = i % 2 === 1;

  const text = dark ? '#F0F0F0' : '#0D0D0D';
  const sub = dark ? 'rgba(255,255,255,.45)' : 'rgba(0,0,0,.5)';

  return (
    <section
      id={s.id}
      style={{
        background: dark ? '#0A0A0A' : '#ffffff',
        padding: 'clamp(72px,10vw,112px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1px solid ${dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.06)'}`,
      }}
    >
      <DotGrid dark={dark} />
      <Orb
        color={accent}
        style={{
          width: 480,
          height: 480,
          top: reversed ? 'auto' : -100,
          bottom: reversed ? -80 : 'auto',
          left: reversed ? -80 : 'auto',
          right: reversed ? 'auto' : -80,
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className={`sol-grid${reversed ? ' sol-grid-rev' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'flex-start' }}
        >
          {/* ── LEFT / TEXT ────────────────────────────────────────── */}
          <div>
            {/* Icon pill */}
            <motion.div {...fd(0.04)}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 20,
                  background: `${accent}12`,
                  border: `1px solid ${accent}28`,
                  marginBottom: 22,
                }}
              >
                <Icon size={12} color={accent} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: accent }}>
                  {s.eyebrow}
                </span>
              </div>
            </motion.div>

            {/* Big index ghost */}
            <div
              aria-hidden="true"
              style={{
                fontSize: 'clamp(5rem,9vw,8rem)',
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: '-.07em',
                color: `${accent}12`,
                fontFamily: "'Space Grotesk', sans-serif",
                userSelect: 'none',
                pointerEvents: 'none',
                marginBottom: -10,
              }}
            >
              {s.index}
            </div>

            {/* Title */}
            <motion.h2
              {...fd(0.1)}
              style={{
                fontSize: 'clamp(2rem,4vw,3.25rem)',
                fontWeight: 800,
                color: text,
                letterSpacing: '-.045em',
                lineHeight: 1.06,
                fontFamily: "'Space Grotesk', sans-serif",
                marginBottom: 18,
                whiteSpace: 'pre-line',
              }}
            >
              {s.title}
            </motion.h2>

            {/* Body */}
            <motion.p {...fd(0.15)} style={{ fontSize: 14, color: sub, lineHeight: 1.82, marginBottom: 28, maxWidth: 400 }}>
              {s.body}
            </motion.p>

            {/* Stat chip */}
            <motion.div
              {...fd(0.2)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                background: `${accent}10`,
                border: `1px solid ${accent}22`,
                borderRadius: 10,
                marginBottom: 28,
              }}
            >
              <Activity size={13} color={accent} />
              <span style={{ fontSize: 20, fontWeight: 900, color: accent, letterSpacing: '-.04em', fontFamily: "'Space Grotesk', sans-serif" }}>
                {s.stat.value}
              </span>
              <span style={{ fontSize: 11, color: sub, fontWeight: 500 }}>{s.stat.label}</span>
            </motion.div>

            {/* Product badge */}
            {s.product && s.productHref && s.productStatus && (
              <div style={{ marginBottom: 0 }}>
                <ProductBadge
                  product={s.product}
                  href={s.productHref}
                  status={s.productStatus}
                  accent={accent}
                  dark={dark}
                />
              </div>
            )}
          </div>

          {/* ── RIGHT / CAPABILITIES ──────────────────────────────── */}
          <div style={{ paddingTop: 'clamp(0px,2vw,16px)' }}>
            <motion.div {...fd(0.12)}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  color: dark ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.35)',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ display: 'inline-block', width: 20, height: 1, background: 'currentColor' }} />
                Capabilities
              </div>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {s.details.map((d, di) => (
                <CapItem key={d} text={d} accent={accent} dark={dark} delay={0.18 + di * 0.06} />
              ))}
            </div>

            {/* Bottom decorative connector line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: 2,
                marginTop: 28,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${accent}60, transparent)`,
                transformOrigin: 'left',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        paddingTop: 'clamp(100px,15vw,136px)',
        paddingBottom: 'clamp(60px,8vw,88px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DotGrid dark={false} />

      {/* Parallax "04" ghost */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-3%',
          top: '50%',
          translateY: '-50%',
          fontSize: 'clamp(10rem,20vw,18rem)',
          fontWeight: 900,
          letterSpacing: '-.07em',
          color: 'rgba(0,0,0,.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily: "'Space Grotesk', sans-serif",
          y,
          opacity,
        }}
      >
        04
      </motion.div>

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 640 }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <div style={{ width: 24, height: 1, background: '#8C8C8C' }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8C8C8C' }}>
              Solution Areas
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.25rem,6vw,4.5rem)',
              fontWeight: 800,
              color: '#0D0D0D',
              letterSpacing: '-.045em',
              lineHeight: 1.02,
              fontFamily: "'Space Grotesk', sans-serif",
              margin: '0 0 20px',
            }}
          >
            What we build —{' '}
            <span style={{ color: '#2563EB' }}>and&nbsp;why</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.9375rem,1.4vw,1.0625rem)',
              color: '#4B4B4B',
              lineHeight: 1.78,
              maxWidth: 480,
              margin: '0 0 40px',
            }}
          >
            We work across four solution areas, all connected by the same principle: replace a manual, error-prone, or absent system with something reliable, digital, and operationally useful.
          </p>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
          >
            {solutions.map(s => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '8px 16px',
                    borderRadius: 20,
                    border: '1.5px solid rgba(0,0,0,.1)',
                    background: '#fff',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#0D0D0D',
                    textDecoration: 'none',
                    transition: 'border-color .2s, background .2s, transform .2s, box-shadow .2s',
                    boxShadow: '0 2px 6px rgba(0,0,0,.05)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = s.accent;
                    el.style.background = `${s.accent}08`;
                    el.style.transform = 'translateY(-2px)';
                    el.style.boxShadow = `0 8px 20px ${s.accent}20`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(0,0,0,.1)';
                    el.style.background = '#fff';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = '0 2px 6px rgba(0,0,0,.05)';
                  }}
                >
                  <Icon size={11} color={s.accent} />
                  {s.eyebrow.split(' & ')[0]}
                  <ArrowRight size={10} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Root ───────────────────────────────────────────────────────────── */
export default function Solutions() {
  return (
    <>
      <Helmet>
        <title>Solutions — IOSON</title>
        <meta name="description" content="IOSON builds water monitoring systems, operational software, automation workflows, and IoT infrastructure for real-world business problems." />
        <meta property="og:title" content="Solutions — IOSON" />
        <meta property="og:description" content="Water quality monitoring, digital infrastructure, process automation, and IoT sensor systems." />
      </Helmet>

      <HeroSection />

      {solutions.map((s, i) => (
        <SolutionSection key={s.id} s={s} i={i} />
      ))}

      <CTABanner />

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .45; transform: scale(.8); }
        }

        @media (max-width: 860px) {
          .sol-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .sol-grid-rev > *:first-child { order: 1 !important; }
          .sol-grid-rev > *:last-child  { order: 2 !important; }
        }

        .sol-grid-rev > *:first-child { order: 2; }
        .sol-grid-rev > *:last-child  { order: 1; }
      `}</style>
    </>
  );
}