const dots = require('../');
const should = require('should');

describe('#escape', function () {

  describe('positive tests', function () {

    it('escapes a basic key', function () {
      var escaped = dots.escape('test');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('test');
    });

    it('escapes a numeric key', function () {
      var escaped = dots.escape('0');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('["0"]');
    });

    it('escapes a numeric key in an array', function () {
      var escaped = dots.escape(0);

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('[0]');
    });

    it('escapes a special key', function () {
      var escaped = dots.escape('my-test');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('["my-test"]');
    });

    it('escapes a single quoted key', function () {
      var escaped = dots.escape('\'test\'');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('["\'test\'"]');
    });

    it('escapes a double quoted key', function () {
      var escaped = dots.escape('"test"');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('["\\"test\\""]');
    });

    it('escapes an empty key', function () {
      var escaped = dots.escape('');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('[""]');
    });

  });

  describe('negative tests', function () {

    it('throws an error when provided a missing key', function () {
      should.throws(
        dots.escape,
        function (err) {
          should(err).be.an.instanceOf(dots.ParseException);
          should(err.message).eql('Unexpected non-string value provided!');
          return true;
        }
      );
    });

    it('throws an error when provided a non-string', function () {
      should.throws(
        function () {
          dots.escape({ a: 5 });
        },
        function (err) {
          should(err).be.an.instanceOf(dots.ParseException);
          should(err.message).eql('Unexpected non-string value provided!');
          return true;
        }
      );
    });

  });

});