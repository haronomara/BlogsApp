import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user-routes'
import blogRouter from './routes/blog-routes'
dotenv.config()
const app = express()

app.use(express.json())
app.use("/user",userRouter)
app.use("/blog",blogRouter)


mongoose.connect(`mongodb+srv://haronomara1:${process.env.MONGODB_PASSWORD}@cluster0.rejtpnw.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>app.listen(5000,()=>{
    console.log(`Database Connected and port Running on ${5000}`);
}))
.catch(err=>console.log(err))