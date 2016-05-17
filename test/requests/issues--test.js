import expect from 'expect';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import {getIssues} from '../../src/requests/Issues';

describe('issues', () => {
  const issue =  {
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
      "web_url": null,
    },
    "subscribed": true,
  }
  before(() => {
    nock('http://foo.gitlab.com/api/v3', {
        reqheaders: {
          'PRIVATE-TOKEN': 'abc123'
        }
      })
      .persist()
      .get('/issues')
      .reply(200, [issue])
  });

  after (() => {
    nock.cleanAll()
  });

  it('will return issues', () => {
    return getIssues({url:'http://foo.gitlab.com', token:'abc123'})().then(json => {
      expect(json).toEqual([issue])
    });
  })

  it('can take authentication separate', () => {
    const issues = getIssues({url:'http://foo.gitlab.com', token:'abc123'});
    return issues().then(json => {
      expect(json).toEqual([issue])
    });
  })
})
