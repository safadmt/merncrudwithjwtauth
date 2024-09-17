import { PrismaClient } from "@prisma/client"
const Prisma = new PrismaClient()
import { Category } from "../interfaces/Category.inteface"


export class CategoryHelper {
    static async createCategory (info : Category)  {
        let response = await Prisma.categories.create({
            data : {
                category_name:info.category_name,
                created_at : info.created_at
            }
        })
        return response
    }

    static async getCategories (info: object) : Promise<any> {
        let response = await Prisma.categories.findMany({
            where: info,
            orderBy: {
                category_id: "desc"
            }
        })
        return response
    }

    static async getCategory (info:object)  {
        let response = await Prisma.categories.findFirst({
            where: info
        })
        return response
    }

    static async updateCategory (info : Category) {
        let response = await Prisma.categories.update({
            where : {category_id: info.category_id},
            data : {
                category_name:info.category_name,
                updated_at : info.updated_at
            }
        })
        return response
    }

    static async deleteCategory (category_id : number) {
        let response = await Prisma.categories.delete({
            where : {category_id:category_id}
        })
        return response
    }
}