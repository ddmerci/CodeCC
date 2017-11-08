var bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

exports.encryptPassword = function(pw) {
    return bcrypt.hash(pw, SALT_ROUNDS);
}

exports.checkPassword = function(pw, hash) {
    return bcrypt.compare(pw, hash);
}