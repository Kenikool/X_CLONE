import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
//

app.listen(PORT, () => {
  console.log(`Server is running on localhost port  ${PORT}`);
  // connect to MongoDB
  connectMongoDB();
});
