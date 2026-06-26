import '../styles/cinematic.css';
import CinematicNavbar from '../components/cinematic/CinematicNavbar';
import CinematicHero from '../components/cinematic/CinematicHero';
import CinematicOrbit from '../components/cinematic/CinematicOrbit';
import CinematicTrending from '../components/cinematic/CinematicTrending';
import CinematicDeals from '../components/cinematic/CinematicDeals';
import CinematicFastSelling from '../components/cinematic/CinematicFastSelling';
import CinematicNewArrivals from '../components/cinematic/CinematicNewArrivals';
import CinematicFooter from '../components/cinematic/CinematicFooter';

const CinematicHomePage = () => {
  return (
    <div className="cinematic-page">
      <CinematicNavbar />
      <main>
        <CinematicHero />
        <CinematicOrbit />
        <CinematicTrending />
        <CinematicDeals />
        <CinematicFastSelling />
        <CinematicNewArrivals />
      </main>
      <CinematicFooter />
    </div>
  );
};

export default CinematicHomePage;
