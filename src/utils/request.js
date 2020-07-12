const axios = require('axios');
const baseURL = 'http://47.115.52.184:8900'

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})

/**
 * request拦截器
 */
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

/**
 * response拦截器
 */
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

module.exports = service;
