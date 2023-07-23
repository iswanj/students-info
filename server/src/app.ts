import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import examRoutes from "./routes/exam";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// Enable CORS for all routes
app.use(cors());

const port = 4000;

dotenv.config();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/exam", examRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
