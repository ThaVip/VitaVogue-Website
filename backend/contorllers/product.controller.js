import Product from '../models/product.model.js'
import cloudinary from '../lib/cloudinary.js'

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        console.log("products accquired successfully")
        res.status(200).json({products})
    } catch (error) {
       console.error("Unable to get products", error) 
       res.status(500).json({
        message: "server Problem",
        error: error.message
       })
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        // //check redis for featured products
        // const featuredProduct = await Redis.get("featured_Products")

        // if(featuredProduct){
        //     return res.status(200).json(featuredProduct)
        // }

        const featured = await Product.find({isFeatured: true}).lean()
        
          if(!featured || featured.length === 0){
            return res.status(404).json({message: "No featured products found"})
        }

        //store in redis
        //await Redis.set("featured_products", JSON.stringify(featured))

        res.status(200).json(featured)

    } catch (error) {
        console.error("Unable to get featured products", error) 
       res.status(500).json({
        message: "server Problem",
        error: error.message
        
    })
}

}

export const createProduct = async (req, res) => {
    try {
        const {name, description, price, image, category} = req.body;

        //create an empty variable 
        let cloudinaryResponse = null

        //get the image and upload to cloudinary
        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: "products"})
        }

        //save the product into the database into the database
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url: "",
            category
        })

        res.status(201).json(product)

    } catch (error) {
        
    }
}

export const deleteProduct = async (req, res) => {
    try {
        //get the product by id
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })   
        }

        //delete the image from cloudinary
        if(product.image){
            const publicId = product.image.split('/').pop().split('.')[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("deleted image from cloudinary")
            } catch (error) {
                console.log("error deleting image from cloudnary", error)
            }
        }

        await Product.findByIdAndDelete(req.params.id)

        res.status(201).json({message: "product deleted succesfully"})
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "server error",
            error: error.message
        })
    }
}

export const getReccomendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
          {  $sample: {size:3}
          },
          {
            $project: {
                _id:1,
                name:1,
                description:1,
                image: 1,
                size:1,
                price:1
            }
          }])

        res.json(products); 
    } catch (error) {
        
    }
}

export const getProductsByCategory = async (req, res) => {
    const {category} = req.params

    try {
        
        const products = await Product.find({category});
        res.json({products})
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({message: "server error", error: error.message})
    }
}

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(product){
            product.isFeatured = !product.isFeatured
            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({message: "product not found"})
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message)
        res.status(500).json({message: "server error", error: error.message})
    }
}