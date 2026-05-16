import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { SplashScreen, useSplash } from '@/components/layout/SplashScreen';

// ── Route-level code splitting ─────────────────────────────────────────────
// Each page is a separate chunk — users only download the code for the page they visit.
const Home           = lazy(() => import('@/pages/Home'));
const Solutions      = lazy(() => import('@/pages/Solutions'));
const Products       = lazy(() => import('@/pages/Products'));
const Thalii         = lazy(() => import('@/pages/products/Thalii'));
const Pramaan        = lazy(() => import('@/pages/products/Pramaan'));
const About          = lazy(() => import('@/pages/About'));
const Insights       = lazy(() => import('@/pages/Insights'));
const Contact        = lazy(() => import('@/pages/Contact'));
const PrivacyPolicy  = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));

// ── Minimal loading skeleton ───────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div
      aria-label="Loading page…"
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid rgba(0,0,0,0.08)',
          borderTopColor: '#0D0D0D',
          animation: 'spin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── 404 page ───────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F5F5', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: 'clamp(5rem,15vw,9rem)', fontWeight: 800, color: 'rgba(0,0,0,.06)', letterSpacing: '-.05em', lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 8 }}>404</div>
        <h1 style={{ fontSize: 'clamp(1.25rem,2.5vw,1.75rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-.02em', marginBottom: 12, fontFamily: "'Space Grotesk',sans-serif" }}>Page not found</h1>
        <p style={{ fontSize: 14, color: '#4B4B4B', marginBottom: 28, lineHeight: 1.6 }}>The page you're looking for doesn't exist or has been moved.</p>
        <a href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 22px', borderRadius: 6, background: '#0D0D0D', color: '#F5F5F5', fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'opacity .2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}>
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const { showSplash, handleComplete } = useSplash();

  return (
    <HelmetProvider>
      {/* ── Splash screen — fires once per hard refresh ── */}
      {showSplash && <SplashScreen onComplete={handleComplete} />}

      <BrowserRouter>
        <ScrollToTop />
        {/* Suspense wraps all lazy routes — shows spinner while chunk loads */}
        <Suspense fallback={<PageSkeleton />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route element={<PageWrapper><Home /></PageWrapper>}           path="/" />
              <Route element={<PageWrapper><Solutions /></PageWrapper>}      path="/solutions" />
              <Route element={<PageWrapper><Products /></PageWrapper>}       path="/products" />
              <Route element={<PageWrapper><Thalii /></PageWrapper>}         path="/products/thalii" />
              <Route element={<PageWrapper><Pramaan /></PageWrapper>}        path="/products/pramaan" />
              <Route element={<PageWrapper><About /></PageWrapper>}          path="/about" />
              <Route element={<PageWrapper><Insights /></PageWrapper>}       path="/insights" />
              <Route element={<PageWrapper><Insights /></PageWrapper>}       path="/insights/:slug" />
              <Route element={<PageWrapper><Contact /></PageWrapper>}        path="/contact" />
              <Route element={<PageWrapper><PrivacyPolicy /></PageWrapper>}  path="/privacy" />
              <Route element={<PageWrapper><TermsOfService /></PageWrapper>} path="/terms" />
              <Route element={<NotFound />}                                  path="*" />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
