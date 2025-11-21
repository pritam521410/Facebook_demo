import express from "express";
import dotenv from "dotenv"
import {connectDB} from "./db.js"
import userRoute from "./route/userRoute.js";
import postRoute from "./route/postRoute.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();


app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 4000
connectDB();



app.use("/api" , userRoute);
app.use("/api" , postRoute);
app.listen(PORT ,()=>{
  console.log("server is listening port 4000");
})

