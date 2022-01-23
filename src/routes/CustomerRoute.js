const AuthMiddleWare = require("../middleware/AuthMiddleware");
const CustomerController = require("../controllers/CustomerController");
const router = require("express").Router();

module.exports = app => {

    router.get("/", AuthMiddleWare.isAdmin(["Admin", "Customer"]), CustomerController.getAllCustomer);

    return app.use("/api/v1/customer", router);
}