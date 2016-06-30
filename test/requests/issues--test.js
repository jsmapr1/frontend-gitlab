import expect from 'expect';
import nock from 'nock';
import {getIssues, getProjectIssues, postProjectIssue} from '../../src/requests/Issues';

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

  const response = {
   "project_id" : 1,
   "id" : 2,
   "created_at" : "2016-01-07T12:44:33.959Z",
   "iid" : 2,
   "title" : "New Issue",
   "state" : "opened",
   "assignee" : 'jsmapr1',
   "labels" : [
      "iteration-1"
   ],
   "author" : {
      "name" : "Joe Morgan",
      "avatar_url" : null,
      "state" : "active",
      "web_url" : "https://foo.gitlab/u/jsmapr1",
      "id" : 1,
      "username" : "jsmapr1"
   },
   "description" : null,
   "updated_at" : "2016-01-07T12:44:33.959Z",
   "milestone" : null,
   "subscribed" : true,
   "user_notes_count": 0
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

    nock('http://foo.gitlab.com/api/v3', {
        reqheaders: {
          'PRIVATE-TOKEN': 'abc123'
        }
      })
      .post('/projects/0/issues?title=New%20Issue&labels=iteration-1&assignee_id=1')
      .reply(201, response)
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
    let projectIssues = getProjectIssues({url:'http://foo.gitlab.com', token:'abc123'});
    return projectIssues(0, {
      'state':'closed'
    })
    .then(json => {
      expect(json).toEqual([issue2])
    });
  })

  it('can post a new issue', () => {
    const issues = postProjectIssue({url:'http://foo.gitlab.com', token:'abc123'});
    return issues(0, {
      title: 'New Issue',
      labels: 'iteration-1',
      assignee_id: 1
    }).then(json => {
      expect(json).toEqual(response);
    })
  })
})
