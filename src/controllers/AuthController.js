const jwtHelper = require("../helpers/JwtHelper");
const authService = require("../services/AuthService");
const {hashPassword} = require("../common/hash");

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

exports.register = async (req, res) => {
    try {
        const checkEmail = await authService.checkEmail(req.body.email);
        const checkUsername = await authService.checkUsername(req.body.userName);
        if (checkEmail) {
            return res.send("Email already existed!");
        } else if (checkUsername) {
            return res.send("Username already existed!");
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

exports.login = async (req, res) => {
    try {
        const user = {
            _id: "1234-5678-910JQK-vdt",
            name: req.body.name,
            email: req.body.email
        }

        const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);

        const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);

        tokenList[refreshToken] = {
            accessToken,
            refreshToken
        };

        console.log({accessToken, refreshToken});

        return res.status(200).json({accessToken, refreshToken});
    } catch (error) {
        return res.status(500).json(error);
    }
}
