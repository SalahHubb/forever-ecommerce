import multer from "multer";
import path from "node:path";

// the role of multer: to handle multipart/form-data, which is primarily used for uploading files. > Temporarily store the files on the server's disk storage(folder) or memory storage(built in option to store temporarily as a buffer). > Provide access to the uploaded files via req.file or req.files in the route handlers.  
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
