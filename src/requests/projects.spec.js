import expect from 'expect';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import {getProjects} from './Projects';

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

  it('should get all issues', () => {
    nock('http://foo.gitlab.com/api/v3', {
        reqheaders: {
          'PRIVATE-TOKEN': 'abc123'
        }
      })
      .persist()
      .get('/projects')
      .reply(200, [project])
    getProjects({url:'http://foo.gitlab.com', token:'abc123'})
      .then(json => {
        expect(json).toEqual([project])
      })
  })
})
