import { Router } from 'express'
import { loginUser, registerUser, getCurrentUser, updateCurrentUser } from '../controllers/user.controller.js'
import protectRoute from '../middleware/auth.middleware.js'
const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/me').get(protectRoute, getCurrentUser).put(protectRoute, updateCurrentUser)

export default userRouter
