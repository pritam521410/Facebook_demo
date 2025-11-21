import {createPost  ,likePost ,getallPostfromcreatedBY, getAllPosts } from "../controllers/postControllers.js"

import { isAuthenticated } from "../middleware/auth.js";

import express from "express";

const route = express.Router();

route.post("/createPost" , isAuthenticated ,createPost)

route.put("/likePost" ,isAuthenticated, likePost)
route.get("/getallPostfromcreatedBY/:createdBY" , isAuthenticated, getallPostfromcreatedBY);
route.get("/getAllPosts", isAuthenticated, getAllPosts);
export default route;