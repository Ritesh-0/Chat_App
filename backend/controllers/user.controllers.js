import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Signup functionality

export const register = async(req,res) =>{
     try{
          const {fullname, username, password,confirmpassword,gender}=req.body;

          // Validating all fields
          if(!fullname || !username || !password || !confirmpassword || !gender){
               return res.status(400).json({message:"All fields are required",success:false});
          }

          // Checking if password matched or not
          if(password !== confirmpassword){
               return res.status(400).json({message:"password not matched",success:false})
          }

          // Checking user already exist or not
          const exitingUser = await User.findOne({username});
          if(exitingUser){
               return res.status(400).json({message:"User Already Exist Login Now"})
          }

          // Hashing our password
          const hashedPassword = await bcrypt.hash(password,12)

          // Setting up photos based on male or female
          const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`

          const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`

          await User.create({
               fullname,
               username,
               password:hashedPassword,
               profilephoto: gender==="male" ? maleProfilePhoto : femaleProfilePhoto,
               gender
          });

          return res.status(201).json({message:"Account created successfully",success:true})
     }
     catch(err){
          console.log(err.message)
     }
}


// Login functionality

export const login = async(req,res) =>{
     try {
          const {username,password} = req.body;

          // Applying field validation
          if(!username || !password){
               return res.status(400).json({message:"All fields are required"})
          }

          const existingUser = await User.findOne({username});

          // Checking if user exist or not
          if(!existingUser){
               res.status(400).json({message:"Incorrect username and password register now if not",success:false})
          }

          // Comparing entered password to existing password
          const isPasswordMatched = await bcrypt.compare(password,existingUser.password)
          

          if(!isPasswordMatched){
               res.status(400).json({message:"Incorrect username and password register now if not",success:false})
          }

          // Setting up user id as cookie in browser in encrypted form
          const tokenData = {
               existingUserId : existingUser._id
          }

          const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'})

          // After all validation sending user data
          return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'Strict'}).json({
               _id:existingUser._id,
               username:existingUser.username,
               fullname:existingUser.fullname,
               profilephoto:existingUser.profilephoto
          })
     } 
     catch (err) {
          console.log(err.message) 
     }
}

// Logout 

export const logout = (req,res) =>{
     try {
          return res.status(200).cookie("token","",{expiresIn:0}).json({
               message:"User LoggedOut successfully"
          })
     } 
     catch (err) {
          console.log(err.message)
     }
}

// Other user

export const getOtherUsers = async(req,res) =>{
     try{
          const loggedInUserId = req.id
          const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
          return res.status(200).json(otherUsers)
     }
     catch(err){
          console.log(err.message)
     }
}