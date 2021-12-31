const db = require("../../models");
const User = db.User;
const Role = db.Role;

exports.checkEmail = (email) => User.findOne({
    where: {
        email: email
    }
});

exports.checkUsername = (user_name) => User.findOne({
    where: {
        user_name: user_name
    }
});

exports.checkUserById = (user_id) => User.findByPk(user_id);

exports.registerUser = (user) => User.create({
    user_name: user.user_name,
    first_name: user.first_name,
    last_name: user.last_name,
    province: user.province,
    email: user.email,
    password: user.password,
    role_id: 2
});

exports.updateRefreshToken = (token, id) => User.update({
    refresh_token: token
}, {
    where: {
        id: id
    }
});

exports.getRole = (id) => Role.findByPk(id, {attributes: ["name"]});
