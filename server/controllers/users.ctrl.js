var express = require('express');
var passport = require('passport');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw');
var utils = require('../services/utils');
var router = express.Router();

router.route('/')

    .post(function (req, res) {
        var u = req.body;
        utils.encryptPassword(req.body.password)
            .then(function (hash) {
                return procedures.create(u.firstname, u.lastname, u.email, u.username, u.bootcamp, u.profilepic, hash)
            }).then(function (id) {
                res.sendStatus(201).send(id)
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

    .get(function (req, res) {
        procedures.all()
            .then(function (users) {
                res.send(users);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });




/* actually /api/users/login */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.sendStatus(500);
            } else {
                // console.log(user);
                return res.send(user);
            }
        });
    })(req, res, next);
});

router.all('*', auth.isLoggedIn);

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/me', function (req, res) {
    res.send(req.user);
});

router.route('/:id')

    .put(function (req, res) {
        var u = req.body;
        procedures.update(req.params.id, u.firstname, u.lastname, u.email, u.username, u.bootcamp, u.profilepic)
            .then(function () {
                res.sendStatus(204);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

    .delete(function (req, res) {
        procedures.destroy(req.params.id)
            .then(function () {
                res.sendStatus(204);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

    .get(function (req, res) {
        procedures.read(req.params.id)
            .then(function (user) {
                res.send(user);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

module.exports = router;