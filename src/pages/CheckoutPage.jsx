import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Lock, Truck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const steps = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = cartTotal >= 999 ? 0 : 99;
  const finalTotal = cartTotal + shipping;

  const [shippingData, setShippingData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const handleShippingChange = e => setShippingData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleCardChange = e => setCardData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'card' || paymentMethod === 'upi') {
      try {
        // STEP 1: Create order via backend
        const orderRes = await fetch('http://localhost:5000/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: finalTotal * 100 }) // Razorpay expects paise
        });
        
        const orderData = await orderRes.json();
        if (orderData.error) throw new Error(orderData.error);

        // STEP 2: Open Razorpay modal
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Frontend Key ID
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.order_id,
          name: "Sai Deepthi Dresses",
          description: "Purchase Transaction",
          handler: async function (response) {
            // STEP 3: Verify payment signature
            const verifyRes = await fetch('http://localhost:5000/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            });
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              clearCart();
              setOrderPlaced(true);
            } else {
              alert("Payment verification failed! Please try again or contact support.");
            }
          },
          prefill: {
            name: `${shippingData.firstName} ${shippingData.lastName}`,
            email: shippingData.email,
            contact: shippingData.phone
          },
          theme: {
            color: "#111827" // Matches the gray-900 theme
          }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
          alert("Payment failed: " + response.error.description);
        });
        rzp1.open();
        
      } catch (err) {
        console.error("Razorpay Error:", err);
        alert("Failed to initiate payment: " + err.message);
      }
    } else {
      // Cash on Delivery
      clearCart();
      setOrderPlaced(true);
    }
  };

  const [shippingErrors, setShippingErrors] = useState({});

  const handleShippingSubmit = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const errors = {};
    required.forEach(field => {
      if (!shippingData[field].trim()) errors[field] = 'Required';
    });
    if (Object.keys(errors).length > 0) {
      setShippingErrors(errors);
      return;
    }
    setShippingErrors({});
    setStep(1);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="font-serif text-3xl font-semibold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-8">Add some items to your cart before checking out.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="flex justify-center mb-6">
              <CheckCircle size={80} className="text-green-500" strokeWidth={1.5} />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-500 mb-2">Thank you for shopping with Sai Deepthi.</p>
            <p className="text-gray-500 mb-8">
              Your order has been placed successfully. You'll receive a confirmation email shortly.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 text-left">
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="font-serif text-xl font-bold text-gray-900">
                #SD{Date.now().toString().slice(-8)}
              </p>
              <p className="text-sm text-gray-500 mt-3 mb-1">Estimated Delivery</p>
              <p className="font-medium text-gray-800">5–7 Business Days</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="text-[13px] text-[#8E9AAF] mb-8 flex items-center gap-1">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-gray-900">Cart</Link>
            <span>/</span>
            <span className="text-gray-900">Checkout</span>
          </nav>

          <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-10">Checkout</h1>

          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 text-sm font-medium ${i <= step ? 'text-gray-900' : 'text-gray-400'}`}>
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < step ? 'bg-green-500 text-white' : i === step ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-px w-12 sm:w-24 mx-3 ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main Form */}
            <div className="lg:col-span-2">

              {/* Step 0: Shipping */}
              {step === 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck size={20} className="text-[#8E9AAF]" />
                    <h2 className="font-serif text-xl font-semibold text-gray-900">Shipping Information</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'firstName', label: 'First Name', type: 'text', full: false },
                      { name: 'lastName', label: 'Last Name', type: 'text', full: false },
                      { name: 'email', label: 'Email Address', type: 'email', full: true },
                      { name: 'phone', label: 'Phone Number', type: 'tel', full: false },
                      { name: 'address', label: 'Street Address', type: 'text', full: true },
                      { name: 'city', label: 'City', type: 'text', full: false },
                      { name: 'state', label: 'State', type: 'text', full: false },
                      { name: 'pincode', label: 'PIN Code', type: 'text', full: false },
                    ].map(field => (
                      <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={shippingData[field.name]}
                          onChange={handleShippingChange}
                          required
                          className={`w-full rounded-xl border bg-gray-50 py-3 px-4 text-sm text-gray-900 outline-none transition-colors ${
                            shippingErrors[field.name]
                              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                              : 'border-gray-200 focus:border-[#CBC0D3] focus:ring-2 focus:ring-[#EFD3D7]'
                          }`}
                        />
                        {shippingErrors[field.name] && (
                          <p className="text-xs text-red-500 mt-1">{shippingErrors[field.name]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleShippingSubmit}
                    className="mt-6 flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard size={20} className="text-[#8E9AAF]" />
                    <h2 className="font-serif text-xl font-semibold text-gray-900">Payment Method</h2>
                  </div>

                  {/* Method Selector */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {['card', 'upi', 'cod'].map(m => (
                      <button
                        key={m}
                        onClick={() => setPaymentMethod(m)}
                        className={`rounded-xl border py-3 px-4 text-sm font-medium transition-colors ${
                          paymentMethod === m
                            ? 'border-[#8E9AAF] bg-[#EFD3D7] text-gray-900'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {m === 'card' ? '💳 Card' : m === 'upi' ? '📱 UPI' : '🏠 Cash on Delivery'}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-4">
                      You will be securely redirected to Razorpay to complete your card payment.
                    </p>
                  )}

                  {paymentMethod === 'upi' && (
                    <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-4">
                      You will be securely redirected to Razorpay to complete your UPI payment.
                    </p>
                  )}

                  {paymentMethod === 'cod' && (
                    <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-4">
                      Pay with cash when your order is delivered. An extra ₹50 COD fee may apply.
                    </p>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(0)}
                      className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>

                  <ul className="divide-y divide-gray-100 mb-6">
                    {cartItems.map(item => (
                      <li key={item.id} className="flex items-center gap-4 py-4">
                        <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          ₹{((item.price || item.salePrice || 0) * item.quantity).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 mb-6">
                    <p className="font-semibold text-gray-900 mb-2">Shipping to:</p>
                    <p>{shippingData.firstName} {shippingData.lastName}</p>
                    <p>{shippingData.address}, {shippingData.city}, {shippingData.state} - {shippingData.pincode}</p>
                    <p className="mt-1">{shippingData.phone} | {shippingData.email}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gray-900 py-3.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
                    >
                      <Lock size={16} /> Place Order — ₹{finalTotal.toLocaleString()}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl bg-white p-6 shadow-sm sticky top-28">
                <h2 className="font-serif text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <ul className="flex flex-col gap-3 mb-4">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex items-center gap-3 text-sm">
                      <div className="relative h-12 w-10 shrink-0">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-md" />
                        <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-gray-600 text-[10px] font-bold text-white flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <span className="flex-1 truncate text-gray-700">{item.name}</span>
                      <span className="font-medium text-gray-900">₹{((item.price || item.salePrice || 0) * item.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-serif text-base font-bold text-gray-900 border-t border-gray-100 pt-2 mt-1">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
