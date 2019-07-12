(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DirectusSDK", [], factory);
	else if(typeof exports === 'object')
		exports["DirectusSDK"] = factory();
	else
		root["DirectusSDK"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/base-64/base64.js":
/*!****************************************!*\
  !*** ./node_modules/base-64/base64.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
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
			// http://whatwg.org/C#alphanumeric-ascii-characters
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
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
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
		var d;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
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

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return base64;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/API.ts":
/*!********************!*\
  !*** ./src/API.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var qsStringify = __webpack_require__(/*! qs/lib/stringify */ "./node_modules/qs/lib/stringify.js");
var Authentication_1 = __webpack_require__(/*! ./Authentication */ "./src/Authentication.ts");
var ConcurrencyManager_1 = __webpack_require__(/*! ./ConcurrencyManager */ "./src/ConcurrencyManager.ts");
// Utilities
var invariant_1 = __webpack_require__(/*! ./utils/invariant */ "./src/utils/invariant.ts");
var is_1 = __webpack_require__(/*! ./utils/is */ "./src/utils/is.ts");
var payload_1 = __webpack_require__(/*! ./utils/payload */ "./src/utils/payload.ts");
/**
 * API definition for HTTP transactions
 * @uses Authentication
 * @uses axios
 */
var API = /** @class */ (function () {
    function API(config) {
        this.config = config;
        this.xhr = axios_1.default.create({
            paramsSerializer: qsStringify,
            timeout: 10 * 60 * 1000,
        });
        this.concurrent = ConcurrencyManager_1.concurrencyManager(this.xhr, 10);
        this.auth = new Authentication_1.Authentication(config, {
            post: this.post.bind(this),
        });
    }
    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    API.prototype.reset = function () {
        this.auth.logout();
        this.config.deleteHydratedConfig();
    };
    /// REQUEST METHODS ----------------------------------------------------------
    /**
     * GET convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.get = function (endpoint, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(endpoint), "endpoint must be a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.request("get", endpoint, params);
    };
    /**
     * POST convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.post = function (endpoint, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(endpoint), "endpoint must be a string");
        invariant_1.invariant(Array.isArray(body) ? is_1.isArrayOrEmpty(body) : is_1.isObjectOrEmpty(body), "body must be an array or object");
        return this.request("post", endpoint, params, body);
    };
    /**
     * PATCH convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.patch = function (endpoint, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(endpoint), "endpoint must be a string");
        invariant_1.invariant(Array.isArray(body) ? is_1.isArrayOrEmpty(body) : is_1.isObjectOrEmpty(body), "body must be an array or object");
        return this.request("patch", endpoint, params, body);
    };
    /**
     * PUT convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.put = function (endpoint, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(endpoint), "endpoint must be a string");
        invariant_1.invariant(Array.isArray(body) ? is_1.isArrayOrEmpty(body) : is_1.isObjectOrEmpty(body), "body must be an array or object");
        return this.request("put", endpoint, params, body);
    };
    /**
     * DELETE convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.delete = function (endpoint) {
        invariant_1.invariant(is_1.isString(endpoint), "endpoint must be a string");
        return this.request("delete", endpoint);
    };
    /**
     * Gets the payload of the current token, return type can be generic
     * @typeparam T   extends object, payload type
     * @return {Promise<T>}
     */
    API.prototype.getPayload = function () {
        if (!is_1.isString(this.config.token)) {
            return null;
        }
        return payload_1.getPayload(this.config.token);
    };
    /**
     * Perform an API request to the Directus API
     * @param {RequestMethod} method    Selected HTTP method
     * @param {string} endpoint         Endpoint definition as path
     * @param {object={}} params        Query parameters
     * @param {object={}} data          Data passed to directus
     * @param {boolean=false} noEnv     Do not include the `env` in the url (for system calls)
     * @param {object={}} headers       Optional headers to include
     * @param {boolean=false} skipParseToJSON  Whether to skip `JSON.parse` or not
     * @typeparam T                     Response type definition, defaults to `any`
     * @return {Promise<T>}
     */
    API.prototype.request = function (method, endpoint, params, data, noEnv, headers, skipParseToJSON) {
        if (params === void 0) { params = {}; }
        if (data === void 0) { data = {}; }
        if (noEnv === void 0) { noEnv = false; }
        if (headers === void 0) { headers = {}; }
        if (skipParseToJSON === void 0) { skipParseToJSON = false; }
        invariant_1.invariant(is_1.isString(method), "method must be a string");
        invariant_1.invariant(is_1.isString(endpoint), "endpoint must be a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        invariant_1.invariant(is_1.isString(this.config.url), "main url must be defined (see constructor)");
        invariant_1.invariant(Array.isArray(data) ? is_1.isArrayOrEmpty(data) : is_1.isObjectOrEmpty(data), "data must be an array or object");
        var baseURL = this.config.url + "/";
        if (noEnv === false) {
            baseURL += this.config.project + "/";
        }
        var requestOptions = {
            baseURL: baseURL,
            data: data,
            headers: headers,
            method: method,
            params: params,
            url: endpoint,
        };
        if (this.config.token && is_1.isString(this.config.token) && this.config.token.length > 0) {
            requestOptions.headers = headers;
            requestOptions.headers.Authorization = "Bearer " + this.config.token;
        }
        return this.xhr
            .request(requestOptions)
            .then(function (res) { return res.data; })
            .then(function (responseData) {
            if (!responseData || responseData.length === 0) {
                return responseData;
            }
            if (typeof responseData !== "object") {
                try {
                    return skipParseToJSON ? responseData : JSON.parse(responseData);
                }
                catch (error) {
                    throw {
                        data: responseData,
                        error: error,
                        json: true,
                    };
                }
            }
            return responseData;
        })
            .catch(function (error) {
            if (error.response) {
                throw error.response.data.error;
            }
            else if (error.json === true) {
                throw {
                    code: -2,
                    data: error.data,
                    error: error.error,
                    message: "API returned invalid JSON",
                };
            }
            else {
                throw {
                    code: -1,
                    error: error,
                    message: "Network Error",
                };
            }
        });
    };
    return API;
}());
exports.API = API;


/***/ }),

/***/ "./src/Authentication.ts":
/*!*******************************!*\
  !*** ./src/Authentication.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Utilities
var invariant_1 = __webpack_require__(/*! ./utils/invariant */ "./src/utils/invariant.ts");
var is_1 = __webpack_require__(/*! ./utils/is */ "./src/utils/is.ts");
var payload_1 = __webpack_require__(/*! ./utils/payload */ "./src/utils/payload.ts");
/**
 * Handles all authentication related logic, decoupled from the core
 * @internal
 */
var Authentication = /** @class */ (function () {
    /**
     * Creates a new authentication instance
     * @constructor
     * @param {IConfiguration} config
     * @param {IAuthenticationInjectableProps} inject
     */
    function Authentication(config, inject) {
        this.config = config;
        this.inject = inject;
        // Only start the auto refresh interval if the token exists and it's a JWT
        if (config.token && config.token.includes(".")) {
            this.startInterval(true);
        }
    }
    /**
     * If the current auth status is logged in
     * @return {boolean}
     */
    Authentication.prototype.isLoggedIn = function () {
        if (is_1.isString(this.config.token) &&
            is_1.isString(this.config.url) &&
            is_1.isString(this.config.project) &&
            is_1.isObject(this.getPayload())) {
            if (this.config.localExp > Date.now()) {
                // Not expired, succeed
                return true;
            }
        }
        return false;
    };
    /**
     * Login to the API; Gets a new token from the API and stores it in this.token.
     * @param {ILoginCredentials} credentials   User login credentials
     * @param {ILoginOptions?} options          Additional options regarding persistance and co.
     * @return {Promise<ILoginResponse>}
     */
    Authentication.prototype.login = function (credentials, options) {
        var _this = this;
        invariant_1.invariant(is_1.isObject(credentials), "malformed credentials");
        invariant_1.invariant(is_1.isString(credentials.email) && is_1.isString(credentials.password), "email & password are required in credentials");
        this.config.token = null;
        if (is_1.isString(credentials.url)) {
            this.config.url = credentials.url;
        }
        if (is_1.isString(credentials.project)) {
            this.config.project = credentials.project;
        }
        if (credentials.persist || (options && options.persist) || this.config.persist) {
            // use interval for login refresh when option persist enabled
            this.startInterval();
        }
        return new Promise(function (resolve, reject) {
            _this.inject
                .post("/auth/authenticate", {
                email: credentials.email,
                password: credentials.password,
            })
                .then(function (res) {
                // save new token in configuration
                return (_this.config.token = res.data.token);
            })
                .then(function (token) {
                // expiry date is the moment we got the token + 5 minutes
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
    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    Authentication.prototype.logout = function () {
        this.config.reset();
        if (this.refreshInterval) {
            this.stopInterval();
        }
    };
    /// REFRESH METHODS ----------------------------------------------------------
    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date).
     * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
     * - Calls onAutoRefreshError if refreshing the token fails for some reason.
     * @return {RefreshIfNeededResponse}
     */
    Authentication.prototype.refreshIfNeeded = function () {
        var _this = this;
        var payload = this.getPayload();
        var _a = this.config, token = _a.token, url = _a.url, project = _a.project, localExp = _a.localExp;
        if (!is_1.isString(token) || !is_1.isString(url) || !is_1.isString(project)) {
            return;
        }
        if (!payload || !payload.exp) {
            return;
        }
        var timeDiff = (localExp || 0) - Date.now();
        if (timeDiff <= 0) {
            // token has expired, skipping auto refresh
            if (is_1.isFunction(this.onAutoRefreshError)) {
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
                    // if autorefresh succeeded
                    if (is_1.isFunction(_this.onAutoRefreshSuccess)) {
                        _this.onAutoRefreshSuccess(_this.config);
                    }
                    resolve([true]);
                })
                    .catch(function (error) {
                    if (is_1.isFunction(_this.onAutoRefreshError)) {
                        _this.onAutoRefreshError(error);
                    }
                    resolve([true, error]);
                });
            });
        }
        else {
            Promise.resolve([false]);
        }
    };
    /**
     * Use the passed token to request a new one.
     * @param {string} token
     */
    Authentication.prototype.refresh = function (token) {
        invariant_1.invariant(is_1.isString(token), "token must be a string");
        return this.inject.post("/auth/refresh", { token: token });
    };
    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
     * @param {boolean?} fireImmediately    If it should immediately call [refreshIfNeeded]
     */
    Authentication.prototype.startInterval = function (fireImmediately) {
        if (fireImmediately) {
            this.refreshIfNeeded();
        }
        this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
    };
    /**
     * Clears and nullifies the token refreshing interval
     */
    Authentication.prototype.stopInterval = function () {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
    };
    /**
     * Gets the payload of the current token, return type can be generic
     * @typeparam T     The payload response type, arbitrary object
     * @return {T}
     */
    Authentication.prototype.getPayload = function () {
        if (!is_1.isString(this.config.token)) {
            return null;
        }
        return payload_1.getPayload(this.config.token);
    };
    return Authentication;
}());
exports.Authentication = Authentication;


/***/ }),

/***/ "./src/ConcurrencyManager.ts":
/*!***********************************!*\
  !*** ./src/ConcurrencyManager.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handling and limiting concurrent requests for the API.
 * @param {AxiosInstance} axios   Reference to the caller instance
 * @param {number=10} limit       When to reate-limit outgoing requests
 */
exports.concurrencyManager = function (axios, limit) {
    if (limit === void 0) { limit = 10; }
    if (limit < 1) {
        throw new Error("ConcurrencyManager Error: minimun concurrent requests is 1");
    }
    var instance = {
        limit: limit,
        queue: [],
        running: [],
        interceptors: {
            request: null,
            response: null,
        },
        push: function (reqHandler) {
            instance.queue.push(reqHandler);
            instance.shiftInitial();
        },
        shiftInitial: function () {
            setTimeout(function () {
                if (instance.running.length < instance.limit) {
                    instance.shift();
                }
            }, 0);
        },
        shift: function () {
            if (instance.queue.length) {
                var queued = instance.queue.shift();
                queued.resolver(queued.request);
                instance.running.push(queued);
            }
        },
        // use as interceptor. Queue outgoing requests
        requestHandler: function (req) {
            return new Promise(function (resolve) {
                instance.push({
                    request: req,
                    resolver: resolve,
                });
            });
        },
        // use as interceptor. Execute queued request upon receiving a response
        responseHandler: function (res) {
            instance.running.shift();
            instance.shift();
            return res;
        },
        detach: function () {
            axios.interceptors.request.eject(instance.interceptors.request);
            axios.interceptors.response.eject(instance.interceptors.response);
        },
        attach: function (limitConcurrentRequestsTo) {
            if (limitConcurrentRequestsTo) {
                instance.limit = limitConcurrentRequestsTo;
            }
            // queue concurrent requests
            instance.interceptors.request = axios.interceptors.request.use(instance.requestHandler);
            instance.interceptors.response = axios.interceptors.response.use(instance.responseHandler, instance.responseHandler);
        },
    };
    return instance;
};


/***/ }),

/***/ "./src/Configuration.ts":
/*!******************************!*\
  !*** ./src/Configuration.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var invariant_1 = __webpack_require__(/*! ./utils/invariant */ "./src/utils/invariant.ts");
var is_1 = __webpack_require__(/*! ./utils/is */ "./src/utils/is.ts");
var STORAGE_KEY = "directus-sdk-js";
/**
 * Configuration holder for directus implementations
 */
var Configuration = /** @class */ (function () {
    /**
     * Creates a new configuration instance, will be used once for each directus instance (passing refs).
     * @constructor
     * @param {IConfigurationOptions} initialConfig   Initial configuration values
     * @param {IStorageAPI?} storage                  Storage adapter for persistence
     */
    function Configuration(initialConfig, storage) {
        if (initialConfig === void 0) { initialConfig = {}; }
        this.storage = storage;
        var dehydratedConfig = {};
        if (storage && Boolean(initialConfig && initialConfig.persist)) {
            // dehydrate if storage was provided and persist flag is set
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
        // ACCESSORS =================================================================
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
            // TODO: Optionally re-compute the localExp property for the auto-refresh
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
    // HELPER METHODS ============================================================
    /**
     * Validates if the configuration is valid
     * @throws {Error}
     */
    Configuration.prototype.validate = function () {
        invariant_1.invariant(is_1.isString(this.url), "configuration - url must be defined");
        invariant_1.invariant(is_1.isString(this.project), "configuration - project must be defined");
        invariant_1.invariant(is_1.isString(this.token), "configuration - project must be defined");
    };
    /**
     * Update the configuration values, will also hydrate them if persistance activated
     * @param {IConfigurationValues} config
     */
    Configuration.prototype.update = function (config) {
        this.internalConfiguration = config;
        this.hydrate(config);
    };
    /**
     * Update partials of the configuration, behaves like the [update] method
     * @param {Partial<IConfigurationValues>} config
     */
    Configuration.prototype.partialUpdate = function (config) {
        this.internalConfiguration = __assign({}, this.internalConfiguration, config);
        this.hydrate(this.internalConfiguration);
    };
    /**
     * Reset the whole confiugration and remove hydrated values from storage as well
     */
    Configuration.prototype.reset = function () {
        delete this.internalConfiguration.token;
        delete this.internalConfiguration.url;
        delete this.internalConfiguration.localExp;
        this.internalConfiguration.project = "_";
        this.deleteHydratedConfig();
    };
    // STORAGE METHODS ===========================================================
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
    /**
     * Defaults for all directus sdk instances, can be modified if preferred
     * @type {IConfigurationDefaults}
     */
    Configuration.defaults = {
        project: "_",
        tokenExpirationTime: 5 * 6 * 1000,
    };
    return Configuration;
}());
exports.Configuration = Configuration;


/***/ }),

/***/ "./src/SDK.ts":
/*!********************!*\
  !*** ./src/SDK.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Utilities
var collection_1 = __webpack_require__(/*! ./utils/collection */ "./src/utils/collection.ts");
var payload_1 = __webpack_require__(/*! ./utils/payload */ "./src/utils/payload.ts");
// Manager classes
var API_1 = __webpack_require__(/*! ./API */ "./src/API.ts");
var Configuration_1 = __webpack_require__(/*! ./Configuration */ "./src/Configuration.ts");
// Utilities
var invariant_1 = __webpack_require__(/*! ./utils/invariant */ "./src/utils/invariant.ts");
var is_1 = __webpack_require__(/*! ./utils/is */ "./src/utils/is.ts");
/**
 * Main SDK implementation provides the public API to interact with a
 * remote directus instance.
 * @uses API
 * @uses Configuration
 */
