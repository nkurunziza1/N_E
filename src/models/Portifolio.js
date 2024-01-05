import mongoose from "mongoose";

const PortifolioSchema = new mongoose.Schema(
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
export default mongoose.model("Portifolio", PortifolioSchema);
