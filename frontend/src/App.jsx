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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block mb-4">
            <img 
              src="/shrek.jpg" // Remove /public/ - files in public folder are accessed from root
              alt="Vitavogue" 
              className="w-20 h-20 sm:w-24 sm:h-24 animate-pulse"
            />
          </div>
          <p className="text-xl text-gray-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Loading...
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
            element={user ? <CartPage/> : <LoginPage />} 
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