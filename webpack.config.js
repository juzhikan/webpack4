const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/page/index/index.js',
    index1: './src/page/index1/index.js',
    index2: './src/page/index2/index.js',
    index3: './src/page/index3/index.js',
    index4: './src/page/index4/index.js'
  },
  output: {
    filename: '[name]-[chunkhash:8].js'
  },
  mode: 'development',
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash:8].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'index1.html',
      template: 'template1.html',
      chunks: ['index1']
    }),
    new HtmlWebpackPlugin({
      filename: 'index2.html',
      template: 'template2.html',
      chunks: ['index2']
    }),
    new HtmlWebpackPlugin({
      filename: 'index3.html',
      template: 'template3.html',
      chunks: ['index3']
    }),
    new HtmlWebpackPlugin({
      filename: 'index4.html',
      template: 'template4.html',
      chunks: ['index4']
    })
  ],
  module: {
    rules: [
      { 
        test: /\.(png|jpg|TTF|eot)$/, 
        use: 'url-loader?prefix=res/&limit=5000'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                modules: true,
                localIdentName: "[local]---[hash:base64:5]",
                camelCase: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer'),
                    require('postcss-px2rem')({remUnit: 75})
                  ]
                }
              }
            }
          ]
        })
      }
    ]
  }
}