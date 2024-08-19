import express from 'express'
import userControllers from '../controllers/userControllers.js';
import loginLimit from '../middleware/login-rate-limit.js';
const router = express.Router();
import jwtVerify from '../middleware/jwtVerify.js';


router.get('/all', userControllers.getAllUser)
router.get("/:userid", userControllers.getOneUser);
router.delete('/:userid',jwtVerify, userControllers.deleteOneUser)
router.patch('/:userid',jwtVerify, userControllers.updateUser)
export default router