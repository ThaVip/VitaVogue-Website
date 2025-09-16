import { useState } from 'react';
import { Search, ShoppingCart, Menu, X} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { id: 'home', name: 'Home', go: '/' },
  { id: 'casual', name: 'Casual Wear', go: '/category/casual' },
  { id: 'formal', name: 'Formal Wear', go: '/category/formal' },
  { id: 'bridal', name: 'Bridal Wear', go: '/category/bridal' },
  { id: 'accessories', name: 'Accessories', go: '/category/accessories' },
  { id: 'about', name: 'About', go: '/about' },
  { id: 'contact', name: 'Contact', go: '/contact' },
];

export default function Header({ cart = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Function to get cart item count
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to determine if navigation item is active
  const isActiveNavItem = (navItem) => {
    if (navItem.id === 'home') {
      return location.pathname === '/';
    }
    return location.pathname === navItem.go;
  };

  return (
    <>
      <header className="bg-gradient-to-r from-black to-gray-900 text-white sticky top-0 z-50 shadow-2xl">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Vitavogue
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
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

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center bg-white rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search fashion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-black placeholder-gray-400 min-w-[200px]"
                />
              </div>
              <Link to='/cart'
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-black text-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {getCartItemCount()}
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-4">
                <div className="sm:hidden">
                  <div className="flex items-center bg-white rounded-full px-4 py-2 mb-4">
                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search fashion..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent outline-none text-black placeholder-gray-400 w-full"
                    />
                  </div>
                </div>
                {navigation.map(item => (
                  <Link
                    key={item.id}
                    to={item.go}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-left font-medium transition-colors duration-200 hover:text-yellow-400 ${
                      isActiveNavItem(item) ? 'text-yellow-400' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}