import { config } from "dotenv";
import app from "./app";
import connectDB from "./utils/dbs";
import { v2 as cloudinary } from "cloudinary";
config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Connected on port: ${process.env.PORT}`);
  connectDB();
});
