import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import axios from './axios'
import {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react'

const useAxios = (url, configs, responseCallback) => {
  const [resp, setResp] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const controller = useRef(new AbortController())

  const request = useCallback(async ({
    data,
    params,
  } = {}) => {
    setIsLoading(true)
    try {
      const res = await axios({
        url,
        ...configs,
        data,
        params,
        signal: controller.current.signal,
      })
      setResp(res)
      if(typeof responseCallback === 'function') {
        responseCallback(res)
      }
    } catch(err) {
      setError(err)
      message.error(err.errorMsg)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  useEffect(() => {
    return () => {
      // to cancel request when component unmounted
      controller.current.abort()
    }
  }, [])

  return {
    request,
    resp,
    isLoading,
    error,
  }
}

export default useAxios
