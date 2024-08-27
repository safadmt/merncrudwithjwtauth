import { PrismaClient } from "@prisma/client";
import { User } from "../validator/validation.js";
import userHelper from "../helpers/userHelper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/utils.js";

export default {
  
  userSignup: async function (req, res, next) {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Req.body not found. Please provide the user details" });
    }
    console.log(req.body);
    
    
    const { error } = User.validate(req.body);
    if (error) {
      return res.status(400).json({ validationError: error.details });
    }
    try {
      const user = await userHelper.getUserByEmail(req.body.email);
      if (user) {
        return res.status(409).json({ error: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      req.body.role = 'user'
      const newuser = await userHelper.signuUser(req.body);
      // n
      return res.status(200).json({user:newuser});
    } catch (err) {
      next(err);
    }
  },
  userLogin: async function (req, res, next) {
    
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Please provide email or password" });
    }
    console.log(req.body);
    
    try {
      const user = await userHelper.getUserByEmail(req.body.email);
      console.log(user)
      if (!user) {
        return res.status(409).json({ error: "User not registered. Please register" });
      }
      const isPasswordTrue = await bcrypt.compare(req.body.password, user.password)
      if(!isPasswordTrue) {
        return res.status(401).json({error:"Incorrect password"})
      }
      if(user.email !== req.body.email) {
        return res.status(401).json({error:"Incorrect email"})
      }
      
        const accessToken = await generateToken('accessToken', {id:user.user_id, username:user.username,role:user.role}) 
        const refreshToken = await generateToken('refreshToken', {id: user.user_id, username:user.username, role:user.role})
          res.cookie('accessToken', accessToken, {
            httpOnly:true, 
            secure:true, 
            sameSite:'None', 
            maxAge: 1 * 60 * 1000
          })
          res.cookie('jwt', refreshToken, {
            httpOnly:true, 
            secure:true, 
            sameSite:'None', 
            maxAge: 3 * 24 * 60 * 60 * 1000})
            const {role, user_id, username} = user
          res.status(200).json({user: {user_id,role,username}});
         
      
    } catch (err) {
      next(err);
    }
  },
  getAllUser : async function (req,res,next) {
    try{
      const users = await userHelper.getUsers()
      res.status(200).json(users)
    }catch(err) {
      next(err);
    }
  },
  deleteOneUser: async function (req,res,next) {
    try{
      const {userid} = req.params
      const deleted = await userHelper.deleteUser(userid)
      if(deleted) {
        return res.status(200).json("Deleted success")
      }
    }catch(err) {
      next(err)
    }
  },
  updateUser : async function name(req,res,next) {
    const {userid} = req.params;
    if(!req.body) return res.status(400).json("requested body not found")
    const updated = await userHelper.updateUser(userid,req.body)
    if(updated) {
      res.status(200).json(updated)
    }
  },
  getOneUser : async function (req,res) {
    const {userid} = req.params;
    try{
      const user = await userHelper.getUser(userid)
      console.log(user);
      
      return res.status(200).json(user)
    }catch(err) {
      next(err);
      
    }
  },

  

  logout : (req,res) => {
    const cookies = req.cookies?.jwt
    if(!cookies) return res.sendStatus(204)
    res.clearCookie('jwt', {httpOnly:true,sameSite:'None',secure:true})
    res.clearCookie('accessToken', {httpOnly:true,sameSite:'None',secure:true})
    res.status(200).json({message:"Cookie cleared"})
  },
  isAuthorize : (req,res)=> {
    res.status(200).json({isAuth:1})
  },

 
};
