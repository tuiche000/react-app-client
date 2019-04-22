import { Toast } from 'antd-mobile';
const BASE = 'http://unitest.fosunholiday.com';


/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}

/**
 * 请求队列里面是没有请求 开始加载或者停止加载
 */
let requestTaskArray = []
let showOrHideLoad = (show = true) => {
  const requestLength = requestTaskArray.length;
  if (show && requestLength === 0) {
    return Toast.loading('加载中...', 20, () => {
      requestTaskArray = []
      Toast.fail('请求超时', 2);
    });
  } else if (!show && requestLength === 0) {
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
  const searchStr = obj2String(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb3N1biIsIm1lbSI6IjE4NTE2NjY2NDczIiwiY3JlYXRlZCI6MTU1NTY2NjE1MDE2NywiZXhwIjoxNTg3MjAyMTUwfQ.pwjogX_t4_4vwhwap9-cZpXVU3IAAT6Sawgf_PA4kD5KnqcfwqqDrAomVixK6SglkczXrEmhgLlyAkz3o5FNpw'
      })
    }
  } else {
    initObj = {
      method: method,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb3N1biIsIm1lbSI6IjE4NTE2NjY2NDczIiwiY3JlYXRlZCI6MTU1NTY2NjE1MDE2NywiZXhwIjoxNTg3MjAyMTUwfQ.pwjogX_t4_4vwhwap9-cZpXVU3IAAT6Sawgf_PA4kD5KnqcfwqqDrAomVixK6SglkczXrEmhgLlyAkz3o5FNpw'
      }),
      body: searchStr
    }
  }
  try {
    requestTaskArray.push(((BASE + url), initObj))
    let res = await fetch((BASE + url), initObj)
    let { code, data, responseCode } = await res.json()
    console.log()
    if (code === "0" || responseCode === "0") {
      return data
    }
  } catch (err) {
    console.log(err)
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

// export async function getAll() {
//   Promise.all()
// }