import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'

export default function (str, duration) {
    Toast({
        message: str,
        duration: duration
    })
}