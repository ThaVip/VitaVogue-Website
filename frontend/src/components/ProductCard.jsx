import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/useCartStore';

const ProductCard = ({ product }) => { // âœ… Changed from products to product (singular)
    const { user } = useUserStore();
    const { addToCart } = useCartStore();

const handleAddToCart = (e) => {
    console.log('Button clicked!'); // ✅ Check if this logs
    alert('Button clicked!'); // ✅ This will show on mobile
    
    e?.preventDefault();
    e?.stopPropagation();
    
    if (!user) {
        toast.error("Please login to add products to cart", { id: "login" });
        return;
    } else {
        addToCart(product);
    }
};

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-yellow-400 overflow-hidden group">
            {/* Product Image */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isFeatured && (
                    <div className="absolute top-3 right-3 bg-black text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold text-yellow-600 mb-4">
                    N{product.price.toLocaleString()}
                </p>
                <button
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-3 px-6 rounded-lg md:hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={handleAddToCart}
                    type="button"
                >
                    <ShoppingCart className='w-5 h-5' />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;