import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Easing } from 'framer-motion';

/* ─── Types ─────────────────────────────────────────── */
type Point = {
  x: number; y: number;
  originX: number; originY: number;
  vx: number; vy: number;
};

/* ─── Grid Background ───────────────────────────────── */
interface GridBgProps {
  cellSize?: number;
  wobbleStrength?: number;
  interactionRadius?: number;
}

function GridBackground({
  cellSize = 72,
  wobbleStrength = 0.32,
  interactionRadius = 220,
}: GridBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const pointsRef = useRef<Point[]>([]);
  const rafRef    = useRef<number | null>(null);
  const colsRef   = useRef(0);
  const rowsRef   = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function init() {
      if (!canvas || !ctx) return;
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      const cols = Math.ceil(w / cellSize) + 2;
      const rows = Math.ceil(h / cellSize) + 2;
      colsRef.current = cols;
      rowsRef.current = rows;
      const pts: Point[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = (c - 0.5) * cellSize;
          const oy = (r - 0.5) * cellSize;
          pts.push({ x: ox, y: oy, originX: ox, originY: oy, vx: 0, vy: 0 });
        }
      }
      pointsRef.current = pts;
    }
    init();

    const onMouseMove  = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onTouchMove  = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
    };
    const parent = canvas.parentElement ?? document.body;
    parent.addEventListener('mousemove',  onMouseMove  as EventListener);
    parent.addEventListener('mouseleave', onMouseLeave as EventListener);
    parent.addEventListener('touchmove',  onTouchMove  as EventListener, { passive: true });

    const SPRING = 0.060, DAMPING = 0.87, IDLE_A = 0.20, IDLE_S = 0.00028;
    const CR = 99, CG = 102, CB = 241;
    let t = 0;

    function animate() {
      if (!ctx || !canvas) return;
      const w = canvas.width / dpr, h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      const mouse = mouseRef.current, pts = pointsRef.current;
      const cols = colsRef.current, rows = rowsRef.current;
      const active = !isMobile && mouse.x > -100;
      t++;

      for (let i = 0; i < pts.length; i++) {
        const pt = pts[i];
        const idleX = Math.sin(t * IDLE_S + pt.originX * 0.011) * IDLE_A;
        const idleY = Math.cos(t * IDLE_S + pt.originY * 0.011) * IDLE_A;
        if (active) {
          const dx = mouse.x - pt.x, dy = mouse.y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < interactionRadius && dist > 0) {
            const norm = 1 - dist / interactionRadius;
            const force = norm * norm * wobbleStrength * 16;
            const ang = Math.atan2(dy, dx);
            pt.vx -= Math.cos(ang) * force * 0.11;
            pt.vy -= Math.sin(ang) * force * 0.11;
          }
        }
        pt.vx += (pt.originX + idleX - pt.x) * SPRING;
        pt.vy += (pt.originY + idleY - pt.y) * SPRING;
        pt.vx *= DAMPING; pt.vy *= DAMPING;
        pt.x += pt.vx; pt.y += pt.vy;
      }

      if (active) {
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, interactionRadius * 1.1);
        grd.addColorStop(0,   `rgba(${CR},${CG},${CB},0.10)`);
        grd.addColorStop(0.45,`rgba(${CR},${CG},${CB},0.05)`);
        grd.addColorStop(1,   `rgba(${CR},${CG},${CB},0.00)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.lineWidth = 0.75;
      function segColor(mx: number, my: number): string {
        if (!active) return 'rgba(0,0,0,0.09)';
        const dx = mouse.x - mx, dy = mouse.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= interactionRadius) return 'rgba(0,0,0,0.09)';
        const tv = 1 - dist / interactionRadius;
        const sm = tv * tv * (3 - 2 * tv);
        const a = 0.09 + sm * 0.55;
        return `rgba(${CR},${CG},${CB},${a.toFixed(3)})`;
      }
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = pts[r * cols + c], p2 = pts[r * cols + c + 1];
          ctx.beginPath();
          ctx.strokeStyle = segColor((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5);
          ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        }
      }
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = pts[r * cols + c], p2 = pts[(r + 1) * cols + c];
          ctx.beginPath();
          ctx.strokeStyle = segColor((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5);
          ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        }
      }
      if (active) {
        for (let i = 0; i < pts.length; i++) {
          const pt = pts[i];
          const dx = mouse.x - pt.x, dy = mouse.y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < interactionRadius * 0.75) {
            const t2 = 1 - dist / (interactionRadius * 0.75);
            const sm = t2 * t2;
            ctx.beginPath();
            ctx.fillStyle = `rgba(${CR},${CG},${CB},${(sm * 0.55).toFixed(3)})`;
            ctx.arc(pt.x, pt.y, sm * 1.8 + 0.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    animate();

    const onResize = () => init();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      parent.removeEventListener('mousemove',  onMouseMove  as EventListener);
      parent.removeEventListener('mouseleave', onMouseLeave as EventListener);
      parent.removeEventListener('touchmove',  onTouchMove  as EventListener);
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [cellSize, wobbleStrength, interactionRadius, isMobile]);

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

/* ─── Cycling word ───────────────────────────────────── */
const WORDS = [
  { text: 'IoT Monitoring',    color: '#2563EB' },
  { text: 'Smart Automation',  color: '#7C3AED' },
  { text: 'QR Platforms',      color: '#16A34A' },
  { text: 'Water Management',  color: '#0891B2' },
  { text: 'Edge Intelligence', color: '#D97706' },
];

function RotatingWord() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 3500);
    return () => clearInterval(id);
  }, []);

  const word = WORDS[idx];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={word.text}
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y:  0, filter: 'blur(0px)' }}
        exit={{    opacity: 0, y:-16, filter: 'blur(6px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ display: 'block', color: word.color }}
      >
        {word.text}
      </motion.span>
    </AnimatePresence>
  );
}


/* ─── Animation helper ───────────────────────────────── */
const EASE: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;
const fu = (d = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { delay: d, duration: 0.6, ease: EASE },
});

/* ─── Hero ───────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      aria-label="IOSON — Intelligent systems for real-world operations"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* Interactive grid */}
      <GridBackground cellSize={72} wobbleStrength={0.32} interactionRadius={220} />

      {/* Soft center bloom */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-5%', left: '50%',
        transform: 'translateX(-50%)',
        width: '80%', height: '70%',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(37,99,235,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Content */}
      <div
        className="container-custom"
        style={{
          position: 'relative', zIndex: 10,
          width: '100%',
          paddingTop: 'calc(var(--nav-h) + 2.5rem)',
          paddingBottom: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <motion.div {...fu(0.08)} style={{ marginBottom: '1.75rem' }}>
          <span className="tag-accent">
            <span className="accent-dot" aria-hidden="true"/>
            Intelligent Systems Engineering
          </span>
        </motion.div>

        {/* Headline */}
        <h1 style={{ margin: '0 0 1.5rem', padding: 0, maxWidth: 800 }}>
          <motion.span {...fu(0.15)} style={{ display: 'block' }}>
            <span style={hs}>Think Innovatively</span>
          </motion.span>

          {/* Build [rotating word]. — plain block, text centered by parent */}
          <motion.span {...fu(0.25)} style={{ display: 'block' }}>
            <span style={hs}>
              Build{' '}<RotatingWord />{''}
            </span>
          </motion.span>

          <motion.span {...fu(0.35)} style={{ display: 'block' }}>
            <span style={hs}>Solve Real Problems.</span>
          </motion.span>
        </h1>

        {/* Body */}
        <motion.p {...fu(0.50)} style={{
          fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
          color: '#555', lineHeight: 1.82,
          maxWidth: 540, margin: '0 0 2.25rem',
        }}>
          We build practical technology systems — IoT monitoring platforms, QR-driven operational tools, and intelligent automation — that help businesses replace manual processes with reliable, real-time software.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fu(0.62)} style={{
          display: 'flex', alignItems: 'center',
          gap: '0.875rem', flexWrap: 'wrap',
          justifyContent: 'center', marginBottom: '3rem',
        }}>
          <Link to="/products" className="btn-primary" aria-label="Explore IOSON products">
            Explore Products <ArrowRight size={13} aria-hidden="true"/>
          </Link>
          <Link to="/contact" className="btn-ghost" aria-label="Get in touch with IOSON">
            Contact Us
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div {...fu(0.74)} style={{
          display: 'flex', alignItems: 'center',
          gap: 'clamp(2rem, 5vw, 4rem)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingTop: '1.75rem',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          width: '100%', maxWidth: 520,
        }}>
          {[
            { v: '2',    l: 'Products in market'   },
            { v: '340+', l: 'Active sensor nodes'  },
            { v: '100%', l: 'Uptime SLA delivered' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                fontWeight: 800, color: '#0D0D0D',
                lineHeight: 1, marginBottom: 5,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.04em',
              }}>{s.v}</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#999' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
        background: 'linear-gradient(to top, #FFFFFF, transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />
    </section>
  );
}

/* Headline style shared across all 3 lines */
const hs: React.CSSProperties = {
  display: 'inline',
  fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
  fontWeight: 800,
  lineHeight: 1.08,
  letterSpacing: '-0.04em',
  color: '#0D0D0D',
  fontFamily: "'Space Grotesk', sans-serif",
};