import express from 'express'
import { protectedRoute, adminRoute } from '../middleware/auth.middleware.js'
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getReccomendedProducts, getProductsByCategory, toggleFeaturedProduct} from '../contorllers/product.controller.js'

const router = express.Router()

router.get('/', protectedRoute, getAllProducts)
router.get('/featured', getFeaturedProducts)
router.get('/category/:category', getProductsByCategory)
router.get('/recommendations', getReccomendedProducts)
router.post('/',protectedRoute, adminRoute, createProduct)
router.patch('/:id', protectedRoute, adminRoute, toggleFeaturedProduct)
router.delete('/:id', protectedRoute, adminRoute, deleteProduct)

export default router