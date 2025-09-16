
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

   const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };

export default function ProductCard({ product, onAddToCart }){
    const [favorites, setFavorites] = useState([]);
    const isFavorite = favorites.includes(product.id);


  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };



    return(
        <>
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

        </>
    )
}