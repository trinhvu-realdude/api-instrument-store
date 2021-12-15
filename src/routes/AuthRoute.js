const AuthController = require("../controllers/AuthController");
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const router = require("express").Router();

module.exports = app => {

    router.post("/register", AuthController.register);

    router.post("/login", AuthController.login);

    router.post("/refresh-token", AuthController.refreshToken);

    router.use(AuthMiddleWare.isCustomer(["Admin", "Customer"]));

    router.get("/test", AuthController.testCustomer);

    return app.use('/v1/api', router);
}
