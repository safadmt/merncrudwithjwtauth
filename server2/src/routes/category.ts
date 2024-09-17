import { CategoryController } from "../controllers/category.controller";
import express from 'express'
import { authAdmin, verifyToken } from "../middleware/verifyToken";
const router = express.Router();
router.use(verifyToken)
router.use(authAdmin)

router.get('/', CategoryController.getCategories)
router.get('/:categoryid', CategoryController.getCategory)
router.delete('/:categoryid', CategoryController.deleteCategory)
router.post('/create', CategoryController.createCategory)
router.put('/update/:categoryid', CategoryController.updateCategory)

export default router;