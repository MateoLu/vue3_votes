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

// 计算剩余天数

export function dateCount(endTime) {
  // 现在时间
  const now = new Date()
  // 截止时间
  const until = new Date(endTime)
  // 计算时会发生隐式转换，调用valueOf()方法，转化成时间戳的形式
  const days = (until - now) / 1000 / 3600 / 24
  // 下面都是简单的数学计算
  const day = Math.floor(days)
  const hours = (days - day) * 24
  const hour = Math.floor(hours)
  const minutes = (hours - hour) * 60
  const minute = Math.floor(minutes)
  const seconds = (minutes - minute) * 60
  const second = Math.floor(seconds)
  const back = day + '天' + hour + '小时' + minute + '分钟' + second + '秒'
  return back
}
