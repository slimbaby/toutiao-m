// 存储localstorage
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取localstorage
export const getItem = key => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}
// 移除localstorage
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
