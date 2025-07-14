import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  courseUrl: { type: String },
  imageUrl: { type: String, required: true },
});

export default mongoose.model("Certificate", certificateSchema);
