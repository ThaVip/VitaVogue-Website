import React from 'react';
import { MessageCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
    const handleWhatsAppOrder = () => {
        const phoneNumber = "2347045616961"; // WhatsApp number without + or spaces
        const message = `Hello VitaVogue Team,\n\nI'm interested in purchasing the following product:\n\n*${product.name}*\n\nCould you please provide more information regarding availability, pricing, and delivery options?\n\nThank you.`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
    };

    return (
        <div className="bg-white   shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border-2 border-transparent hover:border-yellow-700 overflow-hidden group">
            {/* Product Image - More space */}
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isFeatured && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black text-yellow-400 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold">
                        Featured
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                <h3 
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {product.name}
                </h3>
                <p 
                    className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    {product.description}
                </p>
                <button
                    className=" bg-gradient-to-r from-yellow-700 to-yellow-900 text-white font-bold py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-md sm:rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base shadow-lg"
                    onClick={handleWhatsAppOrder}
                    type='button'
                >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Place Oder</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;