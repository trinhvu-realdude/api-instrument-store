const jwt = require("jsonwebtoken");

exports.generateToken = async (userData, secretKey, tokenLife) => jwt.sign(userData, secretKey, {
    algorithm: "HS256",
    expiresIn: tokenLife
});

exports.verifyToken = async (token, secretKey) => jwt.verify(token, secretKey);
