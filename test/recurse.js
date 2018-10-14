var dots = require('../');
var should = require('should');

suite('#recurse', function () {

  suite('positive tests', function () {

    test('iterates a set of basic keys', function () {
      var obj = {
        one: 1,
        two: 2,
        three: 3
      };

      var iterator = 0;
      var keys = Object.keys(obj);

      dots.recurse(obj, function (key, value, path) {
        var k = keys[iterator++];
        var v = obj[k];

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql(k);

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(v);

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql(k);
      });

      should(iterator).eql(keys.length);
    });

    test('iterates a set of array keys', function () {
      var arr = [ 1 ];

      var iterator = 0;

      dots.recurse(arr, function (key, value, path) {
        iterator++;

        should(key).not.be.undefined();
        should(key).be.a.Number();
        should(key).eql(0);

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(1);

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql('[0]');
      });

      should(iterator).eql(1);
    });

    test('iterates a set of integer keys', function () {
      var obj = {
        1: 1
      };

      var iterator = 0;
      var keys = Object.keys(obj);
      var paths = [
        '["1"]'
      ];

      dots.recurse(obj, function (key, value, path) {
        var p = paths[iterator];
        var k = keys[iterator++];
        var v = obj[k];

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql(k);

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(v);

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql(p);
      });

      should(iterator).eql(keys.length);
    });

    test('iterates a set of special keys', function () {
      var obj = {
        '][': 1,
        '"': 2,
        '\'': 3
      };

      var iterator = 0;
      var keys = Object.keys(obj);
      var paths = [
        '["]["]',
        '["\\""]',
        '["\'"]'
      ];

      dots.recurse(obj, function (key, value, path) {
        var p = paths[iterator];
        var k = keys[iterator++];
        var v = obj[k];

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql(k);

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(v);

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql(p);
      });

      should(iterator).eql(keys.length);
    });

    test('iterates an object recursively', function () {
      var obj = {
        test: {
          nested: {
            objects: 1
          }
        }
      };

      var iterator = 0;

      dots.recurse(obj, function (key, value, path) {
        iterator++;

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql('objects');

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(1);

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql('test.nested.objects');
      });

      should(iterator).eql(1);
    });

    test('iterates an array recursively', function () {
      var arr = [
        [ 1 ]
      ];

      var iterator = 0;

      dots.recurse(arr, function (key, value, path) {
        iterator++;

        should(key).not.be.undefined();
        should(key).be.a.Number();
        should(key).eql(0);

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(1);

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql('[0][0]');
      });

      should(iterator).eql(1);
    });

    test('iterates nested arrays and objects recursively', function () {
      var obj = {
        array: [
          {
            test: {
              nested: [
                {
                  recursion: {
                    0: 1
                  }
                }
              ]
            }
          }
        ]
      };

      var iterator = 0;

      dots.recurse(obj, function (key, value, path) {
        iterator++;

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql('0');

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(1);

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql('array[0].test.nested[0].recursion["0"]');
      });

      should(iterator).eql(1);
    });

    test('iterates through undefined values', function () {
      var obj = {
        test: undefined
      };

      var iterator = 0;

      dots.recurse(obj, function (key, value, path) {
        iterator++;

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql('test');

        should(value).be.undefined();

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql('test');
      });

      should(iterator).eql(1);
    });

    test('iterates through null values', function () {
      var obj = {
        test: null
      };

      var iterator = 0;

      dots.recurse(obj, function (key, value, path) {
        iterator++;

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql('test');

        should(value).be.null();

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql('test');
      });

      should(iterator).eql(1);
    });

    test('iterates using a custom prefix', function () {
      var obj = {
        test: null
      };

      var iterator = 0;

      dots.recurse(obj, function (key, value, path) {
        iterator++;

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql('test');

        should(value).be.null();

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql('prefix.test');
      }, 'prefix');

      should(iterator).eql(1);
    });

    test('iterates without generating paths', function () {
      var obj = {
        test: 1
      };

      var iterator = 0;

      dots.recurse(obj, function (key, value) {
        iterator++;

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql('test');

        should(value).be.ok();
        should(value).be.a.Number();
        should(value).eql(1);

        should(arguments).have.lengthOf(3);
        should(arguments[2]).be.undefined();
      });

      should(iterator).eql(1);
    });

  });

  suite('negative tests', function () {

    test('does not iterate values on the object prototype', function () {
      function O() { }

      Object.defineProperty(O.prototype, 'foo', {
        enumerable: true,
        value: 1
      });

      var iterator = 0;

      dots.recurse(new O(), function () {
        iterator++;
      });

      should(iterator).eql(0);
    });

    test('ignores invalid custom prefixes', function () {
      var obj = {
        test: null
      };

      var iterator = 0;

      dots.recurse(obj, function (key, value, path) {
        iterator++;

        should(key).be.ok();
        should(key).be.a.String();
        should(key).eql('test');

        should(value).be.null();

        should(path).be.ok();
        should(path).be.a.String();
        should(path).eql('test');
      }, 200);

      should(iterator).eql(1);
    });

    test('throws an error when provided a non-object', function () {
      should.throws(
        function () {
          dots.recurse(5, function () { });
        },
        function (err) {
          should(err).be.an.instanceOf(TypeError);
          should(err.message).eql('Non-object provided to `recurse`!');
          return true;
        }
      );
    });

  });

});
