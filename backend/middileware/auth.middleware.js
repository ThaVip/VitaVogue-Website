import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const protectedRoute = async (req, res, next) => {
    try {
        //Get access token from cookie
        const accessToken =  req.cookies.accessToken;

        //return error if token doesnt exist
        if (!accessToken){
            return res.status(401).json({message: 'Unauthorized - no token provided'})
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN) 
        const user = await User.findById(decoded.userId).select("-password") 

        if(!user){
            return res.status(401).json({message: "User not found"})
        }

        console.log("protected route bridgred", user)

        req.user = user;

        next()
 
            
        } catch (error) {
            if(error.name === 'TokenExpiredError'){
                console.error("user not found")
                return res.status(401).json({message: "User not found"})
            } else {
                throw error;
                
            }
        }
    } catch (error) {
        console.error("Error in protected Route middleware", error.message)
        return res.status(401).json({message: "Unauthorized - Invalid access token"})
    }
}

export const adminRoute = async (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        console.log("Admin route bridged", req.user.role)
        next()
    }else {
        console.error("Access denied - Admin only")
        res.status(403).json({message: "Access denied - Admin only"})
    }
}