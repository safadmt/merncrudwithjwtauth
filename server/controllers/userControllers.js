import { PrismaClient } from "@prisma/client";
import { User } from "../validator/validation.js";
import userHelper from "../helpers/userHelper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/utils.js";

export default {
  adminSignup : async function (req, res) {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Req.body not found. Please provide the user details" });
    }
    
    
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
      req.body.role = 'admin'
      const newuser = await userHelper.signuUser(req.body);
      // n
      return res.status(200).json(newuser);
    } catch (err) {
      console.log(err);
    }
  }, 
  userSignup: async function (req, res) {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Req.body not found. Please provide the user details" });
    }
    
    
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
      return res.status(200).json(newuser);
    } catch (err) {
      console.log(err);
    }
  },
  userLogin: async function (req, res) {
    
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Please provide email or password" });
    }
    try {
      const user = await userHelper.getUserByEmail(req.body.email);
      console.log(user)
      if (!user) {
        return res.status(409).json({ error: "User not registered. Please register" });
      }
      const isPasswordTrue = await bcrypt.compare(req.body.password, user.password)
      if(!isPasswordTrue) {
        return res.status(401).json("Incorrect password")
      }
      if(user.email !== req.body.email) {
        return res.status(401).json("Incorrect email")
      }
      
        const accessToken = await generateToken('accessToken', {id:user.user_id, email:user.email}) 
        const refreshToken = await generateToken('refreshToken', {id: user.user_id, email:user.email})
          res.setHeader("Authorization", `Bearer ${accessToken}`)
          res.cookie('jwt', refreshToken, {
            httpOnly:true, 
            secure:true, 
            sameSite:'None', 
            maxAge: 7 * 24 * 60 * 60 * 1000})
          res.status(200).json({user, accessToken});
         
      
    } catch (err) {
      console.log(err);
    }
  },
  getAllUser : async function (req,res) {
    try{
      const users = await userHelper.getUsers()
      res.status(200).json(users)
    }catch(err) {
      console.log(err);
    }
  },
  deleteOneUser: async function (req,res) {
    try{
      const {userid} = req.params
      const deleted = await userHelper.deleteUser(userid)
      if(deleted) {
        return res.status(200).json("Deleted success")
      }
    }catch(err) {
      console.log(err);
      
    }
  },
  updateUser : async function name(req,res) {
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
      console.log();
      
    }
  },

  refreshToken: (req,res) => { 
     let cookeis = req.cookies;
     console.log(cookeis);
     
     if(!cookeis?.jwt) return res.status(401).json({message: "Unauthorized"})
      const refreshToken = cookeis.jwt
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, 
      async (err, userInfo)=> {
        console.log(userInfo)
      if(err) {
        return res.status(403).json("Forbidden")
      }
      const user = await userHelper.getUser(userInfo.id)
      if(!user) return res.status(401).json('Unauthorized');
      const accessToken = await generateToken('accessToken', {id:user.user_id,email:user.email})
      res.setHeader("Authorization", `Bearer ${accessToken}`)
      res.json('ok')
    })


  },

  logout : (req,res,next) => {
    const cookies = req.cookies?.jwt
    if(!cookies) return res.sendStatus(204)
    res.clearCookie('jwt', {httpOnly:true,sameSite:'None',secure:true})
    res.json({message:"Cookie cleared"})
  }
};
