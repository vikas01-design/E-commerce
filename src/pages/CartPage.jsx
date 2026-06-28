import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Truck, RefreshCw, Lock, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useAuth, useClerk } from '@clerk/react';

export default function CartPage() {
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const shipping = cartTotal >= 999 ? 0 : 99;
  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const finalTotal = cartTotal + shipping - discount;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'SAVE10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('Invalid coupon code. Try SAVE10');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="text-[13px] text-[#8E9AAF] mb-8">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Shopping Cart</span>
          </nav>

          <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-10">
            Shopping Cart
            {cartCount > 0 && (
              <span className="ml-3 text-lg font-normal text-gray-400">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
            )}
          </h1>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag size={80} className="text-[#CBC0D3] mb-6" strokeWidth={1} />
              <h2 className="font-serif text-2xl text-gray-700 mb-3">Your cart is empty</h2>
              <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
              <Link
                to="/shop"
                className="flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
              >
                <ShoppingBag size={16} /> Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-4 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <span>Product</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Price</span>
                  <span></span>
                </div>

                <ul className="divide-y divide-gray-100">
                  {cartItems.map(item => (
                    <li key={item.id} className="py-6 grid sm:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center">
                      {/* Product */}
                      <div className="flex items-center gap-4">
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9AAF]">{item.category}</p>
                          <h3 className="font-serif text-base font-semibold text-gray-900 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">₹{(item.price || item.salePrice || 0).toLocaleString()} each</p>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-base font-bold text-gray-900">
                          ₹{((item.price || item.salePrice || 0) * item.quantity).toLocaleString()}
                        </p>
                        {item.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </p>
                        )}
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-400 transition-colors"
                        aria-label="Remove from cart"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Bottom actions */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                  <Link
                    to="/shop"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft size={16} /> Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-white p-6 shadow-sm sticky top-28">
                  <h2 className="font-serif text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                  {/* Coupon */}
                  <div className="mb-6">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={coupon}
                          onChange={e => { setCoupon(e.target.value); setCouponError(''); }}
                          placeholder="e.g. SAVE10"
                          className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#CBC0D3] focus:ring-2 focus:ring-[#EFD3D7]"
                        />
                      </div>
                      <button
                        onClick={handleApplyCoupon}
                        className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
                    {couponApplied && <p className="text-xs text-green-600 mt-1.5 font-medium">✓ 10% discount applied!</p>}
                  </div>

                  {/* Breakdown */}
                  <div className="flex flex-col gap-3 text-sm border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartCount} items)</span>
                      <span className="font-medium text-gray-900">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (SAVE10)</span>
                        <span>-₹{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {shipping === 0 ? 'Free' : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-[#8E9AAF] bg-[#FAFAFA] rounded-lg px-3 py-2">
                        Add ₹{(999 - cartTotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                    <div className="flex justify-between font-serif text-lg font-semibold text-gray-900 border-t border-gray-200 pt-3 mt-1">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!isSignedIn) {
                        alert("First you have to login");
                        openSignIn();
                        return;
                      }
                      navigate('/checkout');
                    }}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 py-4 text-sm font-semibold text-white hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    Checkout <ArrowRight size={16} />
                  </button>

                  {/* Trust badges */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { icon: Truck, label: 'Free Shipping' },
                      { icon: RefreshCw, label: 'Easy Returns' },
                      { icon: Lock, label: 'Secure Pay' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex flex-col items-center text-center gap-1.5">
                        <Icon size={18} className="text-[#8E9AAF]" strokeWidth={1.5} />
                        <span className="text-[10px] text-gray-500 font-medium">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment icons */}
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {['VISA', 'MC', 'UPI', 'EMI'].map(method => (
                      <span key={method} className="rounded border border-gray-200 px-2 py-1 text-[10px] font-bold text-gray-400">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
