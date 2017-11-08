var db = require('../config/db.js');
//ADMIN AUTH?

exports.all = function () {
    return db.rows('GetAllPosts');
}

exports.read = function (id) {
    return db.row('GetOnePost', [id]);
}

exports.readposts = function (id) {
    return db.rows('GetOneUserPosts', [id]); 
}
exports.update = function (id, post, timestamp) {
    return db.empty('UpdatePost', [id, post, timestamp]);
}

exports.create = function (id, post, timestamp, username, profilepic) {
    return db.row('CreatePost', [id, post, timestamp, username, profilepic]);
}

exports.destroy = function (id, post, timestamp) {
    return db.empty('DeletePost', [id, post, timestamp]);
}

