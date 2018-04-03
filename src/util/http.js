import axios from 'axios'
import qs from 'qs'

const baseURL = '/'

const Http = axios.create({
  baseURL: baseURL, // 因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Source': 'ydb_h5',
    'Appid': 'fqejnf3439454968946'
  }
})

Http.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  // 序列化数据
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    config.headers.Sign = JSON.stringify(config.data)
    config.data = qs.stringify(config.data)
  }
  if (token) {
    if (config.url.indexOf('?') > -1) {
      config.url += '&access_token=' + token
    } else {
      config.url += '?access_token=' + token
    }
  }
  return config
}, error => {
  console.log(error)
  // return Promise.reject(error)
})

Http.interceptors.response.use(res => {
  console.log(res)
  return res
}, error => {
  console.log(error.message)
  // return Promise.reject(error)
})

export default Http
