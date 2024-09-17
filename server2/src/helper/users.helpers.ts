import { PrismaClient } from "@prisma/client";
import { User } from "../interfaces/User.interface";
const Prisma = new PrismaClient()

export class UserHelper {

    static async insertUser(info:User) {
        const response = await Prisma.user.create({
            data: {
                username: info.username,
                email: info.email,
                password: info.password,
                deleted :false,
                created_at: info.created_at
            }
        })
        return response
    }

    static async getUser (info : any) {
        const user = await Prisma.user.findUnique({
            where: info,
            select: {
                user_id: true,
                username: true,
                email: true,
                created_at: true,
                updated_at: true
            },
        
        })
        return user;
    }

    static async getUsers () {
        const users = await Prisma.user.findMany({
            where: {
                deleted: false
            },
            select: {
                user_id: true,
                username: true,
                email: true,
                created_at: true,
                updated_at: true
            },
            orderBy: {
               username : 'asc'
              },
        })
        return users;
    }

    static async deleteUser (userid : number) {
        const deleted = await Prisma.user.update({
            where: {
                user_id: userid
            },
            data : {
                deleted: true
            }
        })
        
        return deleted
    }

    static async updateUser (userid: number, info: User) {
        const updated = await Prisma.user.update({
            where: {
                user_id: userid,
                deleted:false
            },
            data: {
                username: info.username,
                email: info.email,
                updated_at: new Date
            }
        })
        return updated
    }
}

