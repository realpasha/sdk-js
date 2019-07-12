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
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

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
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
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
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

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
  return createInstance(utils.merge(defaults, instanceConfig));
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


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

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
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

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
  return error;
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
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
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
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
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

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


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
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2Jhc2UtNjQvYmFzZTY0LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL2Zvcm1hdHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy9BUEkudHMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvQXV0aGVudGljYXRpb24udHMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvQ29uY3VycmVuY3lNYW5hZ2VyLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL0NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvU0RLLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3V0aWxzL2NvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvdXRpbHMvaW52YXJpYW50LnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3V0aWxzL2lzLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3V0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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsSUFFVTtBQUNaO0FBQ0EsRUFBRSxtQ0FBTztBQUNUO0FBQ0EsR0FBRztBQUFBLG9HQUFDO0FBQ0osRUFBRSxNQUFNLFlBVU47O0FBRUYsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx6Qjs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pCYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsK0NBQVM7QUFDN0IsY0FBYyxtQkFBTyxDQUFDLG1EQUFXO0FBQ2pDOztBQUVBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsS0FBSztBQUNMLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFD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QyxDQUFDO1FBQ3BELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFakQsSUFBSSxhQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUN4RDtRQUVELE9BQU8sYUFBYSxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWiwyQ0FBMkM7UUFDM0MsT0FBTyxFQUFPLENBQUM7S0FDaEI7QUFDSCxDQUFDO0FBdkJELGdDQXVCQyIsImZpbGUiOiJkaXJlY3R1cy1zZGsudW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJEaXJlY3R1c1NES1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi8uLi9kZWZhdWx0cycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB7bWV0aG9kOiAnZ2V0J30sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBidG9hIHBvbHlmaWxsIGZvciBJRTwxMCBjb3VydGVzeSBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcblxudmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcblxuZnVuY3Rpb24gRSgpIHtcbiAgdGhpcy5tZXNzYWdlID0gJ1N0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3Rlcic7XG59XG5FLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcbkUucHJvdG90eXBlLmNvZGUgPSA1O1xuRS5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBidG9hKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIGZvciAoXG4gICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJcbiAgICB2YXIgYmxvY2ssIGNoYXJDb2RlLCBpZHggPSAwLCBtYXAgPSBjaGFycztcbiAgICAvLyBpZiB0aGUgbmV4dCBzdHIgaW5kZXggZG9lcyBub3QgZXhpc3Q6XG4gICAgLy8gICBjaGFuZ2UgdGhlIG1hcHBpbmcgdGFibGUgdG8gXCI9XCJcbiAgICAvLyAgIGNoZWNrIGlmIGQgaGFzIG5vIGZyYWN0aW9uYWwgZGlnaXRzXG4gICAgc3RyLmNoYXJBdChpZHggfCAwKSB8fCAobWFwID0gJz0nLCBpZHggJSAxKTtcbiAgICAvLyBcIjggLSBpZHggJSAxICogOFwiIGdlbmVyYXRlcyB0aGUgc2VxdWVuY2UgMiwgNCwgNiwgOFxuICAgIG91dHB1dCArPSBtYXAuY2hhckF0KDYzICYgYmxvY2sgPj4gOCAtIGlkeCAlIDEgKiA4KVxuICApIHtcbiAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGlkeCArPSAzIC8gNCk7XG4gICAgaWYgKGNoYXJDb2RlID4gMHhGRikge1xuICAgICAgdGhyb3cgbmV3IEUoKTtcbiAgICB9XG4gICAgYmxvY2sgPSBibG9jayA8PCA4IHwgY2hhckNvZGU7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidG9hO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIi8qISBodHRwOi8vbXRocy5iZS9iYXNlNjQgdjAuMS4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgZDtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMC4xLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdkZWZhdWx0JzogJ1JGQzM5ODYnLFxuICAgIGZvcm1hdHRlcnM6IHtcbiAgICAgICAgUkZDMTczODogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIFJGQzM5ODY6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBSRkMxNzM4OiAnUkZDMTczOCcsXG4gICAgUkZDMzk4NjogJ1JGQzM5ODYnXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBhcnJheVByZWZpeEdlbmVyYXRvcnMgPSB7XG4gICAgYnJhY2tldHM6IGZ1bmN0aW9uIGJyYWNrZXRzKHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgICB9LFxuICAgIGNvbW1hOiAnY29tbWEnLFxuICAgIGluZGljZXM6IGZ1bmN0aW9uIGluZGljZXMocHJlZml4LCBrZXkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbJyArIGtleSArICddJztcbiAgICB9LFxuICAgIHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBwdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG52YXIgcHVzaFRvQXJyYXkgPSBmdW5jdGlvbiAoYXJyLCB2YWx1ZU9yQXJyYXkpIHtcbiAgICBwdXNoLmFwcGx5KGFyciwgaXNBcnJheSh2YWx1ZU9yQXJyYXkpID8gdmFsdWVPckFycmF5IDogW3ZhbHVlT3JBcnJheV0pO1xufTtcblxudmFyIHRvSVNPID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhZGRRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBmb3JtYXR0ZXI6IGZvcm1hdHMuZm9ybWF0dGVyc1tmb3JtYXRzWydkZWZhdWx0J11dLFxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBpbmRpY2VzOiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgb2JqZWN0LFxuICAgIHByZWZpeCxcbiAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICBza2lwTnVsbHMsXG4gICAgZW5jb2RlcixcbiAgICBmaWx0ZXIsXG4gICAgc29ydCxcbiAgICBhbGxvd0RvdHMsXG4gICAgc2VyaWFsaXplRGF0ZSxcbiAgICBmb3JtYXR0ZXIsXG4gICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICBjaGFyc2V0XG4pIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgICB9IGVsc2UgaWYgKGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgaXNBcnJheShvYmopKSB7XG4gICAgICAgIG9iaiA9IG9iai5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0KSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gZW5jb2RlVmFsdWVzT25seSA/IHByZWZpeCA6IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0KTtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCkpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKGlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHB1c2hUb0FycmF5KHZhbHVlcywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHR5cGVvZiBnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnZnVuY3Rpb24nID8gZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSkgOiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBwcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgICAgICBjaGFyc2V0XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG52YXIgbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZW5jb2RlciAhPT0gbnVsbCAmJiBvcHRzLmVuY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRzLmNoYXJzZXQgfHwgZGVmYXVsdHMuY2hhcnNldDtcbiAgICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICBpZiAodHlwZW9mIG9wdHMuZm9ybWF0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIWhhcy5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0cy5mb3JtYXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0ID0gb3B0cy5mb3JtYXQ7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcblxuICAgIHZhciBmaWx0ZXIgPSBkZWZhdWx0cy5maWx0ZXI7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJyB8fCBpc0FycmF5KG9wdHMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRzLmZpbHRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRRdWVyeVByZWZpeDogdHlwZW9mIG9wdHMuYWRkUXVlcnlQcmVmaXggPT09ICdib29sZWFuJyA/IG9wdHMuYWRkUXVlcnlQcmVmaXggOiBkZWZhdWx0cy5hZGRRdWVyeVByZWZpeCxcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRzLmRlbGltaXRlcixcbiAgICAgICAgZW5jb2RlOiB0eXBlb2Ygb3B0cy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlLFxuICAgICAgICBlbmNvZGVyOiB0eXBlb2Ygb3B0cy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcixcbiAgICAgICAgZW5jb2RlVmFsdWVzT25seTogdHlwZW9mIG9wdHMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyLFxuICAgICAgICBzZXJpYWxpemVEYXRlOiB0eXBlb2Ygb3B0cy5zZXJpYWxpemVEYXRlID09PSAnZnVuY3Rpb24nID8gb3B0cy5zZXJpYWxpemVEYXRlIDogZGVmYXVsdHMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgc2tpcE51bGxzOiB0eXBlb2Ygb3B0cy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdHMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzLFxuICAgICAgICBzb3J0OiB0eXBlb2Ygb3B0cy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0cy5zb3J0IDogbnVsbCxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpO1xuXG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIGZpbHRlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob3B0aW9ucy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlGb3JtYXQ7XG4gICAgaWYgKG9wdHMgJiYgb3B0cy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmFycmF5Rm9ybWF0O1xuICAgIH0gZWxzZSBpZiAob3B0cyAmJiAnaW5kaWNlcycgaW4gb3B0cykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgICAgIG9iaktleXMuc29ydChvcHRpb25zLnNvcnQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAob3B0aW9ucy5za2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHB1c2hUb0FycmF5KGtleXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgb3B0aW9ucy5za2lwTnVsbHMsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZSA/IG9wdGlvbnMuZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBvcHRpb25zLmZpbHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuc29ydCxcbiAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dEb3RzLFxuICAgICAgICAgICAgb3B0aW9ucy5zZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgb3B0aW9ucy5mb3JtYXR0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICBvcHRpb25zLmNoYXJzZXRcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGpvaW5lZCA9IGtleXMuam9pbihvcHRpb25zLmRlbGltaXRlcik7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICAgIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICBpZiAob3B0aW9ucy5jaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKSwgdGhlIFwibnVtZXJpYyBlbnRpdHlcIiByZXByZXNlbnRhdGlvbiBvZiBhIGNoZWNrbWFya1xuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJ+KckycpXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JUUyJTlDJTkzJic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgaGV4VGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59KCkpO1xuXG52YXIgY29tcGFjdFF1ZXVlID0gZnVuY3Rpb24gY29tcGFjdFF1ZXVlKHF1ZXVlKSB7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iai5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2pdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wYWN0ZWQucHVzaChvYmpbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5vYmpbaXRlbS5wcm9wXSA9IGNvbXBhY3RlZDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBhcnJheVRvT2JqZWN0ID0gZnVuY3Rpb24gYXJyYXlUb09iamVjdChzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0gb3B0aW9ucyAmJiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9ialtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoKG9wdGlvbnMgJiYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSkgfHwgIWhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW3RhcmdldCwgc291cmNlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQgfHwgdHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBtZXJnZVRhcmdldCA9IHRhcmdldDtcbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmICFpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgbWVyZ2VUYXJnZXQgPSBhcnJheVRvT2JqZWN0KHRhcmdldCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiBpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbCh0YXJnZXQsIGkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldEl0ZW0gPSB0YXJnZXRbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEl0ZW0gJiYgdHlwZW9mIHRhcmdldEl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IG1lcmdlKHRhcmdldEl0ZW0sIGl0ZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoaGFzLmNhbGwoYWNjLCBrZXkpKSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IG1lcmdlKGFjY1trZXldLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbWVyZ2VUYXJnZXQpO1xufTtcblxudmFyIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnblNpbmdsZVNvdXJjZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB0YXJnZXQpO1xufTtcblxudmFyIGRlY29kZSA9IGZ1bmN0aW9uIChzdHIsIGRlY29kZXIsIGNoYXJzZXQpIHtcbiAgICB2YXIgc3RyV2l0aG91dFBsdXMgPSBzdHIucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAvLyB1bmVzY2FwZSBuZXZlciB0aHJvd3MsIG5vIHRyeS4uLmNhdGNoIG5lZWRlZDpcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzLnJlcGxhY2UoLyVbMC05YS1mXXsyfS9naSwgdW5lc2NhcGUpO1xuICAgIH1cbiAgICAvLyB1dGYtOFxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyV2l0aG91dFBsdXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzO1xuICAgIH1cbn07XG5cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoc3RyLCBkZWZhdWx0RW5jb2RlciwgY2hhcnNldCkge1xuICAgIC8vIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IEJyaWFuIFdoaXRlIChtc2NkZXgpIGZvciB0aGUgaW8uanMgY29yZSBxdWVyeXN0cmluZyBsaWJyYXJ5LlxuICAgIC8vIEl0IGhhcyBiZWVuIGFkYXB0ZWQgaGVyZSBmb3Igc3RyaWN0ZXIgYWRoZXJlbmNlIHRvIFJGQyAzOTg2XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIgOiBTdHJpbmcoc3RyKTtcblxuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZShzdHJpbmcpLnJlcGxhY2UoLyV1WzAtOWEtZl17NH0vZ2ksIGZ1bmN0aW9uICgkMCkge1xuICAgICAgICAgICAgcmV0dXJuICclMjYlMjMnICsgcGFyc2VJbnQoJDAuc2xpY2UoMiksIDE2KSArICclM0InO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcGFjdFF1ZXVlKHF1ZXVlKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBpc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxudmFyIGNvbWJpbmUgPSBmdW5jdGlvbiBjb21iaW5lKGEsIGIpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KGEsIGIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXJyYXlUb09iamVjdDogYXJyYXlUb09iamVjdCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBjb21iaW5lOiBjb21iaW5lLFxuICAgIGNvbXBhY3Q6IGNvbXBhY3QsXG4gICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgZW5jb2RlOiBlbmNvZGUsXG4gICAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICAgIGlzUmVnRXhwOiBpc1JlZ0V4cCxcbiAgICBtZXJnZTogbWVyZ2Vcbn07XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJpbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSB9IGZyb20gXCJheGlvc1wiO1xuaW1wb3J0ICogYXMgcXNTdHJpbmdpZnkgZnJvbSBcInFzL2xpYi9zdHJpbmdpZnlcIjtcblxuaW1wb3J0IHsgQXV0aGVudGljYXRpb24sIElBdXRoZW50aWNhdGlvbiB9IGZyb20gXCIuL0F1dGhlbnRpY2F0aW9uXCI7XG5pbXBvcnQgeyBjb25jdXJyZW5jeU1hbmFnZXIgfSBmcm9tIFwiLi9Db25jdXJyZW5jeU1hbmFnZXJcIjtcbmltcG9ydCB7IElDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4vQ29uZmlndXJhdGlvblwiO1xuXG4vLyBTY2hlbWUgdHlwZXNcbmltcG9ydCB7IEJvZHlUeXBlIH0gZnJvbSBcIi4vc2NoZW1lcy9odHRwL0JvZHlcIjtcbmltcG9ydCB7IFJlcXVlc3RNZXRob2QgfSBmcm9tIFwiLi9zY2hlbWVzL2h0dHAvUmVxdWVzdFwiO1xuaW1wb3J0IHsgSUVycm9yUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0Vycm9yXCI7XG5cbi8vIFV0aWxpdGllc1xuaW1wb3J0IHsgaW52YXJpYW50IH0gZnJvbSBcIi4vdXRpbHMvaW52YXJpYW50XCI7XG5pbXBvcnQgeyBpc0FycmF5T3JFbXB0eSwgaXNPYmplY3RPckVtcHR5LCBpc1N0cmluZyB9IGZyb20gXCIuL3V0aWxzL2lzXCI7XG5pbXBvcnQgeyBnZXRQYXlsb2FkIH0gZnJvbSBcIi4vdXRpbHMvcGF5bG9hZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBUEkge1xuICBhdXRoOiBJQXV0aGVudGljYXRpb247XG4gIHhocjogQXhpb3NJbnN0YW5jZTtcbiAgY29uY3VycmVudDogUmV0dXJuVHlwZTx0eXBlb2YgY29uY3VycmVuY3lNYW5hZ2VyPjtcbiAgcmVzZXQoKTogdm9pZDtcbiAgZ2V0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcsIHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8VD47XG4gIHBvc3Q8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keT86IEJvZHlUeXBlLCBwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPFQ+O1xuICBwYXRjaDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBib2R5PzogQm9keVR5cGUsIHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8VD47XG4gIHB1dDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBib2R5PzogQm9keVR5cGUsIHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8VD47XG4gIGRlbGV0ZTxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nKTogUHJvbWlzZTxUPjtcbiAgZ2V0UGF5bG9hZDxUIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0PigpOiBUO1xuICByZXF1ZXN0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KFxuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZCxcbiAgICBlbmRwb2ludDogc3RyaW5nLFxuICAgIHBhcmFtcz86IG9iamVjdCxcbiAgICBkYXRhPzogb2JqZWN0LFxuICAgIG5vRW52PzogYm9vbGVhbixcbiAgICBoZWFkZXJzPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSxcbiAgICBza2lwUGFyc2VUb0pTT04/OiBib29sZWFuXG4gICk6IFByb21pc2U8VD47XG59XG5cbi8qKlxuICogQVBJIGRlZmluaXRpb24gZm9yIEhUVFAgdHJhbnNhY3Rpb25zXG4gKiBAdXNlcyBBdXRoZW50aWNhdGlvblxuICogQHVzZXMgYXhpb3NcbiAqL1xuZXhwb3J0IGNsYXNzIEFQSSBpbXBsZW1lbnRzIElBUEkge1xuICBwdWJsaWMgYXV0aDogSUF1dGhlbnRpY2F0aW9uO1xuICBwdWJsaWMgeGhyID0gYXhpb3MuY3JlYXRlKHtcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBxc1N0cmluZ2lmeSxcbiAgICB0aW1lb3V0OiAxMCAqIDYwICogMTAwMCwgLy8gMTAgbWluXG4gIH0pO1xuICBwdWJsaWMgY29uY3VycmVudCA9IGNvbmN1cnJlbmN5TWFuYWdlcih0aGlzLnhociwgMTApO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBJQ29uZmlndXJhdGlvbikge1xuICAgIHRoaXMuYXV0aCA9IG5ldyBBdXRoZW50aWNhdGlvbihjb25maWcsIHtcbiAgICAgIHBvc3Q6IHRoaXMucG9zdC5iaW5kKHRoaXMpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgY2xpZW50IGluc3RhbmNlIGJ5IGxvZ2dpbmcgb3V0IGFuZCByZW1vdmluZyB0aGUgVVJMIGFuZCBwcm9qZWN0XG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRoLmxvZ291dCgpO1xuICAgIHRoaXMuY29uZmlnLmRlbGV0ZUh5ZHJhdGVkQ29uZmlnKCk7XG4gIH1cblxuICAvLy8gUkVRVUVTVCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR0VUIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICogQHR5cGVwYXJhbSBUICAgcmVzcG9uc2UgdHlwZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFQ+fVxuICAgKi9cbiAgcHVibGljIGdldDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVuZHBvaW50KSwgXCJlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIGVuZHBvaW50LCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBPU1QgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgKiBAdHlwZXBhcmFtIFQgICByZXNwb25zZSB0eXBlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gICAqL1xuICBwdWJsaWMgcG9zdDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBib2R5OiBCb2R5VHlwZSA9IHt9LCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVuZHBvaW50KSwgXCJlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChBcnJheS5pc0FycmF5KGJvZHkpID8gaXNBcnJheU9yRW1wdHkoYm9keSkgOiBpc09iamVjdE9yRW1wdHkoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIGFycmF5IG9yIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VD4oXCJwb3N0XCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBBVENIIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICogQHR5cGVwYXJhbSBUICAgcmVzcG9uc2UgdHlwZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFQ+fVxuICAgKi9cbiAgcHVibGljIHBhdGNoPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcsIGJvZHk6IEJvZHlUeXBlID0ge30sIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZW5kcG9pbnQpLCBcImVuZHBvaW50IG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KEFycmF5LmlzQXJyYXkoYm9keSkgPyBpc0FycmF5T3JFbXB0eShib2R5KSA6IGlzT2JqZWN0T3JFbXB0eShib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gYXJyYXkgb3Igb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxUPihcInBhdGNoXCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBVVCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqIEB0eXBlcGFyYW0gVCAgIHJlc3BvbnNlIHR5cGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyBwdXQ8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keTogQm9keVR5cGUgPSB7fSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoQXJyYXkuaXNBcnJheShib2R5KSA/IGlzQXJyYXlPckVtcHR5KGJvZHkpIDogaXNPYmplY3RPckVtcHR5KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBhcnJheSBvciBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PFQ+KFwicHV0XCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERFTEVURSBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqIEB0eXBlcGFyYW0gVCAgIHJlc3BvbnNlIHR5cGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyBkZWxldGU8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VD4oXCJkZWxldGVcIiwgZW5kcG9pbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBheWxvYWQgb2YgdGhlIGN1cnJlbnQgdG9rZW4sIHJldHVybiB0eXBlIGNhbiBiZSBnZW5lcmljXG4gICAqIEB0eXBlcGFyYW0gVCAgIGV4dGVuZHMgb2JqZWN0LCBwYXlsb2FkIHR5cGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyBnZXRQYXlsb2FkPFQgZXh0ZW5kcyBvYmplY3QgPSBvYmplY3Q+KCk6IFQge1xuICAgIGlmICghaXNTdHJpbmcodGhpcy5jb25maWcudG9rZW4pKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0UGF5bG9hZDxUPih0aGlzLmNvbmZpZy50b2tlbik7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhbiBBUEkgcmVxdWVzdCB0byB0aGUgRGlyZWN0dXMgQVBJXG4gICAqIEBwYXJhbSB7UmVxdWVzdE1ldGhvZH0gbWV0aG9kICAgIFNlbGVjdGVkIEhUVFAgbWV0aG9kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbmRwb2ludCAgICAgICAgIEVuZHBvaW50IGRlZmluaXRpb24gYXMgcGF0aFxuICAgKiBAcGFyYW0ge29iamVjdD17fX0gcGFyYW1zICAgICAgICBRdWVyeSBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7b2JqZWN0PXt9fSBkYXRhICAgICAgICAgIERhdGEgcGFzc2VkIHRvIGRpcmVjdHVzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gbm9FbnYgICAgIERvIG5vdCBpbmNsdWRlIHRoZSBgZW52YCBpbiB0aGUgdXJsIChmb3Igc3lzdGVtIGNhbGxzKVxuICAgKiBAcGFyYW0ge29iamVjdD17fX0gaGVhZGVycyAgICAgICBPcHRpb25hbCBoZWFkZXJzIHRvIGluY2x1ZGVcbiAgICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSBza2lwUGFyc2VUb0pTT04gIFdoZXRoZXIgdG8gc2tpcCBgSlNPTi5wYXJzZWAgb3Igbm90XG4gICAqIEB0eXBlcGFyYW0gVCAgICAgICAgICAgICAgICAgICAgIFJlc3BvbnNlIHR5cGUgZGVmaW5pdGlvbiwgZGVmYXVsdHMgdG8gYGFueWBcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyByZXF1ZXN0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KFxuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZCxcbiAgICBlbmRwb2ludDogc3RyaW5nLFxuICAgIHBhcmFtczogb2JqZWN0ID0ge30sXG4gICAgZGF0YTogb2JqZWN0ID0ge30sXG4gICAgbm9FbnY6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge30sXG4gICAgc2tpcFBhcnNlVG9KU09OOiBib29sZWFuID0gZmFsc2VcbiAgKTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKG1ldGhvZCksIFwibWV0aG9kIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVuZHBvaW50KSwgXCJlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKHRoaXMuY29uZmlnLnVybCksIFwibWFpbiB1cmwgbXVzdCBiZSBkZWZpbmVkIChzZWUgY29uc3RydWN0b3IpXCIpO1xuICAgIGludmFyaWFudChBcnJheS5pc0FycmF5KGRhdGEpID8gaXNBcnJheU9yRW1wdHkoZGF0YSkgOiBpc09iamVjdE9yRW1wdHkoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIGFycmF5IG9yIG9iamVjdFwiKTtcblxuICAgIGxldCBiYXNlVVJMID0gYCR7dGhpcy5jb25maWcudXJsfS9gO1xuXG4gICAgaWYgKG5vRW52ID09PSBmYWxzZSkge1xuICAgICAgYmFzZVVSTCArPSBgJHt0aGlzLmNvbmZpZy5wcm9qZWN0fS9gO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgYmFzZVVSTCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXJzLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgdXJsOiBlbmRwb2ludCxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnRva2VuICYmIGlzU3RyaW5nKHRoaXMuY29uZmlnLnRva2VuKSAmJiB0aGlzLmNvbmZpZy50b2tlbi5sZW5ndGggPiAwKSB7XG4gICAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgIHJlcXVlc3RPcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0aGlzLmNvbmZpZy50b2tlbn1gO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnhoclxuICAgICAgLnJlcXVlc3QocmVxdWVzdE9wdGlvbnMpXG4gICAgICAudGhlbigocmVzOiB7IGRhdGE6IGFueSB9KSA9PiByZXMuZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZURhdGE6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlRGF0YSB8fCByZXNwb25zZURhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlRGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBza2lwUGFyc2VUb0pTT04gPyByZXNwb25zZURhdGEgOiBKU09OLnBhcnNlKHJlc3BvbnNlRGF0YSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlRGF0YSBhcyBUO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IElFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgIHRocm93IGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuanNvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIGNvZGU6IC0yLFxuICAgICAgICAgICAgZGF0YTogZXJyb3IuZGF0YSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5lcnJvcixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQVBJIHJldHVybmVkIGludmFsaWQgSlNPTlwiLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmV0d29yayBFcnJvclwiLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJQ29uZmlndXJhdGlvbiwgSUNvbmZpZ3VyYXRpb25WYWx1ZXMgfSBmcm9tIFwiLi9Db25maWd1cmF0aW9uXCI7XG5cbi8vIE90aGVyIGNsYXNzZXNcbmltcG9ydCB7IElBUEkgfSBmcm9tIFwiLi9BUElcIjtcblxuLy8gU2NoZW1lIHR5cGVzXG5pbXBvcnQgeyBJQXV0aGVudGljYXRlUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL2F1dGgvQXV0aGVudGljYXRlXCI7XG5pbXBvcnQgeyBJTG9naW5DcmVkZW50aWFscywgSUxvZ2luT3B0aW9ucyB9IGZyb20gXCIuL3NjaGVtZXMvYXV0aC9Mb2dpblwiO1xuaW1wb3J0IHsgSUxvZ2luUmVzcG9uc2UsIFJlZnJlc2hJZk5lZWRlZFJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Mb2dpblwiO1xuaW1wb3J0IHsgSVJlZnJlc2hUb2tlblJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Ub2tlblwiO1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7IGludmFyaWFudCB9IGZyb20gXCIuL3V0aWxzL2ludmFyaWFudFwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNPYmplY3QsIGlzU3RyaW5nIH0gZnJvbSBcIi4vdXRpbHMvaXNcIjtcbmltcG9ydCB7IGdldFBheWxvYWQgfSBmcm9tIFwiLi91dGlscy9wYXlsb2FkXCI7XG5cbmludGVyZmFjZSBJQXV0aGVudGljYXRpb25SZWZyZXNoRXJyb3Ige1xuICBjb2RlPzogbnVtYmVyO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBJQXV0aGVudGljYXRpb25JbmplY3RhYmxlUHJvcHMge1xuICBwb3N0OiBJQVBJW1wicG9zdFwiXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQXV0aGVudGljYXRpb24ge1xuICByZWZyZXNoSW50ZXJ2YWw/OiBudW1iZXI7XG4gIGlzTG9nZ2VkSW4oKTogYm9vbGVhbjtcbiAgbG9naW4oY3JlZGVudGlhbHM6IElMb2dpbkNyZWRlbnRpYWxzLCBvcHRpb25zPzogSUxvZ2luT3B0aW9ucyk6IFByb21pc2U8SUxvZ2luUmVzcG9uc2U+O1xuICBsb2dvdXQoKTogdm9pZDtcbiAgcmVmcmVzaElmTmVlZGVkKCk6IFByb21pc2U8W2Jvb2xlYW4sIEVycm9yP10+O1xuICByZWZyZXNoKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPElSZWZyZXNoVG9rZW5SZXNwb25zZT47XG59XG5cbi8qKlxuICogSGFuZGxlcyBhbGwgYXV0aGVudGljYXRpb24gcmVsYXRlZCBsb2dpYywgZGVjb3VwbGVkIGZyb20gdGhlIGNvcmVcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb24gaW1wbGVtZW50cyBJQXV0aGVudGljYXRpb24ge1xuICAvKipcbiAgICogQ3VycmVudCBzZXQgYXV0by1yZWZyZXNoIGludGVydmFsIG9yIHVuZGVmaW5lZFxuICAgKiBAdHlwZSB7bnVtYmVyfHVuZGVmaW5lZH1cbiAgICovXG4gIHB1YmxpYyByZWZyZXNoSW50ZXJ2YWw/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGN1c3RvbWl6ZWQgZXJyb3IgaGFuZGxlclxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgb25BdXRvUmVmcmVzaEVycm9yPzogKG1zZzogSUF1dGhlbnRpY2F0aW9uUmVmcmVzaEVycm9yKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBjdXN0b21pemVkIHN1Y2Nlc3MgaGFuZGxlclxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgb25BdXRvUmVmcmVzaFN1Y2Nlc3M/OiAoY29uZmlnOiBJQ29uZmlndXJhdGlvblZhbHVlcykgPT4gdm9pZDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBhdXRoZW50aWNhdGlvbiBpbnN0YW5jZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtJQ29uZmlndXJhdGlvbn0gY29uZmlnXG4gICAqIEBwYXJhbSB7SUF1dGhlbnRpY2F0aW9uSW5qZWN0YWJsZVByb3BzfSBpbmplY3RcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBJQ29uZmlndXJhdGlvbiwgcHJpdmF0ZSBpbmplY3Q6IElBdXRoZW50aWNhdGlvbkluamVjdGFibGVQcm9wcykge1xuICAgIC8vIE9ubHkgc3RhcnQgdGhlIGF1dG8gcmVmcmVzaCBpbnRlcnZhbCBpZiB0aGUgdG9rZW4gZXhpc3RzIGFuZCBpdCdzIGEgSldUXG4gICAgaWYgKGNvbmZpZy50b2tlbiAmJiBjb25maWcudG9rZW4uaW5jbHVkZXMoXCIuXCIpKSB7XG4gICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBjdXJyZW50IGF1dGggc3RhdHVzIGlzIGxvZ2dlZCBpblxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIGlzTG9nZ2VkSW4oKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgaXNTdHJpbmcodGhpcy5jb25maWcudG9rZW4pICYmXG4gICAgICBpc1N0cmluZyh0aGlzLmNvbmZpZy51cmwpICYmXG4gICAgICBpc1N0cmluZyh0aGlzLmNvbmZpZy5wcm9qZWN0KSAmJlxuICAgICAgaXNPYmplY3QodGhpcy5nZXRQYXlsb2FkKCkpXG4gICAgKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcubG9jYWxFeHAgPiBEYXRlLm5vdygpKSB7XG4gICAgICAgIC8vIE5vdCBleHBpcmVkLCBzdWNjZWVkXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTG9naW4gdG8gdGhlIEFQSTsgR2V0cyBhIG5ldyB0b2tlbiBmcm9tIHRoZSBBUEkgYW5kIHN0b3JlcyBpdCBpbiB0aGlzLnRva2VuLlxuICAgKiBAcGFyYW0ge0lMb2dpbkNyZWRlbnRpYWxzfSBjcmVkZW50aWFscyAgIFVzZXIgbG9naW4gY3JlZGVudGlhbHNcbiAgICogQHBhcmFtIHtJTG9naW5PcHRpb25zP30gb3B0aW9ucyAgICAgICAgICBBZGRpdGlvbmFsIG9wdGlvbnMgcmVnYXJkaW5nIHBlcnNpc3RhbmNlIGFuZCBjby5cbiAgICogQHJldHVybiB7UHJvbWlzZTxJTG9naW5SZXNwb25zZT59XG4gICAqL1xuICBwdWJsaWMgbG9naW4oY3JlZGVudGlhbHM6IElMb2dpbkNyZWRlbnRpYWxzLCBvcHRpb25zPzogSUxvZ2luT3B0aW9ucyk6IFByb21pc2U8SUxvZ2luUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoY3JlZGVudGlhbHMpLCBcIm1hbGZvcm1lZCBjcmVkZW50aWFsc1wiKTtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBpc1N0cmluZyhjcmVkZW50aWFscy5lbWFpbCkgJiYgaXNTdHJpbmcoY3JlZGVudGlhbHMucGFzc3dvcmQpLFxuICAgICAgXCJlbWFpbCAmIHBhc3N3b3JkIGFyZSByZXF1aXJlZCBpbiBjcmVkZW50aWFsc1wiXG4gICAgKTtcblxuICAgIHRoaXMuY29uZmlnLnRva2VuID0gbnVsbDtcblxuICAgIGlmIChpc1N0cmluZyhjcmVkZW50aWFscy51cmwpKSB7XG4gICAgICB0aGlzLmNvbmZpZy51cmwgPSBjcmVkZW50aWFscy51cmw7XG4gICAgfVxuXG4gICAgaWYgKGlzU3RyaW5nKGNyZWRlbnRpYWxzLnByb2plY3QpKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wcm9qZWN0ID0gY3JlZGVudGlhbHMucHJvamVjdDtcbiAgICB9XG5cbiAgICBpZiAoY3JlZGVudGlhbHMucGVyc2lzdCB8fCAob3B0aW9ucyAmJiBvcHRpb25zLnBlcnNpc3QpIHx8IHRoaXMuY29uZmlnLnBlcnNpc3QpIHtcbiAgICAgIC8vIHVzZSBpbnRlcnZhbCBmb3IgbG9naW4gcmVmcmVzaCB3aGVuIG9wdGlvbiBwZXJzaXN0IGVuYWJsZWRcbiAgICAgIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmluamVjdFxuICAgICAgICAucG9zdChcIi9hdXRoL2F1dGhlbnRpY2F0ZVwiLCB7XG4gICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlczogSUF1dGhlbnRpY2F0ZVJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgLy8gc2F2ZSBuZXcgdG9rZW4gaW4gY29uZmlndXJhdGlvblxuICAgICAgICAgIHJldHVybiAodGhpcy5jb25maWcudG9rZW4gPSByZXMuZGF0YS50b2tlbik7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgLy8gZXhwaXJ5IGRhdGUgaXMgdGhlIG1vbWVudCB3ZSBnb3QgdGhlIHRva2VuICsgNSBtaW51dGVzXG4gICAgICAgICAgdGhpcy5jb25maWcubG9jYWxFeHAgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGhpcy5jb25maWcudG9rZW5FeHBpcmF0aW9uVGltZSkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBsb2NhbEV4cDogdGhpcy5jb25maWcubG9jYWxFeHAsXG4gICAgICAgICAgICBwcm9qZWN0OiB0aGlzLmNvbmZpZy5wcm9qZWN0LFxuICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICB1cmw6IHRoaXMuY29uZmlnLnVybCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9ncyB0aGUgdXNlciBvdXQgYnkgXCJmb3JnZXR0aW5nXCIgdGhlIHRva2VuLCBhbmQgY2xlYXJpbmcgdGhlIHJlZnJlc2ggaW50ZXJ2YWxcbiAgICovXG4gIHB1YmxpYyBsb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWcucmVzZXQoKTtcblxuICAgIGlmICh0aGlzLnJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcbiAgICB9XG4gIH1cblxuICAvLy8gUkVGUkVTSCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogUmVmcmVzaCB0aGUgdG9rZW4gaWYgaXQgaXMgYWJvdXQgdG8gZXhwaXJlICh3aXRoaW4gMzAgc2Vjb25kcyBvZiBleHBpcnkgZGF0ZSkuXG4gICAqIC0gQ2FsbHMgb25BdXRvUmVmcmVzaFN1Y2Nlc3Mgd2l0aCB0aGUgbmV3IHRva2VuIGlmIHRoZSByZWZyZXNoaW5nIGlzIHN1Y2Nlc3NmdWwuXG4gICAqIC0gQ2FsbHMgb25BdXRvUmVmcmVzaEVycm9yIGlmIHJlZnJlc2hpbmcgdGhlIHRva2VuIGZhaWxzIGZvciBzb21lIHJlYXNvbi5cbiAgICogQHJldHVybiB7UmVmcmVzaElmTmVlZGVkUmVzcG9uc2V9XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaElmTmVlZGVkKCk6IFByb21pc2U8UmVmcmVzaElmTmVlZGVkUmVzcG9uc2U+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRQYXlsb2FkPHsgZXhwOiBhbnkgfT4oKTtcbiAgICBjb25zdCB7IHRva2VuLCB1cmwsIHByb2plY3QsIGxvY2FsRXhwIH0gPSB0aGlzLmNvbmZpZztcblxuICAgIGlmICghaXNTdHJpbmcodG9rZW4pIHx8ICFpc1N0cmluZyh1cmwpIHx8ICFpc1N0cmluZyhwcm9qZWN0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghcGF5bG9hZCB8fCAhcGF5bG9hZC5leHApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lRGlmZiA9IChsb2NhbEV4cCB8fCAwKSAtIERhdGUubm93KCk7XG5cbiAgICBpZiAodGltZURpZmYgPD0gMCkge1xuICAgICAgLy8gdG9rZW4gaGFzIGV4cGlyZWQsIHNraXBwaW5nIGF1dG8gcmVmcmVzaFxuICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IpKSB7XG4gICAgICAgIHRoaXMub25BdXRvUmVmcmVzaEVycm9yKHtcbiAgICAgICAgICBjb2RlOiAxMDIsXG4gICAgICAgICAgbWVzc2FnZTogXCJhdXRoX2V4cGlyZWRfdG9rZW5cIixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRpbWVEaWZmIDwgMzAwMDApIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxSZWZyZXNoSWZOZWVkZWRSZXNwb25zZT4oKHJlc29sdmU6IChyZXM6IFJlZnJlc2hJZk5lZWRlZFJlc3BvbnNlKSA9PiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKHRva2VuKVxuICAgICAgICAgIC50aGVuKChyZXM6IElSZWZyZXNoVG9rZW5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb25maWcubG9jYWxFeHAgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGhpcy5jb25maWcudG9rZW5FeHBpcmF0aW9uVGltZSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25maWcudG9rZW4gPSByZXMuZGF0YS50b2tlbiB8fCB0b2tlbjtcblxuICAgICAgICAgICAgLy8gaWYgYXV0b3JlZnJlc2ggc3VjY2VlZGVkXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLm9uQXV0b1JlZnJlc2hTdWNjZXNzKSkge1xuICAgICAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hTdWNjZXNzKHRoaXMuY29uZmlnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShbdHJ1ZV0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMub25BdXRvUmVmcmVzaEVycm9yKSkge1xuICAgICAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUoW3RydWUsIGVycm9yXSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKFtmYWxzZV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIHBhc3NlZCB0b2tlbiB0byByZXF1ZXN0IGEgbmV3IG9uZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRva2VuXG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaCh0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxJUmVmcmVzaFRva2VuUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodG9rZW4pLCBcInRva2VuIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5pbmplY3QucG9zdDxJUmVmcmVzaFRva2VuUmVzcG9uc2U+KFwiL2F1dGgvcmVmcmVzaFwiLCB7IHRva2VuIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhbiBpbnRlcnZhbCBvZiAxMCBzZWNvbmRzIHRoYXQgd2lsbCBjaGVjayBpZiB0aGUgdG9rZW4gbmVlZHMgcmVmcmVzaGluZ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW4/fSBmaXJlSW1tZWRpYXRlbHkgICAgSWYgaXQgc2hvdWxkIGltbWVkaWF0ZWx5IGNhbGwgW3JlZnJlc2hJZk5lZWRlZF1cbiAgICovXG4gIHByaXZhdGUgc3RhcnRJbnRlcnZhbChmaXJlSW1tZWRpYXRlbHk/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgdGhpcy5yZWZyZXNoSWZOZWVkZWQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucmVmcmVzaElmTmVlZGVkLmJpbmQodGhpcyksIDEwMDAwKSBhcyBhbnk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFuZCBudWxsaWZpZXMgdGhlIHRva2VuIHJlZnJlc2hpbmcgaW50ZXJ2YWxcbiAgICovXG4gIHByaXZhdGUgc3RvcEludGVydmFsKCk6IHZvaWQge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5yZWZyZXNoSW50ZXJ2YWwpO1xuICAgIHRoaXMucmVmcmVzaEludGVydmFsID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwYXlsb2FkIG9mIHRoZSBjdXJyZW50IHRva2VuLCByZXR1cm4gdHlwZSBjYW4gYmUgZ2VuZXJpY1xuICAgKiBAdHlwZXBhcmFtIFQgICAgIFRoZSBwYXlsb2FkIHJlc3BvbnNlIHR5cGUsIGFyYml0cmFyeSBvYmplY3RcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIHByaXZhdGUgZ2V0UGF5bG9hZDxUIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0PigpOiBUIHtcbiAgICBpZiAoIWlzU3RyaW5nKHRoaXMuY29uZmlnLnRva2VuKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldFBheWxvYWQ8VD4odGhpcy5jb25maWcudG9rZW4pO1xuICB9XG59XG4iLCIvLyB0c2xpbnQ6ZGlzYWJsZTogb2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG5pbXBvcnQgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1JlcXVlc3RDb25maWcsIEF4aW9zUmVzcG9uc2UgfSBmcm9tIFwiYXhpb3NcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJQ29uY3VycmVuY3lRdWV1ZUl0ZW0ge1xuICByZXF1ZXN0OiBBeGlvc1JlcXVlc3RDb25maWc7XG4gIHJlc29sdmVyOiAocXVldWVkUmVxdWVzdDogQXhpb3NSZXF1ZXN0Q29uZmlnKSA9PiBhbnk7XG59XG5cbi8qKlxuICogSGFuZGxpbmcgYW5kIGxpbWl0aW5nIGNvbmN1cnJlbnQgcmVxdWVzdHMgZm9yIHRoZSBBUEkuXG4gKiBAcGFyYW0ge0F4aW9zSW5zdGFuY2V9IGF4aW9zICAgUmVmZXJlbmNlIHRvIHRoZSBjYWxsZXIgaW5zdGFuY2VcbiAqIEBwYXJhbSB7bnVtYmVyPTEwfSBsaW1pdCAgICAgICBXaGVuIHRvIHJlYXRlLWxpbWl0IG91dGdvaW5nIHJlcXVlc3RzXG4gKi9cbmV4cG9ydCBjb25zdCBjb25jdXJyZW5jeU1hbmFnZXIgPSAoYXhpb3M6IEF4aW9zSW5zdGFuY2UsIGxpbWl0OiBudW1iZXIgPSAxMCkgPT4ge1xuICBpZiAobGltaXQgPCAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ29uY3VycmVuY3lNYW5hZ2VyIEVycm9yOiBtaW5pbXVuIGNvbmN1cnJlbnQgcmVxdWVzdHMgaXMgMVwiKTtcbiAgfVxuXG4gIGNvbnN0IGluc3RhbmNlID0ge1xuICAgIGxpbWl0LFxuICAgIHF1ZXVlOiBbXSBhcyBJQ29uY3VycmVuY3lRdWV1ZUl0ZW1bXSxcbiAgICBydW5uaW5nOiBbXSBhcyBJQ29uY3VycmVuY3lRdWV1ZUl0ZW1bXSxcbiAgICBpbnRlcmNlcHRvcnM6IHtcbiAgICAgIHJlcXVlc3Q6IG51bGwsXG4gICAgICByZXNwb25zZTogbnVsbCxcbiAgICB9LFxuICAgIHB1c2gocmVxSGFuZGxlcjogSUNvbmN1cnJlbmN5UXVldWVJdGVtKSB7XG4gICAgICBpbnN0YW5jZS5xdWV1ZS5wdXNoKHJlcUhhbmRsZXIpO1xuICAgICAgaW5zdGFuY2Uuc2hpZnRJbml0aWFsKCk7XG4gICAgfSxcbiAgICBzaGlmdEluaXRpYWwoKTogdm9pZCB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGluc3RhbmNlLnJ1bm5pbmcubGVuZ3RoIDwgaW5zdGFuY2UubGltaXQpIHtcbiAgICAgICAgICBpbnN0YW5jZS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICB9LCAwKTtcbiAgICB9LFxuICAgIHNoaWZ0KCk6IHZvaWQge1xuICAgICAgaWYgKGluc3RhbmNlLnF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBxdWV1ZWQgPSBpbnN0YW5jZS5xdWV1ZS5zaGlmdCgpO1xuXG4gICAgICAgIHF1ZXVlZC5yZXNvbHZlcihxdWV1ZWQucmVxdWVzdCk7XG4gICAgICAgIGluc3RhbmNlLnJ1bm5pbmcucHVzaChxdWV1ZWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXNlIGFzIGludGVyY2VwdG9yLiBRdWV1ZSBvdXRnb2luZyByZXF1ZXN0c1xuICAgIHJlcXVlc3RIYW5kbGVyKHJlcTogQXhpb3NSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBeGlvc1JlcXVlc3RDb25maWc+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgaW5zdGFuY2UucHVzaCh7XG4gICAgICAgICAgcmVxdWVzdDogcmVxLFxuICAgICAgICAgIHJlc29sdmVyOiByZXNvbHZlLFxuICAgICAgICB9IGFzIElDb25jdXJyZW5jeVF1ZXVlSXRlbSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIC8vIHVzZSBhcyBpbnRlcmNlcHRvci4gRXhlY3V0ZSBxdWV1ZWQgcmVxdWVzdCB1cG9uIHJlY2VpdmluZyBhIHJlc3BvbnNlXG4gICAgcmVzcG9uc2VIYW5kbGVyKHJlczogQXhpb3NSZXNwb25zZTxhbnk+KTogQXhpb3NSZXNwb25zZTxhbnk+IHtcbiAgICAgIGluc3RhbmNlLnJ1bm5pbmcuc2hpZnQoKTtcbiAgICAgIGluc3RhbmNlLnNoaWZ0KCk7XG5cbiAgICAgIHJldHVybiByZXM7XG4gICAgfSxcbiAgICBkZXRhY2goKTogdm9pZCB7XG4gICAgICBheGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5lamVjdChpbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVxdWVzdCk7XG4gICAgICBheGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZWplY3QoaW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlc3BvbnNlKTtcbiAgICB9LFxuICAgIGF0dGFjaChsaW1pdENvbmN1cnJlbnRSZXF1ZXN0c1RvPzogbnVtYmVyKTogdm9pZCB7XG4gICAgICBpZiAobGltaXRDb25jdXJyZW50UmVxdWVzdHNUbykge1xuICAgICAgICBpbnN0YW5jZS5saW1pdCA9IGxpbWl0Q29uY3VycmVudFJlcXVlc3RzVG87XG4gICAgICB9XG5cbiAgICAgIC8vIHF1ZXVlIGNvbmN1cnJlbnQgcmVxdWVzdHNcbiAgICAgIGluc3RhbmNlLmludGVyY2VwdG9ycy5yZXF1ZXN0ID0gYXhpb3MuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKGluc3RhbmNlLnJlcXVlc3RIYW5kbGVyKTtcbiAgICAgIGluc3RhbmNlLmludGVyY2VwdG9ycy5yZXNwb25zZSA9IGF4aW9zLmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoXG4gICAgICAgIGluc3RhbmNlLnJlc3BvbnNlSGFuZGxlcixcbiAgICAgICAgaW5zdGFuY2UucmVzcG9uc2VIYW5kbGVyXG4gICAgICApO1xuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufTtcbiIsImltcG9ydCB7IGludmFyaWFudCB9IGZyb20gXCIuL3V0aWxzL2ludmFyaWFudFwiO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tIFwiLi91dGlscy9pc1wiO1xuXG5jb25zdCBTVE9SQUdFX0tFWSA9IFwiZGlyZWN0dXMtc2RrLWpzXCI7XG5cbi8vIGRlZmluaW5nIG5lZWRlZCBtZXRob2RzIGZvciB0aGUgYWJzdHJhY3Qgc3RvcmFnZSBhZGFwdGVyXG5leHBvcnQgaW50ZXJmYWNlIElTdG9yYWdlQVBJIHtcbiAgZ2V0SXRlbTxUIGV4dGVuZHMgYW55ID0gYW55PihrZXk6IHN0cmluZyk6IFQ7XG4gIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkO1xuICByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZDtcbn1cblxuLy8gY29uZmlndXJhdGlvbiBtZXJnZWQgd2l0aCBkZWZhdWx0c1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvblZhbHVlcyB7XG4gIHVybDogc3RyaW5nO1xuICBwcm9qZWN0OiBzdHJpbmc7XG4gIHRva2VuPzogc3RyaW5nO1xuICBsb2NhbEV4cD86IG51bWJlcjtcbiAgdG9rZW5FeHBpcmF0aW9uVGltZT86IG51bWJlcjtcbiAgcGVyc2lzdDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvbiB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBwcm9qZWN0OiBzdHJpbmc7XG4gIGxvY2FsRXhwPzogbnVtYmVyO1xuICB0b2tlbkV4cGlyYXRpb25UaW1lOiBudW1iZXI7XG4gIHBlcnNpc3Q6IGJvb2xlYW47XG4gIGRlaHlkcmF0ZSgpOiBJQ29uZmlndXJhdGlvblZhbHVlcztcbiAgZGVsZXRlSHlkcmF0ZWRDb25maWcoKTtcbiAgaHlkcmF0ZShjb25maWc6IElDb25maWd1cmF0aW9uVmFsdWVzKTtcbiAgcGFydGlhbFVwZGF0ZShjb25maWc6IFBhcnRpYWw8SUNvbmZpZ3VyYXRpb25WYWx1ZXM+KTogdm9pZDtcbiAgcmVzZXQoKTogdm9pZDtcbiAgdXBkYXRlKGNvbmZpZzogSUNvbmZpZ3VyYXRpb25WYWx1ZXMpO1xufVxuXG4vLyBkZWZhdWx0IHNldHRpbmdzXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uRGVmYXVsdHMge1xuICB0b2tlbkV4cGlyYXRpb25UaW1lOiBudW1iZXI7XG4gIHByb2plY3Q6IHN0cmluZztcbn1cblxuLy8gY29uc3RydWN0b3Igb3B0aW9uc1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvbk9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIFVSTCBvZiB0aGUgZGlyZWN1dHMgQ01TXG4gICAqL1xuICB1cmw6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSB0b2tlbiB0byBhdXRoZW50aWNhdGUgaWYgcHJlZmVycmVkXG4gICAqL1xuICB0b2tlbj86IHN0cmluZztcbiAgLyoqXG4gICAqIFByb2plY3QgbmFtZXNwYWNlXG4gICAqL1xuICBwcm9qZWN0Pzogc3RyaW5nO1xuICAvKipcbiAgICogRGVmYXVsdCBsb2dpbiBleHBpcmF0aW9uIGFzIG51bWJlciBpbiBtc1xuICAgKi9cbiAgbG9jYWxFeHA/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBJZiB0aGUgdG9rZW4gc2hvdWxkIGJlIHBlcnNpdGF0ZWQgb3IgcmVoeWRyYXRlZFxuICAgKi9cbiAgcGVyc2lzdD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBdXRvIHRva2VuIGV4cGlyYXRpb24gdGltZVxuICAgKi9cbiAgdG9rZW5FeHBpcmF0aW9uVGltZT86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGhvbGRlciBmb3IgZGlyZWN0dXMgaW1wbGVtZW50YXRpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIGltcGxlbWVudHMgSUNvbmZpZ3VyYXRpb24ge1xuICAvKipcbiAgICogRGVmYXVsdHMgZm9yIGFsbCBkaXJlY3R1cyBzZGsgaW5zdGFuY2VzLCBjYW4gYmUgbW9kaWZpZWQgaWYgcHJlZmVycmVkXG4gICAqIEB0eXBlIHtJQ29uZmlndXJhdGlvbkRlZmF1bHRzfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBkZWZhdWx0czogSUNvbmZpZ3VyYXRpb25EZWZhdWx0cyA9IHtcbiAgICBwcm9qZWN0OiBcIl9cIixcbiAgICB0b2tlbkV4cGlyYXRpb25UaW1lOiA1ICogNiAqIDEwMDAsXG4gIH07XG5cbiAgLyoqXG4gICAqIFNhdmVzIHRoZSBpbnRlcm5hbCBjb25maWd1cmF0aW9uIHZhbHVlcywgKipETyBOT1QgbW9kaWZ5KiogZnJvbSB0aGUgb3V0c2lkZVxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgaW50ZXJuYWxDb25maWd1cmF0aW9uOiBJQ29uZmlndXJhdGlvblZhbHVlcztcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjb25maWd1cmF0aW9uIGluc3RhbmNlLCB3aWxsIGJlIHVzZWQgb25jZSBmb3IgZWFjaCBkaXJlY3R1cyBpbnN0YW5jZSAocGFzc2luZyByZWZzKS5cbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7SUNvbmZpZ3VyYXRpb25PcHRpb25zfSBpbml0aWFsQ29uZmlnICAgSW5pdGlhbCBjb25maWd1cmF0aW9uIHZhbHVlc1xuICAgKiBAcGFyYW0ge0lTdG9yYWdlQVBJP30gc3RvcmFnZSAgICAgICAgICAgICAgICAgIFN0b3JhZ2UgYWRhcHRlciBmb3IgcGVyc2lzdGVuY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluaXRpYWxDb25maWc6IElDb25maWd1cmF0aW9uT3B0aW9ucyA9IHt9IGFzIGFueSwgcHJpdmF0ZSBzdG9yYWdlPzogSVN0b3JhZ2VBUEkpIHtcbiAgICBsZXQgZGVoeWRyYXRlZENvbmZpZzogSUNvbmZpZ3VyYXRpb25WYWx1ZXMgPSB7fSBhcyBJQ29uZmlndXJhdGlvblZhbHVlcztcblxuICAgIGlmIChzdG9yYWdlICYmIEJvb2xlYW4oaW5pdGlhbENvbmZpZyAmJiBpbml0aWFsQ29uZmlnLnBlcnNpc3QpKSB7XG4gICAgICAvLyBkZWh5ZHJhdGUgaWYgc3RvcmFnZSB3YXMgcHJvdmlkZWQgYW5kIHBlcnNpc3QgZmxhZyBpcyBzZXRcbiAgICAgIGRlaHlkcmF0ZWRDb25maWcgPSB0aGlzLmRlaHlkcmF0ZWRJbml0aWFsQ29uZmlndXJhdGlvbihzdG9yYWdlKTtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJzaXN0ID0gQm9vbGVhbihkZWh5ZHJhdGVkQ29uZmlnLnBlcnNpc3QgfHwgaW5pdGlhbENvbmZpZy5wZXJzaXN0KTtcbiAgICBjb25zdCBwcm9qZWN0ID0gZGVoeWRyYXRlZENvbmZpZy5wcm9qZWN0IHx8IGluaXRpYWxDb25maWcucHJvamVjdCB8fCBDb25maWd1cmF0aW9uLmRlZmF1bHRzLnByb2plY3Q7XG4gICAgY29uc3QgdG9rZW5FeHBpcmF0aW9uVGltZSA9XG4gICAgICBkZWh5ZHJhdGVkQ29uZmlnLnRva2VuRXhwaXJhdGlvblRpbWUgfHxcbiAgICAgIGluaXRpYWxDb25maWcudG9rZW5FeHBpcmF0aW9uVGltZSB8fFxuICAgICAgQ29uZmlndXJhdGlvbi5kZWZhdWx0cy50b2tlbkV4cGlyYXRpb25UaW1lO1xuXG4gICAgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAuLi5pbml0aWFsQ29uZmlnLFxuICAgICAgLi4uZGVoeWRyYXRlZENvbmZpZyxcbiAgICAgIHBlcnNpc3QsXG4gICAgICBwcm9qZWN0LFxuICAgICAgdG9rZW5FeHBpcmF0aW9uVGltZSxcbiAgICB9O1xuICB9XG5cbiAgLy8gQUNDRVNTT1JTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgcHVibGljIGdldCB0b2tlbigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi50b2tlbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdG9rZW4odG9rZW46IHN0cmluZykge1xuICAgIHRoaXMucGFydGlhbFVwZGF0ZSh7IHRva2VuIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCB0b2tlbkV4cGlyYXRpb25UaW1lKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnRva2VuRXhwaXJhdGlvblRpbWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IHRva2VuRXhwaXJhdGlvblRpbWUodG9rZW5FeHBpcmF0aW9uVGltZTogbnVtYmVyKSB7XG4gICAgLy8gVE9ETzogT3B0aW9uYWxseSByZS1jb21wdXRlIHRoZSBsb2NhbEV4cCBwcm9wZXJ0eSBmb3IgdGhlIGF1dG8tcmVmcmVzaFxuICAgIHRoaXMucGFydGlhbFVwZGF0ZSh7XG4gICAgICB0b2tlbkV4cGlyYXRpb25UaW1lOiB0b2tlbkV4cGlyYXRpb25UaW1lICogNjAwMDAsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi51cmw7XG4gIH1cblxuICBwdWJsaWMgc2V0IHVybCh1cmw6IHN0cmluZykge1xuICAgIHRoaXMucGFydGlhbFVwZGF0ZSh7IHVybCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvamVjdCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi5wcm9qZWN0O1xuICB9XG5cbiAgcHVibGljIHNldCBwcm9qZWN0KHByb2plY3Q6IHN0cmluZykge1xuICAgIHRoaXMucGFydGlhbFVwZGF0ZSh7XG4gICAgICBwcm9qZWN0OiBwcm9qZWN0IHx8IFwiX1wiLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBsb2NhbEV4cCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi5sb2NhbEV4cDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbG9jYWxFeHAobG9jYWxFeHA6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMucGFydGlhbFVwZGF0ZSh7IGxvY2FsRXhwIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBwZXJzaXN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi5wZXJzaXN0O1xuICB9XG5cbiAgcHVibGljIHNldCBwZXJzaXN0KHBlcnNpc3Q6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi5wZXJzaXN0ID0gcGVyc2lzdDtcbiAgfVxuXG4gIC8vIEhFTFBFUiBNRVRIT0RTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgaWYgdGhlIGNvbmZpZ3VyYXRpb24gaXMgdmFsaWRcbiAgICogQHRocm93cyB7RXJyb3J9XG4gICAqL1xuICBwdWJsaWMgdmFsaWRhdGUoKSB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKHRoaXMudXJsKSwgXCJjb25maWd1cmF0aW9uIC0gdXJsIG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodGhpcy5wcm9qZWN0KSwgXCJjb25maWd1cmF0aW9uIC0gcHJvamVjdCBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKHRoaXMudG9rZW4pLCBcImNvbmZpZ3VyYXRpb24gLSBwcm9qZWN0IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWVzLCB3aWxsIGFsc28gaHlkcmF0ZSB0aGVtIGlmIHBlcnNpc3RhbmNlIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge0lDb25maWd1cmF0aW9uVmFsdWVzfSBjb25maWdcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoY29uZmlnOiBJQ29uZmlndXJhdGlvblZhbHVlcyk6IHZvaWQge1xuICAgIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uID0gY29uZmlnO1xuXG4gICAgdGhpcy5oeWRyYXRlKGNvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHBhcnRpYWxzIG9mIHRoZSBjb25maWd1cmF0aW9uLCBiZWhhdmVzIGxpa2UgdGhlIFt1cGRhdGVdIG1ldGhvZFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8SUNvbmZpZ3VyYXRpb25WYWx1ZXM+fSBjb25maWdcbiAgICovXG4gIHB1YmxpYyBwYXJ0aWFsVXBkYXRlKGNvbmZpZzogUGFydGlhbDxJQ29uZmlndXJhdGlvblZhbHVlcz4pOiB2b2lkIHtcbiAgICB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgIC4uLnRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLFxuICAgICAgLi4uY29uZmlnLFxuICAgIH07XG5cbiAgICB0aGlzLmh5ZHJhdGUodGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSB3aG9sZSBjb25maXVncmF0aW9uIGFuZCByZW1vdmUgaHlkcmF0ZWQgdmFsdWVzIGZyb20gc3RvcmFnZSBhcyB3ZWxsXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnRva2VuO1xuICAgIGRlbGV0ZSB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi51cmw7XG4gICAgZGVsZXRlIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLmxvY2FsRXhwO1xuXG4gICAgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24ucHJvamVjdCA9IFwiX1wiO1xuXG4gICAgdGhpcy5kZWxldGVIeWRyYXRlZENvbmZpZygpO1xuICB9XG5cbiAgLy8gU1RPUkFHRSBNRVRIT0RTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgcHVibGljIGRlaHlkcmF0ZSgpOiBJQ29uZmlndXJhdGlvblZhbHVlcyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLnN0b3JhZ2UgfHwgIXRoaXMucGVyc2lzdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5hdGl2ZVZhbHVlID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpO1xuXG4gICAgaWYgKCFuYXRpdmVWYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZENvbmZpZyA9IEpTT04ucGFyc2UobmF0aXZlVmFsdWUpO1xuICAgIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uID0gcGFyc2VkQ29uZmlnO1xuXG4gICAgcmV0dXJuIHBhcnNlZENvbmZpZztcbiAgfVxuXG4gIHB1YmxpYyBoeWRyYXRlKHByb3BzOiBJQ29uZmlndXJhdGlvblZhbHVlcykge1xuICAgIGlmICghdGhpcy5zdG9yYWdlIHx8ICF0aGlzLnBlcnNpc3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkocHJvcHMpKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVIeWRyYXRlZENvbmZpZygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3RvcmFnZSB8fCAhdGhpcy5wZXJzaXN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9LRVkpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWh5ZHJhdGVkSW5pdGlhbENvbmZpZ3VyYXRpb24oc3RvcmFnZTogSVN0b3JhZ2VBUEkpOiBJQ29uZmlndXJhdGlvblZhbHVlcyB7XG4gICAgaWYgKCFzdG9yYWdlKSB7XG4gICAgICByZXR1cm4ge30gYXMgSUNvbmZpZ3VyYXRpb25WYWx1ZXM7XG4gICAgfVxuXG4gICAgY29uc3QgbmF0aXZlVmFsdWUgPSBzdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpO1xuXG4gICAgaWYgKCFuYXRpdmVWYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShuYXRpdmVWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge30gYXMgSUNvbmZpZ3VyYXRpb25WYWx1ZXM7XG4gICAgfVxuICB9XG59XG4iLCIvLyBHZW5lcmFsIHNjaGVtZSB0eXBlcyB0eXBlc1xuaW1wb3J0IHsgSUxvZ2luQ3JlZGVudGlhbHMsIElMb2dpbk9wdGlvbnMgfSBmcm9tIFwiLi9zY2hlbWVzL2F1dGgvTG9naW5cIjtcbmltcG9ydCB7IEJvZHlUeXBlIH0gZnJvbSBcIi4vc2NoZW1lcy9odHRwL0JvZHlcIjtcbmltcG9ydCB7IFF1ZXJ5UGFyYW1zIGFzIFF1ZXJ5UGFyYW1zVHlwZSB9IGZyb20gXCIuL3NjaGVtZXMvaHR0cC9RdWVyeVwiO1xuXG4vLyBEaXJlY3R1cyBzY2hlbWUgdHlwZXNcbmltcG9ydCB7IElGaWVsZCB9IGZyb20gXCJzY2hlbWVzL2RpcmVjdHVzL0ZpZWxkXCI7XG5pbXBvcnQgeyBJUmVsYXRpb24gfSBmcm9tIFwic2NoZW1lcy9kaXJlY3R1cy9SZWxhdGlvblwiO1xuaW1wb3J0IHsgSVJvbGUgfSBmcm9tIFwic2NoZW1lcy9kaXJlY3R1cy9Sb2xlXCI7XG5pbXBvcnQgeyBJQ29sbGVjdGlvbiB9IGZyb20gXCIuL3NjaGVtZXMvZGlyZWN0dXMvQ29sbGVjdGlvblwiO1xuaW1wb3J0IHsgSUNvbGxlY3Rpb25QcmVzZXQgfSBmcm9tIFwiLi9zY2hlbWVzL2RpcmVjdHVzL0NvbGxlY3Rpb25QcmVzZXRcIjtcbmltcG9ydCB7IElQZXJtaXNzaW9uIH0gZnJvbSBcIi4vc2NoZW1lcy9kaXJlY3R1cy9QZXJtaXNzaW9uXCI7XG5pbXBvcnQgeyBJVXNlciB9IGZyb20gXCIuL3NjaGVtZXMvZGlyZWN0dXMvVXNlclwiO1xuXG4vLyBSZXF1ZXN0IHNjaGVtZXNcbmltcG9ydCB7IElVcGRhdGVDb2xsZWN0aW9uUHJlc2V0Qm9keSB9IGZyb20gXCIuL3NjaGVtZXMvcmVxdWVzdC9Db2xsZWN0aW9uXCI7XG5cbi8vIFJlc3BvbnNlIHNjaGVtZXNcbmltcG9ydCB7IElSZWxhdGlvbnNSZXNwb25zZSB9IGZyb20gXCJzY2hlbWVzL3Jlc3BvbnNlL1JlbGF0aW9uXCI7XG5pbXBvcnQgeyBJQWN0aXZpdHlSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvQWN0aXZpdHlcIjtcbmltcG9ydCB7IElDb2xsZWN0aW9uUmVzcG9uc2UsIElDb2xsZWN0aW9uc1Jlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Db2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJQ29sbGVjdGlvblByZXNldFJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Db2xsZWN0aW9uUHJlc2V0XCI7XG5pbXBvcnQgeyBJRXJyb3JSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvRXJyb3JcIjtcbmltcG9ydCB7IElGaWVsZFJlc3BvbnNlLCBJRmllbGRzUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0ZpZWxkXCI7XG5pbXBvcnQgeyBJRmlsZVJlc3BvbnNlLCBJRmlsZXNSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvRmlsZVwiO1xuaW1wb3J0IHsgSUl0ZW1SZXNwb25zZSwgSUl0ZW1zUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0l0ZW1cIjtcbmltcG9ydCB7IElMb2dpblJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Mb2dpblwiO1xuaW1wb3J0IHsgSVJlbGF0aW9uUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1JlbGF0aW9uXCI7XG5pbXBvcnQgeyBJUmV2aXNpb25SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvUmV2aXNpb25cIjtcbmltcG9ydCB7IElSb2xlUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1JvbGVcIjtcbmltcG9ydCB7IElSZWZyZXNoVG9rZW5SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvVG9rZW5cIjtcbmltcG9ydCB7IElVc2VyUmVzcG9uc2UsIElVc2Vyc1Jlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Vc2VyXCI7XG5cbi8vIFV0aWxpdGllc1xuaW1wb3J0IHsgZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoIH0gZnJvbSBcIi4vdXRpbHMvY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgZ2V0UGF5bG9hZCB9IGZyb20gXCIuL3V0aWxzL3BheWxvYWRcIjtcblxuLy8gTWFuYWdlciBjbGFzc2VzXG5pbXBvcnQgeyBBUEksIElBUEkgfSBmcm9tIFwiLi9BUElcIjtcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIElDb25maWd1cmF0aW9uLCBJQ29uZmlndXJhdGlvbk9wdGlvbnMgfSBmcm9tIFwiLi9Db25maWd1cmF0aW9uXCI7XG5cbmltcG9ydCB7IElTZXJ2ZXJJbmZvcm1hdGlvblJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9TZXJ2ZXJJbmZvcm1hdGlvblwiO1xuaW1wb3J0IHsgSVNldHRpbmdzUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1NldHRpbmdcIjtcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQgeyBpbnZhcmlhbnQgfSBmcm9tIFwiLi91dGlscy9pbnZhcmlhbnRcIjtcbmltcG9ydCB7IGlzQXJyYXksIGlzTm90TnVsbCwgaXNOdW1iZXIsIGlzT2JqZWN0LCBpc09iamVjdE9yRW1wdHksIGlzU3RyaW5nIH0gZnJvbSBcIi4vdXRpbHMvaXNcIjtcblxudHlwZSBQcmltYXJ5S2V5VHlwZSA9IHN0cmluZyB8IG51bWJlcjtcblxuLyoqXG4gKiBNYWluIFNESyBpbXBsZW1lbnRhdGlvbiBwcm92aWRlcyB0aGUgcHVibGljIEFQSSB0byBpbnRlcmFjdCB3aXRoIGFcbiAqIHJlbW90ZSBkaXJlY3R1cyBpbnN0YW5jZS5cbiAqIEB1c2VzIEFQSVxuICogQHVzZXMgQ29uZmlndXJhdGlvblxuICovXG5leHBvcnQgY2xhc3MgU0RLIHtcbiAgcHVibGljIGdldCBsb2dnZWRJbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hcGkuYXV0aC5pc0xvZ2dlZEluKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBheWxvYWQoKTogYW55IHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLnRva2VuKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0UGF5bG9hZCgpO1xuICB9XG5cbiAgLy8gY29udmVuaWVuY2UgbWV0aG9kXG4gIHB1YmxpYyBzdGF0aWMgZ2V0UGF5bG9hZCA9IGdldFBheWxvYWQ7XG5cbiAgLy8gYXBpIGNvbm5lY3Rpb24gYW5kIHNldHRpbmdzXG4gIHB1YmxpYyBjb25maWc6IElDb25maWd1cmF0aW9uO1xuICBwdWJsaWMgYXBpOiBJQVBJO1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSB3aXRoIGFuIEFQSVxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJQ29uZmlndXJhdGlvbk9wdGlvbnMpIHtcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBDb25maWd1cmF0aW9uKG9wdGlvbnMpO1xuICAgIHRoaXMuYXBpID0gbmV3IEFQSSh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICAvLyAjcmVnaW9uIGF1dGhlbnRpY2F0aW9uXG5cbiAgLyoqXG4gICAqIExvZ2luIHRvIHRoZSBBUEk7IEdldHMgYSBuZXcgdG9rZW4gZnJvbSB0aGUgQVBJIGFuZCBzdG9yZXMgaXQgaW4gdGhpcy5hcGkudG9rZW4uXG4gICAqL1xuICBwdWJsaWMgbG9naW4oY3JlZGVudGlhbHM6IElMb2dpbkNyZWRlbnRpYWxzLCBvcHRpb25zPzogSUxvZ2luT3B0aW9ucyk6IFByb21pc2U8SUxvZ2luUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkuYXV0aC5sb2dpbihjcmVkZW50aWFscywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogTG9ncyB0aGUgdXNlciBvdXQgYnkgXCJmb3JnZXR0aW5nXCIgdGhlIHRva2VuLCBhbmQgY2xlYXJpbmcgdGhlIHJlZnJlc2ggaW50ZXJ2YWxcbiAgICovXG4gIHB1YmxpYyBsb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5hcGkuYXV0aC5sb2dvdXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGNsaWVudCBpbnN0YW5jZSBieSBsb2dnaW5nIG91dCBhbmQgcmVtb3ZpbmcgdGhlIFVSTCBhbmQgcHJvamVjdFxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuYXBpLnJlc2V0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCB0aGUgdG9rZW4gaWYgaXQgaXMgYWJvdXQgdG8gZXhwaXJlICh3aXRoaW4gMzAgc2Vjb25kcyBvZiBleHBpcnkgZGF0ZSkuXG4gICAqIC0gQ2FsbHMgb25BdXRvUmVmcmVzaFN1Y2Nlc3Mgd2l0aCB0aGUgbmV3IHRva2VuIGlmIHRoZSByZWZyZXNoaW5nIGlzIHN1Y2Nlc3NmdWwuXG4gICAqIC0gQ2FsbHMgb25BdXRvUmVmcmVzaEVycm9yIGlmIHJlZnJlc2hpbmcgdGhlIHRva2VuIGZhaWxzIGZvciBzb21lIHJlYXNvbi5cbiAgICogQHJldHVybnMge1tib29sZWFuLCBFcnJvcj9dfVxuICAgKi9cbiAgcHVibGljIHJlZnJlc2hJZk5lZWRlZCgpOiBQcm9taXNlPFtib29sZWFuLCBFcnJvcj9dPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmF1dGgucmVmcmVzaElmTmVlZGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBwYXNzZWQgdG9rZW4gdG8gcmVxdWVzdCBhIG5ldyBvbmVcbiAgICovXG4gIHB1YmxpYyByZWZyZXNoKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPElSZWZyZXNoVG9rZW5SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5hdXRoLnJlZnJlc2godG9rZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcXVlc3QgdG8gcmVzZXQgdGhlIHBhc3N3b3JkIG9mIHRoZSB1c2VyIHdpdGggdGhlIGdpdmVuIGVtYWlsIGFkZHJlc3MuXG4gICAqIFRoZSBBUEkgd2lsbCBzZW5kIGFuIGVtYWlsIHRvIHRoZSBnaXZlbiBlbWFpbCBhZGRyZXNzIHdpdGggYSBsaW5rIHRvIGdlbmVyYXRlIGEgbmV3XG4gICAqIHRlbXBvcmFyeSBwYXNzd29yZC5cbiAgICovXG4gIHB1YmxpYyByZXF1ZXN0UGFzc3dvcmRSZXNldDxUUmVzcG9uc2UgZXh0ZW5kcyBhbnkgPSBhbnk+KGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbWFpbCksIFwiZW1haWwgbXVzdCBiZSBhIHN0cmluZ1wiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PFRSZXNwb25zZT4oXCIvYXV0aC9wYXNzd29yZC9yZXF1ZXN0XCIsIHtcbiAgICAgIGVtYWlsLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBhdXRoZW50aWNhdGlvblxuXG4gIC8vICNlbmRyZWdpb24gY29sbGVjdGlvbiBwcmVzZXRzXG5cbiAgLy8gI3JlZ2lvbiBhY3Rpdml0eVxuXG4gIC8qKlxuICAgKiBHZXQgYWN0aXZpdHlcbiAgICovXG4gIHB1YmxpYyBnZXRBY3Rpdml0eShwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxJQWN0aXZpdHlSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElBY3Rpdml0eVJlc3BvbnNlPihcIi9hY3Rpdml0eVwiLCBwYXJhbXMpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBhY3Rpdml0eVxuXG4gIC8vICNyZWdpb24gYm9va21hcmtzXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYm9va21hcmtzIG9mIHRoZSBjdXJyZW50IHVzZXJcbiAgICogQGRlcHJlY2F0ZWQgV2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24sIHBsZWFzZSB1c2Uge0BsaW5rIFNESy5nZXRDb2xsZWN0aW9uUHJlc2V0c30gaW5zdGVhZFxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hZHZhbmNlZC9sZWdhY3ktdXBncmFkZXMuaHRtbCNkaXJlY3R1cy1ib29rbWFya3NcbiAgICovXG4gIHB1YmxpYyBnZXRNeUJvb2ttYXJrczxUUmVzcG9uc2UgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxUUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb2xsZWN0aW9uUHJlc2V0czxUUmVzcG9uc2U+KHBhcmFtcyk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGJvb2ttYXJrc1xuXG4gIC8vICNyZWdpb24gY29sbGVjdGlvbnNcblxuICAvKipcbiAgICogR2V0IGFsbCBhdmFpbGFibGUgY29sbGVjdGlvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRDb2xsZWN0aW9ucyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxJQ29sbGVjdGlvbnNSZXNwb25zZVtdPiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUNvbGxlY3Rpb25zUmVzcG9uc2VbXT4oXCIvY29sbGVjdGlvbnNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29sbGVjdGlvbiBpbmZvIGJ5IG5hbWVcbiAgICovXG4gIHB1YmxpYyBnZXRDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZywgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSk6IFByb21pc2U8SUNvbGxlY3Rpb25SZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUNvbGxlY3Rpb25SZXNwb25zZT4oYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ29sbGVjdGlvbihkYXRhOiBJQ29sbGVjdGlvbik6IFByb21pc2U8SUNvbGxlY3Rpb25SZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdChkYXRhKSwgXCJkYXRhIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PElDb2xsZWN0aW9uUmVzcG9uc2U+KFwiL2NvbGxlY3Rpb25zXCIsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYSBjZXJ0YWluIGNvbGxlY3Rpb25cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZywgZGF0YTogUGFydGlhbDxJQ29sbGVjdGlvbj4pOiBQcm9taXNlPElDb2xsZWN0aW9uUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChkYXRhKSwgXCJkYXRhIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPElDb2xsZWN0aW9uUmVzcG9uc2U+KGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWAsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBjZXJ0YWluIGNvbGxlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBkZWxldGVDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlPHZvaWQ+KGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWApO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBjb2xsZWN0aW9uc1xuXG4gIC8vICNyZWdpb24gY29sbGVjdGlvbiBwcmVzZXRzXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29sbGVjdGlvbiBwcmVzZXRzIG9mIHRoZSBjdXJyZW50IHVzZXJcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2NvbGxlY3Rpb24tcHJlc2V0c1xuICAgKi9cbiAgcHVibGljIGdldENvbGxlY3Rpb25QcmVzZXRzPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyh0aGlzLmNvbmZpZy50b2tlbiksIFwiZGVmaW5lZCB0b2tlbiBpcyBub3QgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmFwaS5nZXRQYXlsb2FkPHsgaWQ6IHN0cmluZzsgcm9sZTogc3RyaW5nIH0+KCk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5hcGkuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW3RpdGxlXVtubnVsbF1cIjogMSxcbiAgICAgICAgXCJmaWx0ZXJbdXNlcl1bZXFdXCI6IHBheWxvYWQuaWQsXG4gICAgICB9KSxcbiAgICAgIHRoaXMuYXBpLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICBcImZpbHRlcltyb2xlXVtlcV1cIjogcGF5bG9hZC5yb2xlLFxuICAgICAgICBcImZpbHRlclt0aXRsZV1bbm51bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3VzZXJdW251bGxdXCI6IDEsXG4gICAgICB9KSxcbiAgICBdKS50aGVuKCh2YWx1ZXM6IEFycmF5PHsgZGF0YTogYW55IH0+KSA9PiB7XG4gICAgICBjb25zdCBbdXNlciwgcm9sZV0gPSB2YWx1ZXM7XG5cbiAgICAgIHJldHVybiBbLi4uKHVzZXIuZGF0YSB8fCBbXSksIC4uLihyb2xlLmRhdGEgfHwgW10pXSBhcyBUUmVzcG9uc2U7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGNvbGxlY3Rpb24gcHJlc2V0IChib29rbWFyayAvIGxpc3RpbmcgcHJlZmVyZW5jZXMpXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNjb2xsZWN0aW9uLXByZXNldHNcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDb2xsZWN0aW9uUHJlc2V0PENvbGxlY3Rpb25QcmVzZXQgZXh0ZW5kcyBJQ29sbGVjdGlvblByZXNldD4oXG4gICAgZGF0YTogQ29sbGVjdGlvblByZXNldFxuICApOiBQcm9taXNlPElDb2xsZWN0aW9uUHJlc2V0UmVzcG9uc2U8Q29sbGVjdGlvblByZXNldD4+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PElDb2xsZWN0aW9uUHJlc2V0UmVzcG9uc2U8Q29sbGVjdGlvblByZXNldD4+KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgY29sbGVjdGlvbiBwcmVzZXQgKGJvb2ttYXJrIC8gbGlzdGluZyBwcmVmZXJlbmNlKVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjY29sbGVjdGlvbi1wcmVzZXRzXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG1heC1saW5lLWxlbmd0aFxuICBwdWJsaWMgdXBkYXRlQ29sbGVjdGlvblByZXNldDxcbiAgICBQYXJ0aWFsQ29sbGVjdGlvblByZXNldCBleHRlbmRzIFBhcnRpYWw8SUNvbGxlY3Rpb25QcmVzZXQ+LFxuICAgIFRSZXN1bHRDb2xsZWN0aW9uUHJlc2V0IGV4dGVuZHMgSUNvbGxlY3Rpb25QcmVzZXQgPSBJQ29sbGVjdGlvblByZXNldFxuICA+KFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIGRhdGE6IElVcGRhdGVDb2xsZWN0aW9uUHJlc2V0Qm9keVxuICApOiBQcm9taXNlPElDb2xsZWN0aW9uUHJlc2V0UmVzcG9uc2U8UGFydGlhbENvbGxlY3Rpb25QcmVzZXQgJiBUUmVzdWx0Q29sbGVjdGlvblByZXNldD4+IHtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChkYXRhKSwgXCJkYXRhIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPElDb2xsZWN0aW9uUHJlc2V0UmVzcG9uc2U8UGFydGlhbENvbGxlY3Rpb25QcmVzZXQgJiBUUmVzdWx0Q29sbGVjdGlvblByZXNldD4+KFxuICAgICAgYC9jb2xsZWN0aW9uX3ByZXNldHMvJHtwcmltYXJ5S2V5fWAsXG4gICAgICBkYXRhXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgY29sbGVjdGlvbiBwcmVzZXQgYnkgcHJpbWFyeWtleVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjY29sbGVjdGlvbi1wcmVzZXRzXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQ29sbGVjdGlvblByZXNldChwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlPHZvaWQ+KGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gY29sbGVjdGlvbiBwcmVzZXRzXG5cbiAgLy8gI3JlZ2lvbiBleHRlbnNpb25zXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBpbnRlcmZhY2VzXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNnZXQtZXh0ZW5zaW9uc1xuICAgKi9cbiAgcHVibGljIGdldEludGVyZmFjZXM8VFJlc3BvbnNlIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oKTogUHJvbWlzZTxUUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucmVxdWVzdDxUUmVzcG9uc2U+KFwiZ2V0XCIsIFwiL2ludGVyZmFjZXNcIiwge30sIHt9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGluZm9ybWF0aW9uIG9mIGFsbCBpbnN0YWxsZWQgbGF5b3V0c1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZ2V0LWV4dGVuc2lvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRMYXlvdXRzPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KCk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3Q8VFJlc3BvbnNlPihcImdldFwiLCBcIi9sYXlvdXRzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIHBhZ2VzXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNnZXQtZXh0ZW5zaW9uc1xuICAgKi9cbiAgcHVibGljIGdldFBhZ2VzPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KCk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3Q8VFJlc3BvbnNlPihcImdldFwiLCBcIi9wYWdlc1wiLCB7fSwge30sIHRydWUpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBleHRlbnNpb25zXG5cbiAgLy8gI3JlZ2lvbiBmaWVsZHNcblxuICAvKipcbiAgICogR2V0IGFsbCBmaWVsZHMgdGhhdCBhcmUgaW4gRGlyZWN0dXNcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2ZpZWxkcy0yXG4gICAqL1xuICBwdWJsaWMgZ2V0QWxsRmllbGRzPFRGaWVsZHNUeXBlIGV4dGVuZHMgSUZpZWxkW10+KFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUZpZWxkc1Jlc3BvbnNlPFRGaWVsZHNUeXBlPj4oXCIvZmllbGRzXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmaWVsZHMgdGhhdCBoYXZlIGJlZW4gc2V0dXAgZm9yIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmllbGRzLTJcbiAgICovXG4gIHB1YmxpYyBnZXRGaWVsZHM8VEZpZWxkc1R5cGUgZXh0ZW5kcyBJRmllbGRbXT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGU+PihgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZpZWxkIGluZm9ybWF0aW9uIGZvciBhIHNpbmdsZSBnaXZlbiBmaWVsZFxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmllbGRzLTJcbiAgICovXG4gIHB1YmxpYyBnZXRGaWVsZDxURmllbGRUeXBlIGV4dGVuZHMgSUZpZWxkPihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXG4gICAgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fVxuICApOiBQcm9taXNlPElGaWVsZFJlc3BvbnNlPFRGaWVsZFR5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZmllbGROYW1lKSwgXCJmaWVsZE5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJRmllbGRSZXNwb25zZTxURmllbGRUeXBlPj4oYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkTmFtZX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGZpZWxkIGluIHRoZSBnaXZlbiBjb2xsZWN0aW9uXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNmaWVsZHMtMlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUZpZWxkPFRGaWVsZFR5cGUgZXh0ZW5kcyBJRmllbGQ+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBmaWVsZEluZm86IFRGaWVsZFR5cGVcbiAgKTogUHJvbWlzZTxJRmllbGRSZXNwb25zZTxURmllbGRUeXBlPj4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGZpZWxkSW5mbyksIFwiZmllbGRJbmZvIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8SUZpZWxkUmVzcG9uc2U8VEZpZWxkVHlwZT4+KGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBmaWVsZEluZm8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIGdpdmVuIGZpZWxkIGluIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmllbGRzLTJcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVGaWVsZDxURmllbGRUeXBlIGV4dGVuZHMgUGFydGlhbDxJRmllbGQ+PihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXG4gICAgZmllbGRJbmZvOiBURmllbGRUeXBlXG4gICk6IFByb21pc2U8SUZpZWxkUmVzcG9uc2U8SUZpZWxkICYgVEZpZWxkVHlwZT4gfCB1bmRlZmluZWQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc1N0cmluZyhmaWVsZE5hbWUpLCBcImZpZWxkTmFtZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChmaWVsZEluZm8pLCBcImZpZWxkSW5mbyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxJRmllbGRSZXNwb25zZTxJRmllbGQgJiBURmllbGRUeXBlPj4oYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkTmFtZX1gLCBmaWVsZEluZm8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBtdWx0aXBsZSBmaWVsZHMgYXQgb25jZVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmllbGRzLTJcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogLy8gU2V0IG11bHRpcGxlIGZpZWxkcyB0byB0aGUgc2FtZSB2YWx1ZVxuICAgKiB1cGRhdGVGaWVsZHMoXCJwcm9qZWN0c1wiLCBbXCJmaXJzdF9uYW1lXCIsIFwibGFzdF9uYW1lXCIsIFwiZW1haWxcIl0sIHtcbiAgICogICBkZWZhdWx0X3ZhbHVlOiBcIlwiXG4gICAqIH0pXG4gICAqXG4gICAqIC8vIFNldCBtdWx0aXBsZSBmaWVsZHMgdG8gZGlmZmVyZW50IHZhbHVlc1xuICAgKiB1cGRhdGVGaWVsZHMoXCJwcm9qZWN0c1wiLCBbXG4gICAqICAge1xuICAgKiAgICAgaWQ6IDE0LFxuICAgKiAgICAgc29ydDogMVxuICAgKiAgIH0sXG4gICAqICAge1xuICAgKiAgICAgaWQ6IDE3LFxuICAgKiAgICAgc29ydDogMlxuICAgKiAgIH0sXG4gICAqICAge1xuICAgKiAgICAgaWQ6IDkxMixcbiAgICogICAgIHNvcnQ6IDNcbiAgICogICB9XG4gICAqIF0pXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlRmllbGRzPFRGaWVsZHNUeXBlIGV4dGVuZHMgSUZpZWxkW10+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBmaWVsZHM6IEFycmF5PFBhcnRpYWw8SUZpZWxkPj5cbiAgKTogUHJvbWlzZTxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGUgJiBJRmllbGRbXT4gfCB1bmRlZmluZWQ+O1xuICBwdWJsaWMgdXBkYXRlRmllbGRzPFRGaWVsZHNUeXBlIGV4dGVuZHMgSUZpZWxkW10+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBmaWVsZHM6IHN0cmluZ1tdLFxuICAgIGZpZWxkSW5mbzogUGFydGlhbDxJRmllbGQ+XG4gICk6IFByb21pc2U8SUZpZWxkc1Jlc3BvbnNlPFRGaWVsZHNUeXBlICYgSUZpZWxkW10+IHwgdW5kZWZpbmVkPjtcbiAgcHVibGljIHVwZGF0ZUZpZWxkczxURmllbGRzVHlwZSBleHRlbmRzIElGaWVsZFtdPihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGRzSW5mb09yRmllbGROYW1lczogc3RyaW5nW10gfCBBcnJheTxQYXJ0aWFsPElGaWVsZD4+LFxuICAgIGZpZWxkSW5mbzogUGFydGlhbDxJRmllbGQ+IHwgbnVsbCA9IG51bGxcbiAgKTogUHJvbWlzZTxJRmllbGRzUmVzcG9uc2U8VEZpZWxkc1R5cGUgJiBJRmllbGRbXT4gfCB1bmRlZmluZWQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc0FycmF5KGZpZWxkc0luZm9PckZpZWxkTmFtZXMpLCBcImZpZWxkc0luZm9PckZpZWxkTmFtZXMgbXVzdCBiZSBhbiBhcnJheVwiKTtcblxuICAgIGlmIChmaWVsZEluZm8pIHtcbiAgICAgIGludmFyaWFudChpc09iamVjdChmaWVsZEluZm8pLCBcImZpZWxkSW5mbyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2goYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkc0luZm9PckZpZWxkTmFtZXMuam9pbihcIixcIil9YCwgZmllbGRJbmZvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2goYC9maWVsZHMvJHtjb2xsZWN0aW9ufWAsIGZpZWxkc0luZm9PckZpZWxkTmFtZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGZpZWxkIGZyb20gYSBjb2xsZWN0aW9uXG4gICAqIEBzZWUgQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2ZpZWxkcy0yXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlRmllbGQoY29sbGVjdGlvbjogc3RyaW5nLCBmaWVsZE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGZpZWxkTmFtZSksIFwiZmllbGROYW1lIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlKGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGZpZWxkc1xuXG4gIC8vICNyZWdpb24gZmlsZXNcblxuICAvKipcbiAgICogR2V0IGEgbGlzdCBvZiBhdmFpbGFibGUgZmlsZXMgZnJvbSBEaXJlY3R1c1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmlsZXNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRGaWxlcyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxJRmlsZXNSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJQYXJhbXMgbXVzdCBiZSBhbiBvYmplY3RcIik7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChcIi9maWxlc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGNlcnRhaW4gZmlsZSBvciBjZXJ0YWluIGZpbGUgbGlzdCBmcm9tIERpcmVjdHVzXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNmaWxlc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEZpbGU8VEZpbGUgZXh0ZW5kcyBzdHJpbmcgfCBzdHJpbmdbXT4oXG4gICAgZmlsZU5hbWU6IFRGaWxlLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxURmlsZSBleHRlbmRzIHN0cmluZyA/IElGaWxlUmVzcG9uc2UgOiBJRmlsZXNSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhmaWxlTmFtZSksIFwiRmlsZU5hbWUgbXVzdCBiZSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcIlBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcbiAgICBjb25zdCBmaWxlcyA9IHR5cGVvZiBmaWxlTmFtZSA9PT0gXCJzdHJpbmdcIiA/IGZpbGVOYW1lIDogKGZpbGVOYW1lIGFzIHN0cmluZ1tdKS5qb2luKFwiLFwiKTtcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KGAvZmlsZXMvJHtmaWxlc31gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBtdWx0aXBhcnQgZmlsZXMgaW4gbXVsdGlwYXJ0L2Zvcm0tZGF0YVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmlsZXNcbiAgICovXG4gIHB1YmxpYyB1cGxvYWRGaWxlczxUUmVzcG9uc2UgZXh0ZW5kcyBhbnkgPSBhbnlbXT4oXG4gICAgZGF0YTogb2JqZWN0LCAvLyBUT0RPOiBmaXggdHlwZSBkZWZpbml0aW9uXG4gICAgb25VcGxvYWRQcm9ncmVzczogKCkgPT4gb2JqZWN0ID0gKCkgPT4gKHt9KVxuICApOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5jb25maWcudG9rZW59YCxcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiLFxuICAgIH07XG5cbiAgICAvLyBsaW1pdCBjb25jdXJyZW50IHJlcXVlc3RzIHRvIDVcbiAgICB0aGlzLmFwaS5jb25jdXJyZW50LmF0dGFjaCg1KTtcblxuICAgIHJldHVybiB0aGlzLmFwaS54aHJcbiAgICAgIC5wb3N0KGAke3RoaXMuY29uZmlnLnVybH0vJHt0aGlzLmNvbmZpZy5wcm9qZWN0fS9maWxlc2AsIGRhdGEsIHtcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzOiB7IGRhdGE6IGFueSB9KSA9PiB7XG4gICAgICAgIC8vIGRldGFjaCBjb25jdXJyZW5jeSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuYXBpLmNvbmN1cnJlbnQuZGV0YWNoKCk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IElFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIGRldGFjaCBjb25jdXJyZW5jeSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuYXBpLmNvbmN1cnJlbnQuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJOZXR3b3JrIEVycm9yXCIsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGZpbGVzXG5cbiAgLy8gI3JlZ2lvbiBpdGVtc1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjdXBkYXRlLWl0ZW1cbiAgICogQHR5cGVwYXJhbSBUVFBhcnRpYWxJdGVtIERlZmluaW5nIHRoZSBpdGVtIHR5cGUgaW4gb2JqZWN0IHNjaGVtYVxuICAgKiBAdHlwZXBhcmFtIFRUUmVzdWx0IEV4dGVuc2lvbiBvZiBbVFBhcnRpYWxJdGVtXSBhcyBleHBlY3RlZCByZXN1bHRcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVJdGVtPFRUUGFydGlhbEl0ZW0gZXh0ZW5kcyBvYmplY3QsIFRUUmVzdWx0IGV4dGVuZHMgb2JqZWN0ID0gVFRQYXJ0aWFsSXRlbT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIGJvZHk6IFRUUGFydGlhbEl0ZW0sXG4gICAgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fVxuICApOiBQcm9taXNlPElJdGVtUmVzcG9uc2U8VFRQYXJ0aWFsSXRlbSAmIFRUUmVzdWx0Pj4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxJSXRlbVJlc3BvbnNlPFRUUGFydGlhbEl0ZW0gJiBUVFJlc3VsdD4+KGAke2NvbGxlY3Rpb25CYXNlUGF0aH0vJHtwcmltYXJ5S2V5fWAsIGJvZHksIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIG11bHRpcGxlIGl0ZW1zXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCN1cGRhdGUtaXRlbXNcbiAgICogQHR5cGVwYXJhbSBUUGFydGlhbEl0ZW0gRGVmaW5pbmcgYW4gYXJyYXkgb2YgaXRlbXMsIGVhY2ggaW4gb2JqZWN0IHNjaGVtYVxuICAgKiBAdHlwZXBhcmFtIFRSZXN1bHQgRXh0ZW5zaW9uIG9mIFtUUGFydGlhbEl0ZW1dIGFzIGV4cGVjdGVkIHJlc3VsdFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPElJdGVtc1Jlc3BvbnNlPFRQYXJ0aWFsSXRlbSAmIFRSZXN1bHQ+Pn1cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVJdGVtczxUUGFydGlhbEl0ZW0gZXh0ZW5kcyBvYmplY3RbXSwgVFJlc3VsdCBleHRlbmRzIFRQYXJ0aWFsSXRlbSA9IFRQYXJ0aWFsSXRlbT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGJvZHk6IFRQYXJ0aWFsSXRlbSxcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICkge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzQXJyYXkoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIGFycmF5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPElJdGVtc1Jlc3BvbnNlPFRQYXJ0aWFsSXRlbSAmIFRSZXN1bHQ+Pihjb2xsZWN0aW9uQmFzZVBhdGgsIGJvZHksIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGl0ZW1cbiAgICogQHR5cGVwYXJhbSBUSXRlbVR5cGUgRGVmaW5pbmcgYW4gaXRlbSBhbmQgaXRzIGZpZWxkcyBpbiBvYmplY3Qgc2NoZW1hXG4gICAqIEByZXR1cm4ge1Byb21pc2U8SUl0ZW1zUmVzcG9uc2U8VEl0ZW1UeXBlPj59XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlSXRlbTxUSXRlbVR5cGUgZXh0ZW5kcyBvYmplY3Q+KGNvbGxlY3Rpb246IHN0cmluZywgYm9keTogVEl0ZW1UeXBlKTogUHJvbWlzZTxJSXRlbVJlc3BvbnNlPFRJdGVtVHlwZT4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8SUl0ZW1SZXNwb25zZTxUSXRlbVR5cGU+Pihjb2xsZWN0aW9uQmFzZVBhdGgsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBtdWx0aXBsZSBpdGVtc1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjY3JlYXRlLWl0ZW1zXG4gICAqIEB0eXBlcGFyYW0gVEl0ZW1zVHlwZSBEZWZpbmluZyBhbiBhcnJheSBvZiBpdGVtcywgZWFjaCBpbiBvYmplY3Qgc2NoZW1hXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlSXRlbXM8VEl0ZW1zVHlwZSBleHRlbmRzIEFycmF5PHt9Pj4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGJvZHk6IEJvZHlUeXBlXG4gICk6IFByb21pc2U8SUl0ZW1zUmVzcG9uc2U8VEl0ZW1zVHlwZT4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc0FycmF5KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBhcnJheVwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PElJdGVtc1Jlc3BvbnNlPFRJdGVtc1R5cGU+Pihjb2xsZWN0aW9uQmFzZVBhdGgsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdGVtcyBmcm9tIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZ2V0LW11bHRpcGxlLWl0ZW1zXG4gICAqIEB0eXBlcGFyYW0gVEl0ZW1zVHlwZSBEZWZpbmluZyBhbiBhcnJheSBvZiBpdGVtcywgZWFjaCBpbiBvYmplY3Qgc2NoZW1hXG4gICAqL1xuICBwdWJsaWMgZ2V0SXRlbXM8VFRJdGVtc1R5cGUgZXh0ZW5kcyBBcnJheTx7fT4+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICk6IFByb21pc2U8SUl0ZW1zUmVzcG9uc2U8VFRJdGVtc1R5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJSXRlbXNSZXNwb25zZTxUVEl0ZW1zVHlwZT4+KGNvbGxlY3Rpb25CYXNlUGF0aCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzaW5nbGUgaXRlbSBieSBwcmltYXJ5IGtleVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZ2V0LWl0ZW1cbiAgICogQHR5cGVwYXJhbSBUSXRlbVR5cGUgRGVmaW5pbmcgZmllbGRzIG9mIGFuIGl0ZW0gaW4gb2JqZWN0IHNjaGVtYVxuICAgKi9cbiAgcHVibGljIGdldEl0ZW08VEl0ZW1UeXBlIGV4dGVuZHMgb2JqZWN0ID0ge30+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSxcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICk6IFByb21pc2U8SUl0ZW1SZXNwb25zZTxUSXRlbVR5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElJdGVtUmVzcG9uc2U8VEl0ZW1UeXBlPj4oYCR7Y29sbGVjdGlvbkJhc2VQYXRofS8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBzaW5nbGUgaXRlbSBieSBwcmltYXJ5IGtleVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZGVsZXRlLWl0ZW1zXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlSXRlbShjb2xsZWN0aW9uOiBzdHJpbmcsIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlKSB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmRlbGV0ZTx2b2lkPihgJHtjb2xsZWN0aW9uQmFzZVBhdGh9LyR7cHJpbWFyeUtleX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgbXVsdGlwbGUgaXRlbXMgYnkgcHJpbWFyeSBrZXlcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2RlbGV0ZS1pdGVtc1xuICAgKi9cbiAgcHVibGljIGRlbGV0ZUl0ZW1zKGNvbGxlY3Rpb246IHN0cmluZywgcHJpbWFyeUtleXM6IFByaW1hcnlLZXlUeXBlW10pIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc0FycmF5KHByaW1hcnlLZXlzKSwgXCJwcmltYXJ5S2V5cyBtdXN0IGJlIGFuIGFycmF5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmRlbGV0ZTx2b2lkPihgJHtjb2xsZWN0aW9uQmFzZVBhdGh9LyR7cHJpbWFyeUtleXMuam9pbigpfWApO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBpdGVtc1xuXG4gIC8vICNyZWdpb24gbGlzdGluZyBwcmVmZXJlbmNlc1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbGxlY3Rpb24gcHJlc2V0cyBvZiB0aGUgY3VycmVudCB1c2VyIGZvciBhIHNpbmdsZSBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0TXlMaXN0aW5nUHJlZmVyZW5jZXM8VFJlc3BvbnNlIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxUUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodGhpcy5jb25maWcudG9rZW4pLCBcInRva2VuIG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuYXBpLmdldFBheWxvYWQ8eyByb2xlOiBzdHJpbmc7IGlkOiBzdHJpbmcgfT4oKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmFwaS5nZXQ8SUZpZWxkUmVzcG9uc2U8YW55Pj4oXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgXCJmaWx0ZXJbY29sbGVjdGlvbl1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICAgIFwiZmlsdGVyW3JvbGVdW251bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxuICAgICAgICBcImZpbHRlclt1c2VyXVtudWxsXVwiOiAxLFxuICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgc29ydDogXCItaWRcIixcbiAgICAgIH0pLFxuICAgICAgdGhpcy5hcGkuZ2V0PElGaWVsZFJlc3BvbnNlPGFueT4+KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgICBcImZpbHRlcltyb2xlXVtlcV1cIjogcGF5bG9hZC5yb2xlLFxuICAgICAgICBcImZpbHRlclt0aXRsZV1bbnVsbF1cIjogMSxcbiAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMSxcbiAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgIHNvcnQ6IFwiLWlkXCIsXG4gICAgICB9KSxcbiAgICAgIHRoaXMuYXBpLmdldDxJRmllbGRSZXNwb25zZTxhbnk+PihcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uXVtlcV1cIjogY29sbGVjdGlvbixcbiAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHBheWxvYWQucm9sZSxcbiAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW251bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3VzZXJdW2VxXVwiOiBwYXlsb2FkLmlkLFxuICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgc29ydDogXCItaWRcIixcbiAgICAgIH0pLFxuICAgIF0pLnRoZW4oKHZhbHVlczogQXJyYXk8SUZpZWxkUmVzcG9uc2U8YW55Pj4pID0+IHtcbiAgICAgIGNvbnN0IFtjb2wsIHJvbGUsIHVzZXJdID0gdmFsdWVzO1xuXG4gICAgICBpZiAodXNlci5kYXRhICYmIHVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB1c2VyLmRhdGFbMF0gYXMgVFJlc3BvbnNlO1xuICAgICAgfVxuXG4gICAgICBpZiAocm9sZS5kYXRhICYmIHJvbGUuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiByb2xlLmRhdGFbMF0gYXMgVFJlc3BvbnNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29sLmRhdGEgJiYgY29sLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gY29sLmRhdGFbMF0gYXMgVFJlc3BvbnNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge30gYXMgVFJlc3BvbnNlO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBsaXN0aW5nIHByZWZlcmVuY2VzXG5cbiAgLy8gI3JlZ2lvbiBwZXJtaXNzaW9uc1xuXG4gIC8qKlxuICAgKiBHZXQgcGVybWlzc2lvbnNcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxJUGVybWlzc2lvbj59XG4gICAqL1xuICBwdWJsaWMgZ2V0UGVybWlzc2lvbnMocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSk6IFByb21pc2U8SUl0ZW1zUmVzcG9uc2U8SVBlcm1pc3Npb25bXT4+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXM8SVBlcm1pc3Npb25bXT4oXCJkaXJlY3R1c19wZXJtaXNzaW9uc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IEZpeCB0eXBlLWRlZiBmb3IgcmV0dXJuXG4gICAqIEdldCB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyJ3MgcGVybWlzc2lvbnNcbiAgICogQHR5cGVwYXJhbSBUUmVzcG9uc2UgUGVybWlzc2lvbnMgdHlwZSBhcyBhcnJheSBleHRlbmRpbmcgYW55W11cbiAgICovXG4gIHB1YmxpYyBnZXRNeVBlcm1pc3Npb25zPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KFwiL3Blcm1pc3Npb25zL21lXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogRml4IHR5cGUtZGVmIGZvciBwYXJhbSBhbmQgcmV0dXJuXG4gICAqIENyZWF0ZSBtdWx0aXBsZSBuZXcgcGVybWlzc2lvbnNcbiAgICogQHR5cGVwYXJhbSBUUmVzcG9uc2UgUGVybWlzc2lvbnMgdHlwZSBhcyBhcnJheSBleHRlbmRpbmcgYW55W11cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVQZXJtaXNzaW9uczxUUmVzcG9uc2UgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihkYXRhOiBhbnlbXSk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzQXJyYXkoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuYXJyeVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0KFwiL3Blcm1pc3Npb25zXCIsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IEZpeCB0eXBlLWRlZiBmb3IgcGFyYW0gYW5kIHJldHVyblxuICAgKiBVcGRhdGUgbXVsdGlwbGUgcGVybWlzc2lvbiByZWNvcmRzXG4gICAqIEB0eXBlcGFyYW0gVFJlc3BvbnNlIFBlcm1pc3Npb25zIHR5cGUgYXMgYXJyYXkgZXh0ZW5kaW5nIGFueVtdXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUGVybWlzc2lvbnM8VFJlc3BvbnNlIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oZGF0YTogYW55W10pOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc0FycmF5KGRhdGEpLCBcImRhdGEgbXVzdCBiZSBhbmFycnlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2g8VFJlc3BvbnNlPihcIi9wZXJtaXNzaW9uc1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gcGVybWlzc2lvbnNcblxuICAvLyAjcmVnaW9uIHJlbGF0aW9uc1xuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHJlbGF0aW9uc2hpcHNcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICogQHJldHVybiB7UHJvbWlzZTxJUmVsYXRpb25zUmVzcG9uc2U+fVxuICAgKi9cbiAgcHVibGljIGdldFJlbGF0aW9ucyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KSB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElSZWxhdGlvbnNSZXNwb25zZT4oXCIvcmVsYXRpb25zXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBuZXcgcmVsYXRpb25cbiAgICogQHBhcmFtIHtJUmVsYXRpb259IGRhdGFcbiAgICogQHJldHVybiB7UHJvbWlzZTxJUmVsYXRpb25SZXNwb25zZT59XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlUmVsYXRpb24oZGF0YTogSVJlbGF0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8SVJlbGF0aW9uUmVzcG9uc2U+KFwiL3JlbGF0aW9uc1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGV4aXN0aW5nIHJlbGF0aW9uXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUmVsYXRpb24ocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIGRhdGE6IFBhcnRpYWw8SVJlbGF0aW9uPikge1xuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxJUmVsYXRpb25SZXNwb25zZT4oYC9yZWxhdGlvbnMvJHtwcmltYXJ5S2V5fWAsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRPRE86IEFkZCB0eXBlLWRlZiBmb3IgcmV0dXJuIHZhbHVlKHMpXG4gICAqIEdldCB0aGUgcmVsYXRpb25zaGlwIGluZm9ybWF0aW9uIGZvciB0aGUgZ2l2ZW4gY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGdldENvbGxlY3Rpb25SZWxhdGlvbnMoY29sbGVjdGlvbjogc3RyaW5nLCBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmFwaS5nZXQ8YW55PihcIi9yZWxhdGlvbnNcIiwge1xuICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uX2FdW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgfSksXG4gICAgICB0aGlzLmFwaS5nZXQ8YW55PihcIi9yZWxhdGlvbnNcIiwge1xuICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uX2JdW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgfSksXG4gICAgXSk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIHJlbGF0aW9uc1xuXG4gIC8vICNyZWdpb24gcmV2aXNpb25zXG5cbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZSBpdGVtJ3MgcmV2aXNpb25zIGJ5IHByaW1hcnkga2V5XG4gICAqIEB0eXBlcGFyYW0gRGF0YUFuZERlbHRhICBUaGUgZGF0YSBpbmNsdWRpbmcgZGVsdGEgdHlwZSBmb3IgdGhlIHJldmlzaW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSB7UHJpbWFyeUtleVR5cGV9IHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRJdGVtUmV2aXNpb25zPFREYXRhQW5kRGVsdGEgZXh0ZW5kcyBvYmplY3QgPSB7fT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxJUmV2aXNpb25SZXNwb25zZTxURGF0YUFuZERlbHRhPj4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJUmV2aXNpb25SZXNwb25zZTxURGF0YUFuZERlbHRhPj4oYCR7Y29sbGVjdGlvbkJhc2VQYXRofS8ke3ByaW1hcnlLZXl9L3JldmlzaW9uc2AsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJ0IGFuIGl0ZW0gdG8gYSBwcmV2aW91cyBzdGF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sbGVjdGlvblxuICAgKiBAcGFyYW0ge1ByaW1hcnlLZXlUeXBlfSBwcmltYXJ5S2V5XG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZXZpc2lvbklEXG4gICAqL1xuICBwdWJsaWMgcmV2ZXJ0KGNvbGxlY3Rpb246IHN0cmluZywgcHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIHJldmlzaW9uSUQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNOdW1iZXIocmV2aXNpb25JRCksIFwicmV2aXNpb25JRCBtdXN0IGJlIGEgbnVtYmVyXCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoKGAke2NvbGxlY3Rpb25CYXNlUGF0aH0vJHtwcmltYXJ5S2V5fS9yZXZlcnQvJHtyZXZpc2lvbklEfWApO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiByZXZpc2lvbnNcblxuICAvLyAjcmVnaW9uIHJvbGVzXG5cbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZSB1c2VyIHJvbGVcbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX3CoHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRSb2xlKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxJUm9sZVJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzTnVtYmVyKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBhIG51bWJlclwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJUm9sZVJlc3BvbnNlPihgL3JvbGVzLyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlciByb2xlc1xuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKi9cbiAgcHVibGljIGdldFJvbGVzKHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPElSb2xlUmVzcG9uc2VbXT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElSb2xlUmVzcG9uc2VbXT4oXCIvcm9sZXNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSB1c2VyIHJvbGVcbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX3CoHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtSb2xlfSBib2R5XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUm9sZTxSb2xlIGV4dGVuZHMgUGFydGlhbDxJUm9sZT4+KHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBib2R5OiBSb2xlKSB7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW08Um9sZSwgSVJvbGU+KFwiZGlyZWN0dXNfcm9sZXNcIiwgcHJpbWFyeUtleSwgYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHVzZXIgcm9sZVxuICAgKiBAcGFyYW0ge1JvbGV9IGJvZHlcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVSb2xlPFRSb2xlIGV4dGVuZHMgSVJvbGU+KGJvZHk6IFRSb2xlKSB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJdGVtKFwiZGlyZWN0dXNfcm9sZXNcIiwgYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgdXNlciByb2wgYnkgcHJpbWFyeSBrZXlcbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX3CoHByaW1hcnlLZXlcbiAgICovXG4gIHB1YmxpYyBkZWxldGVSb2xlKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcblxuICAgIHJldHVybiB0aGlzLmRlbGV0ZUl0ZW0oXCJkaXJlY3R1c19yb2xlc1wiLCBwcmltYXJ5S2V5KTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gcm9sZXNcblxuICAvLyAjcmVnaW9uIHNldHRpbmdzXG5cbiAgLyoqXG4gICAqIEdldCBEaXJlY3R1cycgZ2xvYmFsIHNldHRpbmdzXG4gICAqIEBwYXJhbSB7UXVlcnlQYXJhbXNUeXBlP30gcGFyYW1zXG4gICAqL1xuICBwdWJsaWMgZ2V0U2V0dGluZ3MocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSkge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElTZXR0aW5nc1Jlc3BvbnNlPihcIi9zZXR0aW5nc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgXCJmaWVsZHNcIiBmb3IgZGlyZWN0dXNfc2V0dGluZ3NcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRTZXR0aW5nc0ZpZWxkcyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KSB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUZpZWxkc1Jlc3BvbnNlPihcIi9zZXR0aW5ncy9maWVsZHNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gc2V0dGluZ3NcblxuICAvLyAjcmVnaW9uIHVzZXJzXG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgYXZhaWxhYmxlIHVzZXJzIGluIERpcmVjdHVzXG4gICAqIEBwYXJhbSB7UXVlcnlQYXJhbXNUeXBlP30gcGFyYW1zXG4gICAqL1xuICBwdWJsaWMgZ2V0VXNlcnMocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSkge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElVc2Vyc1Jlc3BvbnNlPihcIi91c2Vyc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZSBEaXJlY3R1cyB1c2VyXG4gICAqIEBwYXJhbSB7UHJpbWFyeUtleVR5cGV9IHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRVc2VyPFVzZXIgZXh0ZW5kcyBJVXNlciA9IElVc2VyPihwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSkge1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SVVzZXJSZXNwb25zZTxVc2VyPj4oYC91c2Vycy8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZXIgaW5mbyBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAqIEBwYXJhbSB7UXVlcnlQYXJhbXNUeXBlP30gcGFyYW1zXG4gICAqL1xuICBwdWJsaWMgZ2V0TWU8VXNlciBleHRlbmRzIElVc2VyID0gSVVzZXI+KHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pIHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJVXNlclJlc3BvbnNlPFVzZXI+PihcIi91c2Vycy9tZVwiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHNpbmdsZSB1c2VyIGJhc2VkIG9uIHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX0gcHJpbWFyeUtleVxuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKi9cbiAgcHVibGljIHVwZGF0ZVVzZXI8VXNlciBleHRlbmRzIFBhcnRpYWw8SVVzZXI+PihwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgYm9keTogVXNlcikge1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtPFVzZXIsIElVc2VyPihcImRpcmVjdHVzX3VzZXJzXCIsIHByaW1hcnlLZXksIGJvZHkpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiB1c2Vyc1xuXG4gIC8vICNyZWdpb24gc2VydmVyIGFkbWluXG5cbiAgLyoqXG4gICAqIFRoaXMgd2lsbCB1cGRhdGUgdGhlIGRhdGFiYXNlIG9mIHRoZSBBUEkgaW5zdGFuY2UgdG8gdGhlIGxhdGVzdCB2ZXJzaW9uXG4gICAqIHVzaW5nIHRoZSBtaWdyYXRpb25zIGluIHRoZSBBUElcbiAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVEYXRhYmFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdChcIi91cGRhdGVcIik7XG4gIH1cblxuICAvKipcbiAgICogUGluZyB0aGUgQVBJIHRvIGNoZWNrIGlmIGl0IGV4aXN0cyAvIGlzIHVwIGFuZCBydW5uaW5nLCByZXR1cm5zIFwicG9uZ1wiXG4gICAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nPn1cbiAgICovXG4gIHB1YmxpYyBwaW5nKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3QoXCJnZXRcIiwgXCIvc2VydmVyL3BpbmdcIiwge30sIHt9LCB0cnVlLCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzZXJ2ZXIgaW5mbyBmcm9tIHRoZSBBUElcbiAgICogQHJldHVybiB7UHJvbWlzZTxJU2VydmVySW5mb3JtYXRpb25SZXNwb25zZT59XG4gICAqL1xuICBwdWJsaWMgc2VydmVySW5mbygpOiBQcm9taXNlPElTZXJ2ZXJJbmZvcm1hdGlvblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3QoXCJnZXRcIiwgXCIvXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogQWRkIHJlc3BvbnNlIHR5cGUtZGVmXG4gICAqIEdldCB0aGUgc2VydmVyIGluZm8gZnJvbSB0aGUgcHJvamVjdFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBwdWJsaWMgcHJvamVjdEluZm8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucmVxdWVzdChcImdldFwiLCBcIi9cIik7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogQWRkIHJlc3BvbnNlIHR5cGUtZGVmXG4gICAqIEdldCBhbGwgdGhlIHNldHVwIHRoaXJkIHBhcnR5IGF1dGggcHJvdmlkZXJzXG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBnZXRUaGlyZFBhcnR5QXV0aFByb3ZpZGVycygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoXCIvYXV0aC9zc29cIik7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIHNlcnZlciBhZG1pblxufVxuIiwiaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL0NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IFNESyB9IGZyb20gXCIuL1NES1wiO1xuXG5leHBvcnQge1xuICAvLyBleHBvcnQgY29uZmlnIGZvciByZS1zZXR0aW5nIGRlZmF1bHRzIGFjcm9zcyBhbGwgU0RLIGluc3RhbmNlc1xuICBDb25maWd1cmF0aW9uLFxuICAvLyBuYW1lZCBleHBvcnRzIGlzIHByZWZlcnJlZCwga2VlcCBkZWZhdWx0IGZvciB0cmFuc2l0aW9uIHBoYXNlXG4gIFNESyxcbn07XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgcGxlYXNlIHVzZSBuYW1lZCBpbXBvcnRzIGluc3RlYWQgb2YgZGVmYXVsdHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgU0RLO1xuIiwiZXhwb3J0IGNvbnN0IERJUkVDVFVTX0NPTExFQ1RJT05fUFJFRklYID0gXCJkaXJlY3R1c19cIjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb3JyZWN0IEFQSSBwYXRoIGZvciB0aGUgY29sbGVjdGlvbi4gSXQgd2lsbFxuICogc3RyaXAgdGhlIHByZWZpeCBAe0RJUkVDVFVTX0NPTExFQ1RJT05fUFJFRklYfSBvciB3aWxsIGFkZCB0aGVcbiAqICcvaXRlbXMvJyBwYXRoIGFzIHByZWZpeCBpZiBub3QgcHJvdmlkZWQuIFRoZSAnc3Vic3RyKDkpJyBkZWZpbmVzXG4gKiB0aGUgbGVuZ3RoIG9mIHRoZSBkZWZpbmVkIEB7RElSRUNUVVNfQ09MTEVDVElPTl9QUkVGSVh9LlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbGxlY3Rpb24gICAgIFRoZSBuYW1lIG9mIHRoZSBjb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQGludGVybmFsXG4gKlxuICogQGV4YW1wbGVcbiAqIGdldENvbGxlY3Rpb25JdGVtUGF0aCgnZGlyZWN0dXNfdXNlcnMnKTtcbiAqIC8vID0+ICcvdXNlcnMnXG4gKiBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoJ3VzZXJzJyk7XG4gKiAvLyA9PiAnL2l0ZW1zL3VzZXJzJ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb246IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoRElSRUNUVVNfQ09MTEVDVElPTl9QUkVGSVgpKSB7XG4gICAgcmV0dXJuIGAvJHtjb2xsZWN0aW9uLnN1YnN0cig5KX1gO1xuICB9XG5cbiAgcmV0dXJuIGAvaXRlbXMvJHtjb2xsZWN0aW9ufWA7XG59XG4iLCIvKipcbiAqIENoZWNrcyBpbnZhcmlhbnQgdmlvbGF0aW9uIGFnYWluc3QgYSBjb25kaXRpb24sIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgbm90IGZ1bGZpbGxlZFxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGNvbmRpdGlvblxuICogQHBhcmFtIHtzdHJpbmd9wqBtZXNzYWdlXG4gKi9cbmV4cG9ydCBjb25zdCBpbnZhcmlhbnQgPSAoY29uZGl0aW9uOiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGlmICghIWNvbmRpdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgSW52YXJpYW50IHZpb2xhdGlvbjogJHttZXNzYWdlfWApO1xufTtcbiIsImNvbnN0IGlzVHlwZSA9ICh0OiBzdHJpbmcsIHY6IGFueSkgPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSBgW29iamVjdCAke3R9XWA7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNOb3ROdWxsID0gKHY6IGFueSkgPT4gdiAhPT0gbnVsbCAmJiB2ICE9PSB1bmRlZmluZWQ7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNTdHJpbmcgPSAodjogYW55KSA9PiB2ICYmIHR5cGVvZiB2ID09PSBcInN0cmluZ1wiICYmIC9cXFMvLnRlc3Qodik7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNOdW1iZXIgPSAodjogYW55KSA9PiBpc1R5cGUoXCJOdW1iZXJcIiwgdikgJiYgaXNGaW5pdGUodikgJiYgIWlzTmFOKHBhcnNlRmxvYXQodikpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRnVuY3Rpb24gPSAodjogYW55KSA9PiB2IGluc3RhbmNlb2YgRnVuY3Rpb247XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNPYmplY3RPckVtcHR5ID0gKHY6IGFueSkgPT4gaXNUeXBlKFwiT2JqZWN0XCIsIHYpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQXJyYXlPckVtcHR5ID0gKHY6IGFueSkgPT4gaXNUeXBlKFwiQXJyYXlcIiwgdik7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNBcnJheSA9ICh2OiBhbnkpID0+ICghaXNBcnJheU9yRW1wdHkodikgPyBmYWxzZSA6IHYubGVuZ3RoID4gMCk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNPYmplY3QgPSAodjogYW55KSA9PiB7XG4gIGlmICghaXNPYmplY3RPckVtcHR5KHYpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gdikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodiwga2V5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsImltcG9ydCAqIGFzIGJhc2U2NCBmcm9tIFwiYmFzZS02NFwiO1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tIFwiLi9pc1wiO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgcGF5bG9hZCBmcm9tIGEgSldUXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSAge1N0cmluZ30gdG9rZW4gVGhlIEpXVCB0byByZXRyaWV2ZSB0aGUgcGF5bG9hZCBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIFRoZSBKV1QgcGF5bG9hZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF5bG9hZDxUIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0Pih0b2tlbjogc3RyaW5nKTogVCB7XG4gIGlmICghdG9rZW4gfHwgdG9rZW4ubGVuZ3RoIDwgMCB8fCB0b2tlbi5zcGxpdChcIi5cIikubGVuZ3RoIDw9IDApIHtcbiAgICAvLyBubyB0b2tlbiBvciBpbnZhbGlkIHRva2VuIGVxdWFscyBubyBwYXlsb2FkXG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHBheWxvYWRCYXNlNjQgPSB0b2tlblxuICAgICAgLnNwbGl0KFwiLlwiKVsxXVxuICAgICAgLnJlcGxhY2UoXCItXCIsIFwiK1wiKVxuICAgICAgLnJlcGxhY2UoXCJfXCIsIFwiL1wiKTtcbiAgICBjb25zdCBwYXlsb2FkRGVjb2RlZCA9IGJhc2U2NC5kZWNvZGUocGF5bG9hZEJhc2U2NCk7XG4gICAgY29uc3QgcGF5bG9hZE9iamVjdCA9IEpTT04ucGFyc2UocGF5bG9hZERlY29kZWQpO1xuXG4gICAgaWYgKGlzTnVtYmVyKHBheWxvYWRPYmplY3QuZXhwKSkge1xuICAgICAgcGF5bG9hZE9iamVjdC5leHAgPSBuZXcgRGF0ZShwYXlsb2FkT2JqZWN0LmV4cCAqIDEwMDApO1xuICAgIH1cblxuICAgIHJldHVybiBwYXlsb2FkT2JqZWN0O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyByZXR1cm4gZW1wdHkgcGF5bG9hZCBpbiBjYXNlIG9mIGFuIGVycm9yXG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=