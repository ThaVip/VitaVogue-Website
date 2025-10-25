import {stripe} from '../lib/stripe.js'
import Order from '../models/order.model.js'


export const createCheckOutSession = async (req, res) => {
    try {
        //user sends some products
        const {products} = req.body

        if(!Array.isArray(products) || products.length===0){
            return res.status(400).json({error: "Invalid or empty products array"});
        }

        let totalAmount = 0;

        const lineItems = products.map(product => {
            const amount = Math.round(product.price*100 )// in cents for stripe
            totalAmount = amount * product.quantity

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name:product.name,
                        image:product.image
                    },
                    unit_amount: amount
                }
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:3000/purchase-successful",
            cancel_url: "http://localhost:3000/purchase-cancel",
            // discounts: coupon
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode || ""
            }
        });

        res.status(200).json({id: session.id, totalAmount: totalAmount / 100 });

    } catch (error) {
        
    }
}

export const checkoutSuccess =  async (req, res)=> {
    try {
        const {sessionId} = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);


        //create a new order
        const products = JSON.parse(session.metadata.products)
        const newOrder = new Order({
            user: session.metadata.userId,
            products: products.map((product) => ({
                product:product.id,
                quantity: p.quantity,
                price: p.price,
            })),
            totalAmount: session.amount_total/100,
            stripeSessionId: sessionId,
        })

        await newOrder.save()
        res.status(200).json({
            success: true,
            message: "payment successful and order created",
            orderId: newOrder._id,
            
        })
    } catch (error) {
        console.log("Error processing successful checkout", error);
        res.status(500).json({message:"Error processing successful checkout", error:error.message})
    }
}
