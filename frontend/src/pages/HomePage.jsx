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
  { id: 'fabrics', name: "Fabrics", imageUrl: '/fabrics.jpg', desc: 'Professional attire for office and business' },
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
      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
          {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default HomePage
