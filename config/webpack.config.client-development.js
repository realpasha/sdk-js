// @ts-check
const webpackBaseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, webpackBaseConfig, {
  target: "web",
  mode: "development",
  devtool: "inline-source-map",
});
