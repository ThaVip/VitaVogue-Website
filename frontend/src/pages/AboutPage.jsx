
import Header from '../components/Header';
import Footer from '../components/Footer';


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