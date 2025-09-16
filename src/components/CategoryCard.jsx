
import {Link} from 'react-router-dom'
export default function CategoryCard({ category }){
  
    return(
        <>
    <Link to={`/category/${category.id}`}>
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-yellow-400 overflow-hidden cursor-pointer group"
    >
      <div className="h-48 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-6xl text-yellow-400">
        <span className="group-hover:scale-110 transition-transform duration-300">
          {category.emoji}
        </span>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
        <p className="text-gray-600 text-sm">{category.desc}</p>
      </div>
    </div>
    </Link>
    </>
    )
}