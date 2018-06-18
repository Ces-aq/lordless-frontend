import axios from 'axios'
import store from '@/store'
import { actionTypes } from '@/store/typeNames'

const instance = axios.create({
  baseURL: process.env.BACKEND_SERVER,
  timeout: 30000,
  withCredentials: true
})

// request
instance.interceptors.request.use(async (res) => {
  // set lordless_token to headers
  const address = store.state.user.userInfo.address || store.state.web3.web3Opt.address
  const token = await store.dispatch(`user/${actionTypes.USER_GET_TOKEN_BY_ADDRESS}`, address)
  res.headers.lordless_token = token
  return res
}, error => {
  return Promise.reject(error)
})

// response
instance.interceptors.response.use(async (response) => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default instance
