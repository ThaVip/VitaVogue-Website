import { motion } from "framer-motion";
import { Trash, Star, Package } from "lucide-react";
import { useProductStore } from "../store/useProductStore";


const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

    console.log("products", products);

  return (
    <motion.div
      className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-6xl mx-auto border-2 border-yellow-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-yellow-400 to-orange-400">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-lg object-cover border-2 border-yellow-400"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-800">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-yellow-600">
                    ₦{product.price.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>toggleFeaturedProduct(product._id)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      product.isFeatured
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                    }`}
                  >
                    <Star className={`h-5 w-5 ${product.isFeatured ? 'fill-current' : ''}`} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products?.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No products yet. Create your first product!</p>
        </div>
      )}
    </motion.div>
  );
};


export default ProductsList;