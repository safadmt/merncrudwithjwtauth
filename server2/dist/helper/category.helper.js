"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryHelper = void 0;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
class CategoryHelper {
    static async createCategory(info) {
        let response = await Prisma.categories.create({
            data: {
                category_name: info.category_name,
                created_at: info.created_at
            }
        });
        return response;
    }
    static async getCategories(info) {
        let response = await Prisma.categories.findMany({
            where: info
        });
        return response;
    }
    static async getCategory(info) {
        let response = await Prisma.categories.findUnique({
            where: info
        });
        return response;
    }
    static async updateCategory(info) {
        let response = await Prisma.categories.update({
            where: { category_id: info.category_id },
            data: {
                category_name: info.category_name,
                updated_at: info.updated_at
            }
        });
        return response;
    }
    static async deleteCategory(category_id) {
        let response = await Prisma.categories.delete({
            where: { category_id: category_id }
        });
        return response;
    }
}
exports.CategoryHelper = CategoryHelper;
