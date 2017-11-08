var db = require('../config/db.js');
//ADMIN AUTH?

exports.all = function (id) {
    return db.rows('GetAllReviews', [id]);
}

exports.read = function(id){
    return db.row('GetBootcampByID', [id])
}

exports.create = function (id, review, timestamp, username, profilepic) {    //profile_pic by userid passed in?
    return db.row('CreateReview', [id, review, timestamp, username, profilepic]);
}

exports.update = function (id, review, timestamp, username, profilepic) {     //profile_pic by userid passed in?
    return db.row('UpdateReview', [id, review, timestamp, username, profilepic]);
}

exports.destroy = function (id) {
    return db.empty('DeleteReview', [id]);
}

