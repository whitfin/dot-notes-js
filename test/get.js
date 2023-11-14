var dots = require('../');
var should = require('should');

suite('#get', function () {

    suite('positive tests', function () {

        test('gets a value using a basic key', function () {
            var value = dots.get({
                test: 5
            }, 'test');

            should(value).be.ok();
            should(value).be.a.Number();
            should(value).eql(5);
        });

        test('gets a value using a basic nested key', function () {
            var value = dots.get({
                test: {
                    test: 5
                }
            }, 'test.test');

            should(value).be.ok();
            should(value).be.a.Number();
            should(value).eql(5);
        });

        test('gets a value using an array key', function () {
            var value = dots.get([ 5 ], '[0]');

            should(value).be.ok();
            should(value).be.a.Number();
            should(value).eql(5);
        });

        test('gets a value using a nested array key', function () {
            var value = dots.get([ [ 5 ] ], '[0][0]');

            should(value).be.ok();
            should(value).be.a.Number();
            should(value).eql(5);
        });

        test('gets a value using a basic key under an array key', function () {
            var value = dots.get([
                {
                    test: 5
                }
            ], '[0].test');

            should(value).be.ok();
            should(value).be.a.Number();
            should(value).eql(5);
        });

        test('gets a value using an array key under a basic key', function () {
            var value = dots.get({
                test: [ 5 ]
            }, 'test[0]');

            should(value).be.ok();
            should(value).be.a.Number();
            should(value).eql(5);
        });

        suite('gets a value using a compound key', function () {

            test('using single quotes', function () {
                var value = dots.get({
                    test: 5
                }, '[\'test\']');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

            test('using double quotes', function () {
                var value = dots.get({
                    test: 5
                }, '["test"]');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

        });

        suite('gets a value using a basic key under a compound key', function () {

            test('using single quotes', function () {
                var value = dots.get({
                    test: {
                        test: 5
                    }
                }, '[\'test\'].test');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

            test('using double quotes', function () {
                var value = dots.get({
                    test: {
                        test: 5
                    }
                }, '["test"].test');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

        });

        suite('gets a value using an array key under a compound key', function () {

            test('using single quotes', function () {
                var value = dots.get({
                    test: [ 5 ]
                }, '[\'test\'][0]');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

            test('using double quotes', function () {
                var value = dots.get({
                    test: [ 5 ]
                }, '["test"][0]');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

        });

        suite('gets a value using an integer key', function () {

            test('using single quotes', function () {
                var value = dots.get({
                    0: 5
                }, '[\'0\']');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

            test('using double quotes', function () {
                var value = dots.get({
                    0: 5
                }, '["0"]');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

        });

        suite('gets a value using a special key', function () {

            test('using single quotes', function () {
                var value = dots.get({
                    ']]][[[': 5
                }, '[\']]][[[\']');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

            test('using double quotes', function () {
                var value = dots.get({
                    ']]][[[': 5
                }, '["]]][[["]');

                should(value).be.ok();
                should(value).be.a.Number();
                should(value).eql(5);
            });

        });

    });

    suite('negative tests', function () {

        test('does not get a value when provided a missing path', function () {
            var value = dots.get({ }, 'test');

            should(value).not.be.ok();
            should(value).be.undefined();
        });

        test('does not get a value when provided a missing target', function () {
            var value = dots.get(undefined, 'test');

            should(value).not.be.ok();
            should(value).be.undefined();
        });

        test('does not get a value when provided a missing nested target', function () {
            var value = dots.get(undefined, 'test.test');

            should(value).not.be.ok();
            should(value).be.undefined();
        });

        test('does not get a value when provided a missing nested path', function () {
            var value = dots.get({ test: { nest: { } } }, 'test.test.test');

            should(value).not.be.ok();
            should(value).be.undefined();
        });

        test('does not get a value when provided a nulled path', function () {
            var value = dots.get({ test: { test: null } }, 'test.test.test');

            should(value).not.be.ok();
            should(value).be.null();
        });

        test('throws an error when provided an invalid key', function () {
            should.throws(
                function () {
                    dots.get({ }, '123');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse \'123\' at character \'1\', column 1!');
                    return true;
                }
            );
        });

        test('throws an error when provided a missing key', function () {
            should.throws(
                function () {
                    dots.get({ }, undefined);
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse empty string!');
                    return true;
                }
            );
        });

    });

});
