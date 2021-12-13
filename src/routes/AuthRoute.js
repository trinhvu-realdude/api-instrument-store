const AuthController = require("../controllers/AuthController");
const router = require("express").Router();

module.exports = app => {

    router.post("/register", AuthController.register);

    router.post("/login", AuthController.login);

    app.use('/v1/api', router);
}
