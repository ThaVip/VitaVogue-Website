import { useEffect, useState } from "react";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

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
                  <div className='bg-white rounded-lg sm:rounded-2xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-yellow-400'>
                    <div className='overflow-hidden relative'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
                      />
                      <div className='absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full'>
                        Featured
                      </div>
                    </div>
                    
                    <div className='p-3 sm:p-4 md:p-5 lg:p-6'>
                      <h3 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-gray-900 line-clamp-2'
                      style={{ fontFamily: "'Italiana', serif" }}>
                        {product.name}
                      </h3>
                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className=" bg-gradient-to-r from-yellow-700 to-yellow-900 text-white font-bold py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-md sm:rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base shadow-lg">
                        <MessageCircle className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5' />
                        Place Oder
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
    </div>
  );
};

export default FeaturedProducts;