import Hero from '../components/Hero'
import { useEffect } from 'react';
import CategoryCard from '../components/CategoryCard'
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedProducts from '../components/FeaturedProducts';
import { useProductStore } from '../store/useProductStore';

const HomePage = () => {
  const categories = [
    { id: 'casual', name: 'Casual Wear', imageUrl: '/mens.jpeg', desc: 'Comfortable and trendy everyday outfits' },
    { id: 'fabric', name: "Fabrics", imageUrl: '/fabrics.jpg', desc: 'Professional attire for office and business' },
    { id: 'bridal', name: 'Bridal Wear', imageUrl: '/Bridal.jpeg', desc: 'Elegant wedding and special occasion dresses' },
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
      
      {/* Categories Section with Description */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Explore our curated collections of fashion essentials from everyday wear to special occasions
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          {/* Featured Products with Description */}
          {!isLoading && products.length > 0 && (
            <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
              <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Featured Products
                </h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                  Discover our handpicked selection of trending items, loved by our customers
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