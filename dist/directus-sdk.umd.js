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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/argument-validator/argument-validator.js":
/*!***************************************************************!*\
  !*** ./node_modules/argument-validator/argument-validator.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {
    /*
     * We only define the is/has* functions and use the
     * demand() function to build the demands, also the
     * getDemandMethodNameByValidatorKey() (yeh, I know it's an ugly name :()
     * build the demand method based in the .is/has methods
     */

    var v = { };

    if ( true && module.exports) {
        module.exports = v;
    } else {
        this.ArgumentValidator = v;
    }

    var demand = function (demandMethodName, validator) {
        return function (value /* ... more args, name */) {
            if (validator.apply(v, arguments)) {
                return true;
            }

            var name = null;
            if (arguments.length > 1) {
                var name = Array.prototype.slice.call(arguments, -1)[0];
            }

            if (v.isJson(value)) {
                value = JSON.stringify(value);
            }

            var msg = "Invalid " + demandMethodName + " value: " + value;
            if (v.isString(name)) {
                msg += "\nArgument Name: " + name;
            }

            if (v.isArray(arguments[1])) {
                msg += "\nKeys: " + arguments[1].join(", ");
            }

            throw new Error(msg);
        }
    };

    var getDemandMethodNameByValidatorKey = function (key) {
        var prefix = [ 'is', 'has' ];
        var prefixLength = null;

        for (var i = 0; i < prefix.length; i++) {
            prefixLength = prefix[i].length;

            if (key.slice(0, prefixLength) === prefix[i]) {
                break;
            }
        }

        var demandMethodName = key.slice(prefixLength + 1);
        var firstLetter = key.slice(prefixLength, prefixLength + 1).toLowerCase();
        var name = firstLetter + demandMethodName;

        return name;
    };

    var hasKeysWith = function (validator, obj, keys) {
        if (!v.isObjectOrEmpty(obj) || !v.isArrayOrEmpty(keys)) {
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

    var isArrayOf = function (validator, arr) {
        if (!v.isArray(arr)) {
            return false;
        }

        var length = arr.length;
        for (var i = 0; i < length; i++) {
            if (!validator(arr[i])) {
                return false;
            }
        }

        return true;
    };

    v.isNotNull = function (value) {
        return value !== null && value !== undefined;
    };

    v.isInstanceOf = function(type, value) {
        return value instanceof type;
    };

    v.isType = function (type, value) {
        return Object.prototype.toString.call(value) === "[object " + type + "]";
    };

    v.isBoolean = function (value) {
        return ([ 1, 0, true, false ].indexOf(value) > -1);
    };

    v.isStringOrEmpty = function (value) {
        return v.isType("String", value);
    };

    v.isString = function (value) {
        if (!v.isStringOrEmpty(value)) {
            return false;
        }
        return /\S/.test(value);
    };

    v.isNumber = function (value) {
        if (!v.isType('Number', value)) {
            return false;
        }

        return isFinite(value) && !isNaN(parseFloat(value));
    };

    v.isArrayOrEmpty = function (arr) {
        return v.isType("Array", arr);
    };

    v.isArray = function (arr) {
        if (!v.isArrayOrEmpty(arr)) {
            return false;
        }

        return arr.length > 0;
    };

    v.isArrayOfNumbers = function (arr) {
        return isArrayOf(v.isNumber, arr);
    };

    v.isArrayOfObjects = function (arr) {
        return isArrayOf(v.isObject, arr);
    };

    v.isObjectOrEmpty = function (obj) {
        return v.isType("Object", obj);
    };

    v.isObject = function (obj) {
        if (!v.isObjectOrEmpty(obj)) {
            return false;
        }

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return true;
            }
        }

        return false;
    };

    v.isJson = function (value) {
        if (!v.isObjectOrEmpty(value)) {
            return false;
        }

        try {
            JSON.stringify(value);
        } catch (err) {
            return false;
        }

        return true;
    };

    v.isJsonString = function (value) {
        if (!v.isString(value)) {
            return false;
        }

        try {
            JSON.parse(value);
        } catch (err) {
            return false;
        }

        return true;
    };

    v.hasKeys = function (obj, keys) {
        return hasKeysWith(v.isNotNull, obj, keys);
    };

    v.hasKeysWithNumber = v.hasNumberKeys = function (obj, keys) {
        return hasKeysWith(v.isNumber, obj, keys);
    };

    v.hasKeysWithString = v.hasStringKeys = function (obj, keys) {
        return hasKeysWith(v.isString, obj, keys);
    };

    v.hasKeysWithObject = v.hasObjectKeys = function (obj, keys) {
        return hasKeysWith(v.isObject, obj, keys);
    };

    v.hasKeysWithStringOrEmpty = v.hasStringOrEmptyKeys = function (obj, keys) {
        return hasKeysWith(v.isStringOrEmpty, obj, keys);
    };

    v.hasKeysWithObjectOrEmpty = v.hasObjectOrEmptyKeys = function (obj, keys) {
        return hasKeysWith(v.isObjectOrEmpty, obj, keys);
    };

    v.isFunction = function (value) {
        return v.isInstanceOf(Function, value);
    };

    // build demand functions
    for (var key in v) {
        var demandMethodName = getDemandMethodNameByValidatorKey(key);
        v[demandMethodName] = demand(demandMethodName, v[key]);
    }

}).call(this);


/***/ }),

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

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var base64 = __webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js");

var qs = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");

var AV = __webpack_require__(/*! argument-validator */ "./node_modules/argument-validator/argument-validator.js");
/**
 * Retrieves the payload from a JWT
 * @param  {String} token The JWT to retrieve the payload from
 * @return {Object}       The JWT payload
 */


function getPayload(token) {
  var payloadBase64 = token.split(".")[1].replace("-", "+").replace("_", "/");
  var payloadDecoded = base64.decode(payloadBase64);
  var payloadObject = JSON.parse(payloadDecoded);

  if (AV.isNumber(payloadObject.exp)) {
    payloadObject.exp = new Date(payloadObject.exp * 1000);
  }

  return payloadObject;
}
/**
 * Create a new SDK instance
 * @param       {object} [options]
 * @param       {string} [options.url]   The API url to connect to
 * @param       {string} [options.project]   The API project to connect to
 * @param       {string} [options.token] The access token to use for requests
 * @param       {number} [options.tokenExpiryTime] The time it takes for the API token to expire
 * @constructor
 */


