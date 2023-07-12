import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getUrlParam(name){
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  let r = window.location.search.substr(1).match(reg)
  if(r != null) return unescape(r[2])
  return null
}

export function getToken() {
  const token = getUrlParam('token')
  if (token) Cookies.set(TokenKey, token)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
