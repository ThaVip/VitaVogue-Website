import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block w-12 h-12 sm:w-16 sm:h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8'>
      {/* Analytics Cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8'>
        <AnalyticsCard
          title='Total Users'
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color='from-yellow-400 to-orange-400'
        />
        <AnalyticsCard
          title='Total Products'
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color='from-yellow-400 to-orange-500'
        />
        <AnalyticsCard
          title='Total Sales'
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color='from-orange-400 to-red-400'
        />
        <AnalyticsCard
          title='Total Revenue'
          value={`₦${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color='from-yellow-500 to-orange-500'
        />
      </div>

      {/* Sales Chart */}
      <motion.div
        className='bg-white shadow-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 border-2 border-yellow-400'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h3 
          className='text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Sales & Revenue Overview
        </h3>
        <ResponsiveContainer width='100%' height={300} className="sm:h-[400px]">
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
            <XAxis 
              dataKey='name' 
              stroke='#6b7280'
              style={{ fontSize: '10px' }}
              className="sm:text-xs"
            />
            <YAxis 
              yAxisId='left' 
              stroke='#f59e0b'
              style={{ fontSize: '10px' }}
              className="sm:text-xs"
            />
            <YAxis 
              yAxisId='right' 
              orientation='right' 
              stroke='#ef4444'
              style={{ fontSize: '10px' }}
              className="sm:text-xs"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff',
                border: '2px solid #fbbf24',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
              className="sm:text-sm"
            />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='sales'
              stroke='#f59e0b'
              strokeWidth={2}
              className="sm:strokeWidth-3"
              activeDot={{ r: 6, fill: '#f59e0b' }}
              name='Sales'
              dot={{ fill: '#f59e0b', r: 3 }}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke='#ef4444'
              strokeWidth={2}
              className="sm:strokeWidth-3"
              activeDot={{ r: 6, fill: '#ef4444' }}
              name='Revenue (₦)'
              dot={{ fill: '#ef4444', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className='bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg overflow-hidden relative border-2 border-gray-100 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className='flex justify-between items-start relative z-10'>
      <div className="flex-1 min-w-0">
        <p className='text-gray-600 text-[10px] sm:text-xs mb-1 sm:mb-2 font-semibold uppercase tracking-wide truncate'>
          {title}
        </p>
        <h3 className='text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate'>
          {value}
        </h3>
      </div>
      <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${color} flex-shrink-0`}>
        <Icon className='h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white' />
      </div>
    </div>
    
    {/* Background Icon */}
    <div className='absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 opacity-5'>
      <Icon className='h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 text-gray-800' />
    </div>
    
    {/* Gradient Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 pointer-events-none`} />
  </motion.div>
);