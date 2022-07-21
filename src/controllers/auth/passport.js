const LocalStrategy = require("passport-local").Strategy;
const authService = require("../../services/AuthService");
const {comparePassword} = require("../../common/hash");

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use("local-login", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, (req, email, password, done) => {
        process.nextTick(async () => {
            try {
                const user = await authService.checkEmail(email);

                if (! user) {
                    return done(null, false);
                }

                const checkPassword = await comparePassword(password, user.password);

                if (! checkPassword) {
                    return done(null, false);
                }

                return done(null, user);

            } catch (e) {
                return done(null, false);
            }
        })
    }))
}
