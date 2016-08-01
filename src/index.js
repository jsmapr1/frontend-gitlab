import fnargs from 'fn-args';

export const gitlab = (auth) => {
    return function(request) {
      return request.call(this,auth)();
    }
}

export const parametize = (options) => {
  if(!options) {
    return '';
  }
  return '?' + Object.keys(options).map((option) => {
      return option + '=' + encodeURI(options[option]);
    }).join('&');
}

export const generateRequestParameters = (token) => {
  return {headers: new Headers({'PRIVATE-TOKEN': token})}
};

export const validate = (url,token) => {
  if(!token || !url) throw new Error("Please include Token");
}

export default gitlab;
