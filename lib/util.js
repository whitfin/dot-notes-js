/**
 * Dot notation parser, very rough around the edges.
 * Throws ParseExceptions if something isn't right, otherwise
 * returns a list of keys.
 *
 * @param n		    the notation to parse
 */
function keys(n) {
    // position of search
    var p = 0;
    // output keys
    var keys = [];

    // move through the string
    while (p < n.length) {
        // close brace
        var c;
        // dot index
        var d = n.indexOf('.', p);
        // brace index
        var b = n.indexOf('[', p);

        // clean key, just add
        if (!~d && !~b) {
            // the rest of the string is a key
            keys.push(n.slice(p, n.length));
            // we're done
            break;
        } else if (!~b || (~d && d < b)) {
            // check valid key
            if (n[d + 1] === '.') {
                // invalid == exception
                throw new ParseException({
                    char: n[d + 1],
                    index: d + 1,
                    brace: false
                });
            }
            // push up to the next dot
            keys.push(n.slice(p, d));
            // start from the dot
            p = d + 1;
        } else {
            if (b > p) {
                // push up to the brace
                if (/"|'/.test(n[b - 2])) {
                    keys.push(n.slice(p + 1, b - 2));
                } else {
                    keys.push(n.slice(p, b));
                }
                // start from the brace
                p = b;
            }
            // check for quotes
            if (!/"|'/.test(n[b + 1])) {
                // find the end of the brace
                c = n.indexOf(']', b);
                // uh oh
                if (c === b + 1 || !/^\d+$/.test(n.slice(b + 1, c))) {
                    throw new ParseException({
                        char: n[b + 1],
                        index: b + 1,
                        brace: n[p] === '['
                    });
                }
                // push up to (and including) the brace
                keys.push(Number(n.slice(b + 1, c)));
                // move to the start of the next key
                p = c + (n[c + 2] === '.' ? 3 : 2);
            } else {
                // check for end of the quotes
                c = n.indexOf(n[b + 1] + ']', b);
                // uh oh
                if (!~c) {
                    throw new ParseException({
                        message: 'Unable to find matching quote at index ' + (b + 1) + '!'
                    });
                }
                // push key until the next point
                keys.push(n.slice(p + 2, c));
                // move to the start of the next key
                p = c + (n[c + 2] === '.' ? 3 : 2);
            }
        }
    }

    return keys;
}

/**
 * Error child to allow throwing of ParseExceptions from within
 * toKeys.
 *
 * @param opts      the error options
 * @constructor
 */
function ParseException(opts) {
    this.name = 'ParseException';
    this.message = opts.message ||
        'Unable to parse character \'' + opts.char + '\' at column ' + (opts.index + 1) + '!';
    if(opts.brace){
        this.message += ' Did you remember to wrap brace keys in quotes?';
    }
    this.stack = new Error().stack.replace('Error', this.message);
}
ParseException.prototype = Error.prototype;

/**
 * Recursion to move through an object, passing tuples
 * of <value, key, path, obj> to the handler.
 *
 * @param obj       the object to move through
 * @param handler   the process handler
 * @param [key]     the current key path
 */
function recurse(obj, handler, key) {

    // Simple handler
    function callOrRecurse(o, k, h, p){

        // If value and an object, recurse through
        if (o[k] && typeof o[k] === 'object') {
            recurse(o[k], h, p);
        } else {
            // Provide tuple to handler
            h(o[k], k, p, o);
        }

    }

    // Loop the object
    for (var k in obj) {

        // Safety check
        if (obj.hasOwnProperty(k)) {

            // Arrays require special casing
            if (Array.isArray(obj)) {
                callOrRecurse(obj, k, handler, (key || '') + '[' + k + ']');
                continue;
            }

            // Figure out the current path and call
            callOrRecurse(obj, k, handler, (key || '') + (~k.indexOf('.') ? '[\'' + k + '\']' : key ? '.' + k : k));
        }

    }

}

exports.keys = keys;
exports.recurse = recurse;