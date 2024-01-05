import Portifolio from "../models/Portifolio.js"
import User from "../models/users.js"
import NewsLetter from "../models/NewsLetter.js";

export const createPortifolios = async (req, res) => {
  try {
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can create a Portifolio"})
    }

    const { title, description} = req.body;
    const image= req.file.path

    const portifolio =  await Portifolio.create({title, description, image})
    await portifolio.save();
   res.status(201).json({
      portifolio,
      message: "a Portifolio is created successfully!",
    });
 
  } catch (error) {
    return res.status(500).json({ error: error });
  }
  
};

export const getSinglePortifolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portifolio = await Portifolio.findById({ _id: id });
    if (!portifolio) {
      return res.json({ message: "No Portifolio found!" });
    }
    return res.status(200).json({message: portifolio});
  } catch (error) {
    return res.status(500).json({ message:  error });
  }
};

export const getAllPortifolio = async (req, res) => {
  try {
    const allPortifolio = await Portifolio.find({});
    console.log(allPortifolio)
    return res.status(200).json(allPortifolio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSinglePortifolio = async (req, res) => {
  try {
    const { id } = req.params;
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can update a Portifolio"})
    }
    const portifolioToUpdate = await Portifolio.findById({ _id: id });
    if (!portifolioToUpdate) {
      return res.status(404).json({ message: "Portifolio not found!" });
    }
    let image = portifolioToUpdate.image;
    console.log("file in", req.file)
    if (req.file) {
      image = req.file.path;
    }
    const portifolioUpdate = await Portifolio.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title || portifolioToUpdate.title,
          description: req.body.description || portifolioToUpdate.description,
          image,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ portifolioUpdate, message: "updated successfully!" });
  } catch (error) {
    console.error("Error in updateSinglePortifolio:", error);
    return res.status(500).json({ message: error.message });
  }
};
export const deleteSinglePortifolio = async (req, res) => {
  try {
    const { id } = req.params;
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can delete a Portifolio"})
    }
    const portifolioToDelete = await Portifolio.findByIdAndDelete({ _id: id });
    if (!portifolioToDelete) {
      return res.status(200).json({
        message: "Portifolio has already been deleted",
      });
    }
    return res
      .status(200)
      .json({ message: "Portifolio deleted successfully!"});
  } catch (error) {
    return res.status(500).json({ massage:  error });
  }
};
