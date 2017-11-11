var db = require('../config/db');

exports.all = function () {
    return db.rows('GetAllUsers');
}

exports.read = function (id) {
    return db.row('GetOneUser', [id]);
}

exports.create = function (firstname, lastname, email, username, bootcamp, profilepic, hash) {
    return db.empty('CreateUser', [firstname, lastname, email, username, bootcamp, profilepic, hash]);
}

exports.update = function (id, firstname, lastname, email, username, bootcamp, profilepic) {
    return db.row('UpdateUser', [id, firstname, lastname, email, username, bootcamp, profilepic]);
}

exports.destroy = function(id) {
    return db.empty('DeleteUser', [id]);
}

exports.readByEmail = function(email){
    return db.row('GetUserByEmail', [email]);
}

//GetAllUsersByBootcamp to be added
