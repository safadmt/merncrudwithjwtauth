import jwt from 'jsonwebtoken'
import { renewToken } from '../utils/tokenUtils'
import { UserHelper } from '../helper/users.helpers';
import { AdminHelper } from '../helper/admin.helper';

export async function verifyToken (req:any, res:any, next:any) {

    const token = req.cookies.accessToken      
    try{
        if(!token || Object.values(token).length === 0) {
            let userid = await renewToken(req,res)
            
            req.user = {id:userid}
            next()
        }else {
            jwt.verify(token, process.env.JWt_ACCESS_TOKEN as string, async(err:any,userInfo:any)=> {
                if(err) {
                    if(err.name === 'TokenExpiredError') {
                        var userid = await renewToken(req,res)
                        req.user = {id:userid}
                        next()
                    }else{
                        return res.status(403).json({message: "Forbidden"})
                    }
                }else {
                    req.user = {id: userInfo.id}
                    next()
                }
                
            })
        }
        
    } catch(err) {
        return res.status(500).json(err)
    }
}

export async function authUser(req:any, res:any,next:any) {
    try{
        
        let user = await UserHelper.getUser({user_id: req.user.id,deleted:false })
        if(!user) return res.status(403).json({error: "Forbidden"})
        next()
        
    }catch(err) {  
        console.log(err);
        
    }
}

export async function authAdmin(req:any, res:any,next:any) {
    try{
        
        let admin = await AdminHelper.getAdmin({admin_id: req.user.id })
        if(!admin) return res.status(403).json({error: "Forbidden"})
        next()
        
    }catch(err) {  
        console.log(err);
        
    }
}