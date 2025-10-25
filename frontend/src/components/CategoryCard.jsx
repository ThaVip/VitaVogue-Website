import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.id}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent  overflow-hidden cursor-pointer group">
        
        {/* Image Container - Increased height */}
        <div className="h-64 md:h-72 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center overflow-hidden">
          {category.imageUrl ? (
            // If there's an actual image URL
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            // Fallback to emoji or icon
            <span className="text-6xl text-yellow-400 group-hover:scale-110 transition-transform duration-300">
              {category.emoji || '🛍️'}
            </span>
          )}
        </div>

        {/* Category Info */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
          <p className="text-gray-600 text-sm">{category.desc}</p>
        </div>
      </div>
    </Link>
  );
}