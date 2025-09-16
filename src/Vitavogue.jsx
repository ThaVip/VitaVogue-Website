import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Star, Heart, Filter } from 'lucide-react';


const VitaVogue = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Sample product data
  const products = {
    featured: [
      { id: 1, name: 'Elegant Ankara Dress', price: 15000, badge: 'New', emoji: '🌟', category: 'casual' },
      { id: 2, name: 'Corporate Blazer Set', price: 25000, badge: 'Sale', emoji: '✨', category: 'formal' },
      { id: 3, name: 'Casual Jeans & Top', price: 12000, badge: 'Popular', emoji: '💫', category: 'casual' },
      { id: 4, name: 'Designer Handbag', price: 8000, badge: 'Trending', emoji: '🎀', category: 'accessories' },
    ],
    casual: [
      { id: 5, name: 'Trendy T-Shirt', price: 5000, badge: 'New', emoji: '👕' },
      { id: 6, name: 'Denim Jeans', price: 8000, badge: 'Sale', emoji: '👖' },
      { id: 7, name: 'Casual Hoodie', price: 10000, badge: 'Popular', emoji: '🎽' },
      { id: 8, name: 'Casual Dress', price: 12000, badge: 'Trending', emoji: '👗' },
    ],
    formal: [
      { id: 9, name: 'Executive Suit', price: 45000, badge: 'Premium', emoji: '👔' },
      { id: 10, name: 'Office Dress', price: 18000, badge: 'New', emoji: '👗' },
      { id: 11, name: 'Business Blazer', price: 22000, badge: 'Sale', emoji: '🧥' },
      { id: 12, name: 'Formal Shirt', price: 8500, badge: 'Popular', emoji: '👔' },
    ],
    bridal: [
      { id: 13, name: 'Luxury Wedding Gown', price: 85000, badge: 'Exclusive', emoji: '👰' },
      { id: 14, name: 'Traditional Bridal Set', price: 65000, badge: 'Custom', emoji: '💍' },
      { id: 15, name: 'Engagement Dress', price: 35000, badge: 'New', emoji: '👗' },
      { id: 16, name: 'Bridal Accessories Set', price: 15000, badge: 'Trending', emoji: '🎀' },
    ],
    accessories: [
      { id: 17, name: 'Leather Handbag', price: 12000, badge: 'New', emoji: '👜' },
      { id: 18, name: 'Fashion Jewelry Set', price: 6000, badge: 'Sale', emoji: '💍' },
      { id: 19, name: 'Designer Sunglasses', price: 4500, badge: 'Trending', emoji: '🕶️' },
      { id: 20, name: 'Silk Scarf', price: 3000, badge: 'Popular', emoji: '🧣' },
    ]
  };

  const categories = [
    { id: 'casual', name: 'Casual Wear', emoji: '👕', desc: 'Comfortable and trendy everyday outfits' },
    { id: 'formal', name: 'Formal Wear', emoji: '👔', desc: 'Professional attire for office and business' },
    { id: 'bridal', name: 'Bridal Wear', emoji: '👰', desc: 'Elegant wedding and special occasion dresses' },
    { id: 'accessories', name: 'Accessories', emoji: '👜', desc: 'Bags, jewelry, and fashion accessories' },
  ];

  const navigation = [
    { id: 'home', name: 'Home' },
    { id: 'casual', name: 'Casual Wear' },
    { id: 'formal', name: 'Formal Wear' },
    { id: 'bridal', name: 'Bridal Wear' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'about', name: 'About' },
    { id: 'contact', name: 'Contact' },
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };

  const ProductCard = ({ product, onAddToCart }) => {
    const isFavorite = favorites.includes(product.id);
    
    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-yellow-400 overflow-hidden group">
        <div className="relative h-64 bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-6xl">
          <div className="absolute top-3 right-3 bg-black text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
            {product.badge}
          </div>
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-3 left-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
          <span className="group-hover:scale-110 transition-transform duration-300">
            {product.emoji}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-2xl font-bold text-yellow-600 mb-4">{formatPrice(product.price)}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 border-2 border-yellow-400 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  const CategoryCard = ({ category, onNavigate }) => (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-yellow-400 overflow-hidden cursor-pointer group"
      onClick={() => onNavigate(category.id)}
    >
      <div className="h-48 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-6xl text-yellow-400">
        <span className="group-hover:scale-110 transition-transform duration-300">
          {category.emoji}
        </span>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
        <p className="text-gray-600 text-sm">{category.desc}</p>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-gradient-to-r from-black to-gray-900 text-white sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Vitavogue
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`font-medium transition-colors duration-200 hover:text-yellow-400 ${
                  currentPage === item.id ? 'text-yellow-400' : 'text-white'
                }`}
              >
                {item.name}
              </button>
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
            <button
              onClick={() => setCurrentPage('cart')}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-black text-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {getCartItemCount()}
              </span>
            </button>
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
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors duration-200 hover:text-yellow-400 ${
                    currentPage === item.id ? 'text-yellow-400' : 'text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );

  const Hero = () => (
    <section className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Trendy & Affordable Fashion
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-300 leading-relaxed">
            Empowering Nigerians with stylish clothing that enhances confidence and individuality. 
            From casual wear to bridal collections, we've got your fashion needs covered.
          </p>
          <button
            onClick={() => setCurrentPage('casual')}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform duration-300 shadow-2xl"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );

  const HomePage = () => (
    <div>
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onNavigate={setCurrentPage}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.featured.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const CategoryPage = ({ categoryId }) => {
    const categoryData = categories.find(cat => cat.id === categoryId);
    const categoryProducts = products[categoryId] || [];

    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {categoryData?.name} Collection
            </h2>
            <p className="text-gray-600 text-lg">{categoryData?.desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  const CartPage = () => (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Shopping Cart
        </h2>
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center text-2xl">
                    {item.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-yellow-600 font-bold">{formatPrice(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="bg-black text-yellow-400 rounded-2xl p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Total: {formatPrice(getCartTotal())}</h3>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  const AboutPage = () => (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              About Vitavogue
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Vitavogue, we believe fashion is a powerful form of self-expression. Our mission is to provide 
              trendy, affordable clothing that empowers Nigerians to showcase their unique style and personality.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From casual everyday wear to elegant bridal collections, we curate pieces that blend contemporary 
              fashion with local sensibilities, ensuring our customers always look and feel their best.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '🌟', title: 'Quality', desc: 'Premium materials and craftsmanship' },
                { icon: '💰', title: 'Affordable', desc: 'Fashion that fits your budget' },
                { icon: '🚚', title: 'Fast Delivery', desc: 'Quick and reliable shipping' },
                { icon: '💝', title: 'Satisfaction', desc: '100% customer satisfaction guarantee' }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-8 text-center">
            <div className="text-8xl mb-4">👗</div>
            <h3 className="text-2xl font-bold text-black mb-4">Fashion Forward</h3>
            <p className="text-black">
              Discover the latest trends and timeless classics that define your unique style.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const ContactPage = () => (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Contact Us
        </h2>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Subject</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-4 rounded-lg font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Vitavogue</h3>
            <p className="text-gray-300">
              Your trusted fashion destination for trendy and affordable clothing.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-400">Categories</h4>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => setCurrentPage(category.id)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-400">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 Lagos, Nigeria</p>
              <p>📞 +234 123 456 7890</p>
              <p>✉️ hello@vitavogue.ng</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Vitavogue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'casual':
      case 'formal':
      case 'bridal':
      case 'accessories':
        return <CategoryPage categoryId={currentPage} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default VitaVogue;