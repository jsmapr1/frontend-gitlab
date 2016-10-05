import expect from 'expect';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import {getIssues, getProjectIssues, postProjectIssue, editProjectIssue} from './Issues';

describe('Issues Requests', () => {
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

  const newIssueResponse = {
    "id": 5,
    "iid": 2,
    "project_id": 0,
    "title": "New Issue",
    "description": null,
    "state": "opened",
    "created_at": "2016-07-06T09:30:53.064-05:00",
    "updated_at": "2016-07-06T09:30:53.064-05:00",
    "labels": [
        "iteration-1"
      ],
    "milestone": null,
    "assignee": {
        "name": "jsmapr1",
        "username": "jsmapr1",
        "id": 1,
        "state": "active"
      },
    "author": {
        "name": "jsmapr1",
        "username": "jsmapr1",
        "id": 1,
        "state": "active"
      },
    "subscribed": true
  }

  const editIssueResponse = Object.assign({}, newIssueResponse, {
    "state": "closed",
    "updated_at":"2016-07-06T09:35:53.064-05:00"
  })

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
      .reply(201, newIssueResponse)

    nock('http://foo.gitlab.com/api/v3', {
        reqheaders: {
          'PRIVATE-TOKEN': 'abc123'
        }
      })
      .put('/projects/0/issues/5?state_event=close')
      .reply(201, editIssueResponse)
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
      expect(json).toEqual(newIssueResponse);
    })
  })


  it('can edit an existing issue', () => {
    const issues = editProjectIssue({url:'http://foo.gitlab.com', token:'abc123'});
    return issues(0, 5, {
      state_event: 'close'
    }).then(json => {
      expect(json).toEqual(editIssueResponse);
    })
  })
})
