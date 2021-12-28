const AuthMiddleWare = require("../middleware/AuthMiddleware");
const ItemController = require("../controllers/ItemController");
const router = require("express").Router();

// multer to upload public file
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.split("/")[0] !== "image") {
            return cb(new Error("Invalid file type"));
        }
        cb(null, "./public/product/item");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});


module.exports = app => {

    router.get("/", ItemController.getAllItem);

    router.get("/instrument", ItemController.getItemByInstrument);

    router.post("/upload", AuthMiddleWare.isAdmin(["Admin", "Customer"]), upload.single("image"), ItemController.addItem);

    return app.use("/api/v1/item", router);
}
