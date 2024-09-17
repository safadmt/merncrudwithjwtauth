import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export function generateToken (type : string, info : object):Promise<string | undefined> {
    
    return new Promise((resolve,reject)=> {
      let secret: string | undefined  = 
            type === 'accessToken' 
                ? process.env.JWT_ACCESS_TOKEN
                : process.env.JWT_REFRESH_TOKEN;

        if (!secret) {
            return reject(new Error('Secret key is missing'));
        }
        let expires = type === 'accessToken' ? '15m' : '3d'
        console.log("expires",expires);
        
        jwt.sign(info, secret,{expiresIn:expires}, (err, token)=> {
        if(err) {
          reject(err)
        }
        resolve(token)
        })
    }) 

}

function renewToken(req : Request, res:Response):Promise<string | number> {
  return new Promise((resolve, reject) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({error: "Token not found "})
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN as string, async (err:any, userInfo:any) => {
      if (err) {        
        return res.status(403).json({message:"Forbidden"});
      }

      try {
        const token = await generateToken("accessToken", {
          id: userInfo.id,
          username: userInfo.username,
        });
        
        res.cookie("accessToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
        
        resolve(userInfo.id);  
      } catch (error) {
        reject(error);  // Reject with the error in case of failure
      }
    });
  });
}

export {renewToken};
