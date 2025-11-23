import React from 'react';
import { MessageCircle, Ruler, Palette, CheckCircle, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CustomDesignPage = () => {
  // Replace with your actual WhatsApp business number (format: 1234567890)
  const whatsappNumber = "2347045616961";
  const whatsappMessage = "Hi Vitavogue! I'm interested in creating a custom design.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const steps = [
    {
      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Contact Us",
      description: "Start a WhatsApp conversation with our design team"
    },
    {
      icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Share Your Vision",
      description: "Send design inspiration photos and describe your style"
    },
    {
      icon: <Ruler className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Measurements",
      description: "We'll guide you through taking accurate measurements"
    },
    {
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Confirm & Create",
      description: "Get a quote, pay 50% deposit, and we start crafting"
    }
  ];

  const designGallery = [
    {
      category: "Kaftans",
      images: [
        "https://i.pinimg.com/736x/92/eb/77/92eb77cc06254b944e1fece661727618.jpg",
        "https://i.pinimg.com/736x/50/c4/cb/50c4cbdad06110b88efe938b50ecda2a.jpg",
        "https://i.pinimg.com/1200x/cd/36/a0/cd36a0d1b8f09007e49ecdd7118f93bd.jpg",
        "https://i.pinimg.com/736x/30/03/43/300343d56cb6b17a0231a6006c909f8a.jpg"
      ]
    },
    {
      category: "Bridal Wear",
      images: [
        "https://i.pinimg.com/1200x/b2/cd/2c/b2cd2ceaa67a736fee7069becf5bf3f8.jpg",
        "https://i.pinimg.com/1200x/ed/41/54/ed41543843c50e8908a965c9f9b06b64.jpg",
        "https://i.pinimg.com/736x/39/dc/e4/39dce4fde62391c93c9097b5df5af5d8.jpg",
        "https://i.pinimg.com/736x/f5/f6/f3/f5f6f3bc1bcd69912a3d0fccb35340ba.jpg"
      ]
    }
  ];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Mobile Optimized */}
      <section
        className="bg-cover bg-center bg-no-repeat text-white py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-orange-400/15"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10 flex items-center min-h-[45vh] sm:min-h-[55vh] md:min-h-[65vh]">
          <div className="w-full">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl tracking-wide leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Custom Design Service
            </h1>
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed drop-shadow-lg font-light tracking-wide px-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Can't find what you're looking for? Create a custom kaftan or bridal wear designed just for you. 
              Connect with our designers via WhatsApp.
            </p>
            
            
             <a href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span className="whitespace-nowrap">Start Your Custom Design</span>
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* How It Works - Seamless Flow */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          How It Works
        </h2>
        <p 
          className="text-center text-gray-700 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Your journey to a perfectly tailored outfit in four simple steps
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-2 sm:mb-3 md:mb-4">
                {step.icon}
              </div>
              <h3 
                className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1 sm:mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {step.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Design Gallery - Seamless */}
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Design Inspiration
        </h2>
        <p 
          className="text-center text-gray-700 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Explore our collection of beautiful custom designs
        </p>
        
        {designGallery.map((category, catIndex) => (
          <div key={catIndex} className="mb-8 sm:mb-10 md:mb-12">
            <h3 
              className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full"></div>
              {category.category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {category.images.map((image, imgIndex) => (
                <div 
                  key={imgIndex}
                  className="relative group overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[3/4]"
                >
                  <img 
                    src={image} 
                    alt={`${category.category} ${imgIndex + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-2 sm:p-3 md:p-4 text-white">
                      <p 
                        className="font-semibold text-xs sm:text-sm"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        Custom {category.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Why Choose Us - Seamless */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-10 md:mb-12 border-2 border-yellow-400/20">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Choose Custom Design?
          </h2>
          <p 
            className="text-center text-gray-700 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Experience the luxury of personalized fashion
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Palette className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600" />
              </div>
              <h4 
                className="font-bold text-gray-800 mb-2 text-base sm:text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Unique Design
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">Exclusively yours, no duplicates</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Ruler className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
              </div>
              <h4 
                className="font-bold text-gray-800 mb-2 text-base sm:text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Perfect Fit
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">Tailored to your exact measurements</p>
            </div>
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              </div>
              <h4 
                className="font-bold text-gray-800 mb-2 text-base sm:text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Premium Quality
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">Expert craftsmanship guaranteed</p>
            </div>
          </div>
        </div>

        {/* Final CTA - Seamless */}
        <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-green-200/50">
          <h3 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Create Your Dream Outfit?
          </h3>
          <p 
            className="text-gray-700 mb-5 sm:mb-6 text-sm sm:text-base"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our design team is just a message away
          </p>
          
           <a href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            Chat with Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CustomDesignPage;