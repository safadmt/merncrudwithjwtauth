"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_controller_1 = require("../controllers/category.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', category_controller_1.CategoryController.getCategories);
router.get('/:categoryid', category_controller_1.CategoryController.getCategory);
router.delete('/:categoryid', category_controller_1.CategoryController.deleteCategory);
router.post('/create', category_controller_1.CategoryController.createCategory);
router.patch('/update/categoryid', category_controller_1.CategoryController.updateCategory);
exports.default = router;
