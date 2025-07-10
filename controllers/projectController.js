import Project from '../models/Project.js';

export const uploadProject = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file); // ✅ Check if file is available

    const { title, description, technologies, githubLink, liveLink } = req.body;

    let techArray;
    try {
      techArray = JSON.parse(technologies);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid technologies format' });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    const newProject = new Project({
      title,
      description,
      technologies: techArray,
      githubLink,
      liveLink,
      image: req.file.path,
    });

    await newProject.save();

    res.status(201).json({
      message: '✅ Project uploaded successfully',
      project: newProject,
    });
  } catch (err) {
    console.error('❌ Upload Error:', err);
    res.status(500).json({
      message: 'Upload failed',
      error: JSON.stringify(err), // ✅ readable in Postman
    });

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


