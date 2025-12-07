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
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-yellow-700"
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
                    <a href="tel:+2347045616961" className="hover:text-yellow-600 transition-colors">
                      +234 704 561 6961
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
                    <a href="mailto:vitavogue_ltd@gmail.com" className="hover:text-yellow-600 transition-colors break-all">
                      vitavogue_ltd@gmail.com
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

              </div>
          </section>
        </div>
        <Footer />
        </>
    )
}