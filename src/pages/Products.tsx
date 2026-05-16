import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Activity, Droplets, QrCode } from 'lucide-react';
import { CTABanner } from '@/components/sections/CTABanner';
import { useRef, useEffect, useState } from 'react';

/* ─── Animation helpers ──────────────────────────────────────────────── */
const fade = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─── Product data ───────────────────────────────────────────────────── */
const products = [
  {
    id: 'thalii',
    name: 'Thalii',
    category: 'SaaS Platform',
    tagline: 'QR-Based Meal Subscription & Customer Management',
    description:
      'A complete digital operations platform for food-service businesses. Replaces paper tracking and fragmented customer records with a unified, QR-driven system.',
    capabilities: [
      'QR code subscription sign-up & verification',
      'Real-time meal redemption tracking',
      'Customer portal with subscription management',
      'Kitchen dashboard with live order queue',
      'Consumption analytics & churn signals',
      'Digital wallet and top-up flows',
    ],
    href: '/products/thalii',
    dark: false,
    accent: '#2563EB',
    icon: QrCode,
    stats: [
      { label: 'QR Scans Today', value: 84, unit: '%' },
      { label: 'Active Subscriptions', value: 67, unit: '%' },
      { label: 'Revenue Rate', value: 91, unit: '%' },
    ],
    badge: 'Live in Production',
    metric: { value: '2.4k', label: 'meals tracked daily' },
  },
  {
    id: 'pramaan',
    name: 'Pramaan',
    category: 'IoT Hardware + Software',
    tagline: 'Intelligent Water Quality Monitoring System',
    description:
      'Deploys precision sensors to continuously track water quality, detect contamination in real time, and trigger operator alerts before public health impact occurs.',
    capabilities: [
      'Multi-parameter sensing (pH, turbidity, TDS, temp)',
      'Real-time contamination event detection',
      'Automated SMS, app & email alerting',
      'Historical trend visualization',
      'Compliance-ready reporting & audit logs',
      'Edge processing for low-latency detection',
    ],
    href: '/products/pramaan',
    dark: true,
    accent: '#22C55E',
    icon: Droplets,
    stats: [
      { label: 'Water Quality Index', value: 96, unit: '%' },
      { label: 'Sensor Uptime', value: 100, unit: '%' },
      { label: 'Threat Detection', value: 99, unit: '%' },
    ],
    badge: 'IoT Deployed',
    metric: { value: '99.9%', label: 'contamination detection' },
  },
];