var SDK = /** @class */ (function () {
    // create a new instance with an API
    function SDK(options) {
        this.config = new Configuration_1.Configuration(options);
        this.api = new API_1.API(this.config);
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
    // #region authentication
    /**
     * Login to the API; Gets a new token from the API and stores it in this.api.token.
     */
    SDK.prototype.login = function (credentials, options) {
        return this.api.auth.login(credentials, options);
    };
    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    SDK.prototype.logout = function () {
        this.api.auth.logout();
    };
    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    SDK.prototype.reset = function () {
        this.api.reset();
    };
    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date).
     * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
     * - Calls onAutoRefreshError if refreshing the token fails for some reason.
     * @returns {[boolean, Error?]}
     */
    SDK.prototype.refreshIfNeeded = function () {
        return this.api.auth.refreshIfNeeded();
    };
    /**
     * Use the passed token to request a new one
     */
    SDK.prototype.refresh = function (token) {
        return this.api.auth.refresh(token);
    };
    /**
     * Request to reset the password of the user with the given email address.
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     */
    SDK.prototype.requestPasswordReset = function (email) {
        invariant_1.invariant(is_1.isString(email), "email must be a string");
        return this.api.post("/auth/password/request", {
            email: email,
        });
    };
    // #endregion authentication
    // #endregion collection presets
    // #region activity
    /**
     * Get activity
     */
    SDK.prototype.getActivity = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/activity", params);
    };
    // #endregion activity
    // #region bookmarks
    /**
     * Get the bookmarks of the current user
     * @deprecated Will be removed in the next major version, please use {@link SDK.getCollectionPresets} instead
     * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
     */
    SDK.prototype.getMyBookmarks = function (params) {
        if (params === void 0) { params = {}; }
        return this.getCollectionPresets(params);
    };
    // #endregion bookmarks
    // #region collections
    /**
     * Get all available collections
     */
    SDK.prototype.getCollections = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/collections", params);
    };
    /**
     * Get collection info by name
     */
    SDK.prototype.getCollection = function (collection, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/collections/" + collection, params);
    };
    /**
     * Create a collection
     */
    SDK.prototype.createCollection = function (data) {
        invariant_1.invariant(is_1.isObject(data), "data must be an object");
        return this.api.post("/collections", data);
    };
    /**
     * Updates a certain collection
     */
    SDK.prototype.updateCollection = function (collection, data) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObject(data), "data must be an object");
        return this.api.patch("/collections/" + collection, data);
    };
    /**
     * Deletes a certain collection
     */
    SDK.prototype.deleteCollection = function (collection) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        return this.api.delete("/collections/" + collection);
    };
    // #endregion collections
    // #region collection presets
    /**
     * Get the collection presets of the current user
     * @see https://docs.directus.io/api/reference.html#collection-presets
     */
    SDK.prototype.getCollectionPresets = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(this.config.token), "defined token is not a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
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
    /**
     * Create a new collection preset (bookmark / listing preferences)
     * @see https://docs.directus.io/api/reference.html#collection-presets
     */
    SDK.prototype.createCollectionPreset = function (data) {
        invariant_1.invariant(is_1.isObject(data), "data must be an object");
        return this.api.post("/collection_presets", data);
    };
    /**
     * Update collection preset (bookmark / listing preference)
     * @see https://docs.directus.io/api/reference.html#collection-presets
     */
    // tslint:disable-next-line: max-line-length
    SDK.prototype.updateCollectionPreset = function (primaryKey, data) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObject(data), "data must be an object");
        return this.api.patch("/collection_presets/" + primaryKey, data);
    };
    /**
     * Delete collection preset by primarykey
     * @see https://docs.directus.io/api/reference.html#collection-presets
     */
    SDK.prototype.deleteCollectionPreset = function (primaryKey) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        return this.api.delete("/collection_presets/" + primaryKey);
    };
    // #endregion collection presets
    // #region extensions
    /**
     * Get the information of all installed interfaces
     * @see https://docs.directus.io/api/reference.html#get-extensions
     */
    SDK.prototype.getInterfaces = function () {
        return this.api.request("get", "/interfaces", {}, {}, true);
    };
    /**
     * Get the information of all installed layouts
     * @see https://docs.directus.io/api/reference.html#get-extensions
     */
    SDK.prototype.getLayouts = function () {
        return this.api.request("get", "/layouts", {}, {}, true);
    };
    /**
     * Get the information of all installed pages
     * @see https://docs.directus.io/api/reference.html#get-extensions
     */
    SDK.prototype.getPages = function () {
        return this.api.request("get", "/pages", {}, {}, true);
    };
    // #endregion extensions
    // #region fields
    /**
     * Get all fields that are in Directus
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.getAllFields = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/fields", params);
    };
    /**
     * Get the fields that have been setup for a given collection
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.getFields = function (collection, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/fields/" + collection, params);
    };
    /**
     * Get the field information for a single given field
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.getField = function (collection, fieldName, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isString(fieldName), "fieldName must be a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/fields/" + collection + "/" + fieldName, params);
    };
    /**
     * Create a field in the given collection
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.createField = function (collection, fieldInfo) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObject(fieldInfo), "fieldInfo must be an object");
        return this.api.post("/fields/" + collection, fieldInfo);
    };
    /**
     * Update a given field in a given collection
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.updateField = function (collection, fieldName, fieldInfo) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isString(fieldName), "fieldName must be a string");
        invariant_1.invariant(is_1.isObject(fieldInfo), "fieldInfo must be an object");
        return this.api.patch("/fields/" + collection + "/" + fieldName, fieldInfo);
    };
    SDK.prototype.updateFields = function (collection, fieldsInfoOrFieldNames, fieldInfo) {
        if (fieldInfo === void 0) { fieldInfo = null; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isArray(fieldsInfoOrFieldNames), "fieldsInfoOrFieldNames must be an array");
        if (fieldInfo) {
            invariant_1.invariant(is_1.isObject(fieldInfo), "fieldInfo must be an object");
        }
        if (fieldInfo) {
            return this.api.patch("/fields/" + collection + "/" + fieldsInfoOrFieldNames.join(","), fieldInfo);
        }
        return this.api.patch("/fields/" + collection, fieldsInfoOrFieldNames);
    };
    /**
     * Delete a field from a collection
     * @see @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.deleteField = function (collection, fieldName) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isString(fieldName), "fieldName must be a string");
        return this.api.delete("/fields/" + collection + "/" + fieldName);
    };
    // #endregion fields
    // #region files
    /**
     * Get a list of available files from Directus
     * @see https://docs.directus.io/api/reference.html#files
     */
    SDK.prototype.getFiles = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                invariant_1.invariant(is_1.isObjectOrEmpty(params), "Params must be an object");
                return [2 /*return*/, this.api.get("/files", params)];
            });
        });
    };
    /**
     * Get a certain file or certain file list from Directus
     * @see https://docs.directus.io/api/reference.html#files
     */
    SDK.prototype.getFile = function (fileName, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var files;
            return __generator(this, function (_a) {
                invariant_1.invariant(is_1.isString(fileName), "FileName must be string");
                invariant_1.invariant(is_1.isObjectOrEmpty(params), "Params must be an object");
                files = typeof fileName === "string" ? fileName : fileName.join(",");
                return [2 /*return*/, this.api.get("/files/" + files, params)];
            });
        });
    };
    /**
     * Upload multipart files in multipart/form-data
     * @see https://docs.directus.io/api/reference.html#files
     */
    SDK.prototype.uploadFiles = function (data, // TODO: fix type definition
    onUploadProgress) {
        var _this = this;
        if (onUploadProgress === void 0) { onUploadProgress = function () { return ({}); }; }
        var headers = {
            Authorization: "Bearer " + this.config.token,
            "Content-Type": "multipart/form-data",
        };
        // limit concurrent requests to 5
        this.api.concurrent.attach(5);
        return this.api.xhr
            .post(this.config.url + "/" + this.config.project + "/files", data, {
            headers: headers,
            onUploadProgress: onUploadProgress,
        })
            .then(function (res) {
            // detach concurrency manager
            _this.api.concurrent.detach();
            return res.data;
        })
            .catch(function (error) {
            // detach concurrency manager
            _this.api.concurrent.detach();
            if (error.response) {
                throw error.response.data.error;
            }
            else {
                throw {
                    code: -1,
                    error: error,
                    message: "Network Error",
                };
            }
        });
    };
    // #endregion files
    // #region items
    /**
     * Update an existing item
     * @see https://docs.directus.io/api/reference.html#update-item
     * @typeparam TTPartialItem Defining the item type in object schema
     * @typeparam TTResult Extension of [TPartialItem] as expected result
     */
    SDK.prototype.updateItem = function (collection, primaryKey, body, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObject(body), "body must be an object");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.patch(collectionBasePath + "/" + primaryKey, body, params);
    };
    /**
     * Update multiple items
     * @see https://docs.directus.io/api/reference.html#update-items
     * @typeparam TPartialItem Defining an array of items, each in object schema
     * @typeparam TResult Extension of [TPartialItem] as expected result
     * @return {Promise<IItemsResponse<TPartialItem & TResult>>}
     */
    SDK.prototype.updateItems = function (collection, body, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isArray(body), "body must be an array");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.patch(collectionBasePath, body, params);
    };
    /**
     * Create a new item
     * @typeparam TItemType Defining an item and its fields in object schema
     * @return {Promise<IItemsResponse<TItemType>>}
     */
    SDK.prototype.createItem = function (collection, body) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObject(body), "body must be an object");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.post(collectionBasePath, body);
    };
    /**
     * Create multiple items
     * @see https://docs.directus.io/api/reference.html#create-items
     * @typeparam TItemsType Defining an array of items, each in object schema
     */
    SDK.prototype.createItems = function (collection, body) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isArray(body), "body must be an array");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.post(collectionBasePath, body);
    };
    /**
     * Get items from a given collection
     * @see https://docs.directus.io/api/reference.html#get-multiple-items
     * @typeparam TItemsType Defining an array of items, each in object schema
     */
    SDK.prototype.getItems = function (collection, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.get(collectionBasePath, params);
    };
    /**
     * Get a single item by primary key
     * @see https://docs.directus.io/api/reference.html#get-item
     * @typeparam TItemType Defining fields of an item in object schema
     */
    SDK.prototype.getItem = function (collection, primaryKey, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.get(collectionBasePath + "/" + primaryKey, params);
    };
    /**
     * Delete a single item by primary key
     * @see https://docs.directus.io/api/reference.html#delete-items
     */
    SDK.prototype.deleteItem = function (collection, primaryKey) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.delete(collectionBasePath + "/" + primaryKey);
    };
    /**
     * Delete multiple items by primary key
     * @see https://docs.directus.io/api/reference.html#delete-items
     */
    SDK.prototype.deleteItems = function (collection, primaryKeys) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isArray(primaryKeys), "primaryKeys must be an array");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.delete(collectionBasePath + "/" + primaryKeys.join());
    };
    // #endregion items
    // #region listing preferences
    /**
     * Get the collection presets of the current user for a single collection
     */
    SDK.prototype.getMyListingPreferences = function (collection, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(this.config.token), "token must be defined");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
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
    // #endregion listing preferences
    // #region permissions
    /**
     * Get permissions
     * @param {QueryParamsType?} params
     * @return {Promise<IPermission>}
     */
    SDK.prototype.getPermissions = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.getItems("directus_permissions", params);
    };
    /**
     * TODO: Fix type-def for return
     * Get the currently logged in user's permissions
     * @typeparam TResponse Permissions type as array extending any[]
     */
    SDK.prototype.getMyPermissions = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/permissions/me", params);
    };
    /**
     * TODO: Fix type-def for param and return
     * Create multiple new permissions
     * @typeparam TResponse Permissions type as array extending any[]
     */
    SDK.prototype.createPermissions = function (data) {
        invariant_1.invariant(is_1.isArray(data), "data must be anarry");
        return this.api.post("/permissions", data);
    };
    /**
     * TODO: Fix type-def for param and return
     * Update multiple permission records
     * @typeparam TResponse Permissions type as array extending any[]
     */
    SDK.prototype.updatePermissions = function (data) {
        invariant_1.invariant(is_1.isArray(data), "data must be anarry");
        return this.api.patch("/permissions", data);
    };
    // #endregion permissions
    // #region relations
    /**
     * Get all relationships
     * @param {QueryParamsType?} params
     * @return {Promise<IRelationsResponse>}
     */
    SDK.prototype.getRelations = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/relations", params);
    };
    /**
     * Creates new relation
     * @param {IRelation} data
     * @return {Promise<IRelationResponse>}
     */
    SDK.prototype.createRelation = function (data) {
        return this.api.post("/relations", data);
    };
    /**
     * Updates existing relation
     */
    SDK.prototype.updateRelation = function (primaryKey, data) {
        return this.api.patch("/relations/" + primaryKey, data);
    };
    /**
     * TODO: Add type-def for return value(s)
     * Get the relationship information for the given collection
     */
    SDK.prototype.getCollectionRelations = function (collection, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return Promise.all([
            this.api.get("/relations", {
                "filter[collection_a][eq]": collection,
            }),
            this.api.get("/relations", {
                "filter[collection_b][eq]": collection,
            }),
        ]);
    };
    // #endregion relations
    // #region revisions
    /**
     * Get a single item's revisions by primary key
     * @typeparam DataAndDelta  The data including delta type for the revision
     * @param {string} collection
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getItemRevisions = function (collection, primaryKey, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.get(collectionBasePath + "/" + primaryKey + "/revisions", params);
    };
    /**
     * Revert an item to a previous state
     * @param {string} collection
     * @param {PrimaryKeyType} primaryKey
     * @param {number} revisionID
     */
    SDK.prototype.revert = function (collection, primaryKey, revisionID) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isNumber(revisionID), "revisionID must be a number");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.patch(collectionBasePath + "/" + primaryKey + "/revert/" + revisionID);
    };
    // #endregion revisions
    // #region roles
    /**
     * Get a single user role
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getRole = function (primaryKey, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isNumber(primaryKey), "primaryKey must be a number");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/roles/" + primaryKey, params);
    };
    /**
     * Get the user roles
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getRoles = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/roles", params);
    };
    /**
     * Update a user role
     * @param {PrimaryKeyType} primaryKey
     * @param {Role} body
     */
    SDK.prototype.updateRole = function (primaryKey, body) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObject(body), "body must be an object");
        return this.updateItem("directus_roles", primaryKey, body);
    };
    /**
     * Create a new user role
     * @param {Role} body
     */
    SDK.prototype.createRole = function (body) {
        invariant_1.invariant(is_1.isObject(body), "body must be an object");
        return this.createItem("directus_roles", body);
    };
    /**
     * Delete a user rol by primary key
     * @param {PrimaryKeyType} primaryKey
     */
    SDK.prototype.deleteRole = function (primaryKey) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        return this.deleteItem("directus_roles", primaryKey);
    };
    // #endregion roles
    // #region settings
    /**
     * Get Directus' global settings
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getSettings = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/settings", params);
    };
    /**
     * Get the "fields" for directus_settings
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getSettingsFields = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/settings/fields", params);
    };
    // #endregion settings
    // #region users
    /**
     * Get a list of available users in Directus
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getUsers = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/users", params);
    };
    /**
     * Get a single Directus user
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getUser = function (primaryKey, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/users/" + primaryKey, params);
    };
    /**
     * Get the user info of the currently logged in user
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getMe = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/users/me", params);
    };
    /**
     * Update a single user based on primaryKey
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    SDK.prototype.updateUser = function (primaryKey, body) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObject(body), "body must be an object");
        return this.updateItem("directus_users", primaryKey, body);
    };
    // #endregion users
    // #region server admin
    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     * @return {Promise<void>}
     */
    SDK.prototype.updateDatabase = function () {
        return this.api.post("/update");
    };
    /**
     * Ping the API to check if it exists / is up and running, returns "pong"
     * @return {Promise<string>}
     */
    SDK.prototype.ping = function () {
        return this.api.request("get", "/server/ping", {}, {}, true, {}, true);
    };
    /**
     * Get the server info from the API
     * @return {Promise<IServerInformationResponse>}
     */
    SDK.prototype.serverInfo = function () {
        return this.api.request("get", "/", {}, {}, true);
    };
    /**
     * TODO: Add response type-def
     * Get the server info from the project
     * @return {Promise<any>}
     */
    SDK.prototype.projectInfo = function () {
        return this.api.request("get", "/");
    };
    /**
     * TODO: Add response type-def
     * Get all the setup third party auth providers
     * @return {Promise<any>}
     */
    SDK.prototype.getThirdPartyAuthProviders = function () {
        return this.api.get("/auth/sso");
    };
    // convenience method
    SDK.getPayload = payload_1.getPayload;
    return SDK;
}());
exports.SDK = SDK;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Configuration_1 = __webpack_require__(/*! ./Configuration */ "./src/Configuration.ts");
exports.Configuration = Configuration_1.Configuration;
var SDK_1 = __webpack_require__(/*! ./SDK */ "./src/SDK.ts");
exports.SDK = SDK_1.SDK;
/**
 * @deprecated please use named imports instead of defaults
 */
exports.default = SDK_1.SDK;


/***/ }),

/***/ "./src/utils/collection.ts":
/*!*********************************!*\
  !*** ./src/utils/collection.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DIRECTUS_COLLECTION_PREFIX = "directus_";
/**
 * Returns the correct API path for the collection. It will
 * strip the prefix @{DIRECTUS_COLLECTION_PREFIX} or will add the
 * '/items/' path as prefix if not provided. The 'substr(9)' defines
 * the length of the defined @{DIRECTUS_COLLECTION_PREFIX}.
 * @param {string} collection     The name of the collection
 * @returns {string}
 * @internal
 *
 * @example
 * getCollectionItemPath('directus_users');
 * // => '/users'
 * getCollectionItemPath('users');
 * // => '/items/users'
 */
function getCollectionItemPath(collection) {
    if (collection.startsWith(exports.DIRECTUS_COLLECTION_PREFIX)) {
        return "/" + collection.substr(9);
    }
    return "/items/" + collection;
}
exports.getCollectionItemPath = getCollectionItemPath;


/***/ }),

/***/ "./src/utils/invariant.ts":
/*!********************************!*\
  !*** ./src/utils/invariant.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks invariant violation against a condition, will throw an error if not fulfilled
 * @internal
 * @param {boolean} condition
 * @param {string} message
 */
exports.invariant = function (condition, message) {
    if (!!condition === true) {
        return;
    }
    throw new Error("Invariant violation: " + message);
};


/***/ }),

/***/ "./src/utils/is.ts":
/*!*************************!*\
  !*** ./src/utils/is.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isType = function (t, v) { return Object.prototype.toString.call(v) === "[object " + t + "]"; };
/**
 * @internal
 */
exports.isNotNull = function (v) { return v !== null && v !== undefined; };
/**
 * @internal
 */
exports.isString = function (v) { return v && typeof v === "string" && /\S/.test(v); };
/**
 * @internal
 */
exports.isNumber = function (v) { return isType("Number", v) && isFinite(v) && !isNaN(parseFloat(v)); };
/**
 * @internal
 */
exports.isFunction = function (v) { return v instanceof Function; };
/**
 * @internal
 */
exports.isObjectOrEmpty = function (v) { return isType("Object", v); };
/**
 * @internal
 */
exports.isArrayOrEmpty = function (v) { return isType("Array", v); };
/**
 * @internal
 */
exports.isArray = function (v) { return (!exports.isArrayOrEmpty(v) ? false : v.length > 0); };
/**
 * @internal
 */
exports.isObject = function (v) {
    if (!exports.isObjectOrEmpty(v)) {
        return false;
    }
    for (var key in v) {
        if (Object.prototype.hasOwnProperty.call(v, key)) {
            return true;
        }
    }
    return false;
};


/***/ }),

/***/ "./src/utils/payload.ts":
/*!******************************!*\
  !*** ./src/utils/payload.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var base64 = __webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js");
var is_1 = __webpack_require__(/*! ./is */ "./src/utils/is.ts");
/**
 * Retrieves the payload from a JWT
 * @internal
 * @param  {String} token The JWT to retrieve the payload from
 * @return {Object}       The JWT payload
 */
