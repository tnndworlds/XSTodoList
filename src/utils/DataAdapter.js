export function arrayToString(items, prefix, postFix, seperator){
  var tmpArr = [];
  items.map((item)=>{
  	tmpArr.push(prefix + item + postFix);
  })
  return tmpArr.join(seperator);
}
