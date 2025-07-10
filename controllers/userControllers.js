import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(404).json({ message: "User already registered" }); 
    }

    const user = new User({ name,  role, email, phone, password, });
    
    await user.save();
   

     res.status(200).json({ message: "User registered successfully", user }); 

  } catch (error) {
    return res.status(500).json({ message: "Internal error", error: error.message });  
  }
};


 export const getalladminAnduserByrole = async (req, res) => {
  const { role } = req.query;

  try {
    const admins = await User.find({ role });

    if (admins.length === 0) {
      return res.status(404).json({ message: "No admins found with this role" });
    }

    res.status(200).json({
      message: "All registserUserr with role: " + role,
      admins,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const loginUser = async(req ,res)=>{
  const {email , password} =req.body;

  try {
    const existUser = await User.findOne({email})
    if(!existUser){
      res.status(404).json({message: "not found user"})
    }

    const isMatch = await bcrypt.compare(password , existUser.password);

    if(!isMatch){
      return res.status(400).json({ message: "Invalid email & password" });
    }

    const token = jwt.sign(
      {
        id : existUser._id, role: existUser.role
      },
      process.env.JWT_SECRET,
      {expiresIn : "1d"}
    )


      res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: existUser._id,
      name: existUser.name,
    },
  });


  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    
  }


}
  


