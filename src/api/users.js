// 这个文件专门用于处理与users表相关的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

// 2. 实现登陆验证
export const userLogin = (data) => {
  // axios({})返回是一个promise对象
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
