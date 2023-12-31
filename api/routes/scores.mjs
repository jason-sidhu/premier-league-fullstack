import express, { Router } from "express";
import axios from "axios";
import dotenv from "dotenv"; 

dotenv.config();
const router = express.Router();
const API_KEY = process.env.FOOTBALL_API_KEY

// Results and fixtures api, use req data to make appropriate request to api endpoint
router.route("/").get( async (req, res) => {
  try{
    const matchday = req.query.matchday || "1" ;
    const season = req.query.season || '2023';
    const response = await axios.get("https://api.football-data.org/v4/competitions/PL/matches?season="+season+"&matchday="+matchday, 
    {
      headers:{
          'X-Auth-Token': API_KEY,
      }
  }
  );

  console.log(response.data);
  res.status(200).json(response.data);
  } catch(error){
    console.log("errors")
    res.status(500).json(error);
  }
});

export default router;
