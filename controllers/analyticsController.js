import View from "../models/viewModel.js";

export const logView = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const page = req.body.page || "home";

    await View.create({ ip, userAgent, page });

    res.status(200).json({ message: "View logged" });
  } catch (error) {
    res.status(500).json({ error: "Failed to log view" });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const allViews = await View.find();

    const daily = {};
    const pageCounts = {};

    allViews.forEach((view) => {
      const page = view.page || "home";
      pageCounts[page] = (pageCounts[page] || 0) + 1;

      if (view.createdAt) {
        const date = view.createdAt.toISOString().split("T")[0];
        daily[date] = (daily[date] || 0) + 1;
      }
    });

    res.status(200).json({
      total: allViews.length,
      daily,
      pageCounts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
