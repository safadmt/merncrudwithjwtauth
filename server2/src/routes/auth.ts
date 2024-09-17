import express from 'express'
import { AuthController } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/verifyToken';
const router = express.Router();

router.post('/admin/signup', AuthController.adminSignup)
router.post('/user/signup', AuthController.userSignup)
router.post('/admin/login', AuthController.adminLogin)
router.post('/user/login', AuthController.userLogin)
router.get('/logout',verifyToken, AuthController.logout)

export default router;