const authService = require("../services/AuthService");
const jwtHelper = require("../helpers/JwtHelper");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.isAdmin = (roleArray) => async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        try {
            const decodeToken = await jwtHelper.verifyToken(token, accessTokenSecret);

            req.decodeToken = decodeToken;

            const role = await authService.getRole(decodeToken.roleId);

            if (role.name === roleArray[0]) {
                next();
            }
        } catch (error) {
            return res.status(401).json({msg: "Unauthorized"});
        }
    } else {
        return res.status(403).send({msg: "No token provided"});
    }
};

exports.isCustomer = (roleArray) => async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        try {
            const decodeToken = await jwtHelper.verifyToken(token, accessTokenSecret);

            req.decodeToken = decodeToken;

            const role = await authService.getRole(decodeToken.roleId);

            if (role.name === roleArray[1]) {
                next();
            }
        } catch (error) {
            return res.status(401).json({msg: "Unauthorized"});
        }
    } else {
        return res.status(403).send({msg: "No token provided"});
    }
};
