function generateRequestParameters(token) {
  return {headers: new Headers({'PRIVATE-TOKEN': token})}
};
function validate(url,token) {
  if(!token || !url) throw new Error("Please include Token");
}
export const  getIssues = ({url, token}) => {
  validate(url,token);
  return fetch(url+'/api/v3/issues', generateRequestParameters(token))
    .then(response => {
        return response.json();
    })
}
