import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartPage = () => {
  const { cart, total, subtotal } = useCartStore();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors duration-300 mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Continue Shopping</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <div className="bg-gray-50 rounded-full p-8 mb-6">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300 inline-flex items-center gap-2"
            >
              <ShoppingBag size={20} />
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-semibold">N{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        N{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-4 rounded-full font-bold hover:scale-105 transition-transform duration-300 mb-4">
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className="block text-center text-gray-600 hover:text-orange-500 transition-colors duration-300 font-medium"
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