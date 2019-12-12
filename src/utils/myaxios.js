import axios from 'axios'
// 配置基准路径
axios.defaults.baseURL = 'http://localhost:3000'

// 添加请求拦截器
// config:相当于当前的请求报文
axios.interceptors.request.use(function (config) {
  console.log(config)
  // 在发送请求之前做些什么:获取token，判断是否成功的获取，如果有token则添加请求头的设置，否则不处理
  let token = localStorage.getItem('heima_40_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
