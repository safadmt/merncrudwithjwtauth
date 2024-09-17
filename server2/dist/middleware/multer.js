"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductImage = uploadProductImage;
const multer_1 = __importDefault(require("multer"));
function uploadProductImage() {
    const storage = multer_1.default.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });
    const upload = (0, multer_1.default)({
        limits: { fileSize: 1024000 },
        storage: storage,
        fileFilter: function (req, file, cb) {
            // Allow only image files with specific extensions
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return cb(new Error("Only image files are allowed!"), false);
            }
            cb(null, true); // Accept the file
        },
    });
    return (req, res, next) => {
        upload.array("image", 5)(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                res.status(400).json(err);
            }
            else if (err) {
                console.log(err);
                res.status(500).json("Something went wrong");
            }
            else {
                next();
            }
        });
    };
}
