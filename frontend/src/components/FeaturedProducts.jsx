import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const { addToCart } = useCartStore();

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

  return (
    <div className='py-16 md:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>
          Featured Products
        </h2>
        
        <div className='relative'>
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {featuredProducts?.map((product) => (
                <div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2 md:px-3'>
                  <div className='bg-white rounded-2xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-transparent hover:border-yellow-400'>
                    <div className='overflow-hidden relative'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-56 md:h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
                      />
                      <div className='absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full'>
                        Featured
                      </div>
                    </div>
                    
                    <div className='p-4 md:p-6'>
                      <h3 className='text-lg md:text-xl font-bold mb-2 text-gray-800 line-clamp-1'>
                        {product.name}
                      </h3>
                      <p className='text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>
                        ₦{product.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        className='w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold py-3 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105'
                      >
                        <ShoppingCart className='w-5 h-5' />
                        Add to Cart
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
            className={`absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 p-3 md:p-4 rounded-full transition-all duration-300 shadow-lg ${
              isStartDisabled 
                ? "bg-gray-300 cursor-not-allowed opacity-50" 
                : "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 hover:scale-110"
            }`}
          >
            <ChevronLeft className='w-5 h-5 md:w-6 md:h-6 text-black' />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 p-3 md:p-4 rounded-full transition-all duration-300 shadow-lg ${
              isEndDisabled 
                ? "bg-gray-300 cursor-not-allowed opacity-50" 
                : "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 hover:scale-110"
            }`}
          >
            <ChevronRight className='w-5 h-5 md:w-6 md:h-6 text-black' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;