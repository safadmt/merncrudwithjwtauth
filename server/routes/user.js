import express from 'express'
import userControllers from '../controllers/userControllers.js';
import loginLimit from '../middleware/login-rate-limit.js';
const router = express.Router();
import { verfiyUser, checkRole } from '../middleware/jwtVerify.js';


router.get('/all',verfiyUser,checkRole('admin'), userControllers.getAllUser)
router.get("/:userid", userControllers.getOneUser);
router.delete('/:userid',verfiyUser,checkRole('admin'), userControllers.deleteOneUser)
router.patch('/:userid',verfiyUser,checkRole('admin'), userControllers.updateUser)

export default router