require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const passport = require("passport");
require("./controllers/auth/passport")(passport);

app.use(express.static("public"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSession({secret: process.env.JWT_TOKEN_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/AuthRoute")(app);
require("./routes/UserRoute")(app);
require("./routes/CategoryRoute")(app);
require("./routes/InstrumentRoute")(app);
require("./routes/ItemRoute")(app);
require("./routes/CustomerRoute")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
