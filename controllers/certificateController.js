import Certificate from "../models/CertificateModel.js";

export const uploadCertificate = async (req, res) => {
  try {
    const { title, issuer, issueDate, courseUrl } = req.body;
    const imageUrl = req.file.path; // ✅ Cloudinary image URL

    const cert = new Certificate({
      title,
      issuer,
      courseUrl,
      imageUrl,
    });

    await cert.save();
    res.status(201).json({ success: true, message: "Certificate uploaded", cert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ issueDate: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
