import Hero from '../components/Hero'
import { useEffect } from 'react';
import CategoryCard from '../components/CategoryCard'
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedProducts from '../components/FeaturedProducts';
import { useProductStore } from '../store/useProductStore';
import { MessageCircle, Eye, ShoppingBag } from 'lucide-react';

const HomePage = () => {
  const categories = [
    { id: 'casual', name: 'Casual Wear', imageUrl: '/mens.jpeg', desc: 'Comfortable and trendy everyday outfits' },
    { id: 'fabric', name: "Fabrics", imageUrl: '/fabrics.jpg', desc: 'Premium quality fabrics and materials' },
    { id: 'bridal', name: 'Bridal Wear', imageUrl: '/Bridal.jpeg', desc: 'Wedding and special occasion dresses' },
    { id: 'accessories', name: 'Accessories', imageUrl: '/accessories.jpeg', desc: 'Bags, jewelry, and fashion accessories' },
  ];
  
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div>
      <Header />
      <Hero />
      
      {/* How It Works Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-yellow-700"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How It Works
            </h2>
            <p 
              className="text-black text-base sm:text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Simple, personalized shopping in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Eye className="w-7 h-7 text-yellow-700" />
              </div>
              <h3 
                className="text-lg sm:text-xl font-semibold text-gray-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Browse Products
              </h3>
              <p 
                className="text-black text-sm sm:text-base"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Explore our collections of casual, bridal wear, fabrics and accessories
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <MessageCircle className="w-7 h-7 text-yellow-700" />
              </div>
              <h3 
                className="text-lg sm:text-xl font-semibold text-gray-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact Our Team
              </h3>
              <p 
                className="text-black text-sm sm:text-base"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Click "Place Oder" to connect with our expert team
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <ShoppingBag className="w-7 h-7 text-yellow-700" />
              </div>
              <h3 
                className="text-lg sm:text-xl font-semibold text-gray-900 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Get Personalized Help
              </h3>
              <p 
                className="text-black text-sm sm:text-base"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                We'll provide pricing, availability, delivery details and custom tailoring options
              </p>
            </div>
          </div>

          {/* Simple Info Note */}
          <div className="mt-12 max-w-3xl mx-auto text-center">
            <p 
              className="text-black text-sm sm:text-base leading-relaxed border-l-4 border-yellow-700 pl-4 py-2 text-left"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our team is available via WhatsApp to answer questions, provide recommendations and guide you through your purchase with personalized service. We also offer custom tailoring services—just let us know your requirements!
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-yellow-700"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop by Category
            </h2>
            <p 
              className="text-black text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Browse our collections of available materials and products
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          {/* Featured Products */}
          {!isLoading && products.length > 0 && (
            <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
              <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-yellow-700"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Featured Products
                </h2>
                <p 
                  className="text-black text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Handpicked selection of trending items
                </p>
              </div>
              <FeaturedProducts featuredProducts={products} />
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default HomePage