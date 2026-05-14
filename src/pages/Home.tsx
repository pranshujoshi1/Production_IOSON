import { Helmet } from 'react-helmet-async';
import { Hero } from '@/components/sections/Hero';
import { TrustSection } from '@/components/sections/TrustSection';
import { SolutionsStrip } from '@/components/sections/SolutionsStrip';
import { ProductsShowcase } from '@/components/sections/ProductsShowcase';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { InsightsPreview } from '@/components/sections/InsightsPreview';
import { CTABanner } from '@/components/sections/CTABanner';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>IOSON — Intelligent Systems for Real Operations</title>
        <meta name="description" content="IOSON builds practical IoT monitoring systems, QR-driven operational platforms, and intelligent automation software for businesses that run on real operations." />
        <meta property="og:title" content="IOSON — Intelligent Systems for Real Operations" />
        <meta property="og:description" content="Practical technology systems — IoT monitoring, QR-driven operational tools, and intelligent automation for real-world businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://iosonx.com" />
      </Helmet>
      <Hero />
      <TrustSection />
      <SolutionsStrip />
      <ProductsShowcase />
      <ProcessSection />
      <StatsSection />
      <InsightsPreview />
      <CTABanner />
    </>
  );
}
