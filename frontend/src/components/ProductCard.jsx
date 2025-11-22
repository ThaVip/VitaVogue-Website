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
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border-2 border-transparent hover:border-yellow-400 overflow-hidden group">
            {/* Product Image - Optimized for mobile 2-column */}
            <div className="relative h-32 xs:h-36 sm:h-48 md:h-56 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isFeatured && (
                    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black text-yellow-400 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
                        Featured
                    </div>
                )}
            </div>

            {/* Product Info - Compact for mobile */}
            <div className="p-2 sm:p-3 md:p-4 lg:p-5">
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-xs mb-1.5 sm:mb-2 line-clamp-2 hidden sm:block">
                    {product.description}
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-yellow-600 mb-1.5 sm:mb-2 md:mb-3">
                    ₦{product.price.toLocaleString()}
                </p>
                <button
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-1 sm:py-1.5 md:py-2 lg:py-2.5 px-2 sm:px-3 md:px-4 rounded-md sm:rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm"
                    onClick={handleAddToCart}
                    type='button'
                >
                    <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">Add to Cart</span>
                    <span className="xs:hidden">Add</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;