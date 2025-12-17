import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';
import CustomDesignPage from './pages/CustomDesignPage';
import ScrollToTop from './components/ScrollToTop';
import { useUserStore } from './store/useUserStore';

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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

          {/* Admin Login Route - Anyone can access */}
          <Route path="/admin-login" element={<LoginPage />} />

          {/* Admin Route - Protected, requires admin role */}
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminPage />
              ) : (
                <Navigate to="/admin-login" replace />
              )
            }
          />

          {/* 404 Page */}
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;