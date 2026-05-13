import { User } from '../models/user.model.js';

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
        res.status(201).json({
            message: "Registeration Successful!",
            user: {
                _id: user._id,
                email,
                name

            }
        })
    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export {
    registerUser
}