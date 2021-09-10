import axios from 'axios'

const http = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

http.interceptors.request.use(
  (config) => {
    alert({
      duration: 0,
      message: '加载中...',
      forbidClick: true
    })
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => response,
  () => {
    alert({
      title: '提示',
      message: '网络请求失败，反馈给客服'
    })
  }
)

export default function axiosApi(type, params, method = 'post') {
  const data = method === 'post' ? JSON.stringify(params) : params
  return new Promise((resolve, reject) => {
    http({
      method,
      url: type,
      data
    })
      .then((res) => {
        if (res.data.errcode === 0) {
          resolve(res.data)
        } else {
          // 接口错误提示
          alert(res.data.msg)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
