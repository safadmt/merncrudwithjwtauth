"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middleware/multer");
const router = express_1.default.Router();
const upload = (0, multer_1.uploadProductImage)();
router.get('/', upload, (req, res) => {
    console.log(req.files);
});
// router.get('/:brandid', Product.getBrand)
// router.delete('/:brandid', Product.deleteBrand)
// router.post('/create', Product.createBrand)
// router.patch('/update/brandid', Product.updateBrand)
exports.default = router;
