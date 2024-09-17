import { PrismaClient } from "@prisma/client";
import { Admin } from "../interfaces/Admin.interface";

const Prisma = new PrismaClient()

export class AdminHelper {
    static async insertAdmin(info:Admin) {
        const response = await Prisma.admin.create({
            data: {
                username: info.username,
                email: info.email,
                password: info.password,
                created_at: info.created_at
            }
        })
        return response
    }

    static async getAdmin(info: any) {
        const response = await Prisma.admin.findUnique({
            where: info,
            select: {
                username: true,
                email: true,
                created_at: true,
                updated_at: true,
            }
        })
        return response
    }
}