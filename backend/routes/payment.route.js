import express from 'express'
import { protectedRoute } from '../middileware/auth.middleware.js'
import { checkoutSuccess, createCheckOutSession } from '../contorllers/payment.controller.js'


const router = express.Router()

router.post('/create-checkout-session',protectedRoute,createCheckOutSession)
router.post('/checkout-success', protectedRoute, checkoutSuccess)
export default router