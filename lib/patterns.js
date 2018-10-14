/**
 * Generally just a whole bunch of patterns which are
 * reused throughout this project, in order to stop them
 * being defined in multiple places and possibly leading
 * to consistency issues.
 */
var patterns = {
  // pattern to match basic accessor
  accessor: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,

  // pattern to match array index
  index: /^\[([0-9]+)]$/,

  // generic number match
  number: /^[0-9]+$/,

  // valid segment openers
  opener: /^(?:[0-9]|"|')$/,

  // valid properties in [] format
  property: /^\[(?:'|")(.*)(?:'|")]$/,

  // a single quote
  quote: /"/,

  // an entire segment; kinda the culmination of all of the above patterns
  segment: /^((?:[a-zA-Z_$][a-zA-Z0-9_$]*)|(?:\[(?:'.*?(?='])'|".*?(?="])")])|(?:\[\d+]))/
};

/**
 * Patch the key pattern into the patterns by using
 * the segment match and forcing it to anchor to the
 * end of the String.
 */
(function () {
  var segmentMatch = patterns
    .segment.toString().slice(1, -1);
  patterns.key = new RegExp(segmentMatch + '$');
}());

/**
 * Export all patterns as a module.
 *
 * @type {*}
 */
module.exports = patterns;
