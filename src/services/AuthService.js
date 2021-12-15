const db = require("../../models");
const User = db.User;
const Role = db.Role;

exports.checkEmail = (email) => User.findOne({
    where: {
        email: email
    }
});

exports.checkUsername = (username) => User.findOne({
    where: {
        userName: username
    }
});

exports.registerUser = (user) => User.create({
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    province: user.province,
    email: user.email,
    password: user.password,
    roleId: 2
});

exports.updateRefreshToken = (refreshToken, id) => User.update({
    refreshToken: refreshToken
}, {
    where: {
        id: id
    }
});

exports.getRole = (roleId) => Role.findByPk(roleId, {attributes: ["name"]});
