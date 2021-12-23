import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_CLOUD_DOMAIN,
  timeout: 10000,
})

function onRequest(config) {
  const token = localStorage.getItem('token')
  if(!!token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
}

function onRequestError(error) {
  return Promise.reject(error)
}

http.interceptors.request.use(onRequest, onRequestError)


function onResponse(response) {
  if(response.data.success) return response.data
  return Promise.reject(response.data)
}

function onResponseError(error) {
  /**
   *  there are three type of errors that would occur
   *  1. api timeout
   *  2. 401 error
   *  3. 403 error
   *  4. 500 error
   */

  return Promise.reject(error)
}

http.interceptors.response.use(onResponse, onResponseError)

export default http