import Hero from "../components/Hero"
import Header from "../components/Header"
import Footer from "../components/Footer"
import CategoryCard from "../components/CategoryCard"
import ProductCard from "../components/ProductCard"
import Form from "./Form"

const products = {
  featured: [
    { id: 1, name: 'Elegant Ankara Dress', price: 15000, badge: 'New', emoji: '🌟', category: 'casual' },
    { id: 2, name: 'Corporate Blazer Set', price: 25000, badge: 'Sale', emoji: '✨', category: 'formal' },
    { id: 3, name: 'Casual Jeans & Top', price: 12000, badge: 'Popular', emoji: '💫', category: 'casual' },
    { id: 4, name: 'Designer Handbag', price: 8000, badge: 'Trending', emoji: '🎀', category: 'accessories' },
  ],
  casual: [
    { id: 5, name: 'Trendy T-Shirt', price: 5000, badge: 'New', emoji: '👕' },
    { id: 6, name: 'Denim Jeans', price: 8000, badge: 'Sale', emoji: '👖' },
    { id: 7, name: 'Casual Hoodie', price: 10000, badge: 'Popular', emoji: '🎽' },
    { id: 8, name: 'Casual Dress', price: 12000, badge: 'Trending', emoji: '👗' },
  ],
  formal: [
    { id: 9, name: 'Executive Suit', price: 45000, badge: 'Premium', emoji: '👔' },
    { id: 10, name: 'Office Dress', price: 18000, badge: 'New', emoji: '👗' },
    { id: 11, name: 'Business Blazer', price: 22000, badge: 'Sale', emoji: '🧥' },
    { id: 12, name: 'Formal Shirt', price: 8500, badge: 'Popular', emoji: '👔' },
  ],
  bridal: [
    { id: 13, name: 'Luxury Wedding Gown', price: 85000, badge: 'Exclusive', emoji: '👰' },
    { id: 14, name: 'Traditional Bridal Set', price: 65000, badge: 'Custom', emoji: '💍' },
    { id: 15, name: 'Engagement Dress', price: 35000, badge: 'New', emoji: '👗' },
    { id: 16, name: 'Bridal Accessories Set', price: 15000, badge: 'Trending', emoji: '🎀' },
  ],
  accessories: [
    { id: 17, name: 'Leather Handbag', price: 12000, badge: 'New', emoji: '👜' },
    { id: 18, name: 'Fashion Jewelry Set', price: 6000, badge: 'Sale', emoji: '💍' },
    { id: 19, name: 'Designer Sunglasses', price: 4500, badge: 'Trending', emoji: '🕶️' },
    { id: 20, name: 'Silk Scarf', price: 3000, badge: 'Popular', emoji: '🧣' },
  ]
};

const categories = [
  { id: 'casual', name: 'Casual Wear', emoji: '👕', desc: 'Comfortable and trendy everyday outfits' },
  { id: 'formal', name: 'Formal Wear', emoji: '👔', desc: 'Professional attire for office and business' },
  { id: 'bridal', name: 'Bridal Wear', emoji: '👰', desc: 'Elegant wedding and special occasion dresses' },
  { id: 'accessories', name: 'Accessories', emoji: '👜', desc: 'Bags, jewelry, and fashion accessories' },
];

export default function HomePage({ cart = [], setCart }) {
  
  const addToCart = (product) => {
    if (!setCart) return; // Guard clause if setCart is not provided
    
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

  return (
    <>
      <Header cart={cart} />
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
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.featured.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>
      <Form />
      <Footer /> 
    </>
  )
}

// Export products and categories for use in other components
export { products, categories };