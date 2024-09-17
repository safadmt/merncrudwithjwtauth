import { Response, Request, NextFunction } from "express";
import { BrandHelper } from "../helper/brand.helper";
import { Brand } from "../interfaces/Brand.interface";
import { Prisma } from "@prisma/client";

export class BrandController {
    static async createBrand (req:Request, res: Response, next: NextFunction) {
        if(!req.body) return res.status(400).json({error: "Request body is required"})
            let {brand_name} = req.body
            if(!brand_name) return res.status(400).json({error: "brand_name is required"})
                
            try {
                let isBrandExist = await BrandHelper.getBrand({brand_name:brand_name})
                if(isBrandExist) return res.status(409).json({error: `${brand_name} already created`})
                let brand : Brand = {brand_name, created_at : new Date}
                const newbrand = await BrandHelper.createBrand(brand)
                res.status(201).json({data: newbrand})
            }catch(err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    // The .code property can be accessed in a type-safe manner
                    if (err.code === 'P2002') {
                      return res.status(400).json({error:"The provided brand name is already created."})
                    }
                }else {
                    next(err)
                }
            }
    }

    static async updateBrand (req:Request, res:Response,next: NextFunction) {
        const {brandid} = req.params        
        if(!req.body) return res.status(400).json({error: "Request body is required"})
        
        let {brand_name} = req.body
        if(!brand_name) return res.status(400).json({error: "Brand_name is required"})
        try{
        let isBrandExist = await BrandHelper.getBrand({brand_name:brand_name})
        
        if(isBrandExist) {
            return res.status(409).json({error: `${brand_name} already exist`})
        }
        const result = await BrandHelper.updateBrand(brand_name, parseInt(brandid))
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

    static async getBrand (req:Request, res: Response, next: NextFunction) {
        const {brandid} = req.params;
        try{
            const brand = await BrandHelper.getBrand({brand_id: parseInt(brandid)})
            res.status(200).json({data: brand})
        }catch(err) {
            next(err)
        }
        
    }

    static async getBrands (req:Request, res: Response, next: NextFunction) {
        try{
            const brands = await BrandHelper.getBrands({})
            res.status(200).json({data: brands})
        }catch(err) {
            next(err)
        }
    }

    static async deleteBrand (req:Request, res: Response, next: NextFunction) {
        const {brandid} = req.params;
        try{
            const category = await BrandHelper.deleteBrand(parseInt(brandid))
            res.status(200).json({data: category})
        }catch(err) {
            next(err)
        }
    }
}