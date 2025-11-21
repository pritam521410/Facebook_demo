import Post from "../model/postSchema.js";
import User from "../model/userSchema.js";


export const createPost = async (req, res) => {
  const { title, image, description, likes, likedBy, createdBY } = req.body;

  try {
    const existpost = await Post.findOne({ title });
    if (existpost) {
      return res.status(404).json({ message: "Post already exists" });
    }

    const post = new Post({
      title,
      image,
      description,
      likes,
      likedBy,
      createdBY: req.user.id  
    });

    await post.save();

    res.status(200).json({ message: "Post created successfully", post });

  } catch (error) {
    return res.status(500).json({ message: "Internal error", error: error.message });
  }
};


export const likePost = async(req , res)=>{
  const {_id} = req.query;
  const userid = req.user.id; 
 
  try {
    const exist_id = await Post.findById(_id);
    if(!exist_id){
      return res.status(404).json({ message: "Post not found " });
    }
    const  existuserid = await User.findById(userid);
    
    if(!existuserid){
       return res.status(404).json({ message: "User not found" });
    }

    if(exist_id.likedBy.includes(userid)){
      res.status(400).json({message : "User already like this post"});
    }
    const post = await Post.findByIdAndUpdate(_id ,{$push: {likedBy : userid }, $inc: {likes: 1} }, {new : true});

     return res.status(200).json({message :"you liked this post" , post});

  } catch (error) {
    return res.status(500).json({ message: "Internal error", error: error.message });
  }

}


// export const getallPostfromcreatedBY = async(req ,res)=>{
//   const {createdBY , role } = req.body;

//   try {
//     const existcreatedBY = await  Post.find({createdBY});

//     if(!existcreatedBY){
//        return res.status(404).json({ message: "Post not found " });
//     }

//     res.status(200).json({message: "All post " ,existcreatedBY })

//   } catch (error) {
//     return res.status(500).json({ message: "Internal error", error: error.message });
//   }
// }

export const getallPostfromcreatedBY = async(req ,res)=>{
  
  const user = req.user;
  console.log(user);
  const {createdBY} = req.params;
   try {
    if(!createdBY){
       return res.status(404).json({message : "your are not send createdbyid"});
    }
    if(user.role != "admin"){
    return res.status(404).json({message : "your are not admin"})
    }
    const Allpost = await Post.find({createdBY: createdBY});
    res.status(200).json({message : "All post" , Allpost })
   }
   catch (error) {
    return res.status(500).json({ message: "Internal error", error: error.message });
   }

  }

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("createdBY", "name email");
    res.status(200).json({ message: "All posts fetched successfully", posts });
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error: error.message });
  }
};