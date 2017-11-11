var db = require('../config/db.js');
//ADMIN AUTH?

exports.all = function() {
    return db.rows('GetAllPosts');
}

exports.read = function(id) {
    return db.row('GetOnePost', [id]);
}

exports.readposts = function(id) {
    return db.rows('GetOneUserPosts', [id]); 
}
exports.update = function(id, post) {
    return db.empty('UpdatePost', [id, post]);
}

exports.create = function(post, userid) {
    return db.row('CreatePost', [post, userid]);
}

exports.destroy = function(id) {
    return db.empty('DeletePost', [id]);
}

