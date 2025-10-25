import Product from "../models/product.model.js";


export const addToCart = async (req, res) => {
    try {
      
        //get the product id
      const {productId} = req.body
      const user = req.user
      //check if the items exists
      const existingItem = user.cartItems.find(item => item._id === productId)
     
      //if item exists update the quantity
      if(existingItem){
        existingItem.quantity += 1;
      }else{
         user.cartItems.push({ product: productId});
      }

      await user.save()
      res.json(user.cartItems)
    } catch (error) {
        console.log("Error in addCart controller", error.message);
        res.status(500).json({message: "server error", error: error.message})
    }
}

export const removeAllFromCart = async (req, res) => {
try {
      
        //get the product id
      const {productId} = req.body
      const user = req.user
   
     
      //if item exists update the quantity
      if(productId){
        user.cartItems = [];
      }else{
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);      }

      await user.save()
      res.json(user.cartItems)
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message})
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({_id: {$in:req.user.cartItems}})

        //add quantity for each product
        const CartItems = products.map(product => {
            const item = req.user.cartItems.find(cartItem => CartItems.id === product.id);
            return {...product.toJSON(), quantity:item.quantity}
        })

        res.json(CartItems)
    } catch (error) {
        console.log("Error in getCartProducts controller", error.message)
        res.status(500).json({message: "server Error", error: error.message0})
    }
}

export const updateQuantity = async (req, res) => {
       try {
        const {id:productId} = req.params;
        const {quantity} = req.body;
        const user = req.user;
        const existingItem = user.cartItems.filter((item) => item.id !== productId)
        
        if(existingItem){
            if(quantity === 0){
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
                await user.save()
                res.json(user.cartItems)
            }

            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems)
        }else {
            res.status(404).json({message: "Product not found"})
        }
       } catch (error) {
            console.log("Error in updateQuantity controller", error.message);
            res.status(500).json({message: "server error", error: error.message})
        
       }
}