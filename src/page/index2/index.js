import 'babel-polyfill'
import '../common/index.css'
import LazyLoad from '../../components/LazyLoad'
import { iframeScroll } from '../../components/common'

window.onload = function () {
  let lazy = new LazyLoad(document.body)
  lazy.setImgSize()
}

window.iframeScroll = iframeScroll