const webpack = require('webpack');
const path = require('path');
const envFile = require('node-env-file');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// move credentials external to repo
try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'))
} catch (e) {

}

module.exports = {
  entry: {
    app: [
      path.join(__dirname, './app/app')
    ],
    vendor: [
      'script!jquery/dist/jquery.min.js',
      'script!foundation-sites/dist/js/foundation.min.js'
    ]
  },
  output: {
    path: path.join(__dirname, "./public"),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
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
    //new webpack.optimize.CommonsChunkPlugin(),
    new WebpackMd5Hash(),
    new ManifestPlugin({
      fileName: 'build-manifest.json'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: 'body',
      template: 'public/index.ejs'
    }),
    //new ExtractTextPlugin('public/style.css', {
      //allChunks: true
    //}),
  ],

  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
    ],
    alias: {
      app: 'app', // the alias to end all aliases
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|.idea)/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          //'file-loader?hash=sha512&digest=hex&name=/public/images/[hash].[ext]',
          'file-loader?emitFile=false&name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      /*
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          ['style-loader', 'css-loader', 'sass-loader']
        )
      },
      */
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  node: {
    fs: 'empty'
  },
  //devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};

// $ NODE_ENV=production webpack -p
