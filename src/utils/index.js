// 防抖函数
export function debunce(fn, delay = 300) {
  let timer
  return (...args) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
