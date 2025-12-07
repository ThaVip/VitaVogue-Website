import express from 'express'
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js'
import { getAnalyticsData } from '../contorllers/analytics.controller.js'

const router = express.Router()

router.get('/', protectedRoute, adminRoute, getAnalyticsData)

export default router