"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandHelper = void 0;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
class BrandHelper {
    static async createBrand(info) {
        let response = await Prisma.brands.create({
            data: {
                brand_name: info.brand_name,
                created_at: info.created_at
            }
        });
        return response;
    }
    static async updateBrand(info) {
        let response = await Prisma.brands.update({
            where: { brand_id: info.brand_id },
            data: {
                brand_name: info.brand_name,
                updated_at: info.updated_at
            }
        });
        return response;
    }
    static async deleteBrand(brandid) {
        let response = await Prisma.brands.delete({
            where: { brand_id: brandid }
        });
        return response;
    }
    static async getBrands(info) {
        let response = await Prisma.brands.findMany({
            where: info
        });
        return response;
    }
    static async getBrand(info) {
        let response = await Prisma.brands.findUnique({
            where: info
        });
        return response;
    }
    static async getCategory(info) {
        let response = await Prisma.brands.findUnique({
            where: { brand_id: info.brand_id }
        });
        return response;
    }
}
exports.BrandHelper = BrandHelper;
