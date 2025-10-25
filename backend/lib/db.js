import mongoose from "mongoose";

export const connectDb = async () => {

    try {
        console.log("mongo function activated")
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongo Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error in connection", error.message)

    }    
}