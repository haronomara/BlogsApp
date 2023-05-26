import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

export const addBlog = async (reg,res,next)=>{
    const{title,description,image,user} = reg.body

    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(500).json({message:"Unable to find the user with this id"})
    }
    let blog;
    
    try {
        blog = new Blog({
            title,
            description,
            image,
            user
        })
      const session = await mongoose.startSession()
      session.startTransaction()
      await blog.save({session})
      existingUser.blogs.push(blog)
      await existingUser.save({session})
       await session.commitTransaction()
    } catch (err) {
       return console.log(err); 
       return res.status(500).json({message:err})
    }
    if (!blog) {
        return res.status(500).json({message:"Unexpected Error"})
    }
    return res.status(201).json({blog})
}
export const getAllBlogs = async (reg,res,next)=>{
    let blogs;
    try {
       blogs = await Blog.find() 
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(500).json({message:"Unexpected Error"})
    }
    return res.status(201).json({blogs})
}

export const updateBlog = async (reg,res,next)=>{
    const{title,description,image,user} = reg.body
    const id = reg.params.id;
    let blog;
    try {
       blog = await Blog.findByIdAndUpdate(id,{
        title,
        description,
        image,
        user
       }) 
       blog = await blog.save()
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({message:"Unexpected Error"})
    }
    return res.status(201).json({message:"Blog has been updated Secussfully"})
}
export const deleteBlog = async(reg,res,next)=>{
    const id = reg.params.id;
    let blog;
    try {
       blog = await Blog.findByIdAndRemove(id).populate("user")
       await blog.user.blogs.pull(blog) 
       await blog.user.save()
       await blog.user.save()
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({message:"Unexpected Error"})
    }
    return res.status(201).json({message:"Blog Deleted Sucessfully"})

}
export const getByUserId = async (reg,res,next)=>{
    const userId = reg.params.id;
    let userBlog;
    try {
        userBlog = await User.findById(userId).populate('blogs')
        
    } catch (err) {
        return console.log(err);
    }
    if (!userBlog) {
        return res.status(500).json({message:"Blog not Found"})
    }
    return res.status(201).json({blogs:userBlog})
}