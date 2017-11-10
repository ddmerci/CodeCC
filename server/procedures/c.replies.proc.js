var db = require('../config/db.js');
//ADMIN AUTH?

exports.all = function (id) {
    return db.rows('GetAllReplies', [id])
}

<<<<<<< HEAD
exports.create = function (userid, reply, postid) {
    return db.row('CreateReply', [userid, reply, postid]);
=======
exports.create = function (reply, userid) {
    return db.row('CreateReply', [reply, userid]);
>>>>>>> e10295708e4537a404dedb37d77e30f29370e18a
}

exports.update = function (userid, reply, id) {
    return db.row('UpdateReply', [userid, reply, id])
}

exports.destroy = function (id) {
    return db.empty('DeleteReply', [id])
}
