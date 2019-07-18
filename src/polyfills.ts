/* nodeonlyblock:start */
import * as es6promise from 'es6-promise';
es6promise.polyfill();
/* nodeonlyblock:end */
// fetch polyfill only for browsers
const { fetch, Headers, Request, Response } = require('fetch-ponyfill')();
if (fetch) {
  // @ts-ignore
  fetch = fetch;
  // @ts-ignore
  Headers = Headers;
  // @ts-ignore
  Request = Request;
  // @ts-ignore
  Response = Response;
}
