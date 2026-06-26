import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/kombai/HeroSection';
import EditorialSelections from '../components/kombai/EditorialSelections';
import AboutSection from '../components/kombai/AboutSection';
import { SmoothScroll } from '../components/kombai/SmoothScroll';

export default function KombaiHomePage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <EditorialSelections />
        <AboutSection />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
