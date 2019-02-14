export function getUserId(){
  const userId = sessionStorage.getItem('userId');
  if (userId){
    return userId;
  }
  return "";
}
