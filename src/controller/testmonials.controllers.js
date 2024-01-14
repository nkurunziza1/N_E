
import Testmonials from "../models/Testmonials.js";
import User from "../models/users.js" 

export const createTestmonials = async (req, res) => {
    try {
      const userId=req.user.id;
      const user=await User.findById(userId)
      if(user.role!=="superAdmin"){
        return res.status(401).json({message:"only superAdmin can create a Testmonial"})
      }
  
      const { title, description} = req.body;
      const image= req.file.path
  
      const testmonial =  await Testmonials.create({title, description, image})
      await testmonial.save();
     res.status(201).json({
        testmonial,
        message: "a Testmonial is created successfully!",
      });
   
    } catch (error) {
      return res.status(500).json({ error: error });
    }
    
  };

  export const deleteSingleTesmonial = async (req, res) => {
    try {
      const { id } = req.params;
      const userId=req.user.id;
      const user=await User.findById(userId)
      if(user.role!=="superAdmin"){
        return res.status(401).json({message:"only superAdmin can delete a blog"})
      }
      const testmonialToDelete = await Testmonials.findByIdAndDelete({ _id: id });
      if (!testmonialToDelete) {
        return res.status(200).json({
          message: "Testmonial  has already been deleted",
        });
      }
      return res
        .status(200)
        .json({ message: "Testmonial deleted successfully!"});
    } catch (error) {
      return res.status(500).json({ massage:  error });
    }
  };

  export const getAllTestmonial = async (req, res) => {
    try {
      const allTestmonial = await Testmonials.find({});
      return res.status(200).json(allTestmonial);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  