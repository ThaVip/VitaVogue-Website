import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6 hover:shadow-md transition-shadow duration-300'>
      <div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
        {/* Product Image */}
        <div className='shrink-0 md:order-1'>
          <img 
            className='h-24 w-24 md:h-32 md:w-32 rounded-lg object-cover' 
            src={item.image} 
            alt={item.name}
          />
        </div>

        {/* Quantity Controls */}
        <div className='flex items-center justify-between md:order-3 md:justify-end'>
          <div className='flex items-center gap-3'>
            <button
              className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full
               bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500
               focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
               transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className='text-black' size={16} />
            </button>
            <p className='text-lg font-semibold text-gray-800 min-w-[2rem] text-center'>
              {item.quantity}
            </p>
            <button
              className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full
               bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500
               focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
               transition-all duration-300'
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className='text-black' size={16} />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className='w-full min-w-0 flex-1 space-y-3 md:order-2 md:max-w-md'>
          <h3 className='text-lg font-bold text-gray-800 hover:text-orange-500 transition-colors duration-300'>
            {item.name}
          </h3>
          <p className='text-sm text-gray-600 line-clamp-2'>{item.description}</p>
          
          {/* Price and Remove Button */}
          <div className='flex items-center justify-between pt-2'>
            <p className='text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>
              ${item.price.toFixed(2)}
            </p>
            <button
              className='inline-flex items-center gap-2 text-sm font-medium text-red-500
               hover:text-red-600 hover:underline transition-colors duration-300'
              onClick={() => removeFromCart(item._id)}
            >
              <Trash size={18} />
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;