/**
 * Generally just a whole bunch of patterns which are
 * reused throughout this project, in order to stop them
 * being defined in multiple places and possibly leading
 * to consistency issues.
 */
const patterns = {

  accessor: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,

  index: /^\[([0-9]+)]$/,

  number: /^[0-9]+$/,

  opener: /^(?:[0-9]|"|')$/,

  property: /^\[(?:'|")(.*)(?:'|")]$/,

  quote: /"/,

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
})();

/**
 * Export all patterns as a module.
 *
 * @type {*}
 */
module.exports = patterns;