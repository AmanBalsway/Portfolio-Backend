import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  page: {
    type: String,
    default: "home",
  },
}, { timestamps: true }); 
export default mongoose.model("View", viewSchema);
