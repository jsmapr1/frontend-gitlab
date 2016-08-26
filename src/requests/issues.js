import {parametize, generateRequestParameters, validate} from '../index'

const postRequest = {
  method: "POST"
}

const putRequest = {
  method: "PUT"
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
          postRequest
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
          putRequest
        )
      )
      .then(response => {
          return response.json();
      })
  }
}
