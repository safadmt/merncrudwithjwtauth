import jwt from 'jsonwebtoken'
import renewToken from './renewToken.js';

async function verfiyUser (req,res,next) {
    
    const token = req.cookies.accessToken 
     console.log(token , "token ");
     console.log(req.cookies.jwt);
     
    try{
        if(!token || Object.values(token).length === 0) {
               console.log("renew")
            const role = await renewToken(req,res)
            
            console.log( role, "role royse"); 
            if(role === "user") {
                return next();
            }else{
                return res.status(401).json({message: "Forbidden"})
            }
           
            
        }else {
            jwt.verify(token, process.env.JWt_ACCESS_TOKEN, async(err,token)=> {
                if(err) {
                    if(err.name === 'TokenExpiredError') {
                        const role = await renewToken(req,res)
                       
                        if(role === "user") {
                            next()
                        }else{
                            return res.status(403).json({message: "Forbidden"})
                        }
                        
                    }else{
                        return res.status(403).json({message: "Forbidden"})
                    }
                    
                }else {
                    next()
                }
                
            })
        }
        
    } catch(err) {
        console.log(err);
        
        return res.status(500).json(err)
    }
    
    
}

async function verifyAdmin (req,res,next) {
    const cookies = req.cookies   
    try{
        if(!cookies?.accessToken) {
            const role = await renewToken(req,res)
           
            if(role === "admin") {
                return next();
            }else{
                return res.status(401).json({message: "Forbidden"})
            }
            
        }
        let token = cookies.accessToken
        jwt.verify(token, process.env.JWt_ACCESS_TOKEN, async(err,token)=> {
            if(err) {
                if(err.name === 'TokenExpiredError') {
                    const role = await renewToken(req,res)
                   console.log("roles", role);
                   
                    if(role && role === 'admin') {
                        return next()
                    }else{
                        return res.status(403).json({message: "Forbidden"})
                    }
                    
                }else{
                    return res.status(403).json({message: "Forbidden"})
                }
                
            }else {
                return next()
            }
            
        })
    } catch(err) {
        
        return res.status(500).json(err)
    }
    
}
export {verfiyUser,verifyAdmin}
