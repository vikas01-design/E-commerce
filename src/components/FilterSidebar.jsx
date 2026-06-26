import { X, Plus, Minus, Check } from "lucide-react";
import { useState } from "react";

function FilterGroup({ title, children, count }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 py-6 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-serif text-[18px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] rounded px-2 -mx-2"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {title}
          {count !== undefined && (
            <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </span>
        {isOpen ? <Minus size={16} className="text-[#8E9AAF]" /> : <Plus size={16} className="text-[#8E9AAF]" />}
      </button>
      <div className={`mt-4 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        {children}
      </div>
    </div>
  );
}

export default function FilterSidebar({
  isOpen,
  onClose,
  // filter state passed from ShopPage
  selectedCategories,
  onCategoryChange,
  priceMax,
  onPriceChange,
  selectedSizes,
  onSizeChange,
  selectedColors,
  onColorChange,
  selectedAvailability,
  onAvailabilityChange,
  onClearAll,
}) {
  const categories = [
    { name: "Women's Wear", key: "WOMEN'S WEAR", count: 8 },
    { name: "Ethnic Wear",  key: "ETHNIC WEAR",  count: 7 },
    { name: "Kids Wear",    key: "KIDS WEAR",    count: 16 },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const colors = [
    { name: "Black",  hex: "#111111" },
    { name: "White",  hex: "#FFFFFF", border: true },
    { name: "Pink",   hex: "#F4A7B9" },
    { name: "Blue",   hex: "#7BA7BC" },
    { name: "Green",  hex: "#8DB48E" },
    { name: "Beige",  hex: "#D4C5A9" },
    { name: "Maroon", hex: "#800000" },
    { name: "Yellow", hex: "#F5C518" },
  ];

  const availabilityOptions = [
    { value: "all", label: "All Products" },
    { value: "in",  label: "In Stock"     },
    { value: "out", label: "Out of Stock" },
  ];

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceMax < 10000 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedAvailability !== "all";

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-white p-6 shadow-2xl transition-transform duration-300 lg:static lg:z-auto lg:w-[260px] lg:translate-x-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 lg:mb-2">
          <h2 className="font-serif text-2xl lg:text-xl font-semibold">Filters</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={onClearAll}
              disabled={!hasActiveFilters}
              className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] rounded px-2 py-1 ${
                hasActiveFilters
                  ? "text-[#8E9AAF] hover:text-[#7a8599] hover:bg-gray-50"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="lg:hidden focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] rounded p-1"
              aria-label="Close filters"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="h-[calc(100vh-100px)] overflow-y-auto no-scrollbar pb-20 lg:h-auto lg:pb-0">

          {/* ── Category ── */}
          <FilterGroup title="Category" count={categories.reduce((s, c) => s + c.count, 0)}>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <label key={cat.key} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.key)}
                    onChange={() => onCategoryChange(cat.key)}
                    className="h-4 w-4 rounded border-gray-300 text-[#8E9AAF] focus:ring-[#8E9AAF] focus:ring-offset-0"
                  />
                  <span className="text-[14px] text-gray-600 group-hover:text-gray-900 flex-1">
                    {cat.name}
                  </span>
                  <span className="text-xs text-gray-400">{cat.count}</span>
                </label>
              ))}
            </div>
          </FilterGroup>

          {/* ── Price Range ── */}
          <FilterGroup title="Price Range">
            <div className="px-1">
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={priceMax}
                onChange={(e) => onPriceChange(Number(e.target.value))}
                className="w-full accent-[#8E9AAF]"
              />
              <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                <span>₹500</span>
                <span className="font-semibold text-gray-800">
                  Up to ₹{priceMax.toLocaleString("en-IN")}
                </span>
                <span>₹10,000</span>
              </div>
            </div>
          </FilterGroup>

          {/* ── Size ── */}
          <FilterGroup title="Size">
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onSizeChange(size)}
                  className={`rounded-full border py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] ${
                    selectedSizes.includes(size)
                      ? "border-[#8E9AAF] bg-[#8E9AAF] text-white"
                      : "border-[#8E9AAF] bg-white text-[#8E9AAF] hover:bg-[#8E9AAF]/10"
                  }`}
                  aria-pressed={selectedSizes.includes(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </FilterGroup>

          {/* ── Color ── */}
          <FilterGroup title="Color">
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => onColorChange(c.name)}
                  className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#CBC0D3] focus:ring-offset-2 ${
                    c.border ? "border border-gray-200" : ""
                  } ${selectedColors.includes(c.name) ? "ring-2 ring-[#8E9AAF] ring-offset-2" : ""}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={`Filter by color ${c.name}`}
                  aria-pressed={selectedColors.includes(c.name)}
                >
                  {selectedColors.includes(c.name) && (
                    <Check size={14} className={c.name === "White" ? "text-gray-800" : "text-white"} />
                  )}
                </button>
              ))}
            </div>
          </FilterGroup>

          {/* ── Availability ── */}
          <FilterGroup title="Availability">
            <div className="flex flex-col gap-3">
              {availabilityOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="availability"
                    checked={selectedAvailability === opt.value}
                    onChange={() => onAvailabilityChange(opt.value)}
                    className="h-4 w-4 border-gray-300 text-[#8E9AAF] focus:ring-[#8E9AAF] focus:ring-offset-0"
                  />
                  <span className="text-[14px] text-gray-600 group-hover:text-gray-900 flex-1">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </FilterGroup>

        </div>
      </aside>
    </>
  );
}
