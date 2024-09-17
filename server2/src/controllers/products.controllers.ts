import { Response, Request, NextFunction } from "express";
import { ProductHelper } from "../helper/products.helper";
import cloudinary from "../utils/cloudinary";
import { ProductSchema } from "../validators/productSchema";
import z, { string } from 'zod'
import { Product } from "../interfaces/Product.interface";
import { Prisma } from "@prisma/client";
export class ProductController {
    static async createProduct (req: Request, res: Response,next:NextFunction) {
        if(!req.body) return res.status(400).json({error: "Request body not found"})
        const files = req.files as Express.Multer.File[]
        let {product_name, price, stock_available, brand_id, category_id,description} = req.body
        const pr_info : Product = {
            product_name:product_name,
            price: parseInt(price),
            stock_available : parseInt(stock_available),
            brand_id : parseInt(brand_id),
            category_id : parseInt(category_id),
            description,
            created_by : parseInt(req.user.id),
            deleted : false,
            created_at : new Date()
        }
        try{
            const result = ProductSchema.parse(pr_info)
            const response = await ProductHelper.createProduct(pr_info)
            
            const imgfiles = files.map((item:any)=> {
                return cloudinary.uploader.upload(item.path, {
                    folder: "crudauthproject/product_images"
                });
            })
            const uploadresult = await Promise.all(imgfiles)
            
            const uplodimageUrl = uploadresult.map(item=> {
                return ProductHelper.insertProductImage({product_id: response.product_id,
                     image_url: item.url,cloudinary_asset_id:item.public_id})
            })
            await Promise.all(uplodimageUrl)
            res.status(201).json({data: "success"})
        }catch(err) {
            if(err instanceof z.ZodError) {
                return res.status(400).json({error: err.issues.map(item=> {
                    return `${item.message} at ${item.path.join(" ")}`
               })})
                
            }else if (err instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (err.code === 'P2002') {
                  return res.status(400).json({error:"The provided product name is already created."})
                }
            }else {
                next(err)
            }
            
        }
    }

    static async getProducts (req: Request, res: Response, next:NextFunction) {
        try{
            const products = await ProductHelper.getProducts({})
            res.status(200).json({data: products})
        }catch(err : any) { 
            next(err)
        }
    }

    static async getProduct (req: Request, res: Response, next:NextFunction) {
        const {productid} = req.params
        try{
            const product = await ProductHelper.getProduct({product_id: parseInt(productid)})
            res.status(200).json({data: product})
        }catch(err : any) { 
            next(err)
        }
    }

    static async updateProductDetails (req:Request, res:Response, next:NextFunction) {
        console.log("updateproduct",req.body);
        
        if(!req.body) return res.status(400).json({error: "Request body not found"})
        const {productid} = req.params
        try{
            const pr_info = ProductSchema.parse(req.body)
            
            const response = await ProductHelper.updateProduct({...req.body, product_id: parseInt(productid)})
            res.status(200).json({data: response})
        }catch(err:any) {
            if(err instanceof z.ZodError) {
                let validerr = err.issues.map(issue=> {
                    return {message: `${issue.message} at ${issue.path.join(" ")}`}
                })

                return res.status(400).json({error: validerr})
            }else if (err instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (err.code === 'P2002') {
                  return res.status(400).json({error:"The provided product name is already exist."})
                }
            }else {
                next(err)
            }
        }
    } 

    static async updateProductImages (req:Request, res:Response, next:NextFunction) {
        if(!req.files || req.files.length === 0) return res.status(400).json({error: "files not found"})
        let productid = parseInt(req.params.productid)
        
        const files = req.files as Express.Multer.File[]
        try{
            let images = files.map(item=> {
                return cloudinary.uploader.upload(item.path, {folder: "crudauthproject/product_images"})
            })
            const new_product_images = await Promise.all(images)
            const prevImageDetails = await ProductHelper.getProductImages({product_id : productid})
            let cloudinary_public_ids = prevImageDetails.map(item=> {
                return item.cloudinary_public_id
            })
            await cloudinary.api.delete_resources(cloudinary_public_ids)
            await ProductHelper.deleteProductImages(productid)
            const newProductImages = new_product_images.map(item=> {
                return ProductHelper.insertProductImage({product_id: productid,
                        image_url: item.url,cloudinary_asset_id:item.public_id})
                
            })
            let insertedImages = await Promise.all(newProductImages)
            res.status(200).json({data: insertedImages})
        }catch(err:any) {
            res.status(500).json(
                {
                    error: 'Failed to updating the product ', 
                    details: err.message || "Unknown error occured"
                })
            
        }
    } 

    static async search (req:Request, res: Response,next: NextFunction) {
        if(!req.body.search) return res.status(400).json({error: "Search Term not found"})
        try{
            const searchResult = await ProductHelper.productSearch(req.body.search)
            res.status(200).json({data: searchResult})
        }catch(err) {
            next(err)
            
        }
    }

    static async deleteOne (req:Request, res: Response,next: NextFunction) {
        const productid = parseInt(req.params.productid)
        try{
            await ProductHelper.deleteProduct(productid)
            res.status(200).json({data: "success"})
        }catch(err) {
            next(err)
            
        }
    }
}