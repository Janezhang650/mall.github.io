const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 获取绝对路径
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  mode: 'development',
  // webpack 入口文件
  entry: {
    index: './src/pages/index/index.js'
  },
  // webpack输出路径
  output: {
    // 输出目录
    path: resolve('dist'),
    // 输出文件名
    filename: 'js/[name].js'
  },
  // source-map 调试用的，出错时，可以直接定位到源代码
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    // 自动补全扩展名
    extensions: ['.js'],
    // 路径别名
    alias: {
      api: resolve('src/api'),
      fonts: resolve('src/assets/fonts'),
      images: resolve('./src/assets/images'),
      styles: resolve('./src/assets/styles'),
      components: resolve('./src/components'),
      pages: resolve('./src/pages')
    }
  },
  // 不同类型模块的处理规则
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 模板文件
      {
        test: /\.art$/,
        use: 'art-template-loader'
      },
      // 图片
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 10K 的图片转成 base64 编码的 dataURL字符串写到代码中
            limit: 10000,
            // 其他图片转移到
            name: 'images/[name].[ext]',
            esModule: false
          }
        }
        
      },
      // 字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    // 自动将依赖注入 html 模板，并最终输出 html文件 到 目标文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index/index.art'
    })
  ]
}