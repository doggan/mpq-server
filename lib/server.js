var express = require('express'),
    config = require('./config'),
    routes = require('./routes');

function _start(mpqPath, port) {
    config.MPQ_PATH = mpqPath;
    if (port) {
        config.PORT = port;
    }

    var app = express();

    config.setup(app);
    routes.setup(app);

    app.listen(config.PORT, function() {
        console.log('mpq-server running...');
        console.log('...port [' + config.PORT + ']');
        console.log('...archive [' + config.MPQ_PATH + ']');
    })
    .on('error', function(err) {
        if (err.code === 'EADDRINUSE') {
            console.error('Error [' + err.code + ']: Port ' + config.PORT + ' already in use. Try a different one.');
        }
        else {
            console.error('Server startup error.');
            throw err;
        }
    });
}

module.exports = {
    start : _start
};
