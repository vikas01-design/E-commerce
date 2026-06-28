import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth, useClerk } from '@clerk/react';

export default function CartDrawer() {
  const { cartItems, cartTotal, cartCount, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const handleCheckout = () => {
    if (!isSignedIn) {
      alert("First you have to login");
      openSignIn();
      return;
    }
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[1100] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[1200] h-full w-full max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-[#8E9AAF]" />
            <h2 className="font-serif text-xl font-semibold text-gray-900">
              Your Cart
              {cartCount > 0 && (
                <span className="ml-2 rounded-full bg-[#EFD3D7] px-2 py-0.5 text-sm font-bold text-gray-800">
                  {cartCount}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={56} className="text-[#CBC0D3]" strokeWidth={1} />
              <p className="font-serif text-xl text-gray-600">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add something beautiful to get started</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 rounded-full bg-[#8E9AAF] px-8 py-3 text-sm font-medium text-white hover:bg-[#7a8599] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {cartItems.map(item => (
                <li key={item.id} className="flex gap-4">
                  {/* Product Image */}
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9AAF] truncate">
                          {item.category}
                        </p>
                        <h4 className="font-serif text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="shrink-0 text-gray-400 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-sm font-bold text-gray-900">
                        ₹{((item.price || item.salePrice || 0) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
              <span>Shipping</span>
              <span className={`font-medium ${cartTotal >= 999 ? 'text-green-600' : 'text-gray-900'}`}>
                {cartTotal >= 999 ? 'Free' : '₹99'}
              </span>
            </div>
            {cartTotal < 999 && (
              <p className="text-xs text-center text-[#8E9AAF] mb-3">
                Add ₹{(999 - cartTotal).toLocaleString()} more for free shipping
              </p>
            )}
            <div className="flex items-center justify-between mb-5 font-serif text-lg font-semibold text-gray-900 border-t border-gray-100 pt-4">
              <span>Total</span>
              <span>₹{(cartTotal + (cartTotal >= 999 ? 0 : 99)).toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 py-4 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-3 w-full py-3 text-sm text-gray-500 hover:text-gray-900 transition-colors text-center"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
