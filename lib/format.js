'use strict';
var moment = require('moment');
var _ = require('underscore');

// Convert Dates to Fortnox format
exports.moment = function formatMoment(value) {
  return value.format("YYYY-MM-DD HH:mm:ss");
}

// Converts values for sending to Fortnox
exports.params = function params(values) {
  var result = {};
  Object.getOwnPropertyNames(values).forEach(function (name) {
    result[name] = fmt(values[name]);
  });
  return result;

  function fmt(val) {
    if(val instanceof Date) return exports.moment(moment(val));
    if(val._d instanceof Date) return exports.moment(val);
    return val;
  };
}

// Convert Fortnox result lists to arrays.
exports.page = function page(api, source) {
  for(var key in source) {
    var item = source[key];
    if(!item || !item[0] || !item[0].MetaInformation) {
      continue;
    }
    var result = item[0].MetaInformation;
    item.shift();
    source[key] = _.extend(item, result);
  }
  return source;
}
