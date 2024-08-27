import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export default {
  createProduct : async function(productInfo) {
    
        const product = await prisma.products.create({
          data : productInfo
        })
        return product
},

listAllProducts:async function() {
    const products = await prisma.products.findMany({
      where: {
        deleted:false
      },
      orderBy: {
        product_id: 'desc'
      }
    })
    return products
},



deleteOneProduct: async function(productid) {
 
    const response = await prisma.products.update({
      where : {
          product_id : productid, 
      },
      data: {
        deleted: true
      }
    })
    return response
},
search: async function(query) {
  const product = await prisma.products.findMany({
    where: {
      deleted : false,
      OR: [
        {
          name: {
            contains: query, 
            mode: 'insensitive', 
          },
        },
        {
          name: {
            contains: query, 
            mode: 'insensitive', 
          },
        },
        {
          description: {
            contains: query, 
            mode: 'insensitive',
          },
        }
      ]
    }
  
  })
  return product
},
updateProduct : async function (id, productInfo) {
  console.log(productInfo);
  
  const product = await prisma.products.update({
    where : {
      product_id : id
    },
    data : productInfo
  })
  return product
},

getOneProduct : async function (id) {
  const product = await prisma.products.findUnique({
    where : {
      product_id : id, deleted:false
    }
  })
  return product
}
//   deleteOneProduct(2)
}
// createProdu