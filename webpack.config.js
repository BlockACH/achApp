var webpack = require('webpack');

// var commonsPlugin =
//   new webpack.optimize.CommonsChunkPlugin('mycommon.js');

module.exports = {
  context: __dirname + '/src',
  entry: {
    index: './index.jsx',
    base: './base.jsx',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    // [name] 會依據上面 entry 的屬性名稱變動
    publicPath: 'http://localhost:8080/build/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // plugins: [commonsPlugin],
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' }
    ]
  },
};
