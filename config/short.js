var path = require('path')
var baseconfig = require('../webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let isProd = process.env.NODE_ENV === 'prod'
let suffix = isProd ? 'html' : 'html'
let basepath = path.resolve(__dirname, './') 
baseconfig.plugins.push(new HtmlWebpackPlugin({
  filename: isProd ? path.resolve(basepath, '../dist/avg.html') : 'index.html',
  template: path.resolve(basepath, '../src/page/short/instruction/template.' + suffix)
}))

baseconfig.entry = {
  index: './src/page/short/index.js'
}

module.exports = baseconfig