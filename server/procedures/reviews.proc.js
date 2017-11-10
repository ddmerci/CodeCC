var db = require('../config/db.js');
//ADMIN AUTH?

exports.all = function (id) {
    return db.rows('GetAllReviews', [id]);
}

exports.read = function(id){
    return db.row('GetBootcampByID', [id]);
}

exports.create = function (userid, review, id) {    
    return db.row('CreateReview', [userid, review, id]);
}

exports.update = function (id, review) {     
    return db.row('UpdateReview', [id, review]);
}

exports.destroy = function (id) {
    return db.empty('DeleteReview', [id]);
}

