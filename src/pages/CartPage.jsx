import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CartPage({ cart = [], setCart }){
  
  const removeFromCart = (productId) => {
    if (setCart) {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!setCart) return;
    
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };

  return(
    <>
      <Header cart={cart} />
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Shopping Cart
          </h2>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">Your cart is empty</p>
              <Link 
                to="/"
                className="inline-block mt-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6 ">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center text-2xl">
                      {item.emoji}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      <p className="text-yellow-600 font-bold">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
                        disabled={!setCart}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
                        disabled={!setCart}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold transition-colors"
                      disabled={!setCart}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="bg-black text-yellow-400 rounded-2xl p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Total: {formatPrice(getCartTotal())}</h3>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}