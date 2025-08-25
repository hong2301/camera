import axios, { type AxiosRequestConfig } from 'axios'
// import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? ''
      : `${import.meta.env.VITE_SERVER_BASE_URL}:${import.meta.env.VITE_SERVER_PROD}`,
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.url = (import.meta.env.MODE === 'development' ? '/api' : '') + config.url
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.status !== 0) {
      // ElMessage.error 用于显示错误提示
      // ElMessage({
      //     message: res.message || 'Error',
      //     type: 'error',
      //     duration: 5 * 1000
      // })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error)
    // 处理 HTTP 错误 (如网络错误、404、500 等)
    let message = '请求失败'
    if (error.response) {
      // 服务器返回了响应，但状态码不在 2xx 范围内
      switch (error.response.status) {
        case 401:
          message = '未授权，请登录'
          // 可以在这里添加登出逻辑
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = `请求地址出错: ${error.response.config.url}`
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = error.response.data.message || `连接错误 ${error.response.status}`
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      message = '网络连接异常，请检查您的网络'
    } else {
      // 在设置请求时发生了错误
      message = error.message
    }
    console.log(message)
    // ElMessage.error(message)
    return Promise.reject(error)
  }
)
/**
 * 封装通用请求方法
 * @param {Object} options 请求配置
 * @returns {Promise} 返回 Promise 对象
 */
function request(options: AxiosRequestConfig<unknown>): Promise<unknown> {
  return new Promise((resolve, reject) => {
    service(options)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * 封装 GET 请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Object} config 其他配置
 * @returns {Promise} 返回 Promise 对象
 */
function get(url: string, params: object = {}, config: AxiosRequestConfig = {}): Promise<unknown> {
  return request({
    url,
    method: 'get',
    params,
    ...config
  })
}

/**
 * 封装 POST 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求数据
 * @param {Object} config 其他配置
 * @returns {Promise} 返回 Promise 对象
 */
function post(url: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<unknown> {
  return request({
    url,
    method: 'post',
    data,
    ...config
  })
}

/**
 * 封装 PUT 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求数据
 * @param {Object} config 其他配置
 * @returns {Promise} 返回 Promise 对象
 */
function put(url: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<unknown> {
  return request({
    url,
    method: 'put',
    data,
    ...config
  })
}

/**
 * 封装 DELETE 请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Object} config 其他配置
 * @returns {Promise} 返回 Promise 对象
 */
function del(url: string, params: object = {}, config: AxiosRequestConfig = {}): Promise<unknown> {
  return request({
    url,
    method: 'delete',
    params,
    ...config
  })
}

export default {
  request,
  get,
  post,
  put,
  delete: del,
  service
}
