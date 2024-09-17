import jwt from 'jsonwebtoken';
import { PrismaClient,Prisma as PrismaGl } from "@prisma/client"

const Prisma = new PrismaClient()
import bcrypt from 'bcryptjs'
import { UserHelper } from '../helper/users.helpers';
import {z} from 'zod'
import { UserSchema } from '../validators/userSchema';
import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../utils/tokenUtils';
import { setCookies } from '../utils/setCookies';
import { AdminHelper } from '../helper/admin.helper';
import { User } from '../interfaces/User.interface';
import { Admin } from '../interfaces/Admin.interface';

export class AuthController {
     static async userSignup(req: Request, res: Response, next:NextFunction) {
        if(!req.body) return res.status(400).json({error: "Request body is required"})
        
        try{
            let validateUser = UserSchema.parse(req.body)
            console.log(validateUser);
            const user = await UserHelper.getUser({email : req.body.email})
            if(user) return res.status(409).json({error: "Email already in exist, use another email"})
            let salt = await bcrypt.genSalt(10)
            let hashedPassword = await bcrypt.hash(req.body.password, salt)
            
            let newUser : User = {
                username : req.body.username,
                email: req.body.email,
                password: hashedPassword,
                deleted : false,
                created_at: new Date
            }
            const newuser = await UserHelper.insertUser(newUser)
            const {user_id, username,email} = newuser
            const accessToken = await generateToken('accessToken', {id: user_id, username})
            const refreshToken = await generateToken('refreshToken', {id: user_id, username})

            setCookies(accessToken ,refreshToken,res)
            res.status(200).json({user: {user_id, username, email}})
        }catch(err) {
            if(err instanceof z.ZodError) {
                return res.status(400).json({error: err.issues.map(item=> {
                     return `${item.message} at ${item.path.join(" ")}`
                })})
                
            }else if (err instanceof PrismaGl.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (err.code === 'P2002') {
                  return res.status(400).json({error:"The provided email is already in use."})
                }
            }else {
                next(err)
            }
            
        }
    } 

    static async adminSignup(req: Request, res: Response, next:NextFunction) {
        console.log("log");
        
        if(!req.body) return res.status(400).json({error: "Request body is required"})
        
        try{
            let validateUser = UserSchema.parse(req.body)
            console.log(validateUser);
            const admin = await AdminHelper.getAdmin({email : req.body.email})
            if(admin) return res.status(409).json({error: "Email already in admin, use another email"})
            let salt = await bcrypt.genSalt(10)
            let hashedPassword = await bcrypt.hash(req.body.password, salt)
            let newAdmin : Admin = {
                username : req.body.username,
                email: req.body.email,
                password: hashedPassword,
                created_at: new Date
            }
            const newadmin = await AdminHelper.insertAdmin(newAdmin)
            const {admin_id, username,email} = newadmin
            const accessToken = await generateToken('accessToken', {id: admin_id, username})
            const refreshToken = await generateToken('refreshToken', {id: admin_id, username})

            setCookies(accessToken ,refreshToken,res)
            res.status(200).json({admin: {admin_id, username, email}})
        }catch(err : any) {
            if(err instanceof z.ZodError) {
                return res.status(400).json({error: err.issues.map(item=> {
                    return `${item.message} at ${item.path.join(" ")}`
               })})
                
            }else if (err instanceof PrismaGl.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if(err.code === 'P2002') {
                    return res.status(400).json({error:"The provided email is already in use."})
                }
            }else {
                next(err)
            }
            
        }
    } 

    static async userLogin(req: Request, res: Response, next:NextFunction) {
        if(!req.body) return res.status(400).json({error: "Request body is required"})
        req.body.username = "dump"
        
        try{
            let validateUser = UserSchema.parse(req.body)
            console.log(validateUser);
            const user = await Prisma.user.findUnique({where: {email: req.body.email}})
            if(!user) return res.status(409).json({error: "User not exist in the provided email"})
            const isPasswordTrue = bcrypt.compare(req.body.password, user.password)
            if(!isPasswordTrue) return res.status(401).json({error: "Incorrect password"})
            const {user_id, username,email} = user
            const accessToken = await generateToken('accessToken', {id: user_id, username})
            const refreshToken = await generateToken('refreshToken', {id: user_id, username})

            setCookies(accessToken ,refreshToken,res)
            res.status(200).json({user: {user_id, username, email}})
        }catch(err: any) {
            if(err instanceof z.ZodError) {
                return res.status(400).json({error: err.issues.map(item=> {
                    return `${item.message} at ${item.path.join(" ")}`
               })})
                
            }else {
                next(err)
            }
            
        }
    } 

    static async adminLogin(req: Request, res: Response, next:NextFunction) {
        if(!req.body) return res.status(400).json({error: "Request body is required"})
        req.body.username = "dump"
        
        try{
            let validateUser = UserSchema.parse(req.body)
            console.log(validateUser);
            const admin = await Prisma.admin.findUnique({where: {email: req.body.email}})
            if(!admin) return res.status(409).json({error: "Admin not exist in the provided email"})
            const isPasswordTrue = bcrypt.compare(req.body.password, admin.password)
            if(!isPasswordTrue) return res.status(401).json({error: "Incorrect password"})
            const {admin_id, username,email} = admin
            const accessToken = await generateToken('accessToken', {id: admin_id, username})
            const refreshToken = await generateToken('refreshToken', {id: admin_id, username})

            setCookies(accessToken ,refreshToken,res)
            res.status(200).json({admin: {admin_id, username, email}})
        }catch(err:any) {
            if(err instanceof z.ZodError) {
                return res.status(400).json({error: err.issues.map(item=> {
                    return `${item.message} at ${item.path.join(" ")}`
               })})
                
            }else {
                next(err)
            }
            
        }
    } 

    static async logout (req:Request, res:Response) {        
        if(!req.cookies?.refreshToken) return res.status(200)
        
        res.clearCookie('refreshToken', {httpOnly:true,sameSite:'none',secure:true})
        res.clearCookie('accessToken', {httpOnly:true,sameSite:'none',secure:true})
        res.status(200).json("success")
    }
}

