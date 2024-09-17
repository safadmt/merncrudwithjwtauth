"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminHelper = void 0;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
class AdminHelper {
    static async insertAdmin(info) {
        const response = await Prisma.admin.create({
            data: {
                username: info.username,
                email: info.email,
                password: info.password,
                created_at: info.created_at
            }
        });
        return response;
    }
    static async getAdmin(info) {
        const response = await Prisma.admin.findUnique({
            where: info,
            select: {
                username: true,
                email: true,
                created_at: true,
                updated_at: true,
            }
        });
        return response;
    }
}
exports.AdminHelper = AdminHelper;
