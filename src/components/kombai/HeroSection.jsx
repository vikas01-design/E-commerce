import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  const marqueeItems = [
    "New Arrivals", "★", "Mens Wear", "★", "Womens Wear",
    "★", "Kids Wear", "★", "Summer 2025", "★", "Free Shipping", "★",
  ];

  const handleShopNow = () => {
    navigate('/shop');
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex flex-col overflow-x-hidden bg-white"
    >
      {/* Main Hero Content */}
      <div className="flex flex-row min-h-screen relative">

        {/* Left Content Side */}
        <div className="relative z-30 flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-20 pb-8 w-[55%]">

          {/* Floating accent shapes */}
          <motion.div
            animate={{ x: mousePos.x * 0.6, y: mousePos.y * 0.6 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute top-10 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-full bg-dusty-rose/20 blur-2xl pointer-events-none"
          />
          <motion.div
            animate={{ x: mousePos.x * -0.4, y: mousePos.y * -0.4 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="absolute bottom-20 left-2 w-20 h-20 sm:w-36 sm:h-36 md:w-56 md:h-56 rounded-full bg-rust/10 blur-3xl pointer-events-none"
          />

          {/* Micro label */}
          <div className="overflow-hidden mb-3 sm:mb-5 md:mb-8">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 sm:gap-3 md:gap-4"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: [0.19, 1, 0.22, 1] }}
                className="w-5 sm:w-7 md:w-10 h-[2px] bg-rust origin-left flex-shrink-0"
              />
              <span className="font-outfit font-bold uppercase text-rust tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.4em] text-[8px] sm:text-[10px] md:text-xs">
                Collection 2025
              </span>
            </motion.div>
          </div>

          {/* Hero Title */}
          <h1 className="font-syne font-extrabold uppercase leading-[0.85] tracking-tighter mb-3 sm:mb-6 md:mb-10">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "110%", skewY: 6 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-ink-black"
                style={{ fontSize: "clamp(1.6rem, 7vw, 9rem)" }}
              >
                Style
              </motion.span>
              <br />
              <motion.span
                initial={{ y: "110%", skewY: 6 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-ink-black"
                style={{
                  fontSize: "clamp(1.6rem, 7vw, 9rem)",
                  WebkitTextStroke: "clamp(0.5px, 0.1vw, 1.5px) #111",
                  color: "transparent",
                }}
              >
                UP
              </motion.span>
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2, ease: "backOut" }}
                className="inline-block text-rust"
                style={{ fontSize: "clamp(1.6rem, 7vw, 9rem)" }}
              >
                .
              </motion.span>
            </div>
          </h1>

          {/* Description */}
          <div className="overflow-hidden mb-4 sm:mb-8 md:mb-12">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-outfit text-ink-black/60 leading-relaxed"
              style={{ fontSize: "clamp(0.65rem, 1.5vw, 1.125rem)" }}
            >
              Discover curated collections that blend timeless elegance with
              modern minimalism. Fashion crafted for those who dare to be different.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-5"
          >
            <motion.button
              onClick={handleShopNow}
              whileHover={{ scale: 1.04, x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-ink-black text-white font-syne font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-rust transition-colors duration-500 cursor-pointer"
              style={{ fontSize: "clamp(0.5rem, 1.1vw, 0.875rem)", padding: "clamp(0.4rem, 1vw, 1rem) clamp(0.6rem, 2vw, 2rem)" }}
            >
              Shop Now
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                style={{ width: "clamp(10px, 1.2vw, 16px)", height: "clamp(10px, 1.2vw, 16px)" }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group font-syne font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] border border-ink-black/20 text-ink-black hover:border-ink-black transition-colors duration-500 relative overflow-hidden cursor-pointer"
              style={{ fontSize: "clamp(0.5rem, 1.1vw, 0.875rem)", padding: "clamp(0.4rem, 1vw, 1rem) clamp(0.6rem, 2vw, 2rem)" }}
            >
              <span className="relative z-10">Explore</span>
              <motion.div className="absolute inset-0 bg-ink-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-8 md:gap-16 mt-5 sm:mt-10 md:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-ink-black/10"
          >
            {[
              { number: "200+", label: "Designs" },
              { number: "50K+", label: "Happy Customers" },
              { number: "4.9", label: "Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 + i * 0.15 }}
              >
                <div
                  className="font-syne font-extrabold text-ink-black tracking-tighter"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.875rem)" }}
                >
                  {stat.number}
                </div>
                <div
                  className="font-outfit uppercase tracking-[0.15em] text-ink-black/40 mt-0.5"
                  style={{ fontSize: "clamp(0.5rem, 0.9vw, 0.6875rem)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Image Side */}
        <div className="relative w-[45%] min-h-screen">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
              transition={{ type: "spring", stiffness: 50, damping: 30 }}
              className="w-full h-full"
            >
              <motion.img
                src="/hero-fashion.png"
                alt="Fashion Collection"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent w-1/3" />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 2, ease: "backOut" }}
            className="absolute bottom-4 left-3 sm:bottom-8 sm:left-6 md:bottom-16 md:left-12 z-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/10"
              style={{ width: "clamp(2.5rem, 6vw, 7rem)", height: "clamp(2.5rem, 6vw, 7rem)" }}
            >
              <span
                className="font-syne font-bold text-white uppercase tracking-widest text-center leading-tight"
                style={{ fontSize: "clamp(0.35rem, 0.8vw, 0.75rem)" }}
              >
                New<br />Season
              </span>
            </motion.div>
          </motion.div>

          {/* Vertical text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:block"
          >
            <span
              className="font-outfit uppercase text-white"
              style={{ writingMode: "vertical-rl", fontSize: "clamp(0.4rem, 0.7vw, 0.625rem)", letterSpacing: "0.4em" }}
            >
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Marquee Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="w-full py-3 sm:py-4 md:py-5 overflow-hidden relative z-30"
        style={{ background: "linear-gradient(135deg, #E2B6B5 0%, #D0BDB3 40%, #C87A5D 100%)" }}
      >
        <div className="kombai-animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-outfit font-semibold uppercase text-white shrink-0 drop-shadow-sm"
              style={{ fontSize: "clamp(0.5rem, 1.1vw, 0.875rem)", letterSpacing: "0.25em", margin: "0 clamp(0.8rem, 2vw, 2.5rem)" }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-ink-black/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
