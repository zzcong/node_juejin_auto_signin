const axios = require('axios')
const {log, getConfig} = require('./util')
const {cookie} = getConfig()

axios.defaults.headers['Cookie'] = cookie

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => response,
  error => {
    log('请求出错！！！', true)
    return Promise.reject(error)
  }
)

const get = (url, params = {}, config = {}) => {
  return axios.get(url, {
    params: params,
    ...config
  })
}
const post = (url, data = {}, config = {}) => {
  return axios.post(url, {
    data: data,
    ...config
  })
}

module.exports = {
  get, 
  post
}