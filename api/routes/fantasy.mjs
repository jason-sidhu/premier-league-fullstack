import express from "express";
import axios from "axios";

const router = express.Router();

// Route to get fantasy stats using free premier league api 
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://fantasy.premierleague.com/api/bootstrap-static/");
    const statisticsData = response.data;
    res.status(200).json(statisticsData);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;