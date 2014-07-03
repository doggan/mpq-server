var express = require('express'),
    config = require('./config'),
    routes = require('./routes');

var server;

function _start() {
    var app = express();

    config.setup(app);
    routes.setup(app);

    server = app.listen(config.PORT);

    console.log('Express server listening on port [' + config.PORT + '] in [' + config.ENV_MODE + '] mode.');
}

module.exports = {
    start : _start
};
