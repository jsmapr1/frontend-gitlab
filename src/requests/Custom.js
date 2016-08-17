import {parametize, generateRequestParameters, validate} from '../index'

const BASE_URL = '/api/v3/'

export const request = ({url, token}) => {
  validate(url,token);
  return (path, {requestType, params} = {}) => {
    return fetch(url + BASE_URL + path + parametize(params),
      Object.assign(
        generateRequestParameters(token),
        requestType || {method:"Get"}
      ))
      .then(response => {
          return response.json();
      })
  }
}
