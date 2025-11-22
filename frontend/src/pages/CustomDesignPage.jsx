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
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Contact Us",
      description: "Start a WhatsApp conversation with our design team"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Share Your Vision",
      description: "Send design inspiration photos and describe your style"
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Measurements",
      description: "We'll guide you through taking accurate measurements"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Confirm & Create",
      description: "Get a quote, pay 50% deposit, and we start crafting"
    }
  ];

  const designGallery = [
    {
      category: "Kaftans",
      images: [
        "https://pin.it/31L6DiuWq",
        "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=400&h=500&fit=crop"
      ]
    },
    {
      category: "Bridal Wear",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=500&fit=crop"
      ]
    }
  ];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center bg-no-repeat text-white py-16 md:py-24 relative overflow-hidden min-h-[80vh]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80')`
        }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Custom Design Service
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8">
            Can't find what you're looking for? Create a custom kaftan or bridal wear designed just for you. 
            Connect with our designers via WhatsApp.
          </p>
          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            Start Your Custom Design
            <Send className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center text-white mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Design Gallery */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Design Inspiration
        </h2>
        
        {designGallery.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full"></div>
              {category.category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.images.map((image, imgIndex) => (
                <div 
                  key={imgIndex}
                  className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[3/4]"
                >
                  <img 
                    src={image} 
                    alt={`${category.category} ${imgIndex + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="font-semibold text-sm">Custom {category.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Why Choose Us */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose Custom Design?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-7 h-7 text-yellow-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Unique Design</h4>
              <p className="text-gray-600 text-sm">Exclusively yours, no duplicates</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler className="w-7 h-7 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Perfect Fit</h4>
              <p className="text-gray-600 text-sm">Tailored to your exact measurements</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Premium Quality</h4>
              <p className="text-gray-600 text-sm">Expert craftsmanship guaranteed</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className=" rounded-3xl p-8 text-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
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