import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes)


// 

app.listen(PORT, () => {
  console.log(`Server is running on localhost port  ${PORT}`);
  // connect to MongoDB
connectMongoDB();
});