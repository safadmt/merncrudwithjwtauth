import express from 'express'
const router = express.Router();
import productControllers from '../controllers/productControllers.js'
import { uploadProductImage } from '../middleware/multer.js';
const upload = uploadProductImage()

router.post('/add',upload, productControllers.addProduct)
router.get('/all', productControllers.getProducts)
router.get('/:productid', productControllers.getOneProduct)
router.delete('/:productid', productControllers.deleteOneProduct)
router.patch('/:productid',upload, productControllers.updateOneProduct)

export default router;