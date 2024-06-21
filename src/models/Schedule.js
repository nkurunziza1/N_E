import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    householder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: String,
    date: String,
    loadType: String,
    telephone: String,
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "assigned"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Schedule", ScheduleSchema);
