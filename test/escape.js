var dots = require('../');
var should = require('should');

suite('#escape', function () {

  suite('positive tests', function () {

    test('escapes a basic key', function () {
      var escaped = dots.escape('test');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('test');
    });

    test('escapes a numeric key', function () {
      var escaped = dots.escape('0');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('["0"]');
    });

    test('escapes a numeric key in an array', function () {
      var escaped = dots.escape(0);

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('[0]');
    });

    test('escapes a special key', function () {
      var escaped = dots.escape('my-test');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('["my-test"]');
    });

    test('escapes a single quoted key', function () {
      var escaped = dots.escape('\'test\'');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('["\'test\'"]');
    });

    test('escapes a double quoted key', function () {
      var escaped = dots.escape('"test"');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('["\\"test\\""]');
    });

    test('escapes an empty key', function () {
      var escaped = dots.escape('');

      should(escaped).be.ok();
      should(escaped).be.a.String();
      should(escaped).eql('[""]');
    });

  });

  suite('negative tests', function () {

    test('throws an error when provided a missing key', function () {
      should.throws(
        dots.escape,
        function (err) {
          should(err).be.an.instanceOf(dots.ParseException);
          should(err.message).eql('Unexpected non-string value provided!');
          return true;
        }
      );
    });

    test('throws an error when provided a non-string', function () {
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
