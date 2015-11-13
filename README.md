dot-notes [![Build Status](https://travis-ci.org/zackehh/dot-notes.svg?branch=master)](https://travis-ci.org/zackehh/dot-notes) [![Code Climate](https://codeclimate.com/github/zackehh/dot-notes/badges/gpa.svg)](https://codeclimate.com/github/zackehh/dot-notes) [![Test Coverage](https://codeclimate.com/github/zackehh/dot-notes/badges/coverage.svg)](https://codeclimate.com/github/zackehh/dot-notes)
=========

This module provides a simple way of contructing/parsing dot/bracket notation in JavaScript/Node.js. It was born from a need to flatten Objects in a customized way, making `dot-notes` useful in many scenarios.

- [Compatibility](#compatibility)
- [Getting Started](#setup)
- [Quick Examples](#quick-examples)
- [Migrating from 1.x to 2.x](#migrating-from-1x-to-2x)
- [Contributing](#contributing)
- [Testing](#testing)

### Compatibility

`dot-notes` is built on [TravisCI](https://travis-ci.org/zackehh/dot-notes) on every commit using Node v0.8.x - v4.x, and I intend to maintain compatibility with all of these versions (due to dot-notes being pure JavaScript at this point). After each build, all results are sent to [Code Climate](https://codeclimate.com/github/zackehh/dot-notes) for analysis.

### Getting Started

`dot-notes` lives on [npm](https://www.npmjs.com/package/dot-notes), so just install it via the command line and you're good to go. There are no dependencies either, so it should be pretty fast to download in your production environment (there *are* dev dependencies).


```bash
$ npm install --save dot-notes
```

In the interest of short READMEs, please visit the wiki for [documentation](https://github.com/zackehh/dot-notes/wiki) on how to use this module, including example usage.

### Quick Examples

```javascript
var dots = require('dot-notes');

dots.create('test.test', 'example', {});
  => { "test": { "test": "example" } }
dots.get('test.test', { "test": { "test": "example" } });
  => "example"
dots.keys('this["is"].my[1].example');
  => [ 'this', 'is', 'my', 1, 'example' ]
dots.recurse({ "test": { "test": "example" } }, console.log);
  => [ 'test', 'example', 'test.test' ]

```

### Migrating from 1.x to 2.x

Please note that the API has changed somewhat in this bump, for both simplicity and flexibility. As such, the `flatten` and `inflate` functions are no longer available. However they can easily be implemented using the new `recurse` function. Please read the [https://github.com/zackehh/dot-notes/wiki/Migration-From-1.x-To-2.x] for information on how to use `recurse`.

### Contributing

If you wish to contribute (awesome!), please file an issue before filing a PR in order to avoid wasting time on a PR which may not be required. All PRs should pass `grunt lint` and maintain 100% test coverage. If something isn't covered by `lint`, please just use the existing code as an example of the style which should be used.

### Testing

Tests are run using `grunt` or `npm`, and written using [Mocha](https://mochajs.org/). I aim to maintain 100% coverage where possible (both line and branch).

Tests can be run as follows:

```bash
$ npm test
$ grunt test
$ grunt # runs the default Travis loop
```