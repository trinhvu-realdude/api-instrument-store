const AuthMiddleWare = require("../middleware/AuthMiddleware");
const UserController = require("../controllers/UserController");
const router = require("express").Router();

module.exports = app => {

    router.get("/:user_id", AuthMiddleWare.isCustomer(["Admin", "Customer"]), UserController.getProfile);

    router.get("/admin/:user_id", AuthMiddleWare.isAdmin(["Admin", "Customer"]), UserController.getProfile);

    return app.use("/api/v1/profile", router);
}