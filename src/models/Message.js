import mongoose from "mongoose";

const UserMessage = new mongoose.Schema(
  {
   firstname: String,
   lastname: String,
   email: String,
   description: String,
   telephone: String
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Message", UserMessage);
