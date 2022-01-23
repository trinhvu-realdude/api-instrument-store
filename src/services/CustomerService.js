const db = require("../../models");
const Customer = db.User;

exports.getAllCustomer = () => Customer.findAll({
    attributes: [
        "id",
        "user_name",
        "first_name",
        "last_name",
        "email",
        "phone",
        "province",
        "image",
    ],
    where: {
        role_id: 2
    }
});
