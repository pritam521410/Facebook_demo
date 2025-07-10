import {registerUser , getalladminAnduserByrole , loginUser } from "../controllers/userControllers.js"



import express from "express";

const route = express.Router();

route.post("/registerUser" , registerUser);
route.get("/getalladminAnduserByrole" , getalladminAnduserByrole)
route.post("/loginUser" ,loginUser)
 

export default route;