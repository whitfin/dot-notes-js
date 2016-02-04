/**
 * A simple Exception constructor to generate errors
 * for any issues found when attempting to carry out
 * any parsing. This is purely to allow users to catch
 * these issues specifically.
 *
 * @param opts
 */
module.exports = function ParseException(opts) {
  Error.call(this);

  this.name = this.constructor.name;

  if (typeof(opts) === 'string') {
    this.message = opts;
  } else {
    this.message = 'Unable to parse \'' + opts.key + '\' at character \'' +
      opts.char + '\', column ' + (opts.index + 1) + '!';
  }

  if ('captureStackTrace' in Error) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error(this.message)).stack
      .replace('Error', this.name)
      .replace(/\n\s+at.*/, '');
  }
};
require('util').inherits(module.exports, Error);