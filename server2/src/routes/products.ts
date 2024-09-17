import express, { Request, Response } from 'express'
import { uploadProductImage } from '../middleware/multer';
import { authAdmin, authUser, verifyToken } from '../middleware/verifyToken';
import { ProductController } from '../controllers/products.controllers';
const router = express.Router();
const upload = uploadProductImage()
router.use(verifyToken)
router.post('/create',authAdmin, upload, ProductController.createProduct)
router.get('/',authAdmin, ProductController.getProducts)
router.get('/:productid', ProductController.getProduct)
router.put('/details/:productid',authAdmin, ProductController.updateProductDetails)
router.put('/images/:productid',authAdmin,upload, ProductController.updateProductImages)
router.post('/search', authAdmin, ProductController.search)
router.delete('/:productid', authAdmin, ProductController.deleteOne)
export default router;