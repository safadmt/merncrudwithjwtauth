import { PrismaClient } from "@prisma/client";
import { ProductImage } from "../interfaces/Productimages.interface";
import { Product } from "../interfaces/Product.interface";
const Prisma = new PrismaClient()

export class ProductHelper{

    static async insertProductImage (info : ProductImage) : Promise<object> {
        let response = await Prisma.product_images.create({
            data : {
                product_id: info.product_id,
                cloudinary_public_id : info.cloudinary_asset_id,
                image_url : info.image_url,
                created_at : new Date()
            }
        })
        return response
    }

    static async getProducts (info : object) : Promise<object> {
        let response = await Prisma.products.findMany({
            include: {
                brand: {
                    select : {
                        brand_name : true
                    }
                },
                category: {
                    select : {
                        category_name : true
                    }
                },
                images : {
                    select : {
                        cloudinary_public_id: true,
                        image_url : true
                    }
                },
                admin : {
                    select: {
                        username:true
                    }
                }
            },
            orderBy: {
                product_id: 'desc'
              }
        })
        return response
    }

    static async createProduct (info : Product) : Promise<any> {
        let response = await Prisma.products.create({
            data : {
                product_name : info.product_name,
                description : info.description,
                price : info.price,
                stock_available : info.stock_available,
                brand_id : info.brand_id,
                category_id : info.category_id,
                deleted : info.deleted,
                created_by : info.created_by,
                created_at : info.created_at
            }
        })
        return response
    }

    static async updateProduct (info : Product):Promise<any>   {
        let response = await Prisma.products.update({
            where: {product_id: info.product_id},
            data : {
                product_name : info.product_name,
                description : info.description,
                price : info.price,
                stock_available : info.stock_available,
                brand_id : info.brand_id,
                category_id : info.category_id,
                updated_at : info.updated_at
            }
        })
        return response
    }

    static async getProduct (info: any) {
        let response = await Prisma.products.findUnique({
           where : {product_id: info.product_id,deleted : false },
           include: {
                brand: {
                    select : {
                        brand_id:true,
                        brand_name : true
                    }
                },
                category: {
                    select : {
                        category_id:true,
                        category_name : true
                    }
                },
                images : {
                    select : {
                        cloudinary_public_id: true,
                        image_url : true
                    }
                },
                admin : {
                    select: {
                        username:true
                    }
                },
            }
        
        })
        
        return response
    }

    static async deleteProduct (product_id: number) {
        let response = await Prisma.products.update({
           where : {deleted : false , product_id: product_id},
           data: {
            deleted:true
           }
        })
        return response
    }

    static async updateProductImage (info : ProductImage) : Promise<any> {
        let response = await Prisma.product_images.update({
            where : {image_id: info.image_id},
            data: {
                image_url : info.image_url}
        })
        return response
    }

    static async getProductImages  (info : object) {
        const images = await Prisma.product_images.findMany({
            where: info
        })
        return images
    }
    static async deleteProductImages (product_id : number)  {
        const result = Prisma.product_images.deleteMany({
            where: {product_id : product_id}
        })
        return result
    }

    static async productSearch (query : string) {
        const products = await Prisma.products.findMany({
            where: {
              deleted : false,
              OR: [
                {
                  product_name: {
                    contains: query, 
                    mode: 'insensitive', 
                  },
                },
                {
                  category: {
                    category_name : {
                        contains: query, 
                        mode: 'insensitive', 
                    }
                    
                  },
                },
                {
                  description: {
                    contains: query, 
                    mode: 'insensitive',
                  },
                },
                {
                    brand:{
                        brand_name: {
                            contains: query,
                            mode:'insensitive'
                        }
                    }
                }
              ]
            },
            include: {
                brand: {
                    select : {
                        brand_id:true,
                        brand_name : true
                    }
                },
                category: {
                    select : {
                        category_id:true,
                        category_name : true
                    }
                },
                images : {
                    select : {
                        cloudinary_public_id: true,
                        image_url : true
                    }
                },
                admin : {
                    select: {
                        username:true
                    }
                }
            },
            orderBy: {
                product_id: 'desc'
            }
          
        })
        return products
    }
}