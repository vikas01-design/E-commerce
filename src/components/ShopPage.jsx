import { useState, useMemo, useEffect } from "react";
import { ChevronDown, Filter, ChevronLeft, ChevronRight, Truck, RefreshCw, Lock, Star, Tag, Ticket, CreditCard, Gift, Clock, Sparkles } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { products } from "../data/products";

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';
  const urlQuery = searchParams.get('q') || '';

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [sortBy, setSortBy] = useState("Relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sidebar filter state
  const [sidebarCategories, setSidebarCategories] = useState([]);
  const [priceMax, setPriceMax] = useState(10000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState("all");

  // Sync URL params when they change
  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All');
    setSearchQuery(searchParams.get('q') || '');
    setCurrentPage(1);
  }, [searchParams]);

  const handleCategoryToggle = (key) => {
    setSidebarCategories(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
    setCurrentPage(1);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const handleColorToggle = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSidebarCategories([]);
    setPriceMax(10000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedAvailability("all");
    setCurrentPage(1);
  };

  const categoryPills = [
    "All", "Women's Wear", "Ethnic Wear", "Kids Wear", "Sarees",
    "New Arrivals", "Best Sellers", "Wedding Collection", "Festival Collection"
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Text search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Top pill category filter
    if (activeCategory !== "All") {
      const map = {
        "Women's Wear": "WOMEN'S WEAR",
        "Ethnic Wear": "ETHNIC WEAR",
        "Kids Wear": "KIDS WEAR",
        "Sarees": "SAREES",
      };
      if (map[activeCategory]) {
        list = list.filter(p => p.category === map[activeCategory]);
      }
    }

    // Sidebar category checkboxes
    if (sidebarCategories.length > 0) {
      list = list.filter(p => sidebarCategories.includes(p.category));
    }

    // Price range
    list = list.filter(p => p.price <= priceMax);

    // Size filter
    if (selectedSizes.length > 0) {
      list = list.filter(p =>
        p.sizes && selectedSizes.some(s => p.sizes.includes(s))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      list = list.filter(p =>
        p.colors && selectedColors.some(c => p.colors.includes(c))
      );
    }

    // Availability filter
    if (selectedAvailability === "in") {
      list = list.filter(p => p.inStock === true);
    } else if (selectedAvailability === "out") {
      list = list.filter(p => p.inStock === false);
    }

    // Sort
    switch (sortBy) {
      case "Price: Low to High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "Highest Rated":
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "Best Selling":
        list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        break;
    }
    return list;
  }, [activeCategory, sortBy, searchQuery, sidebarCategories, priceMax, selectedSizes, selectedColors, selectedAvailability]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <Navbar />

      <div className="pb-24 lg:pb-0 pt-28 md:pt-32">
        {/* 2. SHOP HEADER */}
        <div className="border-b border-[#CBC0D3] pt-4 pb-0 text-center">
          <h1 className="font-serif text-[28px] md:text-[34px] font-semibold text-gray-900">Our Collection</h1>
          <p className="m-5 text-[14px] md:text-[15px] font-light text-[#8E9AAF] px-4">
            {searchQuery ? (
              <>Results for <strong className="text-gray-700">&quot;{searchQuery}&quot;</strong></>
            ) : (
              'Discover timeless fashion pieces curated for modern elegance.'
            )}
          </p>
          

          {/* ── Announcement Ticker ── */}
          <div className="mt-0 relative overflow-hidden bg-[#1a1a1a]" style={{ height: '48px' }}>

            {/* LEFT "LIMITED TIME" badge */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 10,
              display: 'flex', alignItems: 'center',
              background: '#d63384',
              paddingLeft: '20px',
              paddingRight: '26px',
              clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)',
              gap: '7px',
            }}>
              <Clock size={12} color="#fff" strokeWidth={2.5} />
              <span style={{
                fontSize: '0.58rem',
                fontWeight: 800,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#fff',
                whiteSpace: 'nowrap',
              }}>
                Limited Time
              </span>
            </div>

            {/* LEFT fade mask */}
            <div style={{
              position: 'absolute', left: '130px', top: 0, bottom: 0, width: '64px', zIndex: 5,
              background: 'linear-gradient(to right, #1a1a1a, transparent)',
              pointerEvents: 'none',
            }} />

            {/* RIGHT fade mask */}
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 5,
              background: 'linear-gradient(to left, #1a1a1a, transparent)',
              pointerEvents: 'none',
            }} />

            {/* Scrolling track */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              paddingLeft: '148px',
              overflow: 'hidden',
            }}>
              {[0, 1].map(set => (
                <div
                  key={set}
                  aria-hidden={set === 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                    animation: 'ticker-scroll 36s linear infinite',
                  }}
                >
                  {[
                    { Icon: Gift,       text: '25% OFF when you buy 3 or more items' },
                    { Icon: Ticket,     text: 'Use code SD10 for extra 10% off' },
                    { Icon: Truck,      text: 'Free shipping on orders above ₹999' },
                    { Icon: CreditCard, text: 'Special offers on SBI & HDFC cards' },
                    { Icon: Tag,        text: 'Sale ends at midnight — shop now' },
                    { Icon: Sparkles,   text: 'New arrivals added every week' },
                  ].map((item, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center' }}>

                      {/* Diamond separator — only between items */}
                      {i > 0 && (
                        <span style={{
                          display: 'inline-block',
                          width: '5px', height: '5px',
                          background: '#d63384',
                          borderRadius: '1px',
                          transform: 'rotate(45deg)',
                          margin: '0 52px',
                          flexShrink: 0,
                          opacity: 0.85,
                        }} />
                      )}

                      {/* Icon + label */}
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        letterSpacing: '0.13em',
                        textTransform: 'uppercase',
                        color: '#f0f0f0',
                        whiteSpace: 'nowrap',
                      }}>
                        <item.Icon
                          size={14}
                          color="#d63384"
                          strokeWidth={2}
                          style={{ flexShrink: 0 }}
                        />
                        {item.text}
                      </span>
                    </span>
                  ))}

                  {/* Gap before the second loop starts */}
                  <span style={{ display: 'inline-block', width: '104px' }} />
                </div>
              ))}
            </div>

            <style>{`
              @keyframes ticker-scroll {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-100%); }
              }
            `}</style>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* 3. FILTER SIDEBAR */}
            <FilterSidebar
              isOpen={isMobileFilterOpen}
              onClose={() => setIsMobileFilterOpen(false)}
              selectedCategories={sidebarCategories}
              onCategoryChange={handleCategoryToggle}
              priceMax={priceMax}
              onPriceChange={(val) => { setPriceMax(val); setCurrentPage(1); }}
              selectedSizes={selectedSizes}
              onSizeChange={handleSizeToggle}
              selectedColors={selectedColors}
              onColorChange={handleColorToggle}
              selectedAvailability={selectedAvailability}
              onAvailabilityChange={(val) => { setSelectedAvailability(val); setCurrentPage(1); }}
              onClearAll={handleClearAll}
            />

            {/* 4. RIGHT COLUMN */}
            <div className="flex-1 min-w-0">

              {/* Category Pills & Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAFAFA] py-4">
                <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 sm:pb-0">
                  {categoryPills.map((pill) => (
                    <button
                      key={pill}
                      onClick={() => handleCategoryChange(pill)}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] ${
                        activeCategory === pill
                          ? "border-[#CBC0D3] bg-[#EFD3D7] font-bold text-gray-900"
                          : "border-[#8E9AAF] bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      aria-label={`Filter by ${pill}`}
                      aria-pressed={activeCategory === pill}
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm text-gray-700 font-medium">Sort By:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="appearance-none rounded-md border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-900 outline-none focus:border-[#8E9AAF] focus:ring-2 focus:ring-[#CBC0D3] min-w-[160px]"
                      aria-label="Sort products"
                    >
                      <option>Relevance</option>
                      <option>Newest First</option>
                      <option>Best Selling</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Highest Rated</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {paginatedProducts.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="mt-16 text-center py-20">
                  <p className="font-serif text-2xl text-gray-400">
                    {searchQuery ? `No results for "${searchQuery}"` : 'No products found'}
                  </p>
                  <button
                    onClick={() => { handleCategoryChange('All'); }}
                    className="mt-4 text-sm text-[#8E9AAF] hover:underline font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Promo Banner */}
              <div className="my-16 overflow-hidden rounded-2xl bg-gradient-to-r from-[#EFD3D7] to-[#CBC0D3]">
                <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-20 relative">
                  <div className="relative z-10 max-w-md text-center md:text-left">
                    <span className="text-sm font-bold tracking-widest text-gray-700 uppercase">Limited Time Offer</span>
                    <h2 className="mt-4 font-serif text-[32px] font-bold text-gray-900 md:text-[40px] leading-tight">Summer Fashion Sale</h2>
                    <p className="mt-2 text-lg text-gray-800">Up to 40% OFF on selected collections</p>
                    <button className="mt-8 rounded bg-[#8E9AAF] px-8 py-3 font-medium text-white transition-colors hover:bg-gray-700">
                      Shop the Sale &rarr;
                    </button>
                  </div>
                  <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none hidden md:block">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-cover transform translate-x-1/4 scale-150">
                      <path fill="#ffffff" d="M47.7,-57.2C59.5,-47.3,65.3,-29.4,66.8,-11.9C68.3,5.5,65.5,22.6,56.1,36.5C46.7,50.3,30.8,61,12.5,65.2C-5.8,69.5,-26.4,67.3,-41.7,56.7C-56.9,46.2,-66.7,27.3,-68.8,7.9C-70.9,-11.5,-65.2,-31.4,-52.3,-41.8C-39.3,-52.1,-19.7,-52.8,-0.7,-51.9C18.2,-51.1,36,-48.6,47.7,-57.2Z" transform="translate(100 100)" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 text-[14px] text-gray-700 hover:text-gray-900 mr-4 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] rounded px-2 py-1"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] ${
                        page === currentPage
                          ? "bg-[#8E9AAF] text-white"
                          : "text-gray-700 hover:bg-[#EFD3D7]"
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 text-[14px] text-gray-700 hover:text-gray-900 ml-4 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] rounded px-2 py-1"
                    aria-label="Next page"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="border-t border-gray-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-900">You May Also Like</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {products.slice(0, 8).map((p) => (
                <button
                  key={p.id}
                  onClick={() => { window.scrollTo(0, 0); navigate(`/product/${p.id}`); }}
                  className="shrink-0 w-[160px] sm:w-[180px] text-left focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] rounded-xl"
                >
                  <div className="rounded-xl overflow-hidden bg-[#F5F3F0] shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-full h-[200px] sm:h-[220px] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover object-top hover:scale-[1.04] transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-3 py-2 bg-white">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#8E9AAF] truncate">{p.category}</p>
                      <p className="text-[13px] font-semibold text-gray-900 truncate mt-0.5">{p.name}</p>
                      <p className="text-[13px] font-bold text-gray-800 mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-100 bg-[#FAFAFA] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { icon: Truck, title: "Free Shipping", sub: "On orders above ₹999" },
                { icon: RefreshCw, title: "Easy Returns", sub: "7-day hassle-free returns" },
                { icon: Lock, title: "Secure Payments", sub: "100% safe & encrypted" },
                { icon: Star, title: "Quality Assured", sub: "Curated premium fabrics" }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center text-center rounded-xl bg-white p-6 shadow-sm">
                  <badge.icon size={36} className="mb-4 text-[#8E9AAF]" strokeWidth={1.5} />
                  <h4 className="font-serif text-lg font-semibold text-gray-900">{badge.title}</h4>
                  <p className="mt-2 text-sm text-gray-500">{badge.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Footer />

      {/* Mobile Floating Filter Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 font-medium text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] focus:ring-offset-2"
          aria-label="Open filters"
        >
          <Filter size={18} /> Filters
        </button>
      </div>
    </div>
  );
}
