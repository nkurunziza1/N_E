import mongoose from "mongoose";


const CompanySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    telephone: String,
    website: String,
    location: String,
    address: String,
    industry: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", CompanySchema)

