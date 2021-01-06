const chunk = (str,size) => { 
  const result = new Array()
  for (let i = 0; i <= str.length; i+=3) {
    result.push(str.slice(i,i+3));
  }
  return result 
}