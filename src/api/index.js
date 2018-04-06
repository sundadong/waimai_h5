import $http from '@/utils/http'

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
