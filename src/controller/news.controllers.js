import News from "../models/News.js"
import User from "../models/users.js"
import { sendBlogEmail } from "../services/nodeMailer.service.js";
import NewsLetter from "../models/NewsLetter.js";
import { htmlTemplate } from "../utils/blog.js";

export const createNews = async (req, res) => {
  try {
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can create a News"})
    }

    const { title, description} = req.body;
    const image= req.file.path

    const userSubscribedEmails = await NewsLetter.find({}, 'email');

    const userEmails = userSubscribedEmails.map(user => user.email);
    if(!userEmails){
      return ;
    }
    const news =  await News.create({title, description, image})
    await news.save();
  
    const blogEmail = htmlTemplate(news.title, news.description, news.image);
   res.status(201).json({
      news,
      message: "a News is created successfully!",
    });
    await sendBlogEmail(blogEmail, userEmails, "Good news from stylos consults", );
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};



export const getSingleNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news= await News.findById({ _id: id });
    if (!news) {
      return res.json({ message: "No News found!" });
    }
    return res.status(200).json({message: news});
  } catch (error) {
    return res.status(500).json({ message:  error });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const allNews = await News.find({});
    return res.status(200).json(allNews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSingleNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can update a News"})
    }
    const newsToUpdate = await News.findById({ _id: id });
    if (!newsToUpdate) {
      return res.status(404).json({ message: "News not found!" });
    }
    let image = newsToUpdate.image;
    if (req.file) {
      image = req.file.path;
    }
    const newsUpdate = await News.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title || newsToUpdate.title,
          description: req.body.description || newsToUpdate.description,
          image,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ newsUpdate, message: "updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteSingleNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can delete a News"})
    }
    const newsToDelete = await News.findByIdAndDelete({ _id: id });
    if (!newsToDelete) {
      return res.status(200).json({
        message: "News has already been deleted",
      });
    }
    return res
      .status(200)
      .json({ message: "news deleted successfully!"});
  } catch (error) {
    return res.status(500).json({ massage:  error });
  }
};
