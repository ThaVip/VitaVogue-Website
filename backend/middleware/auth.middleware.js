import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
    try {
        // ✅ Check for token in Authorization header first, then cookie
        let accessToken = req.headers.authorization?.replace('Bearer ', '');
        
        if (!accessToken) {
            accessToken = req.cookies.accessToken;
        }

        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized - No access token provided" });
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(401).json({ message: "Unauthorized - Invalid access token" });
    }
};

export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied - Admin only" });
    }
};