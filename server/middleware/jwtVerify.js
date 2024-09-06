import jwt from 'jsonwebtoken'
import renewToken from './renewToken.js';

async function verfiyUser (req,res,next) {
    
    const token = req.cookies.accessToken      
    try{
        if(!token || Object.values(token).length === 0) {
            await renewToken(req,res)
            next()
        }else {
            jwt.verify(token, process.env.JWt_ACCESS_TOKEN, async(err,userInfo)=> {
                if(err) {
                    if(err.name === 'TokenExpiredError') {
                        const role = await renewToken(req,res)
                        next()
                    }else{
                        return res.status(403).json({message: "Forbidden"})
                    }
                    
                }else {
                    
                    req.user = {role: userInfo.role}
                    next()
                }
                
            })
        }
        
    } catch(err) {
        return res.status(500).json(err)
    }
    
    
}

const checkRole = (role) => {
    return (req,res,next)=> {
        if(req.user.role === role) {
            return next()
        }else{
            return res.status(403).json({message:"Forbidden"})
        }
    }
}

export {verfiyUser,checkRole}
