import mongoose from "mongoose";

const TestMonialSchema = new mongoose.Schema(
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
export default mongoose.model("TestMonial", TestMonialSchema);
