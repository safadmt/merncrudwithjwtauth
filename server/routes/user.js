import express from 'express'
import userControllers from '../controllers/userControllers.js';
import loginLimit from '../middleware/login-rate-limit.js';
const router = express.Router();
import { verfiyUser, verifyAdmin } from '../middleware/jwtVerify.js';


router.get('/all',verifyAdmin, userControllers.getAllUser)
router.get("/:userid", userControllers.getOneUser);
router.delete('/:userid',verifyAdmin, userControllers.deleteOneUser)
router.patch('/:userid',verifyAdmin, userControllers.updateUser)

export default router