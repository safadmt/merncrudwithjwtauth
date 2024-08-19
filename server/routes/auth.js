import express from 'express'
import userControllers from '../controllers/userControllers.js'
const router = express.Router()

router.post('/login', userControllers.userLogin);

router.post('/admin/signup', userControllers.adminSignup)
router.post('/signup', userControllers.userSignup);

router.get('/refresh', userControllers.refreshToken)

router.post('/logout', userControllers.logout);

export default router