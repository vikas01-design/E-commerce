import { Heart, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1434389678369-182f4568e1cb?w=400&h=500&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=500&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop&crop=top",
];

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  const wishlisted = isWishlisted(product.id);

  const imageSrc = imgError
    ? FALLBACK_IMAGES[(product.id - 1) % FALLBACK_IMAGES.length]
    : (product.image || FALLBACK_IMAGES[(product.id - 1) % FALLBACK_IMAGES.length]);

  // Find hover image from the same photoshoot series
  const hoverImage = (() => {
    if (!product.image) return null;
    const lastHyphenIndex = product.image.lastIndexOf('-');
    if (lastHyphenIndex === -1) return null;
    const seriesKey = product.image.substring(0, lastHyphenIndex);
    
    // Find another product in the database that belongs to the same photoshoot series
    const alternateProduct = products.find(p => 
      p.id !== product.id && 
      p.image && 
      p.image.startsWith(seriesKey)
    );
    return alternateProduct ? alternateProduct.image : null;
  })();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const displayPrice = Number(product.price ?? product.salePrice ?? 0);
  const originalPrice = Number(product.originalPrice || 0);
  const discountPct = originalPrice > displayPrice && displayPrice > 0
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : null;

  return (
    <div
      className="group relative flex flex-col rounded-2xl bg-white transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] overflow-hidden cursor-pointer select-none"
      onClick={() => navigate(`/product/${product.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/product/${product.id}`)}
      aria-label={`View ${product.name}`}
    >

      {/* ── Image ── */}
      <div className="relative overflow-hidden bg-[#F5F3F0]" style={{ aspectRatio: '3/4' }}>
        {/* Base Image */}
        <img
          src={imageSrc}
          alt={product.name}
          onError={() => setImgError(true)}
          className={`h-full w-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.04] ${
            hoverImage ? 'group-hover:opacity-0' : ''
          }`}
          loading="lazy"
        />

        {/* Hover Image */}
        {hoverImage && (
          <img
            src={hoverImage}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 h-full w-full object-cover object-top opacity-0 scale-100 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-[1.04]"
            loading="lazy"
          />
        )}

        {/* ── Badges: discount / label — top LEFT ── */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.badge ? (
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${
              product.badge === 'SALE' ? 'bg-red-500' :
              product.badge === 'NEW'  ? 'bg-[#8E9AAF]' :
              product.badge === 'HOT'  ? 'bg-orange-500' : 'bg-gray-900'
            }`}>
              {product.badge}
            </span>
          ) : discountPct ? (
            <span className="rounded-full bg-[#EFD3D7] px-2.5 py-1 text-[10px] font-bold text-gray-800">
              {discountPct}% OFF
            </span>
          ) : null}
        </div>

        {/* ── Wishlist — top RIGHT ── */}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#CBC0D3] focus:outline-none"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={15}
            className={`transition-colors duration-200 ${wishlisted ? 'fill-[#d63384] text-[#d63384]' : 'text-gray-500'}`}
          />
        </button>

        {/* ── Add to Cart — slides up on hover ── */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-0 left-0 w-full translate-y-full py-3.5 text-[13px] font-semibold text-white
            transition-transform duration-300 group-hover:translate-y-0
            flex items-center justify-center gap-2
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white
            ${added ? 'bg-green-500' : 'bg-gray-900 hover:bg-gray-700'}`}
          aria-label="Add to cart"
        >
          {added
            ? <><Check size={14} strokeWidth={2.5} /> Added!</>
            : <><ShoppingBag size={14} /> Add to Cart</>}
        </button>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col gap-1.5 px-4 py-3.5">

        {/* Category */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E9AAF]">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-serif text-[14.5px] font-semibold text-gray-900 leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <span className="flex text-[11px] leading-none tracking-tight">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} style={{ color: i < (product.rating ?? 4) ? '#D4AF37' : '#e2e8f0' }}>★</span>
            ))}
          </span>
          {product.reviews != null && (
            <span className="text-[11px] text-gray-400">({product.reviews})</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap mt-0.5">
          <span className="text-[15px] font-bold text-gray-900">
            ₹{displayPrice.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {discountPct && (
            <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              -{discountPct}%
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
