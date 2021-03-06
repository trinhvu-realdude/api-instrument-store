const AuthMiddleWare = require("../middleware/AuthMiddleware");
const CategoryController = require("../controllers/CategoryController");
const router = require("express").Router();

// multer to upload public file
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.split("/")[0] !== "image") {
            return cb(new Error("Invalid file type"));
        }
        cb(null, "./public/product/category");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});


module.exports = app => {

    router.get("/", CategoryController.getAllCategory);

    router.post("/upload", AuthMiddleWare.isAdmin(["Admin", "Customer"]), upload.single("image"), CategoryController.addCategory);

    return app.use("/api/v1/category", router);
}
