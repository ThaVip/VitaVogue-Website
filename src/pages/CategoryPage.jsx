import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Scissors, Sparkles } from 'lucide-react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products, categories } from './HomePage';

export default function CategoryPage({ cart = [], setCart }) {
  const { categoryId } = useParams();
  
  const addToCart = (product) => {
    if (!setCart) return;
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const categoryData = categories.find(cat => cat.id === categoryId);
  const categoryProducts = products[categoryId] || [];
  const isCustomCategory = categoryId === 'bridal' || categoryId === 'formal';

  if (!categoryData) {
    return (
      <>
        <Header cart={cart} />
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
      <Header cart={cart} />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-yellow-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          {/* Category Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{categoryData.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {categoryData.name} Collection
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">{categoryData.desc}</p>
            
            {/* Custom Tailoring CTA for Bridal and Formal */}
            {isCustomCategory && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 mb-12 text-black">
                <div className="flex items-center justify-center mb-4">
                  <Scissors className="w-8 h-8 mr-3" />
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {categoryId === 'bridal' ? 'Dream Wedding Dress' : 'Perfect Fit Guaranteed'}
                </h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  {categoryId === 'bridal' 
                    ? 'Create your perfect wedding dress with our expert tailors. Upload your dream design or choose from our exclusive collection.'
                    : 'Get professionally tailored formal wear that fits you perfectly. Custom measurements and premium fabrics available.'
                  }
                </p>
                <Link
                  to={`/custom-tailoring/${categoryId}`}
                  className="inline-flex items-center bg-black text-yellow-400 px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Scissors className="w-5 h-5 mr-2" />
                  Start Custom Order
                </Link>
              </div>
            )}
          </div>
          
          {/* Ready-Made Products Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isCustomCategory ? 'Ready-Made Collection' : 'Our Collection'}
            </h3>
            
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-6">No products available in this category yet.</p>
                <Link 
                  to="/"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300"
                >
                  Browse Other Categories
                </Link>
              </div>
            )}
          </div>

          {/* Additional Custom Tailoring Info for Bridal/Formal */}
          {isCustomCategory && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Custom Tailoring?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="text-4xl mb-3">✂️</div>
                  <h4 className="font-bold text-gray-800 mb-2">Expert Craftsmanship</h4>
                  <p className="text-gray-600 text-sm">Our master tailors bring decades of experience in creating perfect fits.</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl mb-3">📏</div>
                  <h4 className="font-bold text-gray-800 mb-2">Perfect Measurements</h4>
                  <p className="text-gray-600 text-sm">Precise measurements ensure your outfit fits like it was made just for you.</p>
                </div>
                <div className="p-4">
                  <div className="text-4xl mb-3">🎨</div>
                  <h4 className="font-bold text-gray-800 mb-2">Your Design Vision</h4>
                  <p className="text-gray-600 text-sm">Bring your dream design to life or choose from our exclusive collections.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </>
  );
}