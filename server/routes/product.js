import express from 'express'
const router = express.Router();
import productControllers from '../controllers/productControllers.js'
import { uploadProductImage } from '../middleware/multer.js';
import { verfiyUser, verifyAdmin } from '../middleware/jwtVerify.js';
const upload = uploadProductImage()

router.post('/add',verifyAdmin, upload, productControllers.addProduct)
router.get('/all',verfiyUser, productControllers.getProducts)
router.get('/admin/all',verifyAdmin, productControllers.getProducts)
router.get('/:productid', productControllers.getOneProduct)
router.delete('/:productid',verifyAdmin, productControllers.deleteOneProduct)
router.patch('/:productid',verifyAdmin,upload, productControllers.updateOneProduct)

export default router;