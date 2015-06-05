var request = require('superagent');

var standardCallback = function (cb) {
  return function (err, res) {
    cb(err, null, res, res && res.body || {});
  };
};

var restifySuperagent = function (params) {
  var url = params.url || "",
      headers = params.header || {},
      rejectUnauthorized = params.rejectUnauthorized;

  return {
    url: {
      href: url + '/'
    },
    'basicAuth': function (username, password) {
      var sign = new Buffer(username + ":" + password).toString('base64');
      headers['Authorization'] = "Basic " + sign;
    },
    'get': function (path, opt, cb) {
      if ('undefined' == typeof cb) {
        cb = opt;
        opt = null;
      }

      request
        .get(url + path)
        .send(opt)
        .set(headers)
        .end(standardCallback(cb));
    },
    'post': function (path, opt, cb) {
      if ('undefined' == typeof cb) {
        cb = opt;
        opt = null;
      }

      request
        .post(url + path)
        .send(opt)
        .set(headers)
        .end(standardCallback(cb));
    },
    'put': function (path, opt, cb) {
      if ('undefined' == typeof cb) {
        cb = opt;
        opt = null;
      }

      request
        .put(url +path)
        .send(opt)
        .set(headers)
        .end(standardCallback(cb));
    },
    'del': function (path, opt, cb) {
      if ('undefined' == typeof cb) {
        cb = opt;
        opt = null;
      }

      request
        .del(url + path)
        .send(opt)
        .set(headers)
        .end(standardCallback(cb));
    }
  }
};

module.exports = restifySuperagent;
