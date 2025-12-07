import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage(){
    return(
        <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <section className="py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                <div>
                  <h2 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-yellow-700"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    About Vitavogue
                  </h2>
                  <p 
                    className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    At Vitavogue, we believe fashion is a powerful form of self-expression. Our mission is to provide 
                    trendy, affordable clothing that empowers Nigerians to showcase their unique style and personality.
                  </p>
                  <p 
                    className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    From casual everyday wear to elegant bridal collections, we curate pieces that blend contemporary 
                    fashion with local sensibilities, ensuring our customers always look and feel their best.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {[
                      { icon: '🌟', title: 'Quality', desc: 'Premium materials' },
                      { icon: '💰', title: 'Affordable', desc: 'Budget-friendly fashion' },
                      { icon: '🚚', title: 'Fast Delivery', desc: 'Quick shipping' },
                      { icon: '👍', title: 'Satisfaction', desc: '100% guarantee' }
                    ].map((feature, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg text-center border-2 border-transparent hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{feature.icon}</div>
                        <h3 
                          className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-6 sm:p-8 md:p-10 text-center shadow-2xl">
                  <div className="text-6xl sm:text-7xl md:text-8xl mb-3 sm:mb-4">👗</div>
                  <h3 
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Fashion Forward
                  </h3>
                  <p 
                    className="text-black text-sm sm:text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Discover the latest trends and timeless classics that define your unique style.
                  </p>
                </div>
              </div>
              
              {/* Our Story Section */}
              <div className="mt-12 sm:mt-16 md:mt-20 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border-2 border-yellow-400/20">
                <h3 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-yellow-700"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Our Story
                </h3>
                <p 
                  className="text-base sm:text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Founded with a passion for fashion and a commitment to quality, Vitavogue has grown to become 
                  a trusted name in Nigerian fashion. We serve customers across Abuja, Bauchi, Maiduguri, and Kano
                  bringing style and elegance to every corner of Nigeria.
                </p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        </>
    )
}