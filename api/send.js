'use strict';
var format = require('../lib/format');
var request = require('request');
var _ = require('underscore');

module.exports = function (api) {
  function createError(error, body) {
    if(error) return error;
    else if(body.ErrorInformation) {
      error = new Error(body.ErrorInformation.Code + ' ' + body.ErrorInformation.Message);
      error.code = body.ErrorInformation.Code;
      error.body = body.ErrorInformation;
      return error;
    }
    else if(body.error) {
      error = new Error(body.code + ' ' + body.message);
      error.code = body.code;
      error.body = body;
      return error;
    }
  }

  api.send = function (method, opts, cb) {
    opts.url = api.url + ('' + opts.url).replace(/^\//, '');
    if(opts.body) opts.body = format.params(opts.body);
    if(opts.qs) opts.qs = format.params(opts.qs);

    request[method](_.defaults(opts, this.defaults), function (err, r, body) {
      err = createError(err, body);
      cb(err, r, body);
    });
  }

  api.send.get = function get(opts, cb) { return api.send('get', opts, cb); }
  api.send.post = function post(opts, cb) { return api.send('post', opts, cb); }
  api.send.put = function put(opts, cb) { return api.send('put', opts, cb); }
  api.send.del = function del(opts, cb) { return api.send('del', opts, cb); }
};
