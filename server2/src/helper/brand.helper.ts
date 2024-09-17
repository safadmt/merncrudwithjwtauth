import { PrismaClient } from "@prisma/client"
const Prisma = new PrismaClient()
import { Brand } from "../interfaces/Brand.interface"

export class BrandHelper {
    static async createBrand (info : Brand) {
        let response = await Prisma.brands.create({
            data: {
                brand_name: info.brand_name as string,
            }
        })
        return response
    }

    static async updateBrand (brand_name:string,brand_id:number):Promise<object> {
        
        let response = await Prisma.brands.update({
            where : {brand_id : brand_id},
            data: {
                brand_name: brand_name as string,
                updated_at : new Date()
            }
        })
        return response
    }

    static async deleteBrand (brandid:number) : Promise<object> {
        let response = await Prisma.brands.delete({
            where : {brand_id   : brandid}
        })
        return response
    }

    static async getBrands (info: object) {
        let response = await Prisma.brands.findMany({
            where: info,
            orderBy : {
                brand_id : "desc"
            }
        })
        return response
    }

    static async getBrand (info: object) {
        let response = await Prisma.brands.findFirst({
            where: info
        })
        return response
    }

    
}