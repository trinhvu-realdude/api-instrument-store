const authService = require("../services/AuthService");
const jwtHelper = require("../helpers/JwtHelper");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.isAdmin = (roleArray) => async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        try {
            const decodeToken = await jwtHelper.verifyToken(token, accessTokenSecret);

            req.decodeToken = decodeToken;

            const role = await authService.getRole(decodeToken.role_id);

            if (role.name === roleArray[0]) {
                return next();
            }
        } catch (error) {
            return res.status(401).send({msg: "Unauthorized"});
        }
    } else {
        return res.status(403).send({msg: "No token provided"});
    }
};

exports.isCustomer = (roleArray) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (token) {
            const decodeToken = await jwtHelper.verifyToken(token, accessTokenSecret);

            req.decodeToken = decodeToken;

            const role = await authService.getRole(decodeToken.role_id);

            if (role.name === roleArray[1]) {
                return next();
            }
        } else {
            return res.status(403).send({msg: "No token provided"});
        }
    } catch (error) {
        return res.status(401).send({msg: "Unauthorized"});
    }
};
