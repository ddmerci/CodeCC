var express = require('express');
var bootcamps = require('./controllers/bootcamps.ctrl');
var users = require('./controllers/users.ctrl');
var posts = require('./controllers/posts.ctrl');
var replies = require('./controllers/replies.ctrl');
var reviews = require('./controllers/reviews.ctrl');


var router = express.Router();

router.use('/bootcamps', bootcamps);
router.use('/users', users);
router.use('/replies', replies);
router.use('/reviews', reviews);
router.use('/posts', posts);


module.exports = router;