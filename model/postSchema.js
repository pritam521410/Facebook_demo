import mongoose from "mongoose";
 
const postSchema = new mongoose.Schema({

  title:{
    type: String,
  },
  image :{
    type: String,
  },
  description:{
    type: String,
  },
  likes:{
   type: Number,
   default :0
  },
  likedBy:{
    type:[mongoose.Types.ObjectId],
    ref: "User"
  },
  
  
  createdBY:{
   type: mongoose.Types.ObjectId,
   ref: "User"
  }

} , {timestamps : true})

export default  mongoose.model("Post" ,postSchema );