function SDK() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var token;
  var url;
  var project = "_";
  var localExp;
  var tokenExpiryTime = 5;

  if (options.storage) {
    var storedInfo = options.storage.getItem("directus-sdk-js");

    if (storedInfo) {
      storedInfo = JSON.parse(storedInfo);
      token = storedInfo.token;
      url = storedInfo.url;
      project = storedInfo.project;
      localExp = storedInfo.localExp;
    }
  }

  if (options.token) {
    token = options.token;
  }

  if (options.url) {
    url = options.url;
  }

  if (options.project) {
    project = options.project;
  }

  if (options.localExp) {
    localExp = options.localExp;
  }

  if (options.tokenExpiryTime) {
    tokenExpiryTime = options.tokenExpiryTime;
  }

  var SDK = {
    url: url,
    token: token,
    project: project,
    // The token will contain an expiry time based on the server time
    // In order to make sure we check the right expiry date, we need to
    // keep a version that's based on the browser time
    localExp: localExp,
    axios: axios.create({
      paramsSerializer: qs.stringify,
      timeout: 10 * 60 * 1000 // 10 min

    }),
    refreshInterval: null,
    onAutoRefreshError: null,
    onAutoRefreshSuccess: null,
    // The storage method to use. Has to support getItem and setItem to store and
    // retrieve the token
    storage: options.storage || null,
    // Defaults to 5 minutes. Once the API supports a custom, this option can be used to reflect that
    tokenExpiryTime: tokenExpiryTime,

    get payload() {
      if (!AV.isString(this.token)) return null;
      return getPayload(this.token);
    },

    get loggedIn() {
      if (AV.isString(this.token) && AV.isString(this.url) && AV.isString(this.project) && AV.isObject(this.payload)) {
        if (this.localExp > Date.now()) {
          return true;
        }
      }

      return false;
    },

    // REQUEST METHODS
    // -------------------------------------------------------------------------

    /**
     * Directus API request promise
     * @promise RequestPromise
     * @fulfill {object} Directus data
     * @reject {Error} Network error (if no connection to API)
     * @reject {Error} Directus error (eg not logged in or 404)
     */

    /**
     * Perform an API request to the Directus API
     * @param  {string} method      The HTTP method to use
     * @param  {string} endpoint    The API endpoint to request
     * @param  {Object} [params={}] The HTTP query parameters (GET only)
     * @param  {Object} [data={}]   The HTTP request body (non-GET only)
     * @param  {Boolean} noEnv      Don't use the project in the path
     * @param  {Boolean} ignoreJson Don't parse the API result into JSON
     * @return {RequestPromise}
     */
    request: function request(method, endpoint) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var noEnv = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var headers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var ignoreJson = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      AV.string(method, "method");
      AV.string(endpoint, "endpoint");
      AV.objectOrEmpty(params, "params");
      Array.isArray(data) ? AV.arrayOrEmpty(data, "data") : AV.objectOrEmpty(data, "data");
      AV.string(this.url, "this.url");
      var baseURL = "".concat(this.url, "/");

      if (noEnv === false) {
        baseURL += "".concat(this.project, "/");
      }

      var requestOptions = {
        url: endpoint,
        method: method,
        baseURL: baseURL,
        params: params,
        data: data
      };

      if (this.token && typeof this.token === "string" && this.token.length > 0) {
        requestOptions.headers = headers;
        requestOptions.headers.Authorization = "Bearer ".concat(this.token);
      }

      return this.axios.request(requestOptions).then(function (res) {
        return res.data;
      }).then(function (data) {
        if (!data || data.length === 0) return data;
        if (ignoreJson) return data;

        if (_typeof(data) !== "object") {
          try {
            return JSON.parse(data);
          } catch (error) {
            throw {
              json: true,
              error: error,
              data: data
            };
          }
        }

        return data;
      })["catch"](function (error) {
        if (error.response) {
          throw error.response.data.error;
        } else if (error.json === true) {
          throw {
            // eslint-disable-line
            code: -2,
            message: "API returned invalid JSON",
            error: error.error,
            data: error.data
          };
        } else {
          throw {
            // eslint-disable-line
            code: -1,
            message: "Network Error",
            error: error
          };
        }
      });
    },

    /**
     * GET convenience method. Calls the request method for you
     * @param  {string} endpoint    The endpoint to get
     * @param  {Object} [params={}] The HTTP query parameters (GET only)
     * @return {RequestPromise}
     */
    get: function get(endpoint) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(endpoint, "endpoint");
      AV.objectOrEmpty(params, "params");
      return this.request("get", endpoint, params);
    },

    /**
     * POST convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    post: function post(endpoint) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(endpoint, "endpoint");
      Array.isArray(body) ? AV.arrayOrEmpty(body, "body") : AV.objectOrEmpty(body, "body");
      return this.request("post", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    patch: function patch(endpoint) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(endpoint, "endpoint");
      Array.isArray(body) ? AV.arrayOrEmpty(body, "body") : AV.objectOrEmpty(body, "body");
      return this.request("patch", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @param  {Object} [body={}] The HTTP request body
     * @return {RequestPromise}
     */
    put: function put(endpoint) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(endpoint, "endpoint");
      Array.isArray(body) ? AV.arrayOrEmpty(body, "body") : AV.objectOrEmpty(body, "body");
      return this.request("put", endpoint, params, body);
    },

    /**
     * PATCH convenience method. Calls the request method for you
     * @param  {string} endpoint  The endpoint to get
     * @return {RequestPromise}
     */
    "delete": function _delete(endpoint) {
      AV.string(endpoint, "endpoint");
      return this.request("delete", endpoint);
    },
    // AUTHENTICATION
    // -------------------------------------------------------------------------

    /**
     * Logging in promise
     * @promise LoginPromise
     * @fulfill {Object} Object containing URL, ENV, and TOKEN
     * @reject {Error}   Network error (if no connection to API)
     * @reject {Error}   Directus error (eg not logged in or 404)
     */

    /**
     * Login to the API.
     *
     * Gets a new token from the API and stores it in this.token
     * @param  {Object} credentials
     * @param  {String} credentials.email     The user's email address
     * @param  {String} credentials.password  The user's password
     * @param  {String} [credentials.otp]     The user's 2FA OTP
     * @param  {String} [credentials.url]     The API to login to (overwrites this.url)
     * @param  {String} [credentials.project] The API project to login to (overwrites this.project)
     * @param  {String} [options.persist]     Auto-fetch a new token when it's about to expire
     * @param  {Boolean} [options.storage]    Where to store the token (survive refreshes)
     * @return {LoginPromise}
     */
    login: function login(credentials) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        persist: true
      };
      AV.object(credentials, "credentials");
      AV.keysWithString(credentials, ["email", "password"], "credentials");
      this.token = null;

      if (AV.hasKeysWithString(credentials, ["url"])) {
        this.url = credentials.url;
      }

      if (AV.hasKeysWithString(credentials, ["project"])) {
        this.project = credentials.project;
      }

      if (credentials.persist || options.persist) {
        this.startInterval();
      }

      return new Promise(function (resolve, reject) {
        _this.post("/auth/authenticate", {
          email: credentials.email,
          password: credentials.password,
          otp: credentials.otp
        }).then(function (res) {
          return res.data.token;
        }).then(function (token) {
          _this.token = token; // Expiry date is the moment we got the token + 5 minutes

          _this.localExp = new Date(Date.now() + _this.tokenExpiryTime * 60000).getTime();

          if (_this.storage) {
            _this.storage.setItem("directus-sdk-js", JSON.stringify({
              token: _this.token,
              url: _this.url,
              project: _this.project,
              localExp: _this.localExp
            }));
          }

          resolve({
            url: _this.url,
            project: _this.project,
            token: _this.token,
            localExp: _this.localExp
          });
        })["catch"](reject);
      });
    },

    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    logout: function logout() {
      this.token = null;

      if (this.refreshInterval) {
        this.stopInterval();
      }

      if (this.storage) {
        this.storage.removeItem("directus-sdk-js");
      }
    },

    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    reset: function reset() {
      this.logout();
      this.url = null;
      this.project = null;
    },

    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
     * @param {Boolean} fireImmediately Fire the refreshIfNeeded method directly
     */
    startInterval: function startInterval(fireImmediately) {
      if (fireImmediately) this.refreshIfNeeded();
      this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
    },

    /**
     * Clears and nullifies the token refreshing interval
     */
    stopInterval: function stopInterval() {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    },

    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date)
     *
     * Calls onAutoRefreshSuccess with the new token if the refreshing is successful
     * Calls onAutoRefreshError if refreshing the token fails for some reason
     */
    refreshIfNeeded: function refreshIfNeeded() {
      var _this2 = this;

      if (!AV.hasStringKeys(this, ["token", "url", "project"])) return;
      if (!this.payload || !this.payload.exp) return;
      var timeDiff = this.localExp - Date.now();

      if (timeDiff <= 0) {
        if (AV.isFunction(this.onAutoRefreshError)) {
          this.onAutoRefreshError({
            message: "auth_expired_token",
            code: 102
          });
        }

        return;
      }

      if (timeDiff < 30000) {
        this.refresh(this.token).then(function (res) {
          _this2.token = res.data.token;
          _this2.localExp = new Date(Date.now() + _this2.tokenExpiryTime * 60000).getTime();

          if (AV.isFunction(_this2.onAutoRefreshSuccess)) {
            _this2.onAutoRefreshSuccess({
              url: _this2.url,
              project: _this2.project,
              token: _this2.token,
              localExp: _this2.localExp
            });
          }

          if (_this2.storage) {
            _this2.storage.setItem("directus-sdk-js", JSON.stringify({
              token: _this2.token,
              url: _this2.url,
              project: _this2.project,
              localExp: _this2.localExp
            }));
          }
        })["catch"](function (error) {
          if (AV.isFunction(_this2.onAutoRefreshError)) {
            _this2.onAutoRefreshError(error);
          }
        });
      }
    },

    /**
     * Use the passed token to request a new one
     * @param  {String} token Active & Valid token
     * @return {RequestPromise}
     */
    refresh: function refresh(token) {
      AV.string(token, "token");
      return this.post("/auth/refresh", {
        token: token
      });
    },

    /**
     * Request to reset the password of the user with the given email address
     *
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     * @param {String} email The user's email
     */
    requestPasswordReset: function requestPasswordReset(email) {
      AV.string(email, "email");
      return this.post("/auth/password/request", {
        email: email
      });
    },
    // ACTIVITY
    // -------------------------------------------------------------------------

    /**
     * Get activity
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getActivity: function getActivity() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/activity", params);
    },
    // BOOKMARKS
    // -------------------------------------------------------------------------

    /**
     * Get the bookmarks of the current user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMyBookmarks: function getMyBookmarks() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.string(this.token, "this.token");
      AV.objectOrEmpty(params);
      return Promise.all([this.get("/collection_presets", {
        "filter[title][nnull]": 1,
        "filter[user][eq]": this.payload.id
      }), this.get("/collection_presets", {
        "filter[title][nnull]": 1,
        "filter[role][eq]": this.payload.role,
        "filter[user][null]": 1
      })]).then(function (values) {
        var _values = _slicedToArray(values, 2),
            user = _values[0],
            role = _values[1]; // eslint-disable-line no-shadow


        return [].concat(_toConsumableArray(user.data), _toConsumableArray(role.data));
      });
    },
    // COLLECTIONS
    // -------------------------------------------------------------------------

    /**
     * Get all available collections
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollections: function getCollections() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/collections", params);
    },

    /**
     * Get collection info by name
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollection: function getCollection(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");
      return this.get("/collections/".concat(collection), params);
    },

    /**
     * Create a collection
     * @param {Object} data Collection information
     * @return {RequestPromise}
     */
    createCollection: function createCollection(data) {
      AV.object(data, "data");
      return this.post("/collections", data);
    },

    /**
     * @param  {String} The collection to update
     * @param  {Object} The fields to update
     * @return {RequestPromise}
     */
    updateCollection: function updateCollection(collection, data) {
      AV.string(collection, "collection");
      AV.object(data, "data");
      return this.patch("/collections/".concat(collection), data);
    },

    /**
     * @param  {String} collection The primary key of the collection to remove
     * @return {RequestPromise}
     */
    deleteCollection: function deleteCollection(collection) {
      AV.string(collection, "collection");
      return this["delete"]("/collections/".concat(collection));
    },
    // COLLECTION PRESETS
    // -------------------------------------------------------------------------

    /**
     * Create a new collection preset (bookmark / listing preferences)
     * @param  {Object} data The bookmark info
     * @return {RequestPromise}
     */
    createCollectionPreset: function createCollectionPreset(data) {
      AV.object(data);
      return this.post("/collection_presets", data);
    },

    /**
     * Update collection preset (bookmark / listing preference)
     * @param {String|Number} primaryKey
     * @param {RequestPromise} data
     */
    updateCollectionPreset: function updateCollectionPreset(primaryKey, data) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(data, "data");
      return this.patch("/collection_presets/".concat(primaryKey), data);
    },

    /**
     * Delete collection preset by primarykey
     * @param {String|Number} primaryKey The primaryKey of the preset to delete
     */
    deleteCollectionPreset: function deleteCollectionPreset(primaryKey) {
      AV.notNull(primaryKey, "primaryKey");
      return this["delete"]("/collection_presets/".concat(primaryKey));
    },
    // DATABASE
    // ------------------------------------------------------------------------

    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     * @return {RequestPromise}
     */
    updateDatabase: function updateDatabase() {
      return this.post("/update");
    },
    // EXTENSIONS
    // -------------------------------------------------------------------------

    /**
     * Get the meta information of all installed interfaces
     * @return {RequestPromise}
     */
    getInterfaces: function getInterfaces() {
      return this.request("get", "/interfaces", {}, {}, true);
    },

    /**
     * Get the meta information of all installed layouts
     * @return {RequestPromise}
     */
    getLayouts: function getLayouts() {
      return this.request("get", "/layouts", {}, {}, true);
    },

    /**
     * Get the meta information of all installed pages
     * @return {RequestPromise}
     */
    getPages: function getPages() {
      return this.request("get", "/pages", {}, {}, true);
    },
    // FIELDS
    // ------------------------------------------------------------------------

    /**
     * Get all fields that are in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getAllFields: function getAllFields() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/fields", params);
    },

    /**
     * Get the fields that have been setup for a given collection
     * @param  {String} collection  Collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getFields: function getFields(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");
      return this.get("/fields/".concat(collection), params);
    },

    /**
     * Get the field information for a single given field
     * @param  {String} collection  Collection name
     * @param  {String} fieldName   Field name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getField: function getField(collection, fieldName) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      AV.objectOrEmpty(params, "params");
      return this.get("/fields/".concat(collection, "/").concat(fieldName), params);
    },

    /**
     * Create a field in the given collection
     * @param  {String} collection Collection to add the field in
     * @param  {Object} fieldInfo  The fields info to save
     * @return {RequestPromise}
     */
    createField: function createField(collection, fieldInfo) {
      AV.string(collection, "collection");
      AV.object(fieldInfo, "fieldInfo");
      return this.post("/fields/".concat(collection), fieldInfo);
    },

    /**
     * Update a given field in a given collection
     * @param  {String} collection Field's parent collection
     * @param  {String} fieldName  Name of the field to update
     * @param  {Object} fieldInfo  Fields to update
     * @return {RequestPromise}
     */
    updateField: function updateField(collection, fieldName, fieldInfo) {
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      AV.object(fieldInfo, "fieldInfo");
      return this.patch("/fields/".concat(collection, "/").concat(fieldName), fieldInfo);
    },

    /**
     * Update multiple fields at once
     * @param  {String} collection             Fields' parent collection
     * @param  {Array} fieldsInfoOrFieldNames  Array of field objects or array of field names
     * @param  {Object} [fieldInfo]            In case fieldsInfoOrFieldNames is an array of fieldNames, you need to provide the fields to update
     * @return {RequestPromise}
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
    updateFields: function updateFields(collection, fieldsInfoOrFieldNames) {
      var fieldInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      AV.string(collection, "collection");
      AV.array(fieldsInfoOrFieldNames, "fieldsInfoOrFieldNames");

      if (fieldInfo) {
        AV.object(fieldInfo);
      }

      if (fieldInfo) {
        return this.patch("/fields/".concat(collection, "/").concat(fieldsInfoOrFieldNames.join(",")), fieldInfo);
      }

      return this.patch("/fields/".concat(collection), fieldsInfoOrFieldNames);
    },

    /**
     * Delete a field from a collection
     * @param  {String} collection Name of the collection
     * @param  {String} fieldName  The name of the field to delete
     * @return {RequestPromise}
     */
    deleteField: function deleteField(collection, fieldName) {
      AV.string(collection, "collection");
      AV.string(fieldName, "fieldName");
      return this["delete"]("/fields/".concat(collection, "/").concat(fieldName));
    },
    // FILES
    // ------------------------------------------------------------------------

    /**
     * Get a list of available files in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getFiles: function getFiles() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/files", params);
    },

    /**
     * Upload multipart files in multipart/form-data
     * @param  {Object} data FormData object containing files
     * @param  {Function} [onUploadProgress=()=>{}] Progress callback
     * @param  {Object} [overrideHeaders={}] Override headers, for example when using `form-data`
     * @return {RequestPromise}
     */
    uploadFiles: function uploadFiles(data) {
      var onUploadProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var overrideHeaders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer ".concat(this.token)
      };

      if (overrideHeaders) {
        Object.keys(overrideHeaders).forEach(function (headerKey) {
          headers[headerKey] = overrideHeaders[headerKey];
        });
      }

      return this.axios.post("".concat(this.url, "/").concat(this.project, "/files"), data, {
        headers: headers,
        onUploadProgress: onUploadProgress
      }).then(function (res) {
        return res.data;
      })["catch"](function (error) {
        if (error.response) {
          throw error.response.data.error;
        } else {
          throw {
            // eslint-disable-line
            code: -1,
            message: "Network Error",
            error: error
          };
        }
      });
    },
    // ITEMS
    // -------------------------------------------------------------------------

    /**
     * Update an existing item
     * @param  {String} collection The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} body       The item's field values
     * @param  {Object} params     Query parameters
     * @return {RequestPromise}
     */
    updateItem: function updateItem(collection, primaryKey, body) {
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9), "/").concat(primaryKey), body, params);
      }

      return this.patch("/items/".concat(collection, "/").concat(primaryKey), body, params);
    },

    /**
     * Update multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @param  {Object} params     Query Parameters
     * @return {RequestPromise}
     */
    updateItems: function updateItems(collection, body) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.array(body, "body");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9)), body, params);
      }

      return this.patch("/items/".concat(collection), body, params);
    },

    /**
     * Create a new item
     * @param  {String} collection The collection to add the item to
     * @param  {Object} body       The item's field values
     * @return {RequestPromise}
     */
    createItem: function createItem(collection, body) {
      AV.string(collection, "collection");
      AV.object(body, "body");

      if (collection.startsWith("directus_")) {
        return this.post("/".concat(collection.substring(9)), body);
      }

      return this.post("/items/".concat(collection), body);
    },

    /**
     * Create multiple items
     * @param  {String} collection The collection to add the item to
     * @param  {Array} body        The item's field values
     * @return {RequestPromise}
     */
    createItems: function createItems(collection, body) {
      AV.string(collection, "collection");
      AV.array(body, "body");

      if (collection.startsWith("directus_")) {
        return this.post("/".concat(collection.substring(9)), body);
      }

      return this.post("/items/".concat(collection), body);
    },

    /**
     * Get items from a given collection
     * @param  {String} collection The collection to add the item to
     * @param  {Object} [params={}]   Query parameters
     * @return {RequestPromise}
     */
    getItems: function getItems(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get("/".concat(collection.substring(9)), params);
      }

      return this.get("/items/".concat(collection), params);
    },

    /**
     * Get a single item by primary key
     * @param  {String} collection  The collection to add the item to
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getItem: function getItem(collection, primaryKey) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get("/".concat(collection.substring(9), "/").concat(primaryKey), params);
      }

      return this.get("/items/".concat(collection, "/").concat(primaryKey), params);
    },

    /**
     * Delete a single item by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {String|Number} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItem: function deleteItem(collection, primaryKey) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");

      if (collection.startsWith("directus_")) {
        return this["delete"]("/".concat(collection.substring(9), "/").concat(primaryKey));
      }

      return this["delete"]("/items/".concat(collection, "/").concat(primaryKey));
    },

    /**
     * Delete multiple items by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {Array} primaryKey Primary key of the item
     * @return {RequestPromise}
     */
    deleteItems: function deleteItems(collection, primaryKeys) {
      AV.string(collection, "collection");
      AV.array(primaryKeys, "primaryKeys");

      if (collection.startsWith("directus_")) {
        return this["delete"]("/".concat(collection.substring(9), "/").concat(primaryKeys.join()));
      }

      return this["delete"]("/items/".concat(collection, "/").concat(primaryKeys.join()));
    },
    // LISTING PREFERENCES
    // -------------------------------------------------------------------------

    /**
     * Get the collection presets of the current user for a single collection
     * @param  {String} collection  Collection to fetch the preferences for
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMyListingPreferences: function getMyListingPreferences(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(this.token, "this.token");
      AV.objectOrEmpty(params, "params");
      return Promise.all([this.get("/collection_presets", {
        limit: 1,
        "filter[title][null]": 1,
        "filter[collection][eq]": collection,
        "filter[role][null]": 1,
        "filter[user][null]": 1,
        sort: "-id"
      }), this.get("/collection_presets", {
        limit: 1,
        "filter[title][null]": 1,
        "filter[collection][eq]": collection,
        "filter[role][eq]": this.payload.role,
        "filter[user][null]": 1,
        sort: "-id"
      }), this.get("/collection_presets", {
        limit: 1,
        "filter[title][null]": 1,
        "filter[collection][eq]": collection,
        "filter[role][eq]": this.payload.role,
        "filter[user][eq]": this.payload.id,
        sort: "-id"
      })]).then(function (values) {
        var _values2 = _slicedToArray(values, 3),
            collection = _values2[0],
            role = _values2[1],
            user = _values2[2]; // eslint-disable-line no-shadow


        if (user.data && user.data.length > 0) {
          return user.data[0];
        }

        if (role.data && role.data.length > 0) {
          return role.data[0];
        }

        if (collection.data && collection.data.length > 0) {
          return collection.data[0];
        }

        return {};
      });
    },
    // PERMISSIONS
    // -------------------------------------------------------------------------

    /**
     * Get permissions
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getPermissions: function getPermissions() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.getItems("directus_permissions", params);
    },

    /**
     * Get the currently logged in user's permissions
     * @param  {Object} params Query parameters
     * @return {RequestPromise}
     */
    getMyPermissions: function getMyPermissions() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/permissions/me", params);
    },

    /**
     * Create multiple new permissions
     * @param  {Array} data  Permission records to save
     * @return {RequestPromise}
     */
    createPermissions: function createPermissions(data) {
      AV.array(data);
      return this.post("/permissions", data);
    },

    /**
     * Update multiple permission records
     * @param  {Array} data  Permission records to update
     * @return {RequestPromise}
     */
    updatePermissions: function updatePermissions(data) {
      AV.array(data);
      return this.patch("/permissions", data);
    },
    // RELATIONS
    // -------------------------------------------------------------------------

    /**
     * Get all relationships
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRelations: function getRelations() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params);
      return this.get("/relations", params);
    },
    createRelation: function createRelation(data) {
      return this.post("/relations", data);
    },
    updateRelation: function updateRelation(primaryKey, data) {
      return this.patch("/relations/".concat(primaryKey), data);
    },

    /**
     * Get the relationship information for the given collection
     * @param  {String} collection The collection name
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getCollectionRelations: function getCollectionRelations(collection) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.string(collection, "collection");
      AV.objectOrEmpty(params);
      return Promise.all([this.get("/relations", {
        "filter[collection_a][eq]": collection
      }), this.get("/relations", {
        "filter[collection_b][eq]": collection
      })]);
    },
    // REVISIONS
    // -------------------------------------------------------------------------

    /**
     * Get a single item's revisions by primary key
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getItemRevisions: function getItemRevisions(collection, primaryKey) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");

      if (collection.startsWith("directus_")) {
        return this.get("/".concat(collection.substring(9), "/").concat(primaryKey, "/revisions"), params);
      }

      return this.get("/items/".concat(collection, "/").concat(primaryKey, "/revisions"), params);
    },

    /**
     * revert an item to a previous state
     * @param  {String} collection  The collection to fetch the revisions from
     * @param  {String|Number} primaryKey Primary key of the item
     * @param  {Number} revisionID The ID of the revision to revert to
     * @return {RequestPromise}
     */
    revert: function revert(collection, primaryKey, revisionID) {
      AV.string(collection, "collection");
      AV.notNull(primaryKey, "primaryKey");
      AV.number(revisionID, "revisionID");

      if (collection.startsWith("directus_")) {
        return this.patch("/".concat(collection.substring(9), "/").concat(primaryKey, "/revert/").concat(revisionID));
      }

      return this.patch("/items/".concat(collection, "/").concat(primaryKey, "/revert/").concat(revisionID));
    },
    // ROLES
    // -------------------------------------------------------------------------

    /**
     * Get a single user role
     * @param  {Number} primaryKey  The id of the user rol to get
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRole: function getRole(primaryKey) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.number(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");
      return this.get("/roles/".concat(primaryKey), params);
    },

    /**
     * Get the user roles
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getRoles: function getRoles() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/roles", params);
    },

    /**
     * Update a user role
     * @param  {Number} primaryKey The ID of the role
     * @param  {Object} body       The fields to update
     * @return {RequestPromise}
     */
    updateRole: function updateRole(primaryKey, body) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");
      return this.updateItem("directus_roles", primaryKey, body);
    },

    /**
     * Create a new user role
     * @param  {Object} body The role information
     * @return {RequestPromise}
     */
    createRole: function createRole(body) {
      AV.object(body, "body");
      return this.createItem("directus_roles", body);
    },

    /**
     * Delete a user rol by primary key
     * @param  {Number | String} primaryKey Primary key of the user role
     * @return {RequestPromise}
     */
    deleteRole: function deleteRole(primaryKey) {
      AV.notNull(primaryKey, "primaryKey");
      return this.deleteItem("directus_roles", primaryKey);
    },
    // SETTINGS
    // -------------------------------------------------------------------------

    /**
     * Get Directus' global settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getSettings: function getSettings() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/settings", params);
    },

    /**
     * Get the "fields" for directus_settings
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getSettingsFields: function getSettingsFields() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/settings/fields", params);
    },
    // USERS
    // -------------------------------------------------------------------------

    /**
     * Get a list of available users in Directus
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getUsers: function getUsers() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/users", params);
    },

    /**
     * Get a single Directus user
     * @param  {String} primaryKey  The unique identifier of the user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getUser: function getUser(primaryKey) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      AV.notNull(primaryKey, "primaryKey");
      AV.objectOrEmpty(params, "params");
      return this.get("/users/".concat(primaryKey), params);
    },

    /**
     * Get the user info of the currently logged in user
     * @param  {Object} [params={}] Query parameters
     * @return {RequestPromise}
     */
    getMe: function getMe() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      AV.objectOrEmpty(params, "params");
      return this.get("/users/me", params);
    },

    /**
     * Update a single user based on primaryKey
     * @param  {String|Number} primaryKey The primary key of the user
     * @param  {Object} body              The fields to update
     * @return {RequestPromise}
     */
    updateUser: function updateUser(primaryKey, body) {
      AV.notNull(primaryKey, "primaryKey");
      AV.object(body, "body");
      return this.updateItem("directus_users", primaryKey, body);
    },
    // UTILS
    // -------------------------------------------------------------------------

    /**
     * Ping the API to check if it exists / is up and running
     * @return {RequestPromise}
     */
    ping: function ping() {
      return this.request("get", "/server/ping", {}, {}, true, {}, true);
    },

    /**
     * Get the server info from the API
     * @return {RequestPromise}
     */
    serverInfo: function serverInfo() {
      return this.request("get", "/", {}, {}, true);
    },

    /**
     * Get the server info from the project
     * @return {RequestPromise}
     */
    projectInfo: function projectInfo() {
      return this.request("get", "/");
    },

    /**
     * Get all the setup third party auth providers
     * @return {RequestPromise}
     */
    getThirdPartyAuthProviders: function getThirdPartyAuthProviders() {
      return this.get("/auth/sso");
    }
  }; // Only start the auto refresh interval if the token exists and it's a JWT

  if (SDK.token && SDK.token.includes(".")) {
    SDK.startInterval(true);
  }

  return SDK;
} // CONVENIENCE METHODS
// -------------------------------------------------------------------------------------------------


