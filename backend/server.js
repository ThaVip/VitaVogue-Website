import express from 'express'
import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js'
import analyticsRoutes from './routes/analytics.route.js'
import { connectDb } from './lib/db.js'
import dotenv from 'dotenv' 
import cookieParser from 'cookie-parser'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000




app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}))




app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())

app.use("/api/analytics", analyticsRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)







//MongoDB ConnectionToDatabase

async function ConnectionToDatabase() {
    try {
         // Connect to MongoDB using the connection string from .env
        console.log("mongo connecting")
       await connectDb()
        // Only start server if database connection succeeds
        app.listen(PORT, () => {
            console.log(`🚀 Server running on PORT ${PORT}`)
            console.log('🎯 Ready to handle requests!')
        })
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message)
        console.error('🔄 Please check your connection string and try again')
        process.exit(1) // Exit the process if can't connect to database
    }
    
}

ConnectionToDatabase()
