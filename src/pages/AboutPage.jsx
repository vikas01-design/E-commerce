import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Mail, Phone, Send, CheckCircle, Clock, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";

const bgImages = Array.from(
  new Set([
    "/pexels-shootsaga-36607719.jpg",
    "/hero-fashion.png",
    "/kids-wear.png",
    "/mens-wear.png",
    "/womens-wear.png",
    "/floral-cotton-kurti.jpg",
    "/pexels-ab_h_i-s_h_ek_09-283673767-33566411.jpg",
    "/pexels-artosuraj-28284555.jpg",
    "/pexels-deepak-sharma-503041381-35591476.jpg",
    "/pexels-dhanno-19589907.jpg",
    "/pexels-hemant-saini-2148893253-33229250.jpg",
    "/pexels-jeegzart-photography-2000617-16375802.jpg",
    "/pexels-kevinshrmasc-30899451.jpg",
    "/pexels-krishna-sridhar-photography-1233436552-28954056.jpg",
    "/pexels-p-g-354416850-29151649.jpg",
    ...products.map((p) => p.image),
  ].filter(Boolean))
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1, delay },
});

export default function AboutPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] font-sans overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO — full-screen dark editorial
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={bgImages[currentImageIndex]}
              alt="Sai Deepthi Dresses Background"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/60 via-[#0d0d0d]/40 to-[#0d0d0d]" />
        </div>

        {/* Decorative lines */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-10">
          {[100, 60, 80].map((w, i) => (
            <motion.div key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.5 + i * 0.2 }}
              className="h-px bg-white/30 origin-left" style={{ width: `${w}px` }} />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32">
          <motion.p {...fadeUp(0.2)}
            className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#CBC0D3] mb-8">
            Est. 2019 · Peddapalli, Telangana
          </motion.p>

          <motion.h1 {...fadeUp(0.35)}
            className="text-white font-serif leading-[0.88] mb-8"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)", fontWeight: 800 }}>
            Sai Deepthi<br />
            <span className="text-transparent" style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.4)",
            }}>Dresses</span>
          </motion.h1>

          <motion.p {...fadeUp(0.5)}
            className="text-white/60 font-light max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>
            Seven years of crafting elegance. One family's passion for fashion — now at your doorstep.
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="mt-12 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-white/30" />
            <span className="text-white/40 text-[11px] uppercase tracking-widest font-bold">Scroll to explore</span>
            <div className="h-px w-12 bg-white/30" />
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
      </section>

      {/* ══════════════════════════════════════════
          STORY — dark bg, large text
      ══════════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-24 md:py-36 px-6 md:px-14">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

            {/* Left — label + stats */}
            <div>
              <motion.p {...fadeUp(0)} className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#CBC0D3] mb-6">
                Our Story
              </motion.p>
              <motion.h2 {...fadeUp(0.1)}
                className="text-white font-serif leading-tight mb-12"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700 }}>
                7 Years of Style<br />& Trust
              </motion.h2>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "7+",    label: "Years Active"    },
                  { value: "500+",  label: "Happy Families"  },
                  { value: "1000+", label: "Products"        },
                  { value: "4",     label: "Collections"     },
                ].map((s, i) => (
                  <motion.div key={s.label} {...fadeUp(0.1 * i + 0.2)}
                    className="border border-white/10 rounded-2xl p-5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <p className="text-white font-serif font-bold leading-none mb-1"
                      style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>{s.value}</p>
                    <p className="text-white/40 text-[11px] uppercase tracking-widest font-bold">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — body text */}
            <motion.div {...fadeUp(0.2)} className="space-y-6 pt-2 lg:pt-16">
              <p className="text-white/80 leading-relaxed" style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}>
                Welcome to <span className="text-white font-semibold">Sai Deepthi Dresses</span>, your ultimate one-stop fashion
                destination located in the heart of Peddapalli, Telangana. We are dedicated to bringing you the latest clothing
                trends at unbeatable, affordable prices — without compromising on quality.
              </p>

              <div className="border-l-2 border-[#CBC0D3] pl-6">
                <p className="text-white/60 leading-relaxed" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>
                  For the past <span className="text-white font-semibold">7 years</span>, Sai Deepthi Dresses has been a proud
                  part of the Peddapalli community, helping families look and feel their best. What started as a beloved local
                  shopping destination has grown into a trusted fashion staple.
                </p>
              </div>

              <p className="text-white/60 leading-relaxed" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>
                Now, we are taking our 7 years of retail experience, deep understanding of fabrics, and passion for customer
                service <span className="text-white font-semibold">online</span> — bringing our curated collections right to
                your doorstep, no matter where you are.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT WE OFFER — light section, premium cards
      ══════════════════════════════════════════ */}
      <section className="bg-[#F7F4F0] py-24 md:py-36 px-6 md:px-14">
        <div className="max-w-[1300px] mx-auto">
          <motion.div {...fadeUp(0)} className="mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E9AAF] mb-4">Our Collections</p>
            <h2 className="font-serif text-[#1a1a1a] leading-tight"
              style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", fontWeight: 800 }}>
              What We<br />
              <span className="italic font-light text-[#8E9AAF]">Offer</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                title: "Elegant Sarees",
                desc: "Traditional and contemporary drapes perfect for weddings, festivals, and daily wear.",
                bg: "from-[#EFD3D7] to-[#f5e6e8]",
                img: "/pexels-thrissurkaranphotography-29873543.jpg",
              },
              {
                num: "02",
                title: "Women's Wear & Kurtis",
                desc: "Beautiful floral printed kurtis, ethnic sets, and everyday casuals.",
                bg: "from-[#CBC0D3] to-[#ddd6e8]",
                img: "/pexels-gustavo-fring-8770947.jpg",
              },
              {
                num: "03",
                title: "Men's Wear",
                desc: "From sharp casuals to comfortable daily essentials.",
                bg: "from-[#c5cdd9] to-[#d8dfe8]",
                img: "/mens-wear.png",
              },
              {
                num: "04",
                title: "Kids' Wear",
                desc: "Playful, durable, and comfortable outfits your little ones will love.",
                bg: "from-[#f0e6d3] to-[#f7f0e6]",
                img: "/pexels-lucky-forever-2772146-29188179.jpg",
              },
            ].map((item, i) => (
              <motion.div key={item.num} {...fadeUp(0.08 * i)}
                className="group relative overflow-hidden rounded-3xl cursor-default"
                style={{ minHeight: "420px" }}>
                {/* Image bg */}
                <div className="absolute inset-0">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.bg} opacity-80 group-hover:opacity-60 transition-opacity duration-700`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-7 z-10">
                  <span className="self-start text-[11px] font-bold uppercase tracking-widest text-white/60 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-white text-[1.3rem] font-bold mb-2 leading-tight">{item.title}</h3>
                    <p className="text-white/70 text-[0.85rem] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY US — dark, horizontal strip cards
      ══════════════════════════════════════════ */}
      <section className="bg-[#111] py-24 md:py-32 px-6 md:px-14">
        <div className="max-w-[1300px] mx-auto">
          <motion.div {...fadeUp(0)} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#CBC0D3] mb-4">Our Promise</p>
              <h2 className="text-white font-serif leading-tight"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 800 }}>
                Why Shop<br />With Us?
              </h2>
            </div>
            <p className="text-white/40 max-w-xs text-[0.9rem] leading-relaxed">
              We combine 7 years of retail expertise with a genuine passion for making fashion accessible to every family.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                num: "01",
                title: "7 Years of Expertise",
                desc: "We know quality. Our years in the business mean we handpick only the best fabrics and most reliable fits for you.",
              },
              {
                num: "02",
                title: "Unbeatable Value",
                desc: "Elegant and stylish clothing shouldn't break the bank. We offer the best trends at highly competitive prices.",
              },
              {
                num: "03",
                title: "Family-Centric Shopping",
                desc: "Skip the hassle of visiting multiple stores; find everything your family needs all under one roof.",
              },
            ].map((item, i) => (
              <motion.div key={item.num} {...fadeUp(0.1 * i)}
                className="group flex items-center gap-8 border border-white/10 rounded-2xl px-8 py-7 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default">
                <span className="text-white/20 font-serif font-bold text-[2.5rem] leading-none shrink-0 group-hover:text-[#CBC0D3] transition-colors duration-300">{item.num}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-serif text-[1.15rem] font-bold mb-1">{item.title}</h3>
                  <p className="text-white/50 text-[0.88rem] leading-relaxed">{item.desc}</p>
                </div>
                <ArrowRight size={20} className="text-white/20 shrink-0 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Thank you banner */}
          <motion.div {...fadeUp(0.4)}
            className="mt-12 rounded-3xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #CBC0D3, #EFD3D7, #f5c6cc)" }}>
            <div className="px-10 py-10 relative z-10">
              <p className="font-serif text-[#1a1a1a] font-medium text-center"
                style={{ fontSize: "clamp(1rem, 2.2vw, 1.4rem)" }}>
                Thank you for choosing <strong>Sai Deepthi Dresses</strong>. We are thrilled to continue our style journey with you online! 🙏
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT — 3 col, premium
      ══════════════════════════════════════════ */}
      <section className="bg-[#F7F4F0] py-24 md:py-32 px-6 md:px-14">
        <div className="max-w-[1300px] mx-auto">
          <motion.div {...fadeUp(0)} className="mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E9AAF] mb-4">Reach Out</p>
            <h2 className="font-serif text-[#1a1a1a] leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 800 }}>
              Contact Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_360px] gap-8">

            {/* ── Info column ── */}
            <motion.div {...fadeUp(0.1)} className="space-y-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8E9AAF] mb-5 pb-3 border-b border-gray-200">
                  Contact us
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <MapPin size={14} className="text-[#8E9AAF] mt-0.5 shrink-0" />
                    <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                      Sai Deepthi Dresses<br />
                      Peddapalli, Telangana<br />
                      India — 505172
                    </p>
                  </div>
                  <a href="mailto:saideepthidresses@gmail.com"
                    className="flex items-center gap-3 text-[0.85rem] text-gray-600 hover:text-[#1a1a1a] transition-colors group">
                    <Mail size={14} className="text-[#8E9AAF] shrink-0" />
                    <span className="group-hover:underline underline-offset-2">saideepthidresses@gmail.com</span>
                  </a>
                  <a href="tel:+919876543210"
                    className="flex items-center gap-3 text-[0.85rem] text-gray-600 hover:text-[#1a1a1a] transition-colors group">
                    <Phone size={14} className="text-[#8E9AAF] shrink-0" />
                    <span>+91 98765 43210</span>
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8E9AAF] mb-5 pb-3 border-b border-gray-200">
                  Store Hours
                </p>
                <div className="space-y-2.5 text-[0.85rem] text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-[#8E9AAF]" />
                    <span>Mon – Sat: <strong className="text-gray-800">9 AM – 9 PM</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-[#8E9AAF]" />
                    <span>Sunday: <strong className="text-gray-800">10 AM – 7 PM</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Map ── */}
            <motion.div {...fadeUp(0.15)}
              className="rounded-3xl overflow-hidden shadow-xl border border-gray-200"
              style={{ minHeight: "460px" }}>
              <iframe
                title="Sai Deepthi Dresses Location"
                src="https://maps.google.com/maps?q=18.6086597,79.3766981+(Sai%20Deepthi%20Dresses%20%2Csarees%20%26%20Kids%20Wear%20Mens%20Wear)&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%"
                style={{ border: 0, minHeight: "460px", display: "block" }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* ── Form ── */}
            <motion.div {...fadeUp(0.2)}
              className="rounded-3xl bg-white border border-gray-100 shadow-xl p-8">
              <h3 className="font-serif text-[#1a1a1a] font-bold text-[1.3rem] mb-1">We are here to help</h3>
              <p className="text-[0.8rem] text-gray-400 mb-7">Need to contact us? Please fill this form.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-serif text-[1.1rem] font-bold text-[#1a1a1a]">Message Sent!</p>
                    <p className="text-[0.83rem] text-gray-400 mt-1">We'll get back to you shortly.</p>
                  </div>
                  <button onClick={() => setSubmitted(false)}
                    className="rounded-full border border-gray-200 px-6 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition-colors">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <input required type="text" placeholder="First name"
                      value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                      className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[0.85rem] text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-all" />
                    <input required type="text" placeholder="Last name"
                      value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                      className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[0.85rem] text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-all" />
                  </div>
                  <input required type="email" placeholder="Email address"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[0.85rem] text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-all" />
                  <input type="text" placeholder="Subject"
                    value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[0.85rem] text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-all" />
                  <textarea required rows={4} placeholder="Message"
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[0.85rem] text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-all resize-none" />
                  <p className="text-[0.72rem] text-gray-300">The form is protected by reCAPTCHA.</p>
                  <button type="submit" disabled={loading}
                    className="group flex items-center justify-center gap-2 rounded-xl border border-[#1a1a1a] bg-white py-3.5 text-[0.85rem] font-bold uppercase tracking-wider text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 disabled:opacity-50">
                    {loading
                      ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      : <><Send size={13} className="group-hover:translate-x-0.5 transition-transform" /> Submit</>
                    }
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
