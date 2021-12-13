const bcrypt = require("bcryptjs");

const salt = 10;

const hash = (text) => bcrypt.hash(text || '', salt);

const compare = (text, hash) => bcrypt.compare(text || '', hash || '');

module.exports = {
    hashPassword: hash,
    comparePassword: compare
}
