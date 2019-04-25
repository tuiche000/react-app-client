import { Toast } from 'antd-mobile';

let BASE = ""
switch (process.env.NODE_ENV) {
  case "development": // 开发
    BASE = 'http://unitest.fosunholiday.com';
    break;
  case "production": // 生产
    BASE = 'http://unitest.fosunholiday.com';
    break;
  case "test": // 测试
    BASE = 'http://unitest.fosunholiday.com?mode=test';
    break;
  default:
  //
}

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
  const searchStr = obj2String(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.getItem('folidayToken')}`
      })
    }
  } else {
    initObj = {
      method: method,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('folidayToken')}`
      }),
      body: searchStr
    }
  }
  try {
    requestTaskArray.push(((BASE + url), initObj))
    let res = await fetch((BASE + url), initObj)
    let { code, data, responseCode, message } = await res.json()
    if (code === "0" || responseCode === "0") {
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