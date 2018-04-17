module.exports = {
  devtool: 'source-map',
  output: {
    library: require('./package.json').name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  }
};
