'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _index = require('../../src/index');

var _Issues = require('../../src/requests/Issues');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('main', function () {
  var issue = {
    "id": 0,
    "iid": 0,
    "project_id": 0,
    "title": "foo",
    "description": "",
    "state": "opened",
    "created_at": "2016-05-12T08:16:27.337-05:00",
    "updated_at": "2016-05-12T08:16:27.337-05:00",
    "labels": [0],
    "milestone": null,
    "assignee": null,
    "author": {
      "name": "bar",
      "username": "var",
      "id": 1,
      "state": "active",
      "avatar_url": null,
      "web_url": null
    },
    "subscribed": true
  };
  before(function () {
    (0, _nock2.default)('http://foo.gitlab.com/api/v3', {
      reqheaders: {
        'PRIVATE-TOKEN': 'abc123'
      }
    }).persist().get('/issues').reply(200, [issue]);
  });

  after(function () {
    _nock2.default.cleanAll();
  });

  it('will call other functions', function () {
    var creds = (0, _index.gitlab)({ url: 'http://foo.gitlab.com', token: 'abc123' });
    return creds(_Issues.getIssues).then(function (json) {
      (0, _expect2.default)(json).toEqual([issue]);
    });
  });
});

describe('utility functions', function () {
  it('will turn options into parameters', function () {
    (0, _expect2.default)((0, _index.parametize)({
      'a': 'b',
      'c': 'd'
    })).toEqual('?a=b&c=d');
  });

  it('will ignore empty parameters', function () {
    (0, _expect2.default)((0, _index.parametize)(null)).toEqual('');
  });

  it('will url encode parameters', function () {
    (0, _expect2.default)((0, _index.parametize)({
      title: 'New Issue'
    })).toEqual('?title=New%20Issue');
  });
});