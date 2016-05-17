'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function generateRequestParameters(token) {
  return { headers: new Headers({ 'PRIVATE-TOKEN': token }) };
};
function validate(url, token) {
  if (!token || !url) throw new Error("Please include Token");
}
var getIssues = exports.getIssues = function getIssues(_ref) {
  var url = _ref.url;
  var token = _ref.token;

  validate(url, token);
  return function () {
    return fetch(url + '/api/v3/issues', generateRequestParameters(token)).then(function (response) {
      return response.json();
    });
  };
};