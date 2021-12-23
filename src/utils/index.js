import {
  lazy,
  Suspense,
} from "react"
import i18n from '@/i18n'

export const delay = (time = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const camelToUnderscore = (str) => {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase()
}

export const shallowCompare = (obj1, obj2) => {
  const keyArr1 = Object.keys(obj1)
  const keyArr2 = Object.keys(obj2)
  return (keyArr1.length === keyArr2.length) &&
    keyArr1.every(key => {
      return obj2.hasOwnProperty(key) && (obj1[key] === obj2[key])
    })
}

export const getFormData = (data) => {
  const formData = new FormData()
  Object.keys(data).forEach(key => {
    formData.set(key, data[key])
  })
  return formData
}

export const getLazyComponent = (name, type = 'container') => {
  let LazyNode
  if(type === 'container') {
    LazyNode = lazy(() => import(/* webpackChunkName: '[request]' */`@containers/${name}`))
  } else {
    LazyNode = lazy(() => import(/* webpackChunkName: '[request]' */`@views/${name}`))
  }
  return (
    <Suspense fallback={null}>
      <LazyNode />
    </Suspense>
  )
}

export const getCommonInfo = () => {
  const {
    language
  } = i18n

  return {
    species: 'SW',
    device_id: "browser",
    locale: language,
  }
}

const isBase64 = (str) => {
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
  return base64regex.test(str)
}
export const parseJWT = (token) => {
  const base64Payload = token.split('.')[1]
  if(!isBase64(base64Payload)) {
    throw new Error('invalid base64 token')
  }
  const decodeToken = JSON.parse(Buffer.from(base64Payload, 'base64').toString())
  return decodeToken
}