function getPayload(token) {
    if (!token || token.length < 0 || token.split(".").length <= 0) {
        // no token or invalid token equals no payload
        return {};
    }
    try {
        var payloadBase64 = token
            .split(".")[1]
            .replace("-", "+")
            .replace("_", "/");
        var payloadDecoded = base64.decode(payloadBase64);
        var payloadObject = JSON.parse(payloadDecoded);
        if (is_1.isNumber(payloadObject.exp)) {
            payloadObject.exp = new Date(payloadObject.exp * 1000);
        }
        return payloadObject;
    }
    catch (err) {
        // return empty payload in case of an error
        return {};
    }
}
exports.getPayload = getPayload;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9iYXNlLTY0L2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvQVBJLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL0F1dGhlbnRpY2F0aW9uLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL0NvbmN1cnJlbmN5TWFuYWdlci50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy9Db25maWd1cmF0aW9uLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL1NESy50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy91dGlscy9jb2xsZWN0aW9uLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3V0aWxzL2ludmFyaWFudC50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy91dGlscy9pcy50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3Ny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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN1VBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLG1CQUFtQixLQUEwQjs7QUFFN0M7QUFDQSxrQkFBa0IsS0FBeUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUVVO0FBQ1o7QUFDQSxFQUFFLG1DQUFPO0FBQ1Q7QUFDQSxHQUFHO0FBQUEsb0dBQUM7QUFDSixFQUFFLE1BQU0sWUFVTjs7QUFFRixDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEtEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7QUN2THpCOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakJhOztBQUViLFlBQVksbUJBQU8sQ0FBQywrQ0FBUztBQUM3QixjQUFjLG1CQUFPLENBQUMsbURBQVc7QUFDakM7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSxLQUFLO0FBQ0wscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixvQkFBb0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1UWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUFJLENBQUM7U0FDYjtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzVDRixvRkFBa0M7QUFDbEMsZ0VBQWdDO0FBRWhDOzs7OztHQUtHO0FBQ0gsU0FBZ0IsVUFBVSxDQUE0QixLQUFhO0lBQ2pFLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQzlELDhDQUE4QztRQUM5QyxPQUFPLEVBQU8sQ0FBQztLQUNoQjtJQUVELElBQUk7UUFDRixJQUFNLGFBQWEsR0FBRyxLQUFLO2FBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzthQUNqQixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVqRCxJQUFJLGFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0IsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsT0FBTyxhQUFhLENBQUM7S0FDdEI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLDJDQUEyQztRQUMzQyxPQUFPLEVBQU8sQ0FBQztLQUNoQjtBQUNILENBQUM7QUF2QkQsZ0NBdUJDIiwiZmlsZSI6ImRpcmVjdHVzLXNkay51bWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkRpcmVjdHVzU0RLXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRpcmVjdHVzU0RLXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRpcmVjdHVzU0RLXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QgPyBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCkgOiAnZ2V0JztcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHV0aWxzLmZvckVhY2goWyd1cmwnLCAnbWV0aG9kJywgJ3BhcmFtcycsICdkYXRhJ10sIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5J10sIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICh1dGlscy5pc09iamVjdChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goW1xuICAgICdiYXNlVVJMJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXG4gICAgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcbiAgICAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnbWF4Q29udGVudExlbmd0aCcsXG4gICAgJ3ZhbGlkYXRlU3RhdHVzJywgJ21heFJlZGlyZWN0cycsICdodHRwQWdlbnQnLCAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsXG4gICAgJ3NvY2tldFBhdGgnXG4gIF0sIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIC8vIE9ubHkgTm9kZS5KUyBoYXMgYSBwcm9jZXNzIHZhcmlhYmxlIHRoYXQgaXMgb2YgW1tDbGFzc11dIHByb2Nlc3NcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdmFyIG9yaWdpblVSTDtcblxuICAgICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gZXF1YWwgdG8gbWVyZ2Ugd2l0aCB0aGUgZGlmZmVyZW5jZSBiZWluZyB0aGF0IG5vIHJlZmVyZW5jZVxuICogdG8gb3JpZ2luYWwgb2JqZWN0cyBpcyBrZXB0LlxuICpcbiAqIEBzZWUgbWVyZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGRlZXBNZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIvKiEgaHR0cDovL210aHMuYmUvYmFzZTY0IHYwLjEuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGQ7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzAuMS4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6ICdSRkMzOTg2JyxcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBjb21tYTogJ2NvbW1hJyxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xudmFyIHB1c2hUb0FycmF5ID0gZnVuY3Rpb24gKGFyciwgdmFsdWVPckFycmF5KSB7XG4gICAgcHVzaC5hcHBseShhcnIsIGlzQXJyYXkodmFsdWVPckFycmF5KSA/IHZhbHVlT3JBcnJheSA6IFt2YWx1ZU9yQXJyYXldKTtcbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWRkUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgZm9ybWF0dGVyOiBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0c1snZGVmYXVsdCddXSxcbiAgICAvLyBkZXByZWNhdGVkXG4gICAgaW5kaWNlczogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgY2hhcnNldFxuKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSBvYmouam9pbignLCcpO1xuICAgIH1cblxuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCkgOiBwcmVmaXg7XG4gICAgICAgIH1cblxuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgaWYgKGVuY29kZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGVuY29kZVZhbHVlc09ubHkgPyBwcmVmaXggOiBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCk7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICB0eXBlb2YgZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2Z1bmN0aW9uJyA/IGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpIDogcHJlZml4LFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgICAgIGNoYXJzZXRcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxudmFyIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmVuY29kZXIgIT09IG51bGwgJiYgb3B0cy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBjaGFyc2V0ID0gb3B0cy5jaGFyc2V0IHx8IGRlZmF1bHRzLmNoYXJzZXQ7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFoYXMuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdCA9IG9wdHMuZm9ybWF0O1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cbiAgICB2YXIgZmlsdGVyID0gZGVmYXVsdHMuZmlsdGVyO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdmdW5jdGlvbicgfHwgaXNBcnJheShvcHRzLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUXVlcnlQcmVmaXg6IHR5cGVvZiBvcHRzLmFkZFF1ZXJ5UHJlZml4ID09PSAnYm9vbGVhbicgPyBvcHRzLmFkZFF1ZXJ5UHJlZml4IDogZGVmYXVsdHMuYWRkUXVlcnlQcmVmaXgsXG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0cy5kZWxpbWl0ZXIsXG4gICAgICAgIGVuY29kZTogdHlwZW9mIG9wdHMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZSxcbiAgICAgICAgZW5jb2RlcjogdHlwZW9mIG9wdHMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXIsXG4gICAgICAgIGVuY29kZVZhbHVlc09ubHk6IHR5cGVvZiBvcHRzLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICAgICAgc29ydDogdHlwZW9mIG9wdHMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc29ydCA6IG51bGwsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcblxuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoVG9BcnJheShrZXlzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2tpcE51bGxzLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGUgPyBvcHRpb25zLmVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgb3B0aW9ucy5maWx0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLnNvcnQsXG4gICAgICAgICAgICBvcHRpb25zLmFsbG93RG90cyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0dGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgb3B0aW9ucy5jaGFyc2V0XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JyksIHRoZSBcIm51bWVyaWMgZW50aXR5XCIgcmVwcmVzZW50YXRpb24gb2YgYSBjaGVja21hcmtcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lMjYlMjMxMDAwMyUzQiYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGhleFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIGFycmF5LnB1c2goJyUnICsgKChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KSkudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufSgpKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKChvcHRpb25zICYmIChvcHRpb25zLnBsYWluT2JqZWN0cyB8fCBvcHRpb25zLmFsbG93UHJvdG90eXBlcykpIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2VUYXJnZXQgPSB0YXJnZXQ7XG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIG1lcmdlVGFyZ2V0ID0gYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJdGVtID0gdGFyZ2V0W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJdGVtICYmIHR5cGVvZiB0YXJnZXRJdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBtZXJnZSh0YXJnZXRJdGVtLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKGFjYywga2V5KSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBtZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbnZhciBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ25TaW5nbGVTb3VyY2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGFjY1trZXldID0gc291cmNlW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGFyZ2V0KTtcbn07XG5cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiAoc3RyLCBkZWNvZGVyLCBjaGFyc2V0KSB7XG4gICAgdmFyIHN0cldpdGhvdXRQbHVzID0gc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgLy8gdW5lc2NhcGUgbmV2ZXIgdGhyb3dzLCBubyB0cnkuLi5jYXRjaCBuZWVkZWQ6XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cy5yZXBsYWNlKC8lWzAtOWEtZl17Mn0vZ2ksIHVuZXNjYXBlKTtcbiAgICB9XG4gICAgLy8gdXRmLThcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cldpdGhvdXRQbHVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cztcbiAgICB9XG59O1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHN0ciwgZGVmYXVsdEVuY29kZXIsIGNoYXJzZXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyIDogU3RyaW5nKHN0cik7XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgKGMgPj4gNildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgKGMgPj4gMTIpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpICs9IDE7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKCgoYyAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgJiAweDNGRikpO1xuICAgICAgICBvdXQgKz0gaGV4VGFibGVbMHhGMCB8IChjID4+IDE4KV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiAxMikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbnZhciBjb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCh2YWx1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFt7IG9iajogeyBvOiB2YWx1ZSB9LCBwcm9wOiAnbycgfV07XG4gICAgdmFyIHJlZnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZVtpXTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHsgb2JqOiBvYmosIHByb3A6IGtleSB9KTtcbiAgICAgICAgICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBhY3RRdWV1ZShxdWV1ZSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxudmFyIGlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG5cbnZhciBjb21iaW5lID0gZnVuY3Rpb24gY29tYmluZShhLCBiKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChhLCBiKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFycmF5VG9PYmplY3Q6IGFycmF5VG9PYmplY3QsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgY29tYmluZTogY29tYmluZSxcbiAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gICAgbWVyZ2U6IG1lcmdlXG59O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCAqIGFzIHFzU3RyaW5naWZ5IGZyb20gXCJxcy9saWIvc3RyaW5naWZ5XCI7XG5cbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uLCBJQXV0aGVudGljYXRpb24gfSBmcm9tIFwiLi9BdXRoZW50aWNhdGlvblwiO1xuaW1wb3J0IHsgY29uY3VycmVuY3lNYW5hZ2VyIH0gZnJvbSBcIi4vQ29uY3VycmVuY3lNYW5hZ2VyXCI7XG5pbXBvcnQgeyBJQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL0NvbmZpZ3VyYXRpb25cIjtcblxuLy8gU2NoZW1lIHR5cGVzXG5pbXBvcnQgeyBCb2R5VHlwZSB9IGZyb20gXCIuL3NjaGVtZXMvaHR0cC9Cb2R5XCI7XG5pbXBvcnQgeyBSZXF1ZXN0TWV0aG9kIH0gZnJvbSBcIi4vc2NoZW1lcy9odHRwL1JlcXVlc3RcIjtcbmltcG9ydCB7IElFcnJvclJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9FcnJvclwiO1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7IGludmFyaWFudCB9IGZyb20gXCIuL3V0aWxzL2ludmFyaWFudFwiO1xuaW1wb3J0IHsgaXNBcnJheU9yRW1wdHksIGlzT2JqZWN0T3JFbXB0eSwgaXNTdHJpbmcgfSBmcm9tIFwiLi91dGlscy9pc1wiO1xuaW1wb3J0IHsgZ2V0UGF5bG9hZCB9IGZyb20gXCIuL3V0aWxzL3BheWxvYWRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJQVBJIHtcbiAgYXV0aDogSUF1dGhlbnRpY2F0aW9uO1xuICB4aHI6IEF4aW9zSW5zdGFuY2U7XG4gIGNvbmN1cnJlbnQ6IFJldHVyblR5cGU8dHlwZW9mIGNvbmN1cnJlbmN5TWFuYWdlcj47XG4gIHJlc2V0KCk6IHZvaWQ7XG4gIGdldDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPFQ+O1xuICBwb3N0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcsIGJvZHk/OiBCb2R5VHlwZSwgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgcGF0Y2g8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keT86IEJvZHlUeXBlLCBwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPFQ+O1xuICBwdXQ8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keT86IEJvZHlUeXBlLCBwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPFQ+O1xuICBkZWxldGU8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZyk6IFByb21pc2U8VD47XG4gIGdldFBheWxvYWQ8VCBleHRlbmRzIG9iamVjdCA9IG9iamVjdD4oKTogVDtcbiAgcmVxdWVzdDxUIGV4dGVuZHMgYW55ID0gYW55PihcbiAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2QsXG4gICAgZW5kcG9pbnQ6IHN0cmluZyxcbiAgICBwYXJhbXM/OiBvYmplY3QsXG4gICAgZGF0YT86IG9iamVjdCxcbiAgICBub0Vudj86IGJvb2xlYW4sXG4gICAgaGVhZGVycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0sXG4gICAgc2tpcFBhcnNlVG9KU09OPzogYm9vbGVhblxuICApOiBQcm9taXNlPFQ+O1xufVxuXG4vKipcbiAqIEFQSSBkZWZpbml0aW9uIGZvciBIVFRQIHRyYW5zYWN0aW9uc1xuICogQHVzZXMgQXV0aGVudGljYXRpb25cbiAqIEB1c2VzIGF4aW9zXG4gKi9cbmV4cG9ydCBjbGFzcyBBUEkgaW1wbGVtZW50cyBJQVBJIHtcbiAgcHVibGljIGF1dGg6IElBdXRoZW50aWNhdGlvbjtcbiAgcHVibGljIHhociA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgcGFyYW1zU2VyaWFsaXplcjogcXNTdHJpbmdpZnksXG4gICAgdGltZW91dDogMTAgKiA2MCAqIDEwMDAsIC8vIDEwIG1pblxuICB9KTtcbiAgcHVibGljIGNvbmN1cnJlbnQgPSBjb25jdXJyZW5jeU1hbmFnZXIodGhpcy54aHIsIDEwKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogSUNvbmZpZ3VyYXRpb24pIHtcbiAgICB0aGlzLmF1dGggPSBuZXcgQXV0aGVudGljYXRpb24oY29uZmlnLCB7XG4gICAgICBwb3N0OiB0aGlzLnBvc3QuYmluZCh0aGlzKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGNsaWVudCBpbnN0YW5jZSBieSBsb2dnaW5nIG91dCBhbmQgcmVtb3ZpbmcgdGhlIFVSTCBhbmQgcHJvamVjdFxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuYXV0aC5sb2dvdXQoKTtcbiAgICB0aGlzLmNvbmZpZy5kZWxldGVIeWRyYXRlZENvbmZpZygpO1xuICB9XG5cbiAgLy8vIFJFUVVFU1QgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEdFVCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqIEB0eXBlcGFyYW0gVCAgIHJlc3BvbnNlIHR5cGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyBnZXQ8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBlbmRwb2ludCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQT1NUIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICogQHR5cGVwYXJhbSBUICAgcmVzcG9uc2UgdHlwZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFQ+fVxuICAgKi9cbiAgcHVibGljIHBvc3Q8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keTogQm9keVR5cGUgPSB7fSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoQXJyYXkuaXNBcnJheShib2R5KSA/IGlzQXJyYXlPckVtcHR5KGJvZHkpIDogaXNPYmplY3RPckVtcHR5KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBhcnJheSBvciBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PFQ+KFwicG9zdFwiLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQQVRDSCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqIEB0eXBlcGFyYW0gVCAgIHJlc3BvbnNlIHR5cGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyBwYXRjaDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBib2R5OiBCb2R5VHlwZSA9IHt9LCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVuZHBvaW50KSwgXCJlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChBcnJheS5pc0FycmF5KGJvZHkpID8gaXNBcnJheU9yRW1wdHkoYm9keSkgOiBpc09iamVjdE9yRW1wdHkoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIGFycmF5IG9yIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VD4oXCJwYXRjaFwiLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQVVQgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgKiBAdHlwZXBhcmFtIFQgICByZXNwb25zZSB0eXBlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gICAqL1xuICBwdWJsaWMgcHV0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcsIGJvZHk6IEJvZHlUeXBlID0ge30sIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZW5kcG9pbnQpLCBcImVuZHBvaW50IG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KEFycmF5LmlzQXJyYXkoYm9keSkgPyBpc0FycmF5T3JFbXB0eShib2R5KSA6IGlzT2JqZWN0T3JFbXB0eShib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gYXJyYXkgb3Igb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxUPihcInB1dFwiLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBERUxFVEUgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgKiBAdHlwZXBhcmFtIFQgICByZXNwb25zZSB0eXBlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZW5kcG9pbnQpLCBcImVuZHBvaW50IG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PFQ+KFwiZGVsZXRlXCIsIGVuZHBvaW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwYXlsb2FkIG9mIHRoZSBjdXJyZW50IHRva2VuLCByZXR1cm4gdHlwZSBjYW4gYmUgZ2VuZXJpY1xuICAgKiBAdHlwZXBhcmFtIFQgICBleHRlbmRzIG9iamVjdCwgcGF5bG9hZCB0eXBlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gICAqL1xuICBwdWJsaWMgZ2V0UGF5bG9hZDxUIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0PigpOiBUIHtcbiAgICBpZiAoIWlzU3RyaW5nKHRoaXMuY29uZmlnLnRva2VuKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldFBheWxvYWQ8VD4odGhpcy5jb25maWcudG9rZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYW4gQVBJIHJlcXVlc3QgdG8gdGhlIERpcmVjdHVzIEFQSVxuICAgKiBAcGFyYW0ge1JlcXVlc3RNZXRob2R9IG1ldGhvZCAgICBTZWxlY3RlZCBIVFRQIG1ldGhvZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZW5kcG9pbnQgICAgICAgICBFbmRwb2ludCBkZWZpbml0aW9uIGFzIHBhdGhcbiAgICogQHBhcmFtIHtvYmplY3Q9e319IHBhcmFtcyAgICAgICAgUXVlcnkgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge29iamVjdD17fX0gZGF0YSAgICAgICAgICBEYXRhIHBhc3NlZCB0byBkaXJlY3R1c1xuICAgKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9IG5vRW52ICAgICBEbyBub3QgaW5jbHVkZSB0aGUgYGVudmAgaW4gdGhlIHVybCAoZm9yIHN5c3RlbSBjYWxscylcbiAgICogQHBhcmFtIHtvYmplY3Q9e319IGhlYWRlcnMgICAgICAgT3B0aW9uYWwgaGVhZGVycyB0byBpbmNsdWRlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gc2tpcFBhcnNlVG9KU09OICBXaGV0aGVyIHRvIHNraXAgYEpTT04ucGFyc2VgIG9yIG5vdFxuICAgKiBAdHlwZXBhcmFtIFQgICAgICAgICAgICAgICAgICAgICBSZXNwb25zZSB0eXBlIGRlZmluaXRpb24sIGRlZmF1bHRzIHRvIGBhbnlgXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gICAqL1xuICBwdWJsaWMgcmVxdWVzdDxUIGV4dGVuZHMgYW55ID0gYW55PihcbiAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2QsXG4gICAgZW5kcG9pbnQ6IHN0cmluZyxcbiAgICBwYXJhbXM6IG9iamVjdCA9IHt9LFxuICAgIGRhdGE6IG9iamVjdCA9IHt9LFxuICAgIG5vRW52OiBib29sZWFuID0gZmFsc2UsXG4gICAgaGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9LFxuICAgIHNraXBQYXJzZVRvSlNPTjogYm9vbGVhbiA9IGZhbHNlXG4gICk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhtZXRob2QpLCBcIm1ldGhvZCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuICAgIGludmFyaWFudChpc1N0cmluZyh0aGlzLmNvbmZpZy51cmwpLCBcIm1haW4gdXJsIG11c3QgYmUgZGVmaW5lZCAoc2VlIGNvbnN0cnVjdG9yKVwiKTtcbiAgICBpbnZhcmlhbnQoQXJyYXkuaXNBcnJheShkYXRhKSA/IGlzQXJyYXlPckVtcHR5KGRhdGEpIDogaXNPYmplY3RPckVtcHR5KGRhdGEpLCBcImRhdGEgbXVzdCBiZSBhbiBhcnJheSBvciBvYmplY3RcIik7XG5cbiAgICBsZXQgYmFzZVVSTCA9IGAke3RoaXMuY29uZmlnLnVybH0vYDtcblxuICAgIGlmIChub0VudiA9PT0gZmFsc2UpIHtcbiAgICAgIGJhc2VVUkwgKz0gYCR7dGhpcy5jb25maWcucHJvamVjdH0vYDtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIGJhc2VVUkwsXG4gICAgICBkYXRhLFxuICAgICAgaGVhZGVycyxcbiAgICAgIG1ldGhvZCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIHVybDogZW5kcG9pbnQsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy50b2tlbiAmJiBpc1N0cmluZyh0aGlzLmNvbmZpZy50b2tlbikgJiYgdGhpcy5jb25maWcudG9rZW4ubGVuZ3RoID4gMCkge1xuICAgICAgcmVxdWVzdE9wdGlvbnMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dGhpcy5jb25maWcudG9rZW59YDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy54aHJcbiAgICAgIC5yZXF1ZXN0KHJlcXVlc3RPcHRpb25zKVxuICAgICAgLnRoZW4oKHJlczogeyBkYXRhOiBhbnkgfSkgPT4gcmVzLmRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2VEYXRhOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFyZXNwb25zZURhdGEgfHwgcmVzcG9uc2VEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZURhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gc2tpcFBhcnNlVG9KU09OID8gcmVzcG9uc2VEYXRhIDogSlNPTi5wYXJzZShyZXNwb25zZURhdGEpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgIGpzb246IHRydWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZURhdGEgYXMgVDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yOiBJRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmpzb24gPT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICBjb2RlOiAtMixcbiAgICAgICAgICAgIGRhdGE6IGVycm9yLmRhdGEsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IuZXJyb3IsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkFQSSByZXR1cm5lZCBpbnZhbGlkIEpTT05cIixcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk5ldHdvcmsgRXJyb3JcIixcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb24sIElDb25maWd1cmF0aW9uVmFsdWVzIH0gZnJvbSBcIi4vQ29uZmlndXJhdGlvblwiO1xuXG4vLyBPdGhlciBjbGFzc2VzXG5pbXBvcnQgeyBJQVBJIH0gZnJvbSBcIi4vQVBJXCI7XG5cbi8vIFNjaGVtZSB0eXBlc1xuaW1wb3J0IHsgSUF1dGhlbnRpY2F0ZVJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9hdXRoL0F1dGhlbnRpY2F0ZVwiO1xuaW1wb3J0IHsgSUxvZ2luQ3JlZGVudGlhbHMsIElMb2dpbk9wdGlvbnMgfSBmcm9tIFwiLi9zY2hlbWVzL2F1dGgvTG9naW5cIjtcbmltcG9ydCB7IElMb2dpblJlc3BvbnNlLCBSZWZyZXNoSWZOZWVkZWRSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvTG9naW5cIjtcbmltcG9ydCB7IElSZWZyZXNoVG9rZW5SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvVG9rZW5cIjtcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQgeyBpbnZhcmlhbnQgfSBmcm9tIFwiLi91dGlscy9pbnZhcmlhbnRcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24sIGlzT2JqZWN0LCBpc1N0cmluZyB9IGZyb20gXCIuL3V0aWxzL2lzXCI7XG5pbXBvcnQgeyBnZXRQYXlsb2FkIH0gZnJvbSBcIi4vdXRpbHMvcGF5bG9hZFwiO1xuXG5pbnRlcmZhY2UgSUF1dGhlbnRpY2F0aW9uUmVmcmVzaEVycm9yIHtcbiAgY29kZT86IG51bWJlcjtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSUF1dGhlbnRpY2F0aW9uSW5qZWN0YWJsZVByb3BzIHtcbiAgcG9zdDogSUFQSVtcInBvc3RcIl07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dGhlbnRpY2F0aW9uIHtcbiAgcmVmcmVzaEludGVydmFsPzogbnVtYmVyO1xuICBpc0xvZ2dlZEluKCk6IGJvb2xlYW47XG4gIGxvZ2luKGNyZWRlbnRpYWxzOiBJTG9naW5DcmVkZW50aWFscywgb3B0aW9ucz86IElMb2dpbk9wdGlvbnMpOiBQcm9taXNlPElMb2dpblJlc3BvbnNlPjtcbiAgbG9nb3V0KCk6IHZvaWQ7XG4gIHJlZnJlc2hJZk5lZWRlZCgpOiBQcm9taXNlPFtib29sZWFuLCBFcnJvcj9dPjtcbiAgcmVmcmVzaCh0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxJUmVmcmVzaFRva2VuUmVzcG9uc2U+O1xufVxuXG4vKipcbiAqIEhhbmRsZXMgYWxsIGF1dGhlbnRpY2F0aW9uIHJlbGF0ZWQgbG9naWMsIGRlY291cGxlZCBmcm9tIHRoZSBjb3JlXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uIGltcGxlbWVudHMgSUF1dGhlbnRpY2F0aW9uIHtcbiAgLyoqXG4gICAqIEN1cnJlbnQgc2V0IGF1dG8tcmVmcmVzaCBpbnRlcnZhbCBvciB1bmRlZmluZWRcbiAgICogQHR5cGUge251bWJlcnx1bmRlZmluZWR9XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaEludGVydmFsPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBjdXN0b21pemVkIGVycm9yIGhhbmRsZXJcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIG9uQXV0b1JlZnJlc2hFcnJvcj86IChtc2c6IElBdXRoZW50aWNhdGlvblJlZnJlc2hFcnJvcikgPT4gdm9pZDtcblxuICAvKipcbiAgICogT3B0aW9uYWwgY3VzdG9taXplZCBzdWNjZXNzIGhhbmRsZXJcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIG9uQXV0b1JlZnJlc2hTdWNjZXNzPzogKGNvbmZpZzogSUNvbmZpZ3VyYXRpb25WYWx1ZXMpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYXV0aGVudGljYXRpb24gaW5zdGFuY2VcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7SUNvbmZpZ3VyYXRpb259IGNvbmZpZ1xuICAgKiBAcGFyYW0ge0lBdXRoZW50aWNhdGlvbkluamVjdGFibGVQcm9wc30gaW5qZWN0XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogSUNvbmZpZ3VyYXRpb24sIHByaXZhdGUgaW5qZWN0OiBJQXV0aGVudGljYXRpb25JbmplY3RhYmxlUHJvcHMpIHtcbiAgICAvLyBPbmx5IHN0YXJ0IHRoZSBhdXRvIHJlZnJlc2ggaW50ZXJ2YWwgaWYgdGhlIHRva2VuIGV4aXN0cyBhbmQgaXQncyBhIEpXVFxuICAgIGlmIChjb25maWcudG9rZW4gJiYgY29uZmlnLnRva2VuLmluY2x1ZGVzKFwiLlwiKSkge1xuICAgICAgdGhpcy5zdGFydEludGVydmFsKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgY3VycmVudCBhdXRoIHN0YXR1cyBpcyBsb2dnZWQgaW5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyBpc0xvZ2dlZEluKCk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgIGlzU3RyaW5nKHRoaXMuY29uZmlnLnRva2VuKSAmJlxuICAgICAgaXNTdHJpbmcodGhpcy5jb25maWcudXJsKSAmJlxuICAgICAgaXNTdHJpbmcodGhpcy5jb25maWcucHJvamVjdCkgJiZcbiAgICAgIGlzT2JqZWN0KHRoaXMuZ2V0UGF5bG9hZCgpKVxuICAgICkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmxvY2FsRXhwID4gRGF0ZS5ub3coKSkge1xuICAgICAgICAvLyBOb3QgZXhwaXJlZCwgc3VjY2VlZFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZ2luIHRvIHRoZSBBUEk7IEdldHMgYSBuZXcgdG9rZW4gZnJvbSB0aGUgQVBJIGFuZCBzdG9yZXMgaXQgaW4gdGhpcy50b2tlbi5cbiAgICogQHBhcmFtIHtJTG9naW5DcmVkZW50aWFsc30gY3JlZGVudGlhbHMgICBVc2VyIGxvZ2luIGNyZWRlbnRpYWxzXG4gICAqIEBwYXJhbSB7SUxvZ2luT3B0aW9ucz99IG9wdGlvbnMgICAgICAgICAgQWRkaXRpb25hbCBvcHRpb25zIHJlZ2FyZGluZyBwZXJzaXN0YW5jZSBhbmQgY28uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8SUxvZ2luUmVzcG9uc2U+fVxuICAgKi9cbiAgcHVibGljIGxvZ2luKGNyZWRlbnRpYWxzOiBJTG9naW5DcmVkZW50aWFscywgb3B0aW9ucz86IElMb2dpbk9wdGlvbnMpOiBQcm9taXNlPElMb2dpblJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGNyZWRlbnRpYWxzKSwgXCJtYWxmb3JtZWQgY3JlZGVudGlhbHNcIik7XG4gICAgaW52YXJpYW50KFxuICAgICAgaXNTdHJpbmcoY3JlZGVudGlhbHMuZW1haWwpICYmIGlzU3RyaW5nKGNyZWRlbnRpYWxzLnBhc3N3b3JkKSxcbiAgICAgIFwiZW1haWwgJiBwYXNzd29yZCBhcmUgcmVxdWlyZWQgaW4gY3JlZGVudGlhbHNcIlxuICAgICk7XG5cbiAgICB0aGlzLmNvbmZpZy50b2tlbiA9IG51bGw7XG5cbiAgICBpZiAoaXNTdHJpbmcoY3JlZGVudGlhbHMudXJsKSkge1xuICAgICAgdGhpcy5jb25maWcudXJsID0gY3JlZGVudGlhbHMudXJsO1xuICAgIH1cblxuICAgIGlmIChpc1N0cmluZyhjcmVkZW50aWFscy5wcm9qZWN0KSkge1xuICAgICAgdGhpcy5jb25maWcucHJvamVjdCA9IGNyZWRlbnRpYWxzLnByb2plY3Q7XG4gICAgfVxuXG4gICAgaWYgKGNyZWRlbnRpYWxzLnBlcnNpc3QgfHwgKG9wdGlvbnMgJiYgb3B0aW9ucy5wZXJzaXN0KSB8fCB0aGlzLmNvbmZpZy5wZXJzaXN0KSB7XG4gICAgICAvLyB1c2UgaW50ZXJ2YWwgZm9yIGxvZ2luIHJlZnJlc2ggd2hlbiBvcHRpb24gcGVyc2lzdCBlbmFibGVkXG4gICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5pbmplY3RcbiAgICAgICAgLnBvc3QoXCIvYXV0aC9hdXRoZW50aWNhdGVcIiwge1xuICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogY3JlZGVudGlhbHMucGFzc3dvcmQsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXM6IElBdXRoZW50aWNhdGVSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIC8vIHNhdmUgbmV3IHRva2VuIGluIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICByZXR1cm4gKHRoaXMuY29uZmlnLnRva2VuID0gcmVzLmRhdGEudG9rZW4pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIGV4cGlyeSBkYXRlIGlzIHRoZSBtb21lbnQgd2UgZ290IHRoZSB0b2tlbiArIDUgbWludXRlc1xuICAgICAgICAgIHRoaXMuY29uZmlnLmxvY2FsRXhwID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIHRoaXMuY29uZmlnLnRva2VuRXhwaXJhdGlvblRpbWUpLmdldFRpbWUoKTtcblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgbG9jYWxFeHA6IHRoaXMuY29uZmlnLmxvY2FsRXhwLFxuICAgICAgICAgICAgcHJvamVjdDogdGhpcy5jb25maWcucHJvamVjdCxcbiAgICAgICAgICAgIHRva2VuLFxuICAgICAgICAgICAgdXJsOiB0aGlzLmNvbmZpZy51cmwsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZ3MgdGhlIHVzZXIgb3V0IGJ5IFwiZm9yZ2V0dGluZ1wiIHRoZSB0b2tlbiwgYW5kIGNsZWFyaW5nIHRoZSByZWZyZXNoIGludGVydmFsXG4gICAqL1xuICBwdWJsaWMgbG9nb3V0KCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnLnJlc2V0KCk7XG5cbiAgICBpZiAodGhpcy5yZWZyZXNoSW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XG4gICAgfVxuICB9XG5cbiAgLy8vIFJFRlJFU0ggTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggdGhlIHRva2VuIGlmIGl0IGlzIGFib3V0IHRvIGV4cGlyZSAod2l0aGluIDMwIHNlY29uZHMgb2YgZXhwaXJ5IGRhdGUpLlxuICAgKiAtIENhbGxzIG9uQXV0b1JlZnJlc2hTdWNjZXNzIHdpdGggdGhlIG5ldyB0b2tlbiBpZiB0aGUgcmVmcmVzaGluZyBpcyBzdWNjZXNzZnVsLlxuICAgKiAtIENhbGxzIG9uQXV0b1JlZnJlc2hFcnJvciBpZiByZWZyZXNoaW5nIHRoZSB0b2tlbiBmYWlscyBmb3Igc29tZSByZWFzb24uXG4gICAqIEByZXR1cm4ge1JlZnJlc2hJZk5lZWRlZFJlc3BvbnNlfVxuICAgKi9cbiAgcHVibGljIHJlZnJlc2hJZk5lZWRlZCgpOiBQcm9taXNlPFJlZnJlc2hJZk5lZWRlZFJlc3BvbnNlPiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0UGF5bG9hZDx7IGV4cDogYW55IH0+KCk7XG4gICAgY29uc3QgeyB0b2tlbiwgdXJsLCBwcm9qZWN0LCBsb2NhbEV4cCB9ID0gdGhpcy5jb25maWc7XG5cbiAgICBpZiAoIWlzU3RyaW5nKHRva2VuKSB8fCAhaXNTdHJpbmcodXJsKSB8fCAhaXNTdHJpbmcocHJvamVjdCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXBheWxvYWQgfHwgIXBheWxvYWQuZXhwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGltZURpZmYgPSAobG9jYWxFeHAgfHwgMCkgLSBEYXRlLm5vdygpO1xuXG4gICAgaWYgKHRpbWVEaWZmIDw9IDApIHtcbiAgICAgIC8vIHRva2VuIGhhcyBleHBpcmVkLCBza2lwcGluZyBhdXRvIHJlZnJlc2hcbiAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMub25BdXRvUmVmcmVzaEVycm9yKSkge1xuICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcih7XG4gICAgICAgICAgY29kZTogMTAyLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiYXV0aF9leHBpcmVkX3Rva2VuXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aW1lRGlmZiA8IDMwMDAwKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8UmVmcmVzaElmTmVlZGVkUmVzcG9uc2U+KChyZXNvbHZlOiAocmVzOiBSZWZyZXNoSWZOZWVkZWRSZXNwb25zZSkgPT4gYW55KSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaCh0b2tlbilcbiAgICAgICAgICAudGhlbigocmVzOiBJUmVmcmVzaFRva2VuUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmxvY2FsRXhwID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIHRoaXMuY29uZmlnLnRva2VuRXhwaXJhdGlvblRpbWUpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRva2VuID0gcmVzLmRhdGEudG9rZW4gfHwgdG9rZW47XG5cbiAgICAgICAgICAgIC8vIGlmIGF1dG9yZWZyZXNoIHN1Y2NlZWRlZFxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoU3VjY2VzcykpIHtcbiAgICAgICAgICAgICAgdGhpcy5vbkF1dG9SZWZyZXNoU3VjY2Vzcyh0aGlzLmNvbmZpZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUoW3RydWVdKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcikpIHtcbiAgICAgICAgICAgICAgdGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKFt0cnVlLCBlcnJvcl0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZShbZmFsc2VdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBwYXNzZWQgdG9rZW4gdG8gcmVxdWVzdCBhIG5ldyBvbmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b2tlblxuICAgKi9cbiAgcHVibGljIHJlZnJlc2godG9rZW46IHN0cmluZyk6IFByb21pc2U8SVJlZnJlc2hUb2tlblJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKHRva2VuKSwgXCJ0b2tlbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0LnBvc3Q8SVJlZnJlc2hUb2tlblJlc3BvbnNlPihcIi9hdXRoL3JlZnJlc2hcIiwgeyB0b2tlbiB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYW4gaW50ZXJ2YWwgb2YgMTAgc2Vjb25kcyB0aGF0IHdpbGwgY2hlY2sgaWYgdGhlIHRva2VuIG5lZWRzIHJlZnJlc2hpbmdcbiAgICogQHBhcmFtIHtib29sZWFuP30gZmlyZUltbWVkaWF0ZWx5ICAgIElmIGl0IHNob3VsZCBpbW1lZGlhdGVseSBjYWxsIFtyZWZyZXNoSWZOZWVkZWRdXG4gICAqL1xuICBwcml2YXRlIHN0YXJ0SW50ZXJ2YWwoZmlyZUltbWVkaWF0ZWx5PzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgIHRoaXMucmVmcmVzaElmTmVlZGVkKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWZyZXNoSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnJlZnJlc2hJZk5lZWRlZC5iaW5kKHRoaXMpLCAxMDAwMCkgYXMgYW55O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbmQgbnVsbGlmaWVzIHRoZSB0b2tlbiByZWZyZXNoaW5nIGludGVydmFsXG4gICAqL1xuICBwcml2YXRlIHN0b3BJbnRlcnZhbCgpOiB2b2lkIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMucmVmcmVzaEludGVydmFsKTtcbiAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcGF5bG9hZCBvZiB0aGUgY3VycmVudCB0b2tlbiwgcmV0dXJuIHR5cGUgY2FuIGJlIGdlbmVyaWNcbiAgICogQHR5cGVwYXJhbSBUICAgICBUaGUgcGF5bG9hZCByZXNwb25zZSB0eXBlLCBhcmJpdHJhcnkgb2JqZWN0XG4gICAqIEByZXR1cm4ge1R9XG4gICAqL1xuICBwcml2YXRlIGdldFBheWxvYWQ8VCBleHRlbmRzIG9iamVjdCA9IG9iamVjdD4oKTogVCB7XG4gICAgaWYgKCFpc1N0cmluZyh0aGlzLmNvbmZpZy50b2tlbikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRQYXlsb2FkPFQ+KHRoaXMuY29uZmlnLnRva2VuKTtcbiAgfVxufVxuIiwiLy8gdHNsaW50OmRpc2FibGU6IG9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xuaW1wb3J0IHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXF1ZXN0Q29uZmlnLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSBcImF4aW9zXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmN1cnJlbmN5UXVldWVJdGVtIHtcbiAgcmVxdWVzdDogQXhpb3NSZXF1ZXN0Q29uZmlnO1xuICByZXNvbHZlcjogKHF1ZXVlZFJlcXVlc3Q6IEF4aW9zUmVxdWVzdENvbmZpZykgPT4gYW55O1xufVxuXG4vKipcbiAqIEhhbmRsaW5nIGFuZCBsaW1pdGluZyBjb25jdXJyZW50IHJlcXVlc3RzIGZvciB0aGUgQVBJLlxuICogQHBhcmFtIHtBeGlvc0luc3RhbmNlfSBheGlvcyAgIFJlZmVyZW5jZSB0byB0aGUgY2FsbGVyIGluc3RhbmNlXG4gKiBAcGFyYW0ge251bWJlcj0xMH0gbGltaXQgICAgICAgV2hlbiB0byByZWF0ZS1saW1pdCBvdXRnb2luZyByZXF1ZXN0c1xuICovXG5leHBvcnQgY29uc3QgY29uY3VycmVuY3lNYW5hZ2VyID0gKGF4aW9zOiBBeGlvc0luc3RhbmNlLCBsaW1pdDogbnVtYmVyID0gMTApID0+IHtcbiAgaWYgKGxpbWl0IDwgMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvbmN1cnJlbmN5TWFuYWdlciBFcnJvcjogbWluaW11biBjb25jdXJyZW50IHJlcXVlc3RzIGlzIDFcIik7XG4gIH1cblxuICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICBsaW1pdCxcbiAgICBxdWV1ZTogW10gYXMgSUNvbmN1cnJlbmN5UXVldWVJdGVtW10sXG4gICAgcnVubmluZzogW10gYXMgSUNvbmN1cnJlbmN5UXVldWVJdGVtW10sXG4gICAgaW50ZXJjZXB0b3JzOiB7XG4gICAgICByZXF1ZXN0OiBudWxsLFxuICAgICAgcmVzcG9uc2U6IG51bGwsXG4gICAgfSxcbiAgICBwdXNoKHJlcUhhbmRsZXI6IElDb25jdXJyZW5jeVF1ZXVlSXRlbSkge1xuICAgICAgaW5zdGFuY2UucXVldWUucHVzaChyZXFIYW5kbGVyKTtcbiAgICAgIGluc3RhbmNlLnNoaWZ0SW5pdGlhbCgpO1xuICAgIH0sXG4gICAgc2hpZnRJbml0aWFsKCk6IHZvaWQge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5ydW5uaW5nLmxlbmd0aCA8IGluc3RhbmNlLmxpbWl0KSB7XG4gICAgICAgICAgaW5zdGFuY2Uuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfSxcbiAgICBzaGlmdCgpOiB2b2lkIHtcbiAgICAgIGlmIChpbnN0YW5jZS5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgcXVldWVkID0gaW5zdGFuY2UucXVldWUuc2hpZnQoKTtcblxuICAgICAgICBxdWV1ZWQucmVzb2x2ZXIocXVldWVkLnJlcXVlc3QpO1xuICAgICAgICBpbnN0YW5jZS5ydW5uaW5nLnB1c2gocXVldWVkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIHVzZSBhcyBpbnRlcmNlcHRvci4gUXVldWUgb3V0Z29pbmcgcmVxdWVzdHNcbiAgICByZXF1ZXN0SGFuZGxlcihyZXE6IEF4aW9zUmVxdWVzdENvbmZpZyk6IFByb21pc2U8QXhpb3NSZXF1ZXN0Q29uZmlnPiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGluc3RhbmNlLnB1c2goe1xuICAgICAgICAgIHJlcXVlc3Q6IHJlcSxcbiAgICAgICAgICByZXNvbHZlcjogcmVzb2x2ZSxcbiAgICAgICAgfSBhcyBJQ29uY3VycmVuY3lRdWV1ZUl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICAvLyB1c2UgYXMgaW50ZXJjZXB0b3IuIEV4ZWN1dGUgcXVldWVkIHJlcXVlc3QgdXBvbiByZWNlaXZpbmcgYSByZXNwb25zZVxuICAgIHJlc3BvbnNlSGFuZGxlcihyZXM6IEF4aW9zUmVzcG9uc2U8YW55Pik6IEF4aW9zUmVzcG9uc2U8YW55PiB7XG4gICAgICBpbnN0YW5jZS5ydW5uaW5nLnNoaWZ0KCk7XG4gICAgICBpbnN0YW5jZS5zaGlmdCgpO1xuXG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0sXG4gICAgZGV0YWNoKCk6IHZvaWQge1xuICAgICAgYXhpb3MuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZWplY3QoaW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlcXVlc3QpO1xuICAgICAgYXhpb3MuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmVqZWN0KGluc3RhbmNlLmludGVyY2VwdG9ycy5yZXNwb25zZSk7XG4gICAgfSxcbiAgICBhdHRhY2gobGltaXRDb25jdXJyZW50UmVxdWVzdHNUbz86IG51bWJlcik6IHZvaWQge1xuICAgICAgaWYgKGxpbWl0Q29uY3VycmVudFJlcXVlc3RzVG8pIHtcbiAgICAgICAgaW5zdGFuY2UubGltaXQgPSBsaW1pdENvbmN1cnJlbnRSZXF1ZXN0c1RvO1xuICAgICAgfVxuXG4gICAgICAvLyBxdWV1ZSBjb25jdXJyZW50IHJlcXVlc3RzXG4gICAgICBpbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVxdWVzdCA9IGF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShpbnN0YW5jZS5yZXF1ZXN0SGFuZGxlcik7XG4gICAgICBpbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVzcG9uc2UgPSBheGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKFxuICAgICAgICBpbnN0YW5jZS5yZXNwb25zZUhhbmRsZXIsXG4gICAgICAgIGluc3RhbmNlLnJlc3BvbnNlSGFuZGxlclxuICAgICAgKTtcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn07XG4iLCJpbXBvcnQgeyBpbnZhcmlhbnQgfSBmcm9tIFwiLi91dGlscy9pbnZhcmlhbnRcIjtcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSBcIi4vdXRpbHMvaXNcIjtcblxuY29uc3QgU1RPUkFHRV9LRVkgPSBcImRpcmVjdHVzLXNkay1qc1wiO1xuXG4vLyBkZWZpbmluZyBuZWVkZWQgbWV0aG9kcyBmb3IgdGhlIGFic3RyYWN0IHN0b3JhZ2UgYWRhcHRlclxuZXhwb3J0IGludGVyZmFjZSBJU3RvcmFnZUFQSSB7XG4gIGdldEl0ZW08VCBleHRlbmRzIGFueSA9IGFueT4oa2V5OiBzdHJpbmcpOiBUO1xuICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcbiAgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQ7XG59XG5cbi8vIGNvbmZpZ3VyYXRpb24gbWVyZ2VkIHdpdGggZGVmYXVsdHNcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb25WYWx1ZXMge1xuICB1cmw6IHN0cmluZztcbiAgcHJvamVjdDogc3RyaW5nO1xuICB0b2tlbj86IHN0cmluZztcbiAgbG9jYWxFeHA/OiBudW1iZXI7XG4gIHRva2VuRXhwaXJhdGlvblRpbWU/OiBudW1iZXI7XG4gIHBlcnNpc3Q6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb24ge1xuICB0b2tlbjogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgcHJvamVjdDogc3RyaW5nO1xuICBsb2NhbEV4cD86IG51bWJlcjtcbiAgdG9rZW5FeHBpcmF0aW9uVGltZTogbnVtYmVyO1xuICBwZXJzaXN0OiBib29sZWFuO1xuICBkZWh5ZHJhdGUoKTogSUNvbmZpZ3VyYXRpb25WYWx1ZXM7XG4gIGRlbGV0ZUh5ZHJhdGVkQ29uZmlnKCk7XG4gIGh5ZHJhdGUoY29uZmlnOiBJQ29uZmlndXJhdGlvblZhbHVlcyk7XG4gIHBhcnRpYWxVcGRhdGUoY29uZmlnOiBQYXJ0aWFsPElDb25maWd1cmF0aW9uVmFsdWVzPik6IHZvaWQ7XG4gIHJlc2V0KCk6IHZvaWQ7XG4gIHVwZGF0ZShjb25maWc6IElDb25maWd1cmF0aW9uVmFsdWVzKTtcbn1cblxuLy8gZGVmYXVsdCBzZXR0aW5nc1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvbkRlZmF1bHRzIHtcbiAgdG9rZW5FeHBpcmF0aW9uVGltZTogbnVtYmVyO1xuICBwcm9qZWN0OiBzdHJpbmc7XG59XG5cbi8vIGNvbnN0cnVjdG9yIG9wdGlvbnNcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb25PcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBVUkwgb2YgdGhlIGRpcmVjdXRzIENNU1xuICAgKi9cbiAgdXJsOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgdG9rZW4gdG8gYXV0aGVudGljYXRlIGlmIHByZWZlcnJlZFxuICAgKi9cbiAgdG9rZW4/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBQcm9qZWN0IG5hbWVzcGFjZVxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcbiAgLyoqXG4gICAqIERlZmF1bHQgbG9naW4gZXhwaXJhdGlvbiBhcyBudW1iZXIgaW4gbXNcbiAgICovXG4gIGxvY2FsRXhwPzogbnVtYmVyO1xuICAvKipcbiAgICogSWYgdGhlIHRva2VuIHNob3VsZCBiZSBwZXJzaXRhdGVkIG9yIHJlaHlkcmF0ZWRcbiAgICovXG4gIHBlcnNpc3Q/OiBib29sZWFuO1xuICAvKipcbiAgICogQXV0byB0b2tlbiBleHBpcmF0aW9uIHRpbWVcbiAgICovXG4gIHRva2VuRXhwaXJhdGlvblRpbWU/OiBudW1iZXI7XG59XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBob2xkZXIgZm9yIGRpcmVjdHVzIGltcGxlbWVudGF0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbiBpbXBsZW1lbnRzIElDb25maWd1cmF0aW9uIHtcbiAgLyoqXG4gICAqIERlZmF1bHRzIGZvciBhbGwgZGlyZWN0dXMgc2RrIGluc3RhbmNlcywgY2FuIGJlIG1vZGlmaWVkIGlmIHByZWZlcnJlZFxuICAgKiBAdHlwZSB7SUNvbmZpZ3VyYXRpb25EZWZhdWx0c31cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZGVmYXVsdHM6IElDb25maWd1cmF0aW9uRGVmYXVsdHMgPSB7XG4gICAgcHJvamVjdDogXCJfXCIsXG4gICAgdG9rZW5FeHBpcmF0aW9uVGltZTogNSAqIDYgKiAxMDAwLFxuICB9O1xuXG4gIC8qKlxuICAgKiBTYXZlcyB0aGUgaW50ZXJuYWwgY29uZmlndXJhdGlvbiB2YWx1ZXMsICoqRE8gTk9UIG1vZGlmeSoqIGZyb20gdGhlIG91dHNpZGVcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIGludGVybmFsQ29uZmlndXJhdGlvbjogSUNvbmZpZ3VyYXRpb25WYWx1ZXM7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29uZmlndXJhdGlvbiBpbnN0YW5jZSwgd2lsbCBiZSB1c2VkIG9uY2UgZm9yIGVhY2ggZGlyZWN0dXMgaW5zdGFuY2UgKHBhc3NpbmcgcmVmcykuXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0lDb25maWd1cmF0aW9uT3B0aW9uc30gaW5pdGlhbENvbmZpZyAgIEluaXRpYWwgY29uZmlndXJhdGlvbiB2YWx1ZXNcbiAgICogQHBhcmFtIHtJU3RvcmFnZUFQST99IHN0b3JhZ2UgICAgICAgICAgICAgICAgICBTdG9yYWdlIGFkYXB0ZXIgZm9yIHBlcnNpc3RlbmNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihpbml0aWFsQ29uZmlnOiBJQ29uZmlndXJhdGlvbk9wdGlvbnMgPSB7fSBhcyBhbnksIHByaXZhdGUgc3RvcmFnZT86IElTdG9yYWdlQVBJKSB7XG4gICAgbGV0IGRlaHlkcmF0ZWRDb25maWc6IElDb25maWd1cmF0aW9uVmFsdWVzID0ge30gYXMgSUNvbmZpZ3VyYXRpb25WYWx1ZXM7XG5cbiAgICBpZiAoc3RvcmFnZSAmJiBCb29sZWFuKGluaXRpYWxDb25maWcgJiYgaW5pdGlhbENvbmZpZy5wZXJzaXN0KSkge1xuICAgICAgLy8gZGVoeWRyYXRlIGlmIHN0b3JhZ2Ugd2FzIHByb3ZpZGVkIGFuZCBwZXJzaXN0IGZsYWcgaXMgc2V0XG4gICAgICBkZWh5ZHJhdGVkQ29uZmlnID0gdGhpcy5kZWh5ZHJhdGVkSW5pdGlhbENvbmZpZ3VyYXRpb24oc3RvcmFnZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGVyc2lzdCA9IEJvb2xlYW4oZGVoeWRyYXRlZENvbmZpZy5wZXJzaXN0IHx8IGluaXRpYWxDb25maWcucGVyc2lzdCk7XG4gICAgY29uc3QgcHJvamVjdCA9IGRlaHlkcmF0ZWRDb25maWcucHJvamVjdCB8fCBpbml0aWFsQ29uZmlnLnByb2plY3QgfHwgQ29uZmlndXJhdGlvbi5kZWZhdWx0cy5wcm9qZWN0O1xuICAgIGNvbnN0IHRva2VuRXhwaXJhdGlvblRpbWUgPVxuICAgICAgZGVoeWRyYXRlZENvbmZpZy50b2tlbkV4cGlyYXRpb25UaW1lIHx8XG4gICAgICBpbml0aWFsQ29uZmlnLnRva2VuRXhwaXJhdGlvblRpbWUgfHxcbiAgICAgIENvbmZpZ3VyYXRpb24uZGVmYXVsdHMudG9rZW5FeHBpcmF0aW9uVGltZTtcblxuICAgIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uID0ge1xuICAgICAgLi4uaW5pdGlhbENvbmZpZyxcbiAgICAgIC4uLmRlaHlkcmF0ZWRDb25maWcsXG4gICAgICBwZXJzaXN0LFxuICAgICAgcHJvamVjdCxcbiAgICAgIHRva2VuRXhwaXJhdGlvblRpbWUsXG4gICAgfTtcbiAgfVxuXG4gIC8vIEFDQ0VTU09SUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHB1YmxpYyBnZXQgdG9rZW4oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24udG9rZW47XG4gIH1cblxuICBwdWJsaWMgc2V0IHRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhcnRpYWxVcGRhdGUoeyB0b2tlbiB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdG9rZW5FeHBpcmF0aW9uVGltZSgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi50b2tlbkV4cGlyYXRpb25UaW1lO1xuICB9XG5cbiAgcHVibGljIHNldCB0b2tlbkV4cGlyYXRpb25UaW1lKHRva2VuRXhwaXJhdGlvblRpbWU6IG51bWJlcikge1xuICAgIC8vIFRPRE86IE9wdGlvbmFsbHkgcmUtY29tcHV0ZSB0aGUgbG9jYWxFeHAgcHJvcGVydHkgZm9yIHRoZSBhdXRvLXJlZnJlc2hcbiAgICB0aGlzLnBhcnRpYWxVcGRhdGUoe1xuICAgICAgdG9rZW5FeHBpcmF0aW9uVGltZTogdG9rZW5FeHBpcmF0aW9uVGltZSAqIDYwMDAwLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24udXJsO1xuICB9XG5cbiAgcHVibGljIHNldCB1cmwodXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhcnRpYWxVcGRhdGUoeyB1cmwgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByb2plY3QoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24ucHJvamVjdDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcHJvamVjdChwcm9qZWN0OiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhcnRpYWxVcGRhdGUoe1xuICAgICAgcHJvamVjdDogcHJvamVjdCB8fCBcIl9cIixcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbG9jYWxFeHAoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24ubG9jYWxFeHA7XG4gIH1cblxuICBwdWJsaWMgc2V0IGxvY2FsRXhwKGxvY2FsRXhwOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnBhcnRpYWxVcGRhdGUoeyBsb2NhbEV4cCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGVyc2lzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24ucGVyc2lzdDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcGVyc2lzdChwZXJzaXN0OiBib29sZWFuKSB7XG4gICAgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24ucGVyc2lzdCA9IHBlcnNpc3Q7XG4gIH1cblxuICAvLyBIRUxQRVIgTUVUSE9EUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIGlmIHRoZSBjb25maWd1cmF0aW9uIGlzIHZhbGlkXG4gICAqIEB0aHJvd3Mge0Vycm9yfVxuICAgKi9cbiAgcHVibGljIHZhbGlkYXRlKCkge1xuICAgIGludmFyaWFudChpc1N0cmluZyh0aGlzLnVybCksIFwiY29uZmlndXJhdGlvbiAtIHVybCBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKHRoaXMucHJvamVjdCksIFwiY29uZmlndXJhdGlvbiAtIHByb2plY3QgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc1N0cmluZyh0aGlzLnRva2VuKSwgXCJjb25maWd1cmF0aW9uIC0gcHJvamVjdCBtdXN0IGJlIGRlZmluZWRcIik7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlcywgd2lsbCBhbHNvIGh5ZHJhdGUgdGhlbSBpZiBwZXJzaXN0YW5jZSBhY3RpdmF0ZWRcbiAgICogQHBhcmFtIHtJQ29uZmlndXJhdGlvblZhbHVlc30gY29uZmlnXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGNvbmZpZzogSUNvbmZpZ3VyYXRpb25WYWx1ZXMpOiB2b2lkIHtcbiAgICB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbiA9IGNvbmZpZztcblxuICAgIHRoaXMuaHlkcmF0ZShjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBwYXJ0aWFscyBvZiB0aGUgY29uZmlndXJhdGlvbiwgYmVoYXZlcyBsaWtlIHRoZSBbdXBkYXRlXSBtZXRob2RcbiAgICogQHBhcmFtIHtQYXJ0aWFsPElDb25maWd1cmF0aW9uVmFsdWVzPn0gY29uZmlnXG4gICAqL1xuICBwdWJsaWMgcGFydGlhbFVwZGF0ZShjb25maWc6IFBhcnRpYWw8SUNvbmZpZ3VyYXRpb25WYWx1ZXM+KTogdm9pZCB7XG4gICAgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAuLi50aGlzLmludGVybmFsQ29uZmlndXJhdGlvbixcbiAgICAgIC4uLmNvbmZpZyxcbiAgICB9O1xuXG4gICAgdGhpcy5oeWRyYXRlKHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgd2hvbGUgY29uZml1Z3JhdGlvbiBhbmQgcmVtb3ZlIGh5ZHJhdGVkIHZhbHVlcyBmcm9tIHN0b3JhZ2UgYXMgd2VsbFxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi50b2tlbjtcbiAgICBkZWxldGUgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24udXJsO1xuICAgIGRlbGV0ZSB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi5sb2NhbEV4cDtcblxuICAgIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnByb2plY3QgPSBcIl9cIjtcblxuICAgIHRoaXMuZGVsZXRlSHlkcmF0ZWRDb25maWcoKTtcbiAgfVxuXG4gIC8vIFNUT1JBR0UgTUVUSE9EUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHB1YmxpYyBkZWh5ZHJhdGUoKTogSUNvbmZpZ3VyYXRpb25WYWx1ZXMgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5zdG9yYWdlIHx8ICF0aGlzLnBlcnNpc3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuYXRpdmVWYWx1ZSA9IHRoaXMuc3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZKTtcblxuICAgIGlmICghbmF0aXZlVmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJzZWRDb25maWcgPSBKU09OLnBhcnNlKG5hdGl2ZVZhbHVlKTtcbiAgICB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbiA9IHBhcnNlZENvbmZpZztcblxuICAgIHJldHVybiBwYXJzZWRDb25maWc7XG4gIH1cblxuICBwdWJsaWMgaHlkcmF0ZShwcm9wczogSUNvbmZpZ3VyYXRpb25WYWx1ZXMpIHtcbiAgICBpZiAoIXRoaXMuc3RvcmFnZSB8fCAhdGhpcy5wZXJzaXN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHByb3BzKSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlSHlkcmF0ZWRDb25maWcoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0b3JhZ2UgfHwgIXRoaXMucGVyc2lzdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfS0VZKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVoeWRyYXRlZEluaXRpYWxDb25maWd1cmF0aW9uKHN0b3JhZ2U6IElTdG9yYWdlQVBJKTogSUNvbmZpZ3VyYXRpb25WYWx1ZXMge1xuICAgIGlmICghc3RvcmFnZSkge1xuICAgICAgcmV0dXJuIHt9IGFzIElDb25maWd1cmF0aW9uVmFsdWVzO1xuICAgIH1cblxuICAgIGNvbnN0IG5hdGl2ZVZhbHVlID0gc3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZKTtcblxuICAgIGlmICghbmF0aXZlVmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UobmF0aXZlVmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHt9IGFzIElDb25maWd1cmF0aW9uVmFsdWVzO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gR2VuZXJhbCBzY2hlbWUgdHlwZXMgdHlwZXNcbmltcG9ydCB7IElMb2dpbkNyZWRlbnRpYWxzLCBJTG9naW5PcHRpb25zIH0gZnJvbSBcIi4vc2NoZW1lcy9hdXRoL0xvZ2luXCI7XG5pbXBvcnQgeyBCb2R5VHlwZSB9IGZyb20gXCIuL3NjaGVtZXMvaHR0cC9Cb2R5XCI7XG5pbXBvcnQgeyBRdWVyeVBhcmFtcyBhcyBRdWVyeVBhcmFtc1R5cGUgfSBmcm9tIFwiLi9zY2hlbWVzL2h0dHAvUXVlcnlcIjtcblxuLy8gRGlyZWN0dXMgc2NoZW1lIHR5cGVzXG5pbXBvcnQgeyBJRmllbGQgfSBmcm9tIFwiLi9zY2hlbWVzL2RpcmVjdHVzL0ZpZWxkXCI7XG5pbXBvcnQgeyBJUmVsYXRpb24gfSBmcm9tIFwiLi9zY2hlbWVzL2RpcmVjdHVzL1JlbGF0aW9uXCI7XG5pbXBvcnQgeyBJUm9sZSB9IGZyb20gXCIuL3NjaGVtZXMvZGlyZWN0dXMvUm9sZVwiO1xuaW1wb3J0IHsgSUNvbGxlY3Rpb24gfSBmcm9tIFwiLi9zY2hlbWVzL2RpcmVjdHVzL0NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IElDb2xsZWN0aW9uUHJlc2V0IH0gZnJvbSBcIi4vc2NoZW1lcy9kaXJlY3R1cy9Db2xsZWN0aW9uUHJlc2V0XCI7XG5pbXBvcnQgeyBJUGVybWlzc2lvbiB9IGZyb20gXCIuL3NjaGVtZXMvZGlyZWN0dXMvUGVybWlzc2lvblwiO1xuaW1wb3J0IHsgSVVzZXIgfSBmcm9tIFwiLi9zY2hlbWVzL2RpcmVjdHVzL1VzZXJcIjtcblxuLy8gUmVxdWVzdCBzY2hlbWVzXG5pbXBvcnQgeyBJVXBkYXRlQ29sbGVjdGlvblByZXNldEJvZHkgfSBmcm9tIFwiLi9zY2hlbWVzL3JlcXVlc3QvQ29sbGVjdGlvblwiO1xuXG4vLyBSZXNwb25zZSBzY2hlbWVzXG5pbXBvcnQgeyBJUmVsYXRpb25zUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1JlbGF0aW9uXCI7XG5pbXBvcnQgeyBJQWN0aXZpdHlSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvQWN0aXZpdHlcIjtcbmltcG9ydCB7IElDb2xsZWN0aW9uUmVzcG9uc2UsIElDb2xsZWN0aW9uc1Jlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Db2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJQ29sbGVjdGlvblByZXNldFJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Db2xsZWN0aW9uUHJlc2V0XCI7XG5pbXBvcnQgeyBJRXJyb3JSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvRXJyb3JcIjtcbmltcG9ydCB7IElGaWVsZFJlc3BvbnNlLCBJRmllbGRzUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0ZpZWxkXCI7XG5pbXBvcnQgeyBJRmlsZVJlc3BvbnNlLCBJRmlsZXNSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvRmlsZVwiO1xuaW1wb3J0IHsgSUl0ZW1SZXNwb25zZSwgSUl0ZW1zUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0l0ZW1cIjtcbmltcG9ydCB7IElMb2dpblJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Mb2dpblwiO1xuaW1wb3J0IHsgSVJlbGF0aW9uUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1JlbGF0aW9uXCI7XG5pbXBvcnQgeyBJUmV2aXNpb25SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvUmV2aXNpb25cIjtcbmltcG9ydCB7IElSb2xlUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1JvbGVcIjtcbmltcG9ydCB7IElSZWZyZXNoVG9rZW5SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvVG9rZW5cIjtcbmltcG9ydCB7IElVc2VyUmVzcG9uc2UsIElVc2Vyc1Jlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Vc2VyXCI7XG5cbi8vIFV0aWxpdGllc1xuaW1wb3J0IHsgZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoIH0gZnJvbSBcIi4vdXRpbHMvY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgZ2V0UGF5bG9hZCB9IGZyb20gXCIuL3V0aWxzL3BheWxvYWRcIjtcblxuLy8gTWFuYWdlciBjbGFzc2VzXG5pbXBvcnQgeyBBUEksIElBUEkgfSBmcm9tIFwiLi9BUElcIjtcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIElDb25maWd1cmF0aW9uLCBJQ29uZmlndXJhdGlvbk9wdGlvbnMgfSBmcm9tIFwiLi9Db25maWd1cmF0aW9uXCI7XG5cbmltcG9ydCB7IElTZXJ2ZXJJbmZvcm1hdGlvblJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9TZXJ2ZXJJbmZvcm1hdGlvblwiO1xuaW1wb3J0IHsgSVNldHRpbmdzUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1NldHRpbmdcIjtcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQgeyBpbnZhcmlhbnQgfSBmcm9tIFwiLi91dGlscy9pbnZhcmlhbnRcIjtcbmltcG9ydCB7IGlzQXJyYXksIGlzTm90TnVsbCwgaXNOdW1iZXIsIGlzT2JqZWN0LCBpc09iamVjdE9yRW1wdHksIGlzU3RyaW5nIH0gZnJvbSBcIi4vdXRpbHMvaXNcIjtcblxudHlwZSBQcmltYXJ5S2V5VHlwZSA9IHN0cmluZyB8IG51bWJlcjtcblxuLyoqXG4gKiBNYWluIFNESyBpbXBsZW1lbnRhdGlvbiBwcm92aWRlcyB0aGUgcHVibGljIEFQSSB0byBpbnRlcmFjdCB3aXRoIGFcbiAqIHJlbW90ZSBkaXJlY3R1cyBpbnN0YW5jZS5cbiAqIEB1c2VzIEFQSVxuICogQHVzZXMgQ29uZmlndXJhdGlvblxuICovXG5leHBvcnQgY2xhc3MgU0RLIHtcbiAgcHVibGljIGdldCBsb2dnZWRJbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hcGkuYXV0aC5pc0xvZ2dlZEluKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBheWxvYWQoKTogYW55IHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLnRva2VuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0UGF5bG9hZCgpO1xuICB9XG5cbiAgLy8gY29udmVuaWVuY2UgbWV0aG9kXG4gIHB1YmxpYyBzdGF0aWMgZ2V0UGF5bG9hZCA9IGdldFBheWxvYWQ7XG5cbiAgLy8gYXBpIGNvbm5lY3Rpb24gYW5kIHNldHRpbmdzXG4gIHB1YmxpYyBjb25maWc6IElDb25maWd1cmF0aW9uO1xuICBwdWJsaWMgYXBpOiBJQVBJO1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSB3aXRoIGFuIEFQSVxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJQ29uZmlndXJhdGlvbk9wdGlvbnMpIHtcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWd1cmF0aW9uKG9wdGlvbnMpO1xuICAgIHRoaXMuYXBpID0gbmV3IEFQSSh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICAvLyAjcmVnaW9uIGF1dGhlbnRpY2F0aW9uXG5cbiAgLyoqXG4gICAqIExvZ2luIHRvIHRoZSBBUEk7IEdldHMgYSBuZXcgdG9rZW4gZnJvbSB0aGUgQVBJIGFuZCBzdG9yZXMgaXQgaW4gdGhpcy5hcGkudG9rZW4uXG4gICAqL1xuICBwdWJsaWMgbG9naW4oY3JlZGVudGlhbHM6IElMb2dpbkNyZWRlbnRpYWxzLCBvcHRpb25zPzogSUxvZ2luT3B0aW9ucyk6IFByb21pc2U8SUxvZ2luUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkuYXV0aC5sb2dpbihjcmVkZW50aWFscywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogTG9ncyB0aGUgdXNlciBvdXQgYnkgXCJmb3JnZXR0aW5nXCIgdGhlIHRva2VuLCBhbmQgY2xlYXJpbmcgdGhlIHJlZnJlc2ggaW50ZXJ2YWxcbiAgICovXG4gIHB1YmxpYyBsb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5hcGkuYXV0aC5sb2dvdXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGNsaWVudCBpbnN0YW5jZSBieSBsb2dnaW5nIG91dCBhbmQgcmVtb3ZpbmcgdGhlIFVSTCBhbmQgcHJvamVjdFxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuYXBpLnJlc2V0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCB0aGUgdG9rZW4gaWYgaXQgaXMgYWJvdXQgdG8gZXhwaXJlICh3aXRoaW4gMzAgc2Vjb25kcyBvZiBleHBpcnkgZGF0ZSkuXG4gICAqIC0gQ2FsbHMgb25BdXRvUmVmcmVzaFN1Y2Nlc3Mgd2l0aCB0aGUgbmV3IHRva2VuIGlmIHRoZSByZWZyZXNoaW5nIGlzIHN1Y2Nlc3NmdWwuXG4gICAqIC0gQ2FsbHMgb25BdXRvUmVmcmVzaEVycm9yIGlmIHJlZnJlc2hpbmcgdGhlIHRva2VuIGZhaWxzIGZvciBzb21lIHJlYXNvbi5cbiAgICogQHJldHVybnMge1tib29sZWFuLCBFcnJvcj9dfVxuICAgKi9cbiAgcHVibGljIHJlZnJlc2hJZk5lZWRlZCgpOiBQcm9taXNlPFtib29sZWFuLCBFcnJvcj9dPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmF1dGgucmVmcmVzaElmTmVlZGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBwYXNzZWQgdG9rZW4gdG8gcmVxdWVzdCBhIG5ldyBvbmVcbiAgICovXG4gIHB1YmxpYyByZWZyZXNoKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPElSZWZyZXNoVG9rZW5SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5hdXRoLnJlZnJlc2godG9rZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcXVlc3QgdG8gcmVzZXQgdGhlIHBhc3N3b3JkIG9mIHRoZSB1c2VyIHdpdGggdGhlIGdpdmVuIGVtYWlsIGFkZHJlc3MuXG4gICAqIFRoZSBBUEkgd2lsbCBzZW5kIGFuIGVtYWlsIHRvIHRoZSBnaXZlbiBlbWFpbCBhZGRyZXNzIHdpdGggYSBsaW5rIHRvIGdlbmVyYXRlIGEgbmV3XG4gICAqIHRlbXBvcmFyeSBwYXNzd29yZC5cbiAgICovXG4gIHB1YmxpYyByZXF1ZXN0UGFzc3dvcmRSZXNldDxUUmVzcG9uc2UgZXh0ZW5kcyBhbnkgPSBhbnk+KGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbWFpbCksIFwiZW1haWwgbXVzdCBiZSBhIHN0cmluZ1wiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PFRSZXNwb25zZT4oXCIvYXV0aC9wYXNzd29yZC9yZXF1ZXN0XCIsIHtcbiAgICAgIGVtYWlsLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBhdXRoZW50aWNhdGlvblxuXG4gIC8vICNlbmRyZWdpb24gY29sbGVjdGlvbiBwcmVzZXRzXG5cbiAgLy8gI3JlZ2lvbiBhY3Rpdml0eVxuXG4gIC8qKlxuICAgKiBHZXQgYWN0aXZpdHlcbiAgICovXG4gIHB1YmxpYyBnZXRBY3Rpdml0eShwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxJQWN0aXZpdHlSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElBY3Rpdml0eVJlc3BvbnNlPihcIi9hY3Rpdml0eVwiLCBwYXJhbXMpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBhY3Rpdml0eVxuXG4gIC8vICNyZWdpb24gYm9va21hcmtzXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYm9va21hcmtzIG9mIHRoZSBjdXJyZW50IHVzZXJcbiAgICogQGRlcHJlY2F0ZWQgV2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24sIHBsZWFzZSB1c2Uge0BsaW5rIFNESy5nZXRDb2xsZWN0aW9uUHJlc2V0c30gaW5zdGVhZFxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hZHZhbmNlZC9sZWdhY3ktdXBncmFkZXMuaHRtbCNkaXJlY3R1cy1ib29rbWFya3NcbiAgICovXG4gIHB1YmxpYyBnZXRNeUJvb2ttYXJrczxUUmVzcG9uc2UgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxUUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb2xsZWN0aW9uUHJlc2V0czxUUmVzcG9uc2U+KHBhcmFtcyk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGJvb2ttYXJrc1xuXG4gIC8vICNyZWdpb24gY29sbGVjdGlvbnNcblxuICAvKipcbiAgICogR2V0IGFsbCBhdmFpbGFibGUgY29sbGVjdGlvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRDb2xsZWN0aW9ucyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxJQ29sbGVjdGlvbnNSZXNwb25zZVtdPiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUNvbGxlY3Rpb25zUmVzcG9uc2VbXT4oXCIvY29sbGVjdGlvbnNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29sbGVjdGlvbiBpbmZvIGJ5IG5hbWVcbiAgICovXG4gIHB1YmxpYyBnZXRDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZywgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSk6IFByb21pc2U8SUNvbGxlY3Rpb25SZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUNvbGxlY3Rpb25SZXNwb25zZT4oYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ29sbGVjdGlvbihkYXRhOiBJQ29sbGVjdGlvbik6IFByb21pc2U8SUNvbGxlY3Rpb25SZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdChkYXRhKSwgXCJkYXRhIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PElDb2xsZWN0aW9uUmVzcG9uc2U+KFwiL2NvbGxlY3Rpb25zXCIsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYSBjZXJ0YWluIGNvbGxlY3Rpb25cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZywgZGF0YTogUGFydGlhbDxJQ29sbGVjdGlvbj4pOiBQcm9taXNlPElDb2xsZWN0aW9uUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChkYXRhKSwgXCJkYXRhIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPElDb2xsZWN0aW9uUmVzcG9uc2U+KGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWAsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBjZXJ0YWluIGNvbGxlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBkZWxldGVDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlPHZvaWQ+KGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWApO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBjb2xsZWN0aW9uc1xuXG4gIC8vICNyZWdpb24gY29sbGVjdGlvbiBwcmVzZXRzXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29sbGVjdGlvbiBwcmVzZXRzIG9mIHRoZSBjdXJyZW50IHVzZXJcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2NvbGxlY3Rpb24tcHJlc2V0c1xuICAgKi9cbiAgcHVibGljIGdldENvbGxlY3Rpb25QcmVzZXRzPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyh0aGlzLmNvbmZpZy50b2tlbiksIFwiZGVmaW5lZCB0b2tlbiBpcyBub3QgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmFwaS5nZXRQYXlsb2FkPHsgaWQ6IHN0cmluZzsgcm9sZTogc3RyaW5nIH0+KCk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5hcGkuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW3RpdGxlXVtubnVsbF1cIjogMSxcbiAgICAgICAgXCJmaWx0ZXJbdXNlcl1bZXFdXCI6IHBheWxvYWQuaWQsXG4gICAgICB9KSxcbiAgICAgIHRoaXMuYXBpLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICBcImZpbHRlcltyb2xlXVtlcV1cIjogcGF5bG9hZC5yb2xlLFxuICAgICAgICBcImZpbHRlclt0aXRsZV1bbm51bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3VzZXJdW251bGxdXCI6IDEsXG4gICAgICB9KSxcbiAgICBdKS50aGVuKCh2YWx1ZXM6IEFycmF5PHsgZGF0YTogYW55IH0+KSA9PiB7XG4gICAgICBjb25zdCBbdXNlciwgcm9sZV0gPSB2YWx1ZXM7XG5cbiAgICAgIHJldHVybiBbLi4uKHVzZXIuZGF0YSB8fCBbXSksIC4uLihyb2xlLmRhdGEgfHwgW10pXSBhcyBUUmVzcG9uc2U7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGNvbGxlY3Rpb24gcHJlc2V0IChib29rbWFyayAvIGxpc3RpbmcgcHJlZmVyZW5jZXMpXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNjb2xsZWN0aW9uLXByZXNldHNcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDb2xsZWN0aW9uUHJlc2V0PENvbGxlY3Rpb25QcmVzZXQgZXh0ZW5kcyBJQ29sbGVjdGlvblByZXNldD4oXG4gICAgZGF0YTogQ29sbGVjdGlvblByZXNldFxuICApOiBQcm9taXNlPElDb2xsZWN0aW9uUHJlc2V0UmVzcG9uc2U8Q29sbGVjdGlvblByZXNldD4+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PElDb2xsZWN0aW9uUHJlc2V0UmVzcG9uc2U8Q29sbGVjdGlvblByZXNldD4+KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgY29sbGVjdGlvbiBwcmVzZXQgKGJvb2ttYXJrIC8gbGlzdGluZyBwcmVmZXJlbmNlKVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjY29sbGVjdGlvbi1wcmVzZXRzXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICBwdWJsaWMgdXBkYXRlQ29sbGVjdGlvblByZXNldDxcbiAgICBQYXJ0aWFsQ29sbGVjdGlvblByZXNldCBleHRlbmRzIFBhcnRpYWw8SUNvbGxlY3Rpb25QcmVzZXQ+LFxuICAgIFRSZXN1bHRDb2xsZWN0aW9uUHJlc2V0IGV4dGVuZHMgSUNvbGxlY3Rpb25QcmVzZXQgPSBJQ29sbGVjdGlvblByZXNldFxuICA+KFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIGRhdGE6IElVcGRhdGVDb2xsZWN0aW9uUHJlc2V0Qm9keVxuICApOiBQcm9taXNlPElDb2xsZWN0aW9uUHJlc2V0UmVzcG9uc2U8UGFydGlhbENvbGxlY3Rpb25QcmVzZXQgJiBUUmVzdWx0Q29sbGVjdGlvblByZXNldD4+IHtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChkYXRhKSwgXCJkYXRhIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPElDb2xsZWN0aW9uUHJlc2V0UmVzcG9uc2U8UGFydGlhbENvbGxlY3Rpb25QcmVzZXQgJiBUUmVzdWx0Q29sbGVjdGlvblByZXNldD4+KFxuICAgICAgYC9jb2xsZWN0aW9uX3ByZXNldHMvJHtwcmltYXJ5S2V5fWAsXG4gICAgICBkYXRhXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgY29sbGVjdGlvbiBwcmVzZXQgYnkgcHJpbWFyeWtleVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjY29sbGVjdGlvbi1wcmVzZXRzXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQ29sbGVjdGlvblByZXNldChwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlPHZvaWQ+KGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gY29sbGVjdGlvbiBwcmVzZXRzXG5cbiAgLy8gI3JlZ2lvbiBleHRlbnNpb25zXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBpbnRlcmZhY2VzXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNnZXQtZXh0ZW5zaW9uc1xuICAgKi9cbiAgcHVibGljIGdldEludGVyZmFjZXM8VFJlc3BvbnNlIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oKTogUHJvbWlzZTxUUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucmVxdWVzdDxUUmVzcG9uc2U+KFwiZ2V0XCIsIFwiL2ludGVyZmFjZXNcIiwge30sIHt9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGluZm9ybWF0aW9uIG9mIGFsbCBpbnN0YWxsZWQgbGF5b3V0c1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZ2V0LWV4dGVuc2lvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRMYXlvdXRzPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KCk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3Q8VFJlc3BvbnNlPihcImdldFwiLCBcIi9sYXlvdXRzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIHBhZ2VzXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNnZXQtZXh0ZW5zaW9uc1xuICAgKi9cbiAgcHVibGljIGdldFBhZ2VzPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KCk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3Q8VFJlc3BvbnNlPihcImdldFwiLCBcIi9wYWdlc1wiLCB7fSwge30sIHRydWUpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBleHRlbnNpb25zXG5cbiAgLy8gI3JlZ2lvbiBmaWVsZHNcblxuICAvKipcbiAgICogR2V0IGFsbCBmaWVsZHMgdGhhdCBhcmUgaW4gRGlyZWN0dXNcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2ZpZWxkcy0yXG4gICAqL1xuICBwdWJsaWMgZ2V0QWxsRmllbGRzPFRGaWVsZHNUeXBlIGV4dGVuZHMgSUZpZWxkW10+KFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUZpZWxkc1Jlc3BvbnNlPFRGaWVsZHNUeXBlPj4oXCIvZmllbGRzXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmaWVsZHMgdGhhdCBoYXZlIGJlZW4gc2V0dXAgZm9yIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmllbGRzLTJcbiAgICovXG4gIHB1YmxpYyBnZXRGaWVsZHM8VEZpZWxkc1R5cGUgZXh0ZW5kcyBJRmllbGRbXT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGU+PihgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZpZWxkIGluZm9ybWF0aW9uIGZvciBhIHNpbmdsZSBnaXZlbiBmaWVsZFxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmllbGRzLTJcbiAgICovXG4gIHB1YmxpYyBnZXRGaWVsZDxURmllbGRUeXBlIGV4dGVuZHMgSUZpZWxkPihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXG4gICAgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fVxuICApOiBQcm9taXNlPElGaWVsZFJlc3BvbnNlPFRGaWVsZFR5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZmllbGROYW1lKSwgXCJmaWVsZE5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJRmllbGRSZXNwb25zZTxURmllbGRUeXBlPj4oYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkTmFtZX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGZpZWxkIGluIHRoZSBnaXZlbiBjb2xsZWN0aW9uXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNmaWVsZHMtMlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUZpZWxkPFRGaWVsZFR5cGUgZXh0ZW5kcyBJRmllbGQ+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBmaWVsZEluZm86IFRGaWVsZFR5cGVcbiAgKTogUHJvbWlzZTxJRmllbGRSZXNwb25zZTxURmllbGRUeXBlPj4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGZpZWxkSW5mbyksIFwiZmllbGRJbmZvIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8SUZpZWxkUmVzcG9uc2U8VEZpZWxkVHlwZT4+KGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBmaWVsZEluZm8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIGdpdmVuIGZpZWxkIGluIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmllbGRzLTJcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVGaWVsZDxURmllbGRUeXBlIGV4dGVuZHMgUGFydGlhbDxJRmllbGQ+PihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXG4gICAgZmllbGRJbmZvOiBURmllbGRUeXBlXG4gICk6IFByb21pc2U8SUZpZWxkUmVzcG9uc2U8SUZpZWxkICYgVEZpZWxkVHlwZT4gfCB1bmRlZmluZWQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc1N0cmluZyhmaWVsZE5hbWUpLCBcImZpZWxkTmFtZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChmaWVsZEluZm8pLCBcImZpZWxkSW5mbyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxJRmllbGRSZXNwb25zZTxJRmllbGQgJiBURmllbGRUeXBlPj4oYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkTmFtZX1gLCBmaWVsZEluZm8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBtdWx0aXBsZSBmaWVsZHMgYXQgb25jZVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmllbGRzLTJcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogLy8gU2V0IG11bHRpcGxlIGZpZWxkcyB0byB0aGUgc2FtZSB2YWx1ZVxuICAgKiB1cGRhdGVGaWVsZHMoXCJwcm9qZWN0c1wiLCBbXCJmaXJzdF9uYW1lXCIsIFwibGFzdF9uYW1lXCIsIFwiZW1haWxcIl0sIHtcbiAgICogICBkZWZhdWx0X3ZhbHVlOiBcIlwiXG4gICAqIH0pXG4gICAqXG4gICAqIC8vIFNldCBtdWx0aXBsZSBmaWVsZHMgdG8gZGlmZmVyZW50IHZhbHVlc1xuICAgKiB1cGRhdGVGaWVsZHMoXCJwcm9qZWN0c1wiLCBbXG4gICAqICAge1xuICAgKiAgICAgaWQ6IDE0LFxuICAgKiAgICAgc29ydDogMVxuICAgKiAgIH0sXG4gICAqICAge1xuICAgKiAgICAgaWQ6IDE3LFxuICAgKiAgICAgc29ydDogMlxuICAgKiAgIH0sXG4gICAqICAge1xuICAgKiAgICAgaWQ6IDkxMixcbiAgICogICAgIHNvcnQ6IDNcbiAgICogICB9XG4gICAqIF0pXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlRmllbGRzPFRGaWVsZHNUeXBlIGV4dGVuZHMgSUZpZWxkW10+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBmaWVsZHM6IEFycmF5PFBhcnRpYWw8SUZpZWxkPj5cbiAgKTogUHJvbWlzZTxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGUgJiBJRmllbGRbXT4gfCB1bmRlZmluZWQ+O1xuICBwdWJsaWMgdXBkYXRlRmllbGRzPFRGaWVsZHNUeXBlIGV4dGVuZHMgSUZpZWxkW10+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBmaWVsZHM6IHN0cmluZ1tdLFxuICAgIGZpZWxkSW5mbzogUGFydGlhbDxJRmllbGQ+XG4gICk6IFByb21pc2U8SUZpZWxkc1Jlc3BvbnNlPFRGaWVsZHNUeXBlICYgSUZpZWxkW10+IHwgdW5kZWZpbmVkPjtcbiAgcHVibGljIHVwZGF0ZUZpZWxkczxURmllbGRzVHlwZSBleHRlbmRzIElGaWVsZFtdPihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGRzSW5mb09yRmllbGROYW1lczogc3RyaW5nW10gfCBBcnJheTxQYXJ0aWFsPElGaWVsZD4+LFxuICAgIGZpZWxkSW5mbzogUGFydGlhbDxJRmllbGQ+IHwgbnVsbCA9IG51bGxcbiAgKTogUHJvbWlzZTxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGUgJiBJRmllbGRbXT4gfCB1bmRlZmluZWQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc0FycmF5KGZpZWxkc0luZm9PckZpZWxkTmFtZXMpLCBcImZpZWxkc0luZm9PckZpZWxkTmFtZXMgbXVzdCBiZSBhbiBhcnJheVwiKTtcblxuICAgIGlmIChmaWVsZEluZm8pIHtcbiAgICAgIGludmFyaWFudChpc09iamVjdChmaWVsZEluZm8pLCBcImZpZWxkSW5mbyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2goYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkc0luZm9PckZpZWxkTmFtZXMuam9pbihcIixcIil9YCwgZmllbGRJbmZvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2goYC9maWVsZHMvJHtjb2xsZWN0aW9ufWAsIGZpZWxkc0luZm9PckZpZWxkTmFtZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGZpZWxkIGZyb20gYSBjb2xsZWN0aW9uXG4gICAqIEBzZWUgQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2ZpZWxkcy0yXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlRmllbGQoY29sbGVjdGlvbjogc3RyaW5nLCBmaWVsZE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGZpZWxkTmFtZSksIFwiZmllbGROYW1lIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlKGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGZpZWxkc1xuXG4gIC8vICNyZWdpb24gZmlsZXNcblxuICAvKipcbiAgICogR2V0IGEgbGlzdCBvZiBhdmFpbGFibGUgZmlsZXMgZnJvbSBEaXJlY3R1c1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmlsZXNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRGaWxlcyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxJRmlsZXNSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJQYXJhbXMgbXVzdCBiZSBhbiBvYmplY3RcIik7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChcIi9maWxlc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGNlcnRhaW4gZmlsZSBvciBjZXJ0YWluIGZpbGUgbGlzdCBmcm9tIERpcmVjdHVzXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNmaWxlc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEZpbGU8VEZpbGUgZXh0ZW5kcyBzdHJpbmcgfCBzdHJpbmdbXT4oXG4gICAgZmlsZU5hbWU6IFRGaWxlLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxURmlsZSBleHRlbmRzIHN0cmluZyA/IElGaWxlUmVzcG9uc2UgOiBJRmlsZXNSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhmaWxlTmFtZSksIFwiRmlsZU5hbWUgbXVzdCBiZSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcIlBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcbiAgICBjb25zdCBmaWxlcyA9IHR5cGVvZiBmaWxlTmFtZSA9PT0gXCJzdHJpbmdcIiA/IGZpbGVOYW1lIDogKGZpbGVOYW1lIGFzIHN0cmluZ1tdKS5qb2luKFwiLFwiKTtcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KGAvZmlsZXMvJHtmaWxlc31gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBtdWx0aXBhcnQgZmlsZXMgaW4gbXVsdGlwYXJ0L2Zvcm0tZGF0YVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmlsZXNcbiAgICovXG4gIHB1YmxpYyB1cGxvYWRGaWxlczxUUmVzcG9uc2UgZXh0ZW5kcyBhbnkgPSBhbnlbXT4oXG4gICAgZGF0YTogb2JqZWN0LCAvLyBUT0RPOiBmaXggdHlwZSBkZWZpbml0aW9uXG4gICAgb25VcGxvYWRQcm9ncmVzczogKCkgPT4gb2JqZWN0ID0gKCkgPT4gKHt9KVxuICApOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jb25maWcudG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiLFxuICAgIH07XG5cbiAgICAvLyBsaW1pdCBjb25jdXJyZW50IHJlcXVlc3RzIHRvIDVcbiAgICB0aGlzLmFwaS5jb25jdXJyZW50LmF0dGFjaCg1KTtcblxuICAgIHJldHVybiB0aGlzLmFwaS54aHJcbiAgICAgIC5wb3N0KGAke3RoaXMuY29uZmlnLnVybH0vJHt0aGlzLmNvbmZpZy5wcm9qZWN0fS9maWxlc2AsIGRhdGEsIHtcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzOiB7IGRhdGE6IGFueSB9KSA9PiB7XG4gICAgICAgIC8vIGRldGFjaCBjb25jdXJyZW5jeSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuYXBpLmNvbmN1cnJlbnQuZGV0YWNoKCk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IElFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIGRldGFjaCBjb25jdXJyZW5jeSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuYXBpLmNvbmN1cnJlbnQuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJOZXR3b3JrIEVycm9yXCIsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGZpbGVzXG5cbiAgLy8gI3JlZ2lvbiBpdGVtc1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjdXBkYXRlLWl0ZW1cbiAgICogQHR5cGVwYXJhbSBUVFBhcnRpYWxJdGVtIERlZmluaW5nIHRoZSBpdGVtIHR5cGUgaW4gb2JqZWN0IHNjaGVtYVxuICAgKiBAdHlwZXBhcmFtIFRUUmVzdWx0IEV4dGVuc2lvbiBvZiBbVFBhcnRpYWxJdGVtXSBhcyBleHBlY3RlZCByZXN1bHRcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVJdGVtPFRUUGFydGlhbEl0ZW0gZXh0ZW5kcyBvYmplY3QsIFRUUmVzdWx0IGV4dGVuZHMgb2JqZWN0ID0gVFRQYXJ0aWFsSXRlbT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIGJvZHk6IFRUUGFydGlhbEl0ZW0sXG4gICAgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fVxuICApOiBQcm9taXNlPElJdGVtUmVzcG9uc2U8VFRQYXJ0aWFsSXRlbSAmIFRUUmVzdWx0Pj4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxJSXRlbVJlc3BvbnNlPFRUUGFydGlhbEl0ZW0gJiBUVFJlc3VsdD4+KGAke2NvbGxlY3Rpb25CYXNlUGF0aH0vJHtwcmltYXJ5S2V5fWAsIGJvZHksIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIG11bHRpcGxlIGl0ZW1zXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCN1cGRhdGUtaXRlbXNcbiAgICogQHR5cGVwYXJhbSBUUGFydGlhbEl0ZW0gRGVmaW5pbmcgYW4gYXJyYXkgb2YgaXRlbXMsIGVhY2ggaW4gb2JqZWN0IHNjaGVtYVxuICAgKiBAdHlwZXBhcmFtIFRSZXN1bHQgRXh0ZW5zaW9uIG9mIFtUUGFydGlhbEl0ZW1dIGFzIGV4cGVjdGVkIHJlc3VsdFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPElJdGVtc1Jlc3BvbnNlPFRQYXJ0aWFsSXRlbSAmIFRSZXN1bHQ+Pn1cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVJdGVtczxUUGFydGlhbEl0ZW0gZXh0ZW5kcyBvYmplY3RbXSwgVFJlc3VsdCBleHRlbmRzIFRQYXJ0aWFsSXRlbSA9IFRQYXJ0aWFsSXRlbT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGJvZHk6IFRQYXJ0aWFsSXRlbSxcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICkge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzQXJyYXkoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIGFycmF5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPElJdGVtc1Jlc3BvbnNlPFRQYXJ0aWFsSXRlbSAmIFRSZXN1bHQ+Pihjb2xsZWN0aW9uQmFzZVBhdGgsIGJvZHksIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGl0ZW1cbiAgICogQHR5cGVwYXJhbSBUSXRlbVR5cGUgRGVmaW5pbmcgYW4gaXRlbSBhbmQgaXRzIGZpZWxkcyBpbiBvYmplY3Qgc2NoZW1hXG4gICAqIEByZXR1cm4ge1Byb21pc2U8SUl0ZW1zUmVzcG9uc2U8VEl0ZW1UeXBlPj59XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlSXRlbTxUSXRlbVR5cGUgZXh0ZW5kcyBvYmplY3Q+KGNvbGxlY3Rpb246IHN0cmluZywgYm9keTogVEl0ZW1UeXBlKTogUHJvbWlzZTxJSXRlbVJlc3BvbnNlPFRJdGVtVHlwZT4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8SUl0ZW1SZXNwb25zZTxUSXRlbVR5cGU+Pihjb2xsZWN0aW9uQmFzZVBhdGgsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBtdWx0aXBsZSBpdGVtc1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjY3JlYXRlLWl0ZW1zXG4gICAqIEB0eXBlcGFyYW0gVEl0ZW1zVHlwZSBEZWZpbmluZyBhbiBhcnJheSBvZiBpdGVtcywgZWFjaCBpbiBvYmplY3Qgc2NoZW1hXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlSXRlbXM8VEl0ZW1zVHlwZSBleHRlbmRzIEFycmF5PHt9Pj4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGJvZHk6IEJvZHlUeXBlXG4gICk6IFByb21pc2U8SUl0ZW1zUmVzcG9uc2U8VEl0ZW1zVHlwZT4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc0FycmF5KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBhcnJheVwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PElJdGVtc1Jlc3BvbnNlPFRJdGVtc1R5cGU+Pihjb2xsZWN0aW9uQmFzZVBhdGgsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdGVtcyBmcm9tIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZ2V0LW11bHRpcGxlLWl0ZW1zXG4gICAqIEB0eXBlcGFyYW0gVEl0ZW1zVHlwZSBEZWZpbmluZyBhbiBhcnJheSBvZiBpdGVtcywgZWFjaCBpbiBvYmplY3Qgc2NoZW1hXG4gICAqL1xuICBwdWJsaWMgZ2V0SXRlbXM8VFRJdGVtc1R5cGUgZXh0ZW5kcyBBcnJheTx7fT4+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICk6IFByb21pc2U8SUl0ZW1zUmVzcG9uc2U8VFRJdGVtc1R5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJSXRlbXNSZXNwb25zZTxUVEl0ZW1zVHlwZT4+KGNvbGxlY3Rpb25CYXNlUGF0aCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzaW5nbGUgaXRlbSBieSBwcmltYXJ5IGtleVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZ2V0LWl0ZW1cbiAgICogQHR5cGVwYXJhbSBUSXRlbVR5cGUgRGVmaW5pbmcgZmllbGRzIG9mIGFuIGl0ZW0gaW4gb2JqZWN0IHNjaGVtYVxuICAgKi9cbiAgcHVibGljIGdldEl0ZW08VEl0ZW1UeXBlIGV4dGVuZHMgb2JqZWN0ID0ge30+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSxcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICk6IFByb21pc2U8SUl0ZW1SZXNwb25zZTxUSXRlbVR5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElJdGVtUmVzcG9uc2U8VEl0ZW1UeXBlPj4oYCR7Y29sbGVjdGlvbkJhc2VQYXRofS8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBzaW5nbGUgaXRlbSBieSBwcmltYXJ5IGtleVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZGVsZXRlLWl0ZW1zXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlSXRlbShjb2xsZWN0aW9uOiBzdHJpbmcsIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlKSB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmRlbGV0ZTx2b2lkPihgJHtjb2xsZWN0aW9uQmFzZVBhdGh9LyR7cHJpbWFyeUtleX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgbXVsdGlwbGUgaXRlbXMgYnkgcHJpbWFyeSBrZXlcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2RlbGV0ZS1pdGVtc1xuICAgKi9cbiAgcHVibGljIGRlbGV0ZUl0ZW1zKGNvbGxlY3Rpb246IHN0cmluZywgcHJpbWFyeUtleXM6IFByaW1hcnlLZXlUeXBlW10pIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc0FycmF5KHByaW1hcnlLZXlzKSwgXCJwcmltYXJ5S2V5cyBtdXN0IGJlIGFuIGFycmF5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmRlbGV0ZTx2b2lkPihgJHtjb2xsZWN0aW9uQmFzZVBhdGh9LyR7cHJpbWFyeUtleXMuam9pbigpfWApO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBpdGVtc1xuXG4gIC8vICNyZWdpb24gbGlzdGluZyBwcmVmZXJlbmNlc1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbGxlY3Rpb24gcHJlc2V0cyBvZiB0aGUgY3VycmVudCB1c2VyIGZvciBhIHNpbmdsZSBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0TXlMaXN0aW5nUHJlZmVyZW5jZXM8VFJlc3BvbnNlIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxUUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodGhpcy5jb25maWcudG9rZW4pLCBcInRva2VuIG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuYXBpLmdldFBheWxvYWQ8eyByb2xlOiBzdHJpbmc7IGlkOiBzdHJpbmcgfT4oKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmFwaS5nZXQ8SUZpZWxkUmVzcG9uc2U8YW55Pj4oXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgXCJmaWx0ZXJbY29sbGVjdGlvbl1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICAgIFwiZmlsdGVyW3JvbGVdW251bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxuICAgICAgICBcImZpbHRlclt1c2VyXVtudWxsXVwiOiAxLFxuICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgc29ydDogXCItaWRcIixcbiAgICAgIH0pLFxuICAgICAgdGhpcy5hcGkuZ2V0PElGaWVsZFJlc3BvbnNlPGFueT4+KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgICBcImZpbHRlcltyb2xlXVtlcV1cIjogcGF5bG9hZC5yb2xlLFxuICAgICAgICBcImZpbHRlclt0aXRsZV1bbnVsbF1cIjogMSxcbiAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMSxcbiAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgIHNvcnQ6IFwiLWlkXCIsXG4gICAgICB9KSxcbiAgICAgIHRoaXMuYXBpLmdldDxJRmllbGRSZXNwb25zZTxhbnk+PihcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uXVtlcV1cIjogY29sbGVjdGlvbixcbiAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHBheWxvYWQucm9sZSxcbiAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW251bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3VzZXJdW2VxXVwiOiBwYXlsb2FkLmlkLFxuICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgc29ydDogXCItaWRcIixcbiAgICAgIH0pLFxuICAgIF0pLnRoZW4oKHZhbHVlczogQXJyYXk8SUZpZWxkUmVzcG9uc2U8YW55Pj4pID0+IHtcbiAgICAgIGNvbnN0IFtjb2wsIHJvbGUsIHVzZXJdID0gdmFsdWVzO1xuXG4gICAgICBpZiAodXNlci5kYXRhICYmIHVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB1c2VyLmRhdGFbMF0gYXMgVFJlc3BvbnNlO1xuICAgICAgfVxuXG4gICAgICBpZiAocm9sZS5kYXRhICYmIHJvbGUuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiByb2xlLmRhdGFbMF0gYXMgVFJlc3BvbnNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29sLmRhdGEgJiYgY29sLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY29sLmRhdGFbMF0gYXMgVFJlc3BvbnNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge30gYXMgVFJlc3BvbnNlO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBsaXN0aW5nIHByZWZlcmVuY2VzXG5cbiAgLy8gI3JlZ2lvbiBwZXJtaXNzaW9uc1xuXG4gIC8qKlxuICAgKiBHZXQgcGVybWlzc2lvbnNcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxJUGVybWlzc2lvbj59XG4gICAqL1xuICBwdWJsaWMgZ2V0UGVybWlzc2lvbnMocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSk6IFByb21pc2U8SUl0ZW1zUmVzcG9uc2U8SVBlcm1pc3Npb25bXT4+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXM8SVBlcm1pc3Npb25bXT4oXCJkaXJlY3R1c19wZXJtaXNzaW9uc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IEZpeCB0eXBlLWRlZiBmb3IgcmV0dXJuXG4gICAqIEdldCB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyJ3MgcGVybWlzc2lvbnNcbiAgICogQHR5cGVwYXJhbSBUUmVzcG9uc2UgUGVybWlzc2lvbnMgdHlwZSBhcyBhcnJheSBleHRlbmRpbmcgYW55W11cbiAgICovXG4gIHB1YmxpYyBnZXRNeVBlcm1pc3Npb25zPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KFwiL3Blcm1pc3Npb25zL21lXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogRml4IHR5cGUtZGVmIGZvciBwYXJhbSBhbmQgcmV0dXJuXG4gICAqIENyZWF0ZSBtdWx0aXBsZSBuZXcgcGVybWlzc2lvbnNcbiAgICogQHR5cGVwYXJhbSBUUmVzcG9uc2UgUGVybWlzc2lvbnMgdHlwZSBhcyBhcnJheSBleHRlbmRpbmcgYW55W11cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVQZXJtaXNzaW9uczxUUmVzcG9uc2UgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihkYXRhOiBhbnlbXSk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzQXJyYXkoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuYXJyeVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0KFwiL3Blcm1pc3Npb25zXCIsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IEZpeCB0eXBlLWRlZiBmb3IgcGFyYW0gYW5kIHJldHVyblxuICAgKiBVcGRhdGUgbXVsdGlwbGUgcGVybWlzc2lvbiByZWNvcmRzXG4gICAqIEB0eXBlcGFyYW0gVFJlc3BvbnNlIFBlcm1pc3Npb25zIHR5cGUgYXMgYXJyYXkgZXh0ZW5kaW5nIGFueVtdXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUGVybWlzc2lvbnM8VFJlc3BvbnNlIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oZGF0YTogYW55W10pOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc0FycmF5KGRhdGEpLCBcImRhdGEgbXVzdCBiZSBhbmFycnlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2g8VFJlc3BvbnNlPihcIi9wZXJtaXNzaW9uc1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gcGVybWlzc2lvbnNcblxuICAvLyAjcmVnaW9uIHJlbGF0aW9uc1xuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHJlbGF0aW9uc2hpcHNcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxJUmVsYXRpb25zUmVzcG9uc2U+fVxuICAgKi9cbiAgcHVibGljIGdldFJlbGF0aW9ucyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KSB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElSZWxhdGlvbnNSZXNwb25zZT4oXCIvcmVsYXRpb25zXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBuZXcgcmVsYXRpb25cbiAgICogQHBhcmFtIHtJUmVsYXRpb259IGRhdGFcbiAgICogQHJldHVybiB7UHJvbWlzZTxJUmVsYXRpb25SZXNwb25zZT59XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlUmVsYXRpb24oZGF0YTogSVJlbGF0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8SVJlbGF0aW9uUmVzcG9uc2U+KFwiL3JlbGF0aW9uc1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGV4aXN0aW5nIHJlbGF0aW9uXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUmVsYXRpb24ocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIGRhdGE6IFBhcnRpYWw8SVJlbGF0aW9uPikge1xuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxJUmVsYXRpb25SZXNwb25zZT4oYC9yZWxhdGlvbnMvJHtwcmltYXJ5S2V5fWAsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IEFkZCB0eXBlLWRlZiBmb3IgcmV0dXJuIHZhbHVlKHMpXG4gICAqIEdldCB0aGUgcmVsYXRpb25zaGlwIGluZm9ybWF0aW9uIGZvciB0aGUgZ2l2ZW4gY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGdldENvbGxlY3Rpb25SZWxhdGlvbnMoY29sbGVjdGlvbjogc3RyaW5nLCBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmFwaS5nZXQ8YW55PihcIi9yZWxhdGlvbnNcIiwge1xuICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uX2FdW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgfSksXG4gICAgICB0aGlzLmFwaS5nZXQ8YW55PihcIi9yZWxhdGlvbnNcIiwge1xuICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uX2JdW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgfSksXG4gICAgXSk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIHJlbGF0aW9uc1xuXG4gIC8vICNyZWdpb24gcmV2aXNpb25zXG5cbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZSBpdGVtJ3MgcmV2aXNpb25zIGJ5IHByaW1hcnkga2V5XG4gICAqIEB0eXBlcGFyYW0gRGF0YUFuZERlbHRhICBUaGUgZGF0YSBpbmNsdWRpbmcgZGVsdGEgdHlwZSBmb3IgdGhlIHJldmlzaW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSB7UHJpbWFyeUtleVR5cGV9IHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRJdGVtUmV2aXNpb25zPFREYXRhQW5kRGVsdGEgZXh0ZW5kcyBvYmplY3QgPSB7fT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxJUmV2aXNpb25SZXNwb25zZTxURGF0YUFuZERlbHRhPj4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJUmV2aXNpb25SZXNwb25zZTxURGF0YUFuZERlbHRhPj4oYCR7Y29sbGVjdGlvbkJhc2VQYXRofS8ke3ByaW1hcnlLZXl9L3JldmlzaW9uc2AsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJ0IGFuIGl0ZW0gdG8gYSBwcmV2aW91cyBzdGF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sbGVjdGlvblxuICAgKiBAcGFyYW0ge1ByaW1hcnlLZXlUeXBlfSBwcmltYXJ5S2V5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZXZpc2lvbklEXG4gICAqL1xuICBwdWJsaWMgcmV2ZXJ0KGNvbGxlY3Rpb246IHN0cmluZywgcHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIHJldmlzaW9uSUQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNOdW1iZXIocmV2aXNpb25JRCksIFwicmV2aXNpb25JRCBtdXN0IGJlIGEgbnVtYmVyXCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoKGAke2NvbGxlY3Rpb25CYXNlUGF0aH0vJHtwcmltYXJ5S2V5fS9yZXZlcnQvJHtyZXZpc2lvbklEfWApO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiByZXZpc2lvbnNcblxuICAvLyAjcmVnaW9uIHJvbGVzXG5cbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZSB1c2VyIHJvbGVcbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX3CoHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRSb2xlKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxJUm9sZVJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzTnVtYmVyKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBhIG51bWJlclwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJUm9sZVJlc3BvbnNlPihgL3JvbGVzLyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlciByb2xlc1xuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKi9cbiAgcHVibGljIGdldFJvbGVzKHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPElSb2xlUmVzcG9uc2VbXT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElSb2xlUmVzcG9uc2VbXT4oXCIvcm9sZXNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSB1c2VyIHJvbGVcbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX3CoHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtSb2xlfSBib2R5XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUm9sZTxSb2xlIGV4dGVuZHMgUGFydGlhbDxJUm9sZT4+KHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBib2R5OiBSb2xlKSB7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW08Um9sZSwgSVJvbGU+KFwiZGlyZWN0dXNfcm9sZXNcIiwgcHJpbWFyeUtleSwgYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHVzZXIgcm9sZVxuICAgKiBAcGFyYW0ge1JvbGV9IGJvZHlcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVSb2xlPFRSb2xlIGV4dGVuZHMgSVJvbGU+KGJvZHk6IFRSb2xlKSB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJdGVtKFwiZGlyZWN0dXNfcm9sZXNcIiwgYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgdXNlciByb2wgYnkgcHJpbWFyeSBrZXlcbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX3CoHByaW1hcnlLZXlcbiAgICovXG4gIHB1YmxpYyBkZWxldGVSb2xlKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcblxuICAgIHJldHVybiB0aGlzLmRlbGV0ZUl0ZW0oXCJkaXJlY3R1c19yb2xlc1wiLCBwcmltYXJ5S2V5KTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gcm9sZXNcblxuICAvLyAjcmVnaW9uIHNldHRpbmdzXG5cbiAgLyoqXG4gICAqIEdldCBEaXJlY3R1cycgZ2xvYmFsIHNldHRpbmdzXG4gICAqIEBwYXJhbSB7UXVlcnlQYXJhbXNUeXBlP30gcGFyYW1zXG4gICAqL1xuICBwdWJsaWMgZ2V0U2V0dGluZ3MocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSkge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElTZXR0aW5nc1Jlc3BvbnNlPihcIi9zZXR0aW5nc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgXCJmaWVsZHNcIiBmb3IgZGlyZWN0dXNfc2V0dGluZ3NcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRTZXR0aW5nc0ZpZWxkcyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KSB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUZpZWxkc1Jlc3BvbnNlPihcIi9zZXR0aW5ncy9maWVsZHNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gc2V0dGluZ3NcblxuICAvLyAjcmVnaW9uIHVzZXJzXG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgYXZhaWxhYmxlIHVzZXJzIGluIERpcmVjdHVzXG4gICAqIEBwYXJhbSB7UXVlcnlQYXJhbXNUeXBlP30gcGFyYW1zXG4gICAqL1xuICBwdWJsaWMgZ2V0VXNlcnMocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSkge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElVc2Vyc1Jlc3BvbnNlPihcIi91c2Vyc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZSBEaXJlY3R1cyB1c2VyXG4gICAqIEBwYXJhbSB7UHJpbWFyeUtleVR5cGV9IHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRVc2VyPFVzZXIgZXh0ZW5kcyBJVXNlciA9IElVc2VyPihwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSkge1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SVVzZXJSZXNwb25zZTxVc2VyPj4oYC91c2Vycy8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZXIgaW5mbyBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAqIEBwYXJhbSB7UXVlcnlQYXJhbXNUeXBlP30gcGFyYW1zXG4gICAqL1xuICBwdWJsaWMgZ2V0TWU8VXNlciBleHRlbmRzIElVc2VyID0gSVVzZXI+KHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pIHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJVXNlclJlc3BvbnNlPFVzZXI+PihcIi91c2Vycy9tZVwiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHNpbmdsZSB1c2VyIGJhc2VkIG9uIHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX0gcHJpbWFyeUtleVxuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKi9cbiAgcHVibGljIHVwZGF0ZVVzZXI8VXNlciBleHRlbmRzIFBhcnRpYWw8SVVzZXI+PihwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgYm9keTogVXNlcikge1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtPFVzZXIsIElVc2VyPihcImRpcmVjdHVzX3VzZXJzXCIsIHByaW1hcnlLZXksIGJvZHkpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiB1c2Vyc1xuXG4gIC8vICNyZWdpb24gc2VydmVyIGFkbWluXG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCB1cGRhdGUgdGhlIGRhdGFiYXNlIG9mIHRoZSBBUEkgaW5zdGFuY2UgdG8gdGhlIGxhdGVzdCB2ZXJzaW9uXG4gICAqIHVzaW5nIHRoZSBtaWdyYXRpb25zIGluIHRoZSBBUElcbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVEYXRhYmFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdChcIi91cGRhdGVcIik7XG4gIH1cblxuICAvKipcbiAgICogUGluZyB0aGUgQVBJIHRvIGNoZWNrIGlmIGl0IGV4aXN0cyAvIGlzIHVwIGFuZCBydW5uaW5nLCByZXR1cm5zIFwicG9uZ1wiXG4gICAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nPn1cbiAgICovXG4gIHB1YmxpYyBwaW5nKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3QoXCJnZXRcIiwgXCIvc2VydmVyL3BpbmdcIiwge30sIHt9LCB0cnVlLCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzZXJ2ZXIgaW5mbyBmcm9tIHRoZSBBUElcbiAgICogQHJldHVybiB7UHJvbWlzZTxJU2VydmVySW5mb3JtYXRpb25SZXNwb25zZT59XG4gICAqL1xuICBwdWJsaWMgc2VydmVySW5mbygpOiBQcm9taXNlPElTZXJ2ZXJJbmZvcm1hdGlvblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3QoXCJnZXRcIiwgXCIvXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogQWRkIHJlc3BvbnNlIHR5cGUtZGVmXG4gICAqIEdldCB0aGUgc2VydmVyIGluZm8gZnJvbSB0aGUgcHJvamVjdFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgcHJvamVjdEluZm8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucmVxdWVzdChcImdldFwiLCBcIi9cIik7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogQWRkIHJlc3BvbnNlIHR5cGUtZGVmXG4gICAqIEdldCBhbGwgdGhlIHNldHVwIHRoaXJkIHBhcnR5IGF1dGggcHJvdmlkZXJzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBnZXRUaGlyZFBhcnR5QXV0aFByb3ZpZGVycygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoXCIvYXV0aC9zc29cIik7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIHNlcnZlciBhZG1pblxufVxuIiwiaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL0NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IFNESyB9IGZyb20gXCIuL1NES1wiO1xuXG5leHBvcnQge1xuICAvLyBleHBvcnQgY29uZmlnIGZvciByZS1zZXR0aW5nIGRlZmF1bHRzIGFjcm9zcyBhbGwgU0RLIGluc3RhbmNlc1xuICBDb25maWd1cmF0aW9uLFxuICAvLyBuYW1lZCBleHBvcnRzIGlzIHByZWZlcnJlZCwga2VlcCBkZWZhdWx0IGZvciB0cmFuc2l0aW9uIHBoYXNlXG4gIFNESyxcbn07XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgcGxlYXNlIHVzZSBuYW1lZCBpbXBvcnRzIGluc3RlYWQgb2YgZGVmYXVsdHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgU0RLO1xuIiwiZXhwb3J0IGNvbnN0IERJUkVDVFVTX0NPTExFQ1RJT05fUFJFRklYID0gXCJkaXJlY3R1c19cIjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb3JyZWN0IEFQSSBwYXRoIGZvciB0aGUgY29sbGVjdGlvbi4gSXQgd2lsbFxuICogc3RyaXAgdGhlIHByZWZpeCBAe0RJUkVDVFVTX0NPTExFQ1RJT05fUFJFRklYfSBvciB3aWxsIGFkZCB0aGVcbiAqICcvaXRlbXMvJyBwYXRoIGFzIHByZWZpeCBpZiBub3QgcHJvdmlkZWQuIFRoZSAnc3Vic3RyKDkpJyBkZWZpbmVzXG4gKiB0aGUgbGVuZ3RoIG9mIHRoZSBkZWZpbmVkIEB7RElSRUNUVVNfQ09MTEVDVElPTl9QUkVGSVh9LlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbGxlY3Rpb24gICAgIFRoZSBuYW1lIG9mIHRoZSBjb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQGludGVybmFsXG4gKlxuICogQGV4YW1wbGVcbiAqIGdldENvbGxlY3Rpb25JdGVtUGF0aCgnZGlyZWN0dXNfdXNlcnMnKTtcbiAqIC8vID0+ICcvdXNlcnMnXG4gKiBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoJ3VzZXJzJyk7XG4gKiAvLyA9PiAnL2l0ZW1zL3VzZXJzJ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb246IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoRElSRUNUVVNfQ09MTEVDVElPTl9QUkVGSVgpKSB7XG4gICAgcmV0dXJuIGAvJHtjb2xsZWN0aW9uLnN1YnN0cig5KX1gO1xuICB9XG5cbiAgcmV0dXJuIGAvaXRlbXMvJHtjb2xsZWN0aW9ufWA7XG59XG4iLCIvKipcbiAqIENoZWNrcyBpbnZhcmlhbnQgdmlvbGF0aW9uIGFnYWluc3QgYSBjb25kaXRpb24sIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgbm90IGZ1bGZpbGxlZFxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGNvbmRpdGlvblxuICogQHBhcmFtIHtzdHJpbmd9wqBtZXNzYWdlXG4gKi9cbmV4cG9ydCBjb25zdCBpbnZhcmlhbnQgPSAoY29uZGl0aW9uOiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGlmICghIWNvbmRpdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgSW52YXJpYW50IHZpb2xhdGlvbjogJHttZXNzYWdlfWApO1xufTtcbiIsImNvbnN0IGlzVHlwZSA9ICh0OiBzdHJpbmcsIHY6IGFueSkgPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSBgW29iamVjdCAke3R9XWA7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNOb3ROdWxsID0gKHY6IGFueSkgPT4gdiAhPT0gbnVsbCAmJiB2ICE9PSB1bmRlZmluZWQ7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNTdHJpbmcgPSAodjogYW55KSA9PiB2ICYmIHR5cGVvZiB2ID09PSBcInN0cmluZ1wiICYmIC9cXFMvLnRlc3Qodik7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNOdW1iZXIgPSAodjogYW55KSA9PiBpc1R5cGUoXCJOdW1iZXJcIiwgdikgJiYgaXNGaW5pdGUodikgJiYgIWlzTmFOKHBhcnNlRmxvYXQodikpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRnVuY3Rpb24gPSAodjogYW55KSA9PiB2IGluc3RhbmNlb2YgRnVuY3Rpb247XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNPYmplY3RPckVtcHR5ID0gKHY6IGFueSkgPT4gaXNUeXBlKFwiT2JqZWN0XCIsIHYpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQXJyYXlPckVtcHR5ID0gKHY6IGFueSkgPT4gaXNUeXBlKFwiQXJyYXlcIiwgdik7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNBcnJheSA9ICh2OiBhbnkpID0+ICghaXNBcnJheU9yRW1wdHkodikgPyBmYWxzZSA6IHYubGVuZ3RoID4gMCk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNPYmplY3QgPSAodjogYW55KSA9PiB7XG4gIGlmICghaXNPYmplY3RPckVtcHR5KHYpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gdikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodiwga2V5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsImltcG9ydCAqIGFzIGJhc2U2NCBmcm9tIFwiYmFzZS02NFwiO1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tIFwiLi9pc1wiO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgcGF5bG9hZCBmcm9tIGEgSldUXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSAge1N0cmluZ30gdG9rZW4gVGhlIEpXVCB0byByZXRyaWV2ZSB0aGUgcGF5bG9hZCBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIFRoZSBKV1QgcGF5bG9hZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF5bG9hZDxUIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0Pih0b2tlbjogc3RyaW5nKTogVCB7XG4gIGlmICghdG9rZW4gfHwgdG9rZW4ubGVuZ3RoIDwgMCB8fCB0b2tlbi5zcGxpdChcIi5cIikubGVuZ3RoIDw9IDApIHtcbiAgICAvLyBubyB0b2tlbiBvciBpbnZhbGlkIHRva2VuIGVxdWFscyBubyBwYXlsb2FkXG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHBheWxvYWRCYXNlNjQgPSB0b2tlblxuICAgICAgLnNwbGl0KFwiLlwiKVsxXVxuICAgICAgLnJlcGxhY2UoXCItXCIsIFwiK1wiKVxuICAgICAgLnJlcGxhY2UoXCJfXCIsIFwiL1wiKTtcbiAgICBjb25zdCBwYXlsb2FkRGVjb2RlZCA9IGJhc2U2NC5kZWNvZGUocGF5bG9hZEJhc2U2NCk7XG4gICAgY29uc3QgcGF5bG9hZE9iamVjdCA9IEpTT04ucGFyc2UocGF5bG9hZERlY29kZWQpO1xuXG4gICAgaWYgKGlzTnVtYmVyKHBheWxvYWRPYmplY3QuZXhwKSkge1xuICAgICAgcGF5bG9hZE9iamVjdC5leHAgPSBuZXcgRGF0ZShwYXlsb2FkT2JqZWN0LmV4cCAqIDEwMDApO1xuICAgIH1cblxuICAgIHJldHVybiBwYXlsb2FkT2JqZWN0O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyByZXR1cm4gZW1wdHkgcGF5bG9hZCBpbiBjYXNlIG9mIGFuIGVycm9yXG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=