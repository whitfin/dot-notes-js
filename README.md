dot-notes [![Build Status](https://travis-ci.org/iwhitfield/dot-notes.svg?branch=master)](https://travis-ci.org/iwhitfield/dot-notes) [![Code Climate](https://codeclimate.com/github/iwhitfield/dot-notes/badges/gpa.svg)](https://codeclimate.com/github/iwhitfield/dot-notes) [![Test Coverage](https://codeclimate.com/github/iwhitfield/dot-notes/badges/coverage.svg)](https://codeclimate.com/github/iwhitfield/dot-notes)
=========

- [Setup](#setup)
- [Notation](#notation)
- [How Does It Work?](#apis)
- [Invalid Syntax](#exceptions)
- [Issues](#issues)

This module provides a simple way to convert between JavaScript objects and dot notation (see below). In terms of compatibility, `dot-notes` is built on [TravisCI](https://travis-ci.org/iwhitfield/dot-notes) after every commit using Node v0.8.x, 0.10.x, 0.12.x. In addition to this, the latest version of io.js is also covered in these builds. Build results are submitted to [Code Climate](https://codeclimate.com/github/iwhitfield/dot-notes) for analysis.

### Setup ###

`dot-notes` is available on [npm](https://www.npmjs.com/package/dot-notes), so simply install it:

```
$ npm install dot-notes
```

### Notation ###

This module follows the following notations:

```
// Any key may be referenced via dot separators
test.one

// Array elements must be wrapped in square brackets
test.one[1]

// Keys with special characters much go in quotes, in square brackets
test.one[1]['my.test']

// Quotes can be either double or single, as long as they match
test.one[1]["my.test"]

// Should you wish to, you can place normal field names in this form
test['one']
```

The parser is quite generous in what it will accept, although certain forms are blocked on purpose due to bad practice (e.g. `test[key]`). If your dot notation does not work correctly, `ParseException` will be thrown.

### APIs ###

#### create(str[, val[, obj]]) ####

This method will take a dot notated string and convert it into an object, by populating either an existing object, or creating a new one. A second parameter can be provided to set the innermost field to a specific value. Similar to the `inflate` method, this method can accept an Object parameter to merge keys into.

```
var obj = dots.create('this.is.a.test', 5);

// becomes

var obj2 = {
    this: {
        is: {
            a: {
                test: 5
            }
        }
    }
}
```

#### get(str, obj) ####

Simply returns a nested object value from a dot notated string. Used for easy access to a value. This is the counterpart to `create`.

```
var obj = {
    this: {
        is: {
            a: {
                test: 5
            }
        }
    }
}

dots.get('this.is.a.test', obj); // 5
```

#### flatten(obj) ####

Similar to the `inflate` method, but in reverse. This method will take a nested object and flatten it down to a single level, with dot notated keys.

```
var obj = {
    test: {
        one: 5
    }
}

// becomes

var obj2 = {
    'test.one': 5
}
```

#### inflate(notatedObj[, obj]) ####

This method will transform an object with flattened keys in the top level into the nested counterpart being represented by the keys. This method accepts a second parameter in order to merge keys over an existing object. If no object is provided, an empty one will be used.

```
var obj = {
    'test.one': 5
}

// becomes

var obj2 = {
    test: {
        one: 5
    }
}
```

#### keys(str) ####

Transforms a dot notated string to an array of keys. Useful for recursion. In order to provide distinction, array indexes will be of type `Number` and integer keys will be of type `String`. Invalid strings will throw a `ParseException`.

```
var str = 'test[1].2["three"]';

dots.keys(str); // [ 'test', 1, '2', 'three' ]
```

### Exceptions ###

There is very basic exception handling should an invalid syntax be used. Should this occur, a `ParseException` will be thrown, with an (attempted) reference to where the error is in the string.

### Issues ###

If you find any issues inside this module, feel free to open an issue [here](https://github.com/iwhitfield/dot-notes/issues "dot-notes Issues").