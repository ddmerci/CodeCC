var express = require('express');
var procedures = require('../procedures/posts.proc');
var router = express.Router();

router.route('/')

    .get(function (req, res) {
        procedures.all()
            .then(function(posts) {
                res.send(posts);
            }).catch(function(err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

    .post(function(req, res) {
        console.log(req.user);
        procedures.create(req.body.post, req.user.id)
            .then(function(id) {
                res.send(id);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

router.route('/:id')

    .get(function(req, res) {
        procedures.read(req.params.id)
            .then(function(post) {
                res.send(post);
            }).catch(function(err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

    .delete(function(req, res) {
        procedures.destroy(req.params.id)
            .then(function() {
                res.sendStatus(204);
            }).catch(function(err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

    .put(function(req, res) {
        console.log(req.body);
        procedures.update(req.params.id, req.body.post)
            .then(function() {
                res.sendStatus(204);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

router.route('/byuser/:id')

    .get(function(req, res) {
        procedures.readposts(req.params.id)
            .then(function(post) {
                res.send(post);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

module.exports = router;
