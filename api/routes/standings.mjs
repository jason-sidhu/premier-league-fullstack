import express from "express";
import axios from "axios";
import dotenv from "dotenv"; 

dotenv.config();
const router = express.Router(); 
const API_KEY = process.env.FOOTBALL_API_KEY


router.route("/").get(async (req, res) => {
    const season = req.query.season || '2023';
    try {
      console.log("standings")
      const response = await axios.get("https://api.football-data.org/v4/competitions/PL/standings?season="+season, 
      {
          headers:{
              'X-Auth-Token': 'f263a0fc54cc43fc94d1817f252a5104',
          }
      }
      );
      const standings = response.data.standings; 
      console.log(response.data.standings)
      res.json(standings);
      res.status(200); 
    } catch (err) {
      console.log("errors")
      res.status(500).json(err);
    }
  });




export default router;