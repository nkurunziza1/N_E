import Blog from "../models/Blogs.js"
import User from "../models/users.js"
import NewsLetter from "../models/NewsLetter.js";
import { htmlTemplate } from "../utils/blog.js";
import { sendBlogEmail } from "../services/nodeMailer.service.js";

export const createBlogs = async (req, res) => {
  try {
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can create a Blog"})
    }
    const userSubscribedEmails = await NewsLetter.find({}, 'email');
    const userEmails = userSubscribedEmails.map(user => user.email);

    const { title, description} = req.body;
    const image= req.file.path

    const blog =  await Blog.create({title, description, image})
    await blog.save();
 const blogEmail = htmlTemplate(blog.title, blog.description, blog.image);
   res.status(201).json({
      blog,
      message: "a Blog is created successfully!",
    });

     if(userEmails.length > 0){
      return await sendBlogEmail(blogEmail, userEmails, blog.title);
     }
    
 
  } catch (error) {
    return res.status(500).json({ error: error });
  }
  
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById({ _id: id });
    if (!blog) {
      return res.json({ message: "No Blog found!" });
    }
    return res.status(200).json({message: blog});
  } catch (error) {
    return res.status(500).json({ message:  error });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const allBlog = await Blog.find({});
    console.log(allBlog)
    return res.status(200).json(allBlog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can update a Blog"})
    }
    const blogToUpdate = await Blog.findById({ _id: id });
    if (!blogToUpdate) {
      return res.status(404).json({ message: "blog not found!" });
    }
    let image = blogToUpdate.image;
    console.log("file in", req.file)
    if (req.file) {
      image = req.file.path;
    }
    const blogUpdate = await Blog.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title || blogToUpdate.title,
          description: req.body.description || blogToUpdate.description,
          image,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ blogUpdate, message: "updated successfully!" });
  } catch (error) {
    console.error("Error in updateSingleBlog:", error);
    return res.status(500).json({ message: error.message });
  }
};
export const deleteSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can delete a blog"})
    }
    const blogToDelete = await Blog.findByIdAndDelete({ _id: id });
    if (!blogToDelete) {
      return res.status(200).json({
        message: "Blog has already been deleted",
      });
    }
    return res
      .status(200)
      .json({ message: "blog deleted successfully!"});
  } catch (error) {
    return res.status(500).json({ massage:  error });
  }
};
