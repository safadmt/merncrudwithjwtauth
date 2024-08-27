import express from 'express'
import userControllers from '../controllers/userControllers.js'
import { verifyAdmin } from '../middleware/jwtVerify.js';
const router = express.Router()

router.post('/login', userControllers.userLogin);

router.post('/signup', userControllers.userSignup);

router.get('/admin', verifyAdmin, userControllers.isAuthorize)
router.get('/logout', userControllers.logout);

export default router