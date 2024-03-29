# dot-notes

[![Build Status](https://img.shields.io/github/actions/workflow/status/whitfin/dot-notes-js/ci.yml?branch=main)](https://github.com/whitfin/dot-notes-js/actions) [![Published Version](https://img.shields.io/npm/v/dot-notes.svg)](https://npmjs.com/package/dot-notes) [![Published Downloads](https://img.shields.io/npm/dt/dot-notes)](https://npmjs.com/package/dot-notes)

This module provides a simple way of constructing/parsing dot/bracket notation in JavaScript/Node.js. It was born from a need to flatten Objects in a customized way, making `dot-notes` useful in many scenarios.

- [Getting Started](#setup)
- [Quick Examples](#quick-examples)
- [Migrating from 2.x to 3.x](#migrating-from-2x-to-3x)
- [Contributing](#contributing)
- [Testing](#testing)

### Getting Started

`dot-notes` lives on [npm](https://www.npmjs.com/package/dot-notes), so just install it via the command line and you're good to go. There are no dependencies either, so it should be pretty fast to download in your production environment (there *are* dev dependencies).

```bash
$ npm install --save dot-notes
```

In the interest of short READMEs, please visit the wiki for [documentation](https://github.com/zackehh/dot-notes/wiki) on how to use this module, including example usage.

### Quick Examples

```javascript
const dots = require('dot-notes');

dots.create({}, 'test.test', 'example');
  => { "test": { "test": "example" } }
dots.get({ "test": { "test": "example" } }, 'test.test');
  => "example"
dots.keys('this["is"].my[1].example');
  => [ 'this', 'is', 'my', 1, 'example' ]
dots.join([ 'this', 'is', 'my', 1, 'example' ]);
  => 'this.is.my[1].example'
dots.recurse({ "test": { "test": "example" } }, console.log);
  => [ 'test', 'example', 'test.test' ]

```

### Migrating from 2.x to 3.x

The argument syntax for any functions taking an Object target and a String have been flipped, to follow the `(haystack, needle)` format. This means that the arguments for a target are now required where they weren't previously - *however*, if you pass undefined you will get the same behaviour as previously.

This is the only non-backwards compatible change in 3.x (and is the change which forced the jump to 3.0.0).

### Contributing

If you wish to contribute (awesome!), please file an issue before filing a PR in order to avoid wasting time on a PR which may not be required. All PRs should pass `grunt lint` and maintain 100% test coverage. If something isn't covered by `lint`, please just use the existing code as an example of the style which should be used.

### Testing

Tests are run using `grunt` or `npm`, and written using [Mocha](https://mochajs.org/). I aim to maintain 100% coverage where possible (both line and branch).

Tests can be run as follows:

```bash
$ npm test
```
