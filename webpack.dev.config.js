const webpack = require('webpack')
const { join } = require('path')

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000,
    watchContentBase: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
