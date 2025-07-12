import Project from '../models/Project.js';
import { uploadToCloudinary } from "../utils/cloudinary.js";


// export const uploadProject = async (req, res) => {
// console.log("✅ File received:", req.file); // <== Add this here
//   console.log("📦 Body Data:", req.body); 

//   try {
//     console.log("✅ File received:", req.file);
//     console.log("📦 Body Data:", req.body);

//     const { title, description, technologies, githubLink, liveLink } = req.body;
//     const techArray = JSON.parse(technologies); // Convert JSON string to array

//     // Upload image to Cloudinary
//     const result = await uploadToCloudinary(req.file.path, "Portfolio/Images");

//     // Save to DB
//     const newProject = await Project.create({
//       title,
//       description,
//       technologies: techArray,
//       githubLink,
//       liveLink,
//       image: result.secure_url,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Project uploaded successfully!",
//       project: newProject,
//     });
//   } catch (err) {
//     console.error("❌ Project Upload Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
export const uploadProject = async (req, res) => {
  console.log("✅ File received:", req.file); // Confirm the Cloudinary file
  console.log("📦 Body Data:", req.body);

  try {
    const { title, description, technologies, githubLink, liveLink } = req.body;
    const techArray = JSON.parse(technologies); // Convert JSON string to array

    const newProject = await Project.create({
      title,
      description,
      technologies: techArray,
      githubLink,
      liveLink,
      image: req.file.path, // ✅ Use Cloudinary URL directly
    });

    res.status(201).json({
      success: true,
      message: "Project uploaded successfully!",
      project: newProject,
    });
  } catch (err) {
    console.error("❌ Project Upload Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ New function to fetch all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};


