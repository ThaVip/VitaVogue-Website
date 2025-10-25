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
        <div className="inline-block w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Analytics Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8'>
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
        className='bg-white shadow-2xl rounded-3xl p-4 md:p-6 border-2 border-yellow-400'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h3 className='text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>
          Sales & Revenue Overview
        </h3>
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
            <XAxis 
              dataKey='name' 
              stroke='#6b7280'
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              yAxisId='left' 
              stroke='#f59e0b'
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              yAxisId='right' 
              orientation='right' 
              stroke='#ef4444'
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff',
                border: '2px solid #fbbf24',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='sales'
              stroke='#f59e0b'
              strokeWidth={3}
              activeDot={{ r: 8, fill: '#f59e0b' }}
              name='Sales'
              dot={{ fill: '#f59e0b', r: 4 }}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke='#ef4444'
              strokeWidth={3}
              activeDot={{ r: 8, fill: '#ef4444' }}
              name='Revenue'
              dot={{ fill: '#ef4444', r: 4 }}
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
    className='bg-white rounded-2xl p-6 shadow-lg overflow-hidden relative border-2 border-gray-100 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className='flex justify-between items-start relative z-10'>
      <div>
        <p className='text-gray-600 text-sm mb-2 font-semibold uppercase tracking-wide'>
          {title}
        </p>
        <h3 className='text-gray-800 text-2xl md:text-3xl font-bold'>
          {value}
        </h3>
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
        <Icon className='h-6 w-6 md:h-8 md:w-8 text-white' />
      </div>
    </div>
    
    {/* Background Icon */}
    <div className='absolute -bottom-6 -right-6 opacity-5'>
      <Icon className='h-32 w-32 md:h-40 md:w-40 text-gray-800' />
    </div>
    
    {/* Gradient Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 pointer-events-none`} />
  </motion.div>
);