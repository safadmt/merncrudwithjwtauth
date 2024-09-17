import { Request } from "express";
import { User } from "../interfaces/User.interface";

declare global {
    namespace Express {
      interface Request {
        user?: User; // Adjust the type here based on your user object type
      }
    }
  }