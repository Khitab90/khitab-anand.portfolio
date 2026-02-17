import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import CustomCursor from './components/shared/CustomCursor';
import { useLenis } from './hooks/useLenis';

// Lazy-load below-the-fold sections
const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Contact = lazy(() => import('./components/sections/Contact'));

function SectionFallback() {
  return <div className="min-h-screen" aria-hidden="true" />;
}

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
