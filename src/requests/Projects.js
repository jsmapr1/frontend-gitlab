import request from './Custom';

export const getProjects = ({url, token}) => {
  const projectRequest = request({url:url, token:token});
  return projectRequest('projects', {
    requestType: {
      method: "GET"
    },
    params: {}
  });
}
