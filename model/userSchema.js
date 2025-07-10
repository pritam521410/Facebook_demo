import mongoose from "mongoose";
import bcrypt from "bcryptjs";

 
const userSchema = new mongoose.Schema({

  name:{
    type: String,
  },
  email :{
    type: String,
  },
  phone:{
    type: String,
  },
  password:{
    type: String,
  },
  role:{
    type: String,
   enum:["admin" , "user"]
  }

}, {timestamps : true})

userSchema.pre("save" ,async function(next){
   if(!this.isModified("password"))
    return next();

try {
    const salt= await bcrypt.genSalt(10);
   this.password= await bcrypt.hash(this.password,salt);
} catch (error) {
     next(error);
}
})





export default mongoose.model("User" ,userSchema );