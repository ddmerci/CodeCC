var db = require('../config/db.js');
//ADMIN AUTH?

exports.all = function (id) {
    return db.rows('GetAllReplies', [id])
}

exports.create = function (reply, userid) {
    return db.row('CreateReply', [reply, userid]);
}

exports.update = function (userid, reply, id) {
    return db.row('UpdateReply', [userid, reply, id])
}

exports.destroy = function (id) {
    return db.empty('DeleteReply', [id])
}
