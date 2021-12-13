const db = require("../../models");
const User = db.User;

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