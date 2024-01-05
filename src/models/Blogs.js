import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema(
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
export default mongoose.model("Blog", BlogsSchema);
