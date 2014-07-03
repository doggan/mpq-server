#! /usr/bin/env node

var server = require('./lib/server'),
    program = require('commander'),
    packageJSON = require('./package.json');

// Command line parsing.
program
   .version(packageJSON.version)
   .usage('<mpq archive path> {options}')
   .option('-p, --port <n>', 'port number', parseInt);

program.on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ mpq-server /path/to/archive/file.mpq --port 1234');
    console.log('');
});

program.parse(process.argv);

var args = program.args;
if (args.length < 1) {
    console.error();
    console.error("  error: mpq archive path not specified");

    program.help();
}

var mpqPath = program.args[0];
var port = null;
if (program.port) {
    port = program.port;
}

server.start(mpqPath, port);
