var dots = require('../');
var should = require('should');

suite('#create', function () {

    suite('positive tests', function () {

        test('creates a basic key', function () {
            var parsedObj = dots.create({}, 'test', 5);

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Object();
            should(parsedObj).have.property('test');
            should(parsedObj.test).be.ok();
            should(parsedObj.test).be.a.Number();
            should(parsedObj.test).eql(5);
        });

        test('creates a basic nested key', function () {
            var parsedObj = dots.create({}, 'test.test', 5);

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Object();
            should(parsedObj).have.property('test');
            should(parsedObj.test).be.ok();
            should(parsedObj.test).be.an.Object();
            should(parsedObj.test).have.property('test');
            should(parsedObj.test.test).be.ok();
            should(parsedObj.test.test).be.a.Number();
            should(parsedObj.test.test).eql(5);
        });

        test('creates an array key', function () {
            var parsedArr = dots.create([], '[0]', 5);

            should(parsedArr).be.ok();
            should(parsedArr).be.an.Array();
            should(parsedArr).have.lengthOf(1);
            should(parsedArr[0]).be.ok();
            should(parsedArr[0]).be.a.Number();
            should(parsedArr[0]).eql(5);
        });

        test('creates a nested array key', function () {
            var parsedArr = dots.create([], '[0][0]', 5);

            should(parsedArr).be.ok();
            should(parsedArr).be.an.Array();
            should(parsedArr).have.lengthOf(1);
            should(parsedArr[0]).be.ok();
            should(parsedArr[0]).be.an.Array();
            should(parsedArr[0]).have.lengthOf(1);
            should(parsedArr[0][0]).be.ok();
            should(parsedArr[0][0]).be.a.Number();
            should(parsedArr[0][0]).eql(5);
        });

        test('creates a basic key under an array key', function () {
            var parsedArr = dots.create([], '[0].test', 5);

            should(parsedArr).be.ok();
            should(parsedArr).be.an.Array();
            should(parsedArr).have.lengthOf(1);
            should(parsedArr[0]).be.ok();
            should(parsedArr[0]).be.an.Object();
            should(parsedArr[0]).have.property('test');
            should(parsedArr[0].test).be.ok();
            should(parsedArr[0].test).be.a.Number();
            should(parsedArr[0].test).eql(5);
        });

        test('creates an array key under a basic key', function () {
            var parsedObj = dots.create({}, 'test[0]', 5);

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Object();
            should(parsedObj).have.property('test');
            should(parsedObj.test).be.ok();
            should(parsedObj.test).be.an.Array();
            should(parsedObj.test).have.lengthOf(1);
            should(parsedObj.test[0]).be.ok();
            should(parsedObj.test[0]).be.a.Number();
            should(parsedObj.test[0]).eql(5);
        });

        suite('creates a compound key', function () {

            test('using single quotes', function () {
                var parsedObj = dots.create({}, '[\'test\']', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property('test');
                should(parsedObj.test).be.ok();
                should(parsedObj.test).be.a.Number();
                should(parsedObj.test).eql(5);
            });

            test('using double quotes', function () {
                var parsedObj = dots.create({}, '["test"]', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property('test');
                should(parsedObj.test).be.ok();
                should(parsedObj.test).be.a.Number();
                should(parsedObj.test).eql(5);
            });

        });

        suite('creates a basic key under a compound key', function () {

            test('using single quotes', function () {
                var parsedObj = dots.create({}, '[\'test\'].test', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property('test');
                should(parsedObj.test).be.ok();
                should(parsedObj.test).be.an.Object();
                should(parsedObj.test).have.property('test');
                should(parsedObj.test.test).be.ok();
                should(parsedObj.test.test).be.a.Number();
                should(parsedObj.test.test).eql(5);
            });

            test('using double quotes', function () {
                var parsedObj = dots.create({}, '["test"].test', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property('test');
                should(parsedObj.test).be.ok();
                should(parsedObj.test).be.an.Object();
                should(parsedObj.test).have.property('test');
                should(parsedObj.test.test).be.ok();
                should(parsedObj.test.test).be.a.Number();
                should(parsedObj.test.test).eql(5);
            });

        });

        suite('creates an array key under a compound key', function () {

            test('using single quotes', function () {
                var parsedObj = dots.create({}, '[\'test\'][0]', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property('test');
                should(parsedObj.test).be.ok();
                should(parsedObj.test).be.an.Array();
                should(parsedObj.test).have.lengthOf(1);
                should(parsedObj.test[0]).be.ok();
                should(parsedObj.test[0]).be.a.Number();
                should(parsedObj.test[0]).eql(5);
            });

            test('using double quotes', function () {
                var parsedObj = dots.create({}, '["test"][0]', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property('test');
                should(parsedObj.test).be.ok();
                should(parsedObj.test).be.an.Array();
                should(parsedObj.test).have.lengthOf(1);
                should(parsedObj.test[0]).be.ok();
                should(parsedObj.test[0]).be.a.Number();
                should(parsedObj.test[0]).eql(5);
            });

        });

        suite('creates an integer key', function () {

            test('using single quotes', function () {
                var parsedObj = dots.create({}, '[\'10\']', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property('10');
                should(parsedObj['10']).be.ok();
                should(parsedObj['10']).be.a.Number();
                should(parsedObj['10']).eql(5);
            });

            test('using double quotes', function () {
                var parsedObj = dots.create({}, '["10"]', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property('10');
                should(parsedObj['10']).be.ok();
                should(parsedObj['10']).be.a.Number();
                should(parsedObj['10']).eql(5);
            });

        });

        suite('creates a special key', function () {

            test('using single quotes', function () {
                var parsedObj = dots.create({}, '[\']]][[[\']', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property(']]][[[');
                should(parsedObj[']]][[[']).be.ok();
                should(parsedObj[']]][[[']).be.a.Number();
                should(parsedObj[']]][[[']).eql(5);
            });

            test('using double quotes', function () {
                var parsedObj = dots.create({}, '["]]][[["]', 5);

                should(parsedObj).be.ok();
                should(parsedObj).be.an.Object();
                should(parsedObj).have.property(']]][[[');
                should(parsedObj[']]][[[']).be.ok();
                should(parsedObj[']]][[[']).be.a.Number();
                should(parsedObj[']]][[[']).eql(5);
            });

        });

        test('creates a missing key in an object', function () {
            var parsedObj = dots.create({
                sing: 10
            }, 'dance', 5);

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Object();
            should(parsedObj).have.property('sing');
            should(parsedObj).have.property('dance');
            should(parsedObj.sing).be.ok();
            should(parsedObj.dance).be.ok();
            should(parsedObj.sing).be.a.Number();
            should(parsedObj.dance).be.a.Number();
            should(parsedObj.sing).eql(10);
            should(parsedObj.dance).eql(5);
        });

        test('creates an existing key in an object', function () {
            var parsedObj = dots.create({
                dance: 10
            }, 'dance', 5);

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Object();
            should(parsedObj).have.property('dance');
            should(parsedObj.dance).be.ok();
            should(parsedObj.dance).be.a.Number();
            should(parsedObj.dance).eql(5);
        });

        test('creates an existing nested key in an object', function () {
            var parsedObj = dots.create({
                dance: {
                    dance: 10
                }
            }, 'dance.dance', 5);

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Object();
            should(parsedObj).have.property('dance');
            should(parsedObj.dance).be.ok();
            should(parsedObj.dance).be.an.Object();
            should(parsedObj.dance).have.property('dance');
            should(parsedObj.dance.dance).be.ok();
            should(parsedObj.dance.dance).be.a.Number();
            should(parsedObj.dance.dance).eql(5);
        });

        test('creates a key with a null value', function () {
            var parsedObj = dots.create({}, 'dance', null);

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Object();
            should(parsedObj).have.property('dance');
            should(parsedObj.dance).be.null();
        });

        test('creates a key with an undefined value', function () {
            var parsedObj = dots.create({}, 'dance');

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Object();
            should(parsedObj).have.property('dance');
            should(parsedObj.dance).be.undefined();
        });

    });

    suite('negative tests', function () {

        test('handles non-object haystacks successfully', function () {
            var parsedObj = dots.create('dance', 'dance', 'dance');

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Object();
            should(parsedObj).have.property('dance');
            should(parsedObj.dance).eql('dance');
        });

        test('handles non-array haystacks successfully', function () {
            var parsedObj = dots.create('dance', '[0]', 'dance');

            should(parsedObj).be.ok();
            should(parsedObj).be.an.Array();
            should(parsedObj.length).eql(1);
            should(parsedObj[0]).be.a.String();
            should(parsedObj[0]).eql('dance');
        });

        test('throws an error when provided an invalid key', function () {
            should.throws(
                function () {
                    dots.create({}, '123');
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
                dots.create,
                function (err) {
                    should(err).be.an.instanceOf(dots.ParseException);
                    should(err.message).eql('Unable to parse empty string!');
                    return true;
                }
            );
        });

    });

});