SDK.getPayload = getPayload;
module.exports = SDK;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXJndW1lbnQtdmFsaWRhdG9yL2FyZ3VtZW50LXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvZm9ybWF0cy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwiYmFzZTY0IiwicXMiLCJBViIsImdldFBheWxvYWQiLCJ0b2tlbiIsInBheWxvYWRCYXNlNjQiLCJzcGxpdCIsInJlcGxhY2UiLCJwYXlsb2FkRGVjb2RlZCIsImRlY29kZSIsInBheWxvYWRPYmplY3QiLCJKU09OIiwicGFyc2UiLCJpc051bWJlciIsImV4cCIsIkRhdGUiLCJTREsiLCJvcHRpb25zIiwidXJsIiwicHJvamVjdCIsImxvY2FsRXhwIiwidG9rZW5FeHBpcnlUaW1lIiwic3RvcmFnZSIsInN0b3JlZEluZm8iLCJnZXRJdGVtIiwiY3JlYXRlIiwicGFyYW1zU2VyaWFsaXplciIsInN0cmluZ2lmeSIsInRpbWVvdXQiLCJyZWZyZXNoSW50ZXJ2YWwiLCJvbkF1dG9SZWZyZXNoRXJyb3IiLCJvbkF1dG9SZWZyZXNoU3VjY2VzcyIsInBheWxvYWQiLCJpc1N0cmluZyIsImxvZ2dlZEluIiwiaXNPYmplY3QiLCJub3ciLCJyZXF1ZXN0IiwibWV0aG9kIiwiZW5kcG9pbnQiLCJwYXJhbXMiLCJkYXRhIiwibm9FbnYiLCJoZWFkZXJzIiwiaWdub3JlSnNvbiIsInN0cmluZyIsIm9iamVjdE9yRW1wdHkiLCJBcnJheSIsImlzQXJyYXkiLCJhcnJheU9yRW1wdHkiLCJiYXNlVVJMIiwicmVxdWVzdE9wdGlvbnMiLCJsZW5ndGgiLCJBdXRob3JpemF0aW9uIiwidGhlbiIsInJlcyIsImVycm9yIiwianNvbiIsInJlc3BvbnNlIiwiY29kZSIsIm1lc3NhZ2UiLCJnZXQiLCJwb3N0IiwiYm9keSIsInBhdGNoIiwicHV0IiwibG9naW4iLCJjcmVkZW50aWFscyIsInBlcnNpc3QiLCJvYmplY3QiLCJrZXlzV2l0aFN0cmluZyIsImhhc0tleXNXaXRoU3RyaW5nIiwic3RhcnRJbnRlcnZhbCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZW1haWwiLCJwYXNzd29yZCIsIm90cCIsImdldFRpbWUiLCJzZXRJdGVtIiwibG9nb3V0Iiwic3RvcEludGVydmFsIiwicmVtb3ZlSXRlbSIsInJlc2V0IiwiZmlyZUltbWVkaWF0ZWx5IiwicmVmcmVzaElmTmVlZGVkIiwic2V0SW50ZXJ2YWwiLCJiaW5kIiwiY2xlYXJJbnRlcnZhbCIsImhhc1N0cmluZ0tleXMiLCJ0aW1lRGlmZiIsImlzRnVuY3Rpb24iLCJyZWZyZXNoIiwicmVxdWVzdFBhc3N3b3JkUmVzZXQiLCJnZXRBY3Rpdml0eSIsImdldE15Qm9va21hcmtzIiwiYWxsIiwiaWQiLCJyb2xlIiwidmFsdWVzIiwidXNlciIsImdldENvbGxlY3Rpb25zIiwiZ2V0Q29sbGVjdGlvbiIsImNvbGxlY3Rpb24iLCJjcmVhdGVDb2xsZWN0aW9uIiwidXBkYXRlQ29sbGVjdGlvbiIsImRlbGV0ZUNvbGxlY3Rpb24iLCJjcmVhdGVDb2xsZWN0aW9uUHJlc2V0IiwidXBkYXRlQ29sbGVjdGlvblByZXNldCIsInByaW1hcnlLZXkiLCJub3ROdWxsIiwiZGVsZXRlQ29sbGVjdGlvblByZXNldCIsInVwZGF0ZURhdGFiYXNlIiwiZ2V0SW50ZXJmYWNlcyIsImdldExheW91dHMiLCJnZXRQYWdlcyIsImdldEFsbEZpZWxkcyIsImdldEZpZWxkcyIsImdldEZpZWxkIiwiZmllbGROYW1lIiwiY3JlYXRlRmllbGQiLCJmaWVsZEluZm8iLCJ1cGRhdGVGaWVsZCIsInVwZGF0ZUZpZWxkcyIsImZpZWxkc0luZm9PckZpZWxkTmFtZXMiLCJhcnJheSIsImpvaW4iLCJkZWxldGVGaWVsZCIsImdldEZpbGVzIiwidXBsb2FkRmlsZXMiLCJvblVwbG9hZFByb2dyZXNzIiwib3ZlcnJpZGVIZWFkZXJzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJoZWFkZXJLZXkiLCJ1cGRhdGVJdGVtIiwic3RhcnRzV2l0aCIsInN1YnN0cmluZyIsInVwZGF0ZUl0ZW1zIiwiY3JlYXRlSXRlbSIsImNyZWF0ZUl0ZW1zIiwiZ2V0SXRlbXMiLCJkZWxldGVJdGVtIiwiZGVsZXRlSXRlbXMiLCJwcmltYXJ5S2V5cyIsImdldE15TGlzdGluZ1ByZWZlcmVuY2VzIiwibGltaXQiLCJzb3J0IiwiZ2V0UGVybWlzc2lvbnMiLCJnZXRNeVBlcm1pc3Npb25zIiwiY3JlYXRlUGVybWlzc2lvbnMiLCJ1cGRhdGVQZXJtaXNzaW9ucyIsImdldFJlbGF0aW9ucyIsImNyZWF0ZVJlbGF0aW9uIiwidXBkYXRlUmVsYXRpb24iLCJnZXRDb2xsZWN0aW9uUmVsYXRpb25zIiwiZ2V0SXRlbVJldmlzaW9ucyIsInJldmVydCIsInJldmlzaW9uSUQiLCJudW1iZXIiLCJnZXRSb2xlIiwiZ2V0Um9sZXMiLCJ1cGRhdGVSb2xlIiwiY3JlYXRlUm9sZSIsImRlbGV0ZVJvbGUiLCJnZXRTZXR0aW5ncyIsImdldFNldHRpbmdzRmllbGRzIiwiZ2V0VXNlcnMiLCJnZXRVc2VyIiwiZ2V0TWUiLCJ1cGRhdGVVc2VyIiwicGluZyIsInNlcnZlckluZm8iLCJwcm9qZWN0SW5mbyIsImdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzIiwiaW5jbHVkZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWIsUUFBUSxLQUE2QjtBQUNyQztBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixtQkFBbUI7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsWUFBWTtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVMsR0FBRyxTQUFTO0FBQzVDLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOVNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLG1CQUFtQixLQUEwQjs7QUFFN0M7QUFDQSxrQkFBa0IsS0FBeUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUVVO0FBQ1o7QUFDQSxFQUFFLG1DQUFPO0FBQ1Q7QUFDQSxHQUFHO0FBQUEsb0dBQUM7QUFDSixFQUFFLE1BQU0sWUFVTjs7QUFFRixDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEtEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixvQkFBb0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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N0MsR0FBRyxDQUFDWixLQUFKLElBQWFZLEdBQUcsQ0FBQ1osS0FBSixDQUFVNkssUUFBVixDQUFtQixHQUFuQixDQUFqQixFQUEwQztBQUN4Q2pLLE9BQUcsQ0FBQ3dELGFBQUosQ0FBa0IsSUFBbEI7QUFDRDs7QUFFRCxTQUFPeEQsR0FBUDtBQUNELEMsQ0FFRDtBQUNBOzs7QUFFQUEsR0FBRyxDQUFDYixVQUFKLEdBQWlCQSxVQUFqQjtBQUNBK0ssTUFBTSxDQUFDQyxPQUFQLEdBQWlCbkssR0FBakIsQyIsImZpbGUiOiJkaXJlY3R1cy1zZGsudW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJEaXJlY3R1c1NES1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgLypcbiAgICAgKiBXZSBvbmx5IGRlZmluZSB0aGUgaXMvaGFzKiBmdW5jdGlvbnMgYW5kIHVzZSB0aGVcbiAgICAgKiBkZW1hbmQoKSBmdW5jdGlvbiB0byBidWlsZCB0aGUgZGVtYW5kcywgYWxzbyB0aGVcbiAgICAgKiBnZXREZW1hbmRNZXRob2ROYW1lQnlWYWxpZGF0b3JLZXkoKSAoeWVoLCBJIGtub3cgaXQncyBhbiB1Z2x5IG5hbWUgOigpXG4gICAgICogYnVpbGQgdGhlIGRlbWFuZCBtZXRob2QgYmFzZWQgaW4gdGhlIC5pcy9oYXMgbWV0aG9kc1xuICAgICAqL1xuXG4gICAgdmFyIHYgPSB7IH07XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuQXJndW1lbnRWYWxpZGF0b3IgPSB2O1xuICAgIH1cblxuICAgIHZhciBkZW1hbmQgPSBmdW5jdGlvbiAoZGVtYW5kTWV0aG9kTmFtZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUgLyogLi4uIG1vcmUgYXJncywgbmFtZSAqLykge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvci5hcHBseSh2LCBhcmd1bWVudHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuYW1lID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAtMSlbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2LmlzSnNvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1zZyA9IFwiSW52YWxpZCBcIiArIGRlbWFuZE1ldGhvZE5hbWUgKyBcIiB2YWx1ZTogXCIgKyB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh2LmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbXNnICs9IFwiXFxuQXJndW1lbnQgTmFtZTogXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodi5pc0FycmF5KGFyZ3VtZW50c1sxXSkpIHtcbiAgICAgICAgICAgICAgICBtc2cgKz0gXCJcXG5LZXlzOiBcIiArIGFyZ3VtZW50c1sxXS5qb2luKFwiLCBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXREZW1hbmRNZXRob2ROYW1lQnlWYWxpZGF0b3JLZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBbICdpcycsICdoYXMnIF07XG4gICAgICAgIHZhciBwcmVmaXhMZW5ndGggPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcmVmaXhMZW5ndGggPSBwcmVmaXhbaV0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAoa2V5LnNsaWNlKDAsIHByZWZpeExlbmd0aCkgPT09IHByZWZpeFtpXSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlbWFuZE1ldGhvZE5hbWUgPSBrZXkuc2xpY2UocHJlZml4TGVuZ3RoICsgMSk7XG4gICAgICAgIHZhciBmaXJzdExldHRlciA9IGtleS5zbGljZShwcmVmaXhMZW5ndGgsIHByZWZpeExlbmd0aCArIDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBuYW1lID0gZmlyc3RMZXR0ZXIgKyBkZW1hbmRNZXRob2ROYW1lO1xuXG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG5cbiAgICB2YXIgaGFzS2V5c1dpdGggPSBmdW5jdGlvbiAodmFsaWRhdG9yLCBvYmosIGtleXMpIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0T3JFbXB0eShvYmopIHx8ICF2LmlzQXJyYXlPckVtcHR5KGtleXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5c1tpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yKG9ialtrZXlzW2ldXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdmFyIGlzQXJyYXlPZiA9IGZ1bmN0aW9uICh2YWxpZGF0b3IsIGFycikge1xuICAgICAgICBpZiAoIXYuaXNBcnJheShhcnIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF2YWxpZGF0b3IoYXJyW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB2LmlzTm90TnVsbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgdi5pc0luc3RhbmNlT2YgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH07XG5cbiAgICB2LmlzVHlwZSA9IGZ1bmN0aW9uICh0eXBlLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IFwiICsgdHlwZSArIFwiXVwiO1xuICAgIH07XG5cbiAgICB2LmlzQm9vbGVhbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gKFsgMSwgMCwgdHJ1ZSwgZmFsc2UgXS5pbmRleE9mKHZhbHVlKSA+IC0xKTtcbiAgICB9O1xuXG4gICAgdi5pc1N0cmluZ09yRW1wdHkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHYuaXNUeXBlKFwiU3RyaW5nXCIsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgdi5pc1N0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNTdHJpbmdPckVtcHR5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAvXFxTLy50ZXN0KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgdi5pc051bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNUeXBlKCdOdW1iZXInLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5T3JFbXB0eSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgcmV0dXJuIHYuaXNUeXBlKFwiQXJyYXlcIiwgYXJyKTtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICBpZiAoIXYuaXNBcnJheU9yRW1wdHkoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyci5sZW5ndGggPiAwO1xuICAgIH07XG5cbiAgICB2LmlzQXJyYXlPZk51bWJlcnMgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5T2Yodi5pc051bWJlciwgYXJyKTtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5T2ZPYmplY3RzID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gaXNBcnJheU9mKHYuaXNPYmplY3QsIGFycik7XG4gICAgfTtcblxuICAgIHYuaXNPYmplY3RPckVtcHR5ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdi5pc1R5cGUoXCJPYmplY3RcIiwgb2JqKTtcbiAgICB9O1xuXG4gICAgdi5pc09iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0T3JFbXB0eShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB2LmlzSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNPYmplY3RPckVtcHR5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdi5pc0pzb25TdHJpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzTm90TnVsbCwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aE51bWJlciA9IHYuaGFzTnVtYmVyS2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNOdW1iZXIsIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhTdHJpbmcgPSB2Lmhhc1N0cmluZ0tleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzU3RyaW5nLCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXNXaXRoT2JqZWN0ID0gdi5oYXNPYmplY3RLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc09iamVjdCwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aFN0cmluZ09yRW1wdHkgPSB2Lmhhc1N0cmluZ09yRW1wdHlLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc1N0cmluZ09yRW1wdHksIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhPYmplY3RPckVtcHR5ID0gdi5oYXNPYmplY3RPckVtcHR5S2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNPYmplY3RPckVtcHR5LCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2LmlzRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHYuaXNJbnN0YW5jZU9mKEZ1bmN0aW9uLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8vIGJ1aWxkIGRlbWFuZCBmdW5jdGlvbnNcbiAgICBmb3IgKHZhciBrZXkgaW4gdikge1xuICAgICAgICB2YXIgZGVtYW5kTWV0aG9kTmFtZSA9IGdldERlbWFuZE1ldGhvZE5hbWVCeVZhbGlkYXRvcktleShrZXkpO1xuICAgICAgICB2W2RlbWFuZE1ldGhvZE5hbWVdID0gZGVtYW5kKGRlbWFuZE1ldGhvZE5hbWUsIHZba2V5XSk7XG4gICAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiLyohIGh0dHA6Ly9tdGhzLmJlL2Jhc2U2NCB2MC4xLjAgYnkgQG1hdGhpYXMgfCBNSVQgbGljZW5zZSAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYC5cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC5cblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLCBhbmQgdXNlXG5cdC8vIGl0IGFzIGByb290YC5cblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgSW52YWxpZENoYXJhY3RlckVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH07XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5cdHZhciBlcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHQvLyBOb3RlOiB0aGUgZXJyb3IgbWVzc2FnZXMgdXNlZCB0aHJvdWdob3V0IHRoaXMgZmlsZSBtYXRjaCB0aG9zZSB1c2VkIGJ5XG5cdFx0Ly8gdGhlIG5hdGl2ZSBgYXRvYmAvYGJ0b2FgIGltcGxlbWVudGF0aW9uIGluIENocm9taXVtLlxuXHRcdHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IobWVzc2FnZSk7XG5cdH07XG5cblx0dmFyIFRBQkxFID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXHQvLyBodHRwOi8vd2hhdHdnLm9yZy9odG1sL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjc3BhY2UtY2hhcmFjdGVyXG5cdHZhciBSRUdFWF9TUEFDRV9DSEFSQUNURVJTID0gL1tcXHRcXG5cXGZcXHIgXS9nO1xuXG5cdC8vIGBkZWNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYXRvYmAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkLiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWF0b2Jcblx0Ly8gVGhlIG9wdGltaXplZCBiYXNlNjQtZGVjb2RpbmcgYWxnb3JpdGhtIHVzZWQgaXMgYmFzZWQgb24gQGF0a+KAmXMgZXhjZWxsZW50XG5cdC8vIGltcGxlbWVudGF0aW9uLiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hdGsvMTAyMDM5NlxuXHR2YXIgZGVjb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dClcblx0XHRcdC5yZXBsYWNlKFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMsICcnKTtcblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdGlmIChsZW5ndGggJSA0ID09IDApIHtcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvPT0/JC8sICcnKTtcblx0XHRcdGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0bGVuZ3RoICUgNCA9PSAxIHx8XG5cdFx0XHQvLyBodHRwOi8vd2hhdHdnLm9yZy9DI2FscGhhbnVtZXJpYy1hc2NpaS1jaGFyYWN0ZXJzXG5cdFx0XHQvW14rYS16QS1aMC05L10vLnRlc3QoaW5wdXQpXG5cdFx0KSB7XG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J0ludmFsaWQgY2hhcmFjdGVyOiB0aGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBiaXRDb3VudGVyID0gMDtcblx0XHR2YXIgYml0U3RvcmFnZTtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0YnVmZmVyID0gVEFCTEUuaW5kZXhPZihpbnB1dC5jaGFyQXQocG9zaXRpb24pKTtcblx0XHRcdGJpdFN0b3JhZ2UgPSBiaXRDb3VudGVyICUgNCA/IGJpdFN0b3JhZ2UgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlcjtcblx0XHRcdC8vIFVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCBvZiBhIGdyb3VwIG9mIDQgY2hhcmFjdGVyc+KAplxuXHRcdFx0aWYgKGJpdENvdW50ZXIrKyAlIDQpIHtcblx0XHRcdFx0Ly8g4oCmY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIGEgc2luZ2xlIEFTQ0lJIGNoYXJhY3Rlci5cblx0XHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdFx0XHRcdFx0MHhGRiAmIGJpdFN0b3JhZ2UgPj4gKC0yICogYml0Q291bnRlciAmIDYpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0Ly8gYGVuY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBidG9hYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQ6IGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYnRvYVxuXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dCk7XG5cdFx0aWYgKC9bXlxcMC1cXHhGRl0vLnRlc3QoaW5wdXQpKSB7XG5cdFx0XHQvLyBOb3RlOiBubyBuZWVkIHRvIHNwZWNpYWwtY2FzZSBhc3RyYWwgc3ltYm9scyBoZXJlLCBhcyBzdXJyb2dhdGVzIGFyZVxuXHRcdFx0Ly8gbWF0Y2hlZCwgYW5kIHRoZSBpbnB1dCBpcyBzdXBwb3NlZCB0byBvbmx5IGNvbnRhaW4gQVNDSUkgYW55d2F5LlxuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdUaGUgc3RyaW5nIHRvIGJlIGVuY29kZWQgY29udGFpbnMgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSAnICtcblx0XHRcdFx0J0xhdGluMSByYW5nZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgcGFkZGluZyA9IGlucHV0Lmxlbmd0aCAlIDM7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHZhciBhO1xuXHRcdHZhciBiO1xuXHRcdHZhciBjO1xuXHRcdHZhciBkO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0Ly8gTWFrZSBzdXJlIGFueSBwYWRkaW5nIGlzIGhhbmRsZWQgb3V0c2lkZSBvZiB0aGUgbG9vcC5cblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoIC0gcGFkZGluZztcblxuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBSZWFkIHRocmVlIGJ5dGVzLCBpLmUuIDI0IGJpdHMuXG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgMTY7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YyA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYiArIGM7XG5cdFx0XHQvLyBUdXJuIHRoZSAyNCBiaXRzIGludG8gZm91ciBjaHVua3Mgb2YgNiBiaXRzIGVhY2gsIGFuZCBhcHBlbmQgdGhlXG5cdFx0XHQvLyBtYXRjaGluZyBjaGFyYWN0ZXIgZm9yIGVhY2ggb2YgdGhlbSB0byB0aGUgb3V0cHV0LlxuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxOCAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiA2ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyICYgMHgzRilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZGRpbmcgPT0gMikge1xuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDg7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMCkgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA+PiA0KSAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgMikgJiAweDNGKSArXG5cdFx0XHRcdCc9J1xuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKHBhZGRpbmcgPT0gMSkge1xuXHRcdFx0YnVmZmVyID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDIpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgNCkgJiAweDNGKSArXG5cdFx0XHRcdCc9PSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHR2YXIgYmFzZTY0ID0ge1xuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQndmVyc2lvbic6ICcwLjEuMCdcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBiYXNlNjQ7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBiYXNlNjQ7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAodmFyIGtleSBpbiBiYXNlNjQpIHtcblx0XHRcdFx0YmFzZTY0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBiYXNlNjRba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5iYXNlNjQgPSBiYXNlNjQ7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2RlZmF1bHQnOiAnUkZDMzk4NicsXG4gICAgZm9ybWF0dGVyczoge1xuICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICAgICAgfSxcbiAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGFsbG93UHJvdG90eXBlczogZmFsc2UsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGNvbW1hOiBmYWxzZSxcbiAgICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgaWdub3JlUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogZmFsc2UsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gICAgcGFyc2VBcnJheXM6IHRydWUsXG4gICAgcGxhaW5PYmplY3RzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uICgkMCwgbnVtYmVyU3RyKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG51bWJlclN0ciwgMTApKTtcbiAgICB9KTtcbn07XG5cbi8vIFRoaXMgaXMgd2hhdCBicm93c2VycyB3aWxsIHN1Ym1pdCB3aGVuIHRoZSDinJMgY2hhcmFjdGVyIG9jY3VycyBpbiBhblxuLy8gYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIGJvZHkgYW5kIHRoZSBlbmNvZGluZyBvZiB0aGUgcGFnZSBjb250YWluaW5nXG4vLyB0aGUgZm9ybSBpcyBpc28tODg1OS0xLCBvciB3aGVuIHRoZSBzdWJtaXR0ZWQgZm9ybSBoYXMgYW4gYWNjZXB0LWNoYXJzZXRcbi8vIGF0dHJpYnV0ZSBvZiBpc28tODg1OS0xLiBQcmVzdW1hYmx5IGFsc28gd2l0aCBvdGhlciBjaGFyc2V0cyB0aGF0IGRvIG5vdCBjb250YWluXG4vLyB0aGUg4pyTIGNoYXJhY3Rlciwgc3VjaCBhcyB1cy1hc2NpaS5cbnZhciBpc29TZW50aW5lbCA9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpXG5cbi8vIFRoZXNlIGFyZSB0aGUgcGVyY2VudC1lbmNvZGVkIHV0Zi04IG9jdGV0cyByZXByZXNlbnRpbmcgYSBjaGVja21hcmssIGluZGljYXRpbmcgdGhhdCB0aGUgcmVxdWVzdCBhY3R1YWxseSBpcyB1dGYtOCBlbmNvZGVkLlxudmFyIGNoYXJzZXRTZW50aW5lbCA9ICd1dGY4PSVFMiU5QyU5Myc7IC8vIGVuY29kZVVSSUNvbXBvbmVudCgn4pyTJylcblxudmFyIHBhcnNlVmFsdWVzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ1ZhbHVlcyhzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIGNsZWFuU3RyID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA/IHN0ci5yZXBsYWNlKC9eXFw/LywgJycpIDogc3RyO1xuICAgIHZhciBsaW1pdCA9IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09IEluZmluaXR5ID8gdW5kZWZpbmVkIDogb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdDtcbiAgICB2YXIgcGFydHMgPSBjbGVhblN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgbGltaXQpO1xuICAgIHZhciBza2lwSW5kZXggPSAtMTsgLy8gS2VlcCB0cmFjayBvZiB3aGVyZSB0aGUgdXRmOCBzZW50aW5lbCB3YXMgZm91bmRcbiAgICB2YXIgaTtcblxuICAgIHZhciBjaGFyc2V0ID0gb3B0aW9ucy5jaGFyc2V0O1xuICAgIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChwYXJ0c1tpXS5pbmRleE9mKCd1dGY4PScpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzW2ldID09PSBjaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXSA9PT0gaXNvU2VudGluZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhcnNldCA9ICdpc28tODg1OS0xJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2tpcEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBpID0gcGFydHMubGVuZ3RoOyAvLyBUaGUgZXNsaW50IHNldHRpbmdzIGRvIG5vdCBhbGxvdyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoaSA9PT0gc2tpcEluZGV4KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuXG4gICAgICAgIHZhciBicmFja2V0RXF1YWxzUG9zID0gcGFydC5pbmRleE9mKCddPScpO1xuICAgICAgICB2YXIgcG9zID0gYnJhY2tldEVxdWFsc1BvcyA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IGJyYWNrZXRFcXVhbHNQb3MgKyAxO1xuXG4gICAgICAgIHZhciBrZXksIHZhbDtcbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0KTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID8gbnVsbCA6ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCk7XG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZShwb3MgKyAxKSwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsICYmIG9wdGlvbnMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzICYmIGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAgICAgdmFsID0gaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzKHZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsICYmIG9wdGlvbnMuY29tbWEgJiYgdmFsLmluZGV4T2YoJywnKSA+IC0xKSB7XG4gICAgICAgICAgICB2YWwgPSB2YWwuc3BsaXQoJywnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdXRpbHMuY29tYmluZShvYmpba2V5XSwgdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBwYXJzZU9iamVjdCA9IGZ1bmN0aW9uIChjaGFpbiwgdmFsLCBvcHRpb25zKSB7XG4gICAgdmFyIGxlYWYgPSB2YWw7XG5cbiAgICBmb3IgKHZhciBpID0gY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIG9iajtcbiAgICAgICAgdmFyIHJvb3QgPSBjaGFpbltpXTtcblxuICAgICAgICBpZiAocm9vdCA9PT0gJ1tdJyAmJiBvcHRpb25zLnBhcnNlQXJyYXlzKSB7XG4gICAgICAgICAgICBvYmogPSBbXS5jb25jYXQobGVhZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnBhcnNlQXJyYXlzICYmIGNsZWFuUm9vdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBvYmogPSB7IDA6IGxlYWYgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgIWlzTmFOKGluZGV4KVxuICAgICAgICAgICAgICAgICYmIHJvb3QgIT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICAmJiAob3B0aW9ucy5wYXJzZUFycmF5cyAmJiBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBsZWFmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGVhZiA9IG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVhZjtcbn07XG5cbnZhciBwYXJzZUtleXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nS2V5cyhnaXZlbktleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXMgdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICgoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucyk7XG59O1xuXG52YXIgbm9ybWFsaXplUGFyc2VPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmRlY29kZXIgIT09IG51bGwgJiYgb3B0cy5kZWNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZGVjb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdEZWNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB2YXIgY2hhcnNldCA9IHR5cGVvZiBvcHRzLmNoYXJzZXQgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuY2hhcnNldCA6IG9wdHMuY2hhcnNldDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGFsbG93UHJvdG90eXBlczogdHlwZW9mIG9wdHMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcyxcbiAgICAgICAgYXJyYXlMaW1pdDogdHlwZW9mIG9wdHMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0LFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGNvbW1hOiB0eXBlb2Ygb3B0cy5jb21tYSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jb21tYSA6IGRlZmF1bHRzLmNvbW1hLFxuICAgICAgICBkZWNvZGVyOiB0eXBlb2Ygb3B0cy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcixcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdHMuZGVsaW1pdGVyKSA/IG9wdHMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyLFxuICAgICAgICBkZXB0aDogdHlwZW9mIG9wdHMuZGVwdGggPT09ICdudW1iZXInID8gb3B0cy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoLFxuICAgICAgICBpZ25vcmVRdWVyeVByZWZpeDogb3B0cy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZSxcbiAgICAgICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiB0eXBlb2Ygb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgPT09ICdib29sZWFuJyA/IG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzIDogZGVmYXVsdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzLFxuICAgICAgICBwYXJhbWV0ZXJMaW1pdDogdHlwZW9mIG9wdHMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0cy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0LFxuICAgICAgICBwYXJzZUFycmF5czogb3B0cy5wYXJzZUFycmF5cyAhPT0gZmFsc2UsXG4gICAgICAgIHBsYWluT2JqZWN0czogdHlwZW9mIG9wdHMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRzLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cyxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucyk7XG4gICAgICAgIG9iaiA9IHV0aWxzLm1lcmdlKG9iaiwgbmV3T2JqLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBjb21tYTogJ2NvbW1hJyxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xudmFyIHB1c2hUb0FycmF5ID0gZnVuY3Rpb24gKGFyciwgdmFsdWVPckFycmF5KSB7XG4gICAgcHVzaC5hcHBseShhcnIsIGlzQXJyYXkodmFsdWVPckFycmF5KSA/IHZhbHVlT3JBcnJheSA6IFt2YWx1ZU9yQXJyYXldKTtcbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWRkUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgZm9ybWF0dGVyOiBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0c1snZGVmYXVsdCddXSxcbiAgICAvLyBkZXByZWNhdGVkXG4gICAgaW5kaWNlczogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgY2hhcnNldFxuKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSBvYmouam9pbignLCcpO1xuICAgIH1cblxuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCkgOiBwcmVmaXg7XG4gICAgICAgIH1cblxuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgaWYgKGVuY29kZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGVuY29kZVZhbHVlc09ubHkgPyBwcmVmaXggOiBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCk7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICB0eXBlb2YgZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2Z1bmN0aW9uJyA/IGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpIDogcHJlZml4LFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgICAgIGNoYXJzZXRcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxudmFyIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmVuY29kZXIgIT09IG51bGwgJiYgb3B0cy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBjaGFyc2V0ID0gb3B0cy5jaGFyc2V0IHx8IGRlZmF1bHRzLmNoYXJzZXQ7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFoYXMuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdCA9IG9wdHMuZm9ybWF0O1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cbiAgICB2YXIgZmlsdGVyID0gZGVmYXVsdHMuZmlsdGVyO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdmdW5jdGlvbicgfHwgaXNBcnJheShvcHRzLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUXVlcnlQcmVmaXg6IHR5cGVvZiBvcHRzLmFkZFF1ZXJ5UHJlZml4ID09PSAnYm9vbGVhbicgPyBvcHRzLmFkZFF1ZXJ5UHJlZml4IDogZGVmYXVsdHMuYWRkUXVlcnlQcmVmaXgsXG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0cy5kZWxpbWl0ZXIsXG4gICAgICAgIGVuY29kZTogdHlwZW9mIG9wdHMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZSxcbiAgICAgICAgZW5jb2RlcjogdHlwZW9mIG9wdHMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXIsXG4gICAgICAgIGVuY29kZVZhbHVlc09ubHk6IHR5cGVvZiBvcHRzLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICAgICAgc29ydDogdHlwZW9mIG9wdHMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc29ydCA6IG51bGwsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcblxuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoVG9BcnJheShrZXlzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2tpcE51bGxzLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGUgPyBvcHRpb25zLmVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgb3B0aW9ucy5maWx0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLnNvcnQsXG4gICAgICAgICAgICBvcHRpb25zLmFsbG93RG90cyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0dGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgb3B0aW9ucy5jaGFyc2V0XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JyksIHRoZSBcIm51bWVyaWMgZW50aXR5XCIgcmVwcmVzZW50YXRpb24gb2YgYSBjaGVja21hcmtcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lMjYlMjMxMDAwMyUzQiYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGhleFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIGFycmF5LnB1c2goJyUnICsgKChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KSkudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufSgpKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKChvcHRpb25zICYmIChvcHRpb25zLnBsYWluT2JqZWN0cyB8fCBvcHRpb25zLmFsbG93UHJvdG90eXBlcykpIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2VUYXJnZXQgPSB0YXJnZXQ7XG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIG1lcmdlVGFyZ2V0ID0gYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJdGVtID0gdGFyZ2V0W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJdGVtICYmIHR5cGVvZiB0YXJnZXRJdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBtZXJnZSh0YXJnZXRJdGVtLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKGFjYywga2V5KSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBtZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbnZhciBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ25TaW5nbGVTb3VyY2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGFjY1trZXldID0gc291cmNlW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGFyZ2V0KTtcbn07XG5cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiAoc3RyLCBkZWNvZGVyLCBjaGFyc2V0KSB7XG4gICAgdmFyIHN0cldpdGhvdXRQbHVzID0gc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgLy8gdW5lc2NhcGUgbmV2ZXIgdGhyb3dzLCBubyB0cnkuLi5jYXRjaCBuZWVkZWQ6XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cy5yZXBsYWNlKC8lWzAtOWEtZl17Mn0vZ2ksIHVuZXNjYXBlKTtcbiAgICB9XG4gICAgLy8gdXRmLThcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cldpdGhvdXRQbHVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cztcbiAgICB9XG59O1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHN0ciwgZGVmYXVsdEVuY29kZXIsIGNoYXJzZXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyIDogU3RyaW5nKHN0cik7XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgKGMgPj4gNildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgKGMgPj4gMTIpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpICs9IDE7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKCgoYyAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgJiAweDNGRikpO1xuICAgICAgICBvdXQgKz0gaGV4VGFibGVbMHhGMCB8IChjID4+IDE4KV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiAxMikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbnZhciBjb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCh2YWx1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFt7IG9iajogeyBvOiB2YWx1ZSB9LCBwcm9wOiAnbycgfV07XG4gICAgdmFyIHJlZnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZVtpXTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHsgb2JqOiBvYmosIHByb3A6IGtleSB9KTtcbiAgICAgICAgICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBhY3RRdWV1ZShxdWV1ZSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxudmFyIGlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG5cbnZhciBjb21iaW5lID0gZnVuY3Rpb24gY29tYmluZShhLCBiKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChhLCBiKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFycmF5VG9PYmplY3Q6IGFycmF5VG9PYmplY3QsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgY29tYmluZTogY29tYmluZSxcbiAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gICAgbWVyZ2U6IG1lcmdlXG59O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5jb25zdCBiYXNlNjQgPSByZXF1aXJlKFwiYmFzZS02NFwiKTtcbmNvbnN0IHFzID0gcmVxdWlyZShcInFzXCIpO1xuY29uc3QgQVYgPSByZXF1aXJlKFwiYXJndW1lbnQtdmFsaWRhdG9yXCIpO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgcGF5bG9hZCBmcm9tIGEgSldUXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHRva2VuIFRoZSBKV1QgdG8gcmV0cmlldmUgdGhlIHBheWxvYWQgZnJvbVxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICBUaGUgSldUIHBheWxvYWRcbiAqL1xuZnVuY3Rpb24gZ2V0UGF5bG9hZCh0b2tlbikge1xuICBjb25zdCBwYXlsb2FkQmFzZTY0ID0gdG9rZW5cbiAgICAuc3BsaXQoXCIuXCIpWzFdXG4gICAgLnJlcGxhY2UoXCItXCIsIFwiK1wiKVxuICAgIC5yZXBsYWNlKFwiX1wiLCBcIi9cIik7XG4gIGNvbnN0IHBheWxvYWREZWNvZGVkID0gYmFzZTY0LmRlY29kZShwYXlsb2FkQmFzZTY0KTtcbiAgY29uc3QgcGF5bG9hZE9iamVjdCA9IEpTT04ucGFyc2UocGF5bG9hZERlY29kZWQpO1xuXG4gIGlmIChBVi5pc051bWJlcihwYXlsb2FkT2JqZWN0LmV4cCkpIHtcbiAgICBwYXlsb2FkT2JqZWN0LmV4cCA9IG5ldyBEYXRlKHBheWxvYWRPYmplY3QuZXhwICogMTAwMCk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZE9iamVjdDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgU0RLIGluc3RhbmNlXG4gKiBAcGFyYW0gICAgICAge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0gICAgICAge3N0cmluZ30gW29wdGlvbnMudXJsXSAgIFRoZSBBUEkgdXJsIHRvIGNvbm5lY3QgdG9cbiAqIEBwYXJhbSAgICAgICB7c3RyaW5nfSBbb3B0aW9ucy5wcm9qZWN0XSAgIFRoZSBBUEkgcHJvamVjdCB0byBjb25uZWN0IHRvXG4gKiBAcGFyYW0gICAgICAge3N0cmluZ30gW29wdGlvbnMudG9rZW5dIFRoZSBhY2Nlc3MgdG9rZW4gdG8gdXNlIGZvciByZXF1ZXN0c1xuICogQHBhcmFtICAgICAgIHtudW1iZXJ9IFtvcHRpb25zLnRva2VuRXhwaXJ5VGltZV0gVGhlIHRpbWUgaXQgdGFrZXMgZm9yIHRoZSBBUEkgdG9rZW4gdG8gZXhwaXJlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU0RLKG9wdGlvbnMgPSB7fSkge1xuICBsZXQgdG9rZW47XG4gIGxldCB1cmw7XG4gIGxldCBwcm9qZWN0ID0gXCJfXCI7XG4gIGxldCBsb2NhbEV4cDtcbiAgbGV0IHRva2VuRXhwaXJ5VGltZSA9IDU7XG5cbiAgaWYgKG9wdGlvbnMuc3RvcmFnZSkge1xuICAgIGxldCBzdG9yZWRJbmZvID0gb3B0aW9ucy5zdG9yYWdlLmdldEl0ZW0oXCJkaXJlY3R1cy1zZGstanNcIik7XG5cbiAgICBpZiAoc3RvcmVkSW5mbykge1xuICAgICAgc3RvcmVkSW5mbyA9IEpTT04ucGFyc2Uoc3RvcmVkSW5mbyk7XG5cbiAgICAgIHRva2VuID0gc3RvcmVkSW5mby50b2tlbjtcbiAgICAgIHVybCA9IHN0b3JlZEluZm8udXJsO1xuICAgICAgcHJvamVjdCA9IHN0b3JlZEluZm8ucHJvamVjdDtcbiAgICAgIGxvY2FsRXhwID0gc3RvcmVkSW5mby5sb2NhbEV4cDtcbiAgICB9XG4gIH1cblxuICBpZiAob3B0aW9ucy50b2tlbikge1xuICAgIHRva2VuID0gb3B0aW9ucy50b2tlbjtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnVybCkge1xuICAgIHVybCA9IG9wdGlvbnMudXJsO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucHJvamVjdCkge1xuICAgIHByb2plY3QgPSBvcHRpb25zLnByb2plY3Q7XG4gIH1cblxuICBpZiAob3B0aW9ucy5sb2NhbEV4cCkge1xuICAgIGxvY2FsRXhwID0gb3B0aW9ucy5sb2NhbEV4cDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnRva2VuRXhwaXJ5VGltZSkge1xuICAgIHRva2VuRXhwaXJ5VGltZSA9IG9wdGlvbnMudG9rZW5FeHBpcnlUaW1lO1xuICB9XG5cbiAgY29uc3QgU0RLID0ge1xuICAgIHVybDogdXJsLFxuICAgIHRva2VuOiB0b2tlbixcbiAgICBwcm9qZWN0OiBwcm9qZWN0LFxuXG4gICAgLy8gVGhlIHRva2VuIHdpbGwgY29udGFpbiBhbiBleHBpcnkgdGltZSBiYXNlZCBvbiB0aGUgc2VydmVyIHRpbWVcbiAgICAvLyBJbiBvcmRlciB0byBtYWtlIHN1cmUgd2UgY2hlY2sgdGhlIHJpZ2h0IGV4cGlyeSBkYXRlLCB3ZSBuZWVkIHRvXG4gICAgLy8ga2VlcCBhIHZlcnNpb24gdGhhdCdzIGJhc2VkIG9uIHRoZSBicm93c2VyIHRpbWVcbiAgICBsb2NhbEV4cDogbG9jYWxFeHAsXG4gICAgYXhpb3M6IGF4aW9zLmNyZWF0ZSh7XG4gICAgICBwYXJhbXNTZXJpYWxpemVyOiBxcy5zdHJpbmdpZnksXG4gICAgICB0aW1lb3V0OiAxMCAqIDYwICogMTAwMCAvLyAxMCBtaW5cbiAgICB9KSxcbiAgICByZWZyZXNoSW50ZXJ2YWw6IG51bGwsXG4gICAgb25BdXRvUmVmcmVzaEVycm9yOiBudWxsLFxuICAgIG9uQXV0b1JlZnJlc2hTdWNjZXNzOiBudWxsLFxuXG4gICAgLy8gVGhlIHN0b3JhZ2UgbWV0aG9kIHRvIHVzZS4gSGFzIHRvIHN1cHBvcnQgZ2V0SXRlbSBhbmQgc2V0SXRlbSB0byBzdG9yZSBhbmRcbiAgICAvLyByZXRyaWV2ZSB0aGUgdG9rZW5cbiAgICBzdG9yYWdlOiBvcHRpb25zLnN0b3JhZ2UgfHwgbnVsbCxcblxuICAgIC8vIERlZmF1bHRzIHRvIDUgbWludXRlcy4gT25jZSB0aGUgQVBJIHN1cHBvcnRzIGEgY3VzdG9tLCB0aGlzIG9wdGlvbiBjYW4gYmUgdXNlZCB0byByZWZsZWN0IHRoYXRcbiAgICB0b2tlbkV4cGlyeVRpbWU6IHRva2VuRXhwaXJ5VGltZSxcblxuICAgIGdldCBwYXlsb2FkKCkge1xuICAgICAgaWYgKCFBVi5pc1N0cmluZyh0aGlzLnRva2VuKSkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4gZ2V0UGF5bG9hZCh0aGlzLnRva2VuKTtcbiAgICB9LFxuXG4gICAgZ2V0IGxvZ2dlZEluKCkge1xuICAgICAgaWYgKFxuICAgICAgICBBVi5pc1N0cmluZyh0aGlzLnRva2VuKSAmJlxuICAgICAgICBBVi5pc1N0cmluZyh0aGlzLnVybCkgJiZcbiAgICAgICAgQVYuaXNTdHJpbmcodGhpcy5wcm9qZWN0KSAmJlxuICAgICAgICBBVi5pc09iamVjdCh0aGlzLnBheWxvYWQpXG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxFeHAgPiBEYXRlLm5vdygpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLy8gUkVRVUVTVCBNRVRIT0RTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGlyZWN0dXMgQVBJIHJlcXVlc3QgcHJvbWlzZVxuICAgICAqIEBwcm9taXNlIFJlcXVlc3RQcm9taXNlXG4gICAgICogQGZ1bGZpbGwge29iamVjdH0gRGlyZWN0dXMgZGF0YVxuICAgICAqIEByZWplY3Qge0Vycm9yfSBOZXR3b3JrIGVycm9yIChpZiBubyBjb25uZWN0aW9uIHRvIEFQSSlcbiAgICAgKiBAcmVqZWN0IHtFcnJvcn0gRGlyZWN0dXMgZXJyb3IgKGVnIG5vdCBsb2dnZWQgaW4gb3IgNDA0KVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBBUEkgcmVxdWVzdCB0byB0aGUgRGlyZWN0dXMgQVBJXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBtZXRob2QgICAgICBUaGUgSFRUUCBtZXRob2QgdG8gdXNlXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgICBUaGUgQVBJIGVuZHBvaW50IHRvIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFRoZSBIVFRQIHF1ZXJ5IHBhcmFtZXRlcnMgKEdFVCBvbmx5KVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW2RhdGE9e31dICAgVGhlIEhUVFAgcmVxdWVzdCBib2R5IChub24tR0VUIG9ubHkpXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gbm9FbnYgICAgICBEb24ndCB1c2UgdGhlIHByb2plY3QgaW4gdGhlIHBhdGhcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBpZ25vcmVKc29uIERvbid0IHBhcnNlIHRoZSBBUEkgcmVzdWx0IGludG8gSlNPTlxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHJlcXVlc3QoXG4gICAgICBtZXRob2QsXG4gICAgICBlbmRwb2ludCxcbiAgICAgIHBhcmFtcyA9IHt9LFxuICAgICAgZGF0YSA9IHt9LFxuICAgICAgbm9FbnYgPSBmYWxzZSxcbiAgICAgIGhlYWRlcnMgPSB7fSxcbiAgICAgIGlnbm9yZUpzb24gPSBmYWxzZVxuICAgICkge1xuICAgICAgQVYuc3RyaW5nKG1ldGhvZCwgXCJtZXRob2RcIik7XG4gICAgICBBVi5zdHJpbmcoZW5kcG9pbnQsIFwiZW5kcG9pbnRcIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICBBcnJheS5pc0FycmF5KGRhdGEpXG4gICAgICAgID8gQVYuYXJyYXlPckVtcHR5KGRhdGEsIFwiZGF0YVwiKVxuICAgICAgICA6IEFWLm9iamVjdE9yRW1wdHkoZGF0YSwgXCJkYXRhXCIpO1xuXG4gICAgICBBVi5zdHJpbmcodGhpcy51cmwsIFwidGhpcy51cmxcIik7XG5cbiAgICAgIGxldCBiYXNlVVJMID0gYCR7dGhpcy51cmx9L2A7XG5cbiAgICAgIGlmIChub0VudiA9PT0gZmFsc2UpIHtcbiAgICAgICAgYmFzZVVSTCArPSBgJHt0aGlzLnByb2plY3R9L2A7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICB1cmw6IGVuZHBvaW50LFxuICAgICAgICBtZXRob2QsXG4gICAgICAgIGJhc2VVUkwsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgZGF0YVxuICAgICAgfTtcblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnRva2VuICYmXG4gICAgICAgIHR5cGVvZiB0aGlzLnRva2VuID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgIHRoaXMudG9rZW4ubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIHJlcXVlc3RPcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dGhpcy50b2tlbn1gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5heGlvc1xuICAgICAgICAucmVxdWVzdChyZXF1ZXN0T3B0aW9ucylcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHJldHVybiBkYXRhO1xuXG4gICAgICAgICAgaWYgKGlnbm9yZUpzb24pIHJldHVybiBkYXRhO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5qc29uID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgY29kZTogLTIsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQVBJIHJldHVybmVkIGludmFsaWQgSlNPTlwiLFxuICAgICAgICAgICAgICBlcnJvcjogZXJyb3IuZXJyb3IsXG4gICAgICAgICAgICAgIGRhdGE6IGVycm9yLmRhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogXCJOZXR3b3JrIEVycm9yXCIsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdFVCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgICBUaGUgZW5kcG9pbnQgdG8gZ2V0XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBUaGUgSFRUUCBxdWVyeSBwYXJhbWV0ZXJzIChHRVQgb25seSlcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXQoZW5kcG9pbnQsIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoZW5kcG9pbnQsIFwiZW5kcG9pbnRcIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG5cbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgZW5kcG9pbnQsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBPU1QgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtib2R5PXt9XSBUaGUgSFRUUCByZXF1ZXN0IGJvZHlcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwb3N0KGVuZHBvaW50LCBib2R5ID0ge30sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoZW5kcG9pbnQsIFwiZW5kcG9pbnRcIik7XG4gICAgICBBcnJheS5pc0FycmF5KGJvZHkpXG4gICAgICAgID8gQVYuYXJyYXlPckVtcHR5KGJvZHksIFwiYm9keVwiKVxuICAgICAgICA6IEFWLm9iamVjdE9yRW1wdHkoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwicG9zdFwiLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUEFUQ0ggY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtib2R5PXt9XSBUaGUgSFRUUCByZXF1ZXN0IGJvZHlcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwYXRjaChlbmRwb2ludCwgYm9keSA9IHt9LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xuICAgICAgQXJyYXkuaXNBcnJheShib2R5KVxuICAgICAgICA/IEFWLmFycmF5T3JFbXB0eShib2R5LCBcImJvZHlcIilcbiAgICAgICAgOiBBVi5vYmplY3RPckVtcHR5KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcInBhdGNoXCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQQVRDSCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBlbmRwb2ludCAgVGhlIGVuZHBvaW50IHRvIGdldFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW2JvZHk9e31dIFRoZSBIVFRQIHJlcXVlc3QgYm9keVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHB1dChlbmRwb2ludCwgYm9keSA9IHt9LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGVuZHBvaW50LCBcImVuZHBvaW50XCIpO1xuICAgICAgQXJyYXkuaXNBcnJheShib2R5KVxuICAgICAgICA/IEFWLmFycmF5T3JFbXB0eShib2R5LCBcImJvZHlcIilcbiAgICAgICAgOiBBVi5vYmplY3RPckVtcHR5KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcInB1dFwiLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUEFUQ0ggY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW5kcG9pbnQgIFRoZSBlbmRwb2ludCB0byBnZXRcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGUoZW5kcG9pbnQpIHtcbiAgICAgIEFWLnN0cmluZyhlbmRwb2ludCwgXCJlbmRwb2ludFwiKTtcblxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImRlbGV0ZVwiLCBlbmRwb2ludCk7XG4gICAgfSxcblxuICAgIC8vIEFVVEhFTlRJQ0FUSU9OXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogTG9nZ2luZyBpbiBwcm9taXNlXG4gICAgICogQHByb21pc2UgTG9naW5Qcm9taXNlXG4gICAgICogQGZ1bGZpbGwge09iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgVVJMLCBFTlYsIGFuZCBUT0tFTlxuICAgICAqIEByZWplY3Qge0Vycm9yfSAgIE5ldHdvcmsgZXJyb3IgKGlmIG5vIGNvbm5lY3Rpb24gdG8gQVBJKVxuICAgICAqIEByZWplY3Qge0Vycm9yfSAgIERpcmVjdHVzIGVycm9yIChlZyBub3QgbG9nZ2VkIGluIG9yIDQwNClcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIExvZ2luIHRvIHRoZSBBUEkuXG4gICAgICpcbiAgICAgKiBHZXRzIGEgbmV3IHRva2VuIGZyb20gdGhlIEFQSSBhbmQgc3RvcmVzIGl0IGluIHRoaXMudG9rZW5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNyZWRlbnRpYWxzXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjcmVkZW50aWFscy5lbWFpbCAgICAgVGhlIHVzZXIncyBlbWFpbCBhZGRyZXNzXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjcmVkZW50aWFscy5wYXNzd29yZCAgVGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NyZWRlbnRpYWxzLm90cF0gICAgIFRoZSB1c2VyJ3MgMkZBIE9UUFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gW2NyZWRlbnRpYWxzLnVybF0gICAgIFRoZSBBUEkgdG8gbG9naW4gdG8gKG92ZXJ3cml0ZXMgdGhpcy51cmwpXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBbY3JlZGVudGlhbHMucHJvamVjdF0gVGhlIEFQSSBwcm9qZWN0IHRvIGxvZ2luIHRvIChvdmVyd3JpdGVzIHRoaXMucHJvamVjdClcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtvcHRpb25zLnBlcnNpc3RdICAgICBBdXRvLWZldGNoIGEgbmV3IHRva2VuIHdoZW4gaXQncyBhYm91dCB0byBleHBpcmVcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0aW9ucy5zdG9yYWdlXSAgICBXaGVyZSB0byBzdG9yZSB0aGUgdG9rZW4gKHN1cnZpdmUgcmVmcmVzaGVzKVxuICAgICAqIEByZXR1cm4ge0xvZ2luUHJvbWlzZX1cbiAgICAgKi9cbiAgICBsb2dpbihjcmVkZW50aWFscywgb3B0aW9ucyA9IHsgcGVyc2lzdDogdHJ1ZSB9KSB7XG4gICAgICBBVi5vYmplY3QoY3JlZGVudGlhbHMsIFwiY3JlZGVudGlhbHNcIik7XG4gICAgICBBVi5rZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgW1wiZW1haWxcIiwgXCJwYXNzd29yZFwiXSwgXCJjcmVkZW50aWFsc1wiKTtcblxuICAgICAgdGhpcy50b2tlbiA9IG51bGw7XG5cbiAgICAgIGlmIChBVi5oYXNLZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgW1widXJsXCJdKSkge1xuICAgICAgICB0aGlzLnVybCA9IGNyZWRlbnRpYWxzLnVybDtcbiAgICAgIH1cblxuICAgICAgaWYgKEFWLmhhc0tleXNXaXRoU3RyaW5nKGNyZWRlbnRpYWxzLCBbXCJwcm9qZWN0XCJdKSkge1xuICAgICAgICB0aGlzLnByb2plY3QgPSBjcmVkZW50aWFscy5wcm9qZWN0O1xuICAgICAgfVxuXG4gICAgICBpZiAoY3JlZGVudGlhbHMucGVyc2lzdCB8fCBvcHRpb25zLnBlcnNpc3QpIHtcbiAgICAgICAgdGhpcy5zdGFydEludGVydmFsKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMucG9zdChcIi9hdXRoL2F1dGhlbnRpY2F0ZVwiLCB7XG4gICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICBvdHA6IGNyZWRlbnRpYWxzLm90cFxuICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS50b2tlbilcbiAgICAgICAgICAudGhlbih0b2tlbiA9PiB7XG4gICAgICAgICAgICB0aGlzLnRva2VuID0gdG9rZW47XG5cbiAgICAgICAgICAgIC8vIEV4cGlyeSBkYXRlIGlzIHRoZSBtb21lbnQgd2UgZ290IHRoZSB0b2tlbiArIDUgbWludXRlc1xuICAgICAgICAgICAgdGhpcy5sb2NhbEV4cCA9IG5ldyBEYXRlKERhdGUubm93KCkgKyB0aGlzLnRva2VuRXhwaXJ5VGltZSAqIDYwMDAwKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICAgXCJkaXJlY3R1cy1zZGstanNcIixcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgICBwcm9qZWN0OiB0aGlzLnByb2plY3QsXG4gICAgICAgICAgICAgICAgICBsb2NhbEV4cDogdGhpcy5sb2NhbEV4cFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICBwcm9qZWN0OiB0aGlzLnByb2plY3QsXG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBsb2NhbEV4cDogdGhpcy5sb2NhbEV4cFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSB1c2VyIG91dCBieSBcImZvcmdldHRpbmdcIiB0aGUgdG9rZW4sIGFuZCBjbGVhcmluZyB0aGUgcmVmcmVzaCBpbnRlcnZhbFxuICAgICAqL1xuICAgIGxvZ291dCgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5yZWZyZXNoSW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc3RvcmFnZSkge1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShcImRpcmVjdHVzLXNkay1qc1wiKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBjbGllbnQgaW5zdGFuY2UgYnkgbG9nZ2luZyBvdXQgYW5kIHJlbW92aW5nIHRoZSBVUkwgYW5kIHByb2plY3RcbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgIHRoaXMubG9nb3V0KCk7XG4gICAgICB0aGlzLnVybCA9IG51bGw7XG4gICAgICB0aGlzLnByb2plY3QgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgYW4gaW50ZXJ2YWwgb2YgMTAgc2Vjb25kcyB0aGF0IHdpbGwgY2hlY2sgaWYgdGhlIHRva2VuIG5lZWRzIHJlZnJlc2hpbmdcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpcmVJbW1lZGlhdGVseSBGaXJlIHRoZSByZWZyZXNoSWZOZWVkZWQgbWV0aG9kIGRpcmVjdGx5XG4gICAgICovXG4gICAgc3RhcnRJbnRlcnZhbChmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgIGlmIChmaXJlSW1tZWRpYXRlbHkpIHRoaXMucmVmcmVzaElmTmVlZGVkKCk7XG4gICAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IHNldEludGVydmFsKFxuICAgICAgICB0aGlzLnJlZnJlc2hJZk5lZWRlZC5iaW5kKHRoaXMpLFxuICAgICAgICAxMDAwMFxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGFuZCBudWxsaWZpZXMgdGhlIHRva2VuIHJlZnJlc2hpbmcgaW50ZXJ2YWxcbiAgICAgKi9cbiAgICBzdG9wSW50ZXJ2YWwoKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMucmVmcmVzaEludGVydmFsKTtcbiAgICAgIHRoaXMucmVmcmVzaEludGVydmFsID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVmcmVzaCB0aGUgdG9rZW4gaWYgaXQgaXMgYWJvdXQgdG8gZXhwaXJlICh3aXRoaW4gMzAgc2Vjb25kcyBvZiBleHBpcnkgZGF0ZSlcbiAgICAgKlxuICAgICAqIENhbGxzIG9uQXV0b1JlZnJlc2hTdWNjZXNzIHdpdGggdGhlIG5ldyB0b2tlbiBpZiB0aGUgcmVmcmVzaGluZyBpcyBzdWNjZXNzZnVsXG4gICAgICogQ2FsbHMgb25BdXRvUmVmcmVzaEVycm9yIGlmIHJlZnJlc2hpbmcgdGhlIHRva2VuIGZhaWxzIGZvciBzb21lIHJlYXNvblxuICAgICAqL1xuICAgIHJlZnJlc2hJZk5lZWRlZCgpIHtcbiAgICAgIGlmICghQVYuaGFzU3RyaW5nS2V5cyh0aGlzLCBbXCJ0b2tlblwiLCBcInVybFwiLCBcInByb2plY3RcIl0pKSByZXR1cm47XG4gICAgICBpZiAoIXRoaXMucGF5bG9hZCB8fCAhdGhpcy5wYXlsb2FkLmV4cCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCB0aW1lRGlmZiA9IHRoaXMubG9jYWxFeHAgLSBEYXRlLm5vdygpO1xuXG4gICAgICBpZiAodGltZURpZmYgPD0gMCkge1xuICAgICAgICBpZiAoQVYuaXNGdW5jdGlvbih0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcikpIHtcbiAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcih7XG4gICAgICAgICAgICBtZXNzYWdlOiBcImF1dGhfZXhwaXJlZF90b2tlblwiLFxuICAgICAgICAgICAgY29kZTogMTAyXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGltZURpZmYgPCAzMDAwMCkge1xuICAgICAgICB0aGlzLnJlZnJlc2godGhpcy50b2tlbilcbiAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHJlcy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgdGhpcy5sb2NhbEV4cCA9IG5ldyBEYXRlKERhdGUubm93KCkgKyB0aGlzLnRva2VuRXhwaXJ5VGltZSAqIDYwMDAwKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgIGlmIChBVi5pc0Z1bmN0aW9uKHRoaXMub25BdXRvUmVmcmVzaFN1Y2Nlc3MpKSB7XG4gICAgICAgICAgICAgIHRoaXMub25BdXRvUmVmcmVzaFN1Y2Nlc3Moe1xuICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgcHJvamVjdDogdGhpcy5wcm9qZWN0LFxuICAgICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICAgIGxvY2FsRXhwOiB0aGlzLmxvY2FsRXhwXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9yYWdlKSB7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgICAgIFwiZGlyZWN0dXMtc2RrLWpzXCIsXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICAgICAgcHJvamVjdDogdGhpcy5wcm9qZWN0LFxuICAgICAgICAgICAgICAgICAgbG9jYWxFeHA6IHRoaXMubG9jYWxFeHBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGlmIChBVi5pc0Z1bmN0aW9uKHRoaXMub25BdXRvUmVmcmVzaEVycm9yKSkge1xuICAgICAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVzZSB0aGUgcGFzc2VkIHRva2VuIHRvIHJlcXVlc3QgYSBuZXcgb25lXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB0b2tlbiBBY3RpdmUgJiBWYWxpZCB0b2tlblxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHJlZnJlc2godG9rZW4pIHtcbiAgICAgIEFWLnN0cmluZyh0b2tlbiwgXCJ0b2tlblwiKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvYXV0aC9yZWZyZXNoXCIsIHsgdG9rZW4gfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgdG8gcmVzZXQgdGhlIHBhc3N3b3JkIG9mIHRoZSB1c2VyIHdpdGggdGhlIGdpdmVuIGVtYWlsIGFkZHJlc3NcbiAgICAgKlxuICAgICAqIFRoZSBBUEkgd2lsbCBzZW5kIGFuIGVtYWlsIHRvIHRoZSBnaXZlbiBlbWFpbCBhZGRyZXNzIHdpdGggYSBsaW5rIHRvIGdlbmVyYXRlIGEgbmV3XG4gICAgICogdGVtcG9yYXJ5IHBhc3N3b3JkLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbWFpbCBUaGUgdXNlcidzIGVtYWlsXG4gICAgICovXG4gICAgcmVxdWVzdFBhc3N3b3JkUmVzZXQoZW1haWwpIHtcbiAgICAgIEFWLnN0cmluZyhlbWFpbCwgXCJlbWFpbFwiKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvYXV0aC9wYXNzd29yZC9yZXF1ZXN0XCIsIHtcbiAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gQUNUSVZJVFlcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWN0aXZpdHlcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRBY3Rpdml0eShwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL2FjdGl2aXR5XCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8vIEJPT0tNQVJLU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYm9va21hcmtzIG9mIHRoZSBjdXJyZW50IHVzZXJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRNeUJvb2ttYXJrcyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKHRoaXMudG9rZW4sIFwidGhpcy50b2tlblwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zKTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW25udWxsXVwiOiAxLFxuICAgICAgICAgIFwiZmlsdGVyW3VzZXJdW2VxXVwiOiB0aGlzLnBheWxvYWQuaWRcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW25udWxsXVwiOiAxLFxuICAgICAgICAgIFwiZmlsdGVyW3JvbGVdW2VxXVwiOiB0aGlzLnBheWxvYWQucm9sZSxcbiAgICAgICAgICBcImZpbHRlclt1c2VyXVtudWxsXVwiOiAxXG4gICAgICAgIH0pXG4gICAgICBdKS50aGVuKHZhbHVlcyA9PiB7XG4gICAgICAgIGNvbnN0IFt1c2VyLCByb2xlXSA9IHZhbHVlczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zaGFkb3dcbiAgICAgICAgcmV0dXJuIFsuLi51c2VyLmRhdGEsIC4uLnJvbGUuZGF0YV07XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gQ09MTEVDVElPTlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBjb2xsZWN0aW9uc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldENvbGxlY3Rpb25zKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvY29sbGVjdGlvbnNcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGNvbGxlY3Rpb24gaW5mbyBieSBuYW1lXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBDb2xsZWN0aW9uIG5hbWVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWAsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBDb2xsZWN0aW9uIGluZm9ybWF0aW9uXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgY3JlYXRlQ29sbGVjdGlvbihkYXRhKSB7XG4gICAgICBBVi5vYmplY3QoZGF0YSwgXCJkYXRhXCIpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi9jb2xsZWN0aW9uc1wiLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBUaGUgY29sbGVjdGlvbiB0byB1cGRhdGVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBmaWVsZHMgdG8gdXBkYXRlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgdXBkYXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uLCBkYXRhKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYub2JqZWN0KGRhdGEsIFwiZGF0YVwiKTtcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWAsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIHByaW1hcnkga2V5IG9mIHRoZSBjb2xsZWN0aW9uIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGRlbGV0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbikge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgL2NvbGxlY3Rpb25zLyR7Y29sbGVjdGlvbn1gKTtcbiAgICB9LFxuXG4gICAgLy8gQ09MTEVDVElPTiBQUkVTRVRTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGNvbGxlY3Rpb24gcHJlc2V0IChib29rbWFyayAvIGxpc3RpbmcgcHJlZmVyZW5jZXMpXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFRoZSBib29rbWFyayBpbmZvXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgY3JlYXRlQ29sbGVjdGlvblByZXNldChkYXRhKSB7XG4gICAgICBBVi5vYmplY3QoZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGNvbGxlY3Rpb24gcHJlc2V0IChib29rbWFyayAvIGxpc3RpbmcgcHJlZmVyZW5jZSlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXlcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RQcm9taXNlfSBkYXRhXG4gICAgICovXG4gICAgdXBkYXRlQ29sbGVjdGlvblByZXNldChwcmltYXJ5S2V5LCBkYXRhKSB7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdChkYXRhLCBcImRhdGFcIik7XG5cbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGNvbGxlY3Rpb24gcHJlc2V0IGJ5IHByaW1hcnlrZXlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgVGhlIHByaW1hcnlLZXkgb2YgdGhlIHByZXNldCB0byBkZWxldGVcbiAgICAgKi9cbiAgICBkZWxldGVDb2xsZWN0aW9uUHJlc2V0KHByaW1hcnlLZXkpIHtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gKTtcbiAgICB9LFxuXG4gICAgLy8gREFUQUJBU0VcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCB1cGRhdGUgdGhlIGRhdGFiYXNlIG9mIHRoZSBBUEkgaW5zdGFuY2UgdG8gdGhlIGxhdGVzdCB2ZXJzaW9uXG4gICAgICogdXNpbmcgdGhlIG1pZ3JhdGlvbnMgaW4gdGhlIEFQSVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZURhdGFiYXNlKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChcIi91cGRhdGVcIik7XG4gICAgfSxcblxuICAgIC8vIEVYVEVOU0lPTlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1ldGEgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBpbnRlcmZhY2VzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0SW50ZXJmYWNlcygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgXCIvaW50ZXJmYWNlc1wiLCB7fSwge30sIHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1ldGEgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBsYXlvdXRzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0TGF5b3V0cygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgXCIvbGF5b3V0c1wiLCB7fSwge30sIHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1ldGEgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBwYWdlc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFBhZ2VzKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcImdldFwiLCBcIi9wYWdlc1wiLCB7fSwge30sIHRydWUpO1xuICAgIH0sXG5cbiAgICAvLyBGSUVMRFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZmllbGRzIHRoYXQgYXJlIGluIERpcmVjdHVzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0QWxsRmllbGRzKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvZmllbGRzXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmllbGRzIHRoYXQgaGF2ZSBiZWVuIHNldHVwIGZvciBhIGdpdmVuIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gbmFtZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEZpZWxkcyhjb2xsZWN0aW9uLCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaWVsZCBpbmZvcm1hdGlvbiBmb3IgYSBzaW5nbGUgZ2l2ZW4gZmllbGRcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIENvbGxlY3Rpb24gbmFtZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZmllbGROYW1lICAgRmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEZpZWxkKGNvbGxlY3Rpb24sIGZpZWxkTmFtZSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5zdHJpbmcoZmllbGROYW1lLCBcImZpZWxkTmFtZVwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWAsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGZpZWxkIGluIHRoZSBnaXZlbiBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIENvbGxlY3Rpb24gdG8gYWRkIHRoZSBmaWVsZCBpblxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZmllbGRJbmZvICBUaGUgZmllbGRzIGluZm8gdG8gc2F2ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZUZpZWxkKGNvbGxlY3Rpb24sIGZpZWxkSW5mbykge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLm9iamVjdChmaWVsZEluZm8sIFwiZmllbGRJbmZvXCIpO1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgZmllbGRJbmZvKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGEgZ2l2ZW4gZmllbGQgaW4gYSBnaXZlbiBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIEZpZWxkJ3MgcGFyZW50IGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGZpZWxkTmFtZSAgTmFtZSBvZiB0aGUgZmllbGQgdG8gdXBkYXRlXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBmaWVsZEluZm8gIEZpZWxkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVGaWVsZChjb2xsZWN0aW9uLCBmaWVsZE5hbWUsIGZpZWxkSW5mbykge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLnN0cmluZyhmaWVsZE5hbWUsIFwiZmllbGROYW1lXCIpO1xuICAgICAgQVYub2JqZWN0KGZpZWxkSW5mbywgXCJmaWVsZEluZm9cIik7XG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWAsIGZpZWxkSW5mbyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBtdWx0aXBsZSBmaWVsZHMgYXQgb25jZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgICAgICAgICAgICBGaWVsZHMnIHBhcmVudCBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGZpZWxkc0luZm9PckZpZWxkTmFtZXMgIEFycmF5IG9mIGZpZWxkIG9iamVjdHMgb3IgYXJyYXkgb2YgZmllbGQgbmFtZXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtmaWVsZEluZm9dICAgICAgICAgICAgSW4gY2FzZSBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzIGlzIGFuIGFycmF5IG9mIGZpZWxkTmFtZXMsIHlvdSBuZWVkIHRvIHByb3ZpZGUgdGhlIGZpZWxkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAvLyBTZXQgbXVsdGlwbGUgZmllbGRzIHRvIHRoZSBzYW1lIHZhbHVlXG4gICAgICogdXBkYXRlRmllbGRzKFwicHJvamVjdHNcIiwgW1wiZmlyc3RfbmFtZVwiLCBcImxhc3RfbmFtZVwiLCBcImVtYWlsXCJdLCB7XG4gICAgICogICBkZWZhdWx0X3ZhbHVlOiBcIlwiXG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIC8vIFNldCBtdWx0aXBsZSBmaWVsZHMgdG8gZGlmZmVyZW50IHZhbHVlc1xuICAgICAqIHVwZGF0ZUZpZWxkcyhcInByb2plY3RzXCIsIFtcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgaWQ6IDE0LFxuICAgICAqICAgICBzb3J0OiAxXG4gICAgICogICB9LFxuICAgICAqICAge1xuICAgICAqICAgICBpZDogMTcsXG4gICAgICogICAgIHNvcnQ6IDJcbiAgICAgKiAgIH0sXG4gICAgICogICB7XG4gICAgICogICAgIGlkOiA5MTIsXG4gICAgICogICAgIHNvcnQ6IDNcbiAgICAgKiAgIH1cbiAgICAgKiBdKVxuICAgICAqL1xuICAgIHVwZGF0ZUZpZWxkcyhjb2xsZWN0aW9uLCBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLCBmaWVsZEluZm8gPSBudWxsKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuYXJyYXkoZmllbGRzSW5mb09yRmllbGROYW1lcywgXCJmaWVsZHNJbmZvT3JGaWVsZE5hbWVzXCIpO1xuXG4gICAgICBpZiAoZmllbGRJbmZvKSB7XG4gICAgICAgIEFWLm9iamVjdChmaWVsZEluZm8pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmllbGRJbmZvKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGNoKFxuICAgICAgICAgIGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLmpvaW4oXCIsXCIpfWAsXG4gICAgICAgICAgZmllbGRJbmZvXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgZmllbGQgZnJvbSBhIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gTmFtZSBvZiB0aGUgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZmllbGROYW1lICBUaGUgbmFtZSBvZiB0aGUgZmllbGQgdG8gZGVsZXRlXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZGVsZXRlRmllbGQoY29sbGVjdGlvbiwgZmllbGROYW1lKSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuc3RyaW5nKGZpZWxkTmFtZSwgXCJmaWVsZE5hbWVcIik7XG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkTmFtZX1gKTtcbiAgICB9LFxuXG4gICAgLy8gRklMRVNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIGxpc3Qgb2YgYXZhaWxhYmxlIGZpbGVzIGluIERpcmVjdHVzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0RmlsZXMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi9maWxlc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGxvYWQgbXVsdGlwYXJ0IGZpbGVzIGluIG11bHRpcGFydC9mb3JtLWRhdGFcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgRm9ybURhdGEgb2JqZWN0IGNvbnRhaW5pbmcgZmlsZXNcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gW29uVXBsb2FkUHJvZ3Jlc3M9KCk9Pnt9XSBQcm9ncmVzcyBjYWxsYmFja1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW292ZXJyaWRlSGVhZGVycz17fV0gT3ZlcnJpZGUgaGVhZGVycywgZm9yIGV4YW1wbGUgd2hlbiB1c2luZyBgZm9ybS1kYXRhYFxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwbG9hZEZpbGVzKGRhdGEsIG9uVXBsb2FkUHJvZ3Jlc3MgPSAoKSA9PiB7IH0sIG92ZXJyaWRlSGVhZGVycyA9IHt9KSB7XG4gICAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YCxcbiAgICAgIH07XG5cbiAgICAgIGlmIChvdmVycmlkZUhlYWRlcnMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMob3ZlcnJpZGVIZWFkZXJzKS5mb3JFYWNoKGhlYWRlcktleSA9PiB7XG4gICAgICAgICAgaGVhZGVyc1toZWFkZXJLZXldID0gb3ZlcnJpZGVIZWFkZXJzW2hlYWRlcktleV07XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5heGlvc1xuICAgICAgICAucG9zdChgJHt0aGlzLnVybH0vJHt0aGlzLnByb2plY3R9L2ZpbGVzYCwgZGF0YSwge1xuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgb25VcGxvYWRQcm9ncmVzc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmV0d29yayBFcnJvclwiLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBJVEVNU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbiBleGlzdGluZyBpdGVtXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgICAgICAgVGhlIGl0ZW0ncyBmaWVsZCB2YWx1ZXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHBhcmFtcyAgICAgUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZUl0ZW0oY29sbGVjdGlvbiwgcHJpbWFyeUtleSwgYm9keSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdChib2R5LCBcImJvZHlcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2goXG4gICAgICAgICAgYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9YCxcbiAgICAgICAgICBib2R5LFxuICAgICAgICAgIHBhcmFtc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5fWAsIGJvZHksIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBtdWx0aXBsZSBpdGVtc1xuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gYm9keSAgICAgICAgVGhlIGl0ZW0ncyBmaWVsZCB2YWx1ZXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHBhcmFtcyAgICAgUXVlcnkgUGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZUl0ZW1zKGNvbGxlY3Rpb24sIGJvZHksIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYuYXJyYXkoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX1gLCBib2R5LCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgL2l0ZW1zLyR7Y29sbGVjdGlvbn1gLCBib2R5LCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgaXRlbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBhZGQgdGhlIGl0ZW0gdG9cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgICAgICAgVGhlIGl0ZW0ncyBmaWVsZCB2YWx1ZXNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtKGNvbGxlY3Rpb24sIGJvZHkpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3QoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfWAsIGJvZHkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wb3N0KGAvaXRlbXMvJHtjb2xsZWN0aW9ufWAsIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbXVsdGlwbGUgaXRlbXNcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gYWRkIHRoZSBpdGVtIHRvXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGJvZHkgICAgICAgIFRoZSBpdGVtJ3MgZmllbGQgdmFsdWVzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgY3JlYXRlSXRlbXMoY29sbGVjdGlvbiwgYm9keSkge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLmFycmF5KGJvZHksIFwiYm9keVwiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX1gLCBib2R5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucG9zdChgL2l0ZW1zLyR7Y29sbGVjdGlvbn1gLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGl0ZW1zIGZyb20gYSBnaXZlbiBjb2xsZWN0aW9uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gICBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0SXRlbXMoY29sbGVjdGlvbiwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX1gLCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC9pdGVtcy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgc2luZ2xlIGl0ZW0gYnkgcHJpbWFyeSBrZXlcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGFkZCB0aGUgaXRlbSB0b1xuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRJdGVtKGNvbGxlY3Rpb24sIHByaW1hcnlLZXksIHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgXCJjb2xsZWN0aW9uXCIpO1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldChgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHNpbmdsZSBpdGVtIGJ5IHByaW1hcnkga2V5XG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBUaGUgY29sbGVjdGlvbiB0byBkZWxldGUgdGhlIGl0ZW0gZnJvbVxuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGVJdGVtKGNvbGxlY3Rpb24sIHByaW1hcnlLZXkpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9YCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5fWApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgbXVsdGlwbGUgaXRlbXMgYnkgcHJpbWFyeSBrZXlcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gIFRoZSBjb2xsZWN0aW9uIHRvIGRlbGV0ZSB0aGUgaXRlbSBmcm9tXG4gICAgICogQHBhcmFtICB7QXJyYXl9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkZWxldGVJdGVtcyhjb2xsZWN0aW9uLCBwcmltYXJ5S2V5cykge1xuICAgICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sIFwiY29sbGVjdGlvblwiKTtcbiAgICAgIEFWLmFycmF5KHByaW1hcnlLZXlzLCBcInByaW1hcnlLZXlzXCIpO1xuXG4gICAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKFwiZGlyZWN0dXNfXCIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleXMuam9pbigpfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5kZWxldGUoYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleXMuam9pbigpfWApO1xuICAgIH0sXG5cbiAgICAvLyBMSVNUSU5HIFBSRUZFUkVOQ0VTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjb2xsZWN0aW9uIHByZXNldHMgb2YgdGhlIGN1cnJlbnQgdXNlciBmb3IgYSBzaW5nbGUgY29sbGVjdGlvblxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgQ29sbGVjdGlvbiB0byBmZXRjaCB0aGUgcHJlZmVyZW5jZXMgZm9yXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0TXlMaXN0aW5nUHJlZmVyZW5jZXMoY29sbGVjdGlvbiwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyh0aGlzLnRva2VuLCBcInRoaXMudG9rZW5cIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxuICAgICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgICAgIFwiZmlsdGVyW3JvbGVdW251bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbdXNlcl1bbnVsbF1cIjogMSxcbiAgICAgICAgICBzb3J0OiBcIi1pZFwiXG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxuICAgICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgICAgIFwiZmlsdGVyW3JvbGVdW2VxXVwiOiB0aGlzLnBheWxvYWQucm9sZSxcbiAgICAgICAgICBcImZpbHRlclt1c2VyXVtudWxsXVwiOiAxLFxuICAgICAgICAgIHNvcnQ6IFwiLWlkXCJcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuZ2V0KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW251bGxdXCI6IDEsXG4gICAgICAgICAgXCJmaWx0ZXJbY29sbGVjdGlvbl1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHRoaXMucGF5bG9hZC5yb2xlLFxuICAgICAgICAgIFwiZmlsdGVyW3VzZXJdW2VxXVwiOiB0aGlzLnBheWxvYWQuaWQsXG4gICAgICAgICAgc29ydDogXCItaWRcIlxuICAgICAgICB9KVxuICAgICAgXSkudGhlbih2YWx1ZXMgPT4ge1xuICAgICAgICBjb25zdCBbY29sbGVjdGlvbiwgcm9sZSwgdXNlcl0gPSB2YWx1ZXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2hhZG93XG4gICAgICAgIGlmICh1c2VyLmRhdGEgJiYgdXNlci5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gdXNlci5kYXRhWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb2xlLmRhdGEgJiYgcm9sZS5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gcm9sZS5kYXRhWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEgJiYgY29sbGVjdGlvbi5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5kYXRhWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBQRVJNSVNTSU9OU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBwZXJtaXNzaW9uc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFBlcm1pc3Npb25zKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXRJdGVtcyhcImRpcmVjdHVzX3Blcm1pc3Npb25zXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyJ3MgcGVybWlzc2lvbnNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHBhcmFtcyBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0TXlQZXJtaXNzaW9ucyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3Blcm1pc3Npb25zL21lXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBtdWx0aXBsZSBuZXcgcGVybWlzc2lvbnNcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gZGF0YSAgUGVybWlzc2lvbiByZWNvcmRzIHRvIHNhdmVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVQZXJtaXNzaW9ucyhkYXRhKSB7XG4gICAgICBBVi5hcnJheShkYXRhKTtcbiAgICAgIHJldHVybiB0aGlzLnBvc3QoXCIvcGVybWlzc2lvbnNcIiwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBtdWx0aXBsZSBwZXJtaXNzaW9uIHJlY29yZHNcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gZGF0YSAgUGVybWlzc2lvbiByZWNvcmRzIHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZVBlcm1pc3Npb25zKGRhdGEpIHtcbiAgICAgIEFWLmFycmF5KGRhdGEpO1xuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goXCIvcGVybWlzc2lvbnNcIiwgZGF0YSk7XG4gICAgfSxcblxuICAgIC8vIFJFTEFUSU9OU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgcmVsYXRpb25zaGlwc1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFJlbGF0aW9ucyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3JlbGF0aW9uc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICBjcmVhdGVSZWxhdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5wb3N0KFwiL3JlbGF0aW9uc1wiLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUmVsYXRpb24ocHJpbWFyeUtleSwgZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC9yZWxhdGlvbnMvJHtwcmltYXJ5S2V5fWAsIGRhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJlbGF0aW9uc2hpcCBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuIGNvbGxlY3Rpb25cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gbmFtZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldENvbGxlY3Rpb25SZWxhdGlvbnMoY29sbGVjdGlvbiwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcyk7XG5cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMuZ2V0KFwiL3JlbGF0aW9uc1wiLCB7IFwiZmlsdGVyW2NvbGxlY3Rpb25fYV1bZXFdXCI6IGNvbGxlY3Rpb24gfSksXG4gICAgICAgIHRoaXMuZ2V0KFwiL3JlbGF0aW9uc1wiLCB7IFwiZmlsdGVyW2NvbGxlY3Rpb25fYl1bZXFdXCI6IGNvbGxlY3Rpb24gfSlcbiAgICAgIF0pO1xuICAgIH0sXG5cbiAgICAvLyBSRVZJU0lPTlNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzaW5nbGUgaXRlbSdzIHJldmlzaW9ucyBieSBwcmltYXJ5IGtleVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gY29sbGVjdGlvbiAgVGhlIGNvbGxlY3Rpb24gdG8gZmV0Y2ggdGhlIHJldmlzaW9ucyBmcm9tXG4gICAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gcHJpbWFyeUtleSBQcmltYXJ5IGtleSBvZiB0aGUgaXRlbVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldEl0ZW1SZXZpc2lvbnMoY29sbGVjdGlvbiwgcHJpbWFyeUtleSwgcGFyYW1zID0ge30pIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChcImRpcmVjdHVzX1wiKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoXG4gICAgICAgICAgYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9L3JldmlzaW9uc2AsXG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldChgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5fS9yZXZpc2lvbnNgLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXZlcnQgYW4gaXRlbSB0byBhIHByZXZpb3VzIHN0YXRlXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2xsZWN0aW9uICBUaGUgY29sbGVjdGlvbiB0byBmZXRjaCB0aGUgcmV2aXNpb25zIGZyb21cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBwcmltYXJ5S2V5IFByaW1hcnkga2V5IG9mIHRoZSBpdGVtXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSByZXZpc2lvbklEIFRoZSBJRCBvZiB0aGUgcmV2aXNpb24gdG8gcmV2ZXJ0IHRvXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgcmV2ZXJ0KGNvbGxlY3Rpb24sIHByaW1hcnlLZXksIHJldmlzaW9uSUQpIHtcbiAgICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCBcImNvbGxlY3Rpb25cIik7XG4gICAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm51bWJlcihyZXZpc2lvbklELCBcInJldmlzaW9uSURcIik7XG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoXCJkaXJlY3R1c19cIikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2goXG4gICAgICAgICAgYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9L3JldmVydC8ke3JldmlzaW9uSUR9YFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChcbiAgICAgICAgYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX0vcmV2ZXJ0LyR7cmV2aXNpb25JRH1gXG4gICAgICApO1xuICAgIH0sXG5cbiAgICAvLyBST0xFU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSB1c2VyIHJvbGVcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHByaW1hcnlLZXkgIFRoZSBpZCBvZiB0aGUgdXNlciByb2wgdG8gZ2V0XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0Um9sZShwcmltYXJ5S2V5LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYubnVtYmVyKHByaW1hcnlLZXksIFwicHJpbWFyeUtleVwiKTtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChgL3JvbGVzLyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHVzZXIgcm9sZXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRSb2xlcyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3JvbGVzXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhIHVzZXIgcm9sZVxuICAgICAqIEBwYXJhbSAge051bWJlcn0gcHJpbWFyeUtleSBUaGUgSUQgb2YgdGhlIHJvbGVcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGJvZHkgICAgICAgVGhlIGZpZWxkcyB0byB1cGRhdGVcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICB1cGRhdGVSb2xlKHByaW1hcnlLZXksIGJvZHkpIHtcbiAgICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgXCJwcmltYXJ5S2V5XCIpO1xuICAgICAgQVYub2JqZWN0KGJvZHksIFwiYm9keVwiKTtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW0oXCJkaXJlY3R1c19yb2xlc1wiLCBwcmltYXJ5S2V5LCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHVzZXIgcm9sZVxuICAgICAqIEBwYXJhbSAge09iamVjdH0gYm9keSBUaGUgcm9sZSBpbmZvcm1hdGlvblxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGNyZWF0ZVJvbGUoYm9keSkge1xuICAgICAgQVYub2JqZWN0KGJvZHksIFwiYm9keVwiKTtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZW0oXCJkaXJlY3R1c19yb2xlc1wiLCBib2R5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgdXNlciByb2wgYnkgcHJpbWFyeSBrZXlcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXIgfCBTdHJpbmd9IHByaW1hcnlLZXkgUHJpbWFyeSBrZXkgb2YgdGhlIHVzZXIgcm9sZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGRlbGV0ZVJvbGUocHJpbWFyeUtleSkge1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICByZXR1cm4gdGhpcy5kZWxldGVJdGVtKFwiZGlyZWN0dXNfcm9sZXNcIiwgcHJpbWFyeUtleSk7XG4gICAgfSxcblxuICAgIC8vIFNFVFRJTkdTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogR2V0IERpcmVjdHVzJyBnbG9iYWwgc2V0dGluZ3NcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRTZXR0aW5ncyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3NldHRpbmdzXCIsIHBhcmFtcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgXCJmaWVsZHNcIiBmb3IgZGlyZWN0dXNfc2V0dGluZ3NcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtwYXJhbXM9e31dIFF1ZXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBnZXRTZXR0aW5nc0ZpZWxkcyhwYXJhbXMgPSB7fSkge1xuICAgICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsIFwicGFyYW1zXCIpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL3NldHRpbmdzL2ZpZWxkc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvLyBVU0VSU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIGxpc3Qgb2YgYXZhaWxhYmxlIHVzZXJzIGluIERpcmVjdHVzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0VXNlcnMocGFyYW1zID0ge30pIHtcbiAgICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCBcInBhcmFtc1wiKTtcbiAgICAgIHJldHVybiB0aGlzLmdldChcIi91c2Vyc1wiLCBwYXJhbXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzaW5nbGUgRGlyZWN0dXMgdXNlclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gcHJpbWFyeUtleSAgVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSB1c2VyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBbcGFyYW1zPXt9XSBRdWVyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybiB7UmVxdWVzdFByb21pc2V9XG4gICAgICovXG4gICAgZ2V0VXNlcihwcmltYXJ5S2V5LCBwYXJhbXMgPSB7fSkge1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoYC91c2Vycy8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB1c2VyIGluZm8gb2YgdGhlIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gW3BhcmFtcz17fV0gUXVlcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldE1lKHBhcmFtcyA9IHt9KSB7XG4gICAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgXCJwYXJhbXNcIik7XG4gICAgICByZXR1cm4gdGhpcy5nZXQoXCIvdXNlcnMvbWVcIiwgcGFyYW1zKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGEgc2luZ2xlIHVzZXIgYmFzZWQgb24gcHJpbWFyeUtleVxuICAgICAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHByaW1hcnlLZXkgVGhlIHByaW1hcnkga2V5IG9mIHRoZSB1c2VyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBib2R5ICAgICAgICAgICAgICBUaGUgZmllbGRzIHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHVwZGF0ZVVzZXIocHJpbWFyeUtleSwgYm9keSkge1xuICAgICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCBcInByaW1hcnlLZXlcIik7XG4gICAgICBBVi5vYmplY3QoYm9keSwgXCJib2R5XCIpO1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlSXRlbShcImRpcmVjdHVzX3VzZXJzXCIsIHByaW1hcnlLZXksIGJvZHkpO1xuICAgIH0sXG5cbiAgICAvLyBVVElMU1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFBpbmcgdGhlIEFQSSB0byBjaGVjayBpZiBpdCBleGlzdHMgLyBpcyB1cCBhbmQgcnVubmluZ1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHBpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIFwiL3NlcnZlci9waW5nXCIsIHt9LCB7fSwgdHJ1ZSwge30sIHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlcnZlciBpbmZvIGZyb20gdGhlIEFQSVxuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIHNlcnZlckluZm8oKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIFwiL1wiLCB7fSwge30sIHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlcnZlciBpbmZvIGZyb20gdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJuIHtSZXF1ZXN0UHJvbWlzZX1cbiAgICAgKi9cbiAgICBwcm9qZWN0SW5mbygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXCJnZXRcIiwgXCIvXCIpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIHRoZSBzZXR1cCB0aGlyZCBwYXJ0eSBhdXRoIHByb3ZpZGVyc1xuICAgICAqIEByZXR1cm4ge1JlcXVlc3RQcm9taXNlfVxuICAgICAqL1xuICAgIGdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KFwiL2F1dGgvc3NvXCIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBPbmx5IHN0YXJ0IHRoZSBhdXRvIHJlZnJlc2ggaW50ZXJ2YWwgaWYgdGhlIHRva2VuIGV4aXN0cyBhbmQgaXQncyBhIEpXVFxuICBpZiAoU0RLLnRva2VuICYmIFNESy50b2tlbi5pbmNsdWRlcyhcIi5cIikpIHtcbiAgICBTREsuc3RhcnRJbnRlcnZhbCh0cnVlKTtcbiAgfVxuXG4gIHJldHVybiBTREs7XG59XG5cbi8vIENPTlZFTklFTkNFIE1FVEhPRFNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuU0RLLmdldFBheWxvYWQgPSBnZXRQYXlsb2FkO1xubW9kdWxlLmV4cG9ydHMgPSBTREs7XG4iXSwic291cmNlUm9vdCI6IiJ9