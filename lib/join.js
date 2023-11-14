var escape = require('./escape');

/**
 * Takes an array of keys and transforms it back into
 * a dot notation syntax.
 *
 * @param {array} keys
 *     a valid array of keys (in #keys format).
 * @returns {string}
 *     a String representing the dot notation.
 */
function join(keys) {
    var notation = '';
    for (var i = 0, len = keys.length; i < len; i++) {
        var k = keys[i];
        var n = escape(k);
        if (notation) {
            if (n[0] !== '[') {
                n = '.' + n;
            }
        }
        notation += n;
    }
    return notation;
}

/**
 * Export the `join` function to the public API.
 *
 * @type {join}
 */
module.exports = join;
