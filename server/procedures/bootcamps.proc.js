var db = require('../config/db.js');
//ADMIN AUTH?

exports.all = function() {
    return db.rows('GetAllBootcamps');
}

exports.readByid = function(id){
    return db.row('GetBootcampByID', [id])
}

exports.readBystate = function(state){
    return db.row('GetBootcampByState', [state]);
}

exports.create = function(id, name, stack, city, state, cost, listingpic) {
    return db.row('CreateBootcamp', [id, name, stack, city, state, cost, listingpic]);
}

exports.update = function(id, name, stack, city, state, cost, listingpic) {
    return db.empty('UpdateBootcamp', [id, name, stack, city, state, cost, listingpic]);
}

exports.destroy = function(id) {
    return db.empty('DeleteBootcamp', [id]);
}

