const patterns
  = require('./patterns');

/**
 * A shorthand to check whether an input is escaped
 * dot-notation. This can be used to validate a
 * specify key.
 *
 * @param input the input to validate
 * @returns {*} true if the key is escaped
 */
function escaped(input) {
  var m;
  if (typeof input === 'string') {
    m = input.match(patterns.key);
  }
  return !!(m && m[1] !== undefined);
}

/**
 * Export the `escaped` function to the public API.
 *
 * @type {escaped}
 */
module.exports = escaped;