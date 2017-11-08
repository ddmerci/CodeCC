var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var prerender = require('prerender-node');
var api = require('./api');
var routing = require('./middleware/routing.mw');
var configurePassport = require('./config/passport');

var clientPath = path.join(__dirname, '../client');

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);

var app = express();

app.use(prerender);
app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);
app.use('/api', api);

app.get('*', routing.stateRouting);
app.listen(process.env.PORT || 3000);



















