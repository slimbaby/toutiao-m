import axios from 'axios'
import store from '@/store'
// 请求模块
const request = axios.create({
  // 根路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
export default request
