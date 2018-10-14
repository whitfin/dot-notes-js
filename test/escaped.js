var dots = require('../');
var should = require('should');

suite('#isEscaped', function () {

  suite('positive tests', function () {

    test('returns true for a basic key', function () {
      var escaped = dots.isEscaped('test');

      should(escaped).be.ok();
      should(escaped).eql(true);
    });

    test('returns true for an array key', function () {
      var escaped = dots.isEscaped('[0]');

      should(escaped).be.ok();
      should(escaped).eql(true);
    });

    test('returns true for a single quoted key', function () {
      var escaped = dots.isEscaped('[\'test\']');

      should(escaped).be.ok();
      should(escaped).eql(true);
    });

    test('returns true for a double quoted key', function () {
      var escaped = dots.isEscaped('["test"]');

      should(escaped).be.ok();
      should(escaped).eql(true);
    });

    test('returns true for a blank key', function () {
      var escaped = dots.isEscaped('[""]');

      should(escaped).be.ok();
      should(escaped).eql(true);
    });

    test('returns false for an empty key', function () {
      var escaped = dots.isEscaped('');

      should(escaped).not.be.ok();
      should(escaped).eql(false);
    });

    test('returns false for a numeric key', function () {
      var escaped = dots.isEscaped('5');

      should(escaped).not.be.ok();
      should(escaped).eql(false);
    });

    test('returns false for a special key', function () {
      var escaped = dots.isEscaped('my-test');

      should(escaped).not.be.ok();
      should(escaped).eql(false);
    });

    test('returns false for a single quoted key', function () {
      var escaped = dots.isEscaped('\'test\'');

      should(escaped).not.be.ok();
      should(escaped).eql(false);
    });

    test('returns false for a double quoted key', function () {
      var escaped = dots.isEscaped('"test"');

      should(escaped).not.be.ok();
      should(escaped).eql(false);
    });

  });

  suite('negative tests', function () {

    test('returns false when provided a missing key', function () {
      var escaped = dots.isEscaped();

      should(escaped).not.be.ok();
      should(escaped).eql(false);
    });

    test('throws an error when provided a non-string', function () {
      var escaped = dots.isEscaped(5);

      should(escaped).not.be.ok();
      should(escaped).eql(false);
    });

  });

});
