'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parametize = exports.gitlab = undefined;

var _fnArgs = require('fn-args');

var _fnArgs2 = _interopRequireDefault(_fnArgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gitlab = exports.gitlab = function gitlab(auth) {
  return function (request) {
    return request.call(this, auth)();
  };
};

var parametize = exports.parametize = function parametize(options) {
  if (!options) {
    return '';
  }
  return '?' + Object.keys(options).map(function (option) {
    return option + '=' + encodeURI(options[option]);
  }).join('&');
};

exports.default = gitlab;