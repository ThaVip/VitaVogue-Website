import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ContactPage(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setStatus({ type: "error", message: "Please fill in all fields" });
            setIsSubmitting(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({ type: "error", message: "Please enter a valid email address" });
            setIsSubmitting(false);
            return;
        }

        try {
            // Using EmailJS to send emails directly from frontend
            // Replace these with your actual EmailJS credentials
            const serviceID = "YOUR_SERVICE_ID"; // Get from EmailJS dashboard
            const templateID = "YOUR_TEMPLATE_ID"; // Get from EmailJS dashboard
            const publicKey = "YOUR_PUBLIC_KEY"; // Get from EmailJS dashboard

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: "sheriffmusazarami@gmail.com" // Your receiving email
            };

            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    service_id: serviceID,
                    template_id: templateID,
                    user_id: publicKey,
                    template_params: templateParams
                }),
            });

            if (response.ok) {
                setStatus({ 
                    type: "success", 
                    message: "Thank you! Your message has been sent successfully. We'll get back to you soon." 
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            setStatus({ 
                type: "error", 
                message: "Oops! Something went wrong. Please try again or contact us directly at info@vitavogue.com.ng" 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <section className="py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-10 md:mb-12">
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Get In Touch
                </h2>
                <p 
                  className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
                {/* Contact Cards */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 
                    className="font-bold text-gray-800 mb-2 text-base sm:text-lg"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Phone
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <a href="tel:+2348123755353" className="hover:text-yellow-600 transition-colors">
                      +234 812 375 5353
                    </a>
                  </p>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 
                    className="font-bold text-gray-800 mb-2 text-base sm:text-lg"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Email
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <a href="mailto:info@vitavogue.com.ng" className="hover:text-yellow-600 transition-colors break-all">
                      info@vitavogue.com.ng
                    </a>
                  </p>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 
                    className="font-bold text-gray-800 mb-2 text-base sm:text-lg"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    WhatsApp
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <a href="https://wa.me/2347045616961" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">
                      +234 704 561 6961
                    </a>
                  </p>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 
                    className="font-bold text-gray-800 mb-2 text-base sm:text-lg"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Locations
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Abuja • Bauchi • Maiduguri • Kano
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border-2 border-yellow-400/20">
                <h3 
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Status Message */}
                  {status.message && (
                    <div 
                      className={`p-4 rounded-lg text-sm sm:text-base ${
                        status.type === "success" 
                          ? "bg-green-50 text-green-800 border-2 border-green-200" 
                          : "bg-red-50 text-red-800 border-2 border-red-200"
                      }`}
                    >
                      {status.message}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label 
                        className="block text-gray-700 font-bold mb-2 text-sm sm:text-base"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-gray-700 font-bold mb-2 text-sm sm:text-base"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label 
                      className="block text-gray-700 font-bold mb-2 text-sm sm:text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm sm:text-base"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <div>
                    <label 
                      className="block text-gray-700 font-bold mb-2 text-sm sm:text-base"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm sm:text-base"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-3 sm:py-4 rounded-lg font-bold hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        </>
    )
}