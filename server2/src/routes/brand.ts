import express from 'express'
import { BrandController } from '../controllers/brand.controllers';
import { authAdmin, verifyToken } from '../middleware/verifyToken';
const router = express.Router();
router.use(verifyToken)
router.use(authAdmin)

router.put('/update/:brandid', BrandController.updateBrand)
router.get('/', BrandController.getBrands)
router.get('/:brandid', BrandController.getBrand)
router.delete('/:brandid', BrandController.deleteBrand)
router.post('/create', BrandController.createBrand)


export default router;