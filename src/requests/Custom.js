import {parametize, generateRequestParameters, validate} from '../index'

const BASE_URL = '/api/v3/'

export const request = ({url, token}) => {
  validate(url,token);
  return (path, {requestType, params}) => {
    let parametized = params && Object.keys(params).length ? parametize(params):'';
    return fetch(url + BASE_URL + path + parametized,
      Object.assign(
        generateRequestParameters(token),
        requestType || {method:"Get"}
      ))
      .then(response => {
          return response.json();
      })
  }
}

export default request;
