import { User } from '../models/user.model.js';
import Job from "../models/job.model.js";
import generateToken from "../utils/generateToken.js";
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

        const token = generateToken(user._id);
        return res.status(201).json({
            success: true,
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
        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
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

export const updateCurrentUser = async (req, res) => {
 try {
   const { name, email, profilePicture, bio } = req.body;

   const user = await User.findById(req.user.id);

   if (!user) {
    return res.status(404).json({
        message: "User not found"
    })
   }

   if (email && email.toLowerCase() !== user.email) {
    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
        return res.status(400).json({
            message: "Email already in use"
        })
    }
   }

   user.name = name || user.name;
   user.email = email ? email.toLowerCase() : user.email;
   user.profilePicture = profilePicture ?? user.profilePicture;
   user.bio = bio ?? user.bio;

   const updatedUser = await user.save();
   const safeUser = updatedUser.toObject();
   delete safeUser.password;

   return res.status(200).json({
    message: "Profile updated successfully",
    user: safeUser,
   });
 } catch (error) {
    console.log('Error updating user:', error);
    res.status(500).json({
        message: "Internal Server Error",
    });
 }
}
const deleteCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const deletedJobs = await Job.deleteMany({
            user: req.user.id
        });

        await User.findByIdAndDelete(req.user.id);

        return res.status(200).json({
            message: "User deleted successfully",
            deletedJobs: deletedJobs.deletedCount
        })
    } catch (error) { 
        console.log('Error deleting user:', error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
 }



export {
    registerUser,
    loginUser,
    deleteCurrentUser
}
