var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var helpers = require('./helpers');

module.exports = {
  // devtool: "source-map", // or "inline-source-map"

  entry: {
    'polyfills': './src/app/polyfills.ts',
    'vendor': './src/app/vendor.ts',
    'app': './src/app/main.ts'
  },

  resolve: {
    modules: [path.resolve(__dirname, '/src/app'), path.resolve(__dirname, '/src/fonts'), path.resolve('node_modules/')],
    descriptionFiles: ['package.json'],
    extensions: ['', '.js', '.ts', '.css']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff2?(\?.*)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[hash].[ext]"
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[hash].[ext]"
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: "file?name=fonts/[name].[hash].[ext]"
      }, {
        test: /\.svg(\?.*)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xmlm&name=fonts/[name].[hash].[ext]"
      },
      {
        test: /\.(jpe?g|png|gif)?$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=images/[name].[hash].[ext]'
        ]
      },
      {
        test: /\.ico(\?v=\d+\.\d+\.\d+)?$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name].[ext]'
        ]
      }
    ],
    noParse: [new RegExp('./node_modules/localforage/dist/localforage.js')]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
