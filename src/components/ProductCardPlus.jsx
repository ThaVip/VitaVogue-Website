import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG', { 
    style: 'currency', 
    currency: 'NGN' 
  }).format(price);
};

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const [favorites, setFavorites] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = favorites.includes(product.id);

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    await onAddToCart(product);
    
    // Reset button state after a delay
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-yellow-400 overflow-hidden group relative">
      
      {/* Product Image Area */}
      <div className="relative h-64 bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-6xl overflow-hidden">
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-black text-yellow-400 px-3 py-1 rounded-full text-sm font-bold z-10">
            {product.badge}
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 left-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform z-10"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-5 h-5 transition-colors ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'
          }`} />
        </button>

        {/* Quick View Button - appears on hover */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute top-3 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Quick view product"
          >
            <Eye className="w-5 h-5 text-gray-600 hover:text-yellow-600" />
          </button>
        )}
        
        {/* Product Emoji/Image */}
        <span className="group-hover:scale-110 transition-transform duration-300">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          ) : (
            product.emoji
          )}
        </span>

        {/* Discount Percentage */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Category */}
        {product.category && (
          <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
        )}
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-2">({product.reviews || 0})</span>
          </div>
        )}
        
        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-yellow-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-400 line-through ml-2">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="text-green-600 text-sm font-medium">
                {product.stock < 5 ? `Only ${product.stock} left!` : 'In Stock'}
              </span>
            ) : (
              <span className="text-red-500 text-sm font-medium">Out of Stock</span>
            )}
          </div>
        )}
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || (product.stock !== undefined && product.stock === 0)}
          className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 border-2 transform hover:scale-105 flex items-center justify-center gap-2 ${
            isAdding
              ? 'bg-green-500 text-white border-green-500'
              : product.stock === 0
              ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
              : 'bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black border-yellow-400'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isAdding ? 'Added!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}