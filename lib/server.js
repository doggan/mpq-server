var express = require('express'),
    config = require('./config'),
    routes = require('./routes');

var server;

function _start(mpqPath, port) {
    config.MPQ_PATH = mpqPath;
    if (port) {
        config.PORT = port;
    }

    var app = express();

    config.setup(app);
    routes.setup(app);

    server = app.listen(config.PORT);

    console.log();
    console.log('mpq-server running...');
    console.log('...port [' + config.PORT + ']');
    console.log('...archive [' + config.MPQ_PATH + ']');
}

module.exports = {
    start : _start
};
