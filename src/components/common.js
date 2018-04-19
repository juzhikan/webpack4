function iframeScroll (top, screenHeight) {
  let imgs = document.querySelectorAll('img')
  let html = document.documentElement
  let documentHeight = Math.max(html.scrollHeight,html.clientHeight)//文档高度而非视口高度
  Array.prototype.forEach.call(imgs,function (img) {
    let isComein = top + documentHeight >= documentHeight - img.offsetTop - img.clientHeight
    let notgoout = top + img.offsetTop < screenHeight
    if (isComein && notgoout) {
      img.src = img.getAttribute('data-src')
    }
  })
}

export { iframeScroll }