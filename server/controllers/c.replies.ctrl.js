var express = require('express');
var procedures = require('../procedures/replies.proc');
var router = express.Router();

router.route('/')

.post(function (req, res) {
    procedures.create(req.user.id, req.body.reply, req.body.postid)
        .then(function (id) {
            res.send(id);
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        })
})
.delete(function (req, res) {
    console.log(req);
    procedures.destroy(req.params.id)
        .then(function () {
            res.sendStatus(204);
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});

router.route('/:id')

    .get(function (req, res) {
        procedures.all(req.params.id)
            .then(function (replies) {
                res.send(replies);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

<<<<<<< HEAD
    
=======
    .post(function (req, res) {
        procedures.create(req.user.id, req.body.reply, req.body.postid) //req.body.timestamp, req.body.username, req.body.profilepic
            .then(function (id) {
                res.sendStatus(201).send(id);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })
>>>>>>> e10295708e4537a404dedb37d77e30f29370e18a

// router.route('/:id')

    .put(function (req, res) {
        procedures.update(req.params.id, req.body.reply, req.body.timestamp)
            .then(function () {
                res.sendStatus(204);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })


    .delete(function (req, res) {
        console.log(req);
        procedures.destroy(req.params.id)
            .then(function () {
                res.sendStatus(204);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

module.exports = router;