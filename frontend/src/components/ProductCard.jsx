import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/useCartStore';

const ProductCard = ({ product }) => {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        } else {
            addToCart(product);
        }
    };

    return (
        <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border-2 border-transparent hover:border-yellow-400 overflow-hidden group">
            {/* Product Image - Reduced height on mobile */}
            <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isFeatured && (
                    <div className="absolute top-2 right-2 bg-black text-yellow-400 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                        Featured
                    </div>
                )}
            </div>

            {/* Product Info - Adjusted padding for mobile */}
            <div className="p-3 sm:p-4 md:p-5">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                    {product.description}
                </p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-yellow-600 mb-2 sm:mb-3">
                    ₦{product.price.toLocaleString()}
                </p>
                <button
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                    onClick={handleAddToCart}
                    type='button'
                >
                    <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;