/* ─── Animated number counter ────────────────────────────────────────── */
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const end = value;
        const duration = 1200;
        const step = (timestamp: number, startTime: number) => {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.floor(ease * end));
          if (progress < 1) requestAnimationFrame(ts => step(ts, startTime));
        };
        requestAnimationFrame(ts => step(ts, ts));
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Glowing orb background element ────────────────────────────────── */
function GlowOrb({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        borderRadius: '50%',
        background: color,
        filter: 'blur(80px)',
        opacity: 0.18,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

/* ─── Mini dashboard card ────────────────────────────────────────────── */
function ProductCard({ product }: { product: (typeof products)[0] }) {
  const { dark, accent, stats, badge, metric } = product;
  const bg = dark ? '#111111' : '#ffffff';
  const border = dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.07)';
  const text = dark ? '#F0F0F0' : '#0D0D0D';
  const sub = dark ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.4)';
  const trackBg = dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';
  const Icon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      {/* Card glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: 18,
          background: `linear-gradient(135deg, ${accent}33, transparent 60%)`,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: bg,
          border: `1px solid ${border}`,
          borderRadius: 18,
          padding: 'clamp(20px,3vw,28px)',
          boxShadow: dark
            ? '0 32px 64px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.04)'
            : '0 32px 64px rgba(0,0,0,.1), 0 0 0 1px rgba(0,0,0,.04)',
          width: '100%',
          maxWidth: 360,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: `${accent}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={16} color={accent} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: text }}>{product.name}</div>
              <div style={{ fontSize: 10, color: sub, marginTop: 1 }}>{product.category}</div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: `${accent}15`,
              borderRadius: 20,
              padding: '4px 10px',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: accent }}>{badge}</span>
          </div>
        </div>

        {/* Stats bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
          {stats.map((s, i) => (
            <div key={s.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: sub, fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: text, fontVariantNumeric: 'tabular-nums' }}>
                  <Counter value={s.value} suffix={s.unit} />
                </span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: trackBg, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    height: '100%',
                    borderRadius: 3,
                    background: s.value >= 90
                      ? `linear-gradient(90deg, ${accent}, ${accent}cc)`
                      : `linear-gradient(90deg, ${accent}99, ${accent}66)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Metric highlight */}
        <div
          style={{
            background: dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.03)',
            borderRadius: 10,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Activity size={14} color={accent} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: text, lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>
              {metric.value}
            </div>
            <div style={{ fontSize: 10, color: sub, marginTop: 2 }}>{metric.label}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{ fontSize: 10, color: accent, fontWeight: 700 }}>↑ Operational</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Single product section ─────────────────────────────────────────── */
function ProductSection({ product, index }: { product: (typeof products)[0]; index: number }) {
  const { dark, accent } = product;
  const reversed = index % 2 === 1;
  const text = dark ? '#F0F0F0' : '#0D0D0D';
  const sub = dark ? 'rgba(255,255,255,.45)' : 'rgba(0,0,0,.5)';
  const capColor = dark ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.55)';
  const Icon = product.icon;

  return (
    <section
      id={product.id}
      style={{
        background: dark ? '#0A0A0A' : '#F5F5F5',
        padding: 'clamp(72px,10vw,108px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      {dark && (
        <>
          <GlowOrb color={accent} style={{ width: 500, height: 500, top: -100, right: -100 }} />
          <GlowOrb color="#2563EB" style={{ width: 300, height: 300, bottom: -80, left: -80 }} />
          {/* Grid lines */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
              pointerEvents: 'none',
            }}
          />
        </>
      )}
      {!dark && (
        <>
          <GlowOrb color={accent} style={{ width: 600, height: 400, top: -150, left: reversed ? 'auto' : '-10%', right: reversed ? '-10%' : 'auto' }} />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `radial-gradient(circle, rgba(0,0,0,.04) 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        {/* Category eyebrow */}
        <motion.div {...fade(0.05)} style={{ marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, border: `1px solid ${accent}30`, background: `${accent}10`, marginBottom: 0 }}>
            <Icon size={11} color={accent} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: accent }}>
              {product.category}
            </span>
          </div>
        </motion.div>

        <div
          className={`product-row${reversed ? ' product-row-reverse' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'center' }}
        >
          {/* Text col */}
          <div className="product-text">
            {/* Big number / stat */}
            <motion.div {...fade(0.08)}>
              <div
                style={{
                  fontSize: 'clamp(4rem,8vw,7rem)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-.06em',
                  color: `${accent}18`,
                  fontFamily: "'Space Grotesk', sans-serif",
                  marginBottom: -8,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                0{index + 1}
              </div>
            </motion.div>

            <motion.h2
              {...fade(0.12)}
              style={{
                fontSize: 'clamp(2.25rem,4.5vw,3.75rem)',
                fontWeight: 800,
                color: text,
                letterSpacing: '-.045em',
                lineHeight: 1.02,
                fontFamily: "'Space Grotesk', sans-serif",
                marginBottom: 10,
                marginTop: 6,
              }}
            >
              {product.name}
            </motion.h2>

            <motion.div
              {...fade(0.16)}
              style={{ fontSize: 13, fontWeight: 700, color: accent, marginBottom: 16, letterSpacing: '.01em' }}
            >
              {product.tagline}
            </motion.div>

            <motion.p
              {...fade(0.19)}
              style={{
                fontSize: 14,
                color: sub,
                lineHeight: 1.8,
                marginBottom: 28,
                maxWidth: 400,
              }}
            >
              {product.description}
            </motion.p>

            {/* Capabilities grid */}
            <motion.ul
              {...fade(0.22)}
              style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 36, listStyle: 'none', padding: 0 }}
            >
              {product.capabilities.map((c, ci) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.24 + ci * 0.055, duration: 0.45, ease: 'easeOut' }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: capColor }}
                >
                  <CheckCircle size={13} style={{ color: accent, flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  {c}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div {...fade(0.28)}>
              <Link
                to={product.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '13px 24px',
                  borderRadius: 8,
                  background: dark ? '#F5F5F5' : '#0D0D0D',
                  color: dark ? '#0D0D0D' : '#F5F5F5',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                  letterSpacing: '.02em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = dark
                    ? '0 12px 32px rgba(255,255,255,.15)'
                    : '0 12px 32px rgba(0,0,0,.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Explore {product.name}
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          {/* Visual col */}
          <div className="product-visual" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: -18,
                right: reversed ? 'auto' : -14,
                left: reversed ? -14 : 'auto',
                background: dark ? '#1A1A1A' : '#fff',
                border: `1px solid ${dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.07)'}`,
                borderRadius: 10,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                boxShadow: '0 8px 24px rgba(0,0,0,.12)',
                zIndex: 2,
              }}
            >
              <Zap size={11} color={accent} />
              <span style={{ fontSize: 11, fontWeight: 700, color: dark ? '#F0F0F0' : '#0D0D0D' }}>Live & Operational</span>
            </motion.div>

            <ProductCard product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Scroll-driven hero number ──────────────────────────────────────── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        background: '#F5F5F5',
        paddingTop: 'clamp(100px,15vw,136px)',
        paddingBottom: 'clamp(56px,8vw,88px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Big decorative background text */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-2%',
          top: '50%',
          translateY: '-50%',
          fontSize: 'clamp(10rem,20vw,18rem)',
          fontWeight: 900,
          letterSpacing: '-.06em',
          color: 'rgba(0,0,0,.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily: "'Space Grotesk', sans-serif",
          y,
          opacity,
        }}
      >
        02
      </motion.div>

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <div style={{ width: 24, height: 1, background: '#8C8C8C' }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8C8C8C' }}>
              Our Products
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem,6vw,5rem)',
              fontWeight: 800,
              color: '#0D0D0D',
              letterSpacing: '-.045em',
              lineHeight: 1.02,
              fontFamily: "'Space Grotesk', sans-serif",
              margin: '0 0 22px',
              maxWidth: 640,
            }}
          >
            Built for real<br />
            <span style={{ color: '#2563EB' }}>operations.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.9375rem,1.4vw,1.0625rem)',
              color: '#4B4B4B',
              lineHeight: 1.78,
              maxWidth: 440,
              margin: '0 0 44px',
            }}
          >
            Two products, two distinct domains — engineered with precision, deployed in production, designed to scale.
          </p>

          {/* Product quick-nav pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
          >
            {products.map(p => (
              <a
                key={p.id}
                href={`#${p.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '9px 18px',
                  borderRadius: 20,
                  border: '1.5px solid rgba(0,0,0,.12)',
                  background: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#0D0D0D',
                  textDecoration: 'none',
                  transition: 'border-color .2s, background .2s, transform .2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = p.accent;
                  e.currentTarget.style.background = `${p.accent}08`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,.12)';
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.accent, display: 'inline-block', flexShrink: 0 }} />
                {p.name}
                <ArrowRight size={11} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Root export ────────────────────────────────────────────────────── */
export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products — IOSON</title>
        <meta
          name="description"
          content="IOSON products: Thalii (QR meal subscription platform) and Pramaan (IoT water quality monitoring). Purpose-built technology for real operations."
        />
        <meta property="og:title" content="Products — IOSON" />
        <meta
          property="og:description"
          content="Thalii and Pramaan — deeply engineered, production-proven products built for real-world operations."
        />
      </Helmet>

      <HeroSection />

      {products.map((p, i) => (
        <ProductSection key={p.id} product={p} index={i} />
      ))}

      <CTABanner />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(0.85); }
        }

        @media (max-width: 900px) {
          .product-row {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .product-text  { order: 1 !important; }
          .product-visual { display: none !important; }
        }

        .product-row-reverse .product-text  { order: 2; }
        .product-row-reverse .product-visual { order: 1; }

        @media (max-width: 900px) {
          .product-row-reverse .product-text  { order: 1 !important; }
        }
      `}</style>
    </>
  );
}