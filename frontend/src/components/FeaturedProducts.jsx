import { useEffect, useState } from "react";
import { MessageCircle, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [zoomedProduct, setZoomedProduct] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  const handleWhatsAppOrder = (product) => {
    const phoneNumber = "2347045616961";
    const message = `Hello VitaVogue Team,\n\nI'm interested in purchasing the following product:\n\n*${product.name}*\n\nCould you please provide more information regarding availability, pricing, and delivery options?\n\nThank you.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  const openZoom = (product) => {
    setZoomedProduct(product);
    setImageLoaded(false);
  };

  const closeZoom = () => {
    setZoomedProduct(null);
    setImageLoaded(false);
  };

  return (
    <div className='py-8 sm:py-12 md:py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        <div className='relative'>
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {featuredProducts?.map((product) => (
                <div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-1.5 sm:px-2 md:px-3'>
                  <div className='bg-white rounded-lg sm:rounded-2xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-yellow-400 group'>
                    <div 
                      className='overflow-hidden relative cursor-pointer'
                      onClick={() => openZoom(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
                      />
                      <div className='absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full'>
                        Featured
                      </div>
                      {/* Zoom Icon Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    
                    <div className='p-3 sm:p-4 md:p-5 lg:p-6'>
                      <h3 
                        className='text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-gray-900 line-clamp-2 cursor-pointer hover:text-yellow-700 transition-colors'
                        style={{ fontFamily: "'Italiana', serif" }}
                        onClick={() => openZoom(product)}
                      >
                        {product.name}
                      </h3>
                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className="w-full bg-gradient-to-r from-yellow-700 to-yellow-900 text-white font-bold py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-md sm:rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base shadow-lg"
                        type="button"
                      >
                        <MessageCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-2 sm:-left-4 md:-left-6 transform -translate-y-1/2 p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 shadow-lg ${
              isStartDisabled 
                ? "bg-gray-300 cursor-not-allowed opacity-50" 
                : "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 hover:scale-110"
            }`}
          >
            <ChevronLeft className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black' />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-2 sm:-right-4 md:-right-6 transform -translate-y-1/2 p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 shadow-lg ${
              isEndDisabled 
                ? "bg-gray-300 cursor-not-allowed opacity-50" 
                : "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 hover:scale-110"
            }`}
          >
            <ChevronRight className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black' />
          </button>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedProduct && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeZoom}
        >
          <div 
            className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-white flex items-center justify-center">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-700"></div>
                  </div>
                )}
                <img
                  src={zoomedProduct.image}
                  alt={zoomedProduct.name}
                  className="w-full h-full object-contain"
                  onLoad={() => setImageLoaded(true)}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                  Featured
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <h2 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    style={{ fontFamily: "'Italiana', serif" }}
                  >
                    {zoomedProduct.name}
                  </h2>
                  <p 
                    className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {zoomedProduct.description}
                  </p>
                  
                  {/* Category Badge */}
                  {zoomedProduct.category && (
                    <div className="mb-6">
                      <span className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                        {zoomedProduct.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  className="w-full bg-gradient-to-r from-yellow-700 to-yellow-900 text-white font-bold py-4 px-6 rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-base sm:text-lg shadow-lg"
                  onClick={() => handleWhatsAppOrder(zoomedProduct)}
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
    </div>
  );
};

export default FeaturedProducts;