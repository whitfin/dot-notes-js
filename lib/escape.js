const ParseException
  = require('./exception');
const patterns
  = require('./patterns');

/**
 * Escapes a key based on the content, parsing into
 * a dot noted path entry. Number keys will be treated
 * as Array indices.
 *
 * @param input the key to escape
 * @returns {*} a String containing the escaped key
 */
function escape(input) {
  var type = typeof input;

  if (type === 'number') {
    return '[' + input + ']';
  }

  if (type !== 'string') {
    throw new ParseException('Unexpected non-string value provided!');
  }

  if (!patterns.accessor.test(input)) {
    var keystr = '["';
    if (patterns.quote.test(input)) {
      keystr += input.replace(/"/g, '\\"');
    } else {
      keystr += input;
    }
    return keystr + '"]';
  }

  return input;
}

/**
 * We only want to export the `escape` function
 * for public usage.
 *
 * @type {create}
 */
module.exports = escape;