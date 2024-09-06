import jwt from "jsonwebtoken";
import { generateToken } from "../utils/utils.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function renewToken(req, res) {
  return new Promise((resolve, reject) => {
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, async (err, userInfo) => {
      if (err) {        
        return res.status(403).json({message:"Forbidden"});
      }

      try {
        const token = await generateToken("accessToken", {
          id: userInfo.user_id,
          username: userInfo.username,
          role: userInfo.role,
        });
        req.user = {role:userInfo.role}
        
        res.cookie("accessToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
        
        resolve(userInfo.role);  // Resolve the role after setting the token
      } catch (error) {
        reject(error);  // Reject with the error in case of failure
      }
    });
  });
}

export default renewToken;
