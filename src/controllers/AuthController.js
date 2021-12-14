const jwtHelper = require("../helpers/JwtHelper");
const authService = require("../services/AuthService");
const {hashPassword} = require("../common/hash");
const passport = require("passport");

exports.register = async (req, res) => {
    try {
        const checkEmail = await authService.checkEmail(req.body.email);
        const checkUsername = await authService.checkUsername(req.body.userName);
        if (checkEmail) {
            return res.status(403).send("Email already existed!");
        } else if (checkUsername) {
            return res.status(403).send("Username already existed!");
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
        console.log(error);
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
                return res.status(404).send("User doesn't exist!");
            }

            const dataForToken = {
                _id: `159-357-10${
                    user.id - 1
                }`,
                userName: user.userName
            };

            const accessToken = await jwtHelper.generateToken(dataForToken, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFE);

            let refreshToken = await jwtHelper.generateToken(dataForToken, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_LIFE);

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

exports.refreshToken = async (req, res) => {};
