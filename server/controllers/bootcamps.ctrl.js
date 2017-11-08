var express = require('express');
var procedures = require('../procedures/bootcamps.proc');
var router = express.Router();

router.route('/')

    .get(function (req, res) {
        procedures.all()
            .then(function (bootcamps) {
                res.send(bootcamps);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })
    .post(function (req, res) {
        var b = req.body;
        procedures.create(b.name, b.stack, b.city, b.state, b.cost, b.listingpic)
            .then(function (id) {
                res.status(201).send(id);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });


router.route('/:id')

    .get(function (req, res) {
        procedures.readByid(req.params.id)
            .then(function(bootcamp) {
                res.send(bootcamp);
            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })

    .put(function (req, res) {
        procedures.update(req.params.id, req.body.name, req.body.stack, req.body.city,req.body.state, req.body.cost, req.body.listingpic)
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

router.route('/bystate/:id')

    .get(function(req, res){
        procedures.readBystate(req.params.id)
        .then(function(state){
            res.send(state);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
    })
});


module.exports = router;