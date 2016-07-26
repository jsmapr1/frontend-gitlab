'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editProjectIssue = exports.postProjectIssue = exports.getProjectIssues = exports.getIssues = undefined;

var _index = require('../index');

function generateRequestParameters(token) {
  return { headers: new Headers({ 'PRIVATE-TOKEN': token }) };
};

function validate(url, token) {
  if (!token || !url) throw new Error("Please include Token");
}

var postMethod = function postMethod() {
  return {
    method: "POST"
  };
};

var putMethod = function putMethod() {
  return {
    method: "PUT"
  };
};

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

var getProjectIssues = exports.getProjectIssues = function getProjectIssues(_ref2) {
  var url = _ref2.url;
  var token = _ref2.token;

  validate(url, token);
  return function (project, options) {
    return fetch(url + ('/api/v3/projects/' + project + '/issues' + (0, _index.parametize)(options)), generateRequestParameters(token)).then(function (response) {
      return response.json();
    });
  };
};

var postProjectIssue = exports.postProjectIssue = function postProjectIssue(_ref3) {
  var url = _ref3.url;
  var token = _ref3.token;

  validate(url, token);
  return function (project, options) {
    return fetch(url + ('/api/v3/projects/' + project + '/issues' + (0, _index.parametize)(options)), Object.assign(generateRequestParameters(token), postMethod())).then(function (response) {
      return response.json();
    });
  };
};

var editProjectIssue = exports.editProjectIssue = function editProjectIssue(_ref4) {
  var url = _ref4.url;
  var token = _ref4.token;

  validate(url, token);
  return function (project, issueId, options) {
    return fetch(url + ('/api/v3/projects/' + project + '/issues/' + issueId + (0, _index.parametize)(options)), Object.assign(generateRequestParameters(token), putMethod())).then(function (response) {
      return response.json();
    });
  };
};