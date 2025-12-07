import React, { useState } from 'react';
import { MessageCircle, X, ZoomIn } from 'lucide-react';

const ProductCard = ({ product }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleWhatsAppOrder = () => {
        const phoneNumber = "2347045616961";
        const message = `Hello VitaVogue Team,\n\nI'm interested in purchasing the following product:\n\n*${product.name}*\n\nCould you please provide more information regarding availability, pricing, and delivery options?\n\nThank you.`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
    };

    return (
        <>
            <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border-2 border-transparent hover:border-yellow-700 overflow-hidden group">
                {/* Product Image - More space */}
                <div 
                    className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden cursor-pointer"
                    onClick={() => setIsZoomed(true)}
                >
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
                    {/* Zoom Icon Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 
                        className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-1 cursor-pointer hover:text-yellow-700 transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        onClick={() => setIsZoomed(true)}
                    >
                        {product.name}
                    </h3>
                    <p 
                        className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 cursor-pointer hover:text-gray-800 transition-colors"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        onClick={() => setIsZoomed(true)}
                    >
                        {product.description}
                    </p>
                    <button
                        className="w-full bg-gradient-to-r from-yellow-700 to-yellow-900 text-white font-bold py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-md sm:rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base shadow-lg"
                        onClick={handleWhatsAppOrder}
                        type='button'
                    >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Place Order</span>
                    </button>
                </div>
            </div>

            {/* Zoom Modal */}
            {isZoomed && (
                <div 
                    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setIsZoomed(false)}
                >
                    <div 
                        className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsZoomed(false)}
                            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-300"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            {/* Image Section */}
                            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                                {product.isFeatured && (
                                    <div className="absolute top-4 left-4 bg-black text-yellow-400 px-4 py-2 rounded-full text-sm font-bold">
                                        Featured
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                                <div>
                                    <h2 
                                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {product.name}
                                    </h2>
                                    <p 
                                        className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6"
                                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                    >
                                        {product.description}
                                    </p>
                                    
                                    {/* Category Badge */}
                                    <div className="mb-6">
                                        <span className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    className="w-full bg-gradient-to-r from-yellow-700 to-yellow-900 text-white font-bold py-4 px-6 rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-base sm:text-lg shadow-lg"
                                    onClick={handleWhatsAppOrder}
                                    type='button'
                                >
                                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                                    <span>Place Order via WhatsApp</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default ProductCard;