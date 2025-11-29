import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../../lib/axios";

const CartPage = () => {
  const { cart, total, subtotal} = useCartStore();

   const handlePayment = async () => {
        try {
            // Create checkout session
            const response = await axios.post('/payments/create-checkout-session', {
              //send the cart items to the Api
                products: cart.map(item => ({
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                }))
            });

            if (response.data.success) {
                // Redirect to Paystack payment page
                window.location.href = response.data.authorization_url;
            } else {
                alert('Failed to initialize payment');
            }

        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        } 
      }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors duration-300 mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span className="font-medium">Continue Shopping</span>
        </Link>

        {/* Page Title */}
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 bg-white rounded-xl">
            <div className="bg-gray-50 rounded-full p-6 sm:p-8 mb-4 sm:mb-6">
              <ShoppingBag size={48} className="text-gray-300 sm:w-16 sm:h-16" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 px-4 text-center">
              Your cart is empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 text-center max-w-md px-4">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300 inline-flex items-center gap-2 text-sm sm:text-base"
            >
              <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg sticky top-4 sm:top-8">
                <h2 
                  className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Order Summary
                </h2>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg font-bold text-gray-800">Total</span>
                      <span className="text-xl sm:text-2xl font-bold text-yellow-600">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 sm:px-6 py-3 sm:py-4 rounded-full font-bold hover:scale-105 transition-transform duration-300 mb-3 sm:mb-4 text-sm sm:text-base"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className="block text-center text-sm sm:text-base text-gray-600 hover:text-orange-500 transition-colors duration-300 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* People Also Bought Section */}
        {cart.length > 0 && <PeopleAlsoBought />}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;