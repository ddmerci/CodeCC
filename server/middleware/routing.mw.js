var path = require('path');
var express = require('express');

var clientPath = path.join(__dirname, '../../client');

exports.stateRouting = function(req, res, next) {
    if (isAsset(req.url)) {
        return next(); //call the next route handler
    } 
    else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
}

function isAsset(path) {
    var pieces = path.split('/');
    if (pieces.length === 0) {
        return false
    }
    var last = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1) {
        return true;
    } else if (last.indexOf('.') !== -1) {
        return true;
    } else {
        return false;
    }
}