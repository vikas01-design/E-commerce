import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function WishlistDrawer() {
  const { wishlistItems, wishlistCount, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  const handleProductClick = (id) => {
    setIsWishlistOpen(false);
    navigate(`/product/${id}`);
  };

  return (
    <>
      {/* Backdrop */}
      {isWishlistOpen && (
        <div
          className="fixed inset-0 z-[1100] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsWishlistOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[1200] h-full w-full max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isWishlistOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Heart size={22} className="text-[#d63384]" fill="#d63384" />
            <h2 className="font-serif text-xl font-semibold text-gray-900">
              Wishlist
              {wishlistCount > 0 && (
                <span className="ml-2 rounded-full bg-[#EFD3D7] px-2 py-0.5 text-sm font-bold text-gray-800">
                  {wishlistCount}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close wishlist"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <Heart size={56} className="text-[#EFD3D7]" strokeWidth={1} />
              <p className="font-serif text-xl text-gray-600">Your wishlist is empty</p>
              <p className="text-sm text-gray-400">Click the heart on any product to save it here</p>
              <button
                onClick={() => { setIsWishlistOpen(false); navigate('/shop'); }}
                className="mt-4 rounded-full bg-[#d63384] px-8 py-3 text-sm font-medium text-white hover:bg-[#b5179e] transition-colors"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {wishlistItems.map(item => (
                <li key={item.id} className="flex gap-4 rounded-2xl border border-gray-100 p-3 hover:border-gray-200 transition-colors">
                  {/* Image */}
                  <button
                    onClick={() => handleProductClick(item.id)}
                    className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50 focus:outline-none"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  </button>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8E9AAF] truncate">
                          {item.category}
                        </p>
                        <button
                          onClick={() => handleProductClick(item.id)}
                          className="text-left font-serif text-sm font-semibold text-gray-900 hover:text-[#d63384] transition-colors truncate w-full"
                        >
                          {item.name}
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="shrink-0 text-gray-300 hover:text-red-400 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-gray-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[11px] text-gray-400 line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Move to cart */}
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-gray-700 transition-colors"
                        aria-label="Move to cart"
                      >
                        <ShoppingBag size={11} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only when items exist */}
        {wishlistItems.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 bg-white">
            <button
              onClick={() => {
                wishlistItems.forEach(item => addToCart(item));
                setIsWishlistOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d63384] py-3.5 text-sm font-semibold text-white hover:bg-[#b5179e] transition-colors"
            >
              <ShoppingBag size={16} />
              Move All to Cart
            </button>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="mt-3 w-full py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors text-center"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
