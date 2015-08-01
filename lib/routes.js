var config = require('./config'),
    mpq = require('mech-mpq');

var mpqArchive;

function openArchive() {
    try {
        mpqArchive = mpq.openArchive(config.MPQ_PATH);
    }
    catch (err) {
        console.error(err);
        console.error('Unable to open MPQ archive: ' + config.MPQ_PATH);
        console.error();

        process.exit(1);
    }
}

function bytesToSize(bytes) {
    if(bytes === 0) return '0 Bytes';
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

function getMpqFile(req, res, next) {
    var fileName = req.params.filename;

    console.log('Reading file: ' + fileName);

    try {
        var file = mpqArchive.openFile(fileName);
        var fileContents = file.readFile();
        file.closeFile();

        console.log('Sending file: ' + fileName + ' of size [' + bytesToSize(fileContents.length) + ']');
        res.set('Content-Type', 'application/octet-stream');
        res.send(new Buffer(fileContents, 'binary'));
    }
    catch (err) {
        console.error('Failed reading file: ' + err);
        res.send(404);
    }
}

function _setup(app) {
    app.get('/mpq_files/:filename', getMpqFile);

    openArchive();
}

module.exports = {
    setup: _setup
};
