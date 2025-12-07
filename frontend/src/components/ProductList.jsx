import { motion } from "framer-motion";
import { Trash, Star, Package, Edit, X, Save } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useState } from "react";
import toast from "react-hot-toast";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products, updateProduct } = useProductStore();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const categories = ["casual", "fabric", "bridal", "accessories"];

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", description: "", price: "", category: "" });
  };

  const handleSaveEdit = async (productId) => {
    try {
      await updateProduct(productId, editForm);
      setEditingId(null);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden max-w-6xl mx-auto border-2 border-yellow-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Card View */}
      <div className="block lg:hidden">
        {products?.map((product) => (
          <div key={product._id} className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
            {editingId === product._id ? (
              // Edit Mode - Mobile
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg text-sm"
                  placeholder="Product name"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg text-sm"
                  rows="2"
                  placeholder="Description"
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg text-sm"
                  placeholder="Price"
                />
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(product._id)}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-bold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode - Mobile
              <div className="flex gap-3">
                <img
                  className="h-20 w-20 rounded-lg object-cover border-2 border-yellow-400 flex-shrink-0"
                  src={product.image}
                  alt={product.name}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-800 mb-1 truncate">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-base font-bold text-yellow-600 mb-2">
                    ₦{product.price.toLocaleString()}
                  </p>
                  <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      product.isFeatured
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                    }`}
                  >
                    <Star className={`h-4 w-4 ${product.isFeatured ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-yellow-400 to-orange-400">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                Description
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
                {editingId === product._id ? (
                  // Edit Mode - Desktop
                  <>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          className="h-12 w-12 rounded-lg object-cover border-2 border-yellow-400"
                          src={product.image}
                          alt={product.name}
                        />
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="px-2 py-1 border-2 border-yellow-400 rounded text-sm w-full"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="px-2 py-1 border-2 border-yellow-400 rounded text-sm w-full"
                        rows="2"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="px-2 py-1 border-2 border-yellow-400 rounded text-sm w-24"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="px-2 py-1 border-2 border-yellow-400 rounded text-sm"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFeaturedProduct(product._id)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          product.isFeatured
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                        }`}
                      >
                        <Star className={`h-5 w-5 ${product.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(product._id)}
                          className="text-green-600 hover:text-green-800 transition-colors"
                          title="Save changes"
                        >
                          <Save className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-800 transition-colors"
                          title="Cancel editing"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  // View Mode - Desktop
                  <>
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
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs line-clamp-2">
                        {product.description}
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
                        onClick={() => toggleFeaturedProduct(product._id)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          product.isFeatured
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                        }`}
                        title={product.isFeatured ? "Remove from featured" : "Add to featured"}
                      >
                        <Star className={`h-5 w-5 ${product.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit product"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete product"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products?.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-base sm:text-lg">No products yet. Create your first product!</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProductsList;