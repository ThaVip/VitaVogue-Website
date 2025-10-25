import User from "../models/user.model.js"
import jwt from "jsonwebtoken"


const generateToken = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN,{
        expiresIn: '15m'
    })

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN, {
        expiresIn: '7d'
    }) 

    return {accessToken, refreshToken}
}

// const storeRefreshToken = async (userid, refreshtoken) => {
//       await Redis.set(`refresh_token:${userid}`, refreshtoken, "EX","7*24*60*60")
// }

  const setCookies = (res, accesstoken, refreshtoken) => {
        res.cookie("accessToken", accesstoken, {
            httpOnly: true,// Protection from XXR
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",// protrection from CSRF
            
        })
         res.cookie("refreshToken", refreshtoken, {
            httpOnly: true,// Protection from XXR
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",// protrection from CSRF
            maxAge: 7*24*60*60*1000,// 7days
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

     //Authorize user by creating an authenticaation token
    const {accessToken, refreshToken} = generateToken(user._id)
    // await storeRefreshToken(user._id,refreshToken)


    setCookies(res,accessToken,refreshToken)
    
    res.status(201).json({
        success: true,
        user:{
            userId:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            role:user.role
        },
        message: "user was created successfully"})

     
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }
    
   
}

export const logout = async (req, res) => {
    try {
     const refreshToken = req.cookies.refreshToken;
     if(refreshToken){
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN);
     }  
     
      res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
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

            setCookies(res,accessToken,refreshToken)

            res.json({
                userId: user._id,
                name:user.name,
                email:user.email,
                role:user.role
            })
        }else{
            res.status(401).json({message:"Invalid email or password"})
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
        //getthe refresh token from cookie
       const refreshToken = req.cookies.refreshToken;
       
       //Check if the token exists
       if(!refreshToken){
            return res.status(401).json({message: "No refresh token provided"});
       }

       //Decode/verify refresh token
       const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
      
       //get your stored user refresh token through redis with decoded userId
       const storedRefreshToken = await redis.get(`refresh_token:${decoded.userId}`)

       //compare tokens
       if(storedRefreshToken !== refreshToken){
        return res.status(401).json({message: "invalid refresh token"})
       }


       //Generate a new access token
       const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN)

       //set access token cookie
       res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15*60*1000, 
       })

       res.status(201).json({message: "Token Refreshed Successfully"})
     } catch (error) {
        console.log("Error in refreshToken controller", error.message)
        res.status(500).json({message: "server error", error: error.message})
     }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await req.body
        res.json(user)
    } catch (error) {
        console.log("user not found", error.message)
        res.status(500).json({message:"server error", error: error.message})
    }
}