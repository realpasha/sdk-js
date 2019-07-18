/* nodeonlyblock:start */
import * as es6promise from 'es6-promise';
import 'isomorphic-fetch';
/* nodeonlyblock:end */
// fetch polyfill only for browsers
import 'whatwg-fetch';
/* nodeonlyblock:start */
es6promise.polyfill();
/* nodeonlyblock:end */
