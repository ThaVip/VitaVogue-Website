import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization
        
        if (!authHeader) {
            return res.status(401).json({ 
                success: false, 
                message: 'No authorization header provided' 
            })
        }

        // Extract token from "Bearer TOKEN" format
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.slice(7) 
            : authHeader

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided' 
            })
        }

        // Verify the token
        const decoded = jwt.verify(token, 'SECRETKEY')
        
        // Add user info to request object
        req.user = decoded
        
        // Continue to next middleware/route handler
        next()
        
    } catch (error) {
        console.error('Authentication error:', error)
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            })
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Token expired' 
            })
        }
        
        return res.status(500).json({ 
            success: false, 
            message: 'Authentication failed' 
        })
    }
}