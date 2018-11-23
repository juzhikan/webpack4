import Toast from "@/common/toast"
import axios from 'axios'
import qs from 'qs'

var u = navigator.userAgent

export function android () { //android终端或者uc浏览器
    return (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1);
}

export function ios () { //是否为iPhone或者QQHD浏览器
    return (u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1 || u.indexOf('iPad') > -1);
}

export function ipad () {
    return u.indexOf('iPad') > -1;
}

export function getPaltform () {
    if (android()) {
        return 1
    } else if (ipad()) {
        return 2
    } else if (ios()){
        return 3
    } else {
        return 4
    }
}

export function random(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
}

export function getPayDomain () {
    var host = location.host
    if (host.indexOf('test') !== -1) return 'https://testpay.manhua.163.com'
    if (host.indexOf('pre') !== -1) return 'https://prepay.manhua.163.com'
    return 'https://pay.manhua.163.com'
}

export function isComic () {
    var ua = navigator.userAgent.toLowerCase()
    return /neteasecomic/i.test(ua)
}

export function object2query (param, key, encode) {  
    if (param == null) return ''
        var paramStr = ''
        var t = typeof (param)
    if (t == 'string' || t == 'number' || t == 'boolean') {  
        paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param)
    } else {  
        for (var i in param) {  
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
            paramStr += object2query(param[i], k, encode)
        }  
    }
    return paramStr
}

export function query2object(query){
    if(!query){
        return {};
    }
    var searchHash = query.split('&');

    var ret = {};
    for(var i = 0, len = searchHash.length; i < len; i++){ //这里可以调用each方法
        var pair = searchHash[i];
        if((pair = pair.split('='))[0]){
            var key   = decodeURIComponent(pair.shift());
            var value = pair.length > 1 ? pair.join('=') : pair[0];
            
            if(value != undefined){
                value = decodeURIComponent(value);
            }
            if(key in ret){
                if(ret[key].constructor != Array){
                    ret[key] = [ret[key]];
                }
                ret[key].push(value);
            }else{
                ret[key] = value;
            }
        }
    }
    return ret
}

export function throttle (fn, delay, mustTime) {
    if (mustTime <= delay) {
      throw Error('delay must less than mustTime')
      return
    }
    let lastTime = null
    let timer = null
    return function () {
      let context = this
      let args = arguments
      let timeNow = +new Date
      clearTimeout(timer) // 该函数的执行证明发生了新的请求行为，清除上次默认的最后一次定时器（如果有）
      if (lastTime === null || timeNow - lastTime >= delay) {
        lastTime = timeNow
        fn.apply(context, args)
      } else {
        if (!mustTime) {
            Toast('操作过于频繁，请稍后再试', 1500)
            return
        }
        // 没有成功执行， 默认为最后一次请求， 执行最后一次定时器
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, mustTime)
      }
    }
}

export function version (a,b,c) {
    var ua = window.navigator.userAgent;
    var regResult = ua.match(/NeteaseSnailReader\/(\d[.\d]+).*\((.*);(.*)\)/i)
    var version = regResult[1]
    var versionArr = version.split('.')
    var _a = Number(versionArr[0])
    var _b = Number(versionArr[1])
    var _c = Number(versionArr[2])
    if (_a > a) {
        return true
    } else if (_a === a) {
        if (_b > b) {
            return true
        } else if (_b === b) {
            if (_c > c) {
                return true
            } else if (_c === c) {
                return true
            }
            return false
        }
        return false
    }
    return false
}

export function androidVerticalAlign (h, add) {
    if (android()) return `line-height: ${(h + add) / 75}rem;`
    return ''
}

export function post (url, params) {
    let _params = params
    _params.csrfToken = window.PG_CONFIG.csrfToken
    return axios.post(url, qs.stringify(_params),{headers: { 'content-type': 'application/x-www-form-urlencoded' }})
}


export function backToPage () {
    var isMobileBaidu = android() && (/baidubrowser/i.test(navigator.userAgent))
    
    if (history.length === 1 && !isMobileBaidu) {
        location.href = '/';
        return
    }

    if (location.search.length > 0) {
        var query = qs.parse(location.search.substring(1))
        if (query.signed_in_callback_xhr) {
            // 小米浏览器没法go(-4)

            if (query.signed_in_callback_td) {
                // history.go(-4);
                location.href = '/';
            } else {
                history.go(-3);
            }

        } else if (query.signed_in_callback) {
            // if (query.signed_in_callback_td) {
            //     history.go(-3);
            // } else {
            //     history.go(-2);
            // }
            location.href = '/';
        } else {
            history.go(-1);
        }
    } else {
        var isQQInternal = /qq\//i.test(navigator.userAgent);
        var isMiUiBrowser = android() && (/miuibrowser/i.test(navigator.userAgent));
            // qq内嵌浏览器和小米内置浏览器document.referrer始终为空
        var isDocumentReferrerBroken = isQQInternal || isMiUiBrowser;

        // 从微博跳转回来document.referrer可能为空
        if (document.referrer === '' && !isDocumentReferrerBroken) {
            location.href = '/';
            return;
        }

        history.go(-1);
    }
}

export function get (url) {
    return axios.get(url)
}