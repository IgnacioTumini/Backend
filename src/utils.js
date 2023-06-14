import { fileURLToPath } from "url";
import { dirname } from "path";
//import multer, { Multer } from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images");
    console.log("ubicacion: " + cb);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
