import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/** Catches unhandled JS errors and shows a graceful fallback instead of a white screen. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to console in dev; replace with Sentry in Phase 5
    console.error('[ErrorBoundary] Unhandled error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F5F5',
          fontFamily: "'Inter', sans-serif",
          padding: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <div
            style={{
              fontSize: 'clamp(4rem,12vw,7rem)',
              fontWeight: 800,
              color: 'rgba(0,0,0,0.06)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: 8,
            }}
          >
            500
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.1rem,2vw,1.4rem)',
              fontWeight: 700,
              color: '#0D0D0D',
              letterSpacing: '-0.02em',
              marginBottom: 10,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Something went wrong
          </h1>
          <p style={{ fontSize: 14, color: '#4B4B4B', marginBottom: 28, lineHeight: 1.6 }}>
            An unexpected error occurred. Our team has been notified. Please try refreshing the page.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '11px 22px',
              borderRadius: 6,
              background: '#0D0D0D',
              color: '#F5F5F5',
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }
}
