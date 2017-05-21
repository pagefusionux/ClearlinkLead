const webpack = require('webpack');
const path = require('path');
const envFile = require('node-env-file');
//const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// move credentials external to repo
try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'))
} catch (e) {

}

const config = {
  entry: {
    app: [
      './app/app'
    ],
    vendor: [
      'script-loader!jquery/dist/jquery.min.js',
      'script-loader!foundation-sites/dist/js/foundation.min.js'
    ]
  },
  output: {
    path: path.join(__dirname, "./public"),
    //filename: '[name].[chunkhash].js',
    //chunkFilename: '[name].[chunkhash].js'
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        TOKEN_URL: JSON.stringify(process.env.TOKEN_URL),
        API_URL: JSON.stringify(process.env.API_URL),
        CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
        CLIENT_SECRET: JSON.stringify(process.env.CLIENT_SECRET),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      hash: true,
      inject: 'body',
      template: 'public/index.ejs'
    }),
    new ExtractTextPlugin({
      //filename: "[name].[contenthash].css",
      filename: "[name].css",
      //disable: process.env.NODE_ENV === "development"
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'app'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
              'stage-0',
              'react'
            ]
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          //'file-loader?hash=sha512&digest=hex&name=/public/images/[hash].[ext]',
          'file-loader?emitFile=false&name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader",
            options: {
              includePaths: [
                "node_modules/foundation-sites/scss"
              ]
            }
          }]
        })
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  node: {
    fs: 'empty'
  },
  stats: {
    warnings: false
  }
  //devtool: 'source-map'

  //devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};

module.exports = config;

// $ NODE_ENV=production webpack -p
