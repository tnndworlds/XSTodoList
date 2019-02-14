// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  console.log(str);
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('xs-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  console.log(authority);
  return authority || ['admin'];
}

export function setAuthority(userInfo) {
  var userType = userInfo.userEntity.type;
  console.log(userType);
  const proAuthority = typeof userType === 'string' ? [userType] : userType;
  sessionStorage.setItem('userId', userInfo.userId);
  sessionStorage.setItem('token', userInfo.token);
  return localStorage.setItem('xs-authority', JSON.stringify(proAuthority));
}
