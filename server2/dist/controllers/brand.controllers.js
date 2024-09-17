"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandController = void 0;
const brand_helper_1 = require("../helper/brand.helper");
class BrandController {
    static async createBrand(req, res, next) {
        if (!req.body)
            return res.status(400).json({ error: "Request body is required" });
        let { brand_name } = req.body;
        if (!brand_name)
            return res.status(400).json({ error: "brand_name is required" });
        try {
            let isBrandExist = await brand_helper_1.BrandHelper.getBrand({ brand_name });
            if (isBrandExist)
                return res.status(409).json({ error: `${brand_name} already created` });
            let brand = { brand_name, created_at: new Date };
            const newbrand = await brand_helper_1.BrandHelper.createBrand(brand);
            res.status(201).json({ data: newbrand });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async updateBrand(req, res, next) {
        const { brandid } = req.params;
        if (!req.body)
            return res.status(400).json({ error: "Request body is required" });
        let { brand_name } = req.body;
        if (!brand_name)
            return res.status(400).json({ error: "Brand_name is required" });
        try {
            let brand = {
                brand_id: Number(brandid),
                brand_name,
                updated_at: new Date
            };
            const result = await brand_helper_1.BrandHelper.updateBrand(brand);
            res.status(200).json({ data: result });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async getBrand(req, res, next) {
        const { brandid } = req.params;
        try {
            const brand = await brand_helper_1.BrandHelper.getBrand({ brand_id: brandid });
            res.status(200).json({ data: brand });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async getBrands(req, res, next) {
        try {
            const brand = await brand_helper_1.BrandHelper.getBrands({});
            res.status(200).json({ data: brand });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async deleteBrand(req, res, next) {
        const { brandid } = req.params;
        try {
            const category = await brand_helper_1.BrandHelper.deleteBrand(parseInt(brandid));
            res.status(200).json({ data: category });
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.BrandController = BrandController;
