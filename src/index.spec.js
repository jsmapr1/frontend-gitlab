import expect from 'expect';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import {parametize, gitlab} from './index';
import {getIssues, getProjectIssues} from './requests/Issues';

describe('main', () => {
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

  it('will call other functions', () => {
    const creds = gitlab({url:'http://foo.gitlab.com', token:'abc123'})
    return creds(getIssues).then(json => {
      expect(json).toEqual([issue])
    });
  })

  it('will call other functions with arguments', () => {
    nock('http://foo.gitlab.com/api/v3', {
        reqheaders: {
          'PRIVATE-TOKEN': 'abc123'
        }
      })
      .get('/projects/0/issues?state=open')
      .reply(200, [issue])
    const creds = gitlab({url:'http://foo.gitlab.com', token:'abc123'})
    return creds(getProjectIssues, 0, {
          'state':'open'
        }).then(json => {
      expect(json).toEqual([issue])
    })
  })

})

describe('utility functions', () => {
  it('will turn options into parameters', () => {
    expect(parametize({
      'a':'b',
      'c':'d'
    })).toEqual('?a=b&c=d');
  })

  it('will ignore empty parameters', () => {
    expect(parametize(null)).toEqual('');
  });

  it('will url encode parameters', () => {
    expect(parametize({
      title:'New Issue'
    })).toEqual('?title=New%20Issue');
  })
})
