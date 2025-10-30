import express from 'express'
import { logout, login, signup, getUserProfile } from '../contorllers/auth.controller.js'
import { protectedRoute } from '../middileware/auth.middleware.js';
const router = express.Router()

router.post('/signup', signup )

router.post('/logout', logout)

router.post('/login', login)

router.get('/profile', protectedRoute, getUserProfile)

export default router