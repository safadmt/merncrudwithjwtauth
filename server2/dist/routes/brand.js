"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controllers_1 = require("../controllers/brand.controllers");
const router = express_1.default.Router();
router.get('/', brand_controllers_1.BrandController.getBrands);
router.get('/:brandid', brand_controllers_1.BrandController.getBrand);
router.delete('/:brandid', brand_controllers_1.BrandController.deleteBrand);
router.post('/create', brand_controllers_1.BrandController.createBrand);
router.patch('/update/brandid', brand_controllers_1.BrandController.updateBrand);
exports.default = router;
