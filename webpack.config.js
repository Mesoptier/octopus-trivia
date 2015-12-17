var webpack = require('webpack');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: __dirname + "/public/assets",
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      Phaser: __dirname + '/phaser/phaser.js',
      PIXI: __dirname + '/phaser/pixi.js'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|phaser)/,
        loader: 'babel',
        query: { presets: ['es2015'] }
      }
    ]
  }
};
