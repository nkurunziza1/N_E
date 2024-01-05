import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("News", NewsSchema);
