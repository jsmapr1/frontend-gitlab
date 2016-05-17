import fnargs from 'fn-args';

export const gitlab = (auth) => {
    return function(request) {
      return request.call(this,auth)();
    }
}



export default gitlab;
