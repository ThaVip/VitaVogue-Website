import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

const generateToken = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN, {
        expiresIn: '15m'
    })

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN, {
        expiresIn: '7d'
    }) 

    return {accessToken, refreshToken}
}

// ✅ Fixed setCookies for cross-origin production
const setCookies = (res, accesstoken, refreshtoken) => {
    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookie("accessToken", accesstoken, {
        httpOnly: true,
        secure: isProduction, // true in production
        sameSite: isProduction ? "none" : "strict", // ✅ Changed to "none" for production
        maxAge: 15 * 60 * 1000, // 15 minutes
    })
    
    res.cookie("refreshToken", refreshtoken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict", // ✅ Changed to "none" for production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
}

export const signup = async (req, res) => {
    const {email, password, phone, name} = req.body
    try {
        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }

        const user = await User.create({name, email, phone, password})

        const {accessToken, refreshToken} = generateToken(user._id)

        setCookies(res, accessToken, refreshToken)
        
        res.status(201).json({
            success: true,
            user:{
                userId: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            },
            message: "user was created successfully"
        })
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}

export const logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";
        
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict" // ✅ Fixed
        });
        
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict" // ✅ Fixed
        });

        res.json({message: "Logout successful"});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(user && (await user.comparePasswords(password))){
            const {accessToken, refreshToken} = generateToken(user._id);

            setCookies(res, accessToken, refreshToken)

            res.json({
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        } else {
            res.status(401).json({message: "Invalid email or password"})
        }
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({
            message: error.message
        })
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if(!refreshToken){
            return res.status(401).json({message: "No refresh token provided"});
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)

        // Note: Redis code commented out - implement if needed
        // const storedRefreshToken = await redis.get(`refresh_token:${decoded.userId}`)
        // if(storedRefreshToken !== refreshToken){
        //     return res.status(401).json({message: "invalid refresh token"})
        // }

        const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN, {
            expiresIn: '15m'
        })

        const isProduction = process.env.NODE_ENV === "production";
        
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict", // ✅ Fixed
            maxAge: 15 * 60 * 1000, 
        })

        res.status(200).json({message: "Token Refreshed Successfully"})
    } catch (error) {
        console.log("Error in refreshToken controller", error.message)
        res.status(500).json({message: "server error", error: error.message})
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = req.user; // ✅ Fixed: was req.body, should be req.user from middleware
        res.json(user)
    } catch (error) {
        console.log("user not found", error.message)
        res.status(500).json({message: "server error", error: error.message})
    }
}