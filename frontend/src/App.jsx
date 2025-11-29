import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';
import { useUserStore } from './store/useUserStore';
import { useCartStore } from './store/useCartStore';
import CartPage from './pages/CartPage';
import PurchaseCancelPage from './pages/PurchaseCancelPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import CustomDesignPage from './pages/CustomDesignPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ✅ Fetch cart whenever user changes (login/logout)
  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user, getCartItems]);


  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
  <div className="text-center">
    <div className="inline-block mb-6">
      <h1 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent tracking-wider drop-shadow-lg animate-pulse"
        style={{ fontFamily: "'Italiana', serif" }}
      >
        VITAVOGUE
      </h1>
    </div>
    
    {/* Loading Spinner */}
    <div className="flex justify-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
    
    {/* Optional Loading Text */}
    <p 
      className="mt-6 text-gray-400 text-sm sm:text-base animate-pulse"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      Loading your fashion experience...
    </p>
  </div>
</div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/custom-design" element={<CustomDesignPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <LoginPage />}
          />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-6">Page not found</p>
                  <a
                    href="/"
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300 inline-block"
                  >
                    Back to Home
                  </a>
                </div>
              </div>
            }
          />
          <Route
            path='/purchase-successful'
            element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
          />
          <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;