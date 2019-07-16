const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ENTRY = path.resolve(ROOT, 'src/index.ts');
const DIST = path.resolve(ROOT, 'dist');
const LIBRARY_NAME = 'directus-sdk';

module.exports.ROOT = ROOT;
module.exports.ENTRY = ENTRY;
module.exports.DIST = DIST;
module.exports.LIBRARY_NAME = LIBRARY_NAME;
