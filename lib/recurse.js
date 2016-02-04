const escape
  = require('./escape');

/**
 * A quick and easy recursion method for working with
 * either Objects or Arrays, moving through the nests
 * and omitting tuples of <key, value, path> back to
 * a function. Key and value represent the current pair
 * being iterated, whilst path is a dot noted String to
 * represent nests.
 *
 * If you're not using the path param, omit it from the
 * arguments definition, and it will improve performance.
 *
 * If you want to start with your own prefix (i.e. you
 * started in a nest, for example), you can pass a third
 * param.
 *
 * @param obj the Object to iterate through
 * @param handler the handler to pass tuples to
 * @param [prefix] an optional prefix to use
 */
function recurse(obj, handler, prefix) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Non-object provided to `recurse`!');
  }

  if (typeof prefix !== 'string') {
    prefix = '';
  }

  var isArr = (obj instanceof Array);
  var keys = Object.keys(obj);

  for (var i = 0, j = keys.length; i < j; i++) {
    var k = keys[i];
    var keystr;

    if (handler.length > 2) {
      keystr = escape(isArr ? +k : k);
      if (prefix) {
        if (keystr[0] !== '[') {
          keystr = '.' + keystr;
        }
      }
      keystr = prefix + keystr;
    }

    if (obj[k] && typeof obj[k] === 'object') {
      recurse(obj[k], handler, keystr);
      continue;
    }

    handler(isArr ? +k : k, obj[k], keystr);
  }
}

/**
 * Export the `recurse` function to the public API.
 *
 * @type {keys}
 */
module.exports = recurse;