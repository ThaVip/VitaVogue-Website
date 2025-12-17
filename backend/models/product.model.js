import mongoose from 'mongoose'

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Product name is required"],
    },
    description: {
        type:String,
       required: true
    },
    price: {
        type: Number,
        required: [true, "Product price should be included"]
    },
    image: {
        type: String,
        required: [true, "image is required"]
    },
    category: {
        type: String,
        required: [true, "category should be required"]
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

const  Product = mongoose.model("Product", productSchema)
export default Product