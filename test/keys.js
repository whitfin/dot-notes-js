const dots = require('../');
const should = require('should');

describe('#keys', function () {

  describe('positive tests', function () {

    it('translates a basic key', function () {
      var keys = dots.keys('test');

      should(keys).be.ok();
      should(keys).be.an.Array();
      should(keys).have.lengthOf(1);

      should(keys[0]).be.ok();
      should(keys[0]).be.a.String();
      should(keys[0]).eql('test');
    });

    it('translates a basic nested key', function () {
      var keys = dots.keys('test.test');

      should(keys).be.ok();
      should(keys).be.an.Array();
      should(keys).have.lengthOf(2);

      should(keys[0]).be.ok();
      should(keys[0]).be.a.String();
      should(keys[0]).eql('test');

      should(keys[1]).be.ok();
      should(keys[1]).be.a.String();
      should(keys[1]).eql('test');
    });

    it('translates a basic key with numbers', function () {
      var keys = dots.keys('test.test1');

      should(keys).be.ok();
      should(keys).be.an.Array();
      should(keys).have.lengthOf(2);

      should(keys[0]).be.ok();
      should(keys[0]).be.a.String();
      should(keys[0]).eql('test');

      should(keys[1]).be.ok();
      should(keys[1]).be.a.String();
      should(keys[1]).eql('test1');
    });

    it('translates an array key', function () {
      var keys = dots.keys('[0]');

      should(keys).be.ok();
      should(keys).be.an.Array();
      should(keys).have.lengthOf(1);

      should(keys[0]).not.be.undefined();
      should(keys[0]).be.a.Number();
      should(keys[0]).eql(0);
    });

    it('translates a nested array key', function () {
      var keys = dots.keys('[0][0]');

      should(keys).be.ok();
      should(keys).be.an.Array();
      should(keys).have.lengthOf(2);

      should(keys[0]).not.be.undefined();
      should(keys[0]).be.a.Number();
      should(keys[0]).eql(0);

      should(keys[1]).not.be.undefined();
      should(keys[1]).be.a.Number();
      should(keys[1]).eql(0);
    });

    it('translates a basic key under an array key', function () {
      var keys = dots.keys('[0].test');

      should(keys).be.ok();
      should(keys).be.an.Array();
      should(keys).have.lengthOf(2);

      should(keys[0]).not.be.undefined();
      should(keys[0]).be.a.Number();
      should(keys[0]).eql(0);

      should(keys[1]).not.be.undefined();
      should(keys[1]).be.a.String();
      should(keys[1]).eql('test');
    });

    it('translates an array key under a basic key', function () {
      var keys = dots.keys('test[0]');

      should(keys).be.ok();
      should(keys).be.an.Array();
      should(keys).have.lengthOf(2);

      should(keys[0]).not.be.undefined();
      should(keys[0]).be.a.String();
      should(keys[0]).eql('test');

      should(keys[1]).not.be.undefined();
      should(keys[1]).be.a.Number();
      should(keys[1]).eql(0);
    });

    describe('translates a compound key', function () {

      it('using single quotes', function () {
        var keys = dots.keys('[\'test\']');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('test');
      });

      it('using double quotes', function () {
        var keys = dots.keys('["test"]');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('test');
      });

    });

    describe('translates a basic key under a compound key', function () {

      it('using single quotes', function () {
        var keys = dots.keys('[\'test\'].test');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(2);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('test');

        should(keys[1]).be.ok();
        should(keys[1]).be.a.String();
        should(keys[1]).eql('test');
      });

      it('using double quotes', function () {
        var keys = dots.keys('["test"].test');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(2);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('test');

        should(keys[1]).be.ok();
        should(keys[1]).be.a.String();
        should(keys[1]).eql('test');
      });

    });

    describe('translates an array key under a compound key', function () {

      it('using single quotes', function () {
        var keys = dots.keys('[\'test\'][0]');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(2);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('test');

        should(keys[1]).not.be.undefined();
        should(keys[1]).be.a.Number();
        should(keys[1]).eql(0);
      });

      it('using double quotes', function () {
        var keys = dots.keys('["test"][0]');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(2);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('test');

        should(keys[1]).not.be.undefined();
        should(keys[1]).be.a.Number();
        should(keys[1]).eql(0);
      });

    });

    describe('translates an integer key', function () {

      it('using single quotes', function () {
        var keys = dots.keys('[\'0\']');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('0');
      });

      it('using double quotes', function () {
        var keys = dots.keys('["0"]');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('0');
      });

    });

    describe('translates a special key', function () {

      it('using single quotes', function () {
        var keys = dots.keys('[\']]][[[\']');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql(']]][[[');
      });

      it('using double quotes', function () {
        var keys = dots.keys('["]]][[["]');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql(']]][[[');
      });

    });

    describe('translates mismatching quotes', function () {

      it('using single quotes', function () {
        var keys = dots.keys('[\'te\'st\']');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('te\'st');
      });

      it('using double quotes', function () {
        var keys = dots.keys('["te"st"]');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('te"st');
      });

    });

    describe('translates keys with dots', function () {

      it('using single quotes', function () {
        var keys = dots.keys('[\'test.test\']');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('test.test');
      });

      it('using double quotes', function () {
        var keys = dots.keys('["test.test"]');

        should(keys).be.ok();
        should(keys).be.an.Array();
        should(keys).have.lengthOf(1);

        should(keys[0]).be.ok();
        should(keys[0]).be.a.String();
        should(keys[0]).eql('test.test');
      });

    });

  });

  describe('negative tests', function () {

    it('throws an error when provided an undefined value', function () {
      should.throws(
        dots.keys,
        function (err) {
          should(err).be.an.instanceOf(dots.ParseException);
          should(err.message).eql('Unable to parse empty string!');
          return true;
        }
      );
    });

    it('throws an error when provided a non-string', function () {
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

    it('throws an error when provided an empty string', function () {
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

    it('throws an error when provided an invalid dot notation', function () {
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

    it('throws an error when provided an invalid bracket notation', function () {
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

    it('throws an error when provided an invalid array notation', function () {
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

    it('throws an error when provided an invalid array index', function () {
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

    it('throws an error when provided a trailing dot', function () {
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

    it('throws an error when provided a trailing bracket', function () {
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

    it('throws an error when provided mismatching quotes', function () {
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

    it('throws an error when provided sequential dots', function () {
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