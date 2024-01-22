import mongoose from "mongoose";

const UserMessage = new mongoose.Schema(
  {
    name: String,
    email: String,
    description: String,
    telephone: String,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Message", UserMessage);
