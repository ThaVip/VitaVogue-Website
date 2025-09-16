import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import { authenticate } from './AuthMiddileware.js'
const server = express()
const PORT = 3000

global.users = [
    { username: 'musasheriff', password: 'Sheriff1616' },
    { username: 'venom', password: 'venom1616' }

]

const accounts = [
    { accountType: 'checking', balance: 5000, username: 'musasheriff' },
    { accountType: 'savings', balance: 50000, username: 'musasheriff' },
    { accountType: 'checking', balance: 6000, username: 'venom' }
]



server.use(cors())
server.use(express.json())

server.post('/login', (req, res) => {

    const { username, password } = req.body

    const user = users.find(user => user.username == username && user.password === password)
    if (user) {
        //generate the json web token
        const token = jwt.sign({ username: user.username }, 'SECRETKEY')
        res.json({ success: true, token: token })
    } else {
        //reponse with not authenticated
        res.json({ success: false, message: 'Not authenticated ' })
    }
})

server.get('/accounts/:username', authenticate, (req, res) => {
    const username = req.params.username
    const userdetail = accounts.filter((account) => account.username === username)
    res.json(userdetail)
})


// server.post('/register', (req, res) => {
//     const { username, email, password, confirmPassword } = req.body

//       // Validation
//     if (!username || !email || !password || !confirmPassword) {
//         return res.status(400).json({ 
//             success: false, 
//             message: 'All fields are required' 
//         })
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//         return res.status(400).json({ 
//             success: false, 
//             message: 'Passwords do not match' 
//         })
//     }

//     // Check if username already exists
//     const existingUserByUsername = users.find(user => user.username === username)
//     if (existingUserByUsername) {
//         return res.status(400).json({ 
//             success: false, 
//             message: 'Username already exists' 
//         })
//     }

//     // Check if email already exists
//     const existingUserByEmail = users.find(user => user.email === email)
//     if (existingUserByEmail) {
//         return res.status(400).json({ 
//             success: false, 
//             message: 'Email already exists' 
//         })
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email)) {
//         return res.status(400).json({ 
//             success: false, 
//             message: 'Invalid email format' 
//         })
//     }

//     // Validate password strength
//     if (password.length < 6) {
//         return res.status(400).json({ 
//             success: false, 
//             message: 'Password must be at least 6 characters long' 
//         })
//     }

//     // Create new user
//     const newUser = {
//         id: users.length + 1,
//         username,
//         email,
//         password // In production, hash this password using bcrypt!
//     }

//     // Add user to array
//     users.push(newUser)

//     // Generate JWT token for immediate login
//     const token = jwt.sign(
//         { id: newUser.id, username: newUser.username }, 
//         'SECRETKEY', 
//         { expiresIn: '1h' }
//     )

//     // Return success response (don't include password)
//     const { password: _, ...userWithoutPassword } = newUser
//     res.status(201).json({ 
//         success: true, 
//         message: 'User registered successfully',
//         token,
//         user: userWithoutPassword
//     })
// })


server.listen(3000, () => {
    console.log(`server is running on PORT ${PORT}`)
})