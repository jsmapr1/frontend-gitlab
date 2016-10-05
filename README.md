# frontend-gitlab
GitLab api node module that does not require server side dependencies.

## Usage
The goal is to make a very light weight set of functions to access the gitlab
api.


There's a mix of focused requests and more broad custom functions.
And you can use composition to use credentials over and over.
So import only the ones that you need.

Here's a couple of examples:

```javascript
import {getIssues} from 'frontend-gitlab/requests/issues';
getIssues({url:'http://foo.gitlab.com', token:'abc123'})();
```
That will return promise that will resolve with a list of project issues.

A slightly more complicated example shows the value of composition:

```javascript
import {getProjectIssues} from 'frontend-gitlab/requests/issues';
const projectIssues = getProjectIssues({url:'http://foo.gitlab.com', token:'abc123'});
//Return the closed issues
projectIssues(0, {'state':'closed'})
//Return the open issues
projectIssues(0, {'state':'open'})
```

You can also mix and match
```javascript
import gitlab from 'frontend-gitlab';
import {projectIssues, getProjectIssues} from 'frontend-gitlab/requests/issues';

const creds = gitlab({url:'http://foo.gitlab.com', token:'abc123'})

creds(getIssues);
creds(getProjectIssues, 0, {
  'state':'open'
});
```

In this case, all you need to do is pass the function along with its arguments
and you only need to add the credentials once.

This is a work in progress, so there are very little prebuilt functions.
However, you should be able to do anything you want by creating a custom request
with a few inputs.

Just get the [path](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api) for the request you are making, pass a request type if needed
and then an object for the parameters.

```javascript
import request from 'frontend-gitlab';
const requester = request({url:'http://foo.gitlab.com', token:'abc123'});

// Default request type is GET
requester('projects/0/issues', {
    params: {
        'state':'closed'
    }
})

// POST or any other method can be specified
requester('projects/0/issues', {
    requestType: {
        method: "POST"
    },
    params: {
        title: 'New Issue',
        labels: 'iteration-1',
        assignee_id: 1
    }
})
```

Everything returns a promise, so use as you would for any other request.
