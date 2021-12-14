const jwt = require("jsonwebtoken");

exports.generateToken = async (userData, secretKey, tokenLife) => {
    const token = jwt.sign(userData, secretKey, {
        algorithm: "HS256",
        expiresIn: tokenLife
    });

    return token;
};

exports.verifyToken = async (token, secretKey) => {
    const decoded = await jwt.verify(token, secretKey);

    return decoded;
};