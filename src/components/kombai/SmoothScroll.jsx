import { useEffect, useLayoutEffect, useState } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const lenis = new Lenis({
      lerp: 0.05,
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [mounted]);

  return (
    <div className={mounted ? "opacity-100 transition-opacity duration-700" : "opacity-0"}>
      {children}
    </div>
  );
};
