// Environment mode: production, development, test
var ENV_MODE = process.env.NODE_ENV || 'development';

var PORT = 3000;
var PROJECT_DIR = require('path').dirname(require.main.filename);

function _setup(app) {
    app.use(function (req, res, next) {
        // Website you wish to allow to connect.
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow.
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        // Request headers you wish to allow.
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions).
        res.setHeader('Access-Control-Allow-Credentials', false);

        next();
    });
}

module.exports = {
    ENV_MODE : ENV_MODE,
    PORT : PORT,
    PROJECT_DIR : PROJECT_DIR,
    setup: _setup
};
