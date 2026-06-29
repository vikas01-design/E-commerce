import { Link } from 'react-router-dom';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const PinterestIcon = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.994.499 1.804 1.479 1.804 1.775 0 3.141-1.87 3.141-4.57 0-2.39-1.717-4.06-4.159-4.06-2.83 0-4.49 2.124-4.49 4.316 0 .856.33 1.77.74 2.273.08.098.092.184.068.283l-.273 1.114c-.044.182-.146.223-.338.135-1.259-.586-2.045-2.43-2.045-3.91 0-3.18 2.312-6.105 6.666-6.105 3.5 0 6.22 2.494 6.22 5.827 0 3.477-2.193 6.276-5.237 6.276-1.023 0-1.984-.53-2.313-1.159l-.63 2.4c-.228.88-.844 1.983-1.258 2.656C10.158 21.91 11.059 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-20 pb-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/5">

          {/* Brand + Newsletter */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-8">
            <h2 
              className="text-white text-3xl font-light tracking-wide group"
              style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}
            >
              Sai Deepthi
            </h2>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#C87A5D]">
              Soft tailoring &bull; Quiet grace
            </p>
            <p className="mt-4 text-xs font-light text-white/50 leading-relaxed max-w-xs">
              A boutique representing authentic craftsmanship, modern cuts, and timeless heritage. Subscribe to receive updates and seasonal edits.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex w-full max-w-md border-b border-white/10 pb-2 focus-within:border-[#C87A5D] transition-colors duration-300">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 bg-transparent border-0 outline-none text-xs font-light text-white placeholder-white/30 font-outfit"
              />
              <button 
                type="submit" 
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C87A5D] hover:text-white transition-colors duration-300 pl-4 whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C87A5D] mb-6 font-syne">
              Shop
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Women's Wear", to: '/shop' },
                { label: 'Kids Wear', to: '/shop' },
                { label: 'Sarees', to: '/shop' },
                { label: 'New Arrivals', to: '/shop' },
                { label: 'Sale', to: '/shop' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-white/60 hover:text-white transition-all duration-300 font-outfit text-[13px] tracking-wide hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C87A5D] mb-6 font-syne">
              Help
            </h4>
            <ul className="flex flex-col gap-3">
              {['Contact Us', 'Shipping Policy', 'Returns & Exchange', 'Track Order', 'FAQs'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-all duration-300 font-outfit text-[13px] tracking-wide hover:translate-x-1 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C87A5D] mb-6 font-syne">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {['About Us', 'Our Story', 'Sustainability', 'Careers', 'Privacy Policy'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-all duration-300 font-outfit text-[13px] tracking-wide hover:translate-x-1 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 mt-2">
          <p className="text-[11px] font-light text-white/40 font-outfit">
            &copy; {new Date().getFullYear()} Sai Deepthi Dresses. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 items-center">
            {[
              { icon: InstagramIcon, href: 'https://www.instagram.com/saideepthidresses/' },
              { icon: FacebookIcon, href: 'https://www.facebook.com/' },
              { icon: TwitterIcon, href: 'https://x.com/' },
              { icon: PinterestIcon, href: 'https://in.pinterest.com/' },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target={social.href !== '#' ? "_blank" : undefined}
                rel={social.href !== '#' ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-full border border-white/10 text-white/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 hover:border-[#C87A5D] hover:text-[#C87A5D] hover:bg-white/5 cursor-pointer"
                aria-label="Social Link"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
