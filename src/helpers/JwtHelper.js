const jwt = require("jsonwebtoken");

const generateToken = async (user, secretKey, tokenLife) => {
    const userData = {
        name: user.name,
        email: user.email
    };

    const token = await jwt.sign(userData, secretKey, {
        algorithm: "HS256",
        expiresIn: tokenLife
    });

    return token;
}

const verifyToken = async (token, secretKey) => {
    const decoded = await jwt.verify(token, secretKey);

    return decoded;
}


module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
}