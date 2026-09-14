import { app } from "./app";
import { connectDB } from "./src/config/dbConfig";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is required");
}

const PORT = process.env.PORT || 5200;

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}/ \nWelcome to Titans Gym`);
  }),
);
