import {parametize} from '../index'

function generateRequestParameters(token) {
  return {headers: new Headers({'PRIVATE-TOKEN': token})}
};

function validate(url,token) {
  if(!token || !url) throw new Error("Please include Token");
}

const postMethod = () => {
  return {
    method: "POST"
  }
}

const putMethod = () => {
  return {
    method: "PUT"
  }
}

export const getIssues = ({url, token}) => {
  validate(url,token);
  return () => {
    return fetch(url + '/api/v3/issues', generateRequestParameters(token))
      .then(response => {
          return response.json();
      })
  }
}

export const  getProjectIssues = ({url, token}) => {
  validate(url,token);
  return (project, options) => {
    return fetch(url + `/api/v3/projects/${project}/issues${parametize(options)}`, generateRequestParameters(token))
      .then(response => {
          return response.json();
      })
  }
}

export const postProjectIssue = ({url, token}) => {
  validate(url,token);
  return (project, options) => {
    return fetch(url + `/api/v3/projects/${project}/issues${parametize(options)}`,
        Object.assign(
          generateRequestParameters(token),
          postMethod()
        )
      )
      .then(response => {
          return response.json();
      })
  }
}

export const editProjectIssue = ({url, token}) => {
  validate(url,token);
  return (project, issueId, options) => {
    return fetch(url + `/api/v3/projects/${project}/issues/${issueId}${parametize(options)}`,
        Object.assign(
          generateRequestParameters(token),
          putMethod()
        )
      )
      .then(response => {
          return response.json();
      })
  }
}
