import { User } from '../models/user.model.js';
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if user exist 

        const existing = await User.findOne({
            email: email.toLowerCase()
        })

        if (existing) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        // Create User

        const user = await User.create({
            name,
            email,
            password
        })

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        return res.status(201).json({
            message: "Registeration Successful!",
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exist
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                message: "Sorry User not found"
            });
        }

        // compare password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful..",
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
        });


    } catch (error) {
        console.log('Error logging in user:', error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const getCurrentUser = async (req, res) => {
 try {
   const user = await User.findById(req.user.id).select("-password");
   if (!user) {
    return res.status(404).json({
        message: "User not found"   
    })
   }
   return res.status(200).json({ user });
 } catch (error) {
    console.log('Error fetching user:', error);
    res.status(500).json({
        message: "Internal Server Error",
    });
 }
}
export {
    registerUser,
    loginUser
}