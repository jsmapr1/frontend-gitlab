import expect from 'expect';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import {getProjects, getProjectMembers} from './Projects';

describe('Projects request', () => {
  const project = {
    "id":10,
    "description":"Sample Project",
    "default_branch":"master",
    "tag_list":[],
    "public":false,
    "archived":false,
    "visibility_level":0,
    "name":"test",
    "name_with_namespace":"test / test",
    "issues_enabled":true,
    "merge_requests_enabled":true,
    "wiki_enabled":true,
    "forks_count":2,
    "open_issues_count":5,
  }

  it('should get all projects', () => {
    nock('http://foo.gitlab.com/api/v3', {
        reqheaders: {
          'PRIVATE-TOKEN': 'abc123'
        }
      })
      .get('/projects')
      .reply(200, [project])

    return getProjects({url:'http://foo.gitlab.com', token:'abc123'})
      .then(json => {
        expect(json).toEqual([project])
      })
  })

  it('should get project members', () => {
    const members  = [
      {
        "name":"jsmapr1",
        "username":"jsmapr1",
        "id":54,
        "state":"active",
        "access_level":40
      }
    ];

    nock('http://foo.gitlab.com/api/v3', {
        reqheaders: {
          'PRIVATE-TOKEN': 'abc123'
        }
      })
      .get('/projects/10/members')
      .reply(200, members)

    return getProjectMembers({url:'http://foo.gitlab.com', token:'abc123'})(10)
      .then(json => {
        expect(json).toEqual(members)
      })
  })
})
