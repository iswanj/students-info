import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
