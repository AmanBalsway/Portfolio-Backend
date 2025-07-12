import Resume from '../models/Resume.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // ✅ Remove old resume if you only want to keep the latest
    await Resume.deleteMany({}); // optional: only keep latest one in DB

    const resume = await Resume.create({
      url: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded",
      resume,
    });
  } catch (err) {
    console.error("❌ Resume Upload Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    if (!resume) {
      return res.status(404).json({ success: false, message: "No resume found" });
    }
    res.status(200).json({ success: true, resume });
  } catch (err) {
    console.error("❌ Resume Fetch Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch resume" });
  }
};
