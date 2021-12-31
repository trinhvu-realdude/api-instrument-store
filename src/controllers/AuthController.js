const jwtHelper = require("../helpers/JwtHelper");
const AuthService = require("../services/AuthService");
const {hashPassword} = require("../common/hash");
const passport = require("passport");
const nodemailer = require("nodemailer");

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

exports.register = async (req, res) => {
    try {
        const checkEmail = await AuthService.checkEmail(req.body.email);
        const checkUsername = await AuthService.checkUsername(req.body.user_name);
        if (checkEmail) {
            return res.status(403).send({msg: "Email already existed"});
        } else if (checkUsername) {
            return res.status(403).send({msg: "Username already existed"});
        } else {
            const {
                user_name,
                first_name,
                last_name,
                province,
                email,
                password
            } = req.body;

            const hash = await hashPassword(password);

            const data = {
                user_name: user_name,
                first_name: first_name,
                last_name: last_name,
                province: province,
                email: email,
                password: hash
            };

            const user = await AuthService.registerUser(data);

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
                return res.status(404).send({msg: "User doesn't exist"});
            }

            const dataForToken = {
                id: user.id,
                user_name: user.user_name,
                role_id: user.role_id
            };

            const access_token = await jwtHelper.generateToken(dataForToken, accessTokenSecret, accessTokenLife);

            let refresh_token = await jwtHelper.generateToken(dataForToken, refreshTokenSecret, refreshTokenLife);

            if (user.refresh_token === null) {
                await AuthService.updateRefreshToken(refresh_token, user.id);
            } else {
                refresh_token = user.refresh_token;
            }

            return res.status(200).json({
                msg: "Login successfully",
                access_token,
                refresh_token,
                user: {
                    id: user.id,
                    user_name: user.user_name,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    province: user.province,
                    image: user.image,
                    role_id: user.role_id
                }
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    })(req, res, next);
};

exports.refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.body.refresh_token;

    if (refreshTokenFromClient) {
        try {
            const decodeRefreshToken = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            const dataForToken = {
                id: decodeRefreshToken.id,
                user_name: decodeRefreshToken.user_name,
                role_id: decodeRefreshToken.role_id
            };

            const access_token = await jwtHelper.generateToken(dataForToken, accessTokenSecret, accessTokenLife);

            return res.status(200).json({access_token});
        } catch (error) {
            return res.status(403).send({msg: "Invalid refresh token"});
        }
    } else {
        return res.status(403).send({msg: "No token provided"});
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        });
    
        const checkEmail = await AuthService.checkEmail(req.body.email);
    
        if (checkEmail) {
            const mailOptions = {
                from: `Admin Store <${process.env.ADMIN_EMAIL}>`,
                to: req.body.email,
                subject: "🔒 Password Reset E-Mail",
                html: `
                    <p>You're receiving this e-mail because you or someone else has requested a password reset for your user account at.</p>
                    <p>Click the link to reset your password: <a href="${process.env.BASE_URL + checkEmail.id}">Click here</a></p>
                    <p>If you did not request a password reset you can safely ignore this email.</p>
                `
            };
        
            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    return res.status(403).send({msg: "Something wrong"});
                } else {
                    console.log("Email sent: " + info.response);
                    return res.status(200).send({msg: "Already sent verification code to email"});
                }
            });   
        } else {
            return res.status(404).send({msg: "Email doesn't exist"});
        }    
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const checkUser = await AuthService.checkUserById(req.params.id);

        console.log(checkUser.dataValues);

        return res.status(200).json({msg: "Test"});
    } catch (error) {
        return res.status(500).json(error);
    }
};
