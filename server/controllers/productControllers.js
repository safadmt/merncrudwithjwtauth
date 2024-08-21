import productHelpers from "../helpers/productHelper.js";
import { Product } from "../validator/validation.js";
import {unlink} from 'fs/promises'
export default {
  addProduct: async function (req, res,next) {
    console.log("req.body", req.body)
    try {
        
        console.log(req.file);
        
      req.body.image_id = req.file.filename;
      const { error } = Product.validate(req.body);
      if (error) {
        return res.status(400).json({ valiationError: error });
      }
      req.body.price = parseInt(req.body.price)
      const product = await productHelpers.createProduct(req.body);
      return res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  },

  getProducts : async function (req,res) {
    try{
      const products = await productHelpers.listAllProducts()
      res.status(200).json(products)
    }catch(err) {
      console.log(err);
      
    }
  },

  updateOneProduct : async function (req,res) {
    if(!req.params.productid) return res.status(404).json("Params not found")
    if(!req.body ) {
      return res.status(400).json("Request body not found")
    }
    if(req.body.price) {
        req.body.price = parseInt(req.body.price)
    }
    let  {productid} = req.params
    
    console.log("body",req.body);
    productid = parseInt(productid)
    
    if(req.file) {
      
      const product = await productHelpers.getOneProduct(productid)
      if(!product) return res.status(404).json({error: "product not found"})
      unlink(`./public/images/${product.image_id}`, (err)=> {
        if(err) throw err;
      })
      
      req.body.image_id = req.file.filename;
      const updated = await productHelpers.updateProduct(productid,req.body)
      console.log(updated);
      return res.status(200).json("success")
    }else{
      let {name, price, model,description} = req.body
      const updated = await productHelpers.updateProduct(productid,{name,price,model,description})
      console.log(updated);
      if(updated) {
        return res.status(200).json('success')
      }
    }
  },

  deleteOneProduct : async function (req,res) {
    const {productid} = req.params
    try{
      const response = await productHelpers.deleteOneProduct(parseInt(productid))
      await unlink(`./public/images/${response.image_id}`)
      return res.status(200).json("deleted successfully")
    }catch(err) {
      
      console.log(err);
    }
  },

  getOneProduct : async function (req,res) {
    const {productid} = req.params;
    try{
      const product = await productHelpers.getOneProduct(parseInt(productid))
      return res.status(200).json(product)
    }catch(err) {
      console.log(err);
      
    }
  }
};
