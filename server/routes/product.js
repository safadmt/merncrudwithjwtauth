import express from 'express'
const router = express.Router();
import productControllers from '../controllers/productControllers.js'
import { uploadProductImage } from '../middleware/multer.js';
import { verfiyUser,checkRole } from '../middleware/jwtVerify.js';
const upload = uploadProductImage()

router.post('/add',verfiyUser, checkRole('admin'), upload, productControllers.addProduct)
router.get('/all',verfiyUser,checkRole('user'),  productControllers.getProducts)
router.get('/admin/all',verfiyUser,checkRole('admin'), productControllers.getProducts)
router.get('/:productid', productControllers.getOneProduct)
router.delete('/:productid',verfiyUser,checkRole('admin'), productControllers.deleteOneProduct)
router.patch('/:productid',verfiyUser,checkRole('admin'),upload, productControllers.updateOneProduct)
router.post('/search', verfiyUser,checkRole('admin'), productControllers.searchProduct)

export default router;