"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHelper = void 0;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
class ProductHelper {
    async insertProductImage(info) {
        let response = await Prisma.product_images.create({
            data: {
                product_id: info.product_id,
                image_url: info.image_url,
                created_at: info.created_at
            }
        });
        return response;
    }
    async getProducts(info) {
        let response = await Prisma.products.findMany(info);
        return response;
    }
    async createProduct(info) {
        let response = await Prisma.products.create({
            data: {
                product_name: info.product_name,
                description: info.description,
                price: info.price,
                stock_available: info.stock_available,
                brand_id: info.brand_id,
                category_id: info.category_id,
                deleted: info.deleted,
                created_by: info.created_by,
                created_at: info.created_at
            }
        });
        return response;
    }
    async updateProduct(info) {
        let response = await Prisma.products.update({
            where: { product_id: info.product_id },
            data: {
                product_name: info.product_name,
                description: info.description,
                price: info.price,
                stock_available: info.stock_available,
                brand_id: info.brand_id,
                category_id: info.category_id,
                updated_at: info.updated_at
            }
        });
        return response;
    }
    async getProduct(info) {
        let response = await Prisma.products.findUnique({
            where: { product_id: info.product_id, deleted: false }
        });
        return response;
    }
    async deleteProduct(product_id) {
        let response = await Prisma.products.update({
            where: { deleted: false, product_id: product_id },
            data: {
                deleted: true
            }
        });
        return response;
    }
    async updateProductImage(info) {
        let response = await Prisma.product_images.update({
            where: { image_id: info.image_id },
            data: {
                image_url: info.image_url
            }
        });
        return response;
    }
}
exports.ProductHelper = ProductHelper;
