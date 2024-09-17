import { error } from 'console';
import multer from 'multer'

function uploadProductImage() {
    const storage = multer.diskStorage({
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
  
    const upload = multer({
      limits: { fileSize: 2624000 },
      storage: storage,
      fileFilter: function (req, file, cb) {
        // Allow only image files with specific extensions
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|avif|jfif)$/)) {
          return cb(new Error("Only image files are allowed!") as any, false);
        }
  
        cb(null, true); // Accept the file
      },
    });
  
    return (req:any, res:any, next:any) => {
      upload.array("image", 5)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: "File size too large. Maximum allowed size is 1.5MB per file." });
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ error: "Too many files. Maximum 5 files are allowed." });
          }
          
          res.status(400).json({error:err.message});
        } else if(err) {
          console.log(err.message);
          
          res.status(400).json({error:err.message});
        } else {
          next();
        }
      });
    };
  }
  
  export { uploadProductImage };
  