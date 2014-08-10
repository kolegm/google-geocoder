var _ = require('underscore');

var Searcher = require('./communicator/request');
var Parser = require('./parser');

/**
 * Wrapper - call Google geocoder and parse result
 */
function SearchWrapper() {}

SearchWrapper.prototype.extendCallback = function (callback) {
  return function (error, data) {
    error = Parser.parseError(error);
    data = Parser.parseData(data);

    if (_.isFunction(callback)) {
      callback(error, data);
    }
  }
};

/**
 * @access public
 */
SearchWrapper.prototype.geocode = function (address, callback, options) {
  var extendedCallback = this.extendCallback(callback);
  var searcher = new Searcher();
  searcher.geocode(address, extendedCallback, options);
};

/**
 * @access public
 */
SearchWrapper.prototype.reverseGeocode = function (lat, lng, callback, options) {
  var extendedCallback = this.extendCallback(callback);
  var searcher = new Searcher();
  searcher.reverseGeocode(lat, lng, extendedCallback, options);
};

module.exports = new SearchWrapper();
