const AuthController = require("../controllers/AuthController");
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const router = require("express").Router();

module.exports = app => {

    router.post("/register", AuthController.register);

    router.post("/login", AuthController.login);

    router.post("/refresh-token", AuthController.refreshToken);

    router.post("/forgot-password", AuthController.forgotPassword);

    router.patch("/reset-password/:id", AuthController.resetPassword);

    return app.use("/api/v1", router);
}
