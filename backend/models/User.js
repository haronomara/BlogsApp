import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
        required:true
    }]
})

export default mongoose.model("User",userSchema)