const path = require('path')
const { join, resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'client/src', 'index.js')],
  devServer: {
    // publicPath: "/",
    contentBase: path.join(__dirname, 'client'),
    // hot: true crashes if used???
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'client/public', 'index.html'),
      filename: './index.html'
    })
  ],

  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: [/client/, /node_modules/]
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'stage-2']
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader',
      include: '/build/contracts/'
    }]
  }
}

//******************************
// Additional Webpack config
//******************************

  // entry: path.join(__dirname, 'client', 'index.js'),

  // plugins: [HTMLWebpackPluginConfig],
  // plugins: [
  //   // Copy our app's index.html to the build folder.
  //   new CopyWebpackPlugin([
  //     { from: './client/public/index.html', to: 'index.html' }
  //   ])
  // ],
  //not sure if needed
  // devtool: 'source-map',

// const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
//   template: path.join(__dirname, 'client/public', 'index.html'),
//   filename: 'index.html',
//   inject: 'body'
// });
