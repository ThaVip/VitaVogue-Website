
import Header from '../components/Header';
import Footer from '../components/Footer';
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

export default function AboutPage(){
    return(
        <>
        <Header />
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              About Vitavogue
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Vitavogue, we believe fashion is a powerful form of self-expression. Our mission is to provide 
              trendy, affordable clothing that empowers Nigerians to showcase their unique style and personality.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From casual everyday wear to elegant bridal collections, we curate pieces that blend contemporary 
              fashion with local sensibilities, ensuring our customers always look and feel their best.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '🌟', title: 'Quality', desc: 'Premium materials and craftsmanship' },
                { icon: '💰', title: 'Affordable', desc: 'Fashion that fits your budget' },
                { icon: '🚚', title: 'Fast Delivery', desc: 'Quick and reliable shipping' },
                { icon: '💝', title: 'Satisfaction', desc: '100% customer satisfaction guarantee' }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-8 text-center">
            <div className="text-8xl mb-4">👗</div>
            <h3 className="text-2xl font-bold text-black mb-4">Fashion Forward</h3>
            <p className="text-black">
              Discover the latest trends and timeless classics that define your unique style.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer />
        </>
    )
}