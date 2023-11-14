var parse = require('./keys');

/**
 * Retrieves a key based on a dot noted path and
 * Object, nesting where appropriate. If the path
 * does not resolve to a value, `undefined` will
 * be returned, otherwise the value will be returned.
 *
 * @param {object} obj
 *    the Object to search inside
 * @param {string} str
 *    the dot noted String
 * @returns {*}
 *    the value if found, otherwise undefined
 */
function get(obj, str) {
    if (!obj || typeof obj !== 'object') {
        return;
    }

    var keys = parse(str);
    var tmp = obj;
    var last = keys.length - 1;

    for (var k = 0; k < last; k++) {
        tmp = tmp[keys[k]];
        if (tmp === undefined || tmp === null) {
            return tmp;
        }
    }

    return tmp[keys[last]];
}

/**
 * Export the `get` function to the public API.
 *
 * @type {get}
 */
module.exports = get;
