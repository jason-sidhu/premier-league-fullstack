import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const jwtSecretKey = process.env.JWTSECRET;

//READ FROM DATABASE
router.get("/", async (req, res) => {
  //receive JWT 
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify user (JWT) and extract userId to search Database for user information
    const decodedToken = jwt.verify(token.split(" ")[1], jwtSecretKey);
    const userId = decodedToken.userId;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // Return relevant user information 
    const { username, email, team } = user;
    res.json({ username, email, team });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//UPDATE DATABASE
router.put("/update", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], jwtSecretKey);
    const userId = decoded.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure username is not already in use 
    if (req.body.newUsername && req.body.newUsername !== user.username) {
      const existingUser = await User.findOne({
        username: req.body.newUsername,
      });

      if (existingUser) {
        return res.status(400).json({ message: "Username is already in use" });
      }

      user.username = req.body.newUsername;
    }

    // Ensure email is not already in use 
    if (req.body.newEmail && req.body.newEmail !== user.email) {
      const existingUser = await User.findOne({ email: req.body.newEmail });

      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      user.email = req.body.newEmail;
    }

    // Check user password is valid to update info using bcrypt
    const isPasswordValid = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect current password, please try again",
      });
    }

    // Update any user information that was changed
    if (req.body.newUsername) {
      user.username = req.body.newUsername;
    }
    if (req.body.newEmail) {
      user.email = req.body.newEmail;
    }
    if (req.body.newFavourite) {
      user.team = req.body.newFavourite;
    }
    if (req.body.newPassword) {
      const hashedPassword = await bcrypt.hash(
        req.body.newPassword,
        10
      );
      user.password = hashedPassword;
    }

    // Save updated user data to MongoDB
    await user.save();

    // Generate a new JWT token for the user
    const newToken = jwt.sign({ userId: user._id }, jwtSecretKey);

    // Send the updated user data and the new token
    res.status(200).json({
      username: user.username,
      email: user.email,
      favoriteTeam: user.team,
      token: newToken,
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//DELETE USER
router.delete("/delete", async (req, res) => {
    const {password} = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decodedToken = jwt.verify(token.split(" ")[1], jwtSecretKey);
      const userId = decodedToken.userId;
      const user = await User.findOne({ _id: userId });
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password." });
      }
  
      // If the password is correct, delete user
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User account deleted successfully." });
    } catch (error) {
      console.error("Error deleting user account:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
export default router;
