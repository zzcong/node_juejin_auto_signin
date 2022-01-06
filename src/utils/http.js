const axios = require('axios')
const {log, getConfig} = require('./util')
const {cookie} = getConfig()

axios.defaults.headers = {
  "Cookie": cookie,
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36"
}

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