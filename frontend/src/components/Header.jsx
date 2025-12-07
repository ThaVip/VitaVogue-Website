import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { id: 1, name: 'Home', go: '/' },
  { id: 2, name: 'Custom-design', go: '/custom-design' },
  { id: 3, name: 'About', go: '/about' },
  { id: 4, name: 'Contact', go: '/contact' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveNavItem = (item) => {
    return location.pathname === item.go;
  };

  return (
    <header
      className="text-white sticky top-0 z-50 shadow-2xl relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'scroll'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with Fashion Font */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent tracking-wider drop-shadow-lg"
                style={{ fontFamily: "'Italiana', serif" }}>
                VITAVOGUE
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navigation.map(item => (
              <Link
                to={item.go}
                key={item.id}
                className={`font-bold transition-colors duration-200 hover:text-yellow-400 text-sm tracking-wide ${isActiveNavItem(item) ? 'text-yellow-400' : 'text-white'
                  }`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              {navigation.map(item => (
                <Link
                  key={item.id}
                  to={item.go}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-left font-medium transition-colors duration-200 hover:text-yellow-400 px-2 py-2 rounded ${isActiveNavItem(item) ? 'text-yellow-400 bg-white/10 backdrop-blur-sm' : 'text-white'
                    }`}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}