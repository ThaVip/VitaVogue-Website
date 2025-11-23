import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`}>
      <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border-2 border-transparent overflow-hidden cursor-pointer group rounded-lg sm:rounded-xl">
        
        {/* Image Container - Reduced height on mobile */}
        <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center overflow-hidden">
          {category.imageUrl ? (
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-4xl sm:text-5xl md:text-6xl text-yellow-400 group-hover:scale-110 transition-transform duration-300">
              {category.emoji || '🛍️'}
            </span>
          )}
        </div>

        {/* Category Info - Adjusted padding for mobile */}
        <div className="p-3 sm:p-4 md:p-6 text-center">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {category.name}
          </h3>
          <p className="text-black-600 text-xs sm:text-sm line-clamp-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {category.desc}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;