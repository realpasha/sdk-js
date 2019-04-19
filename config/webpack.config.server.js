const { LIBRARY_NAME } = require('./utils');
const webpackBaseConfig = require('./webpack.config.base');
const nodeExternals = require('webpack-node-externals');

module.exports = Object.assign({}, webpackBaseConfig, {
  target: "node",
  mode: "production",
  output: {
    ...webpackBaseConfig.output,
    filename: `${LIBRARY_NAME}.js`
  },
  externals: [nodeExternals()]
});
