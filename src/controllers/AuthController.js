const jwtHelper = require("../helpers/JwtHelper");
const authService = require("../services/AuthService");
const {hashPassword} = require("../common/hash");
const passport = require("passport");

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

exports.register = async (req, res) => {
    try {
        const checkEmail = await authService.checkEmail(req.body.email);
        const checkUsername = await authService.checkUsername(req.body.userName);
        if (checkEmail) {
            return res.status(403).send({msg: "Email already existed"});
        } else if (checkUsername) {
            return res.status(403).send({msg: "Username already existed"});
        } else {
            const {
                userName,
                firstName,
                lastName,
                province,
                email,
                password
            } = req.body;

            const hash = await hashPassword(password);

            const data = {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                province: province,
                email: email,
                password: hash
            };

            const user = await authService.registerUser(data);

            return res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.login = async (req, res, next) => {
    passport.authenticate("local-login", async (err, user) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(404).send("User doesn't exist");
            }

            const dataForToken = {
                _id: `159-357-10${
                    user.id - 1
                }`,
                userName: user.userName
            };

            const accessToken = await jwtHelper.generateToken(dataForToken, accessTokenSecret, accessTokenLife);

            let refreshToken = await jwtHelper.generateToken(dataForToken, refreshTokenSecret, refreshTokenLife);

            if (user.refreshToken === null) {
                await authService.updateRefreshToken(refreshToken, user.id);
            } else {
                refreshToken = user.refreshToken;
            }

            return res.status(200).json({
                msg: "Login successfully",
                accessToken,
                refreshToken,
                user: {
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    province: user.province,
                    image: user.image
                }
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    })(req, res, next);
};

exports.refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.body.refreshToken;

    if (refreshTokenFromClient) {
        try {
            const decodeRefreshToken = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            const dataForToken = {
                _id: decodeRefreshToken._id,
                userName: decodeRefreshToken.userName
            };

            const accessToken = await jwtHelper.generateToken(dataForToken, accessTokenSecret, accessTokenLife);

            return res.status(200).json({accessToken});
        } catch (error) {
            return res.status(403).send({msg: "Invalid refresh token"});
        }
    } else {
        return res.status(403).send({msg: "No token provided"});
    }
};
