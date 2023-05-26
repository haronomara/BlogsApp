import express from 'express'
import { addBlog, deleteBlog, getAllBlogs,getByUserId, updateBlog } from '../controllers/blog-controller'

const blogRouter = express.Router()

blogRouter.post('/',addBlog)
blogRouter.get('/',getAllBlogs)
blogRouter.put('/:id',updateBlog)
blogRouter.delete('/:id',deleteBlog)
blogRouter.get('/:id',getByUserId)

export default blogRouter;