var db = require('../config/db.js');
//ADMIN AUTH?

exports.all = function (id) {
    return db.rows('GetAllReplies', [id])
}

exports.create = function (id, reply, timestamp, username, profilepic) {
    return db.row('CreateReply', [id, reply, timestamp, username, profilepic]);
}

exports.update = function (id, reply, timestamp) {
    return db.row('UpdateReply', [id, reply, timestamp])
}

exports.destroy = function (id) {
    return db.empty('DeleteReply', [id])
}
