"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_helper_1 = require("../helper/category.helper");
class CategoryController {
    static async createCategory(req, res, next) {
        if (!req.body)
            return res.status(400).json({ error: "Request body is required" });
        let { category_name } = req.body;
        if (!category_name)
            return res.status(400).json({ error: "Category_name is required" });
        try {
            let isCategoryExist = await category_helper_1.CategoryHelper.getCategory({ category_name });
            if (isCategoryExist)
                return res.status(409).json({ error: "Category already created" });
            let category = { category_name, created_at: new Date };
            const newcategory = await category_helper_1.CategoryHelper.createCategory(category);
            res.status(201).json({ data: newcategory });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async updateCategory(req, res, next) {
        const { categoryid } = req.params;
        if (!req.body)
            return res.status(400).json({ error: "Request body is required" });
        let { category_name } = req.body;
        if (!category_name)
            return res.status(400).json({ error: "Category_name is required" });
        try {
            let category = {
                category_id: Number(categoryid),
                category_name,
                updated_at: new Date
            };
            const result = await category_helper_1.CategoryHelper.updateCategory(category);
            res.status(200).json({ data: result });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async getCategory(req, res, next) {
        const { categoryid } = req.params;
        try {
            const category = await category_helper_1.CategoryHelper.getCategory({ category_id: parseInt(categoryid) });
            res.status(200).json({ data: category });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async getCategories(req, res, next) {
        try {
            const category = await category_helper_1.CategoryHelper.getCategories({});
            res.status(200).json({ data: category });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async deleteCategory(req, res, next) {
        const { categoryid } = req.params;
        try {
            const category = await category_helper_1.CategoryHelper.deleteCategory(parseInt(categoryid));
            res.status(200).json({ data: category });
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.CategoryController = CategoryController;
