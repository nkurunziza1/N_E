import mongoose from "mongoose";

const enumValue = ["female"," male", "other"]
const workingPreference = ["remote", "onsite", "hybrid"]
const CareersSchema = new mongoose.Schema(
  {
    firstname: String,
    secondname: String,
    email: String,
    telephone: String,
    location: String,
    address: String,
    gender: String,
    nationalId: String,
    cv:String,
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
export default mongoose.model("Careers", CareersSchema);
