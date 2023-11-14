var dots = require('../');
var should = require('should');

suite('#keys', function () {

    suite('positive tests', function () {

        test('translates a basic key', function () {
            var keys = dots.keys('test');
            var join = dots.join(keys);

            should(keys).be.ok();
            should(keys).be.an.Array();
            should(keys).have.lengthOf(1);

            should(keys[0]).be.ok();
            should(keys[0]).be.a.String();
            should(keys[0]).eql('test');

            should(join).eql('test');
        });

        test('translates a basic nested key', function () {
            var keys = dots.keys('test.test');
            var join = dots.join(keys);

            should(keys).be.ok();
            should(keys).be.an.Array();
            should(keys).have.lengthOf(2);

            should(keys[0]).be.ok();
            should(keys[0]).be.a.String();
            should(keys[0]).eql('test');

            should(keys[1]).be.ok();
            should(keys[1]).be.a.String();
            should(keys[1]).eql('test');

            should(join).eql('test.test');
        });

        test('translates a basic key with numbers', function () {
            var keys = dots.keys('test.test1');
            var join = dots.join(keys);

            should(keys).be.ok();
            should(keys).be.an.Array();
            should(keys).have.lengthOf(2);

            should(keys[0]).be.ok();
            should(keys[0]).be.a.String();
            should(keys[0]).eql('test');

            should(keys[1]).be.ok();
            should(keys[1]).be.a.String();
            should(keys[1]).eql('test1');

            should(join).eql('test.test1');
        });

        test('translates an array key', function () {
            var keys = dots.keys('[0]');
            var join = dots.join(keys);

            should(keys).be.ok();
            should(keys).be.an.Array();
            should(keys).have.lengthOf(1);

            should(keys[0]).not.be.undefined();
            should(keys[0]).be.a.Number();
            should(keys[0]).eql(0);

            should(join).eql('[0]');
        });

        test('translates a nested array key', function () {
            var keys = dots.keys('[0][0]');
            var join = dots.join(keys);

            should(keys).be.ok();
            should(keys).be.an.Array();
            should(keys).have.lengthOf(2);

            should(keys[0]).not.be.undefined();
            should(keys[0]).be.a.Number();
            should(keys[0]).eql(0);

            should(keys[1]).not.be.undefined();
            should(keys[1]).be.a.Number();
            should(keys[1]).eql(0);

            should(join).eql('[0][0]');
        });

        test('translates a basic key under an array key', function () {
            var keys = dots.keys('[0].test');
            var join = dots.join(keys);

            should(keys).be.ok();
            should(keys).be.an.Array();
            should(keys).have.lengthOf(2);

            should(keys[0]).not.be.undefined();
            should(keys[0]).be.a.Number();
            should(keys[0]).eql(0);

            should(keys[1]).not.be.undefined();
            should(keys[1]).be.a.String();
            should(keys[1]).eql('test');

            should(join).eql('[0].test');
        });

        test('translates an array key under a basic key', function () {
            var keys = dots.keys('test[0]');
            var join = dots.join(keys);

            should(keys).be.ok();
            should(keys).be.an.Array();
            should(keys).have.lengthOf(2);

            should(keys[0]).not.be.undefined();
            should(keys[0]).be.a.String();
            should(keys[0]).eql('test');

            should(keys[1]).not.be.undefined();
            should(keys[1]).be.a.Number();
            should(keys[1]).eql(0);

            should(join).eql('test[0]');
        });

        test('translates a blank key', function () {
            var keys = dots.keys('test[""]');
            var join = dots.join(keys);

            should(keys).be.ok();
            should(keys).be.an.Array();
            should(keys).have.lengthOf(2);

            should(keys[0]).not.be.undefined();
            should(keys[0]).be.a.String();
            should(keys[0]).eql('test');

            should(keys[1]).not.be.undefined();
            should(keys[1]).be.a.String();
            should(keys[1]).eql('');

            should(join).eql('test[""]');
        });

        suite('translates a compound key', function () {

            test('using single quotes', function () {
                var keys = dots.keys('[\'test\']');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('test');

                should(join).eql('test');
            });

            test('using double quotes', function () {
                var keys = dots.keys('["test"]');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('test');

                should(join).eql('test');
            });

        });

        suite('translates a basic key under a compound key', function () {

            test('using single quotes', function () {
                var keys = dots.keys('[\'test\'].test');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(2);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('test');

                should(keys[1]).be.ok();
                should(keys[1]).be.a.String();
                should(keys[1]).eql('test');

                should(join).eql('test.test');
            });

            test('using double quotes', function () {
                var keys = dots.keys('["test"].test');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(2);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('test');

                should(keys[1]).be.ok();
                should(keys[1]).be.a.String();
                should(keys[1]).eql('test');

                should(join).eql('test.test');
            });

        });

        suite('translates an array key under a compound key', function () {

            test('using single quotes', function () {
                var keys = dots.keys('[\'test\'][0]');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(2);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('test');

                should(keys[1]).not.be.undefined();
                should(keys[1]).be.a.Number();
                should(keys[1]).eql(0);

                should(join).eql('test[0]');
            });

            test('using double quotes', function () {
                var keys = dots.keys('["test"][0]');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(2);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('test');

                should(keys[1]).not.be.undefined();
                should(keys[1]).be.a.Number();
                should(keys[1]).eql(0);

                should(join).eql('test[0]');
            });

        });

        suite('translates an integer key', function () {

            test('using single quotes', function () {
                var keys = dots.keys('[\'0\']');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('0');

                should(join).eql('["0"]');
            });

            test('using double quotes', function () {
                var keys = dots.keys('["0"]');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('0');

                should(join).eql('["0"]');
            });

        });

        suite('translates a special key', function () {

            test('using single quotes', function () {
                var keys = dots.keys('[\']]][[[\']');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql(']]][[[');

                should(join).eql('["]]][[["]');
            });

            test('using double quotes', function () {
                var keys = dots.keys('["]]][[["]');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql(']]][[[');

                should(join).eql('["]]][[["]');
            });

        });

        suite('translates mismatching quotes', function () {

            test('using single quotes', function () {
                var keys = dots.keys('[\'te\'st\']');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('te\'st');

                should(join).eql('["te\'st"]');
            });

            test('using double quotes', function () {
                var keys = dots.keys('["te"st"]');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('te"st');

                should(join).eql('["te\\"st"]');
            });

        });

        suite('translates keys with dots', function () {

            test('using single quotes', function () {
                var keys = dots.keys('[\'test.test\']');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('test.test');

                should(join).eql('["test.test"]');
            });

            test('using double quotes', function () {
                var keys = dots.keys('["test.test"]');
                var join = dots.join(keys);

                should(keys).be.ok();
                should(keys).be.an.Array();
                should(keys).have.lengthOf(1);

                should(keys[0]).be.ok();
                should(keys[0]).be.a.String();
                should(keys[0]).eql('test.test');

                should(join).eql('["test.test"]');
            });

        });

    });

    suite('negative tests', function () {

        test('throws an error when provided an undefined value', function () {
            should.throws(
                dots.keys,
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse empty string!');
                    return true;
                }
            );
        });

        test('throws an error when provided a non-string', function () {
            should.throws(
                function () {
                    dots.keys(5);
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unexpected non-string value provided!');
                    return true;
                }
            );
        });

        test('throws an error when provided an empty string', function () {
            should.throws(
                function () {
                    dots.keys('');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse empty string!');
                    return true;
                }
            );
        });

        test('throws an error when provided an invalid dot notation', function () {
            should.throws(
                function () {
                    dots.keys('test.1');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse \'test.1\' at character \'1\', column 6!');
                    return true;
                }
            );
        });

        test('throws an error when provided an invalid bracket notation', function () {
            should.throws(
                function () {
                    dots.keys('test.["test"]');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse \'test.["test"]\' at character \'[\', column 6!');
                    return true;
                }
            );
        });

        test('throws an error when provided an invalid array notation', function () {
            should.throws(
                function () {
                    dots.keys('test.[0]');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse \'test.[0]\' at character \'[\', column 6!');
                    return true;
                }
            );
        });

        test('throws an error when provided an invalid array index', function () {
            should.throws(
                function () {
                    dots.keys('test[test]');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse \'test[test]\' at character \'t\', column 6!');
                    return true;
                }
            );
        });

        test('throws an error when provided a trailing dot', function () {
            should.throws(
                function () {
                    dots.keys('test.');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse \'test.\' due to trailing dot!');
                    return true;
                }
            );
        });

        test('throws an error when provided a trailing bracket', function () {
            should.throws(
                function () {
                    dots.keys('test[');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse \'test[\' due to trailing bracket!');
                    return true;
                }
            );
        });

        test('throws an error when provided mismatching quotes', function () {
            should.throws(
                function () {
                    dots.keys('["test]');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse \'["test]\' at character \'[\', column 1!');
                    return true;
                }
            );
        });

        test('throws an error when provided sequential dots', function () {
            should.throws(
                function () {
                    dots.keys('test..test');
                },
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse \'test..test\' at character \'.\', column 6!');
                    return true;
                }
            );
        });
    });

});
