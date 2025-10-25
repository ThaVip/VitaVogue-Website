import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Lock, LogOut, UserPlus, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { useCartStore } from '../store/useCartStore';

const navigation = [
  { id: 1, name: 'Home', go: '/' },
  { id: 2, name: 'Shop', go: '/shop' },
  { id: 3, name: 'About', go: '/about' },
  { id: 4, name: 'Contact', go: '/contact' }
];

export default function Header() {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore(); // âœ… Fixed: Added () to invoke the hook
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const getCartItemCount = () => {
    console.log(cart.length)
    return cart?.length || 0;

  };

  const isActiveNavItem = (item) => {
    return location.pathname === item.go;
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-black to-gray-900 text-white sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Vitavogue
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navigation.map(item => (
              <Link
                to={item.go} 
                key={item.id}
                className={`font-medium transition-colors duration-200 hover:text-yellow-400 ${
                  isActiveNavItem(item) ? 'text-yellow-400' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-black placeholder-gray-400 w-32 xl:w-48"
              />
            </div>

            {/* Cart */}
            <Link 
              to='/cart'
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-2 rounded-full font-bold hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {getCartItemCount() > 0 && (
                <span className="bg-black text-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* Admin Dashboard */}
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}

            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={logout}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-300 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/signup"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-bold transition-all duration-300 flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-300 flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile/Tablet Actions */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Mobile Cart Icon */}
            <Link 
              to='/cart'
              className="relative p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
            >
              <ShoppingCart className="w-5 h-5 text-black" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-yellow-400 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center bg-white rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search fashion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-black placeholder-gray-400 w-full"
                />
              </div>

              {/* Navigation Links */}
              {navigation.map(item => (
                <Link
                  key={item.id}
                  to={item.go}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-left font-medium transition-colors duration-200 hover:text-yellow-400 px-2 py-2 rounded ${
                    isActiveNavItem(item) ? 'text-yellow-400 bg-gray-800' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-700 my-2"></div>

              {/* Admin Dashboard - Mobile */}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-3 rounded-lg font-bold transition-all duration-300 flex items-center space-x-2"
                >
                  <Lock className="w-5 h-5" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              {/* Auth Buttons - Mobile */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}