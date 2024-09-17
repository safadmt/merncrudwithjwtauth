"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const zod_1 = require("zod");
exports.ProductSchema = zod_1.z.object({
    product_name: zod_1.z.string().min(1, "Product name is required"),
    description: zod_1.z.string().optional(),
    price: zod_1.z.coerce.number().positive("Price must be a positive number"),
    stock_available: zod_1.z.coerce.number().int().nonnegative("Stock available must be a non-negative integer"),
    brand_id: zod_1.z.coerce.number().int().positive("Brand ID must be a positive number"),
    category_id: zod_1.z.coerce.number().int().positive("Category ID must be a positive number"),
    created_by: zod_1.z.coerce.number().int().positive("Created by ID must be a positive number"),
    deleted: zod_1.z.coerce.boolean()
});
