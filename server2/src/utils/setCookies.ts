import { Response } from "express";

export function setCookies (accessToken : string | undefined, refreshToken : string | undefined,res:Response ):void {
    res.cookie('accessToken', accessToken, {
        httpOnly:true, 
        secure:true, 
        sameSite:'none', 
        maxAge: 15 * 60 * 1000
      })
    res.cookie('refreshToken', refreshToken, {
        httpOnly:true, 
        secure:true, 
        sameSite:'none', 
        maxAge: 3 * 24 * 60 * 60 * 1000})
}
