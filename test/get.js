const dots = require('../');
const should = require('should');

describe('#get', function () {

  describe('positive tests', function () {

    it('gets a value using a basic key', function () {
      var value = dots.get('test', {
        test: 5
      });

      should(value).be.ok();
      should(value).be.a.Number();
      should(value).eql(5);
    });

    it('gets a value using a basic nested key', function () {
      var value = dots.get('test.test', {
        test: {
          test: 5
        }
      });

      should(value).be.ok();
      should(value).be.a.Number();
      should(value).eql(5);
    });

    it('gets a value using an array key', function () {
      var value = dots.get('[0]', [5]);

      should(value).be.ok();
      should(value).be.a.Number();
      should(value).eql(5);
    });

    it('gets a value using a nested array key', function () {
      var value = dots.get('[0][0]', [[5]]);

      should(value).be.ok();
      should(value).be.a.Number();
      should(value).eql(5);
    });

    it('gets a value using a basic key under an array key', function () {
      var value = dots.get('[0].test', [
        {
          test: 5
        }
      ]);

      should(value).be.ok();
      should(value).be.a.Number();
      should(value).eql(5);
    });

    it('gets a value using an array key under a basic key', function () {
      var value = dots.get('test[0]', {
        test: [ 5 ]
      });

      should(value).be.ok();
      should(value).be.a.Number();
      should(value).eql(5);
    });

    describe('gets a value using a compound key', function () {

      it('using single quotes', function () {
        var value = dots.get('[\'test\']', {
          test: 5
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

      it('using double quotes', function () {
        var value = dots.get('["test"]', {
          test: 5
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

    });

    describe('gets a value using a basic key under a compound key', function () {

      it('using single quotes', function () {
        var value = dots.get('[\'test\'].test', {
          test: {
            test: 5
          }
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

      it('using double quotes', function () {
        var value = dots.get('["test"].test', {
          test: {
            test: 5
          }
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

    });

    describe('gets a value using an array key under a compound key', function () {

      it('using single quotes', function () {
        var value = dots.get('[\'test\'][0]', {
          test: [ 5 ]
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

      it('using double quotes', function () {
        var value = dots.get('["test"][0]', {
          test: [ 5 ]
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

    });

    describe('gets a value using an integer key', function () {

      it('using single quotes', function () {
        var value = dots.get('[\'0\']', {
          '0': 5
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

      it('using double quotes', function () {
        var value = dots.get('["0"]', {
          '0': 5
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

    });

    describe('gets a value using a special key', function () {

      it('using single quotes', function () {
        var value = dots.get('[\']]][[[\']', {
          ']]][[[': 5
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

      it('using double quotes', function () {
        var value = dots.get('["]]][[["]', {
          ']]][[[': 5
        });

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(5);
      });

    });

  });

  describe('negative tests', function () {

    it('does not get a value when provided a missing path', function () {
      var value = dots.get('test', { });

      should(value).not.be.ok();
      should(value).be.undefined();
    });

    it('does not get a value when provided a missing target', function () {
      var value = dots.get('test');

      should(value).not.be.ok();
      should(value).be.undefined();
    });

    it('does not get a value when provided a missing nested target', function () {
      var value = dots.get('test.test');

      should(value).not.be.ok();
      should(value).be.undefined();
    });

    it('does not get a value when provided a missing nested path', function () {
      var value = dots.get('test.test.test', { test: { nest: { } } });

      should(value).not.be.ok();
      should(value).be.undefined();
    });

    it('does not get a value when provided a nulled path', function () {
      var value = dots.get('test.test.test', { test: { test: null } });

      should(value).not.be.ok();
      should(value).be.undefined();
    });

    it('throws an error when provided an invalid key', function () {
      should.throws(
        function () {
          dots.get('123');
        },
        function (err) {
          should(err).be.an.instanceOf(dots.ParseException);
          should(err.message).eql('Unable to parse key starting with \'1\' at column 1!');
          return true;
        }
      );
    });

    it('throws an error when provided a missing key', function () {
      should.throws(
        dots.get,
        function (err) {
          should(err).be.an.instanceOf(dots.ParseException);
          should(err.message).eql('Unable to parse empty string!');
          return true;
        }
      );
    });

  });

});