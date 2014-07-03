// Prevent chai syntax from causing JSLint errors.
/*jshint expr: true*/

var expect = require('chai').expect,
    request = require('request'),
    config = require('./../lib/config');

var URL = 'http://localhost:' + config.PORT;

describe('main', function(){
    describe('GET - /mpq_files/:filename', function(){
        var PATH = '/mpq_files/';

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
});
