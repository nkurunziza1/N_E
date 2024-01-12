import newsLetter from "../models/NewsLetter.js";
import User from "../models/users.js"

export const subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const isSubscribed = await newsLetter.findOne({ email });
    if (isSubscribed) {
      return res.status(400).json(" You have already subscribe")
    }
    
    const subscribe = await newsLetter.create({
      email,
    });
    await subscribe.save();
    res
      .status(200)
      .json({
        message:
          "Thank you for your subscription. you'll always be alerted to the new activity",
      });

  } catch (error) {
    throw new Error(error);
  }
};

export const getSubscribedUser = async(req, res) =>{
  try{
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can create a Blog"})
    } 
    const subscribedUser = await newsLetter.find({})

    return res.status(200).json(subscribedUser)
  }catch(error){
    console.log(error)
    return res.status(500).json({error:error})
  }
}
