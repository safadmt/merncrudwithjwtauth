import { Response, Request, NextFunction } from "express";
import { UserHelper } from "../helper/users.helpers";
import { UserSchema } from "../validators/userSchema";
import {  Prisma } from "@prisma/client";
import {z} from 'zod'

export class UserController {
    static async getUsers (req:Request, res:Response, next:NextFunction) {
        try{
            const users = await UserHelper.getUsers();
            return res.status(200).json({data: users})
        }catch(err) {
            next(err)
            
        }
    }

    static async getUser (req:Request, res:Response, next:NextFunction) {
        const {userid} = req.params
        console.log(userid,"user getuser");
        
        try{
            const user = await UserHelper.getUser({user_id: parseInt(userid)});
            return res.status(200).json({data: user})
        }catch(err) {
            next(err)
            
        }
    }

    static async updateUser (req:Request, res:Response, next:NextFunction) {
        const {userid} = req.params
        if(!req.body) return res.status(400).json({error: "Request body not found"})
        
        try{
            const usershema = UserSchema.parse({...req.body,password:"kfjdkl3434"})
            
            const user = await UserHelper.updateUser(parseInt(userid), req.body);
            return res.status(200).json({data: user})
        }catch(err:any) {
            if(err instanceof z.ZodError) {
                return res.status(400).json({error: err.issues.map(item=> {
                     return `${item.message} at ${item.path.join(" ")}`
                })})
                
            }else if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code === 'P2002') {
                    return res.status(409).json({error:"The email you provided already in use"})
                }
                
            }else{
                next(err)
            }
            
        }
    }

    static async deleteUser (req:Request, res:Response, next:NextFunction) {
        const {userid} = req.params        
        try{
            const user = await UserHelper.deleteUser(parseInt(userid));
            return res.status(200).json({data: user})
        }catch(err) {
            next(err)
            
        }
    }
}