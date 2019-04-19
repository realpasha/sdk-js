const { cyan, magenta } = require('chalk');
const { ROOT, ENTRY, DIST, LIBRARY_NAME } = require('./config/utils');
const clientDevelopmentConfig = require('./config/webpack.config.client-development');
const clientProductionConfig = require('./config/webpack.config.client-production');
const serverConfig = require('./config/webpack.config.server');

const printPath = segment => cyan(segment.replace(ROOT, '~'));

console.log([
  magenta(`-------------------------------------------------`),
  `Root: ${cyan(ROOT)}`,
  `Entry: ${printPath(ENTRY)}`,
  `OutDir: ${printPath(DIST)}`,
  `Library: ${printPath(LIBRARY_NAME)}`,
  magenta(`-------------------------------------------------`),
  '' // add spacer
].join('\n'))

module.exports = [clientDevelopmentConfig, clientProductionConfig, serverConfig];
