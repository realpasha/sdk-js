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
        this.config.delete();
    };
    /// REQUEST METHODS ----------------------------------------------------------
    /**
     * GET convenience method. Calls the request method for you
     */
    API.prototype.get = function (endpoint, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(endpoint), "endpoint must be a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.request("get", endpoint, params);
    };
    /**
     * POST convenience method. Calls the request method for you
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
     */
    API.prototype.delete = function (endpoint) {
        invariant_1.invariant(is_1.isString(endpoint), "endpoint must be a string");
        return this.request("delete", endpoint);
    };
    /**
     * Gets the payload of the current token, return type can be generic
     */
    API.prototype.getPayload = function () {
        if (!is_1.isString(this.config.token)) {
            return null;
        }
        return payload_1.getPayload(this.config.token);
    };
    /**
     * Perform an API request to the Directus API
     */
    API.prototype.request = function (method, endpoint, params, data, noEnv, headers) {
        if (params === void 0) { params = {}; }
        if (data === void 0) { data = {}; }
        if (noEnv === void 0) { noEnv = false; }
        if (headers === void 0) { headers = {}; }
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
                    return JSON.parse(responseData);
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
var Authentication = /** @class */ (function () {
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
     */
    Authentication.prototype.login = function (credentials, options) {
        var _this = this;
        if (options === void 0) { options = { persist: true, storage: false }; }
        invariant_1.invariant(is_1.isObject(credentials), "malformed credentials");
        invariant_1.invariant(is_1.hasKeysWithString(credentials, ["email", "password"]), "email & password required in credentials");
        this.config.token = null;
        if (is_1.hasKeysWithString(credentials, ["url"])) {
            this.config.url = credentials.url;
        }
        if (is_1.hasKeysWithString(credentials, ["project"])) {
            this.config.project = credentials.project;
        }
        if (credentials.persist || options.persist) {
            this.startInterval();
        }
        return new Promise(function (resolve, reject) {
            _this.inject
                .post("/auth/authenticate", {
                email: credentials.email,
                password: credentials.password,
            })
                .then(function (res) {
                // Save new token in configuration
                return (_this.config.token = res.data.token);
            })
                .then(function (token) {
                // Expiry date is the moment we got the token + 5 minutes
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
     * @returns {[boolean, Error?]}
     */
    Authentication.prototype.refreshIfNeeded = function () {
        var _this = this;
        var payload = this.getPayload();
        if (!is_1.isString(this.config.token) || !is_1.isString(this.config.url) || !is_1.isString(this.config.project)) {
            return;
        }
        if (!payload || !payload.exp) {
            return;
        }
        var timeDiff = (this.config.localExp || 0) - Date.now();
        if (timeDiff <= 0) {
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
                _this.refresh(_this.config.token)
                    .then(function (res) {
                    var localExp = (_this.config.localExp = new Date(Date.now() + _this.config.tokenExpirationTime).getTime());
                    var token = (_this.config.token = res.data.token || _this.config.token);
                    var autorefreshResult = {
                        localExp: localExp,
                        project: _this.config.project,
                        token: token,
                        url: _this.config.url,
                    };
                    // If autorefresh succeeded
                    if (is_1.isFunction(_this.onAutoRefreshSuccess)) {
                        _this.onAutoRefreshSuccess(autorefreshResult);
                        resolve([true]);
                    }
                    // If expiration via storage
                    _this.config.update(autorefreshResult);
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
     * Use the passed token to request a new one
     */
    Authentication.prototype.refresh = function (token) {
        invariant_1.invariant(is_1.isString(token), "token must be a string");
        return this.inject.post("/auth/refresh", { token: token });
    };
    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
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
var Configuration = /** @class */ (function () {
    function Configuration(initialConfig, storage) {
        this.storage = storage;
        var dehydratedConfig = {};
        if (storage) {
            dehydratedConfig = this.dehydrate();
            // TODO: maybe just dehydrate and skip re-setting the configuration?
            // return this;
        }
        // make it safe for the untyped JavaScript world to prevent issues
        initialConfig = initialConfig || {};
        var project = dehydratedConfig.project || initialConfig.project || "_";
        var tokenExpirationTime = dehydratedConfig.tokenExpirationTime || initialConfig.tokenExpirationTime || 5 * 6 * 1000;
        this.internalConfiguration = __assign({}, dehydratedConfig, initialConfig, { project: project,
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
    // HELPER METHODS ============================================================
    Configuration.prototype.validate = function () {
        invariant_1.invariant(is_1.isString(this.url), "configuration - url must be defined");
        invariant_1.invariant(is_1.isString(this.project), "configuration - project must be defined");
        invariant_1.invariant(is_1.isString(this.token), "configuration - project must be defined");
    };
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
        this.delete();
    };
    // STORAGE METHODS ===========================================================
    Configuration.prototype.dehydrate = function () {
        if (!this.storage) {
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
        if (!this.storage) {
            return;
        }
        this.storage.setItem(STORAGE_KEY, JSON.stringify(props));
    };
    Configuration.prototype.delete = function () {
        if (!this.storage) {
            return;
        }
        this.storage.removeItem(STORAGE_KEY);
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

Object.defineProperty(exports, "__esModule", { value: true });
// Utilities
var collection_1 = __webpack_require__(/*! ./utils/collection */ "./src/utils/collection.ts");
var payload_1 = __webpack_require__(/*! ./utils/payload */ "./src/utils/payload.ts");
// Manager classes
var API_1 = __webpack_require__(/*! ./API */ "./src/API.ts");
var Configuration_1 = __webpack_require__(/*! ./Configuration */ "./src/Configuration.ts");
// Invariant violation
var invariant_1 = __webpack_require__(/*! ./utils/invariant */ "./src/utils/invariant.ts");
var is_1 = __webpack_require__(/*! ./utils/is */ "./src/utils/is.ts");
var SDK = /** @class */ (function () {
    // create a new instance with an API
    function SDK(options) {
        this.config = new Configuration_1.Configuration(options);
        this.api = new API_1.API(this.config);
    }
    Object.defineProperty(SDK.prototype, "loggedIn", {
        /**
         * If the current auth status is logged in
         */
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
    /// AUTHENTICATION -----------------------------------------------------------
    /**
     * Login to the API; Gets a new token from the API and stores it in this.api.token.
     */
    SDK.prototype.login = function (credentials, options) {
        if (options === void 0) { options = { persist: true, storage: false }; }
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
    /// ACTIVITY -----------------------------------------------------------------
    /**
     * Get activity
     */
    SDK.prototype.getActivity = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/activity", params);
    };
    /// BOOKMARKS ----------------------------------------------------------------
    /**
     * Get the bookmarks of the current user
     * TODO: Add deprecation warning
     * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
     */
    SDK.prototype.getMyBookmarks = function (params) {
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
    /// COLLECTIONS --------------------------------------------------------------
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
    /// COLLECTION PRESETS -------------------------------------------------------
    /**
     * Create a new collection preset (bookmark / listing preferences)
     */
    SDK.prototype.createCollectionPreset = function (data) {
        invariant_1.invariant(is_1.isObject(data), "data must be an object");
        return this.api.post("/collection_presets", data);
    };
    /**
     * Update collection preset (bookmark / listing preference)
     */
    SDK.prototype.updateCollectionPreset = function (primaryKey, data) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObject(data), "data must be an object");
        return this.api.patch("/collection_presets/" + primaryKey, data);
    };
    /**
     * Delete collection preset by primarykey
     */
    SDK.prototype.deleteCollectionPreset = function (primaryKey) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        return this.api.delete("/collection_presets/" + primaryKey);
    };
    /// DATABASE -----------------------------------------------------------------
    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     */
    SDK.prototype.updateDatabase = function () {
        return this.api.post("/update");
    };
    /// EXTENSIONS ---------------------------------------------------------------
    /**
     * Get the meta information of all installed interfaces
     */
    SDK.prototype.getInterfaces = function () {
        return this.api.request("get", "/interfaces", {}, {}, true);
    };
    /**
     * Get the meta information of all installed layouts
     */
    SDK.prototype.getLayouts = function () {
        return this.api.request("get", "/layouts", {}, {}, true);
    };
    /**
     * Get the meta information of all installed pages
     */
    SDK.prototype.getPages = function () {
        return this.api.request("get", "/pages", {}, {}, true);
    };
    /// FIELDS -------------------------------------------------------------------
    /**
     * Get all fields that are in Directus
     */
    SDK.prototype.getAllFields = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/fields", params);
    };
    /**
     * Get the fields that have been setup for a given collection
     */
    SDK.prototype.getFields = function (collection, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/fields/" + collection, params);
    };
    /**
     * Get the field information for a single given field
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
     */
    SDK.prototype.createField = function (collection, fieldInfo) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObject(fieldInfo), "fieldInfo must be an object");
        return this.api.post("/fields/" + collection, fieldInfo);
    };
    /**
     * Update a given field in a given collection
     */
    SDK.prototype.updateField = function (collection, fieldName, fieldInfo) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isString(fieldName), "fieldName must be a string");
        invariant_1.invariant(is_1.isObject(fieldInfo), "fieldInfo must be an object");
        return this.api.patch("/fields/" + collection + "/" + fieldName, fieldInfo);
    };
    /**
     * Update multiple fields at once
     *
     * @example
     *
     * // Set multiple fields to the same value
     * updateFields("projects", ["first_name", "last_name", "email"], {
     *   default_value: ""
     * })
     *
     * // Set multiple fields to different values
     * updateFields("projects", [
     *   {
     *     id: 14,
     *     sort: 1
     *   },
     *   {
     *     id: 17,
     *     sort: 2
     *   },
     *   {
     *     id: 912,
     *     sort: 3
     *   }
     * ])
     */
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
     */
    SDK.prototype.deleteField = function (collection, fieldName) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isString(fieldName), "fieldName must be a string");
        return this.api.delete("/fields/" + collection + "/" + fieldName);
    };
    /// FILES --------------------------------------------------------------------
    /**
     * Upload multipart files in multipart/form-data
     */
    SDK.prototype.uploadFiles = function (data, onUploadProgress) {
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
    /// ITEMS --------------------------------------------------------------------
    /**
     * Update an existing item
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
     */
    SDK.prototype.createItem = function (collection, body) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isObject(body), "body must be an object");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.post(collectionBasePath, body);
    };
    /**
     * Create multiple items
     * TODO: what should we do:
     *  a) <T extends any[] = any[]> -> Promise<IField<T>>
     *  b) <T extends any = any> -> Promise<IField<T[]>>
     *
     * which will result in the following
     *  a) createItems<Person> => Promise<IField<Person[]>>
     *  b) createItems<Person[]> => Promise<IField<Person[]>>
     */
    SDK.prototype.createItems = function (collection, body) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isArray(body), "body must be an array");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.post(collectionBasePath, body);
    };
    /**
     * Get items from a given collection
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
     */
    SDK.prototype.deleteItem = function (collection, primaryKey) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.delete(collectionBasePath + "/" + primaryKey);
    };
    /**
     * Delete multiple items by primary key
     */
    SDK.prototype.deleteItems = function (collection, primaryKeys) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isArray(primaryKeys), "primaryKeys must be an array");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.delete(collectionBasePath + "/" + primaryKeys.join());
    };
    /// LISTING PREFERENCES ------------------------------------------------------
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
    /// PERMISSIONS --------------------------------------------------------------
    /**
     * Get permissions
     */
    SDK.prototype.getPermissions = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.getItems("directus_permissions", params);
    };
    /**
     * Get the currently logged in user's permissions
     */
    SDK.prototype.getMyPermissions = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/permissions/me", params);
    };
    /**
     * Create multiple new permissions
     */
    SDK.prototype.createPermissions = function (data) {
        invariant_1.invariant(is_1.isArray(data), "data must be anarry");
        return this.api.post("/permissions", data);
    };
    /**
     * Update multiple permission records
     */
    SDK.prototype.updatePermissions = function (data) {
        invariant_1.invariant(is_1.isArray(data), "data must be anarry");
        return this.api.patch("/permissions", data);
    };
    /// RELATIONS ----------------------------------------------------------------
    /**
     * Get all relationships
     */
    SDK.prototype.getRelations = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/relations", params);
    };
    /**
     * Creates new relation
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
    /// REVISIONS ----------------------------------------------------------------
    /**
     * Get a single item's revisions by primary key
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
     */
    SDK.prototype.revert = function (collection, primaryKey, revisionID) {
        invariant_1.invariant(is_1.isString(collection), "collection must be a string");
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isNumber(revisionID), "revisionID must be a number");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.patch(collectionBasePath + "/" + primaryKey + "/revert/" + revisionID);
    };
    /// ROLES --------------------------------------------------------------------
    /**
     * Get a single user role
     */
    SDK.prototype.getRole = function (primaryKey, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isNumber(primaryKey), "primaryKey must be a number");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/roles/" + primaryKey, params);
    };
    /**
     * Get the user roles
     */
    SDK.prototype.getRoles = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/roles", params);
    };
    /**
     * Update a user role
     */
    SDK.prototype.updateRole = function (primaryKey, body) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObject(body), "body must be an object");
        return this.updateItem("directus_roles", primaryKey, body);
    };
    /**
     * Create a new user role
     */
    SDK.prototype.createRole = function (body) {
        invariant_1.invariant(is_1.isObject(body), "body must be an object");
        return this.createItem("directus_roles", body);
    };
    /**
     * Delete a user rol by primary key
     */
    SDK.prototype.deleteRole = function (primaryKey) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        return this.deleteItem("directus_roles", primaryKey);
    };
    /// SETTINGS -----------------------------------------------------------------
    /**
     * Get Directus' global settings
     */
    SDK.prototype.getSettings = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/settings", params);
    };
    /**
     * Get the "fields" for directus_settings
     */
    SDK.prototype.getSettingsFields = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/settings/fields", params);
    };
    /// USERS ---------------------------------------------------------------------
    /**
     * Get a list of available users in Directus
     */
    SDK.prototype.getUsers = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/users", params);
    };
    /**
     * Get a single Directus user
     */
    SDK.prototype.getUser = function (primaryKey, params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/users/" + primaryKey, params);
    };
    /**
     * Get the user info of the currently logged in user
     */
    SDK.prototype.getMe = function (params) {
        if (params === void 0) { params = {}; }
        invariant_1.invariant(is_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/users/me", params);
    };
    /**
     * Update a single user based on primaryKey
     */
    SDK.prototype.updateUser = function (primaryKey, body) {
        invariant_1.invariant(is_1.isNotNull(primaryKey), "primaryKey must be defined");
        invariant_1.invariant(is_1.isObject(body), "body must be an object");
        return this.updateItem("directus_users", primaryKey, body);
    };
    /// UTILS --------------------------------------------------------------------
    /**
     * Ping the API to check if it exists / is up and running
     */
    SDK.prototype.ping = function () {
        return this.api.request("get", "/server/ping", {}, {}, true);
    };
    /**
     * Get the server info from the API
     */
    SDK.prototype.serverInfo = function () {
        return this.api.request("get", "/", {}, {}, true);
    };
    /**
     * Get the server info from the project
     */
    SDK.prototype.projectInfo = function () {
        return this.api.request("get", "/");
    };
    /**
     * Get all the setup third party auth providers
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
var SDK_1 = __webpack_require__(/*! ./SDK */ "./src/SDK.ts");
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
exports.hasKeysWith = function (validator, obj, keys) {
    if (!exports.isObjectOrEmpty(obj) || !exports.isArrayOrEmpty(keys)) {
        return false;
    }
    var length = keys.length;
    for (var i = 0; i < length; i++) {
        if (!Object.prototype.hasOwnProperty.call(obj, keys[i])) {
            return false;
        }
        if (!validator(obj[keys[i]])) {
            return false;
        }
    }
    return true;
};
exports.isNotNull = function (v) { return v !== null && v !== undefined; };
exports.isString = function (v) { return v && typeof v === "string" && /\S/.test(v); };
exports.isNumber = function (v) { return isType("Number", v) && isFinite(v) && !isNaN(parseFloat(v)); };
exports.isFunction = function (v) { return v instanceof Function; };
exports.isObjectOrEmpty = function (v) { return isType("Object", v); };
exports.isArrayOrEmpty = function (v) { return isType("Array", v); };
exports.isArray = function (v) { return (!exports.isArrayOrEmpty(v) ? false : v.length > 0); };
exports.hasKeysWithString = function (obj, keys) { return exports.hasKeysWith(exports.isString, obj, keys); };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2Jhc2UtNjQvYmFzZTY0LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL2Zvcm1hdHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy9BUEkudHMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvQXV0aGVudGljYXRpb24udHMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvQ29uY3VycmVuY3lNYW5hZ2VyLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL0NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvU0RLLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3V0aWxzL2NvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvdXRpbHMvaW52YXJpYW50LnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3V0aWxzL2lzLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3V0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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsSUFFVTtBQUNaO0FBQ0EsRUFBRSxtQ0FBTztBQUNUO0FBQ0EsR0FBRztBQUFBLG9HQUFDO0FBQ0osRUFBRSxNQUFNLFlBVU47O0FBRUYsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx6Qjs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pCYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsK0NBQVM7QUFDN0IsY0FBYyxtQkFBTyxDQUFDLG1EQUFXO0FBQ2pDOztBQUVBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsS0FBSztBQUNMLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFD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ZWN0dXMtc2RrLnVtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiRGlyZWN0dXNTREtcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGlyZWN0dXNTREtcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGlyZWN0dXNTREtcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywge21ldGhvZDogJ2dldCd9LCB0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIC8vIE5vdGU6IHN0YXR1cyBpcyBub3QgZXhwb3NlZCBieSBYRG9tYWluUmVxdWVzdFxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIvKiEgaHR0cDovL210aHMuYmUvYmFzZTY0IHYwLjEuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGQ7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzAuMS4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6ICdSRkMzOTg2JyxcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBjb21tYTogJ2NvbW1hJyxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xudmFyIHB1c2hUb0FycmF5ID0gZnVuY3Rpb24gKGFyciwgdmFsdWVPckFycmF5KSB7XG4gICAgcHVzaC5hcHBseShhcnIsIGlzQXJyYXkodmFsdWVPckFycmF5KSA/IHZhbHVlT3JBcnJheSA6IFt2YWx1ZU9yQXJyYXldKTtcbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWRkUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgZm9ybWF0dGVyOiBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0c1snZGVmYXVsdCddXSxcbiAgICAvLyBkZXByZWNhdGVkXG4gICAgaW5kaWNlczogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgY2hhcnNldFxuKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSBvYmouam9pbignLCcpO1xuICAgIH1cblxuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCkgOiBwcmVmaXg7XG4gICAgICAgIH1cblxuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgaWYgKGVuY29kZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGVuY29kZVZhbHVlc09ubHkgPyBwcmVmaXggOiBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCk7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICB0eXBlb2YgZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2Z1bmN0aW9uJyA/IGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpIDogcHJlZml4LFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgICAgIGNoYXJzZXRcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxudmFyIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmVuY29kZXIgIT09IG51bGwgJiYgb3B0cy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBjaGFyc2V0ID0gb3B0cy5jaGFyc2V0IHx8IGRlZmF1bHRzLmNoYXJzZXQ7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFoYXMuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdCA9IG9wdHMuZm9ybWF0O1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cbiAgICB2YXIgZmlsdGVyID0gZGVmYXVsdHMuZmlsdGVyO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdmdW5jdGlvbicgfHwgaXNBcnJheShvcHRzLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUXVlcnlQcmVmaXg6IHR5cGVvZiBvcHRzLmFkZFF1ZXJ5UHJlZml4ID09PSAnYm9vbGVhbicgPyBvcHRzLmFkZFF1ZXJ5UHJlZml4IDogZGVmYXVsdHMuYWRkUXVlcnlQcmVmaXgsXG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0cy5kZWxpbWl0ZXIsXG4gICAgICAgIGVuY29kZTogdHlwZW9mIG9wdHMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZSxcbiAgICAgICAgZW5jb2RlcjogdHlwZW9mIG9wdHMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXIsXG4gICAgICAgIGVuY29kZVZhbHVlc09ubHk6IHR5cGVvZiBvcHRzLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICAgICAgc29ydDogdHlwZW9mIG9wdHMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc29ydCA6IG51bGwsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcblxuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoVG9BcnJheShrZXlzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2tpcE51bGxzLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGUgPyBvcHRpb25zLmVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgb3B0aW9ucy5maWx0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLnNvcnQsXG4gICAgICAgICAgICBvcHRpb25zLmFsbG93RG90cyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0dGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgb3B0aW9ucy5jaGFyc2V0XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JyksIHRoZSBcIm51bWVyaWMgZW50aXR5XCIgcmVwcmVzZW50YXRpb24gb2YgYSBjaGVja21hcmtcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lMjYlMjMxMDAwMyUzQiYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGhleFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIGFycmF5LnB1c2goJyUnICsgKChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KSkudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufSgpKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKChvcHRpb25zICYmIChvcHRpb25zLnBsYWluT2JqZWN0cyB8fCBvcHRpb25zLmFsbG93UHJvdG90eXBlcykpIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2VUYXJnZXQgPSB0YXJnZXQ7XG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIG1lcmdlVGFyZ2V0ID0gYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJdGVtID0gdGFyZ2V0W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJdGVtICYmIHR5cGVvZiB0YXJnZXRJdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBtZXJnZSh0YXJnZXRJdGVtLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKGFjYywga2V5KSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBtZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbnZhciBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ25TaW5nbGVTb3VyY2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGFjY1trZXldID0gc291cmNlW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGFyZ2V0KTtcbn07XG5cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiAoc3RyLCBkZWNvZGVyLCBjaGFyc2V0KSB7XG4gICAgdmFyIHN0cldpdGhvdXRQbHVzID0gc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgLy8gdW5lc2NhcGUgbmV2ZXIgdGhyb3dzLCBubyB0cnkuLi5jYXRjaCBuZWVkZWQ6XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cy5yZXBsYWNlKC8lWzAtOWEtZl17Mn0vZ2ksIHVuZXNjYXBlKTtcbiAgICB9XG4gICAgLy8gdXRmLThcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cldpdGhvdXRQbHVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cztcbiAgICB9XG59O1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHN0ciwgZGVmYXVsdEVuY29kZXIsIGNoYXJzZXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyIDogU3RyaW5nKHN0cik7XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgKGMgPj4gNildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgKGMgPj4gMTIpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpICs9IDE7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKCgoYyAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgJiAweDNGRikpO1xuICAgICAgICBvdXQgKz0gaGV4VGFibGVbMHhGMCB8IChjID4+IDE4KV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiAxMikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbnZhciBjb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCh2YWx1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFt7IG9iajogeyBvOiB2YWx1ZSB9LCBwcm9wOiAnbycgfV07XG4gICAgdmFyIHJlZnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZVtpXTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHsgb2JqOiBvYmosIHByb3A6IGtleSB9KTtcbiAgICAgICAgICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBhY3RRdWV1ZShxdWV1ZSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxudmFyIGlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG5cbnZhciBjb21iaW5lID0gZnVuY3Rpb24gY29tYmluZShhLCBiKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChhLCBiKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFycmF5VG9PYmplY3Q6IGFycmF5VG9PYmplY3QsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgY29tYmluZTogY29tYmluZSxcbiAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gICAgbWVyZ2U6IG1lcmdlXG59O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCAqIGFzIHFzU3RyaW5naWZ5IGZyb20gXCJxcy9saWIvc3RyaW5naWZ5XCI7XG5cbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uLCBJQXV0aGVudGljYXRpb24gfSBmcm9tIFwiLi9BdXRoZW50aWNhdGlvblwiO1xuaW1wb3J0IHsgY29uY3VycmVuY3lNYW5hZ2VyIH0gZnJvbSBcIi4vQ29uY3VycmVuY3lNYW5hZ2VyXCI7XG5pbXBvcnQgeyBJQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL0NvbmZpZ3VyYXRpb25cIjtcblxuLy8gU2NoZW1lIHR5cGVzXG5pbXBvcnQgeyBCb2R5VHlwZSB9IGZyb20gXCIuL3NjaGVtZXMvaHR0cC9Cb2R5XCI7XG5pbXBvcnQgeyBSZXF1ZXN0TWV0aG9kIH0gZnJvbSBcIi4vc2NoZW1lcy9odHRwL1JlcXVlc3RcIjtcbmltcG9ydCB7IElFcnJvciB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvRXJyb3JcIjtcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQgeyBpbnZhcmlhbnQgfSBmcm9tIFwiLi91dGlscy9pbnZhcmlhbnRcIjtcbmltcG9ydCB7IGlzQXJyYXlPckVtcHR5LCBpc09iamVjdE9yRW1wdHksIGlzU3RyaW5nIH0gZnJvbSBcIi4vdXRpbHMvaXNcIjtcbmltcG9ydCB7IGdldFBheWxvYWQgfSBmcm9tIFwiLi91dGlscy9wYXlsb2FkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFQSSB7XG4gIGF1dGg6IElBdXRoZW50aWNhdGlvbjtcbiAgeGhyOiBBeGlvc0luc3RhbmNlO1xuICBjb25jdXJyZW50OiBSZXR1cm5UeXBlPHR5cGVvZiBjb25jdXJyZW5jeU1hbmFnZXI+O1xuICByZXNldCgpOiB2b2lkO1xuICBnZXQ8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgcG9zdDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBib2R5PzogQm9keVR5cGUsIHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8VD47XG4gIHBhdGNoPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcsIGJvZHk/OiBCb2R5VHlwZSwgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgcHV0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcsIGJvZHk/OiBCb2R5VHlwZSwgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgZGVsZXRlPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcpOiBQcm9taXNlPFQ+O1xuICBnZXRQYXlsb2FkPFQgZXh0ZW5kcyBvYmplY3QgPSBvYmplY3Q+KCk6IFQ7XG4gIHJlcXVlc3Q8VCBleHRlbmRzIGFueSA9IGFueT4oXG4gICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLFxuICAgIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgcGFyYW1zPzogb2JqZWN0LFxuICAgIGRhdGE/OiBvYmplY3QsXG4gICAgbm9FbnY/OiBib29sZWFuLFxuICAgIGhlYWRlcnM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9XG4gICk6IFByb21pc2U8VD47XG59XG5cbmV4cG9ydCBjbGFzcyBBUEkgaW1wbGVtZW50cyBJQVBJIHtcbiAgcHVibGljIGF1dGg6IElBdXRoZW50aWNhdGlvbjtcbiAgcHVibGljIHhociA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgcGFyYW1zU2VyaWFsaXplcjogcXNTdHJpbmdpZnksXG4gICAgdGltZW91dDogMTAgKiA2MCAqIDEwMDAsIC8vIDEwIG1pblxuICB9KTtcbiAgcHVibGljIGNvbmN1cnJlbnQgPSBjb25jdXJyZW5jeU1hbmFnZXIodGhpcy54aHIsIDEwKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogSUNvbmZpZ3VyYXRpb24pIHtcbiAgICB0aGlzLmF1dGggPSBuZXcgQXV0aGVudGljYXRpb24oY29uZmlnLCB7XG4gICAgICBwb3N0OiB0aGlzLnBvc3QuYmluZCh0aGlzKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGNsaWVudCBpbnN0YW5jZSBieSBsb2dnaW5nIG91dCBhbmQgcmVtb3ZpbmcgdGhlIFVSTCBhbmQgcHJvamVjdFxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuYXV0aC5sb2dvdXQoKTtcbiAgICB0aGlzLmNvbmZpZy5kZWxldGUoKTtcbiAgfVxuXG4gIC8vLyBSRVFVRVNUIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBHRVQgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgKi9cbiAgcHVibGljIGdldDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVuZHBvaW50KSwgXCJlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIGVuZHBvaW50LCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBPU1QgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgKi9cbiAgcHVibGljIHBvc3Q8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keTogQm9keVR5cGUgPSB7fSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoQXJyYXkuaXNBcnJheShib2R5KSA/IGlzQXJyYXlPckVtcHR5KGJvZHkpIDogaXNPYmplY3RPckVtcHR5KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBhcnJheSBvciBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PFQ+KFwicG9zdFwiLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQQVRDSCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqL1xuICBwdWJsaWMgcGF0Y2g8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keTogQm9keVR5cGUgPSB7fSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoQXJyYXkuaXNBcnJheShib2R5KSA/IGlzQXJyYXlPckVtcHR5KGJvZHkpIDogaXNPYmplY3RPckVtcHR5KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBhcnJheSBvciBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PFQ+KFwicGF0Y2hcIiwgZW5kcG9pbnQsIHBhcmFtcywgYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogUFVUIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICovXG4gIHB1YmxpYyBwdXQ8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keTogQm9keVR5cGUgPSB7fSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoQXJyYXkuaXNBcnJheShib2R5KSA/IGlzQXJyYXlPckVtcHR5KGJvZHkpIDogaXNPYmplY3RPckVtcHR5KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBhcnJheSBvciBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PFQ+KFwicHV0XCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERFTEVURSBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZW5kcG9pbnQpLCBcImVuZHBvaW50IG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PFQ+KFwiZGVsZXRlXCIsIGVuZHBvaW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwYXlsb2FkIG9mIHRoZSBjdXJyZW50IHRva2VuLCByZXR1cm4gdHlwZSBjYW4gYmUgZ2VuZXJpY1xuICAgKi9cbiAgcHVibGljIGdldFBheWxvYWQ8VCBleHRlbmRzIG9iamVjdCA9IG9iamVjdD4oKTogVCB7XG4gICAgaWYgKCFpc1N0cmluZyh0aGlzLmNvbmZpZy50b2tlbikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRQYXlsb2FkPFQ+KHRoaXMuY29uZmlnLnRva2VuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGFuIEFQSSByZXF1ZXN0IHRvIHRoZSBEaXJlY3R1cyBBUElcbiAgICovXG4gIHB1YmxpYyByZXF1ZXN0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KFxuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZCxcbiAgICBlbmRwb2ludDogc3RyaW5nLFxuICAgIHBhcmFtczogb2JqZWN0ID0ge30sXG4gICAgZGF0YTogb2JqZWN0ID0ge30sXG4gICAgbm9FbnY6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge31cbiAgKTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKG1ldGhvZCksIFwibWV0aG9kIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVuZHBvaW50KSwgXCJlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKHRoaXMuY29uZmlnLnVybCksIFwibWFpbiB1cmwgbXVzdCBiZSBkZWZpbmVkIChzZWUgY29uc3RydWN0b3IpXCIpO1xuICAgIGludmFyaWFudChBcnJheS5pc0FycmF5KGRhdGEpID8gaXNBcnJheU9yRW1wdHkoZGF0YSkgOiBpc09iamVjdE9yRW1wdHkoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIGFycmF5IG9yIG9iamVjdFwiKTtcblxuICAgIGxldCBiYXNlVVJMID0gYCR7dGhpcy5jb25maWcudXJsfS9gO1xuXG4gICAgaWYgKG5vRW52ID09PSBmYWxzZSkge1xuICAgICAgYmFzZVVSTCArPSBgJHt0aGlzLmNvbmZpZy5wcm9qZWN0fS9gO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgYmFzZVVSTCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXJzLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgdXJsOiBlbmRwb2ludCxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnRva2VuICYmIGlzU3RyaW5nKHRoaXMuY29uZmlnLnRva2VuKSAmJiB0aGlzLmNvbmZpZy50b2tlbi5sZW5ndGggPiAwKSB7XG4gICAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgIHJlcXVlc3RPcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0aGlzLmNvbmZpZy50b2tlbn1gO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnhoclxuICAgICAgLnJlcXVlc3QocmVxdWVzdE9wdGlvbnMpXG4gICAgICAudGhlbigocmVzOiB7IGRhdGE6IGFueSB9KSA9PiByZXMuZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZURhdGE6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlRGF0YSB8fCByZXNwb25zZURhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlRGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3BvbnNlRGF0YSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlRGF0YSBhcyBUO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IElFcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmpzb24gPT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICBjb2RlOiAtMixcbiAgICAgICAgICAgIGRhdGE6IGVycm9yLmRhdGEsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IuZXJyb3IsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkFQSSByZXR1cm5lZCBpbnZhbGlkIEpTT05cIixcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk5ldHdvcmsgRXJyb3JcIixcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUNvbmZpZ3VyYXRpb24sIElDb25maWd1cmF0aW9uVmFsdWVzIH0gZnJvbSBcIi4vQ29uZmlndXJhdGlvblwiO1xuXG4vLyBTY2hlbWUgdHlwZXNcbmltcG9ydCB7IElBdXRoZW50aWNhdGVSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvYXV0aC9BdXRoZW50aWNhdGVcIjtcbmltcG9ydCB7IElMb2dpbkNyZWRlbnRpYWxzLCBJTG9naW5PcHRpb25zIH0gZnJvbSBcIi4vc2NoZW1lcy9hdXRoL0xvZ2luXCI7XG5pbXBvcnQgeyBJTG9naW5SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvTG9naW5cIjtcbmltcG9ydCB7IElSZWZyZXNoVG9rZW5SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvVG9rZW5cIjtcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQgeyBpbnZhcmlhbnQgfSBmcm9tIFwiLi91dGlscy9pbnZhcmlhbnRcIjtcbmltcG9ydCB7IGhhc0tleXNXaXRoU3RyaW5nLCBpc0Z1bmN0aW9uLCBpc09iamVjdCwgaXNTdHJpbmcgfSBmcm9tIFwiLi91dGlscy9pc1wiO1xuaW1wb3J0IHsgZ2V0UGF5bG9hZCB9IGZyb20gXCIuL3V0aWxzL3BheWxvYWRcIjtcblxuaW50ZXJmYWNlIElBdXRoZW50aWNhdGlvblJlZnJlc2hFcnJvciB7XG4gIGNvZGU/OiBudW1iZXI7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElBdXRoZW50aWNhdGlvbkluamVjdGFibGVQcm9wcyB7XG4gIHBvc3Q8VD4odXJsOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dGhlbnRpY2F0aW9uIHtcbiAgcmVmcmVzaEludGVydmFsPzogbnVtYmVyO1xuICBpc0xvZ2dlZEluKCk6IGJvb2xlYW47XG4gIGxvZ2luKGNyZWRlbnRpYWxzOiBJTG9naW5DcmVkZW50aWFscywgb3B0aW9uczogSUxvZ2luT3B0aW9ucyk6IFByb21pc2U8SUxvZ2luUmVzcG9uc2U+O1xuICBsb2dvdXQoKTogdm9pZDtcbiAgcmVmcmVzaElmTmVlZGVkKCk6IFByb21pc2U8W2Jvb2xlYW4sIEVycm9yP10+O1xuICByZWZyZXNoKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPElSZWZyZXNoVG9rZW5SZXNwb25zZT47XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbiBpbXBsZW1lbnRzIElBdXRoZW50aWNhdGlvbiB7XG4gIHB1YmxpYyByZWZyZXNoSW50ZXJ2YWw/OiBudW1iZXI7XG4gIHByaXZhdGUgb25BdXRvUmVmcmVzaEVycm9yPzogKG1zZzogSUF1dGhlbnRpY2F0aW9uUmVmcmVzaEVycm9yKSA9PiB2b2lkO1xuICBwcml2YXRlIG9uQXV0b1JlZnJlc2hTdWNjZXNzPzogKGNvbmZpZzogSUNvbmZpZ3VyYXRpb25WYWx1ZXMpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IElDb25maWd1cmF0aW9uLCBwcml2YXRlIGluamVjdDogSUF1dGhlbnRpY2F0aW9uSW5qZWN0YWJsZVByb3BzKSB7XG4gICAgLy8gT25seSBzdGFydCB0aGUgYXV0byByZWZyZXNoIGludGVydmFsIGlmIHRoZSB0b2tlbiBleGlzdHMgYW5kIGl0J3MgYSBKV1RcbiAgICBpZiAoY29uZmlnLnRva2VuICYmIGNvbmZpZy50b2tlbi5pbmNsdWRlcyhcIi5cIikpIHtcbiAgICAgIHRoaXMuc3RhcnRJbnRlcnZhbCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGN1cnJlbnQgYXV0aCBzdGF0dXMgaXMgbG9nZ2VkIGluXG4gICAqL1xuICBwdWJsaWMgaXNMb2dnZWRJbigpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICBpc1N0cmluZyh0aGlzLmNvbmZpZy50b2tlbikgJiZcbiAgICAgIGlzU3RyaW5nKHRoaXMuY29uZmlnLnVybCkgJiZcbiAgICAgIGlzU3RyaW5nKHRoaXMuY29uZmlnLnByb2plY3QpICYmXG4gICAgICBpc09iamVjdCh0aGlzLmdldFBheWxvYWQoKSlcbiAgICApIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2NhbEV4cCA+IERhdGUubm93KCkpIHtcbiAgICAgICAgLy8gTm90IGV4cGlyZWQsIHN1Y2NlZWRcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dpbiB0byB0aGUgQVBJOyBHZXRzIGEgbmV3IHRva2VuIGZyb20gdGhlIEFQSSBhbmQgc3RvcmVzIGl0IGluIHRoaXMudG9rZW4uXG4gICAqL1xuICBwdWJsaWMgbG9naW4oXG4gICAgY3JlZGVudGlhbHM6IElMb2dpbkNyZWRlbnRpYWxzLFxuICAgIG9wdGlvbnM6IElMb2dpbk9wdGlvbnMgPSB7IHBlcnNpc3Q6IHRydWUsIHN0b3JhZ2U6IGZhbHNlIH1cbiAgKTogUHJvbWlzZTxJTG9naW5SZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdChjcmVkZW50aWFscyksIFwibWFsZm9ybWVkIGNyZWRlbnRpYWxzXCIpO1xuICAgIGludmFyaWFudChoYXNLZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgW1wiZW1haWxcIiwgXCJwYXNzd29yZFwiXSksIFwiZW1haWwgJiBwYXNzd29yZCByZXF1aXJlZCBpbiBjcmVkZW50aWFsc1wiKTtcblxuICAgIHRoaXMuY29uZmlnLnRva2VuID0gbnVsbDtcblxuICAgIGlmIChoYXNLZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgW1widXJsXCJdKSkge1xuICAgICAgdGhpcy5jb25maWcudXJsID0gY3JlZGVudGlhbHMudXJsO1xuICAgIH1cblxuICAgIGlmIChoYXNLZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgW1wicHJvamVjdFwiXSkpIHtcbiAgICAgIHRoaXMuY29uZmlnLnByb2plY3QgPSBjcmVkZW50aWFscy5wcm9qZWN0O1xuICAgIH1cblxuICAgIGlmIChjcmVkZW50aWFscy5wZXJzaXN0IHx8IG9wdGlvbnMucGVyc2lzdCkge1xuICAgICAgdGhpcy5zdGFydEludGVydmFsKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuaW5qZWN0XG4gICAgICAgIC5wb3N0KFwiL2F1dGgvYXV0aGVudGljYXRlXCIsIHtcbiAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzOiBJQXV0aGVudGljYXRlUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAvLyBTYXZlIG5ldyB0b2tlbiBpbiBjb25maWd1cmF0aW9uXG4gICAgICAgICAgcmV0dXJuICh0aGlzLmNvbmZpZy50b2tlbiA9IHJlcy5kYXRhLnRva2VuKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAvLyBFeHBpcnkgZGF0ZSBpcyB0aGUgbW9tZW50IHdlIGdvdCB0aGUgdG9rZW4gKyA1IG1pbnV0ZXNcbiAgICAgICAgICB0aGlzLmNvbmZpZy5sb2NhbEV4cCA9IG5ldyBEYXRlKERhdGUubm93KCkgKyB0aGlzLmNvbmZpZy50b2tlbkV4cGlyYXRpb25UaW1lKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGxvY2FsRXhwOiB0aGlzLmNvbmZpZy5sb2NhbEV4cCxcbiAgICAgICAgICAgIHByb2plY3Q6IHRoaXMuY29uZmlnLnByb2plY3QsXG4gICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgIHVybDogdGhpcy5jb25maWcudXJsLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSB1c2VyIG91dCBieSBcImZvcmdldHRpbmdcIiB0aGUgdG9rZW4sIGFuZCBjbGVhcmluZyB0aGUgcmVmcmVzaCBpbnRlcnZhbFxuICAgKi9cbiAgcHVibGljIGxvZ291dCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZy5yZXNldCgpO1xuXG4gICAgaWYgKHRoaXMucmVmcmVzaEludGVydmFsKSB7XG4gICAgICB0aGlzLnN0b3BJbnRlcnZhbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vLyBSRUZSRVNIIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIHRoZSB0b2tlbiBpZiBpdCBpcyBhYm91dCB0byBleHBpcmUgKHdpdGhpbiAzMCBzZWNvbmRzIG9mIGV4cGlyeSBkYXRlKS5cbiAgICogLSBDYWxscyBvbkF1dG9SZWZyZXNoU3VjY2VzcyB3aXRoIHRoZSBuZXcgdG9rZW4gaWYgdGhlIHJlZnJlc2hpbmcgaXMgc3VjY2Vzc2Z1bC5cbiAgICogLSBDYWxscyBvbkF1dG9SZWZyZXNoRXJyb3IgaWYgcmVmcmVzaGluZyB0aGUgdG9rZW4gZmFpbHMgZm9yIHNvbWUgcmVhc29uLlxuICAgKiBAcmV0dXJucyB7W2Jvb2xlYW4sIEVycm9yP119XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaElmTmVlZGVkKCk6IFByb21pc2U8W2Jvb2xlYW4sIEVycm9yP10+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRQYXlsb2FkPHsgZXhwOiBhbnkgfT4oKTtcblxuICAgIGlmICghaXNTdHJpbmcodGhpcy5jb25maWcudG9rZW4pIHx8ICFpc1N0cmluZyh0aGlzLmNvbmZpZy51cmwpIHx8ICFpc1N0cmluZyh0aGlzLmNvbmZpZy5wcm9qZWN0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghcGF5bG9hZCB8fCAhcGF5bG9hZC5leHApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lRGlmZiA9ICh0aGlzLmNvbmZpZy5sb2NhbEV4cCB8fCAwKSAtIERhdGUubm93KCk7XG5cbiAgICBpZiAodGltZURpZmYgPD0gMCkge1xuICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IpKSB7XG4gICAgICAgIHRoaXMub25BdXRvUmVmcmVzaEVycm9yKHtcbiAgICAgICAgICBjb2RlOiAxMDIsXG4gICAgICAgICAgbWVzc2FnZTogXCJhdXRoX2V4cGlyZWRfdG9rZW5cIixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRpbWVEaWZmIDwgMzAwMDApIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxbYm9vbGVhbiwgRXJyb3I/XT4oKHJlc29sdmU6IChyZXM6IFtib29sZWFuLCBFcnJvcj9dKSA9PiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKHRoaXMuY29uZmlnLnRva2VuKVxuICAgICAgICAgIC50aGVuKChyZXM6IElSZWZyZXNoVG9rZW5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxFeHAgPSAodGhpcy5jb25maWcubG9jYWxFeHAgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGhpcy5jb25maWcudG9rZW5FeHBpcmF0aW9uVGltZSkuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gKHRoaXMuY29uZmlnLnRva2VuID0gcmVzLmRhdGEudG9rZW4gfHwgdGhpcy5jb25maWcudG9rZW4pO1xuICAgICAgICAgICAgY29uc3QgYXV0b3JlZnJlc2hSZXN1bHQgPSB7XG4gICAgICAgICAgICAgIGxvY2FsRXhwLFxuICAgICAgICAgICAgICBwcm9qZWN0OiB0aGlzLmNvbmZpZy5wcm9qZWN0LFxuICAgICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgICAgdXJsOiB0aGlzLmNvbmZpZy51cmwsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBJZiBhdXRvcmVmcmVzaCBzdWNjZWVkZWRcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMub25BdXRvUmVmcmVzaFN1Y2Nlc3MpKSB7XG4gICAgICAgICAgICAgIHRoaXMub25BdXRvUmVmcmVzaFN1Y2Nlc3MoYXV0b3JlZnJlc2hSZXN1bHQpO1xuICAgICAgICAgICAgICByZXNvbHZlKFt0cnVlXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIGV4cGlyYXRpb24gdmlhIHN0b3JhZ2VcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnVwZGF0ZShhdXRvcmVmcmVzaFJlc3VsdCk7XG4gICAgICAgICAgICByZXNvbHZlKFt0cnVlXSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IpKSB7XG4gICAgICAgICAgICAgIHRoaXMub25BdXRvUmVmcmVzaEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShbdHJ1ZSwgZXJyb3JdKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoW2ZhbHNlXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgcGFzc2VkIHRva2VuIHRvIHJlcXVlc3QgYSBuZXcgb25lXG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaCh0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxJUmVmcmVzaFRva2VuUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodG9rZW4pLCBcInRva2VuIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5pbmplY3QucG9zdDxJUmVmcmVzaFRva2VuUmVzcG9uc2U+KFwiL2F1dGgvcmVmcmVzaFwiLCB7IHRva2VuIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhbiBpbnRlcnZhbCBvZiAxMCBzZWNvbmRzIHRoYXQgd2lsbCBjaGVjayBpZiB0aGUgdG9rZW4gbmVlZHMgcmVmcmVzaGluZ1xuICAgKi9cbiAgcHJpdmF0ZSBzdGFydEludGVydmFsKGZpcmVJbW1lZGlhdGVseT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICB0aGlzLnJlZnJlc2hJZk5lZWRlZCgpO1xuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaEludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5yZWZyZXNoSWZOZWVkZWQuYmluZCh0aGlzKSwgMTAwMDApIGFzIGFueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYW5kIG51bGxpZmllcyB0aGUgdG9rZW4gcmVmcmVzaGluZyBpbnRlcnZhbFxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wSW50ZXJ2YWwoKTogdm9pZCB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZnJlc2hJbnRlcnZhbCk7XG4gICAgdGhpcy5yZWZyZXNoSW50ZXJ2YWwgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBheWxvYWQgb2YgdGhlIGN1cnJlbnQgdG9rZW4sIHJldHVybiB0eXBlIGNhbiBiZSBnZW5lcmljXG4gICAqL1xuICBwcml2YXRlIGdldFBheWxvYWQ8VCBleHRlbmRzIG9iamVjdCA9IG9iamVjdD4oKTogVCB7XG4gICAgaWYgKCFpc1N0cmluZyh0aGlzLmNvbmZpZy50b2tlbikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRQYXlsb2FkPFQ+KHRoaXMuY29uZmlnLnRva2VuKTtcbiAgfVxufVxuIiwiLy8gdHNsaW50OmRpc2FibGU6IG9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xuaW1wb3J0IHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXF1ZXN0Q29uZmlnLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSBcImF4aW9zXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmN1cnJlbmN5UXVldWVJdGVtIHtcbiAgcmVxdWVzdDogQXhpb3NSZXF1ZXN0Q29uZmlnO1xuICByZXNvbHZlcjogKHF1ZXVlZFJlcXVlc3Q6IEF4aW9zUmVxdWVzdENvbmZpZykgPT4gYW55O1xufVxuXG5leHBvcnQgY29uc3QgY29uY3VycmVuY3lNYW5hZ2VyID0gKGF4aW9zOiBBeGlvc0luc3RhbmNlLCBsaW1pdDogbnVtYmVyID0gMTApID0+IHtcbiAgaWYgKGxpbWl0IDwgMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvbmN1cnJlbmN5TWFuYWdlciBFcnJvcjogbWluaW11biBjb25jdXJyZW50IHJlcXVlc3RzIGlzIDFcIik7XG4gIH1cblxuICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICBsaW1pdCxcbiAgICBxdWV1ZTogW10gYXMgSUNvbmN1cnJlbmN5UXVldWVJdGVtW10sXG4gICAgcnVubmluZzogW10gYXMgSUNvbmN1cnJlbmN5UXVldWVJdGVtW10sXG4gICAgaW50ZXJjZXB0b3JzOiB7XG4gICAgICByZXF1ZXN0OiBudWxsLFxuICAgICAgcmVzcG9uc2U6IG51bGwsXG4gICAgfSxcbiAgICBwdXNoKHJlcUhhbmRsZXI6IElDb25jdXJyZW5jeVF1ZXVlSXRlbSkge1xuICAgICAgaW5zdGFuY2UucXVldWUucHVzaChyZXFIYW5kbGVyKTtcbiAgICAgIGluc3RhbmNlLnNoaWZ0SW5pdGlhbCgpO1xuICAgIH0sXG4gICAgc2hpZnRJbml0aWFsKCk6IHZvaWQge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5ydW5uaW5nLmxlbmd0aCA8IGluc3RhbmNlLmxpbWl0KSB7XG4gICAgICAgICAgaW5zdGFuY2Uuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfSxcbiAgICBzaGlmdCgpOiB2b2lkIHtcbiAgICAgIGlmIChpbnN0YW5jZS5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgcXVldWVkID0gaW5zdGFuY2UucXVldWUuc2hpZnQoKTtcblxuICAgICAgICBxdWV1ZWQucmVzb2x2ZXIocXVldWVkLnJlcXVlc3QpO1xuICAgICAgICBpbnN0YW5jZS5ydW5uaW5nLnB1c2gocXVldWVkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIHVzZSBhcyBpbnRlcmNlcHRvci4gUXVldWUgb3V0Z29pbmcgcmVxdWVzdHNcbiAgICByZXF1ZXN0SGFuZGxlcihyZXE6IEF4aW9zUmVxdWVzdENvbmZpZyk6IFByb21pc2U8QXhpb3NSZXF1ZXN0Q29uZmlnPiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGluc3RhbmNlLnB1c2goe1xuICAgICAgICAgIHJlcXVlc3Q6IHJlcSxcbiAgICAgICAgICByZXNvbHZlcjogcmVzb2x2ZSxcbiAgICAgICAgfSBhcyBJQ29uY3VycmVuY3lRdWV1ZUl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICAvLyB1c2UgYXMgaW50ZXJjZXB0b3IuIEV4ZWN1dGUgcXVldWVkIHJlcXVlc3QgdXBvbiByZWNlaXZpbmcgYSByZXNwb25zZVxuICAgIHJlc3BvbnNlSGFuZGxlcihyZXM6IEF4aW9zUmVzcG9uc2U8YW55Pik6IEF4aW9zUmVzcG9uc2U8YW55PiB7XG4gICAgICBpbnN0YW5jZS5ydW5uaW5nLnNoaWZ0KCk7XG4gICAgICBpbnN0YW5jZS5zaGlmdCgpO1xuXG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0sXG4gICAgZGV0YWNoKCk6IHZvaWQge1xuICAgICAgYXhpb3MuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZWplY3QoaW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlcXVlc3QpO1xuICAgICAgYXhpb3MuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmVqZWN0KGluc3RhbmNlLmludGVyY2VwdG9ycy5yZXNwb25zZSk7XG4gICAgfSxcbiAgICBhdHRhY2gobGltaXRDb25jdXJyZW50UmVxdWVzdHNUbz86IG51bWJlcik6IHZvaWQge1xuICAgICAgaWYgKGxpbWl0Q29uY3VycmVudFJlcXVlc3RzVG8pIHtcbiAgICAgICAgaW5zdGFuY2UubGltaXQgPSBsaW1pdENvbmN1cnJlbnRSZXF1ZXN0c1RvO1xuICAgICAgfVxuXG4gICAgICAvLyBxdWV1ZSBjb25jdXJyZW50IHJlcXVlc3RzXG4gICAgICBpbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVxdWVzdCA9IGF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShpbnN0YW5jZS5yZXF1ZXN0SGFuZGxlcik7XG4gICAgICBpbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVzcG9uc2UgPSBheGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKFxuICAgICAgICBpbnN0YW5jZS5yZXNwb25zZUhhbmRsZXIsXG4gICAgICAgIGluc3RhbmNlLnJlc3BvbnNlSGFuZGxlclxuICAgICAgKTtcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn07XG4iLCJpbXBvcnQgeyBpbnZhcmlhbnQgfSBmcm9tIFwiLi91dGlscy9pbnZhcmlhbnRcIjtcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSBcIi4vdXRpbHMvaXNcIjtcblxuY29uc3QgU1RPUkFHRV9LRVkgPSBcImRpcmVjdHVzLXNkay1qc1wiO1xuXG5pbnRlcmZhY2UgSVN0b3JhZ2VBUEkge1xuICBnZXRJdGVtPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGtleTogc3RyaW5nKTogVDtcbiAgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XG4gIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uVmFsdWVzIHtcbiAgdXJsOiBzdHJpbmc7XG4gIHByb2plY3Q6IHN0cmluZztcbiAgdG9rZW4/OiBzdHJpbmc7XG4gIGxvY2FsRXhwPzogbnVtYmVyO1xuICB0b2tlbkV4cGlyYXRpb25UaW1lPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uIHtcbiAgdG9rZW46IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIHByb2plY3Q6IHN0cmluZztcbiAgbG9jYWxFeHA/OiBudW1iZXI7XG4gIHRva2VuRXhwaXJhdGlvblRpbWU6IG51bWJlcjtcbiAgZGVoeWRyYXRlKCk6IElDb25maWd1cmF0aW9uVmFsdWVzO1xuICBkZWxldGUoKTtcbiAgaHlkcmF0ZShjb25maWc6IElDb25maWd1cmF0aW9uVmFsdWVzKTtcbiAgcGFydGlhbFVwZGF0ZShjb25maWc6IFBhcnRpYWw8SUNvbmZpZ3VyYXRpb25WYWx1ZXM+KTogdm9pZDtcbiAgcmVzZXQoKTogdm9pZDtcbiAgdXBkYXRlKGNvbmZpZzogSUNvbmZpZ3VyYXRpb25WYWx1ZXMpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uT3B0aW9ucyB7XG4gIHVybDogc3RyaW5nO1xuICB0b2tlbj86IHN0cmluZztcbiAgcHJvamVjdD86IHN0cmluZztcbiAgbG9jYWxFeHA/OiBudW1iZXI7XG4gIHRva2VuRXhwaXJhdGlvblRpbWU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIGltcGxlbWVudHMgSUNvbmZpZ3VyYXRpb24ge1xuICBwcml2YXRlIGludGVybmFsQ29uZmlndXJhdGlvbjogSUNvbmZpZ3VyYXRpb25WYWx1ZXM7XG5cbiAgY29uc3RydWN0b3IoaW5pdGlhbENvbmZpZzogSUNvbmZpZ3VyYXRpb25PcHRpb25zLCBwcml2YXRlIHN0b3JhZ2U/OiBJU3RvcmFnZUFQSSkge1xuICAgIGxldCBkZWh5ZHJhdGVkQ29uZmlnOiBJQ29uZmlndXJhdGlvbk9wdGlvbnMgPSB7fSBhcyBhbnk7XG5cbiAgICBpZiAoc3RvcmFnZSkge1xuICAgICAgZGVoeWRyYXRlZENvbmZpZyA9IHRoaXMuZGVoeWRyYXRlKCk7XG4gICAgICAvLyBUT0RPOiBtYXliZSBqdXN0IGRlaHlkcmF0ZSBhbmQgc2tpcCByZS1zZXR0aW5nIHRoZSBjb25maWd1cmF0aW9uP1xuICAgICAgLy8gcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gbWFrZSBpdCBzYWZlIGZvciB0aGUgdW50eXBlZCBKYXZhU2NyaXB0IHdvcmxkIHRvIHByZXZlbnQgaXNzdWVzXG4gICAgaW5pdGlhbENvbmZpZyA9IGluaXRpYWxDb25maWcgfHwgKHt9IGFzIGFueSk7XG5cbiAgICBjb25zdCBwcm9qZWN0ID0gZGVoeWRyYXRlZENvbmZpZy5wcm9qZWN0IHx8IGluaXRpYWxDb25maWcucHJvamVjdCB8fCBcIl9cIjtcbiAgICBjb25zdCB0b2tlbkV4cGlyYXRpb25UaW1lID1cbiAgICAgIGRlaHlkcmF0ZWRDb25maWcudG9rZW5FeHBpcmF0aW9uVGltZSB8fCBpbml0aWFsQ29uZmlnLnRva2VuRXhwaXJhdGlvblRpbWUgfHwgNSAqIDYgKiAxMDAwO1xuXG4gICAgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAuLi5kZWh5ZHJhdGVkQ29uZmlnLFxuICAgICAgLi4uaW5pdGlhbENvbmZpZyxcbiAgICAgIHByb2plY3QsXG4gICAgICB0b2tlbkV4cGlyYXRpb25UaW1lLFxuICAgIH07XG4gIH1cblxuICAvLyBBQ0NFU1NPUlMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBwdWJsaWMgZ2V0IHRva2VuKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnRva2VuO1xuICB9XG5cbiAgcHVibGljIHNldCB0b2tlbih0b2tlbjogc3RyaW5nKSB7XG4gICAgdGhpcy5wYXJ0aWFsVXBkYXRlKHsgdG9rZW4gfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRva2VuRXhwaXJhdGlvblRpbWUoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24udG9rZW5FeHBpcmF0aW9uVGltZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdG9rZW5FeHBpcmF0aW9uVGltZSh0b2tlbkV4cGlyYXRpb25UaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLnBhcnRpYWxVcGRhdGUoe1xuICAgICAgdG9rZW5FeHBpcmF0aW9uVGltZTogdG9rZW5FeHBpcmF0aW9uVGltZSAqIDYwMDAwLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24udXJsO1xuICB9XG5cbiAgcHVibGljIHNldCB1cmwodXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhcnRpYWxVcGRhdGUoeyB1cmwgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByb2plY3QoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24ucHJvamVjdDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcHJvamVjdChwcm9qZWN0OiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhcnRpYWxVcGRhdGUoe1xuICAgICAgcHJvamVjdDogcHJvamVjdCB8fCBcIl9cIixcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbG9jYWxFeHAoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24ubG9jYWxFeHA7XG4gIH1cblxuICBwdWJsaWMgc2V0IGxvY2FsRXhwKGxvY2FsRXhwOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnBhcnRpYWxVcGRhdGUoeyBsb2NhbEV4cCB9KTtcbiAgfVxuXG4gIC8vIEhFTFBFUiBNRVRIT0RTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHB1YmxpYyB2YWxpZGF0ZSgpIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodGhpcy51cmwpLCBcImNvbmZpZ3VyYXRpb24gLSB1cmwgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc1N0cmluZyh0aGlzLnByb2plY3QpLCBcImNvbmZpZ3VyYXRpb24gLSBwcm9qZWN0IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodGhpcy50b2tlbiksIFwiY29uZmlndXJhdGlvbiAtIHByb2plY3QgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShjb25maWc6IElDb25maWd1cmF0aW9uVmFsdWVzKTogdm9pZCB7XG4gICAgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24gPSBjb25maWc7XG5cbiAgICB0aGlzLmh5ZHJhdGUoY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJ0aWFsVXBkYXRlKGNvbmZpZzogUGFydGlhbDxJQ29uZmlndXJhdGlvblZhbHVlcz4pOiB2b2lkIHtcbiAgICB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgIC4uLnRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLFxuICAgICAgLi4uY29uZmlnLFxuICAgIH07XG5cbiAgICB0aGlzLmh5ZHJhdGUodGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24pO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi50b2tlbjtcbiAgICBkZWxldGUgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24udXJsO1xuICAgIGRlbGV0ZSB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi5sb2NhbEV4cDtcblxuICAgIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnByb2plY3QgPSBcIl9cIjtcblxuICAgIHRoaXMuZGVsZXRlKCk7XG4gIH1cblxuICAvLyBTVE9SQUdFIE1FVEhPRFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBwdWJsaWMgZGVoeWRyYXRlKCk6IElDb25maWd1cmF0aW9uVmFsdWVzIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuc3RvcmFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5hdGl2ZVZhbHVlID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpO1xuXG4gICAgaWYgKCFuYXRpdmVWYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZENvbmZpZyA9IEpTT04ucGFyc2UobmF0aXZlVmFsdWUpO1xuICAgIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uID0gcGFyc2VkQ29uZmlnO1xuXG4gICAgcmV0dXJuIHBhcnNlZENvbmZpZztcbiAgfVxuXG4gIHB1YmxpYyBoeWRyYXRlKHByb3BzOiBJQ29uZmlndXJhdGlvblZhbHVlcykge1xuICAgIGlmICghdGhpcy5zdG9yYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHByb3BzKSk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdG9yYWdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9LRVkpO1xuICB9XG59XG4iLCIvLyBTY2hlbWVzIHR5cGVzXG5pbXBvcnQgeyBJTG9naW5DcmVkZW50aWFscywgSUxvZ2luT3B0aW9ucyB9IGZyb20gXCIuL3NjaGVtZXMvYXV0aC9Mb2dpblwiO1xuaW1wb3J0IHsgQm9keVR5cGUgfSBmcm9tIFwiLi9zY2hlbWVzL2h0dHAvQm9keVwiO1xuaW1wb3J0IHsgSUFjdGl2aXR5UmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0FjdGl2aXR5XCI7XG5pbXBvcnQgeyBJQ29sbGVjdGlvblJlc3BvbnNlLCBJQ29sbGVjdGlvbnNSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvQ29sbGVjdGlvblwiO1xuaW1wb3J0IHsgSUVycm9yIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9FcnJvclwiO1xuaW1wb3J0IHsgSUZpZWxkIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9GaWVsZFwiO1xuaW1wb3J0IHsgSUxvZ2luUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0xvZ2luXCI7XG5pbXBvcnQgeyBJUmV2aXNpb25SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvUmV2aXNpb25cIjtcbmltcG9ydCB7IElSb2xlUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1JvbGVcIjtcbmltcG9ydCB7IElSZWZyZXNoVG9rZW5SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvVG9rZW5cIjtcbmltcG9ydCB7IElVc2VyUmVzcG9uc2UsIElVc2Vyc1Jlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Vc2VyXCI7XG5pbXBvcnQgeyBQcmltYXJ5S2V5VHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8vIFV0aWxpdGllc1xuaW1wb3J0IHsgZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoIH0gZnJvbSBcIi4vdXRpbHMvY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgZ2V0UGF5bG9hZCB9IGZyb20gXCIuL3V0aWxzL3BheWxvYWRcIjtcblxuLy8gTWFuYWdlciBjbGFzc2VzXG5pbXBvcnQgeyBBUEksIElBUEkgfSBmcm9tIFwiLi9BUElcIjtcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIElDb25maWd1cmF0aW9uLCBJQ29uZmlndXJhdGlvbk9wdGlvbnMgfSBmcm9tIFwiLi9Db25maWd1cmF0aW9uXCI7XG5cbi8vIEludmFyaWFudCB2aW9sYXRpb25cbmltcG9ydCB7IGludmFyaWFudCB9IGZyb20gXCIuL3V0aWxzL2ludmFyaWFudFwiO1xuaW1wb3J0IHsgaXNBcnJheSwgaXNOb3ROdWxsLCBpc051bWJlciwgaXNPYmplY3QsIGlzT2JqZWN0T3JFbXB0eSwgaXNTdHJpbmcgfSBmcm9tIFwiLi91dGlscy9pc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTREsge1xuICBsb2dnZWRJbjogYm9vbGVhbjtcbiAgY29uZmlnOiBJQ29uZmlndXJhdGlvbjtcbiAgYXBpOiBJQVBJO1xuICBwYXlsb2FkOiBhbnk7XG4gIGxvZ2luKGNyZWRlbnRpYWxzOiBJTG9naW5DcmVkZW50aWFscywgb3B0aW9ucz86IElMb2dpbk9wdGlvbnMpOiBQcm9taXNlPElMb2dpblJlc3BvbnNlPjtcbiAgbG9nb3V0KCk6IHZvaWQ7XG4gIHJlc2V0KCk6IHZvaWQ7XG4gIHJlZnJlc2hJZk5lZWRlZCgpOiBQcm9taXNlPFtib29sZWFuLCBFcnJvcj9dPjtcbiAgcmVmcmVzaCh0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxJUmVmcmVzaFRva2VuUmVzcG9uc2U+O1xuICByZXF1ZXN0UGFzc3dvcmRSZXNldDxUIGV4dGVuZHMgYW55ID0gYW55PihlbWFpbDogc3RyaW5nKTogUHJvbWlzZTxUPjtcbiAgZ2V0QWN0aXZpdHkocGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxJQWN0aXZpdHlSZXNwb25zZT47XG4gIGdldE15Qm9va21hcmtzPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPFQ+O1xuICBnZXRDb2xsZWN0aW9ucyhwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPElDb2xsZWN0aW9uc1Jlc3BvbnNlW10+O1xuICBnZXRDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZywgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxJQ29sbGVjdGlvblJlc3BvbnNlPjtcbiAgY3JlYXRlQ29sbGVjdGlvbihkYXRhOiBvYmplY3QpOiBQcm9taXNlPElDb2xsZWN0aW9uUmVzcG9uc2U+O1xuICB1cGRhdGVDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZywgZGF0YTogb2JqZWN0KTogUHJvbWlzZTxJQ29sbGVjdGlvblJlc3BvbnNlPjtcbiAgZGVsZXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xuICBjcmVhdGVDb2xsZWN0aW9uUHJlc2V0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGRhdGE6IG9iamVjdCk6IFByb21pc2U8VD47XG4gIHVwZGF0ZUNvbGxlY3Rpb25QcmVzZXQ8VCBleHRlbmRzIGFueSA9IGFueT4ocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIGRhdGE6IG9iamVjdCk6IFByb21pc2U8VD47XG4gIGRlbGV0ZUNvbGxlY3Rpb25QcmVzZXQocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUpOiBQcm9taXNlPHZvaWQ+O1xuICB1cGRhdGVEYXRhYmFzZSgpOiBQcm9taXNlPHZvaWQ+O1xuICBnZXRJbnRlcmZhY2VzPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KCk6IFByb21pc2U8VD47XG4gIGdldExheW91dHM8VCBleHRlbmRzIGFueSA9IGFueT4oKTogUHJvbWlzZTxUPjtcbiAgZ2V0UGFnZXM8VCBleHRlbmRzIGFueSA9IGFueT4oKTogUHJvbWlzZTxUPjtcbiAgZ2V0QWxsRmllbGRzPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8VD47XG4gIGdldEZpZWxkczxUIGV4dGVuZHMgYW55ID0gYW55Pihjb2xsZWN0aW9uOiBzdHJpbmcsIHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8VD47XG4gIGdldEZpZWxkPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGNvbGxlY3Rpb246IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcsIHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8VD47XG4gIGNyZWF0ZUZpZWxkPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGNvbGxlY3Rpb246IHN0cmluZywgZmllbGRJbmZvOiBvYmplY3QpOiBQcm9taXNlPFQ+O1xuICB1cGRhdGVGaWVsZDxUIGV4dGVuZHMgYW55ID0gYW55Pihjb2xsZWN0aW9uOiBzdHJpbmcsIGZpZWxkTmFtZTogc3RyaW5nLCBmaWVsZEluZm86IG9iamVjdCk6IFByb21pc2U8VD47XG4gIHVwZGF0ZUZpZWxkczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGZpZWxkc0luZm9PckZpZWxkTmFtZXM6IHN0cmluZ1tdIHwgb2JqZWN0W10sXG4gICAgZmllbGRJbmZvPzogb2JqZWN0XG4gICk6IFByb21pc2U8SUZpZWxkPFQ+IHwgdW5kZWZpbmVkPjtcbiAgZGVsZXRlRmllbGQoY29sbGVjdGlvbjogc3RyaW5nLCBmaWVsZE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG4gIHVwbG9hZEZpbGVzPFQgZXh0ZW5kcyBhbnkgPSBhbnlbXT4oZGF0YTogb2JqZWN0LCBvblVwbG9hZFByb2dyZXNzPzogKCkgPT4gb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgdXBkYXRlSXRlbTxUIGV4dGVuZHMgYW55ID0gYW55PihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgcHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsXG4gICAgYm9keTogQm9keVR5cGUsXG4gICAgcGFyYW1zPzogb2JqZWN0XG4gICk6IFByb21pc2U8VD47XG4gIHVwZGF0ZUl0ZW1zPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihjb2xsZWN0aW9uOiBzdHJpbmcsIGJvZHk6IEJvZHlUeXBlLCBwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPFQ+O1xuICBjcmVhdGVJdGVtPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGNvbGxlY3Rpb246IHN0cmluZywgYm9keTogQm9keVR5cGUpOiBQcm9taXNlPFQ+O1xuICBjcmVhdGVJdGVtczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oY29sbGVjdGlvbjogc3RyaW5nLCBib2R5OiBCb2R5VHlwZSk6IFByb21pc2U8SUZpZWxkPFQ+PjtcbiAgZ2V0SXRlbXM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KGNvbGxlY3Rpb246IHN0cmluZywgcGFyYW1zOiBvYmplY3QpOiBQcm9taXNlPElGaWVsZDxUPj47XG4gIGdldEl0ZW08VCBleHRlbmRzIGFueSA9IGFueT4oY29sbGVjdGlvbjogc3RyaW5nLCBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxJRmllbGQ8VD4+O1xuICBkZWxldGVJdGVtKGNvbGxlY3Rpb246IHN0cmluZywgcHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUpOiBQcm9taXNlPHZvaWQ+O1xuICBkZWxldGVJdGVtcyhjb2xsZWN0aW9uOiBzdHJpbmcsIHByaW1hcnlLZXlzOiBQcmltYXJ5S2V5VHlwZVtdKTogUHJvbWlzZTx2b2lkPjtcbiAgZ2V0TXlMaXN0aW5nUHJlZmVyZW5jZXM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KGNvbGxlY3Rpb246IHN0cmluZywgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgZ2V0UGVybWlzc2lvbnM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8SUZpZWxkPFQ+PjtcbiAgZ2V0TXlQZXJtaXNzaW9uczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4ocGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgY3JlYXRlUGVybWlzc2lvbnM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KGRhdGE6IGFueVtdKTogUHJvbWlzZTxUPjtcbiAgdXBkYXRlUGVybWlzc2lvbnM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KGRhdGE6IGFueVtdKTogUHJvbWlzZTxUPjtcbiAgZ2V0UmVsYXRpb25zPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPFQ+O1xuICBjcmVhdGVSZWxhdGlvbjxUIGV4dGVuZHMgYW55ID0gYW55PihkYXRhOiBvYmplY3QpOiBQcm9taXNlPFQ+O1xuICB1cGRhdGVSZWxhdGlvbjxUIGV4dGVuZHMgYW55ID0gYW55PihwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgZGF0YTogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgZ2V0Q29sbGVjdGlvblJlbGF0aW9uczxUIGV4dGVuZHMgYW55ID0gYW55Pihjb2xsZWN0aW9uOiBzdHJpbmcsIHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8VFtdPjtcbiAgZ2V0SXRlbVJldmlzaW9uczxUIGV4dGVuZHMgYW55ID0gYW55PihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgcHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsXG4gICAgcGFyYW1zPzogb2JqZWN0XG4gICk6IFByb21pc2U8SVJldmlzaW9uUmVzcG9uc2U8VD4+O1xuICByZXZlcnQoY29sbGVjdGlvbjogc3RyaW5nLCBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgcmV2aXNpb25JRDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPjtcbiAgZ2V0Um9sZShwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxJUm9sZVJlc3BvbnNlPjtcbiAgZ2V0Um9sZXMocGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxJUm9sZVJlc3BvbnNlW10+O1xuICB1cGRhdGVSb2xlKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBib2R5OiBCb2R5VHlwZSk6IFByb21pc2U8SVJvbGVSZXNwb25zZT47XG4gIGNyZWF0ZVJvbGUoYm9keTogQm9keVR5cGUpOiBQcm9taXNlPElSb2xlUmVzcG9uc2U+O1xuICBkZWxldGVSb2xlKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlKTogUHJvbWlzZTx2b2lkPjtcbiAgZ2V0U2V0dGluZ3MocGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+O1xuICBnZXRTZXR0aW5nc0ZpZWxkcyhwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPGFueT47XG4gIGdldFVzZXJzKHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8SVVzZXJzUmVzcG9uc2U+O1xuICBnZXRVc2VyKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPElVc2VyUmVzcG9uc2U+O1xuICBnZXRNZShwYXJhbXM/OiBvYmplY3QpOiBQcm9taXNlPElVc2VyUmVzcG9uc2U+O1xuICB1cGRhdGVVc2VyKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBib2R5OiBCb2R5VHlwZSk6IFByb21pc2U8SVVzZXJSZXNwb25zZT47XG4gIHBpbmcoKTogUHJvbWlzZTx2b2lkPjtcbiAgc2VydmVySW5mbygpOiBQcm9taXNlPGFueT47XG4gIHByb2plY3RJbmZvKCk6IFByb21pc2U8YW55PjtcbiAgZ2V0VGhpcmRQYXJ0eUF1dGhQcm92aWRlcnMoKTogUHJvbWlzZTxhbnk+O1xufVxuXG5leHBvcnQgY2xhc3MgU0RLIGltcGxlbWVudHMgSVNESyB7XG4gIC8qKlxuICAgKiBJZiB0aGUgY3VycmVudCBhdXRoIHN0YXR1cyBpcyBsb2dnZWQgaW5cbiAgICovXG4gIHB1YmxpYyBnZXQgbG9nZ2VkSW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmF1dGguaXNMb2dnZWRJbigpO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXlsb2FkKCk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy50b2tlbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldFBheWxvYWQoKTtcbiAgfVxuXG4gIC8vIGNvbnZlbmllbmNlIG1ldGhvZFxuICBwdWJsaWMgc3RhdGljIGdldFBheWxvYWQgPSBnZXRQYXlsb2FkO1xuXG4gIC8vIGFwaSBjb25uZWN0aW9uIGFuZCBzZXR0aW5nc1xuICBwdWJsaWMgY29uZmlnOiBJQ29uZmlndXJhdGlvbjtcbiAgcHVibGljIGFwaTogSUFQSTtcblxuICAvLyBjcmVhdGUgYSBuZXcgaW5zdGFuY2Ugd2l0aCBhbiBBUElcbiAgY29uc3RydWN0b3Iob3B0aW9uczogSUNvbmZpZ3VyYXRpb25PcHRpb25zKSB7XG4gICAgdGhpcy5jb25maWcgPSBuZXcgQ29uZmlndXJhdGlvbihvcHRpb25zKTtcbiAgICB0aGlzLmFwaSA9IG5ldyBBUEkodGhpcy5jb25maWcpO1xuICB9XG5cbiAgLy8vIEFVVEhFTlRJQ0FUSU9OIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIExvZ2luIHRvIHRoZSBBUEk7IEdldHMgYSBuZXcgdG9rZW4gZnJvbSB0aGUgQVBJIGFuZCBzdG9yZXMgaXQgaW4gdGhpcy5hcGkudG9rZW4uXG4gICAqL1xuICBwdWJsaWMgbG9naW4oXG4gICAgY3JlZGVudGlhbHM6IElMb2dpbkNyZWRlbnRpYWxzLFxuICAgIG9wdGlvbnM6IElMb2dpbk9wdGlvbnMgPSB7IHBlcnNpc3Q6IHRydWUsIHN0b3JhZ2U6IGZhbHNlIH1cbiAgKTogUHJvbWlzZTxJTG9naW5SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5hdXRoLmxvZ2luKGNyZWRlbnRpYWxzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSB1c2VyIG91dCBieSBcImZvcmdldHRpbmdcIiB0aGUgdG9rZW4sIGFuZCBjbGVhcmluZyB0aGUgcmVmcmVzaCBpbnRlcnZhbFxuICAgKi9cbiAgcHVibGljIGxvZ291dCgpOiB2b2lkIHtcbiAgICB0aGlzLmFwaS5hdXRoLmxvZ291dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgY2xpZW50IGluc3RhbmNlIGJ5IGxvZ2dpbmcgb3V0IGFuZCByZW1vdmluZyB0aGUgVVJMIGFuZCBwcm9qZWN0XG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5hcGkucmVzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIHRoZSB0b2tlbiBpZiBpdCBpcyBhYm91dCB0byBleHBpcmUgKHdpdGhpbiAzMCBzZWNvbmRzIG9mIGV4cGlyeSBkYXRlKS5cbiAgICogLSBDYWxscyBvbkF1dG9SZWZyZXNoU3VjY2VzcyB3aXRoIHRoZSBuZXcgdG9rZW4gaWYgdGhlIHJlZnJlc2hpbmcgaXMgc3VjY2Vzc2Z1bC5cbiAgICogLSBDYWxscyBvbkF1dG9SZWZyZXNoRXJyb3IgaWYgcmVmcmVzaGluZyB0aGUgdG9rZW4gZmFpbHMgZm9yIHNvbWUgcmVhc29uLlxuICAgKiBAcmV0dXJucyB7W2Jvb2xlYW4sIEVycm9yP119XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaElmTmVlZGVkKCk6IFByb21pc2U8W2Jvb2xlYW4sIEVycm9yP10+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkuYXV0aC5yZWZyZXNoSWZOZWVkZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIHBhc3NlZCB0b2tlbiB0byByZXF1ZXN0IGEgbmV3IG9uZVxuICAgKi9cbiAgcHVibGljIHJlZnJlc2godG9rZW46IHN0cmluZyk6IFByb21pc2U8SVJlZnJlc2hUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmF1dGgucmVmcmVzaCh0b2tlbik7XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdCB0byByZXNldCB0aGUgcGFzc3dvcmQgb2YgdGhlIHVzZXIgd2l0aCB0aGUgZ2l2ZW4gZW1haWwgYWRkcmVzcy5cbiAgICogVGhlIEFQSSB3aWxsIHNlbmQgYW4gZW1haWwgdG8gdGhlIGdpdmVuIGVtYWlsIGFkZHJlc3Mgd2l0aCBhIGxpbmsgdG8gZ2VuZXJhdGUgYSBuZXdcbiAgICogdGVtcG9yYXJ5IHBhc3N3b3JkLlxuICAgKi9cbiAgcHVibGljIHJlcXVlc3RQYXNzd29yZFJlc2V0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZW1haWwpLCBcImVtYWlsIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxUPihcIi9hdXRoL3Bhc3N3b3JkL3JlcXVlc3RcIiwge1xuICAgICAgZW1haWwsXG4gICAgfSk7XG4gIH1cblxuICAvLy8gQUNUSVZJVFkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IGFjdGl2aXR5XG4gICAqL1xuICBwdWJsaWMgZ2V0QWN0aXZpdHkocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SUFjdGl2aXR5UmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJQWN0aXZpdHlSZXNwb25zZT4oXCIvYWN0aXZpdHlcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8vLyBCT09LTUFSS1MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJvb2ttYXJrcyBvZiB0aGUgY3VycmVudCB1c2VyXG4gICAqIFRPRE86IEFkZCBkZXByZWNhdGlvbiB3YXJuaW5nXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FkdmFuY2VkL2xlZ2FjeS11cGdyYWRlcy5odG1sI2RpcmVjdHVzLWJvb2ttYXJrc1xuICAgKi9cbiAgcHVibGljIGdldE15Qm9va21hcmtzPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKHRoaXMuY29uZmlnLnRva2VuKSwgXCJkZWZpbmVkIHRva2VuIGlzIG5vdCBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuYXBpLmdldFBheWxvYWQ8eyBpZDogc3RyaW5nOyByb2xlOiBzdHJpbmcgfT4oKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmFwaS5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW25udWxsXVwiOiAxLFxuICAgICAgICBcImZpbHRlclt1c2VyXVtlcV1cIjogcGF5bG9hZC5pZCxcbiAgICAgIH0pLFxuICAgICAgdGhpcy5hcGkuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW3JvbGVdW2VxXVwiOiBwYXlsb2FkLnJvbGUsXG4gICAgICAgIFwiZmlsdGVyW3RpdGxlXVtubnVsbF1cIjogMSxcbiAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMSxcbiAgICAgIH0pLFxuICAgIF0pLnRoZW4oKHZhbHVlczogQXJyYXk8eyBkYXRhOiBhbnkgfT4pID0+IHtcbiAgICAgIGNvbnN0IFt1c2VyLCByb2xlXSA9IHZhbHVlcztcblxuICAgICAgcmV0dXJuIFsuLi4odXNlci5kYXRhIHx8IFtdKSwgLi4uKHJvbGUuZGF0YSB8fCBbXSldIGFzIFQ7XG4gICAgfSk7XG4gIH1cblxuICAvLy8gQ09MTEVDVElPTlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IGFsbCBhdmFpbGFibGUgY29sbGVjdGlvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRDb2xsZWN0aW9ucyhwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxJQ29sbGVjdGlvbnNSZXNwb25zZVtdPiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUNvbGxlY3Rpb25zUmVzcG9uc2VbXT4oXCIvY29sbGVjdGlvbnNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29sbGVjdGlvbiBpbmZvIGJ5IG5hbWVcbiAgICovXG4gIHB1YmxpYyBnZXRDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZywgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SUNvbGxlY3Rpb25SZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUNvbGxlY3Rpb25SZXNwb25zZT4oYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ29sbGVjdGlvbihkYXRhOiBvYmplY3QpOiBQcm9taXNlPElDb2xsZWN0aW9uUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxJQ29sbGVjdGlvblJlc3BvbnNlPihcIi9jb2xsZWN0aW9uc1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGEgY2VydGFpbiBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IFByb21pc2U8SUNvbGxlY3Rpb25SZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGRhdGEpLCBcImRhdGEgbXVzdCBiZSBhbiBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2g8SUNvbGxlY3Rpb25SZXNwb25zZT4oYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhIGNlcnRhaW4gY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5kZWxldGU8dm9pZD4oYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCk7XG4gIH1cblxuICAvLy8gQ09MTEVDVElPTiBQUkVTRVRTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGNvbGxlY3Rpb24gcHJlc2V0IChib29rbWFyayAvIGxpc3RpbmcgcHJlZmVyZW5jZXMpXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ29sbGVjdGlvblByZXNldDxUIGV4dGVuZHMgYW55ID0gYW55PihkYXRhOiBvYmplY3QpOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PFQ+KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgY29sbGVjdGlvbiBwcmVzZXQgKGJvb2ttYXJrIC8gbGlzdGluZyBwcmVmZXJlbmNlKVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUNvbGxlY3Rpb25QcmVzZXQ8VCBleHRlbmRzIGFueSA9IGFueT4ocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIGRhdGE6IG9iamVjdCk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGRhdGEpLCBcImRhdGEgbXVzdCBiZSBhbiBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2g8VD4oYC9jb2xsZWN0aW9uX3ByZXNldHMvJHtwcmltYXJ5S2V5fWAsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBjb2xsZWN0aW9uIHByZXNldCBieSBwcmltYXJ5a2V5XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQ29sbGVjdGlvblByZXNldChwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlPHZvaWQ+KGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gKTtcbiAgfVxuXG4gIC8vLyBEQVRBQkFTRSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgdXBkYXRlIHRoZSBkYXRhYmFzZSBvZiB0aGUgQVBJIGluc3RhbmNlIHRvIHRoZSBsYXRlc3QgdmVyc2lvblxuICAgKiB1c2luZyB0aGUgbWlncmF0aW9ucyBpbiB0aGUgQVBJXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlRGF0YWJhc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3QoXCIvdXBkYXRlXCIpO1xuICB9XG5cbiAgLy8vIEVYVEVOU0lPTlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWV0YSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIGludGVyZmFjZXNcbiAgICovXG4gIHB1YmxpYyBnZXRJbnRlcmZhY2VzPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KCk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5yZXF1ZXN0PFQ+KFwiZ2V0XCIsIFwiL2ludGVyZmFjZXNcIiwge30sIHt9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1ldGEgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBsYXlvdXRzXG4gICAqL1xuICBwdWJsaWMgZ2V0TGF5b3V0czxUIGV4dGVuZHMgYW55ID0gYW55PigpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucmVxdWVzdDxUPihcImdldFwiLCBcIi9sYXlvdXRzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtZXRhIGluZm9ybWF0aW9uIG9mIGFsbCBpbnN0YWxsZWQgcGFnZXNcbiAgICovXG4gIHB1YmxpYyBnZXRQYWdlczxUIGV4dGVuZHMgYW55ID0gYW55PigpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucmVxdWVzdDxUPihcImdldFwiLCBcIi9wYWdlc1wiLCB7fSwge30sIHRydWUpO1xuICB9XG5cbiAgLy8vIEZJRUxEUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEdldCBhbGwgZmllbGRzIHRoYXQgYXJlIGluIERpcmVjdHVzXG4gICAqL1xuICBwdWJsaWMgZ2V0QWxsRmllbGRzPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxUPihcIi9maWVsZHNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZpZWxkcyB0aGF0IGhhdmUgYmVlbiBzZXR1cCBmb3IgYSBnaXZlbiBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0RmllbGRzPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGNvbGxlY3Rpb246IHN0cmluZywgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8VD4oYC9maWVsZHMvJHtjb2xsZWN0aW9ufWAsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmaWVsZCBpbmZvcm1hdGlvbiBmb3IgYSBzaW5nbGUgZ2l2ZW4gZmllbGRcbiAgICovXG4gIHB1YmxpYyBnZXRGaWVsZDxUIGV4dGVuZHMgYW55ID0gYW55Pihjb2xsZWN0aW9uOiBzdHJpbmcsIGZpZWxkTmFtZTogc3RyaW5nLCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZmllbGROYW1lKSwgXCJmaWVsZE5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxUPihgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWAsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgZmllbGQgaW4gdGhlIGdpdmVuIGNvbGxlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVGaWVsZDxUIGV4dGVuZHMgYW55ID0gYW55Pihjb2xsZWN0aW9uOiBzdHJpbmcsIGZpZWxkSW5mbzogb2JqZWN0KTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoZmllbGRJbmZvKSwgXCJmaWVsZEluZm8gbXVzdCBiZSBhbiBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxUPihgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgZmllbGRJbmZvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBnaXZlbiBmaWVsZCBpbiBhIGdpdmVuIGNvbGxlY3Rpb25cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVGaWVsZDxUIGV4dGVuZHMgYW55ID0gYW55Pihjb2xsZWN0aW9uOiBzdHJpbmcsIGZpZWxkTmFtZTogc3RyaW5nLCBmaWVsZEluZm86IG9iamVjdCk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGZpZWxkTmFtZSksIFwiZmllbGROYW1lIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGZpZWxkSW5mbyksIFwiZmllbGRJbmZvIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPFQ+KGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCwgZmllbGRJbmZvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgbXVsdGlwbGUgZmllbGRzIGF0IG9uY2VcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogLy8gU2V0IG11bHRpcGxlIGZpZWxkcyB0byB0aGUgc2FtZSB2YWx1ZVxuICAgKiB1cGRhdGVGaWVsZHMoXCJwcm9qZWN0c1wiLCBbXCJmaXJzdF9uYW1lXCIsIFwibGFzdF9uYW1lXCIsIFwiZW1haWxcIl0sIHtcbiAgICogICBkZWZhdWx0X3ZhbHVlOiBcIlwiXG4gICAqIH0pXG4gICAqXG4gICAqIC8vIFNldCBtdWx0aXBsZSBmaWVsZHMgdG8gZGlmZmVyZW50IHZhbHVlc1xuICAgKiB1cGRhdGVGaWVsZHMoXCJwcm9qZWN0c1wiLCBbXG4gICAqICAge1xuICAgKiAgICAgaWQ6IDE0LFxuICAgKiAgICAgc29ydDogMVxuICAgKiAgIH0sXG4gICAqICAge1xuICAgKiAgICAgaWQ6IDE3LFxuICAgKiAgICAgc29ydDogMlxuICAgKiAgIH0sXG4gICAqICAge1xuICAgKiAgICAgaWQ6IDkxMixcbiAgICogICAgIHNvcnQ6IDNcbiAgICogICB9XG4gICAqIF0pXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlRmllbGRzPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGRzSW5mb09yRmllbGROYW1lczogc3RyaW5nW10gfCBvYmplY3RbXSxcbiAgICBmaWVsZEluZm86IG9iamVjdCA9IG51bGxcbiAgKTogUHJvbWlzZTxJRmllbGQ8VD4gfCB1bmRlZmluZWQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc0FycmF5KGZpZWxkc0luZm9PckZpZWxkTmFtZXMpLCBcImZpZWxkc0luZm9PckZpZWxkTmFtZXMgbXVzdCBiZSBhbiBhcnJheVwiKTtcblxuICAgIGlmIChmaWVsZEluZm8pIHtcbiAgICAgIGludmFyaWFudChpc09iamVjdChmaWVsZEluZm8pLCBcImZpZWxkSW5mbyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2goYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkc0luZm9PckZpZWxkTmFtZXMuam9pbihcIixcIil9YCwgZmllbGRJbmZvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2goYC9maWVsZHMvJHtjb2xsZWN0aW9ufWAsIGZpZWxkc0luZm9PckZpZWxkTmFtZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGZpZWxkIGZyb20gYSBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlRmllbGQoY29sbGVjdGlvbjogc3RyaW5nLCBmaWVsZE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGZpZWxkTmFtZSksIFwiZmllbGROYW1lIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlKGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCk7XG4gIH1cblxuICAvLy8gRklMRVMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogVXBsb2FkIG11bHRpcGFydCBmaWxlcyBpbiBtdWx0aXBhcnQvZm9ybS1kYXRhXG4gICAqL1xuICBwdWJsaWMgdXBsb2FkRmlsZXM8VCBleHRlbmRzIGFueSA9IGFueVtdPihkYXRhOiBvYmplY3QsIG9uVXBsb2FkUHJvZ3Jlc3M6ICgpID0+IG9iamVjdCA9ICgpID0+ICh7fSkpOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY29uZmlnLnRva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICB9O1xuXG4gICAgLy8gbGltaXQgY29uY3VycmVudCByZXF1ZXN0cyB0byA1XG4gICAgdGhpcy5hcGkuY29uY3VycmVudC5hdHRhY2goNSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkueGhyXG4gICAgICAucG9zdChgJHt0aGlzLmNvbmZpZy51cmx9LyR7dGhpcy5jb25maWcucHJvamVjdH0vZmlsZXNgLCBkYXRhLCB7XG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MsXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlczogeyBkYXRhOiBhbnkgfSkgPT4ge1xuICAgICAgICAvLyBkZXRhY2ggY29uY3VycmVuY3kgbWFuYWdlclxuICAgICAgICB0aGlzLmFwaS5jb25jdXJyZW50LmRldGFjaCgpO1xuXG4gICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yOiBJRXJyb3IpID0+IHtcbiAgICAgICAgLy8gZGV0YWNoIGNvbmN1cnJlbmN5IG1hbmFnZXJcbiAgICAgICAgdGhpcy5hcGkuY29uY3VycmVudC5kZXRhY2goKTtcblxuICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIk5ldHdvcmsgRXJyb3JcIixcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vLyBJVEVNUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUl0ZW08VCBleHRlbmRzIGFueSA9IGFueT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIGJvZHk6IEJvZHlUeXBlLFxuICAgIHBhcmFtczogb2JqZWN0ID0ge31cbiAgKTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPFQ+KGAke2NvbGxlY3Rpb25CYXNlUGF0aH0vJHtwcmltYXJ5S2V5fWAsIGJvZHksIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIG11bHRpcGxlIGl0ZW1zXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlSXRlbXM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KGNvbGxlY3Rpb246IHN0cmluZywgYm9keTogQm9keVR5cGUsIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc0FycmF5KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBhcnJheVwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxUPihjb2xsZWN0aW9uQmFzZVBhdGgsIGJvZHksIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGl0ZW1cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVJdGVtPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGNvbGxlY3Rpb246IHN0cmluZywgYm9keTogQm9keVR5cGUpOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8VD4oY29sbGVjdGlvbkJhc2VQYXRoLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgbXVsdGlwbGUgaXRlbXNcbiAgICogVE9ETzogd2hhdCBzaG91bGQgd2UgZG86XG4gICAqICBhKSA8VCBleHRlbmRzIGFueVtdID0gYW55W10+IC0+IFByb21pc2U8SUZpZWxkPFQ+PlxuICAgKiAgYikgPFQgZXh0ZW5kcyBhbnkgPSBhbnk+IC0+IFByb21pc2U8SUZpZWxkPFRbXT4+XG4gICAqXG4gICAqIHdoaWNoIHdpbGwgcmVzdWx0IGluIHRoZSBmb2xsb3dpbmdcbiAgICogIGEpIGNyZWF0ZUl0ZW1zPFBlcnNvbj4gPT4gUHJvbWlzZTxJRmllbGQ8UGVyc29uW10+PlxuICAgKiAgYikgY3JlYXRlSXRlbXM8UGVyc29uW10+ID0+IFByb21pc2U8SUZpZWxkPFBlcnNvbltdPj5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVJdGVtczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oY29sbGVjdGlvbjogc3RyaW5nLCBib2R5OiBCb2R5VHlwZSk6IFByb21pc2U8SUZpZWxkPFQ+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNBcnJheShib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gYXJyYXlcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxJRmllbGQ8VD4+KGNvbGxlY3Rpb25CYXNlUGF0aCwgYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0ZW1zIGZyb20gYSBnaXZlbiBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0SXRlbXM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KGNvbGxlY3Rpb246IHN0cmluZywgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SUZpZWxkPFQ+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJRmllbGQ8VD4+KGNvbGxlY3Rpb25CYXNlUGF0aCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzaW5nbGUgaXRlbSBieSBwcmltYXJ5IGtleVxuICAgKi9cbiAgcHVibGljIGdldEl0ZW08VCBleHRlbmRzIGFueSA9IGFueT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIHBhcmFtczogb2JqZWN0ID0ge31cbiAgKTogUHJvbWlzZTxJRmllbGQ8VD4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUZpZWxkPFQ+PihgJHtjb2xsZWN0aW9uQmFzZVBhdGh9LyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHNpbmdsZSBpdGVtIGJ5IHByaW1hcnkga2V5XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlSXRlbShjb2xsZWN0aW9uOiBzdHJpbmcsIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmRlbGV0ZTx2b2lkPihgJHtjb2xsZWN0aW9uQmFzZVBhdGh9LyR7cHJpbWFyeUtleX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgbXVsdGlwbGUgaXRlbXMgYnkgcHJpbWFyeSBrZXlcbiAgICovXG4gIHB1YmxpYyBkZWxldGVJdGVtcyhjb2xsZWN0aW9uOiBzdHJpbmcsIHByaW1hcnlLZXlzOiBQcmltYXJ5S2V5VHlwZVtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNBcnJheShwcmltYXJ5S2V5cyksIFwicHJpbWFyeUtleXMgbXVzdCBiZSBhbiBhcnJheVwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5kZWxldGUoYCR7Y29sbGVjdGlvbkJhc2VQYXRofS8ke3ByaW1hcnlLZXlzLmpvaW4oKX1gKTtcbiAgfVxuXG4gIC8vLyBMSVNUSU5HIFBSRUZFUkVOQ0VTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbGxlY3Rpb24gcHJlc2V0cyBvZiB0aGUgY3VycmVudCB1c2VyIGZvciBhIHNpbmdsZSBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0TXlMaXN0aW5nUHJlZmVyZW5jZXM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KGNvbGxlY3Rpb246IHN0cmluZywgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyh0aGlzLmNvbmZpZy50b2tlbiksIFwidG9rZW4gbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5hcGkuZ2V0UGF5bG9hZDx7IHJvbGU6IHN0cmluZzsgaWQ6IHN0cmluZyB9PigpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuYXBpLmdldDxJRmllbGQ8YW55Pj4oXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgXCJmaWx0ZXJbY29sbGVjdGlvbl1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICAgIFwiZmlsdGVyW3JvbGVdW251bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxuICAgICAgICBcImZpbHRlclt1c2VyXVtudWxsXVwiOiAxLFxuICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgc29ydDogXCItaWRcIixcbiAgICAgIH0pLFxuICAgICAgdGhpcy5hcGkuZ2V0PElGaWVsZDxhbnk+PihcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uXVtlcV1cIjogY29sbGVjdGlvbixcbiAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHBheWxvYWQucm9sZSxcbiAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW251bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3VzZXJdW251bGxdXCI6IDEsXG4gICAgICAgIGxpbWl0OiAxLFxuICAgICAgICBzb3J0OiBcIi1pZFwiLFxuICAgICAgfSksXG4gICAgICB0aGlzLmFwaS5nZXQ8SUZpZWxkPGFueT4+KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgICBcImZpbHRlcltyb2xlXVtlcV1cIjogcGF5bG9hZC5yb2xlLFxuICAgICAgICBcImZpbHRlclt0aXRsZV1bbnVsbF1cIjogMSxcbiAgICAgICAgXCJmaWx0ZXJbdXNlcl1bZXFdXCI6IHBheWxvYWQuaWQsXG4gICAgICAgIGxpbWl0OiAxLFxuICAgICAgICBzb3J0OiBcIi1pZFwiLFxuICAgICAgfSksXG4gICAgXSkudGhlbigodmFsdWVzOiBBcnJheTxJRmllbGQ8YW55Pj4pID0+IHtcbiAgICAgIGNvbnN0IFtjb2wsIHJvbGUsIHVzZXJdID0gdmFsdWVzO1xuXG4gICAgICBpZiAodXNlci5kYXRhICYmIHVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB1c2VyLmRhdGFbMF0gYXMgVDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvbGUuZGF0YSAmJiByb2xlLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gcm9sZS5kYXRhWzBdIGFzIFQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2wuZGF0YSAmJiBjb2wuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjb2wuZGF0YVswXSBhcyBUO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge30gYXMgVDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vLyBQRVJNSVNTSU9OUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBHZXQgcGVybWlzc2lvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRQZXJtaXNzaW9uczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4ocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SUZpZWxkPFQ+PiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmdldEl0ZW1zPFQ+KFwiZGlyZWN0dXNfcGVybWlzc2lvbnNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlcidzIHBlcm1pc3Npb25zXG4gICAqL1xuICBwdWJsaWMgZ2V0TXlQZXJtaXNzaW9uczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4ocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KFwiL3Blcm1pc3Npb25zL21lXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIG11bHRpcGxlIG5ldyBwZXJtaXNzaW9uc1xuICAgKi9cbiAgcHVibGljIGNyZWF0ZVBlcm1pc3Npb25zPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihkYXRhOiAvKiBUT0RPOiAqLyBhbnlbXSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc0FycmF5KGRhdGEpLCBcImRhdGEgbXVzdCBiZSBhbmFycnlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdChcIi9wZXJtaXNzaW9uc1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgbXVsdGlwbGUgcGVybWlzc2lvbiByZWNvcmRzXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUGVybWlzc2lvbnM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KGRhdGE6IC8qIFRPRE86ICovIGFueVtdKTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzQXJyYXkoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuYXJyeVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxUPihcIi9wZXJtaXNzaW9uc1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8vLyBSRUxBVElPTlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHJlbGF0aW9uc2hpcHNcbiAgICovXG4gIHB1YmxpYyBnZXRSZWxhdGlvbnM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8VD4oXCIvcmVsYXRpb25zXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBuZXcgcmVsYXRpb25cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVSZWxhdGlvbjxUIGV4dGVuZHMgYW55ID0gYW55PihkYXRhOiAvKiBUT0RPOiAqLyBvYmplY3QpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxUPihcIi9yZWxhdGlvbnNcIiwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBleGlzdGluZyByZWxhdGlvblxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVJlbGF0aW9uPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBkYXRhOiAvKiBUT0RPOiAqLyBvYmplY3QpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2g8VD4oYC9yZWxhdGlvbnMvJHtwcmltYXJ5S2V5fWAsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmVsYXRpb25zaGlwIGluZm9ybWF0aW9uIGZvciB0aGUgZ2l2ZW4gY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGdldENvbGxlY3Rpb25SZWxhdGlvbnM8VCBleHRlbmRzIGFueSA9IGFueT4oY29sbGVjdGlvbjogc3RyaW5nLCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUW10+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5hcGkuZ2V0PFQ+KFwiL3JlbGF0aW9uc1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25fYV1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICB9KSxcbiAgICAgIHRoaXMuYXBpLmdldDxUPihcIi9yZWxhdGlvbnNcIiwge1xuICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uX2JdW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgfSksXG4gICAgXSk7XG4gIH1cblxuICAvLy8gUkVWSVNJT05TIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IGEgc2luZ2xlIGl0ZW0ncyByZXZpc2lvbnMgYnkgcHJpbWFyeSBrZXlcbiAgICovXG4gIHB1YmxpYyBnZXRJdGVtUmV2aXNpb25zPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSxcbiAgICBwYXJhbXM6IG9iamVjdCA9IHt9XG4gICk6IFByb21pc2U8SVJldmlzaW9uUmVzcG9uc2U8VD4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SVJldmlzaW9uUmVzcG9uc2U8VD4+KGAke2NvbGxlY3Rpb25CYXNlUGF0aH0vJHtwcmltYXJ5S2V5fS9yZXZpc2lvbnNgLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldmVydCBhbiBpdGVtIHRvIGEgcHJldmlvdXMgc3RhdGVcbiAgICovXG4gIHB1YmxpYyByZXZlcnQoY29sbGVjdGlvbjogc3RyaW5nLCBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgcmV2aXNpb25JRDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc051bWJlcihyZXZpc2lvbklEKSwgXCJyZXZpc2lvbklEIG11c3QgYmUgYSBudW1iZXJcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2goYCR7Y29sbGVjdGlvbkJhc2VQYXRofS8ke3ByaW1hcnlLZXl9L3JldmVydC8ke3JldmlzaW9uSUR9YCk7XG4gIH1cblxuICAvLy8gUk9MRVMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IGEgc2luZ2xlIHVzZXIgcm9sZVxuICAgKi9cbiAgcHVibGljIGdldFJvbGUocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPElSb2xlUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNOdW1iZXIocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGEgbnVtYmVyXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElSb2xlUmVzcG9uc2U+KGAvcm9sZXMvJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIHJvbGVzXG4gICAqL1xuICBwdWJsaWMgZ2V0Um9sZXMocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SVJvbGVSZXNwb25zZVtdPiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SVJvbGVSZXNwb25zZVtdPihcIi9yb2xlc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHVzZXIgcm9sZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVJvbGUocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIGJvZHk6IEJvZHlUeXBlKTogUHJvbWlzZTxJUm9sZVJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW08SVJvbGVSZXNwb25zZT4oXCJkaXJlY3R1c19yb2xlc1wiLCBwcmltYXJ5S2V5LCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdXNlciByb2xlXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlUm9sZShib2R5OiBCb2R5VHlwZSk6IFByb21pc2U8SVJvbGVSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdChib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSXRlbTxJUm9sZVJlc3BvbnNlPihcImRpcmVjdHVzX3JvbGVzXCIsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHVzZXIgcm9sIGJ5IHByaW1hcnkga2V5XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlUm9sZShwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG5cbiAgICByZXR1cm4gdGhpcy5kZWxldGVJdGVtKFwiZGlyZWN0dXNfcm9sZXNcIiwgcHJpbWFyeUtleSk7XG4gIH1cblxuICAvLy8gU0VUVElOR1MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IERpcmVjdHVzJyBnbG9iYWwgc2V0dGluZ3NcbiAgICovXG4gIHB1YmxpYyBnZXRTZXR0aW5ncyhwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChcIi9zZXR0aW5nc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgXCJmaWVsZHNcIiBmb3IgZGlyZWN0dXNfc2V0dGluZ3NcbiAgICovXG4gIHB1YmxpYyBnZXRTZXR0aW5nc0ZpZWxkcyhwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChcIi9zZXR0aW5ncy9maWVsZHNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8vLyBVU0VSUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IGEgbGlzdCBvZiBhdmFpbGFibGUgdXNlcnMgaW4gRGlyZWN0dXNcbiAgICovXG4gIHB1YmxpYyBnZXRVc2VycyhwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxJVXNlcnNSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KFwiL3VzZXJzXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc2luZ2xlIERpcmVjdHVzIHVzZXJcbiAgICovXG4gIHB1YmxpYyBnZXRVc2VyKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxJVXNlclJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChgL3VzZXJzLyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlciBpbmZvIG9mIHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXJcbiAgICovXG4gIHB1YmxpYyBnZXRNZShwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxJVXNlclJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoXCIvdXNlcnMvbWVcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBzaW5nbGUgdXNlciBiYXNlZCBvbiBwcmltYXJ5S2V5XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlVXNlcihwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgYm9keTogQm9keVR5cGUpOiBQcm9taXNlPElVc2VyUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlSXRlbShcImRpcmVjdHVzX3VzZXJzXCIsIHByaW1hcnlLZXksIGJvZHkpO1xuICB9XG5cbiAgLy8vIFVUSUxTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIFBpbmcgdGhlIEFQSSB0byBjaGVjayBpZiBpdCBleGlzdHMgLyBpcyB1cCBhbmQgcnVubmluZ1xuICAgKi9cbiAgcHVibGljIHBpbmcoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3QoXCJnZXRcIiwgXCIvc2VydmVyL3BpbmdcIiwge30sIHt9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlcnZlciBpbmZvIGZyb20gdGhlIEFQSVxuICAgKi9cbiAgcHVibGljIHNlcnZlckluZm8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucmVxdWVzdChcImdldFwiLCBcIi9cIiwge30sIHt9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlcnZlciBpbmZvIGZyb20gdGhlIHByb2plY3RcbiAgICovXG4gIHB1YmxpYyBwcm9qZWN0SW5mbygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5yZXF1ZXN0KFwiZ2V0XCIsIFwiL1wiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHRoZSBzZXR1cCB0aGlyZCBwYXJ0eSBhdXRoIHByb3ZpZGVyc1xuICAgKi9cbiAgcHVibGljIGdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChcIi9hdXRoL3Nzb1wiKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU0RLIH0gZnJvbSBcIi4vU0RLXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFNESztcbiIsImV4cG9ydCBjb25zdCBESVJFQ1RVU19DT0xMRUNUSU9OX1BSRUZJWCA9IFwiZGlyZWN0dXNfXCI7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY29ycmVjdCBBUEkgcGF0aCBmb3IgdGhlIGNvbGxlY3Rpb24uIEl0IHdpbGxcbiAqIHN0cmlwIHRoZSBwcmVmaXggQHtESVJFQ1RVU19DT0xMRUNUSU9OX1BSRUZJWH0gb3Igd2lsbCBhZGQgdGhlXG4gKiAnL2l0ZW1zLycgcGF0aCBhcyBwcmVmaXggaWYgbm90IHByb3ZpZGVkLiBUaGUgJ3N1YnN0cig5KScgZGVmaW5lc1xuICogdGhlIGxlbmd0aCBvZiB0aGUgZGVmaW5lZCBAe0RJUkVDVFVTX0NPTExFQ1RJT05fUFJFRklYfS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xsZWN0aW9uICAgICBUaGUgbmFtZSBvZiB0aGUgY29sbGVjdGlvblxuICogQHJldHVybnMge3N0cmluZ31cbiAqXG4gKiBAZXhhbXBsZVxuICogZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKCdkaXJlY3R1c191c2VycycpO1xuICogLy8gPT4gJy91c2VycydcbiAqIGdldENvbGxlY3Rpb25JdGVtUGF0aCgndXNlcnMnKTtcbiAqIC8vID0+ICcvaXRlbXMvdXNlcnMnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChESVJFQ1RVU19DT0xMRUNUSU9OX1BSRUZJWCkpIHtcbiAgICByZXR1cm4gYC8ke2NvbGxlY3Rpb24uc3Vic3RyKDkpfWA7XG4gIH1cblxuICByZXR1cm4gYC9pdGVtcy8ke2NvbGxlY3Rpb259YDtcbn1cbiIsImltcG9ydCB7IGlzT2JqZWN0T3JFbXB0eSB9IGZyb20gXCIuL2lzXCI7XG5cbmV4cG9ydCBjb25zdCBpbnZhcmlhbnQgPSAoY29uZGl0aW9uOiBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGlmICghIWNvbmRpdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgSW52YXJpYW50IHZpb2xhdGlvbjogJHttZXNzYWdlfWApO1xufTtcbiIsImNvbnN0IGlzVHlwZSA9ICh0OiBzdHJpbmcsIHY6IGFueSkgPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSBgW29iamVjdCAke3R9XWA7XG5cbmV4cG9ydCBjb25zdCBoYXNLZXlzV2l0aCA9ICh2YWxpZGF0b3I6ICh2OiBhbnkpID0+IGJvb2xlYW4sIG9iajogYW55LCBrZXlzOiBzdHJpbmdbXSkgPT4ge1xuICBpZiAoIWlzT2JqZWN0T3JFbXB0eShvYmopIHx8ICFpc0FycmF5T3JFbXB0eShrZXlzKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXlzW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghdmFsaWRhdG9yKG9ialtrZXlzW2ldXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc05vdE51bGwgPSAodjogYW55KSA9PiB2ICE9PSBudWxsICYmIHYgIT09IHVuZGVmaW5lZDtcblxuZXhwb3J0IGNvbnN0IGlzU3RyaW5nID0gKHY6IGFueSkgPT4gdiAmJiB0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIiAmJiAvXFxTLy50ZXN0KHYpO1xuXG5leHBvcnQgY29uc3QgaXNOdW1iZXIgPSAodjogYW55KSA9PiBpc1R5cGUoXCJOdW1iZXJcIiwgdikgJiYgaXNGaW5pdGUodikgJiYgIWlzTmFOKHBhcnNlRmxvYXQodikpO1xuXG5leHBvcnQgY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpID0+IHYgaW5zdGFuY2VvZiBGdW5jdGlvbjtcblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0T3JFbXB0eSA9ICh2OiBhbnkpID0+IGlzVHlwZShcIk9iamVjdFwiLCB2KTtcblxuZXhwb3J0IGNvbnN0IGlzQXJyYXlPckVtcHR5ID0gKHY6IGFueSkgPT4gaXNUeXBlKFwiQXJyYXlcIiwgdik7XG5cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gKHY6IGFueSkgPT4gKCFpc0FycmF5T3JFbXB0eSh2KSA/IGZhbHNlIDogdi5sZW5ndGggPiAwKTtcblxuZXhwb3J0IGNvbnN0IGhhc0tleXNXaXRoU3RyaW5nID0gKG9iajogYW55LCBrZXlzOiBzdHJpbmdbXSkgPT4gaGFzS2V5c1dpdGgoaXNTdHJpbmcsIG9iaiwga2V5cyk7XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdCA9ICh2OiBhbnkpID0+IHtcbiAgaWYgKCFpc09iamVjdE9yRW1wdHkodikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiB2KSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2LCBrZXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gXCJiYXNlLTY0XCI7XG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gXCIuL2lzXCI7XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBwYXlsb2FkIGZyb20gYSBKV1RcbiAqIEBwYXJhbSAge1N0cmluZ30gdG9rZW4gVGhlIEpXVCB0byByZXRyaWV2ZSB0aGUgcGF5bG9hZCBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIFRoZSBKV1QgcGF5bG9hZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGF5bG9hZDxUIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0Pih0b2tlbjogc3RyaW5nKTogVCB7XG4gIGlmICghdG9rZW4gfHwgdG9rZW4ubGVuZ3RoIDwgMCB8fCB0b2tlbi5zcGxpdChcIi5cIikubGVuZ3RoIDw9IDApIHtcbiAgICAvLyBubyB0b2tlbiBvciBpbnZhbGlkIHRva2VuIGVxdWFscyBubyBwYXlsb2FkXG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHBheWxvYWRCYXNlNjQgPSB0b2tlblxuICAgICAgLnNwbGl0KFwiLlwiKVsxXVxuICAgICAgLnJlcGxhY2UoXCItXCIsIFwiK1wiKVxuICAgICAgLnJlcGxhY2UoXCJfXCIsIFwiL1wiKTtcbiAgICBjb25zdCBwYXlsb2FkRGVjb2RlZCA9IGJhc2U2NC5kZWNvZGUocGF5bG9hZEJhc2U2NCk7XG4gICAgY29uc3QgcGF5bG9hZE9iamVjdCA9IEpTT04ucGFyc2UocGF5bG9hZERlY29kZWQpO1xuXG4gICAgaWYgKGlzTnVtYmVyKHBheWxvYWRPYmplY3QuZXhwKSkge1xuICAgICAgcGF5bG9hZE9iamVjdC5leHAgPSBuZXcgRGF0ZShwYXlsb2FkT2JqZWN0LmV4cCAqIDEwMDApO1xuICAgIH1cblxuICAgIHJldHVybiBwYXlsb2FkT2JqZWN0O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyByZXR1cm4gZW1wdHkgcGF5bG9hZCBpbiBjYXNlIG9mIGFuIGVycm9yXG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=