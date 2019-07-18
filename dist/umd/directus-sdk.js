/**! @directus/sdk-js v5.4.0-rc.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('es6-promise'), require('isomorphic-fetch')) :
  typeof define === 'function' && define.amd ? define(['exports', 'es6-promise', 'isomorphic-fetch'], factory) :
  (global = global || self, factory(global.Directus = {}, global.es6promise));
}(this, function (exports, es6promise) { 'use strict';

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };
  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }
  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];
    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }
  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }
  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };
    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }
    return iterator
  }
  function Headers(headers) {
    this.map = {};
    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }
  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };
  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };
  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };
  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };
  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };
  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };
  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };
  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };
  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };
  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }
  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }
  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }
  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }
  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }
  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);
    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }
  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }
  function Body() {
    this.bodyUsed = false;
    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }
      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };
    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }
        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };
      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }
    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }
      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };
    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }
    this.json = function() {
      return this.text().then(JSON.parse)
    };
    return this
  }
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }
  function Request(input, options) {
    options = options || {};
    var body = options.body;
    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }
    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;
    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }
  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };
  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }
  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }
  Body.call(Request.prototype);
  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }
    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }
  Body.call(Response.prototype);
  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };
  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };
  var redirectStatuses = [301, 302, 303, 307, 308];
  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }
    return new Response(null, {status: status, headers: {location: url}})
  };
  var DOMException = self.DOMException;
  try {
    new DOMException();
  } catch (err) {
    DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    DOMException.prototype = Object.create(Error.prototype);
    DOMException.prototype.constructor = DOMException;
  }
  function fetch$1(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);
      if (request.signal && request.signal.aborted) {
        return reject(new DOMException('Aborted', 'AbortError'))
      }
      var xhr = new XMLHttpRequest();
      function abortXhr() {
        xhr.abort();
      }
      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.onabort = function() {
        reject(new DOMException('Aborted', 'AbortError'));
      };
      xhr.open(request.method, request.url, true);
      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }
      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });
      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }
      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }
  fetch$1.polyfill = true;
  if (!self.fetch) {
    self.fetch = fetch$1;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  es6promise.polyfill();

  var STORAGE_KEY = "directus-sdk-js";
  var Configuration =  (function () {
      function Configuration(initialConfig, storage) {
          if (initialConfig === void 0) { initialConfig = {}; }
          this.storage = storage;
          var dehydratedConfig = {};
          if (storage && Boolean(initialConfig && initialConfig.persist)) {
              dehydratedConfig = this.dehydratedInitialConfiguration(storage);
          }
          var persist = Boolean(dehydratedConfig.persist || initialConfig.persist);
          var project = dehydratedConfig.project || initialConfig.project || Configuration.defaults.project;
          var tokenExpirationTime = dehydratedConfig.tokenExpirationTime ||
              initialConfig.tokenExpirationTime ||
              Configuration.defaults.tokenExpirationTime;
          this.internalConfiguration = __assign({}, initialConfig, dehydratedConfig, { persist: persist,
              project: project,
              tokenExpirationTime: tokenExpirationTime });
      }
      Object.defineProperty(Configuration.prototype, "token", {
          get: function () {
              return this.internalConfiguration.token;
          },
          set: function (token) {
              this.partialUpdate({ token: token });
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Configuration.prototype, "tokenExpirationTime", {
          get: function () {
              return this.internalConfiguration.tokenExpirationTime;
          },
          set: function (tokenExpirationTime) {
              this.partialUpdate({
                  tokenExpirationTime: tokenExpirationTime * 60000,
              });
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Configuration.prototype, "url", {
          get: function () {
              return this.internalConfiguration.url;
          },
          set: function (url) {
              this.partialUpdate({ url: url });
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Configuration.prototype, "project", {
          get: function () {
              return this.internalConfiguration.project;
          },
          set: function (project) {
              this.partialUpdate({
                  project: project || "_",
              });
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Configuration.prototype, "localExp", {
          get: function () {
              return this.internalConfiguration.localExp;
          },
          set: function (localExp) {
              this.partialUpdate({ localExp: localExp });
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Configuration.prototype, "persist", {
          get: function () {
              return this.internalConfiguration.persist;
          },
          set: function (persist) {
              this.internalConfiguration.persist = persist;
          },
          enumerable: true,
          configurable: true
      });
      Configuration.prototype.update = function (config) {
          this.internalConfiguration = config;
          this.hydrate(config);
      };
      Configuration.prototype.partialUpdate = function (config) {
          this.internalConfiguration = __assign({}, this.internalConfiguration, config);
          this.hydrate(this.internalConfiguration);
      };
      Configuration.prototype.reset = function () {
          delete this.internalConfiguration.token;
          delete this.internalConfiguration.url;
          delete this.internalConfiguration.localExp;
          this.internalConfiguration.project = "_";
          this.deleteHydratedConfig();
      };
      Configuration.prototype.dehydrate = function () {
          if (!this.storage || !this.persist) {
              return;
          }
          var nativeValue = this.storage.getItem(STORAGE_KEY);
          if (!nativeValue) {
              return;
          }
          var parsedConfig = JSON.parse(nativeValue);
          this.internalConfiguration = parsedConfig;
          return parsedConfig;
      };
      Configuration.prototype.hydrate = function (props) {
          if (!this.storage || !this.persist) {
              return;
          }
          this.storage.setItem(STORAGE_KEY, JSON.stringify(props));
      };
      Configuration.prototype.deleteHydratedConfig = function () {
          if (!this.storage || !this.persist) {
              return;
          }
          this.storage.removeItem(STORAGE_KEY);
      };
      Configuration.prototype.dehydratedInitialConfiguration = function (storage) {
          if (!storage) {
              return {};
          }
          var nativeValue = storage.getItem(STORAGE_KEY);
          if (!nativeValue) {
              return;
          }
          try {
              return JSON.parse(nativeValue);
          }
          catch (err) {
              return {};
          }
      };
      Configuration.defaults = {
          project: "_",
          tokenExpirationTime: 5 * 6 * 1000,
      };
      return Configuration;
  }());

  var DIRECTUS_COLLECTION_PREFIX = "directus_";
  function getCollectionItemPath(collection) {
      if (collection.startsWith(DIRECTUS_COLLECTION_PREFIX)) {
          return "/" + collection.substr(9);
      }
      return "/items/" + collection;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var base64 = createCommonjsModule(function (module, exports) {
  (function(root) {
  	var freeExports =  exports;
  	var freeModule =  module &&
  		module.exports == freeExports && module;
  	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
  	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
  		root = freeGlobal;
  	}
  	var InvalidCharacterError = function(message) {
  		this.message = message;
  	};
  	InvalidCharacterError.prototype = new Error;
  	InvalidCharacterError.prototype.name = 'InvalidCharacterError';
  	var error = function(message) {
  		throw new InvalidCharacterError(message);
  	};
  	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;
  	var decode = function(input) {
  		input = String(input)
  			.replace(REGEX_SPACE_CHARACTERS, '');
  		var length = input.length;
  		if (length % 4 == 0) {
  			input = input.replace(/==?$/, '');
  			length = input.length;
  		}
  		if (
  			length % 4 == 1 ||
  			/[^+a-zA-Z0-9/]/.test(input)
  		) {
  			error(
  				'Invalid character: the string to be decoded is not correctly encoded.'
  			);
  		}
  		var bitCounter = 0;
  		var bitStorage;
  		var buffer;
  		var output = '';
  		var position = -1;
  		while (++position < length) {
  			buffer = TABLE.indexOf(input.charAt(position));
  			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
  			if (bitCounter++ % 4) {
  				output += String.fromCharCode(
  					0xFF & bitStorage >> (-2 * bitCounter & 6)
  				);
  			}
  		}
  		return output;
  	};
  	var encode = function(input) {
  		input = String(input);
  		if (/[^\0-\xFF]/.test(input)) {
  			error(
  				'The string to be encoded contains characters outside of the ' +
  				'Latin1 range.'
  			);
  		}
  		var padding = input.length % 3;
  		var output = '';
  		var position = -1;
  		var a;
  		var b;
  		var c;
  		var buffer;
  		var length = input.length - padding;
  		while (++position < length) {
  			a = input.charCodeAt(position) << 16;
  			b = input.charCodeAt(++position) << 8;
  			c = input.charCodeAt(++position);
  			buffer = a + b + c;
  			output += (
  				TABLE.charAt(buffer >> 18 & 0x3F) +
  				TABLE.charAt(buffer >> 12 & 0x3F) +
  				TABLE.charAt(buffer >> 6 & 0x3F) +
  				TABLE.charAt(buffer & 0x3F)
  			);
  		}
  		if (padding == 2) {
  			a = input.charCodeAt(position) << 8;
  			b = input.charCodeAt(++position);
  			buffer = a + b;
  			output += (
  				TABLE.charAt(buffer >> 10) +
  				TABLE.charAt((buffer >> 4) & 0x3F) +
  				TABLE.charAt((buffer << 2) & 0x3F) +
  				'='
  			);
  		} else if (padding == 1) {
  			buffer = input.charCodeAt(position);
  			output += (
  				TABLE.charAt(buffer >> 2) +
  				TABLE.charAt((buffer << 4) & 0x3F) +
  				'=='
  			);
  		}
  		return output;
  	};
  	var base64 = {
  		'encode': encode,
  		'decode': decode,
  		'version': '0.1.0'
  	};
  	if (freeExports && !freeExports.nodeType) {
  		if (freeModule) {
  			freeModule.exports = base64;
  		} else {
  			for (var key in base64) {
  				base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
  			}
  		}
  	} else {
  		root.base64 = base64;
  	}
  }(commonjsGlobal));
  });

  var base64$1 = /*#__PURE__*/Object.freeze({
    'default': base64,
    __moduleExports: base64
  });

  var isType = function (t, v) { return Object.prototype.toString.call(v) === "[object " + t + "]"; };
  var isString = function (v) { return v && typeof v === "string" && /\S/.test(v); };
  var isNumber = function (v) { return isType("Number", v) && isFinite(v) && !isNaN(parseFloat(v)); };
  var isFunction = function (v) { return v instanceof Function; };
  var isObjectOrEmpty = function (v) { return isType("Object", v); };
  var isObject = function (v) {
      if (!isObjectOrEmpty(v)) {
          return false;
      }
      for (var key in v) {
          if (Object.prototype.hasOwnProperty.call(v, key)) {
              return true;
          }
      }
      return false;
  };

  function getPayload(token) {
      if (!token || token.length < 0 || token.split(".").length <= 0) {
          return {};
      }
      try {
          var payloadBase64 = token
              .split(".")[1]
              .replace("-", "+")
              .replace("_", "/");
          var payloadDecoded = undefined(payloadBase64);
          var payloadObject = JSON.parse(payloadDecoded);
          if (isNumber(payloadObject.exp)) {
              payloadObject.exp = new Date(payloadObject.exp * 1000);
          }
          return payloadObject;
      }
      catch (err) {
          return {};
      }
  }

  var Authentication =  (function () {
      function Authentication(config, inject) {
          this.config = config;
          this.inject = inject;
          if (config.token && config.token.includes(".")) {
              this.startInterval(true);
          }
      }
      Authentication.prototype.isLoggedIn = function () {
          if (isString(this.config.token) &&
              isString(this.config.url) &&
              isString(this.config.project) &&
              isObject(this.getPayload())) {
              if (this.config.localExp > Date.now()) {
                  return true;
              }
          }
          return false;
      };
      Authentication.prototype.login = function (credentials, options) {
          var _this = this;
          this.config.token = null;
          if (isString(credentials.url)) {
              this.config.url = credentials.url;
          }
          if (isString(credentials.project)) {
              this.config.project = credentials.project;
          }
          if (credentials.persist || (options && options.persist) || this.config.persist) {
              this.startInterval();
          }
          return new Promise(function (resolve, reject) {
              _this.inject
                  .post("/auth/authenticate", {
                  email: credentials.email,
                  password: credentials.password,
              })
                  .then(function (res) {
                  return (_this.config.token = res.data.token);
              })
                  .then(function (token) {
                  _this.config.localExp = new Date(Date.now() + _this.config.tokenExpirationTime).getTime();
                  resolve({
                      localExp: _this.config.localExp,
                      project: _this.config.project,
                      token: token,
                      url: _this.config.url,
                  });
              })
                  .catch(reject);
          });
      };
      Authentication.prototype.logout = function () {
          this.config.reset();
          if (this.refreshInterval) {
              this.stopInterval();
          }
      };
      Authentication.prototype.refreshIfNeeded = function () {
          var _this = this;
          var payload = this.getPayload();
          var _a = this.config, token = _a.token, url = _a.url, project = _a.project, localExp = _a.localExp;
          if (!isString(token) || !isString(url) || !isString(project)) {
              return;
          }
          if (!payload || !payload.exp) {
              return;
          }
          var timeDiff = (localExp || 0) - Date.now();
          if (timeDiff <= 0) {
              if (isFunction(this.onAutoRefreshError)) {
                  this.onAutoRefreshError({
                      code: 102,
                      message: "auth_expired_token",
                  });
              }
              return;
          }
          if (timeDiff < 30000) {
              return new Promise(function (resolve) {
                  _this.refresh(token)
                      .then(function (res) {
                      _this.config.localExp = new Date(Date.now() + _this.config.tokenExpirationTime).getTime();
                      _this.config.token = res.data.token || token;
                      if (isFunction(_this.onAutoRefreshSuccess)) {
                          _this.onAutoRefreshSuccess(_this.config);
                      }
                      resolve([true]);
                  })
                      .catch(function (error) {
                      if (isFunction(_this.onAutoRefreshError)) {
                          _this.onAutoRefreshError(error);
                      }
                      resolve([true, error]);
                  });
              });
          }
      };
      Authentication.prototype.refresh = function (token) {
          return this.inject.post("/auth/refresh", { token: token });
      };
      Authentication.prototype.startInterval = function (fireImmediately) {
          if (fireImmediately) {
              this.refreshIfNeeded();
          }
          this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
      };
      Authentication.prototype.stopInterval = function () {
          clearInterval(this.refreshInterval);
          this.refreshInterval = null;
      };
      Authentication.prototype.getPayload = function () {
          if (!isString(this.config.token)) {
              return null;
          }
          return getPayload(this.config.token);
      };
      return Authentication;
  }());

  var defaultSerializeTransform = function (key, value) { return key + "=" + value; };
  function querify(obj, prefix, serializer) {
      if (serializer === void 0) { serializer = defaultSerializeTransform; }
      var qs = [], prop;
      for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
              var key = prefix ? prefix + "[" + prop + "]" : prop;
              var val = obj[prop];
              qs.push((val !== null && typeof val === "object")
                  ? querify(val, key)
                  : serializer(key, val));
          }
      }
      return qs.join('');
  }

  function withTimeout(fn, timeout) {
      return Promise.race([
          fn(),
          new Promise(function (_resolve, reject) {
              setTimeout(function () { return reject(new Error("Timeout of " + timeout + " reached")); }, timeout);
          })
      ]);
  }
  function request(opts) {
      return __awaiter(this, void 0, void 0, function () {
          var url, response;
          return __generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      if (!opts) {
                          throw new Error("Invalid request options: " + opts);
                      }
                      url = opts.url;
                      if (opts.baseURL) {
                          url = opts.baseURL + "/" + url;
                      }
                      if (opts.params) {
                          url = url + "?" + querify(opts.params);
                      }
                      if (opts.body && typeof opts.body !== 'string') {
                          opts.body = JSON.stringify(opts.body);
                      }
                      return [4 , withTimeout(function () { return fetch(url, {
                              method: opts.method,
                              body: opts.body,
                              headers: opts.headers,
                              credentials: opts.credentials || 'omit'
                          }); }, opts.timeout || 2000)];
                  case 1:
                      response = _a.sent();
                      if (!(opts && opts.skipToJSON)) return [3 , 3];
                      return [4 , response.text()];
                  case 2: return [2 , _a.sent()];
                  case 3: return [4 , response.json()];
                  case 4:
                  return [2 , _a.sent()];
              }
          });
      });
  }

  var APIError =  (function (_super) {
      __extends(APIError, _super);
      function APIError(message, info) {
          var _newTarget = this.constructor;
          var _this = _super.call(this, message) || this;
          _this.message = message;
          _this.info = info;
          Object.setPrototypeOf(_this, _newTarget.prototype);
          return _this;
      }
      Object.defineProperty(APIError.prototype, "url", {
          get: function () {
              return this.info.url;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(APIError.prototype, "method", {
          get: function () {
              return this.info.method.toUpperCase();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(APIError.prototype, "code", {
          get: function () {
              return "" + (this.info.code || -1);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(APIError.prototype, "params", {
          get: function () {
              return this.info.params || {};
          },
          enumerable: true,
          configurable: true
      });
      APIError.prototype.toString = function () {
          return [
              'Directus call failed:',
              this.method + " " + this.url + " " + JSON.stringify(this.params) + " -",
              this.message,
              "(code " + this.code + ")"
          ].join(' ');
      };
      return APIError;
  }(Error));
  var API =  (function () {
      function API(config) {
          this.config = config;
          this.fetch = request;
          this.auth = new Authentication(config, {
              post: this.post.bind(this),
          });
      }
      API.prototype.reset = function () {
          this.auth.logout();
          this.config.deleteHydratedConfig();
      };
      API.prototype.get = function (endpoint, params) {
          if (params === void 0) { params = {}; }
          return this.request("get", endpoint, params);
      };
      API.prototype.post = function (endpoint, body, params) {
          if (body === void 0) { body = {}; }
          if (params === void 0) { params = {}; }
          return this.request("post", endpoint, params, body);
      };
      API.prototype.patch = function (endpoint, body, params) {
          if (body === void 0) { body = {}; }
          if (params === void 0) { params = {}; }
          return this.request("patch", endpoint, params, body);
      };
      API.prototype.put = function (endpoint, body, params) {
          if (body === void 0) { body = {}; }
          if (params === void 0) { params = {}; }
          return this.request("put", endpoint, params, body);
      };
      API.prototype.delete = function (endpoint) {
          return this.request("delete", endpoint);
      };
      API.prototype.getPayload = function () {
          if (!isString(this.config.token)) {
              return null;
          }
          return getPayload(this.config.token);
      };
      API.prototype.request = function (method, endpoint, params, data, noEnv, headers, skipToJSON) {
          if (params === void 0) { params = {}; }
          if (data === void 0) { data = {}; }
          if (noEnv === void 0) { noEnv = false; }
          if (headers === void 0) { headers = {}; }
          if (skipToJSON === void 0) { skipToJSON = false; }
          if (!this.config.url) {
              throw new Error('API has no URL configured to send requests to, please check the docs.');
          }
          var baseURL = this.config.url + "/";
          if (noEnv === false) {
              baseURL += this.config.project + "/";
          }
          if (this.config.token && isString(this.config.token) && this.config.token.length > 0) {
              headers.Authorization = "Bearer " + this.config.token;
          }
          return this.fetch({
              method: method,
              url: endpoint,
              body: data,
              baseURL: baseURL,
              headers: headers,
              params: params,
              skipToJSON: skipToJSON
          });
      };
      return API;
  }());

  var SDK =  (function () {
      function SDK(options) {
          this.config = new Configuration(options);
          this.api = new API(this.config);
      }
      Object.defineProperty(SDK.prototype, "loggedIn", {
          get: function () {
              return this.api.auth.isLoggedIn();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(SDK.prototype, "payload", {
          get: function () {
              if (!this.config.token) {
                  return null;
              }
              return this.api.getPayload();
          },
          enumerable: true,
          configurable: true
      });
      SDK.prototype.login = function (credentials, options) {
          return this.api.auth.login(credentials, options);
      };
      SDK.prototype.logout = function () {
          this.api.auth.logout();
      };
      SDK.prototype.reset = function () {
          this.api.reset();
      };
      SDK.prototype.refreshIfNeeded = function () {
          return this.api.auth.refreshIfNeeded();
      };
      SDK.prototype.refresh = function (token) {
          return this.api.auth.refresh(token);
      };
      SDK.prototype.requestPasswordReset = function (email) {
          return this.api.post("/auth/password/request", {
              email: email,
          });
      };
      SDK.prototype.getActivity = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/activity", params);
      };
      SDK.prototype.getMyBookmarks = function (params) {
          if (params === void 0) { params = {}; }
          return this.getCollectionPresets(params);
      };
      SDK.prototype.getCollections = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/collections", params);
      };
      SDK.prototype.getCollection = function (collection, params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/collections/" + collection, params);
      };
      SDK.prototype.createCollection = function (data) {
          return this.api.post("/collections", data);
      };
      SDK.prototype.updateCollection = function (collection, data) {
          return this.api.patch("/collections/" + collection, data);
      };
      SDK.prototype.deleteCollection = function (collection) {
          return this.api.delete("/collections/" + collection);
      };
      SDK.prototype.getCollectionPresets = function (params) {
          var payload = this.api.getPayload();
          return Promise.all([
              this.api.get("/collection_presets", {
                  "filter[title][nnull]": 1,
                  "filter[user][eq]": payload.id,
              }),
              this.api.get("/collection_presets", {
                  "filter[role][eq]": payload.role,
                  "filter[title][nnull]": 1,
                  "filter[user][null]": 1,
              }),
          ]).then(function (values) {
              var user = values[0], role = values[1];
              return (user.data || []).concat((role.data || []));
          });
      };
      SDK.prototype.createCollectionPreset = function (data) {
          return this.api.post("/collection_presets", data);
      };
      SDK.prototype.updateCollectionPreset = function (primaryKey, data) {
          return this.api.patch("/collection_presets/" + primaryKey, data);
      };
      SDK.prototype.deleteCollectionPreset = function (primaryKey) {
          return this.api.delete("/collection_presets/" + primaryKey);
      };
      SDK.prototype.getInterfaces = function () {
          return this.api.request("get", "/interfaces", {}, {}, true);
      };
      SDK.prototype.getLayouts = function () {
          return this.api.request("get", "/layouts", {}, {}, true);
      };
      SDK.prototype.getPages = function () {
          return this.api.request("get", "/pages", {}, {}, true);
      };
      SDK.prototype.getAllFields = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/fields", params);
      };
      SDK.prototype.getFields = function (collection, params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/fields/" + collection, params);
      };
      SDK.prototype.getField = function (collection, fieldName, params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/fields/" + collection + "/" + fieldName, params);
      };
      SDK.prototype.createField = function (collection, fieldInfo) {
          return this.api.post("/fields/" + collection, fieldInfo);
      };
      SDK.prototype.updateField = function (collection, fieldName, fieldInfo) {
          return this.api.patch("/fields/" + collection + "/" + fieldName, fieldInfo);
      };
      SDK.prototype.updateFields = function (collection, fieldsInfoOrFieldNames, fieldInfo) {
          if (fieldInfo === void 0) { fieldInfo = null; }
          if (fieldInfo) {
              return this.api.patch("/fields/" + collection + "/" + fieldsInfoOrFieldNames.join(","), fieldInfo);
          }
          return this.api.patch("/fields/" + collection, fieldsInfoOrFieldNames);
      };
      SDK.prototype.deleteField = function (collection, fieldName) {
          return this.api.delete("/fields/" + collection + "/" + fieldName);
      };
      SDK.prototype.getFiles = function (params) {
          if (params === void 0) { params = {}; }
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  return [2 , this.api.get("/files", params)];
              });
          });
      };
      SDK.prototype.getFile = function (fileName, params) {
          if (params === void 0) { params = {}; }
          return __awaiter(this, void 0, void 0, function () {
              var files;
              return __generator(this, function (_a) {
                  files = typeof fileName === "string" ? fileName : fileName.join(",");
                  return [2 , this.api.get("/files/" + files, params)];
              });
          });
      };
      SDK.prototype.uploadFiles = function (data,
      _onUploadProgress
      ) {
          var headers = {
              Authorization: "Bearer " + this.config.token,
              "Content-Type": "multipart/form-data",
          };
          var filesURL = this.config.url + "/" + this.config.project + "/files";
          return request({
              method: 'post',
              url: filesURL, body: data,
              headers: headers
          });
      };
      SDK.prototype.updateItem = function (collection, primaryKey, body, params) {
          if (params === void 0) { params = {}; }
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.patch(collectionBasePath + "/" + primaryKey, body, params);
      };
      SDK.prototype.updateItems = function (collection, body, params) {
          if (params === void 0) { params = {}; }
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.patch(collectionBasePath, body, params);
      };
      SDK.prototype.createItem = function (collection, body) {
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.post(collectionBasePath, body);
      };
      SDK.prototype.createItems = function (collection, body) {
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.post(collectionBasePath, body);
      };
      SDK.prototype.getItems = function (collection, params) {
          if (params === void 0) { params = {}; }
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.get(collectionBasePath, params);
      };
      SDK.prototype.getItem = function (collection, primaryKey, params) {
          if (params === void 0) { params = {}; }
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.get(collectionBasePath + "/" + primaryKey, params);
      };
      SDK.prototype.deleteItem = function (collection, primaryKey) {
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.delete(collectionBasePath + "/" + primaryKey);
      };
      SDK.prototype.deleteItems = function (collection, primaryKeys) {
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.delete(collectionBasePath + "/" + primaryKeys.join());
      };
      SDK.prototype.getMyListingPreferences = function (collection, params) {
          var payload = this.api.getPayload();
          return Promise.all([
              this.api.get("/collection_presets", {
                  "filter[collection][eq]": collection,
                  "filter[role][null]": 1,
                  "filter[title][null]": 1,
                  "filter[user][null]": 1,
                  limit: 1,
                  sort: "-id",
              }),
              this.api.get("/collection_presets", {
                  "filter[collection][eq]": collection,
                  "filter[role][eq]": payload.role,
                  "filter[title][null]": 1,
                  "filter[user][null]": 1,
                  limit: 1,
                  sort: "-id",
              }),
              this.api.get("/collection_presets", {
                  "filter[collection][eq]": collection,
                  "filter[role][eq]": payload.role,
                  "filter[title][null]": 1,
                  "filter[user][eq]": payload.id,
                  limit: 1,
                  sort: "-id",
              }),
          ]).then(function (values) {
              var col = values[0], role = values[1], user = values[2];
              if (user.data && user.data.length > 0) {
                  return user.data[0];
              }
              if (role.data && role.data.length > 0) {
                  return role.data[0];
              }
              if (col.data && col.data.length > 0) {
                  return col.data[0];
              }
              return {};
          });
      };
      SDK.prototype.getPermissions = function (params) {
          if (params === void 0) { params = {}; }
          return this.getItems("directus_permissions", params);
      };
      SDK.prototype.getMyPermissions = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/permissions/me", params);
      };
      SDK.prototype.createPermissions = function (data) {
          return this.api.post("/permissions", data);
      };
      SDK.prototype.updatePermissions = function (data) {
          return this.api.patch("/permissions", data);
      };
      SDK.prototype.getRelations = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/relations", params);
      };
      SDK.prototype.createRelation = function (data) {
          return this.api.post("/relations", data);
      };
      SDK.prototype.updateRelation = function (primaryKey, data) {
          return this.api.patch("/relations/" + primaryKey, data);
      };
      SDK.prototype.getCollectionRelations = function (collection, params) {
          return Promise.all([
              this.api.get("/relations", {
                  "filter[collection_a][eq]": collection,
              }),
              this.api.get("/relations", {
                  "filter[collection_b][eq]": collection,
              }),
          ]);
      };
      SDK.prototype.getItemRevisions = function (collection, primaryKey, params) {
          if (params === void 0) { params = {}; }
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.get(collectionBasePath + "/" + primaryKey + "/revisions", params);
      };
      SDK.prototype.revert = function (collection, primaryKey, revisionID) {
          var collectionBasePath = getCollectionItemPath(collection);
          return this.api.patch(collectionBasePath + "/" + primaryKey + "/revert/" + revisionID);
      };
      SDK.prototype.getRole = function (primaryKey, params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/roles/" + primaryKey, params);
      };
      SDK.prototype.getRoles = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/roles", params);
      };
      SDK.prototype.updateRole = function (primaryKey, body) {
          return this.updateItem("directus_roles", primaryKey, body);
      };
      SDK.prototype.createRole = function (body) {
          return this.createItem("directus_roles", body);
      };
      SDK.prototype.deleteRole = function (primaryKey) {
          return this.deleteItem("directus_roles", primaryKey);
      };
      SDK.prototype.getSettings = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/settings", params);
      };
      SDK.prototype.getSettingsFields = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/settings/fields", params);
      };
      SDK.prototype.getUsers = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/users", params);
      };
      SDK.prototype.getUser = function (primaryKey, params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/users/" + primaryKey, params);
      };
      SDK.prototype.getMe = function (params) {
          if (params === void 0) { params = {}; }
          return this.api.get("/users/me", params);
      };
      SDK.prototype.updateUser = function (primaryKey, body) {
          return this.updateItem("directus_users", primaryKey, body);
      };
      SDK.prototype.updateDatabase = function () {
          return this.api.post("/update");
      };
      SDK.prototype.ping = function () {
          return this.api.request("get", "/server/ping", {}, {}, true, {}, true);
      };
      SDK.prototype.serverInfo = function () {
          return this.api.request("get", "/", {}, {}, true);
      };
      SDK.prototype.projectInfo = function () {
          return this.api.request("get", "/");
      };
      SDK.prototype.getThirdPartyAuthProviders = function () {
          return this.api.get("/auth/sso");
      };
      SDK.getPayload = getPayload;
      return SDK;
  }());

  exports.Configuration = Configuration;
  exports.SDK = SDK;
  exports.default = SDK;
  exports.getCollectionItemPath = getCollectionItemPath;
  exports.getPayload = getPayload;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=directus-sdk.js.map
