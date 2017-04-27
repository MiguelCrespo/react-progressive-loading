var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = function (env) {
  let output = {
    path: env.prod ? __dirname + '/dist' : __dirname,
    publicPath: env.prod ? 'dist/' : '/',
    filename: env.prod ? 'index.js' : 'bundle.js',
  };

  let entryPoints = [];
  let plugins = [];
  let externals = {};


  if (env.prod) {
    output.libraryTarget = 'commonjs2';
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    externals.react = {
      commonjs2: "react",
    };

    entryPoints.push('./src/ProgressiveImage.js');

  } else {
    entryPoints = [
      'babel-polyfill',
      './index.js'
    ];
  }

  let config = {
    devtool: env.prod ? undefined : 'source-map',
    context: __dirname,
    entry: entryPoints,
    output: output,
    externals: externals,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.jpg$/, loader: 'url-loader' }
      ]
    }
  }

  return config;
};
