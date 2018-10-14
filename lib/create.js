var parse = require('./keys');

/**
 * Constructs a key based on a dot noted path and
 * value, nesting where appropriate into the target
 * Object. If no target is provided, a new Object
 * will be constructed appropriately (i.e. an Array
 * where necessary).
 *
 * @param {object} obj
 *    the target (destination) Object
 * @param {string} str
 *    the string path to create
 * @param {*} val
 *    the value to set the key against
 * @returns {object}
 *    an Object containing the set value
 */
function create(obj, str, val) {
  var keys = parse(str);

  var container;

  if (obj && typeof obj === 'object') {
    container = obj;
  } else {
    container = typed(keys[0]);
  }

  var tmp = container;
  var last = keys.length - 1;

  for (var k = 0; k < last; k++) {
    var key = keys[k];

    if (!tmp[key]) {
      tmp[key] = typed(keys[k + 1]);
    }

    tmp = tmp[key];
  }

  tmp[keys[last]] = val;

  return container;
}

/**
 * Straightforward way to grab either an Array or
 * an Object, based on whether the key is a Number
 * or not.
 *
 * @param {string} key
 *    the key to check
 * @returns {*}
 *    an Array if the key is a Number
 */
function typed(key) {
  return typeof key === 'number' ? [] : {};
}

/**
 * We only want to export the `create` function
 * for public usage, not the `typed` function.
 *
 * @type {create}
 */
module.exports = create;
