import cors from "cors"
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import signinRoute from "./routes/signin.mjs";
import signupRoute from "./routes/signup.mjs"
import fantasyRoute from "./routes/fantasy.mjs";
import statsRoute from "./routes/stats.mjs";
import profileRoute from "./routes/profile.mjs";
import scoresRoute from "./routes/scores.mjs";
import standingsRoute from "./routes/standings.mjs";

const app = express();
dotenv.config();

app.use(cors({
  origin: ['http://localhost:3000','https://eplhub-api-jasonsidhu.onrender.com']
}));


//middlewares
app.use(express.json())

app.use("/api/signin", signinRoute);
app.use("/api/signup", signupRoute)
app.use("/api/fantasy", fantasyRoute);
app.use("/api/stats", statsRoute);
app.use("/api/profile", profileRoute);
app.use("/api/scores", scoresRoute);
app.use("/api/standings", standingsRoute);


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};

app.listen(8800, () => {
  connect();
  console.log("Connected to backend");
});
