var express = require('express');
var procedures = require('../procedures/reviews.proc');
var router = express.Router();

router.route('/')

    .get(function (req, res) {
        procedures.all()
            .then(function (reviews) {
                res.send(reviews);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

    .post(function (req, res) {
        procedures.create(req.body.review, req.body.timestamp, req.body.username, req.body.profilepic)
            .then(function (id) {
                res.sendStatus(201).send(id);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });


router.route('/:id')

    .get(function(req, res){
        procedures.read(req.params.id)
        .then(function(review){
            res.send(review);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
        });
    })

    .put(function (req, res) {
        procedures.update(req.params.id, req.body.review, req.body.timestamp, req.body.username, req.body.profilepic)
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
    });

module.exports = router;