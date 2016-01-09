var webpack = require('webpack');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: __dirname + "/public/assets",
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      phaser: __dirname + '/phaser/phaser.js',
      pixi: __dirname + '/phaser/pixi.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|phaser)/,
        loader: 'babel',
        query: { presets: ['es2015'] }
      },
      {
        test: /phaser\.js$/,
        loader: 'expose?Phaser!imports?PIXI=pixi'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file'
      }
    ]
  }
};
