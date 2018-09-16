/**
 * url 
 */

const getCurrentUrl = () => {
  return location && location.href
}

const getHash = () => {
  return location.hash
}
export const url = {
  getCurrentUrl: getCurrentUrl,
  getHash: getHash
}