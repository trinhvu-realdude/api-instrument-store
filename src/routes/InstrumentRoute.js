const AuthMiddleWare = require("../middleware/AuthMiddleware");
const InstrumentController = require("../controllers/InstrumentController");
const router = require("express").Router();

// multer to upload public file
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.split("/")[0] !== "image") {
            return cb(new Error("Invalid file type"));
        }
        cb(null, "./public/product/instrument");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});


module.exports = app => {

    router.get("/", InstrumentController.getAllInstrument);

    router.get("/category", InstrumentController.getInstrumentByCategory);

    router.post("/upload", AuthMiddleWare.isAdmin(["Admin", "Customer"]), upload.single("image"), InstrumentController.addInstrument);

    return app.use("/api/v1/instrument", router);
}
