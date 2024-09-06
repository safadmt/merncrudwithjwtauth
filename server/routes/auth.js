import express from 'express'
import userControllers from '../controllers/userControllers.js'
import { checkRole, verfiyUser } from '../middleware/jwtVerify.js';
const router = express.Router()

router.post('/login', userControllers.userLogin);

router.post('/signup', userControllers.userSignup);

router.get('/admin',verfiyUser, checkRole("admin") , userControllers.isAuthorize)
router.get('/logout', userControllers.logout);

export default router