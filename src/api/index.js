import $http from '@/utils/http'

function getUserInfo (data) {
  return $http.get('getUserInfo', {
    params: data
  })
}

function updateUserInfo (data) {
  return $http.post('updateUserInfo', data)
}

export default {
  getUserInfo,
  updateUserInfo
}
