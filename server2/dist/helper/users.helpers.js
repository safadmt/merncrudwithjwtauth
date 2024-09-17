"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHelper = void 0;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
class UserHelper {
    static async insertUser(info) {
        const response = await Prisma.user.create({
            data: {
                username: info.username,
                email: info.email,
                password: info.password,
                deleted: false,
                created_at: info.created_at
            }
        });
        return response;
    }
    static async getUser(info) {
        const user = await Prisma.user.findUnique({
            where: info,
            select: {
                user_id: true,
                username: true,
                email: true,
                created_at: true,
                updated_at: true
            },
        });
        return user;
    }
    static async getUsers() {
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
                username: 'asc'
            },
        });
        return users;
    }
    async deleteUser(userid) {
        const deleted = await Prisma.user.update({
            where: {
                user_id: userid
            },
            data: {
                deleted: true
            }
        });
        console.log(deleted);
        return deleted;
    }
    async updateUser(userid, info) {
        const updated = await Prisma.user.update({
            where: {
                user_id: userid,
                deleted: true
            },
            data: {
                username: info.username,
                email: info.email
            }
        });
        return updated;
    }
}
exports.UserHelper = UserHelper;
