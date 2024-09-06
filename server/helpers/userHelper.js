import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    
    getUser : async function (userid) {
            const user = await prisma.users.findUnique({
            where: {
                user_id : parseInt(userid),
                deleted: false
            },
            
            select: {
                user_id: 1,
                username: 1,
                email: 1,
                role : 1,
                createdAt: 1,
                updatedAt: 1
            },
            
            })
            return user;
    },
    getUsers : async function () {
        const users = await prisma.users.findMany({
            where: {
                deleted: false,
                role: 'user'
            },
            select: {
                user_id: 1,
                username: 1,
                email: 1,
                createdAt: 1,
                updatedAt: 1
            },
            orderBy: {
               username : 'asc'
              },
        })
        return users;
    },
    signuUser: async function (userInfo) {
        const user = await prisma.users.create({
            data: userInfo
        })
        return user
    },
    deleteUser: async function (id) {
        const user = await this.getUser(id)
        if(!user) return "User not exist"
        const deleted = await prisma.users.update({
            where: {
                user_id: parseInt(id)
            },
            data : {
                deleted: true
            }
        })
        console.log(deleted)
        return deleted
    },
    updateUser : async function (id,info) {
        const updated = await prisma.users.update({
            where: {
                user_id: parseInt(id)
            },
            data: {
                username: info.username,
                email: info.email
            }
        })
        return updated
    }
}