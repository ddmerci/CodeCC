var express = require('express');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var userProc = require('../procedures/users.proc');
var pool = require('./db').pool;
var utils = require('../services/utils');

function configurePassport(app) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        var loginError = 'Invalid Login Credentials';
        userProc.readByEmail(email).then(function(user) {
            // console.log(user);
            if (!user) {
                return done(null, false, { message: 'noUser' });
            }

            // return utils.checkPassword(password, user.password)
            // .then(function(matches) {
            //     console.log(matches);
            //     if (matches) {
            //         // if the password they are using to log in matches the hash in the database after hashing/salting
            //         delete user.password;
            //         return done(null, user);
            //     } else {
            //         // if the password they are using to log in does not match the hash in the database after hashing/salting
            //         return done(null, false, { message: loginError });
            //     }
            if (user.password !== password) {
                return done(null, false, {message: loginError})
            }
            return done(null, user);
            // });
        }).catch(function (err) {
            return done(err);
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userProc.read(id).then(function (user) {
            done(null, user);
        }, function(err) {
            done(err);
        });
    });

    var sessionStore = new MySQLStore({
        createDatabaseTable: true
    }, pool);

    app.use(session({
        secret: 'random string!',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = configurePassport;