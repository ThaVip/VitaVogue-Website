import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import { Toaster } from 'react-hot-toast';

const CategoryPage = () => {
  const { fetchProductsByCategory, products, loading } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category);
    }
  }, [fetchProductsByCategory, category]);

  console.log('Products:', products);

  // Category data for display
  const categoryData = {
    casual: { name: 'Casual Wear', desc: 'Comfortable and trendy everyday outfits including kaftans and relaxed wear' },
    fabric: { name: 'Fabrics', desc: 'Premium quality fabrics and materials for your sewing and fashion projects'},
    bridal: { name: 'Bridal Wear',  desc: 'Wedding and special occasion dresses' },
    accessories: { name: 'Accessories',  desc: 'Bags, jewelry and fashion accessories' },
  };

  const currentCategory = categoryData[category];

  if (!currentCategory) {
    return (
      <>
        <Toaster />
        <Header />

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
            <Link
              to="/"
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-yellow-600 mb-6 sm:mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>

          {/* Category Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent capitalize">
              {currentCategory.name}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">{currentCategory.desc}</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Products Grid - 2 columns on mobile */}
          {!loading && products && products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-12">
              <div className="text-4xl sm:text-6xl mb-4">🛍️</div>
              <p className="text-lg sm:text-xl text-gray-600 mb-6">No products available in this category yet.</p>
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300"
              >
                Browse Other Categories
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CategoryPage;