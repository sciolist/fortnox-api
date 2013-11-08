'use strict';
module.exports = exports = Fortnox;
exports.create = Fortnox;

function Fortnox(config) {
  if(!(this instanceof Fortnox)) { return new Fortnox(config); }
  this.url = config.url || 'http://api.fortnox.se';
  if(this.url[this.url.length - 1] !== '/') { this.url += '/'; }

  this.defaults = {
    "json": true,
    "headers": {
      "client-secret": (config.clientSecret || config.secret),
      "access-token": (config.accessToken || config.token),
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }

  require('./api/send')(this);
  require('./api/orders')(this);
  require('./api/articles')(this);
}

