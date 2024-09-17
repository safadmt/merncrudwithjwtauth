import { Response, Request, NextFunction } from "express";
import { CategoryHelper } from "../helper/category.helper";
import { Category } from "../interfaces/Category.inteface";
import { Prisma } from "@prisma/client";

export class CategoryController {
    static async createCategory (req:Request, res:Response,next: NextFunction) {
        if(!req.body) return res.status(400).json({error: "Request body is required"})
        let {category_name} = req.body
        if(!category_name) return res.status(400).json({error: "Category_name is required"})

        try {
            let isCategoryExist = await CategoryHelper.getCategory({category_name})
            if(isCategoryExist) return res.status(409).json({error: "Category already created"})
            let category : Category = {category_name, created_at : new Date}
            const newcategory = await CategoryHelper.createCategory(category)
            res.status(201).json({data: newcategory})
        }catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (err.code === 'P2002') {
                  return res.status(400).json({error:"The provided category name is already created."})
                }
            }else {
                next(err)
            }
            
        }
    }

    static async updateCategory (req:Request, res:Response,next: NextFunction) {
        const {categoryid} = req.params
        console.log(req.body);
        
        if(!req.body) return res.status(400).json({error: "Request body is required"})
        let {category_name} = req.body
        if(!category_name) return res.status(400).json({error: "Category_name is required"})
        try{
        let isCategoryExist = await CategoryHelper.getCategory({category_name})
        console.log(isCategoryExist);
        
        if(isCategoryExist) return res.status(409).json({error: "Category already exist"})
        let category : Category = {
            category_id: Number(categoryid),
            category_name, 
            updated_at : new Date
        }
        const result = await CategoryHelper.updateCategory(category)
        res.status(200).json({data: result})
        }catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (err.code === 'P2002') {
                  return res.status(400).json({error:"The provided brand name is already exist."})
                }
            }else {
                next(err)
            }
            
        }
    }

    static async getCategory (req:Request, res: Response, next: NextFunction) {
        const {categoryid} = req.params;
        try{
            const category = await CategoryHelper.getCategory({category_id: parseInt(categoryid)})
            res.status(200).json({data: category})
        }catch(err) {
            next(err)
            
        }
        
    }

    static async getCategories (req:Request, res: Response, next: NextFunction) {
            try{
            const category = await CategoryHelper.getCategories({})
            res.status(200).json({data: category})
        }catch(err) {
           next(err)
        }
    }

    static async deleteCategory (req:Request, res: Response, next: NextFunction) {
        const {categoryid} = req.params;
        try{
            const category = await CategoryHelper.deleteCategory(parseInt(categoryid))
            res.status(200).json({data: category})
        }catch(err) {
            next(err)
            
        }
    }
}