import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";

function uploadProductImage() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + extname(file.originalname)
      );
    },
  });

  const upload = multer({
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
    upload.single("image", 1)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).json(err);
      } else if (err) {
        console.log(err);
        res.status(500).json("Something went wrong");
      } else {
        next();
      }
    });
  };
}

export { uploadProductImage };
