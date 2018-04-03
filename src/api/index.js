import $http from '@/util/http.js'

function getUserInfo (id) {
  return $http.get('getUserInfo?id=' + id)
}

function updateUserInfo (data) {
  return $http.post('updateUserInfo', data)
}

export {
  getUserInfo,
  updateUserInfo
}
