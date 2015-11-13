const parse = require('./keys');

/**
 * Retrieves a key based on a dot noted path and
 * Object, nesting where appropriate. If the path
 * does not resolve to a value, `undefined` will
 * be returned, otherwise the value will be returned.
 *
 * @param str the dot noted String
 * @param obj the Object to search inside
 * @returns {*} the value if found, otherwise undefined
 */
function get(str, obj) {
  var keys = parse(str);

  if (!obj) {
    return;
  }

  var tmp = obj;

  for (var k = 0, j = keys.length - 1; k < j; k++) {
    tmp = tmp[keys[k]];
    if (tmp === undefined || tmp === null) {
      return;
    }
  }

  return tmp[keys[j]];
}

/**
 * Export the `get` function
 * to the public API.
 *
 * @type {get}
 */
module.exports= get;