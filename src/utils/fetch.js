import { Toast } from 'antd-mobile';
import hostConfig from '@/hostConfig'
import queryString from 'query-string'

let BASE = hostConfig.apiBase

/**
 * 请求队列里面是没有请求 开始加载或者停止加载
 */
let requestTaskArray = []
let hideLoading = false
let showOrHideLoad = (show = true) => {
  const requestLength = requestTaskArray.length;

  if (show && requestLength === 0) {
    return Toast.loading('加载中...', 20, () => {
      requestTaskArray = []
      Toast.fail('请求超时', 2);
    });
  } else if (!show && requestLength === 0 && !hideLoading) {
    return Toast.hide();
  }
  return;
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
async function commonFetcdh(url, options, method = 'GET') {
  showOrHideLoad();
  hideLoading = false
  const searchStr = queryString.stringify(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.getItem('folidayToken')}`
        // 'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb3N1biIsIm1lbSI6IjE1MDEwMTUyMDU2IiwiY3JlYXRlZCI6MTU1NjI2NDMyNTAwNCwiZXhwIjoxNTg3ODAwMzI1fQ.toxTryIQ08PBw7j67deZrGyJYBqomBaFBv8WLE5CJOBVdFwnsadTu_cz4i7-Tixqs_Z5XU-vShyO_p0QICkrvA`
      })
    }
  } else {
    initObj = {
      method: method,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('folidayToken')}`,
        // 'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb3N1biIsIm1lbSI6IjE1MDEwMTUyMDU2IiwiY3JlYXRlZCI6MTU1NjI2NDMyNTAwNCwiZXhwIjoxNTg3ODAwMzI1fQ.toxTryIQ08PBw7j67deZrGyJYBqomBaFBv8WLE5CJOBVdFwnsadTu_cz4i7-Tixqs_Z5XU-vShyO_p0QICkrvA`
      }),
      body: searchStr
    }
  }
  try {
    requestTaskArray.push(((BASE + url), initObj))
    let res = await fetch((BASE + url), initObj)
    let { code, data, responseCode, message } = await res.json()
    if (code === "0" || responseCode === "0" || code === "9" || responseCode === "9") {
      return data
    } else {
      showOrHideLoad(false)
      hideLoading = true
      Toast.fail(message, 2);
      throw new Error(message);
    }
  } catch (e) {
    console.log(e)
  } finally {
    requestTaskArray.shift();
    showOrHideLoad(false)
  }
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
export async function _GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */
export async function _POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}