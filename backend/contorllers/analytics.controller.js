import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: "admin" });
        const totalProducts = await Product.countDocuments();
        const featuredProducts = await Product.countDocuments({ isFeatured: true });

        const analyticsData = {
            users: totalUsers,
            admins: totalAdmins,
            products: totalProducts,
            featuredProducts: featuredProducts
        };

        // Generate product growth data for the last 7 days
        const productGrowthData = await getProductGrowthData();

        res.json({
            analyticsData,
            dailySalesData: productGrowthData // Keeping the same key name for chart compatibility
        });
    } catch (error) {
        console.error("Error in getAnalyticsData:", error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Get product creation data for the last 7 days
async function getProductGrowthData() {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const productsByDay = await Product.aggregate([
            {
                $match: {
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Create an array of the last 7 days
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            const dayName = days[date.getDay()];
            
            const dayData = productsByDay.find(item => item._id === dateString);
            
            data.push({
                name: dayName,
                sales: dayData ? dayData.count : 0, // Using 'sales' for chart compatibility
                revenue: dayData ? dayData.count * 10 : 0 // Placeholder
            });
        }
        
        return data;
    } catch (error) {
        console.error("Error in getProductGrowthData:", error);
        // Return empty data if error
        return [
            { name: 'Mon', sales: 0, revenue: 0 },
            { name: 'Tue', sales: 0, revenue: 0 },
            { name: 'Wed', sales: 0, revenue: 0 },
            { name: 'Thu', sales: 0, revenue: 0 },
            { name: 'Fri', sales: 0, revenue: 0 },
            { name: 'Sat', sales: 0, revenue: 0 },
            { name: 'Sun', sales: 0, revenue: 0 }
        ];
    }
}