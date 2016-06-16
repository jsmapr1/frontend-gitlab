import expect from 'expect';
import nock from 'nock';
import {getIssues, getProjectIssues} from '../../src/requests/Issues';

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

  const issue2 =  {
    "id": 1,
    "iid": 1,
    "project_id": 0,
    "title": "bar",
    "description": "",
    "state": "closed",
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
      .reply(200, [issue, issue2])

    nock('http://foo.gitlab.com/api/v3', {
        reqheaders: {
          'PRIVATE-TOKEN': 'abc123'
        }
      })
      .get('/projects/0/issues?state=closed')
      .reply(200, [issue2])
  });

  after (() => {
    nock.cleanAll()
  });

  it('will return issues', () => {
    return getIssues({url:'http://foo.gitlab.com', token:'abc123'})().then(json => {
      expect(json).toEqual([issue, issue2])
    });
  })

  it('can take authentication separate', () => {
    const issues = getIssues({url:'http://foo.gitlab.com', token:'abc123'});
    return issues().then(json => {
      expect(json).toEqual([issue, issue2])
    });
  })


  it('can return issues for a project', () => {
    return getProjectIssues({url:'http://foo.gitlab.com', token:'abc123'})(0, {})
      .then(json => {
        expect(json).toEqual([issue2])
      });
  })
})
