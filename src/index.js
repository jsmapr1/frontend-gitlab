import Issues from './requests/Issues';
import fnargs from 'fn-args';

const gitlab = (auth) => {
    return function(request) {
      console.log(fnargs(request));
    }
}

export default gitlab;
