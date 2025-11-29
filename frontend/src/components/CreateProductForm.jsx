import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import toast from "react-hot-toast";

const categories = ["casual", "fabric", "bridal", "accessories"];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
      toast.success("Product created successfully!");
    } catch (error) {
      toast.error("Error creating product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 max-w-2xl mx-auto border-2 border-yellow-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm sm:text-base"
            placeholder="e.g., Elegant Ankara Dress"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            rows="4"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm sm:text-base"
            placeholder="Describe your product..."
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price (₦)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              step="0.01"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm sm:text-base"
              placeholder="15000"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm sm:text-base"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-bold hover:scale-105 transition-transform duration-300 flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
            >
              <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Upload Image</span>
            </label>
            {newProduct.image && (
              <span className="text-xs sm:text-sm text-green-600 font-medium">✓ Image uploaded</span>
            )}
          </div>
          {newProduct.image && (
            <div className="mt-4">
              <img
                src={newProduct.image}
                alt="Preview"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border-2 border-yellow-400"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-3 sm:py-4 rounded-lg font-bold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 text-sm sm:text-base"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              <span>Creating...</span>
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Create Product</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;