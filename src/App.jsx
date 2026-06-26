import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import KombaiHomePage from './pages/KombaiHomePage';
import ShopPage from './components/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Global overlays — always mounted so drawer/modal animate correctly */}
          <CartDrawer />
          <AuthModal />

          {/* Invisible reCAPTCHA container — required by Firebase Phone Auth */}
          <div id="recaptcha-container" style={{ display: 'none' }} />

          <Routes>
            <Route path="/" element={<KombaiHomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
