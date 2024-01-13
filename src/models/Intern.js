

import mongoose from "mongoose";

const workingPreference = ["remote", "onsite", "hybrid"];
const InternSchema = new mongoose.Schema(
  {
    firstname: String,
    secondname: String,
    email: String,
    telephone: String,
    locl: String,
    teleation: String,
    address: String,
    gender: String,
    cv: String,
    certificate: [],
    industry: [],
    workPreference: {
     type: String,
     enum: workingPreference
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Intern", InternSchema);
