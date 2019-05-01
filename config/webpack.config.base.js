// @ts-check
const path = require('path');
const { ROOT, ENTRY, DIST, LIBRARY_NAME } = require('./utils');

module.exports = {
  entry: ENTRY,
  output: {
    path: DIST,
    filename: `${LIBRARY_NAME}.umd.js`,
    library: 'DirectusSDK',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it while generating the
          // declaration file after the build step, we don't care about typings
          // yet. We also have the pre-step of linting ts files.
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(ROOT, './node_modules'),
      path.resolve(ROOT, './src')
    ],
    extensions: ['.ts', '.js', '.json',]
  }
}
