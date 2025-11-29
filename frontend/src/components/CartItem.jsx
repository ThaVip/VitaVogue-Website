import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className='rounded-lg border border-gray-200 bg-white p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <div className='space-y-3 md:space-y-4 md:flex md:items-center md:justify-between md:gap-6'>
        {/* Product Image */}
        <div className='shrink-0 md:order-1'>
          <img 
            className='h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-lg object-cover mx-auto md:mx-0' 
            src={item.image} 
            alt={item.name}
          />
        </div>

        {/* Product Details */}
        <div className='w-full min-w-0 flex-1 space-y-2 md:space-y-3 md:order-2 md:max-w-md'>
          <h3 
            className='text-base sm:text-lg font-bold text-gray-800 hover:text-orange-500 transition-colors duration-300 line-clamp-1'
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {item.name}
          </h3>
          <p 
            className='text-xs sm:text-sm text-gray-600 line-clamp-2'
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {item.description}
          </p>
          
          {/* Price - Mobile */}
          <p className='text-lg sm:text-xl font-bold text-yellow-600 md:hidden'>
            ₦{item.price.toLocaleString()}
          </p>
        </div>

        {/* Quantity Controls and Actions */}
        <div className='flex items-center justify-between md:order-3 md:flex-col md:items-end md:gap-4'>
          {/* Quantity Controls */}
          <div className='flex items-center gap-2 sm:gap-3'>
            <button
              className='inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full
               bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500
               focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
               transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className='text-black' size={14} />
            </button>
            <p className='text-base sm:text-lg font-semibold text-gray-800 min-w-[2rem] text-center'>
              {item.quantity}
            </p>
            <button
              className='inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full
               bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500
               focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
               transition-all duration-300'
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className='text-black' size={14} />
            </button>
          </div>

          {/* Price and Remove - Desktop/Tablet */}
          <div className='hidden md:flex md:flex-col md:items-end md:gap-2'>
            <p className='text-xl font-bold text-yellow-600'>
              ₦{item.price.toLocaleString()}
            </p>
            <button
              className='inline-flex items-center gap-2 text-sm font-medium text-red-500
               hover:text-red-600 hover:underline transition-colors duration-300'
              onClick={() => removeFromCart(item._id)}
            >
              <Trash size={18} />
              <span>Remove</span>
            </button>
          </div>

          {/* Remove Button - Mobile Only */}
          <button
            className='md:hidden inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-red-500
             hover:text-red-600 transition-colors duration-300 p-2'
            onClick={() => removeFromCart(item._id)}
          >
            <Trash size={16} />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;