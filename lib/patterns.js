/**
 * Generally just a whole bunch of patterns which are
 * reused throughout this project, in order to stop them
 * being defined in multiple places and possibly leading
 * to consistency issues.
 */
module.exports = {

  accessor: /^[a-zA-Z_$]+$/,

  index: /^\[([0-9]+)]$/,

  number: /^[0-9]+$/,

  opener: /^(?:[0-9]|"|')$/,

  property: /^\[(?:'|")(.+)(?:'|")]$/,

  quote: /"/,

  segment: /^((?:[a-zA-Z_$]+)|(?:\[(?:'.+?(?='])'|".+?(?="])")])|(?:\[\d+]))/

};