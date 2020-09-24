import axios from 'axios'
import qs from 'qs'
import util from './util'
import Toast from '@/components/toast'

// 请求基础url
const baseURL = '/'

// 创建请求实例
const http = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Source': 'ydb_mshop'
  }
})

// 请求拦截
http.interceptors.request.use(config => {
  // 请求头添加token
  const token = localStorage.getItem('TOKEN') ? JSON.parse(localStorage.getItem('TOKEN')) : null
  if (token && token.access_token) {
    config.headers['Access-Toekn'] = token.access_token.value
  }

  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    // 请求头添加签名
    config.headers.Sign = util.createSign(config.data)
    // 序列化数据
    config.data = qs.stringify(config.data)
  }

  return config
}, error => {
  Toast(error)
  // return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(res => {
  return res.data
}, error => {
  Toast(error)
  // return Promise.reject(error)
})

export default http
