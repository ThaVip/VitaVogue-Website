import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnalyticsTab from "../components/AnatyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductList";
import { useProductStore } from "../store/useProductStore";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-black to-gray-900 text-white py-4 sm:py-6 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Vitavogue Admin Dashboard
          </motion.h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-center mb-6 sm:mb-8 gap-2 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-sm sm:text-base ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200"
              }`}
            >
              <tab.icon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">{tab.label}</span>
              <span className="xs:hidden">
                {tab.id === "create" ? "Create" : tab.id === "products" ? "Products" : "Stats"}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;