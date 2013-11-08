'use strict';
var request = require('request');
var format = require('../lib/format');
var API = 3;

module.exports = function (api) {
  api.articles = {};

  api.articles.get = function (id, cb) {
    var data = { url: API + '/articles/' + escape(id) };
    api.send.get(data, function (err, r, body) {
      if(err) return cb(err);
      cb(null, body);
    });
  }

  api.articles.list = function (opts, cb) {
    var data = { url: API + '/articles', qs: opts };
    api.send.get(data, function (err, r, body) {
      if(err) return cb(err);
      cb(null, format.page(api, body));
    });
  }

  api.articles.create = function (opts, cb) {
    var data = { url: API + '/articles', body: opts };
    api.send.post(data, function (err, r, body) {
      if(err) return cb(err);
      return body;
    });
  }
}



