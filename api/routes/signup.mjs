import User from "../models/User.js";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const jwtSecretKey = process.env.JWTSECRET

// Register a new user
router.post("/", async (req, res) => {
  try {
    // Check if the email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User(req.body);
    await user.save();

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, jwtSecretKey);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;