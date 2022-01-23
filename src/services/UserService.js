const db = require("../../models");
const User = db.User;

exports.getProfile = (user_id) => User.findOne({
    attributes: [
        "id",
        "user_name",
        "first_name",
        "last_name",
        "email",
        "phone",
        "province",
        "image",
        "role_id"
    ],
    where: {
        id: user_id
    }
});