const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackNosPlugin = require('@winman-f2e/html-webpack-nos-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var lodash = require('lodash')
lodash.templateSettings.interpolate = /<%=([\s\S]+?)%>/g//设置模板变量匹配变量

const nosUpload = {
  accessId: 'c92f74b0d48f4fb39271a1109da74cc2',
  secretKey: 'f200fad9c6b541d28f01159de8d9ecea',
  endPoint: 'nosdn.127.net',
  port: 80,
  domain: 'https://easyread.nosdn.127.net',
  bucket: 'easyread'
  }
var path = require('path')
var webpack = require('webpack')
var postcssPlugins = [
  require('autoprefixer'),
  require('postcss-px2rem')({
    remUnit: 75
  })
]

var os = require('os');
console.log('===================')
console.log('======user=======')
console.log(os.homedir())
console.log('======current=======')
console.log(__dirname)
console.log('======cwd=======')
console.log(process.cwd())
console.log('===================')

let isProd = process.env.NODE_ENV === 'prod'

let plugins = [
  new ExtractTextPlugin({
    filename: '[name]-[chunkhash:8].css',
    allChunks: true
  }),
  new VueLoaderPlugin()
]

if (isProd) {
  plugins.push(
    new HtmlWebpackNosPlugin({
      nosUpload,
      output: false
    })
  )
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}


var webpackConfig = {
  devServer: {
    proxy: [
      {
        target: "https://th5sdk.manhua.163.com:443",
        context: ["**/*.json"],
        changeOrigin: true
      }
    ],
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hotOnly: true,
    headers: {"Access-Control-Allow-Origin": "*"},
    hot: true,
    port: 9090,
    compress: true,
    headers: {
      'X-foo': 'bar'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  mode: process.env.NODE_ENV === 'prod' ? 'production' : 'development',
  plugins,
  resolve: {
    extensions: ['.js', '.vue'],  
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'images')
    }
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({ /* your config */ })
    ],
    splitChunks:{
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        commons: {
          name: 'chunk-commons',
          test: path.resolve(__dirname, 'src'), // 可自定义拓展你的规则
          minChunks: 3, // 最小公用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
      { 
        test: /\.(png|jpg|TTF|eot)$/, 
        loader: 'url-loader?prefix=res/&limit=5000'
      },
      { 
        test: /\.vue$/, 
        loader: 'vue-loader',
        options: {
            postcss: {
              plugins: postcssPlugins
            }
        }
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: postcssPlugins
              }
            }
          ]
        })
      }
    ]
  }
}

if (!isProd) {
  webpackConfig.devtool = 'cheap-module-eval-source-map'
}

module.exports = webpackConfig