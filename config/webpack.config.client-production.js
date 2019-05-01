// @ts-check
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { LIBRARY_NAME } = require('./utils');
const clientDevelopmentConfig = require('./webpack.config.client-development');

module.exports = Object.assign({}, clientDevelopmentConfig, {
  mode: "production",
  devtool: "source-map",
  output: {
    ...clientDevelopmentConfig.output,
    filename: `${LIBRARY_NAME}.umd.min.js`
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ]
});
