var db = require('../config/db.js');
//ADMIN AUTH?

exports.all = function (id) {
    return db.rows('GetAllReplies', [id]);
}

exports.create = function (userid, reply, postid) {
    return db.row('CreateReply', [userid, reply, postid]);
}

exports.update = function (id, reply, timestamp) {
    return db.row('UpdateReply', [id, reply, timestamp]);
}

exports.destroy = function (id) {
    return db.empty('DeleteReply', [id]);
}
