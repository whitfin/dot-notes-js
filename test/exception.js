var dots = require('../');
var should = require('should');

suite('ParseException', function () {

    test('with the captureStackTrace API', function () {
        should.throws(
            function () {
                dots.keys('test..test');
            },
            function (err) {
                should(err).be.an.instanceOf(dots.ParseException);

                should(err.message).be.ok();
                should(err.message).be.a.String();
                should(err.message).eql('Unable to parse \'test..test\' at character \'.\', column 6!');

                should(err.stack).be.ok();

                var lines = err.stack.split('\n');

                should(lines[0]).eql('ParseException: Unable to parse \'test..test\' at character \'.\', column 6!');
                should(lines[1]).startWith('    at Object.keys');

                return true;
            }
        );
    });

    test('without the captureStackTrace API', function () {
        var st = Error.captureStackTrace;

        delete Error.captureStackTrace;

        should.throws(
            function () {
                dots.keys('test..test');
            },
            function (err) {
                should(err).be.an.instanceOf(dots.ParseException);
                should(err.message).be.ok();
                should(err.message).be.a.String();
                should(err.message).eql('Unable to parse \'test..test\' at character \'.\', column 6!');

                should(err.stack).be.ok();

                var lines = err.stack.split('\n');

                should(lines[0]).eql('ParseException: Unable to parse \'test..test\' at character \'.\', column 6!');
                should(lines[1]).startWith('    at Object.keys');

                return true;
            }
        );

        Error.captureStackTrace = st;
    });

});
