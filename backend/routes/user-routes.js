import express from 'express'
import { getUsers, login, signup } from '../controllers/user-controller'

const userRouter = express.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.get('/',getUsers)

export default userRouter;