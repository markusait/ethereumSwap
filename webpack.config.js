const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const HTMLWebpackPlugin = require('html-webpack-plugin');
// const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
//   template: path.join(__dirname, 'client/public', 'index.html'),
//   filename: 'index.html',
//   inject: 'body'
// });
module.exports = {
  entry: path.join(__dirname, 'client', 'index.js'),
  devServer: {
    // publicPath: "/",
    contentBase: path.join(__dirname, 'client'),
    // hot: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js'
  },
  // plugins: [HTMLWebpackPluginConfig],
  // plugins: [
  //   // Copy our app's index.html to the build folder.
  //   new CopyWebpackPlugin([
  //     { from: './client/public/index.html', to: 'index.html' }
  //   ])
  // ],
  //not sure if needed
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
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
      }
    ]
  }
}
