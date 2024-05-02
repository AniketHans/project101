import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import express from "express";
dotenv.config();

const app = express();

connectDB(app);
