import fnargs from 'fn-args';

export const gitlab = (auth) => {
    return function(request) {
      return request.call(this,auth)();
    }
}

export const parametize = (options) => {
  if(!options)
    return '';
  return '?' + Object.keys(options).map((option) => {
      return option + '=' + options[option];
    }).join('&');
}

export default gitlab;
