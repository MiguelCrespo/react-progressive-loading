var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    './index.js'
  ],

  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.jpg$/, loader: 'url-loader'}
    ]
  }
};
