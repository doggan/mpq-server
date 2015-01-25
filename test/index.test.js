// Prevent chai syntax from causing JSLint errors.
/*jshint expr: true*/

var expect = require('chai').expect,
    request = require('request'),
    async = require('async'),
    config = require('./../lib/config');

var URL = 'http://localhost:' + config.PORT;

describe('main', function(){
    var PATH = '/mpq_files/';
    describe('GET - /mpq_files/:filename', function(){
        it('should return the requested binary file', function(done){
            var fileName = 'levels%5Ctowndata%5Ctown.pal';

            var url = URL + PATH + fileName;

            var requestSettings = {
                method: 'GET',
                url: url,
                encoding: null
            };

            request(requestSettings, function (error, res, body) {
                expect(error).to.not.exist;
                expect(res.statusCode).to.equal(200);

                var buffer = new Buffer(body);

                // Pal format specifies 256 rgb colors.
                expect(buffer.length).to.equal(256 * 3);

                done();
            });
        });
    });

    // Used for testing performance differences with / without gzip, etc.
    describe('GET perf check - /mpq_files/:filename', function(){
        it('should display the total execution time of many GET requests', function(done){
            this.timeout(10000);

            var fileName = 'levels%5Ctowndata%5Ctown.cel';  // 2.18 MB (uncompressed), 1.27 MB (compressed)

            var url = URL + PATH + fileName;

            var requestSettings = {
                method: 'GET',
                url: url,
                encoding: null
            };

            var REQUEST_COUNT = 100;
            var requests = [];
            var requestFunction = function(cb) {
                request(requestSettings, function (error, res, body) {
                    expect(error).to.not.exist;
                    expect(res.statusCode).to.equal(200);

                    cb(error);
                });
            };

            for (var i = 0; i < REQUEST_COUNT; i++) {
                requests.push(requestFunction);
            }

            console.time('request time');
            async.series(
                requests,
                function(error) {
                    console.timeEnd('request time');

                    done();
                }
            )
        });
    });
});
