import Log, {ENV} from 'nw-log';

const log = new Log({
    env: location.href.indexOf('test') !== -1 ? ENV.ST : ENV.GA,
    key: 'comic',
    userId: ''
})

export default log