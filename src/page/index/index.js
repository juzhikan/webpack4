import 'babel-polyfill'
import './index.css'

window.onload = function () {
  let iframes = document.querySelectorAll('iframe')
  Array.prototype.forEach.call(iframes, function (iframe) {
    let html = iframe.contentDocument.documentElement
    iframe.height = Math.max(html.scrollHeight,html.clientHeight) // 文档高度而非视口高度
  })
  lazyLoad()
}

function lazyLoad () {
  let iframes = document.querySelectorAll('iframe')
  let scrollTop = window.pagYoffset || document.documentElement.scrollTop || document.body.scrollTop
  let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 视口高度
  Array.prototype.forEach.call(iframes, function (iframe) {
    iframe.contentWindow.iframeScroll(iframe.offsetTop - scrollTop, windowHeight)
  })
}

/* 节流防抖 */
function throttle (fn, delay, mustTime) {
  if (mustTime <= delay) {
    throw Error('delay must less than mustTime')
    return
  }
  let lastTime = null
  let timer = null
  return function () {
    let context = this // throttle返回的函数对象在这里，外界接收的参数和调用主体都出现在这里
    let args = arguments
    let timeNow = +new Date
    clearTimeout(timer) // 该函数的执行证明发生了新的滚动行为，清除上次默认的最后一次定时器
    if (lastTime === null || timeNow - lastTime >= delay) {
      lastTime = timeNow
      fn.apply(context, args)
    } else {
      // 没有成功执行， 默认为最后一次滚动， 执行最后一次定时器
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, mustTime)
    }
  }
}

window.onscroll = throttle(lazyLoad, 200, 300)