import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        
        // ✅ Fixed: Check if item exists using product field, not _id
        const existingItem = user.cartItems.find(
            item => item.product.toString() === productId
        );
        
        if (existingItem) {
            // If item exists, increase quantity
            existingItem.quantity += 1;
        } else {
            // If item doesn't exist, add new item with quantity
            user.cartItems.push({ 
                product: productId,
                quantity: 1 // ✅ Added quantity
            });
        }
        
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        
        // ✅ Fixed logic: if NO productId, clear all; if productId exists, remove that item
        if (!productId) {
            // Remove all items
            user.cartItems = [];
        } else {
            // Remove specific item
            user.cartItems = user.cartItems.filter(
                item => item.product.toString() !== productId
            );
        }
        
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in removeAllFromCart controller", error.message);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

export const getCartProducts = async (req, res) => {
    try {
        // ✅ Extract product IDs from cart items
        const productIds = req.user.cartItems.map(item => item.product);
        
        // Find all products in the cart
        const products = await Product.find({ _id: { $in: productIds } });
        
        // ✅ Add quantity for each product
        const cartItems = products.map(product => {
            const item = req.user.cartItems.find(
                cartItem => cartItem.product.toString() === product._id.toString()
            );
            
            return {
                ...product.toJSON(),
                quantity: item?.quantity || 1
            };
        });
        
        res.json(cartItems);
    } catch (error) {
        console.log("Error in getCartProducts controller", error.message);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message // ✅ Fixed typo: was error.message0
        });
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        
        // ✅ Fixed: Use .find() not .filter(), and compare with product field
        const existingItem = user.cartItems.find(
            item => item.product.toString() === productId
        );
        
        if (existingItem) {
            if (quantity === 0) {
                // Remove item if quantity is 0
                user.cartItems = user.cartItems.filter(
                    item => item.product.toString() !== productId
                );
                await user.save();
                return res.json(user.cartItems); // ✅ Added return
            }
            
            // Update quantity
            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else {
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}