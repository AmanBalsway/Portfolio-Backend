// 📁 server/models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  technologies: [String],
  githubLink: String,
  liveLink: String,
  image: String,
}, { timestamps: true });


export default mongoose.model("Project", projectSchema);

