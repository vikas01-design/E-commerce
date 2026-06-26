import { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryShowcase from '../components/CategoryShowcase';
import TrustStrip from '../components/TrustStrip';
import Trending from '../components/Trending';
import TodaysDeals from '../components/TodaysDeals';
import FastSelling from '../components/FastSelling';
import NewStock from '../components/NewStock';
import Footer from '../components/Footer';

function HomePage() {
  const observerRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll-reveal
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach(el => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryShowcase />
        <TrustStrip />
        <Trending />
        <TodaysDeals />
        <FastSelling />
        <NewStock />
      </main>
      <Footer />

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 200,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#1a1a1a',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: showBackToTop ? 'all' : 'none',
        }}
      >
        <ChevronUp size={20} strokeWidth={2.5} />
      </button>
    </>
  );
}

export default HomePage;
