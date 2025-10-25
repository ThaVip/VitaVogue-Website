import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ContactPage(){
    return(
        <>
        <Header  />
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Contact Us
        </h2>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Subject</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-4 rounded-lg font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
    <Footer />
        </>
    )
}