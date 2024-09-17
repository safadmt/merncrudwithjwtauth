import express from 'express'
import { UserController } from '../controllers/user.controllers';
import { authAdmin, authUser, verifyToken } from '../middleware/verifyToken';
import { ProductController } from '../controllers/products.controllers';
const router = express.Router();
router.use(verifyToken)

router.get('/products', authUser, ProductController.getProducts)
router.get('/', authAdmin, UserController.getUsers)
router.get('/:userid',authUser, UserController.getUser)
router.delete('/:userid', authAdmin, UserController.deleteUser)
router.put('/:userid', authAdmin, UserController.updateUser)
export default router;