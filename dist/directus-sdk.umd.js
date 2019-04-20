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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AV = __webpack_require__(/*! argument-validator */ "./node_modules/argument-validator/argument-validator.js");
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var qsStringify = __webpack_require__(/*! qs/lib/stringify */ "./node_modules/qs/lib/stringify.js");
var payload_1 = __webpack_require__(/*! ./payload */ "./src/payload.ts");
var SDK = /** @class */ (function () {
    /**
     * Create a new SDK instance
     */
    function SDK(options) {
        if (options === void 0) { options = { url: '#no-url-specified' }; }
        this.project = '_';
        this.xhr = axios_1.default.create({
            paramsSerializer: qsStringify,
            timeout: 10 * 60 * 1000,
        });
        if (options.storage) {
            var storedInfo = options.storage.getItem('directus-sdk-js');
            if (storedInfo) {
                storedInfo = JSON.parse(storedInfo);
                this.token = storedInfo.token;
                this.url = storedInfo.url;
                this.project = storedInfo.project;
                this.localExp = storedInfo.localExp;
            }
        }
        if (options.token) {
            this.token = options.token;
        }
        if (options.url) {
            this.url = options.url;
        }
        if (options.project) {
            this.project = options.project;
        }
        if (options.localExp) {
            this.localExp = options.localExp;
        }
        // Only start the auto refresh interval if the token exists and it's a JWT
        if (this.token && this.token.includes('.')) {
            this.startInterval(true);
        }
    }
    Object.defineProperty(SDK.prototype, "loggedIn", {
        /**
         * If the current auth status is logged in
         */
        get: function () {
            if (AV.isString(this.token) &&
                AV.isString(this.url) &&
                AV.isString(this.project) &&
                AV.isObject(this.getPayload())) {
                if (this.localExp > Date.now()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /// AUTHENTICATION -----------------------------------------------------------
    /**
     * Login to the API; Gets a new token from the API and stores it in this.token.
     */
    SDK.prototype.login = function (credentials, options) {
        var _this = this;
        if (options === void 0) { options = { persist: true, storage: false }; }
        AV.object(credentials, 'credentials');
        AV.keysWithString(credentials, ['email', 'password'], 'credentials');
        this.token = null;
        if (AV.hasKeysWithString(credentials, ['url'])) {
            this.url = credentials.url;
        }
        if (AV.hasKeysWithString(credentials, ['project'])) {
            this.project = credentials.project;
        }
        if (credentials.persist || options.persist) {
            this.startInterval();
        }
        return new Promise(function (resolve, reject) {
            _this.post('/auth/authenticate', {
                email: credentials.email,
                password: credentials.password,
            })
                .then(function (res) { return res.data.token; })
                .then(function (token) {
                _this.token = token;
                // Expiry date is the moment we got the token + 5 minutes
                _this.localExp = new Date(Date.now() + 5 * 60000).getTime();
                if (_this.storage) {
                    _this.storage.setItem('directus-sdk-js', JSON.stringify({
                        localExp: _this.localExp,
                        project: _this.project,
                        token: _this.token,
                        url: _this.url,
                    }));
                }
                resolve({
                    localExp: _this.localExp,
                    project: _this.project,
                    token: _this.token,
                    url: _this.url,
                });
            })
                .catch(reject);
        });
    };
    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    SDK.prototype.logout = function () {
        this.token = null;
        if (this.refreshInterval) {
            this.stopInterval();
        }
        if (this.storage) {
            this.storage.removeItem('directus-sdk-js');
        }
    };
    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    SDK.prototype.reset = function () {
        this.logout();
        this.url = null;
        this.project = null;
    };
    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date).
     * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
     * - Calls onAutoRefreshError if refreshing the token fails for some reason.
     * @returns {[boolean, Error?]}
     */
    SDK.prototype.refreshIfNeeded = function () {
        var _this = this;
        var payload = this.getPayload();
        if (!AV.hasStringKeys(this, ['token', 'url', 'project'])) {
            return;
        }
        if (!payload || !payload.exp) {
            return;
        }
        var timeDiff = this.localExp - Date.now();
        if (timeDiff <= 0) {
            if (AV.isFunction(this.onAutoRefreshError)) {
                this.onAutoRefreshError({
                    code: 102,
                    message: 'auth_expired_token',
                });
            }
            return;
        }
        if (timeDiff < 30000) {
            return new Promise(function (resolve) {
                _this.refresh(_this.token)
                    .then(function (res) {
                    _this.token = res.data.token;
                    _this.localExp = new Date(Date.now() + 5 * 60000).getTime();
                    // if autorefresh succeeded
                    if (AV.isFunction(_this.onAutoRefreshSuccess)) {
                        _this.onAutoRefreshSuccess({
                            localExp: _this.localExp,
                            project: _this.project,
                            token: _this.token,
                            url: _this.url,
                        });
                        resolve([true]);
                    }
                    // if expiration via storage
                    if (_this.storage) {
                        _this.storage.setItem('directus-sdk-js', JSON.stringify({
                            localExp: _this.localExp,
                            project: _this.project,
                            token: _this.token,
                            url: _this.url,
                        }));
                        resolve([true]);
                    }
                })
                    .catch(function (error) {
                    if (AV.isFunction(_this.onAutoRefreshError)) {
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
    SDK.prototype.refresh = function (token) {
        AV.string(token, 'token');
        return this.post('/auth/refresh', { token: token });
    };
    /**
     * Request to reset the password of the user with the given email address.
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     */
    SDK.prototype.requestPasswordReset = function (email) {
        AV.string(email, 'email');
        return this.post('/auth/password/request', {
            email: email,
        });
    };
    /// ACTIVITY -----------------------------------------------------------------
    /**
     * Get activity
     */
    SDK.prototype.getActivity = function (params) {
        if (params === void 0) { params = {}; }
        AV.objectOrEmpty(params, 'params');
        return this.get('/activity', params);
    };
    /// BOOKMARKS ----------------------------------------------------------------
    /**
     * Get the bookmarks of the current user
     * TODO: Add deprecation warning
     * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
     */
    SDK.prototype.getMyBookmarks = function (params) {
        if (params === void 0) { params = {}; }
        AV.string(this.token, 'this.token');
        AV.objectOrEmpty(params);
        var payload = this.getPayload();
        return Promise.all([
            this.get('/collection_presets', {
                'filter[title][nnull]': 1,
                'filter[user][eq]': payload.id,
            }),
            this.get('/collection_presets', {
                'filter[role][eq]': payload.role,
                'filter[title][nnull]': 1,
                'filter[user][null]': 1,
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
        AV.objectOrEmpty(params, 'params');
        return this.get('/collections', params);
    };
    /**
     * Get collection info by name
     */
    SDK.prototype.getCollection = function (collection, params) {
        if (params === void 0) { params = {}; }
        AV.string(collection, 'collection');
        AV.objectOrEmpty(params, 'params');
        return this.get("/collections/" + collection, params);
    };
    /**
     * Create a collection
     */
    SDK.prototype.createCollection = function (data) {
        AV.object(data, 'data');
        return this.post('/collections', data);
    };
    /**
     * Updates a certain collection
     */
    SDK.prototype.updateCollection = function (collection, data) {
        AV.string(collection, 'collection');
        AV.object(data, 'data');
        return this.patch("/collections/" + collection, data);
    };
    /**
     * Deletes a certain collection
     */
    SDK.prototype.deleteCollection = function (collection) {
        AV.string(collection, 'collection');
        return this.delete("/collections/" + collection);
    };
    /// COLLECTION PRESETS -------------------------------------------------------
    /**
     * Create a new collection preset (bookmark / listing preferences)
     */
    SDK.prototype.createCollectionPreset = function (data) {
        AV.object(data);
        return this.post('/collection_presets', data);
    };
    /**
     * Update collection preset (bookmark / listing preference)
     */
    SDK.prototype.updateCollectionPreset = function (primaryKey, data) {
        AV.notNull(primaryKey, 'primaryKey');
        AV.object(data, 'data');
        return this.patch("/collection_presets/" + primaryKey, data);
    };
    /**
     * Delete collection preset by primarykey
     */
    SDK.prototype.deleteCollectionPreset = function (primaryKey) {
        AV.notNull(primaryKey, 'primaryKey');
        return this.delete("/collection_presets/" + primaryKey);
    };
    /// DATABASE -----------------------------------------------------------------
    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     */
    SDK.prototype.updateDatabase = function () {
        return this.post('/update');
    };
    /// EXTENSIONS ---------------------------------------------------------------
    /**
     * Get the meta information of all installed interfaces
     */
    SDK.prototype.getInterfaces = function () {
        return this.request('get', '/interfaces', {}, {}, true);
    };
    /**
     * Get the meta information of all installed layouts
     */
    SDK.prototype.getLayouts = function () {
        return this.request('get', '/layouts', {}, {}, true);
    };
    /**
     * Get the meta information of all installed pages
     */
    SDK.prototype.getPages = function () {
        return this.request('get', '/pages', {}, {}, true);
    };
    /// FIELDS -------------------------------------------------------------------
    /**
     * Get all fields that are in Directus
     */
    SDK.prototype.getAllFields = function (params) {
        if (params === void 0) { params = {}; }
        AV.objectOrEmpty(params, 'params');
        return this.get('/fields', params);
    };
    /**
     * Get the fields that have been setup for a given collection
     */
    SDK.prototype.getFields = function (collection, params) {
        if (params === void 0) { params = {}; }
        AV.string(collection, 'collection');
        AV.objectOrEmpty(params, 'params');
        return this.get("/fields/" + collection, params);
    };
    /**
     * Get the field information for a single given field
     */
    SDK.prototype.getField = function (collection, fieldName, params) {
        if (params === void 0) { params = {}; }
        AV.string(collection, 'collection');
        AV.string(fieldName, 'fieldName');
        AV.objectOrEmpty(params, 'params');
        return this.get("/fields/" + collection + "/" + fieldName, params);
    };
    /**
     * Create a field in the given collection
     */
    SDK.prototype.createField = function (collection, fieldInfo) {
        AV.string(collection, 'collection');
        AV.object(fieldInfo, 'fieldInfo');
        return this.post("/fields/" + collection, fieldInfo);
    };
    /**
     * Update a given field in a given collection
     */
    SDK.prototype.updateField = function (collection, fieldName, fieldInfo) {
        AV.string(collection, 'collection');
        AV.string(fieldName, 'fieldName');
        AV.object(fieldInfo, 'fieldInfo');
        return this.patch("/fields/" + collection + "/" + fieldName, fieldInfo);
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
        AV.string(collection, 'collection');
        AV.array(fieldsInfoOrFieldNames, 'fieldsInfoOrFieldNames');
        if (fieldInfo) {
            AV.object(fieldInfo);
        }
        if (fieldInfo) {
            return this.patch("/fields/" + collection + "/" + fieldsInfoOrFieldNames.join(','), fieldInfo);
        }
        return this.patch("/fields/" + collection, fieldsInfoOrFieldNames);
    };
    /**
     * Delete a field from a collection
     */
    SDK.prototype.deleteField = function (collection, fieldName) {
        AV.string(collection, 'collection');
        AV.string(fieldName, 'fieldName');
        return this.delete("/fields/" + collection + "/" + fieldName);
    };
    /// FILES --------------------------------------------------------------------
    /**
     * Upload multipart files in multipart/form-data
     */
    SDK.prototype.uploadFiles = function (data, onUploadProgress) {
        if (onUploadProgress === void 0) { onUploadProgress = function () { return ({}); }; }
        var headers = {
            Authorization: "Bearer " + this.token,
            'Content-Type': 'multipart/form-data',
        };
        return this.xhr
            .post(this.url + "/" + this.project + "/files", data, {
            headers: headers,
            onUploadProgress: onUploadProgress,
        })
            .then(function (res) { return res.data; })
            .catch(function (error) {
            if (error.response) {
                throw error.response.data.error;
            }
            else {
                throw {
                    code: -1,
                    error: error,
                    message: 'Network Error',
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
        AV.string(collection, 'collection');
        AV.notNull(primaryKey, 'primaryKey');
        AV.object(body, 'body');
        if (collection.startsWith('directus_')) {
            return this.patch("/" + collection.substring(9) + "/" + primaryKey, body, params);
        }
        return this.patch("/items/" + collection + "/" + primaryKey, body, params);
    };
    /**
     * Update multiple items
     */
    SDK.prototype.updateItems = function (collection, body, params) {
        if (params === void 0) { params = {}; }
        AV.string(collection, 'collection');
        AV.array(body, 'body');
        if (collection.startsWith('directus_')) {
            return this.patch("/" + collection.substring(9), body, params);
        }
        return this.patch("/items/" + collection, body, params);
    };
    /**
     * Create a new item
     */
    SDK.prototype.createItem = function (collection, body) {
        AV.string(collection, 'collection');
        AV.object(body, 'body');
        if (collection.startsWith('directus_')) {
            return this.post("/" + collection.substring(9), body);
        }
        return this.post("/items/" + collection, body);
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
        AV.string(collection, 'collection');
        AV.array(body, 'body');
        if (collection.startsWith('directus_')) {
            return this.post("/" + collection.substring(9), body);
        }
        return this.post("/items/" + collection, body);
    };
    /**
     * Get items from a given collection
     */
    SDK.prototype.getItems = function (collection, params) {
        if (params === void 0) { params = {}; }
        AV.string(collection, 'collection');
        AV.objectOrEmpty(params, 'params');
        if (collection.startsWith('directus_')) {
            return this.get("/" + collection.substring(9), params);
        }
        return this.get("/items/" + collection, params);
    };
    /**
     * Get a single item by primary key
     */
    SDK.prototype.getItem = function (collection, primaryKey, params) {
        if (params === void 0) { params = {}; }
        AV.string(collection, 'collection');
        AV.notNull(primaryKey, 'primaryKey');
        AV.objectOrEmpty(params, 'params');
        if (collection.startsWith('directus_')) {
            return this.get("/" + collection.substring(9) + "/" + primaryKey, params);
        }
        return this.get("/items/" + collection + "/" + primaryKey, params);
    };
    /**
     * Delete a single item by primary key
     */
    SDK.prototype.deleteItem = function (collection, primaryKey) {
        AV.string(collection, 'collection');
        AV.notNull(primaryKey, 'primaryKey');
        if (collection.startsWith('directus_')) {
            return this.delete("/" + collection.substring(9) + "/" + primaryKey);
        }
        return this.delete("/items/" + collection + "/" + primaryKey);
    };
    /**
     * Delete multiple items by primary key
     */
    SDK.prototype.deleteItems = function (collection, primaryKeys) {
        AV.string(collection, 'collection');
        AV.array(primaryKeys, 'primaryKeys');
        if (collection.startsWith('directus_')) {
            return this.delete("/" + collection.substring(9) + "/" + primaryKeys.join());
        }
        return this.delete("/items/" + collection + "/" + primaryKeys.join());
    };
    /// LISTING PREFERENCES ------------------------------------------------------
    /**
     * Get the collection presets of the current user for a single collection
     */
    SDK.prototype.getMyListingPreferences = function (collection, params) {
        if (params === void 0) { params = {}; }
        AV.string(this.token, 'this.token');
        AV.objectOrEmpty(params, 'params');
        var payload = this.getPayload();
        return Promise.all([
            this.get('/collection_presets', {
                'filter[collection][eq]': collection,
                'filter[role][null]': 1,
                'filter[title][null]': 1,
                'filter[user][null]': 1,
                limit: 1,
                sort: '-id',
            }),
            this.get('/collection_presets', {
                'filter[collection][eq]': collection,
                'filter[role][eq]': payload.role,
                'filter[title][null]': 1,
                'filter[user][null]': 1,
                limit: 1,
                sort: '-id',
            }),
            this.get('/collection_presets', {
                'filter[collection][eq]': collection,
                'filter[role][eq]': payload.role,
                'filter[title][null]': 1,
                'filter[user][eq]': payload.id,
                limit: 1,
                sort: '-id',
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
        AV.objectOrEmpty(params, 'params');
        return this.getItems('directus_permissions', params);
    };
    /**
     * Get the currently logged in user's permissions
     */
    SDK.prototype.getMyPermissions = function (params) {
        if (params === void 0) { params = {}; }
        AV.objectOrEmpty(params, 'params');
        return this.get('/permissions/me', params);
    };
    /**
     * Create multiple new permissions
     */
    SDK.prototype.createPermissions = function (data) {
        AV.array(data);
        return this.post('/permissions', data);
    };
    /**
     * Update multiple permission records
     */
    SDK.prototype.updatePermissions = function (data) {
        AV.array(data);
        return this.patch('/permissions', data);
    };
    /// RELATIONS ----------------------------------------------------------------
    /**
     * Get all relationships
     */
    SDK.prototype.getRelations = function (params) {
        if (params === void 0) { params = {}; }
        AV.objectOrEmpty(params);
        return this.get('/relations', params);
    };
    /**
     * Creates new relation
     */
    SDK.prototype.createRelation = function (data) {
        return this.post('/relations', data);
    };
    /**
     * Updates existing relation
     */
    SDK.prototype.updateRelation = function (primaryKey, data) {
        return this.patch("/relations/" + primaryKey, data);
    };
    /**
     * Get the relationship information for the given collection
     */
    SDK.prototype.getCollectionRelations = function (collection, params) {
        if (params === void 0) { params = {}; }
        AV.string(collection, 'collection');
        AV.objectOrEmpty(params);
        return Promise.all([
            this.get('/relations', {
                'filter[collection_a][eq]': collection,
            }),
            this.get('/relations', {
                'filter[collection_b][eq]': collection,
            }),
        ]);
    };
    /// REVISIONS ----------------------------------------------------------------
    /**
     * Get a single item's revisions by primary key
     */
    SDK.prototype.getItemRevisions = function (collection, primaryKey, params) {
        if (params === void 0) { params = {}; }
        AV.string(collection, 'collection');
        AV.notNull(primaryKey, 'primaryKey');
        AV.objectOrEmpty(params, 'params');
        if (collection.startsWith('directus_')) {
            return this.get("/" + collection.substring(9) + "/" + primaryKey + "/revisions", params);
        }
        return this.get("/items/" + collection + "/" + primaryKey + "/revisions", params);
    };
    /**
     * Revert an item to a previous state
     */
    SDK.prototype.revert = function (collection, primaryKey, revisionID) {
        AV.string(collection, 'collection');
        AV.notNull(primaryKey, 'primaryKey');
        AV.number(revisionID, 'revisionID');
        if (collection.startsWith('directus_')) {
            return this.patch("/" + collection.substring(9) + "/" + primaryKey + "/revert/" + revisionID);
        }
        return this.patch("/items/" + collection + "/" + primaryKey + "/revert/" + revisionID);
    };
    /// ROLES --------------------------------------------------------------------
    /**
     * Get a single user role
     */
    SDK.prototype.getRole = function (primaryKey, params) {
        if (params === void 0) { params = {}; }
        AV.number(primaryKey, 'primaryKey');
        AV.objectOrEmpty(params, 'params');
        return this.get("/roles/" + primaryKey, params);
    };
    /**
     * Get the user roles
     */
    SDK.prototype.getRoles = function (params) {
        if (params === void 0) { params = {}; }
        AV.objectOrEmpty(params, 'params');
        return this.get('/roles', params);
    };
    /**
     * Update a user role
     */
    SDK.prototype.updateRole = function (primaryKey, body) {
        AV.notNull(primaryKey, 'primaryKey');
        AV.object(body, 'body');
        return this.updateItem('directus_roles', primaryKey, body);
    };
    /**
     * Create a new user role
     */
    SDK.prototype.createRole = function (body) {
        AV.object(body, 'body');
        return this.createItem('directus_roles', body);
    };
    /**
     * Delete a user rol by primary key
     */
    SDK.prototype.deleteRole = function (primaryKey) {
        AV.notNull(primaryKey, 'primaryKey');
        return this.deleteItem('directus_roles', primaryKey);
    };
    /// SETTINGS -----------------------------------------------------------------
    /**
     * Get Directus' global settings
     */
    SDK.prototype.getSettings = function (params) {
        if (params === void 0) { params = {}; }
        AV.objectOrEmpty(params, 'params');
        return this.get('/settings', params);
    };
    /**
     * Get the "fields" for directus_settings
     */
    SDK.prototype.getSettingsFields = function (params) {
        if (params === void 0) { params = {}; }
        AV.objectOrEmpty(params, 'params');
        return this.get('/settings/fields', params);
    };
    /// USERS ---------------------------------------------------------------------
    /**
     * Get a list of available users in Directus
     */
    SDK.prototype.getUsers = function (params) {
        if (params === void 0) { params = {}; }
        AV.objectOrEmpty(params, 'params');
        return this.get('/users', params);
    };
    /**
     * Get a single Directus user
     */
    SDK.prototype.getUser = function (primaryKey, params) {
        if (params === void 0) { params = {}; }
        AV.notNull(primaryKey, 'primaryKey');
        AV.objectOrEmpty(params, 'params');
        return this.get("/users/" + primaryKey, params);
    };
    /**
     * Get the user info of the currently logged in user
     */
    SDK.prototype.getMe = function (params) {
        if (params === void 0) { params = {}; }
        AV.objectOrEmpty(params, 'params');
        return this.get('/users/me', params);
    };
    /**
     * Update a single user based on primaryKey
     */
    SDK.prototype.updateUser = function (primaryKey, body) {
        AV.notNull(primaryKey, 'primaryKey');
        AV.object(body, 'body');
        return this.updateItem('directus_users', primaryKey, body);
    };
    /// UTILS --------------------------------------------------------------------
    /**
     * Ping the API to check if it exists / is up and running
     */
    SDK.prototype.ping = function () {
        return this.request('get', '/server/ping', {}, {}, true);
    };
    /**
     * Get the server info from the API
     */
    SDK.prototype.serverInfo = function () {
        return this.request('get', '/', {}, {}, true);
    };
    /**
     * Get the server info from the project
     */
    SDK.prototype.projectInfo = function () {
        return this.request('get', '/');
    };
    /**
     * Get all the setup third party auth providers
     */
    SDK.prototype.getThirdPartyAuthProviders = function () {
        return this.get('/auth/sso');
    };
    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
     */
    SDK.prototype.startInterval = function (fireImmediately) {
        if (fireImmediately) {
            this.refreshIfNeeded();
        }
        this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
    };
    /**
     * Clears and nullifies the token refreshing interval
     */
    SDK.prototype.stopInterval = function () {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
    };
    /// REQUEST METHODS ----------------------------------------------------------
    /**
     * Perform an API request to the Directus API
     */
    SDK.prototype.request = function (method, endpoint, params, data, noEnv, headers) {
        if (params === void 0) { params = {}; }
        if (data === void 0) { data = {}; }
        if (noEnv === void 0) { noEnv = false; }
        if (headers === void 0) { headers = {}; }
        AV.string(method, 'method');
        AV.string(endpoint, 'endpoint');
        AV.objectOrEmpty(params, 'params');
        Array.isArray(data) ? AV.arrayOrEmpty(data, 'data') : AV.objectOrEmpty(data, 'data');
        AV.string(this.url, 'this.url');
        var baseURL = this.url + "/";
        if (noEnv === false) {
            baseURL += this.project + "/";
        }
        var requestOptions = {
            baseURL: baseURL,
            data: data,
            headers: headers,
            method: method,
            params: params,
            url: endpoint,
        };
        if (this.token && typeof this.token === 'string' && this.token.length > 0) {
            requestOptions.headers = headers;
            requestOptions.headers.Authorization = "Bearer " + this.token;
        }
        return this.xhr
            .request(requestOptions)
            .then(function (res) { return res.data; })
            .then(function (responseData) {
            if (!responseData || responseData.length === 0) {
                return responseData;
            }
            if (typeof responseData !== 'object') {
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
                    message: 'API returned invalid JSON',
                };
            }
            else {
                throw {
                    code: -1,
                    error: error,
                    message: 'Network Error',
                };
            }
        });
    };
    /**
     * GET convenience method. Calls the request method for you
     */
    SDK.prototype.get = function (endpoint, params) {
        if (params === void 0) { params = {}; }
        AV.string(endpoint, 'endpoint');
        AV.objectOrEmpty(params, 'params');
        return this.request('get', endpoint, params);
    };
    /**
     * POST convenience method. Calls the request method for you
     */
    SDK.prototype.post = function (endpoint, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = {}; }
        AV.string(endpoint, 'endpoint');
        Array.isArray(body) ? AV.arrayOrEmpty(body, 'body') : AV.objectOrEmpty(body, 'body');
        return this.request('post', endpoint, params, body);
    };
    /**
     * PATCH convenience method. Calls the request method for you
     */
    SDK.prototype.patch = function (endpoint, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = {}; }
        AV.string(endpoint, 'endpoint');
        Array.isArray(body) ? AV.arrayOrEmpty(body, 'body') : AV.objectOrEmpty(body, 'body');
        return this.request('patch', endpoint, params, body);
    };
    /**
     * PUT convenience method. Calls the request method for you
     */
    SDK.prototype.put = function (endpoint, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = {}; }
        AV.string(endpoint, 'endpoint');
        Array.isArray(body) ? AV.arrayOrEmpty(body, 'body') : AV.objectOrEmpty(body, 'body');
        return this.request('put', endpoint, params, body);
    };
    /**
     * DELETE convenience method. Calls the request method for you
     */
    SDK.prototype.delete = function (endpoint) {
        AV.string(endpoint, 'endpoint');
        return this.request('delete', endpoint);
    };
    /**
     * Gets the payload of the current token, return type can be generic
     */
    SDK.prototype.getPayload = function () {
        if (!AV.isString(this.token)) {
            return null;
        }
        return payload_1.getPayload(this.token);
    };
    // convenience method
    SDK.getPayload = payload_1.getPayload;
    return SDK;
}());
exports.default = SDK;


/***/ }),

/***/ "./src/payload.ts":
/*!************************!*\
  !*** ./src/payload.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AV = __webpack_require__(/*! argument-validator */ "./node_modules/argument-validator/argument-validator.js");
var base64 = __webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js");
/**
 * Retrieves the payload from a JWT
 * @param  {String} token The JWT to retrieve the payload from
 * @return {Object}       The JWT payload
 */
function getPayload(token) {
    var payloadBase64 = token
        .split('.')[1]
        .replace('-', '+')
        .replace('_', '/');
    var payloadDecoded = base64.decode(payloadBase64);
    var payloadObject = JSON.parse(payloadDecoded);
    if (AV.isNumber(payloadObject.exp)) {
        payloadObject.exp = new Date(payloadObject.exp * 1000);
    }
    return payloadObject;
}
exports.getPayload = getPayload;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXJndW1lbnQtdmFsaWRhdG9yL2FyZ3VtZW50LXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvZm9ybWF0cy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3BheWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsSUFFVTtBQUNaO0FBQ0EsRUFBRSxtQ0FBTztBQUNUO0FBQ0EsR0FBRztBQUFBLG9HQUFDO0FBQ0osRUFBRSxNQUFNLFlBVU47O0FBRUYsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx6Qjs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pCYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsK0NBQVM7QUFDN0IsY0FBYyxtQkFBTyxDQUFDLG1EQUFXO0FBQ2pDOztBQUVBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsS0FBSztBQUNMLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNVFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMkJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxFQUFFO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxrREFBa0QsRUFBRTtBQUNwRDtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsT0FBTyxXQUFXLGFBQWE7QUFDakQ7O0FBRUEsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JPQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQSxrSEFBeUM7QUFDekMsZ0ZBQTBCO0FBQzFCLG9HQUFnRDtBQW9CaEQseUVBQXVDO0FBR3ZDO0lBa0NFOztPQUVHO0lBQ0gsYUFBWSxPQUFzRDtRQUF0RCxzQ0FBNEIsR0FBRyxFQUFFLG1CQUFtQixFQUFFO1FBZDFELFlBQU8sR0FBVyxHQUFHLENBQUM7UUFNYixRQUFHLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQztZQUNsQyxnQkFBZ0IsRUFBRSxXQUFXO1lBQzdCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7U0FDeEIsQ0FBQyxDQUFDO1FBTUQsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ25CLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFNUQsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXBDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztnQkFDOUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO2dCQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQzthQUNyQztTQUNGO1FBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUM1QjtRQUNELElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUN4QjtRQUNELElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDaEM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ2xDO1FBRUQsMEVBQTBFO1FBQzFFLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQWhFRCxzQkFBVyx5QkFBUTtRQUhuQjs7V0FFRzthQUNIO1lBQ0UsSUFDRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDckIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN6QixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUM5QjtnQkFDQSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUM5QixPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDOzs7T0FBQTtJQXNERCw4RUFBOEU7SUFFOUU7O09BRUc7SUFDSSxtQkFBSyxHQUFaLFVBQ0UsV0FBOEIsRUFDOUIsT0FBMEQ7UUFGNUQsaUJBc0RDO1FBcERDLHNDQUEyQixPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7UUFFMUQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDdEMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7U0FDNUI7UUFFRCxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztTQUNwQztRQUVELElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQzFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxLQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM5QixLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7Z0JBQ3hCLFFBQVEsRUFBRSxXQUFXLENBQUMsUUFBUTthQUMvQixDQUFDO2lCQUNDLElBQUksQ0FBQyxVQUFDLEdBQWdDLElBQUssVUFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQWQsQ0FBYyxDQUFDO2lCQUMxRCxJQUFJLENBQUMsVUFBQyxLQUFhO2dCQUNsQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFFbkIseURBQXlEO2dCQUN6RCxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRTNELElBQUksS0FBSSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ2xCLGlCQUFpQixFQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUNiLFFBQVEsRUFBRSxLQUFJLENBQUMsUUFBUTt3QkFDdkIsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO3dCQUNyQixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUs7d0JBQ2pCLEdBQUcsRUFBRSxLQUFJLENBQUMsR0FBRztxQkFDZCxDQUFDLENBQ0gsQ0FBQztpQkFDSDtnQkFFRCxPQUFPLENBQUM7b0JBQ04sUUFBUSxFQUFFLEtBQUksQ0FBQyxRQUFRO29CQUN2QixPQUFPLEVBQUUsS0FBSSxDQUFDLE9BQU87b0JBQ3JCLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSztvQkFDakIsR0FBRyxFQUFFLEtBQUksQ0FBQyxHQUFHO2lCQUNkLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQkFBTSxHQUFiO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUJBQUssR0FBWjtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDZCQUFlLEdBQXRCO1FBQUEsaUJBaUVDO1FBaEVDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQWdCLENBQUM7UUFFaEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ3hELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUVELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTVDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNqQixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztvQkFDdEIsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsT0FBTyxFQUFFLG9CQUFvQjtpQkFDOUIsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQUU7WUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBb0IsVUFBQyxPQUF3QztnQkFDN0UsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO3FCQUNyQixJQUFJLENBQUMsVUFBQyxHQUEwQjtvQkFDL0IsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDNUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUUzRCwyQkFBMkI7b0JBQzNCLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRTt3QkFDNUMsS0FBSSxDQUFDLG9CQUFvQixDQUFDOzRCQUN4QixRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVE7NEJBQ3ZCLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTzs0QkFDckIsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLOzRCQUNqQixHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUc7eUJBQ2QsQ0FBQyxDQUFDO3dCQUNILE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQ2pCO29CQUVELDRCQUE0QjtvQkFDNUIsSUFBSSxLQUFJLENBQUMsT0FBTyxFQUFFO3dCQUNoQixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDbEIsaUJBQWlCLEVBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUM7NEJBQ2IsUUFBUSxFQUFFLEtBQUksQ0FBQyxRQUFROzRCQUN2QixPQUFPLEVBQUUsS0FBSSxDQUFDLE9BQU87NEJBQ3JCLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSzs0QkFDakIsR0FBRyxFQUFFLEtBQUksQ0FBQyxHQUFHO3lCQUNkLENBQUMsQ0FDSCxDQUFDO3dCQUNGLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQ2pCO2dCQUNILENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsVUFBQyxLQUFZO29CQUNsQixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7d0JBQzFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDaEM7b0JBQ0QsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxxQkFBTyxHQUFkLFVBQWUsS0FBYTtRQUMxQixFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQXdCLGVBQWUsRUFBRSxFQUFFLEtBQUssU0FBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxrQ0FBb0IsR0FBM0IsVUFBaUQsS0FBYTtRQUM1RCxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUksd0JBQXdCLEVBQUU7WUFDNUMsS0FBSztTQUNOLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4RUFBOEU7SUFFOUU7O09BRUc7SUFDSSx5QkFBVyxHQUFsQixVQUFtQixNQUFtQjtRQUFuQixvQ0FBbUI7UUFDcEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFvQixXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELDhFQUE4RTtJQUU5RTs7OztPQUlHO0lBQ0ksNEJBQWMsR0FBckIsVUFBK0MsTUFBbUI7UUFBbkIsb0NBQW1CO1FBQ2hFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQWdDLENBQUM7UUFFaEUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUU7Z0JBQzlCLHNCQUFzQixFQUFFLENBQUM7Z0JBQ3pCLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxFQUFFO2FBQy9CLENBQUM7WUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFO2dCQUM5QixrQkFBa0IsRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDaEMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDekIsb0JBQW9CLEVBQUUsQ0FBQzthQUN4QixDQUFDO1NBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQTRCO1lBQzVCLG9CQUFJLEVBQUUsZ0JBQUksQ0FBVztZQUM1QixPQUFXLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsUUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQU0sQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4RUFBOEU7SUFFOUU7O09BRUc7SUFDSSw0QkFBYyxHQUFyQixVQUFzQixNQUFtQjtRQUFuQixvQ0FBbUI7UUFDdkMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUF5QixjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkJBQWEsR0FBcEIsVUFBcUIsVUFBa0IsRUFBRSxNQUFtQjtRQUFuQixvQ0FBbUI7UUFDMUQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFzQixrQkFBZ0IsVUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7T0FFRztJQUNJLDhCQUFnQixHQUF2QixVQUF3QixJQUFZO1FBQ2xDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBc0IsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7T0FFRztJQUNJLDhCQUFnQixHQUF2QixVQUF3QixVQUFrQixFQUFFLElBQVk7UUFDdEQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFzQixrQkFBZ0IsVUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7T0FFRztJQUNJLDhCQUFnQixHQUF2QixVQUF3QixVQUFrQjtRQUN4QyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQU8sa0JBQWdCLFVBQVksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCw4RUFBOEU7SUFFOUU7O09BRUc7SUFDSSxvQ0FBc0IsR0FBN0IsVUFBbUQsSUFBWTtRQUM3RCxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBSSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQ0FBc0IsR0FBN0IsVUFBbUQsVUFBMEIsRUFBRSxJQUFZO1FBQ3pGLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBSSx5QkFBdUIsVUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7T0FFRztJQUNJLG9DQUFzQixHQUE3QixVQUE4QixVQUEwQjtRQUN0RCxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQU8seUJBQXVCLFVBQVksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCw4RUFBOEU7SUFFOUU7OztPQUdHO0lBQ0ksNEJBQWMsR0FBckI7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELDhFQUE4RTtJQUU5RTs7T0FFRztJQUNJLDJCQUFhLEdBQXBCO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFJLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBVSxHQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBSSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0JBQVEsR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBSSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELDhFQUE4RTtJQUU5RTs7T0FFRztJQUNJLDBCQUFZLEdBQW5CLFVBQXlDLE1BQW1CO1FBQW5CLG9DQUFtQjtRQUMxRCxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUksU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLHVCQUFTLEdBQWhCLFVBQXNDLFVBQWtCLEVBQUUsTUFBbUI7UUFBbkIsb0NBQW1CO1FBQzNFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBSSxhQUFXLFVBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxzQkFBUSxHQUFmLFVBQXFDLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxNQUFtQjtRQUFuQixvQ0FBbUI7UUFDN0YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFJLGFBQVcsVUFBVSxTQUFJLFNBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSx5QkFBVyxHQUFsQixVQUF3QyxVQUFrQixFQUFFLFNBQWlCO1FBQzNFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBSSxhQUFXLFVBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx5QkFBVyxHQUFsQixVQUF3QyxVQUFrQixFQUFFLFNBQWlCLEVBQUUsU0FBaUI7UUFDOUYsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFJLGFBQVcsVUFBVSxTQUFJLFNBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSSwwQkFBWSxHQUFuQixVQUNFLFVBQWtCLEVBQ2xCLHNCQUEyQyxFQUMzQyxTQUF3QjtRQUF4Qiw0Q0FBd0I7UUFFeEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBRTNELElBQUksU0FBUyxFQUFFO1lBQ2IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0QjtRQUVELElBQUksU0FBUyxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQVcsVUFBVSxTQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUMzRjtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFXLFVBQVksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7T0FFRztJQUNJLHlCQUFXLEdBQWxCLFVBQW1CLFVBQWtCLEVBQUUsU0FBaUI7UUFDdEQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQVcsVUFBVSxTQUFJLFNBQVcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw4RUFBOEU7SUFFOUU7O09BRUc7SUFDSSx5QkFBVyxHQUFsQixVQUEwQyxJQUFZLEVBQUUsZ0JBQTJDO1FBQTNDLG9FQUF1QyxRQUFDLEVBQUUsQ0FBQyxFQUFKLENBQUk7UUFDakcsSUFBTSxPQUFPLEdBQUc7WUFDZCxhQUFhLEVBQUUsWUFBVSxJQUFJLENBQUMsS0FBTztZQUNyQyxjQUFjLEVBQUUscUJBQXFCO1NBQ3RDLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxHQUFHO2FBQ1osSUFBSSxDQUFJLElBQUksQ0FBQyxHQUFHLFNBQUksSUFBSSxDQUFDLE9BQU8sV0FBUSxFQUFFLElBQUksRUFBRTtZQUMvQyxPQUFPO1lBQ1AsZ0JBQWdCO1NBQ2pCLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQyxHQUFrQixJQUFLLFVBQUcsQ0FBQyxJQUFJLEVBQVIsQ0FBUSxDQUFDO2FBQ3RDLEtBQUssQ0FBQyxVQUFDLEtBQWE7WUFDbkIsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNsQixNQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxNQUFNO29CQUNKLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ1IsS0FBSztvQkFDTCxPQUFPLEVBQUUsZUFBZTtpQkFDekIsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsOEVBQThFO0lBRTlFOztPQUVHO0lBQ0ksd0JBQVUsR0FBakIsVUFDRSxVQUFrQixFQUNsQixVQUEwQixFQUMxQixJQUFjLEVBQ2QsTUFBbUI7UUFBbkIsb0NBQW1CO1FBRW5CLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhCLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFJLFVBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDOUU7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUksWUFBVSxVQUFVLFNBQUksVUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSx5QkFBVyxHQUFsQixVQUE0QyxVQUFrQixFQUFFLElBQWMsRUFBRSxNQUFtQjtRQUFuQixvQ0FBbUI7UUFDakcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdkIsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBSSxNQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ25FO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFJLFlBQVUsVUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBVSxHQUFqQixVQUF1QyxVQUFrQixFQUFFLElBQWM7UUFDdkUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFeEIsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBSSxNQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDMUQ7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUksWUFBVSxVQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNJLHlCQUFXLEdBQWxCLFVBQTRDLFVBQWtCLEVBQUUsSUFBYztRQUM1RSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV2QixJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2RDtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBWSxZQUFVLFVBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxzQkFBUSxHQUFmLFVBQXlDLFVBQWtCLEVBQUUsTUFBbUI7UUFBbkIsb0NBQW1CO1FBQzlFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRW5DLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFZLFlBQVUsVUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7T0FFRztJQUNJLHFCQUFPLEdBQWQsVUFDRSxVQUFrQixFQUNsQixVQUEwQixFQUMxQixNQUFtQjtRQUFuQixvQ0FBbUI7UUFFbkIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFbkMsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQUksVUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFZLFlBQVUsVUFBVSxTQUFJLFVBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBVSxHQUFqQixVQUFrQixVQUFrQixFQUFFLFVBQTBCO1FBQzlELEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXJDLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQU8sTUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFJLFVBQVksQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFPLFlBQVUsVUFBVSxTQUFJLFVBQVksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7T0FFRztJQUNJLHlCQUFXLEdBQWxCLFVBQW1CLFVBQWtCLEVBQUUsV0FBNkI7UUFDbEUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFckMsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQUksV0FBVyxDQUFDLElBQUksRUFBSSxDQUFDLENBQUM7U0FDekU7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBVSxVQUFVLFNBQUksV0FBVyxDQUFDLElBQUksRUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELDhFQUE4RTtJQUU5RTs7T0FFRztJQUNJLHFDQUF1QixHQUE5QixVQUF3RCxVQUFrQixFQUFFLE1BQW1CO1FBQW5CLG9DQUFtQjtRQUM3RixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFbkMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBZ0MsQ0FBQztRQUVoRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBYyxxQkFBcUIsRUFBRTtnQkFDM0Msd0JBQXdCLEVBQUUsVUFBVTtnQkFDcEMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDdkIscUJBQXFCLEVBQUUsQ0FBQztnQkFDeEIsb0JBQW9CLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLEtBQUs7YUFDWixDQUFDO1lBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBYyxxQkFBcUIsRUFBRTtnQkFDM0Msd0JBQXdCLEVBQUUsVUFBVTtnQkFDcEMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ2hDLHFCQUFxQixFQUFFLENBQUM7Z0JBQ3hCLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxLQUFLO2FBQ1osQ0FBQztZQUNGLElBQUksQ0FBQyxHQUFHLENBQWMscUJBQXFCLEVBQUU7Z0JBQzNDLHdCQUF3QixFQUFFLFVBQVU7Z0JBQ3BDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxJQUFJO2dCQUNoQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUN4QixrQkFBa0IsRUFBRSxPQUFPLENBQUMsRUFBRTtnQkFDOUIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLEtBQUs7YUFDWixDQUFDO1NBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQTBCO1lBQzFCLG1CQUFHLEVBQUUsZ0JBQUksRUFBRSxnQkFBSSxDQUFXO1lBRWpDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sQ0FBQzthQUMxQjtZQUVELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sQ0FBQzthQUMxQjtZQUVELElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25DLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sQ0FBQzthQUN6QjtZQUVELE9BQU8sRUFBTyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhFQUE4RTtJQUU5RTs7T0FFRztJQUNJLDRCQUFjLEdBQXJCLFVBQStDLE1BQW1CO1FBQW5CLG9DQUFtQjtRQUNoRSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUksc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksOEJBQWdCLEdBQXZCLFVBQWlELE1BQW1CO1FBQW5CLG9DQUFtQjtRQUNsRSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksK0JBQWlCLEdBQXhCLFVBQWtELElBQXVCO1FBQ3ZFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLCtCQUFpQixHQUF4QixVQUFrRCxJQUF1QjtRQUN2RSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFJLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsOEVBQThFO0lBRTlFOztPQUVHO0lBQ0ksMEJBQVksR0FBbkIsVUFBNkMsTUFBbUI7UUFBbkIsb0NBQW1CO1FBQzlELEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFJLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSw0QkFBYyxHQUFyQixVQUEyQyxJQUF3QjtRQUNqRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUksWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFjLEdBQXJCLFVBQTJDLFVBQTBCLEVBQUUsSUFBd0I7UUFDN0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFJLGdCQUFjLFVBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQ0FBc0IsR0FBN0IsVUFBbUQsVUFBa0IsRUFBRSxNQUFtQjtRQUFuQixvQ0FBbUI7UUFDeEYsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBSSxZQUFZLEVBQUU7Z0JBQ3hCLDBCQUEwQixFQUFFLFVBQVU7YUFDdkMsQ0FBQztZQUNGLElBQUksQ0FBQyxHQUFHLENBQUksWUFBWSxFQUFFO2dCQUN4QiwwQkFBMEIsRUFBRSxVQUFVO2FBQ3ZDLENBQUM7U0FDSCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsOEVBQThFO0lBRTlFOztPQUVHO0lBQ0ksOEJBQWdCLEdBQXZCLFVBQ0UsVUFBa0IsRUFDbEIsVUFBMEIsRUFDMUIsTUFBbUI7UUFBbkIsb0NBQW1CO1FBRW5CLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRW5DLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQXVCLE1BQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBSSxVQUFVLGVBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN0RztRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBdUIsWUFBVSxVQUFVLFNBQUksVUFBVSxlQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVEOztPQUVHO0lBQ0ksb0JBQU0sR0FBYixVQUFjLFVBQWtCLEVBQUUsVUFBMEIsRUFBRSxVQUFrQjtRQUM5RSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUVwQyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBSSxVQUFVLGdCQUFXLFVBQVksQ0FBQyxDQUFDO1NBQ3JGO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVUsVUFBVSxTQUFJLFVBQVUsZ0JBQVcsVUFBWSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELDhFQUE4RTtJQUU5RTs7T0FFRztJQUNJLHFCQUFPLEdBQWQsVUFBZSxVQUEwQixFQUFFLE1BQW1CO1FBQW5CLG9DQUFtQjtRQUM1RCxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQWdCLFlBQVUsVUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7T0FFRztJQUNJLHNCQUFRLEdBQWYsVUFBZ0IsTUFBbUI7UUFBbkIsb0NBQW1CO1FBQ2pDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBa0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7T0FFRztJQUNJLHdCQUFVLEdBQWpCLFVBQWtCLFVBQTBCLEVBQUUsSUFBYztRQUMxRCxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQWdCLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBVSxHQUFqQixVQUFrQixJQUFjO1FBQzlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBZ0IsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOztPQUVHO0lBQ0ksd0JBQVUsR0FBakIsVUFBa0IsVUFBMEI7UUFDMUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCw4RUFBOEU7SUFFOUU7O09BRUc7SUFDSSx5QkFBVyxHQUFsQixVQUFtQixNQUFtQjtRQUFuQixvQ0FBbUI7UUFDcEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrQkFBaUIsR0FBeEIsVUFBeUIsTUFBbUI7UUFBbkIsb0NBQW1CO1FBQzFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsK0VBQStFO0lBRS9FOztPQUVHO0lBQ0ksc0JBQVEsR0FBZixVQUFnQixNQUFtQjtRQUFuQixvQ0FBbUI7UUFDakMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxxQkFBTyxHQUFkLFVBQWUsVUFBMEIsRUFBRSxNQUFtQjtRQUFuQixvQ0FBbUI7UUFDNUQsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVUsVUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7T0FFRztJQUNJLG1CQUFLLEdBQVosVUFBYSxNQUFtQjtRQUFuQixvQ0FBbUI7UUFDOUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBVSxHQUFqQixVQUFrQixVQUEwQixFQUFFLElBQWM7UUFDMUQsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsOEVBQThFO0lBRTlFOztPQUVHO0lBQ0ksa0JBQUksR0FBWDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksd0JBQVUsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNJLHlCQUFXLEdBQWxCO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3Q0FBMEIsR0FBakM7UUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ssMkJBQWEsR0FBckIsVUFBc0IsZUFBeUI7UUFDN0MsSUFBSSxlQUFlLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOztPQUVHO0lBQ0ssMEJBQVksR0FBcEI7UUFDRSxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRCw4RUFBOEU7SUFFOUU7O09BRUc7SUFDSyxxQkFBTyxHQUFmLFVBQ0UsTUFBcUIsRUFDckIsUUFBZ0IsRUFDaEIsTUFBbUIsRUFDbkIsSUFBaUIsRUFDakIsS0FBc0IsRUFDdEIsT0FBdUM7UUFIdkMsb0NBQW1CO1FBQ25CLGdDQUFpQjtRQUNqQixxQ0FBc0I7UUFDdEIsc0NBQXVDO1FBRXZDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFaEMsSUFBSSxPQUFPLEdBQU0sSUFBSSxDQUFDLEdBQUcsTUFBRyxDQUFDO1FBRTdCLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRTtZQUNuQixPQUFPLElBQU8sSUFBSSxDQUFDLE9BQU8sTUFBRyxDQUFDO1NBQy9CO1FBRUQsSUFBTSxjQUFjLEdBQUc7WUFDckIsT0FBTztZQUNQLElBQUk7WUFDSixPQUFPO1lBQ1AsTUFBTTtZQUNOLE1BQU07WUFDTixHQUFHLEVBQUUsUUFBUTtTQUNkLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekUsY0FBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDakMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsWUFBVSxJQUFJLENBQUMsS0FBTyxDQUFDO1NBQy9EO1FBRUQsT0FBTyxJQUFJLENBQUMsR0FBRzthQUNaLE9BQU8sQ0FBQyxjQUFjLENBQUM7YUFDdkIsSUFBSSxDQUFDLFVBQUMsR0FBa0IsSUFBSyxVQUFHLENBQUMsSUFBSSxFQUFSLENBQVEsQ0FBQzthQUN0QyxJQUFJLENBQUMsVUFBQyxZQUFpQjtZQUN0QixJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM5QyxPQUFPLFlBQVksQ0FBQzthQUNyQjtZQUVELElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxFQUFFO2dCQUNwQyxJQUFJO29CQUNGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDakM7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsTUFBTTt3QkFDSixJQUFJLEVBQUUsWUFBWTt3QkFDbEIsS0FBSzt3QkFDTCxJQUFJLEVBQUUsSUFBSTtxQkFDWCxDQUFDO2lCQUNIO2FBQ0Y7WUFFRCxPQUFPLFlBQVksQ0FBQztRQUN0QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxLQUFhO1lBQ25CLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsTUFBTSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDakM7aUJBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDOUIsTUFBTTtvQkFDSixJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNSLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtvQkFDaEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO29CQUNsQixPQUFPLEVBQUUsMkJBQTJCO2lCQUNyQyxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsTUFBTTtvQkFDSixJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNSLEtBQUs7b0JBQ0wsT0FBTyxFQUFFLGVBQWU7aUJBQ3pCLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0ssaUJBQUcsR0FBWCxVQUFpQyxRQUFnQixFQUFFLE1BQW1CO1FBQW5CLG9DQUFtQjtRQUNwRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxrQkFBSSxHQUFaLFVBQWtDLFFBQWdCLEVBQUUsSUFBbUIsRUFBRSxNQUFtQjtRQUF4QyxnQ0FBbUI7UUFBRSxvQ0FBbUI7UUFDMUYsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXJGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBSSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxtQkFBSyxHQUFiLFVBQW1DLFFBQWdCLEVBQUUsSUFBbUIsRUFBRSxNQUFtQjtRQUF4QyxnQ0FBbUI7UUFBRSxvQ0FBbUI7UUFDM0YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXJGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBSSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBRyxHQUFYLFVBQWlDLFFBQWdCLEVBQUUsSUFBbUIsRUFBRSxNQUFtQjtRQUF4QyxnQ0FBbUI7UUFBRSxvQ0FBbUI7UUFDekYsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXJGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBSSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxvQkFBTSxHQUFkLFVBQW9DLFFBQWdCO1FBQ2xELEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWhDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBSSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ssd0JBQVUsR0FBbEI7UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sb0JBQVUsQ0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQWxrQ0QscUJBQXFCO0lBQ1AsY0FBVSxHQUFHLG9CQUFVLENBQUM7SUFra0N4QyxVQUFDO0NBQUE7QUFFRCxrQkFBZSxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2huQ25CLGtIQUF5QztBQUN6QyxvRkFBa0M7QUFFbEM7Ozs7R0FJRztBQUNILFNBQWdCLFVBQVUsQ0FBNEIsS0FBYTtJQUNqRSxJQUFNLGFBQWEsR0FBRyxLQUFLO1NBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDYixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUNqQixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEQsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVqRCxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN4RDtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFiRCxnQ0FhQyIsImZpbGUiOiJkaXJlY3R1cy1zZGsudW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJEaXJlY3R1c1NES1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgLypcbiAgICAgKiBXZSBvbmx5IGRlZmluZSB0aGUgaXMvaGFzKiBmdW5jdGlvbnMgYW5kIHVzZSB0aGVcbiAgICAgKiBkZW1hbmQoKSBmdW5jdGlvbiB0byBidWlsZCB0aGUgZGVtYW5kcywgYWxzbyB0aGVcbiAgICAgKiBnZXREZW1hbmRNZXRob2ROYW1lQnlWYWxpZGF0b3JLZXkoKSAoeWVoLCBJIGtub3cgaXQncyBhbiB1Z2x5IG5hbWUgOigpXG4gICAgICogYnVpbGQgdGhlIGRlbWFuZCBtZXRob2QgYmFzZWQgaW4gdGhlIC5pcy9oYXMgbWV0aG9kc1xuICAgICAqL1xuXG4gICAgdmFyIHYgPSB7IH07XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuQXJndW1lbnRWYWxpZGF0b3IgPSB2O1xuICAgIH1cblxuICAgIHZhciBkZW1hbmQgPSBmdW5jdGlvbiAoZGVtYW5kTWV0aG9kTmFtZSwgdmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUgLyogLi4uIG1vcmUgYXJncywgbmFtZSAqLykge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvci5hcHBseSh2LCBhcmd1bWVudHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuYW1lID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAtMSlbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2LmlzSnNvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG1zZyA9IFwiSW52YWxpZCBcIiArIGRlbWFuZE1ldGhvZE5hbWUgKyBcIiB2YWx1ZTogXCIgKyB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh2LmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbXNnICs9IFwiXFxuQXJndW1lbnQgTmFtZTogXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodi5pc0FycmF5KGFyZ3VtZW50c1sxXSkpIHtcbiAgICAgICAgICAgICAgICBtc2cgKz0gXCJcXG5LZXlzOiBcIiArIGFyZ3VtZW50c1sxXS5qb2luKFwiLCBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXREZW1hbmRNZXRob2ROYW1lQnlWYWxpZGF0b3JLZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBbICdpcycsICdoYXMnIF07XG4gICAgICAgIHZhciBwcmVmaXhMZW5ndGggPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcmVmaXhMZW5ndGggPSBwcmVmaXhbaV0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAoa2V5LnNsaWNlKDAsIHByZWZpeExlbmd0aCkgPT09IHByZWZpeFtpXSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlbWFuZE1ldGhvZE5hbWUgPSBrZXkuc2xpY2UocHJlZml4TGVuZ3RoICsgMSk7XG4gICAgICAgIHZhciBmaXJzdExldHRlciA9IGtleS5zbGljZShwcmVmaXhMZW5ndGgsIHByZWZpeExlbmd0aCArIDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBuYW1lID0gZmlyc3RMZXR0ZXIgKyBkZW1hbmRNZXRob2ROYW1lO1xuXG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG5cbiAgICB2YXIgaGFzS2V5c1dpdGggPSBmdW5jdGlvbiAodmFsaWRhdG9yLCBvYmosIGtleXMpIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0T3JFbXB0eShvYmopIHx8ICF2LmlzQXJyYXlPckVtcHR5KGtleXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5c1tpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yKG9ialtrZXlzW2ldXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdmFyIGlzQXJyYXlPZiA9IGZ1bmN0aW9uICh2YWxpZGF0b3IsIGFycikge1xuICAgICAgICBpZiAoIXYuaXNBcnJheShhcnIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF2YWxpZGF0b3IoYXJyW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB2LmlzTm90TnVsbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgdi5pc0luc3RhbmNlT2YgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH07XG5cbiAgICB2LmlzVHlwZSA9IGZ1bmN0aW9uICh0eXBlLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IFwiICsgdHlwZSArIFwiXVwiO1xuICAgIH07XG5cbiAgICB2LmlzQm9vbGVhbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gKFsgMSwgMCwgdHJ1ZSwgZmFsc2UgXS5pbmRleE9mKHZhbHVlKSA+IC0xKTtcbiAgICB9O1xuXG4gICAgdi5pc1N0cmluZ09yRW1wdHkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHYuaXNUeXBlKFwiU3RyaW5nXCIsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgdi5pc1N0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNTdHJpbmdPckVtcHR5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAvXFxTLy50ZXN0KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgdi5pc051bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNUeXBlKCdOdW1iZXInLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5T3JFbXB0eSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgcmV0dXJuIHYuaXNUeXBlKFwiQXJyYXlcIiwgYXJyKTtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICBpZiAoIXYuaXNBcnJheU9yRW1wdHkoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyci5sZW5ndGggPiAwO1xuICAgIH07XG5cbiAgICB2LmlzQXJyYXlPZk51bWJlcnMgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5T2Yodi5pc051bWJlciwgYXJyKTtcbiAgICB9O1xuXG4gICAgdi5pc0FycmF5T2ZPYmplY3RzID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gaXNBcnJheU9mKHYuaXNPYmplY3QsIGFycik7XG4gICAgfTtcblxuICAgIHYuaXNPYmplY3RPckVtcHR5ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdi5pc1R5cGUoXCJPYmplY3RcIiwgb2JqKTtcbiAgICB9O1xuXG4gICAgdi5pc09iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKCF2LmlzT2JqZWN0T3JFbXB0eShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB2LmlzSnNvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXYuaXNPYmplY3RPckVtcHR5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdi5pc0pzb25TdHJpbmcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF2LmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzTm90TnVsbCwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aE51bWJlciA9IHYuaGFzTnVtYmVyS2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNOdW1iZXIsIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhTdHJpbmcgPSB2Lmhhc1N0cmluZ0tleXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgIHJldHVybiBoYXNLZXlzV2l0aCh2LmlzU3RyaW5nLCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2Lmhhc0tleXNXaXRoT2JqZWN0ID0gdi5oYXNPYmplY3RLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc09iamVjdCwgb2JqLCBrZXlzKTtcbiAgICB9O1xuXG4gICAgdi5oYXNLZXlzV2l0aFN0cmluZ09yRW1wdHkgPSB2Lmhhc1N0cmluZ09yRW1wdHlLZXlzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICAgICAgICByZXR1cm4gaGFzS2V5c1dpdGgodi5pc1N0cmluZ09yRW1wdHksIG9iaiwga2V5cyk7XG4gICAgfTtcblxuICAgIHYuaGFzS2V5c1dpdGhPYmplY3RPckVtcHR5ID0gdi5oYXNPYmplY3RPckVtcHR5S2V5cyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGhhc0tleXNXaXRoKHYuaXNPYmplY3RPckVtcHR5LCBvYmosIGtleXMpO1xuICAgIH07XG5cbiAgICB2LmlzRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHYuaXNJbnN0YW5jZU9mKEZ1bmN0aW9uLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8vIGJ1aWxkIGRlbWFuZCBmdW5jdGlvbnNcbiAgICBmb3IgKHZhciBrZXkgaW4gdikge1xuICAgICAgICB2YXIgZGVtYW5kTWV0aG9kTmFtZSA9IGdldERlbWFuZE1ldGhvZE5hbWVCeVZhbGlkYXRvcktleShrZXkpO1xuICAgICAgICB2W2RlbWFuZE1ldGhvZE5hbWVdID0gZGVtYW5kKGRlbWFuZE1ldGhvZE5hbWUsIHZba2V5XSk7XG4gICAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiLyohIGh0dHA6Ly9tdGhzLmJlL2Jhc2U2NCB2MC4xLjAgYnkgQG1hdGhpYXMgfCBNSVQgbGljZW5zZSAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYC5cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC5cblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLCBhbmQgdXNlXG5cdC8vIGl0IGFzIGByb290YC5cblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgSW52YWxpZENoYXJhY3RlckVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH07XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5cdHZhciBlcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHQvLyBOb3RlOiB0aGUgZXJyb3IgbWVzc2FnZXMgdXNlZCB0aHJvdWdob3V0IHRoaXMgZmlsZSBtYXRjaCB0aG9zZSB1c2VkIGJ5XG5cdFx0Ly8gdGhlIG5hdGl2ZSBgYXRvYmAvYGJ0b2FgIGltcGxlbWVudGF0aW9uIGluIENocm9taXVtLlxuXHRcdHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IobWVzc2FnZSk7XG5cdH07XG5cblx0dmFyIFRBQkxFID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXHQvLyBodHRwOi8vd2hhdHdnLm9yZy9odG1sL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjc3BhY2UtY2hhcmFjdGVyXG5cdHZhciBSRUdFWF9TUEFDRV9DSEFSQUNURVJTID0gL1tcXHRcXG5cXGZcXHIgXS9nO1xuXG5cdC8vIGBkZWNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYXRvYmAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkLiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWF0b2Jcblx0Ly8gVGhlIG9wdGltaXplZCBiYXNlNjQtZGVjb2RpbmcgYWxnb3JpdGhtIHVzZWQgaXMgYmFzZWQgb24gQGF0a+KAmXMgZXhjZWxsZW50XG5cdC8vIGltcGxlbWVudGF0aW9uLiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hdGsvMTAyMDM5NlxuXHR2YXIgZGVjb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dClcblx0XHRcdC5yZXBsYWNlKFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMsICcnKTtcblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdGlmIChsZW5ndGggJSA0ID09IDApIHtcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvPT0/JC8sICcnKTtcblx0XHRcdGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0bGVuZ3RoICUgNCA9PSAxIHx8XG5cdFx0XHQvLyBodHRwOi8vd2hhdHdnLm9yZy9DI2FscGhhbnVtZXJpYy1hc2NpaS1jaGFyYWN0ZXJzXG5cdFx0XHQvW14rYS16QS1aMC05L10vLnRlc3QoaW5wdXQpXG5cdFx0KSB7XG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J0ludmFsaWQgY2hhcmFjdGVyOiB0aGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBiaXRDb3VudGVyID0gMDtcblx0XHR2YXIgYml0U3RvcmFnZTtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0YnVmZmVyID0gVEFCTEUuaW5kZXhPZihpbnB1dC5jaGFyQXQocG9zaXRpb24pKTtcblx0XHRcdGJpdFN0b3JhZ2UgPSBiaXRDb3VudGVyICUgNCA/IGJpdFN0b3JhZ2UgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlcjtcblx0XHRcdC8vIFVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCBvZiBhIGdyb3VwIG9mIDQgY2hhcmFjdGVyc+KAplxuXHRcdFx0aWYgKGJpdENvdW50ZXIrKyAlIDQpIHtcblx0XHRcdFx0Ly8g4oCmY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIGEgc2luZ2xlIEFTQ0lJIGNoYXJhY3Rlci5cblx0XHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdFx0XHRcdFx0MHhGRiAmIGJpdFN0b3JhZ2UgPj4gKC0yICogYml0Q291bnRlciAmIDYpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0Ly8gYGVuY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBidG9hYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQ6IGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYnRvYVxuXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dCk7XG5cdFx0aWYgKC9bXlxcMC1cXHhGRl0vLnRlc3QoaW5wdXQpKSB7XG5cdFx0XHQvLyBOb3RlOiBubyBuZWVkIHRvIHNwZWNpYWwtY2FzZSBhc3RyYWwgc3ltYm9scyBoZXJlLCBhcyBzdXJyb2dhdGVzIGFyZVxuXHRcdFx0Ly8gbWF0Y2hlZCwgYW5kIHRoZSBpbnB1dCBpcyBzdXBwb3NlZCB0byBvbmx5IGNvbnRhaW4gQVNDSUkgYW55d2F5LlxuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdUaGUgc3RyaW5nIHRvIGJlIGVuY29kZWQgY29udGFpbnMgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSAnICtcblx0XHRcdFx0J0xhdGluMSByYW5nZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgcGFkZGluZyA9IGlucHV0Lmxlbmd0aCAlIDM7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHZhciBhO1xuXHRcdHZhciBiO1xuXHRcdHZhciBjO1xuXHRcdHZhciBkO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0Ly8gTWFrZSBzdXJlIGFueSBwYWRkaW5nIGlzIGhhbmRsZWQgb3V0c2lkZSBvZiB0aGUgbG9vcC5cblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoIC0gcGFkZGluZztcblxuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBSZWFkIHRocmVlIGJ5dGVzLCBpLmUuIDI0IGJpdHMuXG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgMTY7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YyA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYiArIGM7XG5cdFx0XHQvLyBUdXJuIHRoZSAyNCBiaXRzIGludG8gZm91ciBjaHVua3Mgb2YgNiBiaXRzIGVhY2gsIGFuZCBhcHBlbmQgdGhlXG5cdFx0XHQvLyBtYXRjaGluZyBjaGFyYWN0ZXIgZm9yIGVhY2ggb2YgdGhlbSB0byB0aGUgb3V0cHV0LlxuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxOCAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiA2ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyICYgMHgzRilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZGRpbmcgPT0gMikge1xuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDg7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMCkgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA+PiA0KSAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgMikgJiAweDNGKSArXG5cdFx0XHRcdCc9J1xuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKHBhZGRpbmcgPT0gMSkge1xuXHRcdFx0YnVmZmVyID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDIpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgNCkgJiAweDNGKSArXG5cdFx0XHRcdCc9PSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHR2YXIgYmFzZTY0ID0ge1xuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQndmVyc2lvbic6ICcwLjEuMCdcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBiYXNlNjQ7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBiYXNlNjQ7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAodmFyIGtleSBpbiBiYXNlNjQpIHtcblx0XHRcdFx0YmFzZTY0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBiYXNlNjRba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5iYXNlNjQgPSBiYXNlNjQ7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2RlZmF1bHQnOiAnUkZDMzk4NicsXG4gICAgZm9ybWF0dGVyczoge1xuICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICAgICAgfSxcbiAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgICBicmFja2V0czogZnVuY3Rpb24gYnJhY2tldHMocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgIH0sXG4gICAgY29tbWE6ICdjb21tYScsXG4gICAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgIH0sXG4gICAgcmVwZWF0OiBmdW5jdGlvbiByZXBlYXQocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIHB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcbnZhciBwdXNoVG9BcnJheSA9IGZ1bmN0aW9uIChhcnIsIHZhbHVlT3JBcnJheSkge1xuICAgIHB1c2guYXBwbHkoYXJyLCBpc0FycmF5KHZhbHVlT3JBcnJheSkgPyB2YWx1ZU9yQXJyYXkgOiBbdmFsdWVPckFycmF5XSk7XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFkZFF1ZXJ5UHJlZml4OiBmYWxzZSxcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGNoYXJzZXQ6ICd1dGYtOCcsXG4gICAgY2hhcnNldFNlbnRpbmVsOiBmYWxzZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBlbmNvZGU6IHRydWUsXG4gICAgZW5jb2RlcjogdXRpbHMuZW5jb2RlLFxuICAgIGVuY29kZVZhbHVlc09ubHk6IGZhbHNlLFxuICAgIGZvcm1hdHRlcjogZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdHNbJ2RlZmF1bHQnXV0sXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGluZGljZXM6IGZhbHNlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeSggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICBvYmplY3QsXG4gICAgcHJlZml4LFxuICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgIHNraXBOdWxscyxcbiAgICBlbmNvZGVyLFxuICAgIGZpbHRlcixcbiAgICBzb3J0LFxuICAgIGFsbG93RG90cyxcbiAgICBzZXJpYWxpemVEYXRlLFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgIGNoYXJzZXRcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAoZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2NvbW1hJyAmJiBpc0FycmF5KG9iaikpIHtcbiAgICAgICAgb2JqID0gb2JqLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQpIDogcHJlZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0KSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZm9ybWF0dGVyKHByZWZpeCkgKyAnPScgKyBmb3JtYXR0ZXIoU3RyaW5nKG9iaikpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICBpZiAoaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgdHlwZW9mIGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdmdW5jdGlvbicgPyBnZW5lcmF0ZUFycmF5UHJlZml4KHByZWZpeCwga2V5KSA6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgICAgICBjaGFyc2V0XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB1c2hUb0FycmF5KHZhbHVlcywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHByZWZpeCArIChhbGxvd0RvdHMgPyAnLicgKyBrZXkgOiAnWycgKyBrZXkgKyAnXScpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgICAgIGNoYXJzZXRcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbnZhciBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5lbmNvZGVyICE9PSBudWxsICYmIG9wdHMuZW5jb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRzLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRW5jb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdHMuY2hhcnNldCB8fCBkZWZhdWx0cy5jaGFyc2V0O1xuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNoYXJzZXQgb3B0aW9uIG11c3QgYmUgZWl0aGVyIHV0Zi04LCBpc28tODg1OS0xLCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5mb3JtYXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICghaGFzLmNhbGwoZm9ybWF0cy5mb3JtYXR0ZXJzLCBvcHRzLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9wdGlvbiBwcm92aWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtYXQgPSBvcHRzLmZvcm1hdDtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXG4gICAgdmFyIGZpbHRlciA9IGRlZmF1bHRzLmZpbHRlcjtcbiAgICBpZiAodHlwZW9mIG9wdHMuZmlsdGVyID09PSAnZnVuY3Rpb24nIHx8IGlzQXJyYXkob3B0cy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdHMuZmlsdGVyO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZFF1ZXJ5UHJlZml4OiB0eXBlb2Ygb3B0cy5hZGRRdWVyeVByZWZpeCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hZGRRdWVyeVByZWZpeCA6IGRlZmF1bHRzLmFkZFF1ZXJ5UHJlZml4LFxuICAgICAgICBhbGxvd0RvdHM6IHR5cGVvZiBvcHRzLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5hbGxvd0RvdHMgOiAhIW9wdHMuYWxsb3dEb3RzLFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmRlbGltaXRlciA6IG9wdHMuZGVsaW1pdGVyLFxuICAgICAgICBlbmNvZGU6IHR5cGVvZiBvcHRzLmVuY29kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGUgOiBkZWZhdWx0cy5lbmNvZGUsXG4gICAgICAgIGVuY29kZXI6IHR5cGVvZiBvcHRzLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyLFxuICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5OiB0eXBlb2Ygb3B0cy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXIsXG4gICAgICAgIHNlcmlhbGl6ZURhdGU6IHR5cGVvZiBvcHRzLnNlcmlhbGl6ZURhdGUgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNlcmlhbGl6ZURhdGUgOiBkZWZhdWx0cy5zZXJpYWxpemVEYXRlLFxuICAgICAgICBza2lwTnVsbHM6IHR5cGVvZiBvcHRzLnNraXBOdWxscyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5za2lwTnVsbHMgOiBkZWZhdWx0cy5za2lwTnVsbHMsXG4gICAgICAgIHNvcnQ6IHR5cGVvZiBvcHRzLnNvcnQgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNvcnQgOiBudWxsLFxuICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHR5cGVvZiBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmdcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBvcHRzKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICB2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cyk7XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICB2YXIgZmlsdGVyO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqID0gZmlsdGVyKCcnLCBvYmopO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvcHRpb25zLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBhcnJheUZvcm1hdDtcbiAgICBpZiAob3B0cyAmJiBvcHRzLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmIChvcHRzICYmICdpbmRpY2VzJyBpbiBvcHRzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5pbmRpY2VzID8gJ2luZGljZXMnIDogJ3JlcGVhdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSAnaW5kaWNlcyc7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlQXJyYXlQcmVmaXggPSBhcnJheVByZWZpeEdlbmVyYXRvcnNbYXJyYXlGb3JtYXRdO1xuXG4gICAgaWYgKCFvYmpLZXlzKSB7XG4gICAgICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICAgICAgb2JqS2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVzaFRvQXJyYXkoa2V5cywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBvcHRpb25zLnNraXBOdWxscyxcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlID8gb3B0aW9ucy5lbmNvZGVyIDogbnVsbCxcbiAgICAgICAgICAgIG9wdGlvbnMuZmlsdGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5zb3J0LFxuICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0RvdHMsXG4gICAgICAgICAgICBvcHRpb25zLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBvcHRpb25zLmZvcm1hdHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgIG9wdGlvbnMuY2hhcnNldFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICB2YXIgam9pbmVkID0ga2V5cy5qb2luKG9wdGlvbnMuZGVsaW1pdGVyKTtcbiAgICB2YXIgcHJlZml4ID0gb3B0aW9ucy5hZGRRdWVyeVByZWZpeCA9PT0gdHJ1ZSA/ICc/JyA6ICcnO1xuXG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpLCB0aGUgXCJudW1lcmljIGVudGl0eVwiIHJlcHJlc2VudGF0aW9uIG9mIGEgY2hlY2ttYXJrXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0ImJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgn4pyTJylcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lRTIlOUMlOTMmJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBqb2luZWQubGVuZ3RoID4gMCA/IHByZWZpeCArIGpvaW5lZCA6ICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICgob3B0aW9ucyAmJiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpKSB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgIWlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmIGlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SXRlbSA9IHRhcmdldFtpXTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SXRlbSAmJiB0eXBlb2YgdGFyZ2V0SXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gbWVyZ2UodGFyZ2V0SXRlbSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0ciwgZGVjb2RlciwgY2hhcnNldCkge1xuICAgIHZhciBzdHJXaXRob3V0UGx1cyA9IHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIC8vIHVuZXNjYXBlIG5ldmVyIHRocm93cywgbm8gdHJ5Li4uY2F0Y2ggbmVlZGVkOlxuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXMucmVwbGFjZSgvJVswLTlhLWZdezJ9L2dpLCB1bmVzY2FwZSk7XG4gICAgfVxuICAgIC8vIHV0Zi04XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHJXaXRob3V0UGx1cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXM7XG4gICAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIsIGRlZmF1bHRFbmNvZGVyLCBjaGFyc2V0KSB7XG4gICAgLy8gVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgQnJpYW4gV2hpdGUgKG1zY2RleCkgZm9yIHRoZSBpby5qcyBjb3JlIHF1ZXJ5c3RyaW5nIGxpYnJhcnkuXG4gICAgLy8gSXQgaGFzIGJlZW4gYWRhcHRlZCBoZXJlIGZvciBzdHJpY3RlciBhZGhlcmVuY2UgdG8gUkZDIDM5ODZcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHZhciBzdHJpbmcgPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHN0ciA6IFN0cmluZyhzdHIpO1xuXG4gICAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICByZXR1cm4gZXNjYXBlKHN0cmluZykucmVwbGFjZSgvJXVbMC05YS1mXXs0fS9naSwgZnVuY3Rpb24gKCQwKSB7XG4gICAgICAgICAgICByZXR1cm4gJyUyNiUyMycgKyBwYXJzZUludCgkMC5zbGljZSgyKSwgMTYpICsgJyUzQic7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGMgPT09IDB4MkQgLy8gLVxuICAgICAgICAgICAgfHwgYyA9PT0gMHgyRSAvLyAuXG4gICAgICAgICAgICB8fCBjID09PSAweDVGIC8vIF9cbiAgICAgICAgICAgIHx8IGMgPT09IDB4N0UgLy8gflxuICAgICAgICAgICAgfHwgKGMgPj0gMHgzMCAmJiBjIDw9IDB4MzkpIC8vIDAtOVxuICAgICAgICAgICAgfHwgKGMgPj0gMHg0MSAmJiBjIDw9IDB4NUEpIC8vIGEtelxuICAgICAgICAgICAgfHwgKGMgPj0gMHg2MSAmJiBjIDw9IDB4N0EpIC8vIEEtWlxuICAgICAgICApIHtcbiAgICAgICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIGhleFRhYmxlW2NdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IChjID4+IDYpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IChjID4+IDEyKV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNGRikgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpKTtcbiAgICAgICAgb3V0ICs9IGhleFRhYmxlWzB4RjAgfCAoYyA+PiAxOCldXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gMTIpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG52YXIgY29tcGFjdCA9IGZ1bmN0aW9uIGNvbXBhY3QodmFsdWUpIHtcbiAgICB2YXIgcXVldWUgPSBbeyBvYmo6IHsgbzogdmFsdWUgfSwgcHJvcDogJ28nIH1dO1xuICAgIHZhciByZWZzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWVbaV07XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tqXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwgJiYgcmVmcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCh7IG9iajogb2JqLCBwcm9wOiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgcmVmcy5wdXNoKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wYWN0UXVldWUocXVldWUpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxudmFyIGlzUmVnRXhwID0gZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn07XG5cbnZhciBpc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyKG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuXG52YXIgY29tYmluZSA9IGZ1bmN0aW9uIGNvbWJpbmUoYSwgYikge1xuICAgIHJldHVybiBbXS5jb25jYXQoYSwgYik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhcnJheVRvT2JqZWN0OiBhcnJheVRvT2JqZWN0LFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGNvbWJpbmU6IGNvbWJpbmUsXG4gICAgY29tcGFjdDogY29tcGFjdCxcbiAgICBkZWNvZGU6IGRlY29kZSxcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gICAgaXNSZWdFeHA6IGlzUmVnRXhwLFxuICAgIG1lcmdlOiBtZXJnZVxufTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImltcG9ydCAqIGFzIEFWIGZyb20gJ2FyZ3VtZW50LXZhbGlkYXRvcic7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0ICogYXMgcXNTdHJpbmdpZnkgZnJvbSAncXMvbGliL3N0cmluZ2lmeSc7XG5cbi8vIEhUVFAgc2NoZW1lc1xuaW1wb3J0IHsgQm9keVR5cGUgfSBmcm9tICcuL3NjaGVtZXMvaHR0cC9Cb2R5JztcbmltcG9ydCB7IFJlcXVlc3RNZXRob2QgfSBmcm9tICcuL3NjaGVtZXMvaHR0cC9SZXF1ZXN0JztcblxuLy8gQXV0aGVudGljYXRpb24gc2NoZW1lc1xuaW1wb3J0IHsgSUxvZ2luQ3JlZGVudGlhbHMsIElMb2dpbk9wdGlvbnMgfSBmcm9tICcuL3NjaGVtZXMvYXV0aC9Mb2dpbic7XG5cbi8vIFJlc3BvbnNlIHNjaGVtZXNcbmltcG9ydCB7IElBY3Rpdml0eVJlc3BvbnNlIH0gZnJvbSAnLi9zY2hlbWVzL3Jlc3BvbnNlL0FjdGl2aXR5JztcbmltcG9ydCB7IElDb2xsZWN0aW9uUmVzcG9uc2UsIElDb2xsZWN0aW9uc1Jlc3BvbnNlIH0gZnJvbSAnLi9zY2hlbWVzL3Jlc3BvbnNlL0NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgSUVycm9yIH0gZnJvbSAnLi9zY2hlbWVzL3Jlc3BvbnNlL0Vycm9yJztcbmltcG9ydCB7IElGaWVsZCB9IGZyb20gJy4vc2NoZW1lcy9yZXNwb25zZS9GaWVsZCc7XG5pbXBvcnQgeyBJTG9naW5SZXNwb25zZSB9IGZyb20gJy4vc2NoZW1lcy9yZXNwb25zZS9Mb2dpbic7XG5pbXBvcnQgeyBJUmV2aXNpb25SZXNwb25zZSB9IGZyb20gJy4vc2NoZW1lcy9yZXNwb25zZS9SZXZpc2lvbic7XG5pbXBvcnQgeyBJUm9sZVJlc3BvbnNlIH0gZnJvbSAnLi9zY2hlbWVzL3Jlc3BvbnNlL1JvbGUnO1xuaW1wb3J0IHsgSVJlZnJlc2hUb2tlblJlc3BvbnNlIH0gZnJvbSAnLi9zY2hlbWVzL3Jlc3BvbnNlL1Rva2VuJztcbmltcG9ydCB7IElVc2VyUmVzcG9uc2UsIElVc2Vyc1Jlc3BvbnNlIH0gZnJvbSAnLi9zY2hlbWVzL3Jlc3BvbnNlL1VzZXInO1xuXG5pbXBvcnQgeyBnZXRQYXlsb2FkIH0gZnJvbSAnLi9wYXlsb2FkJztcbmltcG9ydCB7IElDbGllbnRPcHRpb25zLCBJU3RvcmFnZSwgUHJpbWFyeUtleVR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuY2xhc3MgU0RLIHtcbiAgLyoqXG4gICAqIElmIHRoZSBjdXJyZW50IGF1dGggc3RhdHVzIGlzIGxvZ2dlZCBpblxuICAgKi9cbiAgcHVibGljIGdldCBsb2dnZWRJbigpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICBBVi5pc1N0cmluZyh0aGlzLnRva2VuKSAmJlxuICAgICAgQVYuaXNTdHJpbmcodGhpcy51cmwpICYmXG4gICAgICBBVi5pc1N0cmluZyh0aGlzLnByb2plY3QpICYmXG4gICAgICBBVi5pc09iamVjdCh0aGlzLmdldFBheWxvYWQoKSlcbiAgICApIHtcbiAgICAgIGlmICh0aGlzLmxvY2FsRXhwID4gRGF0ZS5ub3coKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gY29udmVuaWVuY2UgbWV0aG9kXG4gIHB1YmxpYyBzdGF0aWMgZ2V0UGF5bG9hZCA9IGdldFBheWxvYWQ7XG5cbiAgcHJpdmF0ZSB0b2tlbjogc3RyaW5nO1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICBwcml2YXRlIHByb2plY3Q6IHN0cmluZyA9ICdfJztcbiAgcHJpdmF0ZSBsb2NhbEV4cD86IG51bWJlcjtcbiAgcHJpdmF0ZSBzdG9yYWdlPzogSVN0b3JhZ2U7XG4gIHByaXZhdGUgcmVmcmVzaEludGVydmFsPzogbnVtYmVyO1xuICBwcml2YXRlIG9uQXV0b1JlZnJlc2hFcnJvcj86IChtc2c6IG9iamVjdCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBvbkF1dG9SZWZyZXNoU3VjY2Vzcz86IChtc2c6IElDbGllbnRPcHRpb25zKSA9PiB2b2lkO1xuICBwcml2YXRlIHJlYWRvbmx5IHhociA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgcGFyYW1zU2VyaWFsaXplcjogcXNTdHJpbmdpZnksXG4gICAgdGltZW91dDogMTAgKiA2MCAqIDEwMDAsIC8vIDEwIG1pblxuICB9KTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFNESyBpbnN0YW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSUNsaWVudE9wdGlvbnMgPSB7IHVybDogJyNuby11cmwtc3BlY2lmaWVkJyB9KSB7XG4gICAgaWYgKG9wdGlvbnMuc3RvcmFnZSkge1xuICAgICAgbGV0IHN0b3JlZEluZm8gPSBvcHRpb25zLnN0b3JhZ2UuZ2V0SXRlbSgnZGlyZWN0dXMtc2RrLWpzJyk7XG5cbiAgICAgIGlmIChzdG9yZWRJbmZvKSB7XG4gICAgICAgIHN0b3JlZEluZm8gPSBKU09OLnBhcnNlKHN0b3JlZEluZm8pO1xuXG4gICAgICAgIHRoaXMudG9rZW4gPSBzdG9yZWRJbmZvLnRva2VuO1xuICAgICAgICB0aGlzLnVybCA9IHN0b3JlZEluZm8udXJsO1xuICAgICAgICB0aGlzLnByb2plY3QgPSBzdG9yZWRJbmZvLnByb2plY3Q7XG4gICAgICAgIHRoaXMubG9jYWxFeHAgPSBzdG9yZWRJbmZvLmxvY2FsRXhwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnRva2VuKSB7XG4gICAgICB0aGlzLnRva2VuID0gb3B0aW9ucy50b2tlbjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudXJsKSB7XG4gICAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5wcm9qZWN0KSB7XG4gICAgICB0aGlzLnByb2plY3QgPSBvcHRpb25zLnByb2plY3Q7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxvY2FsRXhwKSB7XG4gICAgICB0aGlzLmxvY2FsRXhwID0gb3B0aW9ucy5sb2NhbEV4cDtcbiAgICB9XG5cbiAgICAvLyBPbmx5IHN0YXJ0IHRoZSBhdXRvIHJlZnJlc2ggaW50ZXJ2YWwgaWYgdGhlIHRva2VuIGV4aXN0cyBhbmQgaXQncyBhIEpXVFxuICAgIGlmICh0aGlzLnRva2VuICYmIHRoaXMudG9rZW4uaW5jbHVkZXMoJy4nKSkge1xuICAgICAgdGhpcy5zdGFydEludGVydmFsKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vLyBBVVRIRU5USUNBVElPTiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBMb2dpbiB0byB0aGUgQVBJOyBHZXRzIGEgbmV3IHRva2VuIGZyb20gdGhlIEFQSSBhbmQgc3RvcmVzIGl0IGluIHRoaXMudG9rZW4uXG4gICAqL1xuICBwdWJsaWMgbG9naW4oXG4gICAgY3JlZGVudGlhbHM6IElMb2dpbkNyZWRlbnRpYWxzLFxuICAgIG9wdGlvbnM6IElMb2dpbk9wdGlvbnMgPSB7IHBlcnNpc3Q6IHRydWUsIHN0b3JhZ2U6IGZhbHNlIH1cbiAgKTogUHJvbWlzZTxJTG9naW5SZXNwb25zZT4ge1xuICAgIEFWLm9iamVjdChjcmVkZW50aWFscywgJ2NyZWRlbnRpYWxzJyk7XG4gICAgQVYua2V5c1dpdGhTdHJpbmcoY3JlZGVudGlhbHMsIFsnZW1haWwnLCAncGFzc3dvcmQnXSwgJ2NyZWRlbnRpYWxzJyk7XG5cbiAgICB0aGlzLnRva2VuID0gbnVsbDtcblxuICAgIGlmIChBVi5oYXNLZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgWyd1cmwnXSkpIHtcbiAgICAgIHRoaXMudXJsID0gY3JlZGVudGlhbHMudXJsO1xuICAgIH1cblxuICAgIGlmIChBVi5oYXNLZXlzV2l0aFN0cmluZyhjcmVkZW50aWFscywgWydwcm9qZWN0J10pKSB7XG4gICAgICB0aGlzLnByb2plY3QgPSBjcmVkZW50aWFscy5wcm9qZWN0O1xuICAgIH1cblxuICAgIGlmIChjcmVkZW50aWFscy5wZXJzaXN0IHx8IG9wdGlvbnMucGVyc2lzdCkge1xuICAgICAgdGhpcy5zdGFydEludGVydmFsKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucG9zdCgnL2F1dGgvYXV0aGVudGljYXRlJywge1xuICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXM6IHsgZGF0YTogeyB0b2tlbjogc3RyaW5nIH0gfSkgPT4gcmVzLmRhdGEudG9rZW4pXG4gICAgICAgIC50aGVuKCh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xuXG4gICAgICAgICAgLy8gRXhwaXJ5IGRhdGUgaXMgdGhlIG1vbWVudCB3ZSBnb3QgdGhlIHRva2VuICsgNSBtaW51dGVzXG4gICAgICAgICAgdGhpcy5sb2NhbEV4cCA9IG5ldyBEYXRlKERhdGUubm93KCkgKyA1ICogNjAwMDApLmdldFRpbWUoKTtcblxuICAgICAgICAgIGlmICh0aGlzLnN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgICAnZGlyZWN0dXMtc2RrLWpzJyxcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGxvY2FsRXhwOiB0aGlzLmxvY2FsRXhwLFxuICAgICAgICAgICAgICAgIHByb2plY3Q6IHRoaXMucHJvamVjdCxcbiAgICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGxvY2FsRXhwOiB0aGlzLmxvY2FsRXhwLFxuICAgICAgICAgICAgcHJvamVjdDogdGhpcy5wcm9qZWN0LFxuICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSB1c2VyIG91dCBieSBcImZvcmdldHRpbmdcIiB0aGUgdG9rZW4sIGFuZCBjbGVhcmluZyB0aGUgcmVmcmVzaCBpbnRlcnZhbFxuICAgKi9cbiAgcHVibGljIGxvZ291dCgpOiB2b2lkIHtcbiAgICB0aGlzLnRva2VuID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdG9yYWdlKSB7XG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGlyZWN0dXMtc2RrLWpzJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgY2xpZW50IGluc3RhbmNlIGJ5IGxvZ2dpbmcgb3V0IGFuZCByZW1vdmluZyB0aGUgVVJMIGFuZCBwcm9qZWN0XG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2dvdXQoKTtcbiAgICB0aGlzLnVybCA9IG51bGw7XG4gICAgdGhpcy5wcm9qZWN0ID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIHRoZSB0b2tlbiBpZiBpdCBpcyBhYm91dCB0byBleHBpcmUgKHdpdGhpbiAzMCBzZWNvbmRzIG9mIGV4cGlyeSBkYXRlKS5cbiAgICogLSBDYWxscyBvbkF1dG9SZWZyZXNoU3VjY2VzcyB3aXRoIHRoZSBuZXcgdG9rZW4gaWYgdGhlIHJlZnJlc2hpbmcgaXMgc3VjY2Vzc2Z1bC5cbiAgICogLSBDYWxscyBvbkF1dG9SZWZyZXNoRXJyb3IgaWYgcmVmcmVzaGluZyB0aGUgdG9rZW4gZmFpbHMgZm9yIHNvbWUgcmVhc29uLlxuICAgKiBAcmV0dXJucyB7W2Jvb2xlYW4sIEVycm9yP119XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaElmTmVlZGVkKCk6IFByb21pc2U8W2Jvb2xlYW4sIEVycm9yP10+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRQYXlsb2FkPHsgZXhwOiBhbnkgfT4oKTtcblxuICAgIGlmICghQVYuaGFzU3RyaW5nS2V5cyh0aGlzLCBbJ3Rva2VuJywgJ3VybCcsICdwcm9qZWN0J10pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFwYXlsb2FkIHx8ICFwYXlsb2FkLmV4cCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRpbWVEaWZmID0gdGhpcy5sb2NhbEV4cCAtIERhdGUubm93KCk7XG5cbiAgICBpZiAodGltZURpZmYgPD0gMCkge1xuICAgICAgaWYgKEFWLmlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IpKSB7XG4gICAgICAgIHRoaXMub25BdXRvUmVmcmVzaEVycm9yKHtcbiAgICAgICAgICBjb2RlOiAxMDIsXG4gICAgICAgICAgbWVzc2FnZTogJ2F1dGhfZXhwaXJlZF90b2tlbicsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aW1lRGlmZiA8IDMwMDAwKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8W2Jvb2xlYW4sIEVycm9yP10+KChyZXNvbHZlOiAocmVzOiBbYm9vbGVhbiwgRXJyb3I/XSkgPT4gYW55KSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaCh0aGlzLnRva2VuKVxuICAgICAgICAgIC50aGVuKChyZXM6IElSZWZyZXNoVG9rZW5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHJlcy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgdGhpcy5sb2NhbEV4cCA9IG5ldyBEYXRlKERhdGUubm93KCkgKyA1ICogNjAwMDApLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgLy8gaWYgYXV0b3JlZnJlc2ggc3VjY2VlZGVkXG4gICAgICAgICAgICBpZiAoQVYuaXNGdW5jdGlvbih0aGlzLm9uQXV0b1JlZnJlc2hTdWNjZXNzKSkge1xuICAgICAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hTdWNjZXNzKHtcbiAgICAgICAgICAgICAgICBsb2NhbEV4cDogdGhpcy5sb2NhbEV4cCxcbiAgICAgICAgICAgICAgICBwcm9qZWN0OiB0aGlzLnByb2plY3QsXG4gICAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJlc29sdmUoW3RydWVdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgZXhwaXJhdGlvbiB2aWEgc3RvcmFnZVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RvcmFnZSkge1xuICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICAgICAnZGlyZWN0dXMtc2RrLWpzJyxcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICBsb2NhbEV4cDogdGhpcy5sb2NhbEV4cCxcbiAgICAgICAgICAgICAgICAgIHByb2plY3Q6IHRoaXMucHJvamVjdCxcbiAgICAgICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXNvbHZlKFt0cnVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKEFWLmlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IpKSB7XG4gICAgICAgICAgICAgIHRoaXMub25BdXRvUmVmcmVzaEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUoW3RydWUsIGVycm9yXSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKFtmYWxzZV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIHBhc3NlZCB0b2tlbiB0byByZXF1ZXN0IGEgbmV3IG9uZVxuICAgKi9cbiAgcHVibGljIHJlZnJlc2godG9rZW46IHN0cmluZyk6IFByb21pc2U8SVJlZnJlc2hUb2tlblJlc3BvbnNlPiB7XG4gICAgQVYuc3RyaW5nKHRva2VuLCAndG9rZW4nKTtcbiAgICByZXR1cm4gdGhpcy5wb3N0PElSZWZyZXNoVG9rZW5SZXNwb25zZT4oJy9hdXRoL3JlZnJlc2gnLCB7IHRva2VuIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcXVlc3QgdG8gcmVzZXQgdGhlIHBhc3N3b3JkIG9mIHRoZSB1c2VyIHdpdGggdGhlIGdpdmVuIGVtYWlsIGFkZHJlc3MuXG4gICAqIFRoZSBBUEkgd2lsbCBzZW5kIGFuIGVtYWlsIHRvIHRoZSBnaXZlbiBlbWFpbCBhZGRyZXNzIHdpdGggYSBsaW5rIHRvIGdlbmVyYXRlIGEgbmV3XG4gICAqIHRlbXBvcmFyeSBwYXNzd29yZC5cbiAgICovXG4gIHB1YmxpYyByZXF1ZXN0UGFzc3dvcmRSZXNldDxUIGV4dGVuZHMgYW55ID0gYW55PihlbWFpbDogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgQVYuc3RyaW5nKGVtYWlsLCAnZW1haWwnKTtcbiAgICByZXR1cm4gdGhpcy5wb3N0PFQ+KCcvYXV0aC9wYXNzd29yZC9yZXF1ZXN0Jywge1xuICAgICAgZW1haWwsXG4gICAgfSk7XG4gIH1cblxuICAvLy8gQUNUSVZJVFkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IGFjdGl2aXR5XG4gICAqL1xuICBwdWJsaWMgZ2V0QWN0aXZpdHkocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SUFjdGl2aXR5UmVzcG9uc2U+IHtcbiAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgJ3BhcmFtcycpO1xuICAgIHJldHVybiB0aGlzLmdldDxJQWN0aXZpdHlSZXNwb25zZT4oJy9hY3Rpdml0eScsIHBhcmFtcyk7XG4gIH1cblxuICAvLy8gQk9PS01BUktTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IHRoZSBib29rbWFya3Mgb2YgdGhlIGN1cnJlbnQgdXNlclxuICAgKiBUT0RPOiBBZGQgZGVwcmVjYXRpb24gd2FybmluZ1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hZHZhbmNlZC9sZWdhY3ktdXBncmFkZXMuaHRtbCNkaXJlY3R1cy1ib29rbWFya3NcbiAgICovXG4gIHB1YmxpYyBnZXRNeUJvb2ttYXJrczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4ocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIEFWLnN0cmluZyh0aGlzLnRva2VuLCAndGhpcy50b2tlbicpO1xuICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zKTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmdldFBheWxvYWQ8eyBpZDogc3RyaW5nOyByb2xlOiBzdHJpbmcgfT4oKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmdldCgnL2NvbGxlY3Rpb25fcHJlc2V0cycsIHtcbiAgICAgICAgJ2ZpbHRlclt0aXRsZV1bbm51bGxdJzogMSxcbiAgICAgICAgJ2ZpbHRlclt1c2VyXVtlcV0nOiBwYXlsb2FkLmlkLFxuICAgICAgfSksXG4gICAgICB0aGlzLmdldCgnL2NvbGxlY3Rpb25fcHJlc2V0cycsIHtcbiAgICAgICAgJ2ZpbHRlcltyb2xlXVtlcV0nOiBwYXlsb2FkLnJvbGUsXG4gICAgICAgICdmaWx0ZXJbdGl0bGVdW25udWxsXSc6IDEsXG4gICAgICAgICdmaWx0ZXJbdXNlcl1bbnVsbF0nOiAxLFxuICAgICAgfSksXG4gICAgXSkudGhlbigodmFsdWVzOiBBcnJheTx7IGRhdGE6IGFueSB9PikgPT4ge1xuICAgICAgY29uc3QgW3VzZXIsIHJvbGVdID0gdmFsdWVzO1xuICAgICAgcmV0dXJuIFsuLi4odXNlci5kYXRhIHx8IFtdKSwgLi4uKHJvbGUuZGF0YSB8fCBbXSldIGFzIFQ7XG4gICAgfSk7XG4gIH1cblxuICAvLy8gQ09MTEVDVElPTlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IGFsbCBhdmFpbGFibGUgY29sbGVjdGlvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRDb2xsZWN0aW9ucyhwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxJQ29sbGVjdGlvbnNSZXNwb25zZVtdPiB7XG4gICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsICdwYXJhbXMnKTtcbiAgICByZXR1cm4gdGhpcy5nZXQ8SUNvbGxlY3Rpb25zUmVzcG9uc2VbXT4oJy9jb2xsZWN0aW9ucycsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbGxlY3Rpb24gaW5mbyBieSBuYW1lXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29sbGVjdGlvbihjb2xsZWN0aW9uOiBzdHJpbmcsIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPElDb2xsZWN0aW9uUmVzcG9uc2U+IHtcbiAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgJ2NvbGxlY3Rpb24nKTtcbiAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgJ3BhcmFtcycpO1xuICAgIHJldHVybiB0aGlzLmdldDxJQ29sbGVjdGlvblJlc3BvbnNlPihgL2NvbGxlY3Rpb25zLyR7Y29sbGVjdGlvbn1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNvbGxlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDb2xsZWN0aW9uKGRhdGE6IG9iamVjdCk6IFByb21pc2U8SUNvbGxlY3Rpb25SZXNwb25zZT4ge1xuICAgIEFWLm9iamVjdChkYXRhLCAnZGF0YScpO1xuICAgIHJldHVybiB0aGlzLnBvc3Q8SUNvbGxlY3Rpb25SZXNwb25zZT4oJy9jb2xsZWN0aW9ucycsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYSBjZXJ0YWluIGNvbGxlY3Rpb25cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVDb2xsZWN0aW9uKGNvbGxlY3Rpb246IHN0cmluZywgZGF0YTogb2JqZWN0KTogUHJvbWlzZTxJQ29sbGVjdGlvblJlc3BvbnNlPiB7XG4gICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sICdjb2xsZWN0aW9uJyk7XG4gICAgQVYub2JqZWN0KGRhdGEsICdkYXRhJyk7XG4gICAgcmV0dXJuIHRoaXMucGF0Y2g8SUNvbGxlY3Rpb25SZXNwb25zZT4oYC9jb2xsZWN0aW9ucy8ke2NvbGxlY3Rpb259YCwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhIGNlcnRhaW4gY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sICdjb2xsZWN0aW9uJyk7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlPHZvaWQ+KGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWApO1xuICB9XG5cbiAgLy8vIENPTExFQ1RJT04gUFJFU0VUUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBjb2xsZWN0aW9uIHByZXNldCAoYm9va21hcmsgLyBsaXN0aW5nIHByZWZlcmVuY2VzKVxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUNvbGxlY3Rpb25QcmVzZXQ8VCBleHRlbmRzIGFueSA9IGFueT4oZGF0YTogb2JqZWN0KTogUHJvbWlzZTxUPiB7XG4gICAgQVYub2JqZWN0KGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnBvc3Q8VD4oJy9jb2xsZWN0aW9uX3ByZXNldHMnLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgY29sbGVjdGlvbiBwcmVzZXQgKGJvb2ttYXJrIC8gbGlzdGluZyBwcmVmZXJlbmNlKVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUNvbGxlY3Rpb25QcmVzZXQ8VCBleHRlbmRzIGFueSA9IGFueT4ocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIGRhdGE6IG9iamVjdCk6IFByb21pc2U8VD4ge1xuICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgJ3ByaW1hcnlLZXknKTtcbiAgICBBVi5vYmplY3QoZGF0YSwgJ2RhdGEnKTtcblxuICAgIHJldHVybiB0aGlzLnBhdGNoPFQ+KGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgY29sbGVjdGlvbiBwcmVzZXQgYnkgcHJpbWFyeWtleVxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUNvbGxlY3Rpb25QcmVzZXQocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksICdwcmltYXJ5S2V5Jyk7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlPHZvaWQ+KGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gKTtcbiAgfVxuXG4gIC8vLyBEQVRBQkFTRSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBUaGlzIHdpbGwgdXBkYXRlIHRoZSBkYXRhYmFzZSBvZiB0aGUgQVBJIGluc3RhbmNlIHRvIHRoZSBsYXRlc3QgdmVyc2lvblxuICAgKiB1c2luZyB0aGUgbWlncmF0aW9ucyBpbiB0aGUgQVBJXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlRGF0YWJhc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCgnL3VwZGF0ZScpO1xuICB9XG5cbiAgLy8vIEVYVEVOU0lPTlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWV0YSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIGludGVyZmFjZXNcbiAgICovXG4gIHB1YmxpYyBnZXRJbnRlcmZhY2VzPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KCk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VD4oJ2dldCcsICcvaW50ZXJmYWNlcycsIHt9LCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtZXRhIGluZm9ybWF0aW9uIG9mIGFsbCBpbnN0YWxsZWQgbGF5b3V0c1xuICAgKi9cbiAgcHVibGljIGdldExheW91dHM8VCBleHRlbmRzIGFueSA9IGFueT4oKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxUPignZ2V0JywgJy9sYXlvdXRzJywge30sIHt9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1ldGEgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBwYWdlc1xuICAgKi9cbiAgcHVibGljIGdldFBhZ2VzPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KCk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VD4oJ2dldCcsICcvcGFnZXMnLCB7fSwge30sIHRydWUpO1xuICB9XG5cbiAgLy8vIEZJRUxEUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEdldCBhbGwgZmllbGRzIHRoYXQgYXJlIGluIERpcmVjdHVzXG4gICAqL1xuICBwdWJsaWMgZ2V0QWxsRmllbGRzPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgJ3BhcmFtcycpO1xuICAgIHJldHVybiB0aGlzLmdldDxUPignL2ZpZWxkcycsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmaWVsZHMgdGhhdCBoYXZlIGJlZW4gc2V0dXAgZm9yIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGdldEZpZWxkczxUIGV4dGVuZHMgYW55ID0gYW55Pihjb2xsZWN0aW9uOiBzdHJpbmcsIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgJ2NvbGxlY3Rpb24nKTtcbiAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgJ3BhcmFtcycpO1xuICAgIHJldHVybiB0aGlzLmdldDxUPihgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZpZWxkIGluZm9ybWF0aW9uIGZvciBhIHNpbmdsZSBnaXZlbiBmaWVsZFxuICAgKi9cbiAgcHVibGljIGdldEZpZWxkPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGNvbGxlY3Rpb246IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcsIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgJ2NvbGxlY3Rpb24nKTtcbiAgICBBVi5zdHJpbmcoZmllbGROYW1lLCAnZmllbGROYW1lJyk7XG4gICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsICdwYXJhbXMnKTtcbiAgICByZXR1cm4gdGhpcy5nZXQ8VD4oYC9maWVsZHMvJHtjb2xsZWN0aW9ufS8ke2ZpZWxkTmFtZX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGZpZWxkIGluIHRoZSBnaXZlbiBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRmllbGQ8VCBleHRlbmRzIGFueSA9IGFueT4oY29sbGVjdGlvbjogc3RyaW5nLCBmaWVsZEluZm86IG9iamVjdCk6IFByb21pc2U8VD4ge1xuICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCAnY29sbGVjdGlvbicpO1xuICAgIEFWLm9iamVjdChmaWVsZEluZm8sICdmaWVsZEluZm8nKTtcbiAgICByZXR1cm4gdGhpcy5wb3N0PFQ+KGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBmaWVsZEluZm8pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIGdpdmVuIGZpZWxkIGluIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUZpZWxkPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGNvbGxlY3Rpb246IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcsIGZpZWxkSW5mbzogb2JqZWN0KTogUHJvbWlzZTxUPiB7XG4gICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sICdjb2xsZWN0aW9uJyk7XG4gICAgQVYuc3RyaW5nKGZpZWxkTmFtZSwgJ2ZpZWxkTmFtZScpO1xuICAgIEFWLm9iamVjdChmaWVsZEluZm8sICdmaWVsZEluZm8nKTtcbiAgICByZXR1cm4gdGhpcy5wYXRjaDxUPihgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWAsIGZpZWxkSW5mbyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIG11bHRpcGxlIGZpZWxkcyBhdCBvbmNlXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIC8vIFNldCBtdWx0aXBsZSBmaWVsZHMgdG8gdGhlIHNhbWUgdmFsdWVcbiAgICogdXBkYXRlRmllbGRzKFwicHJvamVjdHNcIiwgW1wiZmlyc3RfbmFtZVwiLCBcImxhc3RfbmFtZVwiLCBcImVtYWlsXCJdLCB7XG4gICAqICAgZGVmYXVsdF92YWx1ZTogXCJcIlxuICAgKiB9KVxuICAgKlxuICAgKiAvLyBTZXQgbXVsdGlwbGUgZmllbGRzIHRvIGRpZmZlcmVudCB2YWx1ZXNcbiAgICogdXBkYXRlRmllbGRzKFwicHJvamVjdHNcIiwgW1xuICAgKiAgIHtcbiAgICogICAgIGlkOiAxNCxcbiAgICogICAgIHNvcnQ6IDFcbiAgICogICB9LFxuICAgKiAgIHtcbiAgICogICAgIGlkOiAxNyxcbiAgICogICAgIHNvcnQ6IDJcbiAgICogICB9LFxuICAgKiAgIHtcbiAgICogICAgIGlkOiA5MTIsXG4gICAqICAgICBzb3J0OiAzXG4gICAqICAgfVxuICAgKiBdKVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUZpZWxkczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGZpZWxkc0luZm9PckZpZWxkTmFtZXM6IHN0cmluZ1tdIHwgb2JqZWN0W10sXG4gICAgZmllbGRJbmZvOiBvYmplY3QgPSBudWxsXG4gICk6IFByb21pc2U8SUZpZWxkPFQ+IHwgdW5kZWZpbmVkPiB7XG4gICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sICdjb2xsZWN0aW9uJyk7XG4gICAgQVYuYXJyYXkoZmllbGRzSW5mb09yRmllbGROYW1lcywgJ2ZpZWxkc0luZm9PckZpZWxkTmFtZXMnKTtcblxuICAgIGlmIChmaWVsZEluZm8pIHtcbiAgICAgIEFWLm9iamVjdChmaWVsZEluZm8pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluZm8pIHtcbiAgICAgIHJldHVybiB0aGlzLnBhdGNoKGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLmpvaW4oJywnKX1gLCBmaWVsZEluZm8pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhdGNoKGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBmaWVsZCBmcm9tIGEgY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUZpZWxkKGNvbGxlY3Rpb246IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgJ2NvbGxlY3Rpb24nKTtcbiAgICBBVi5zdHJpbmcoZmllbGROYW1lLCAnZmllbGROYW1lJyk7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlKGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCk7XG4gIH1cblxuICAvLy8gRklMRVMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogVXBsb2FkIG11bHRpcGFydCBmaWxlcyBpbiBtdWx0aXBhcnQvZm9ybS1kYXRhXG4gICAqL1xuICBwdWJsaWMgdXBsb2FkRmlsZXM8VCBleHRlbmRzIGFueSA9IGFueVtdPihkYXRhOiBvYmplY3QsIG9uVXBsb2FkUHJvZ3Jlc3M6ICgpID0+IG9iamVjdCA9ICgpID0+ICh7fSkpOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YCxcbiAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnhoclxuICAgICAgLnBvc3QoYCR7dGhpcy51cmx9LyR7dGhpcy5wcm9qZWN0fS9maWxlc2AsIGRhdGEsIHtcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzOiB7IGRhdGE6IGFueSB9KSA9PiByZXMuZGF0YSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IElFcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIGNvZGU6IC0xLFxuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICBtZXNzYWdlOiAnTmV0d29yayBFcnJvcicsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvLy8gSVRFTVMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIGl0ZW1cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVJdGVtPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSxcbiAgICBib2R5OiBCb2R5VHlwZSxcbiAgICBwYXJhbXM6IG9iamVjdCA9IHt9XG4gICk6IFByb21pc2U8VD4ge1xuICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCAnY29sbGVjdGlvbicpO1xuICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgJ3ByaW1hcnlLZXknKTtcbiAgICBBVi5vYmplY3QoYm9keSwgJ2JvZHknKTtcblxuICAgIGlmIChjb2xsZWN0aW9uLnN0YXJ0c1dpdGgoJ2RpcmVjdHVzXycpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRjaChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX1gLCBib2R5LCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhdGNoPFQ+KGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9YCwgYm9keSwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgbXVsdGlwbGUgaXRlbXNcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVJdGVtczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oY29sbGVjdGlvbjogc3RyaW5nLCBib2R5OiBCb2R5VHlwZSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCAnY29sbGVjdGlvbicpO1xuICAgIEFWLmFycmF5KGJvZHksICdib2R5Jyk7XG5cbiAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKCdkaXJlY3R1c18nKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGF0Y2g8VD4oYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfWAsIGJvZHksIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGF0Y2g8VD4oYC9pdGVtcy8ke2NvbGxlY3Rpb259YCwgYm9keSwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaXRlbVxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUl0ZW08VCBleHRlbmRzIGFueSA9IGFueT4oY29sbGVjdGlvbjogc3RyaW5nLCBib2R5OiBCb2R5VHlwZSk6IFByb21pc2U8VD4ge1xuICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCAnY29sbGVjdGlvbicpO1xuICAgIEFWLm9iamVjdChib2R5LCAnYm9keScpO1xuXG4gICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aCgnZGlyZWN0dXNfJykpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc3Q8VD4oYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfWAsIGJvZHkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBvc3Q8VD4oYC9pdGVtcy8ke2NvbGxlY3Rpb259YCwgYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIG11bHRpcGxlIGl0ZW1zXG4gICAqIFRPRE86IHdoYXQgc2hvdWxkIHdlIGRvOlxuICAgKiAgYSkgPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPiAtPiBQcm9taXNlPElGaWVsZDxUPj5cbiAgICogIGIpIDxUIGV4dGVuZHMgYW55ID0gYW55PiAtPiBQcm9taXNlPElGaWVsZDxUW10+PlxuICAgKlxuICAgKiB3aGljaCB3aWxsIHJlc3VsdCBpbiB0aGUgZm9sbG93aW5nXG4gICAqICBhKSBjcmVhdGVJdGVtczxQZXJzb24+ID0+IFByb21pc2U8SUZpZWxkPFBlcnNvbltdPj5cbiAgICogIGIpIGNyZWF0ZUl0ZW1zPFBlcnNvbltdPiA9PiBQcm9taXNlPElGaWVsZDxQZXJzb25bXT4+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlSXRlbXM8VCBleHRlbmRzIGFueVtdID0gYW55W10+KGNvbGxlY3Rpb246IHN0cmluZywgYm9keTogQm9keVR5cGUpOiBQcm9taXNlPElGaWVsZDxUPj4ge1xuICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCAnY29sbGVjdGlvbicpO1xuICAgIEFWLmFycmF5KGJvZHksICdib2R5Jyk7XG5cbiAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKCdkaXJlY3R1c18nKSkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zdChgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9YCwgYm9keSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucG9zdDxJRmllbGQ8VD4+KGAvaXRlbXMvJHtjb2xsZWN0aW9ufWAsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdGVtcyBmcm9tIGEgZ2l2ZW4gY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGdldEl0ZW1zPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihjb2xsZWN0aW9uOiBzdHJpbmcsIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPElGaWVsZDxUPj4ge1xuICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCAnY29sbGVjdGlvbicpO1xuICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCAncGFyYW1zJyk7XG5cbiAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKCdkaXJlY3R1c18nKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX1gLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldDxJRmllbGQ8VD4+KGAvaXRlbXMvJHtjb2xsZWN0aW9ufWAsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc2luZ2xlIGl0ZW0gYnkgcHJpbWFyeSBrZXlcbiAgICovXG4gIHB1YmxpYyBnZXRJdGVtPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSxcbiAgICBwYXJhbXM6IG9iamVjdCA9IHt9XG4gICk6IFByb21pc2U8SUZpZWxkPFQ+PiB7XG4gICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sICdjb2xsZWN0aW9uJyk7XG4gICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCAncHJpbWFyeUtleScpO1xuICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCAncGFyYW1zJyk7XG5cbiAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKCdkaXJlY3R1c18nKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KGAvJHtjb2xsZWN0aW9uLnN1YnN0cmluZyg5KX0vJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0PElGaWVsZDxUPj4oYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHNpbmdsZSBpdGVtIGJ5IHByaW1hcnkga2V5XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlSXRlbShjb2xsZWN0aW9uOiBzdHJpbmcsIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sICdjb2xsZWN0aW9uJyk7XG4gICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCAncHJpbWFyeUtleScpO1xuXG4gICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aCgnZGlyZWN0dXNfJykpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZTx2b2lkPihgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kZWxldGU8dm9pZD4oYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgbXVsdGlwbGUgaXRlbXMgYnkgcHJpbWFyeSBrZXlcbiAgICovXG4gIHB1YmxpYyBkZWxldGVJdGVtcyhjb2xsZWN0aW9uOiBzdHJpbmcsIHByaW1hcnlLZXlzOiBQcmltYXJ5S2V5VHlwZVtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sICdjb2xsZWN0aW9uJyk7XG4gICAgQVYuYXJyYXkocHJpbWFyeUtleXMsICdwcmltYXJ5S2V5cycpO1xuXG4gICAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aCgnZGlyZWN0dXNfJykpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGV0ZShgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleXMuam9pbigpfWApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRlbGV0ZShgL2l0ZW1zLyR7Y29sbGVjdGlvbn0vJHtwcmltYXJ5S2V5cy5qb2luKCl9YCk7XG4gIH1cblxuICAvLy8gTElTVElORyBQUkVGRVJFTkNFUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb2xsZWN0aW9uIHByZXNldHMgb2YgdGhlIGN1cnJlbnQgdXNlciBmb3IgYSBzaW5nbGUgY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGdldE15TGlzdGluZ1ByZWZlcmVuY2VzPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihjb2xsZWN0aW9uOiBzdHJpbmcsIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBBVi5zdHJpbmcodGhpcy50b2tlbiwgJ3RoaXMudG9rZW4nKTtcbiAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgJ3BhcmFtcycpO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuZ2V0UGF5bG9hZDx7IHJvbGU6IHN0cmluZzsgaWQ6IHN0cmluZyB9PigpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuZ2V0PElGaWVsZDxhbnk+PignL2NvbGxlY3Rpb25fcHJlc2V0cycsIHtcbiAgICAgICAgJ2ZpbHRlcltjb2xsZWN0aW9uXVtlcV0nOiBjb2xsZWN0aW9uLFxuICAgICAgICAnZmlsdGVyW3JvbGVdW251bGxdJzogMSxcbiAgICAgICAgJ2ZpbHRlclt0aXRsZV1bbnVsbF0nOiAxLFxuICAgICAgICAnZmlsdGVyW3VzZXJdW251bGxdJzogMSxcbiAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgIHNvcnQ6ICctaWQnLFxuICAgICAgfSksXG4gICAgICB0aGlzLmdldDxJRmllbGQ8YW55Pj4oJy9jb2xsZWN0aW9uX3ByZXNldHMnLCB7XG4gICAgICAgICdmaWx0ZXJbY29sbGVjdGlvbl1bZXFdJzogY29sbGVjdGlvbixcbiAgICAgICAgJ2ZpbHRlcltyb2xlXVtlcV0nOiBwYXlsb2FkLnJvbGUsXG4gICAgICAgICdmaWx0ZXJbdGl0bGVdW251bGxdJzogMSxcbiAgICAgICAgJ2ZpbHRlclt1c2VyXVtudWxsXSc6IDEsXG4gICAgICAgIGxpbWl0OiAxLFxuICAgICAgICBzb3J0OiAnLWlkJyxcbiAgICAgIH0pLFxuICAgICAgdGhpcy5nZXQ8SUZpZWxkPGFueT4+KCcvY29sbGVjdGlvbl9wcmVzZXRzJywge1xuICAgICAgICAnZmlsdGVyW2NvbGxlY3Rpb25dW2VxXSc6IGNvbGxlY3Rpb24sXG4gICAgICAgICdmaWx0ZXJbcm9sZV1bZXFdJzogcGF5bG9hZC5yb2xlLFxuICAgICAgICAnZmlsdGVyW3RpdGxlXVtudWxsXSc6IDEsXG4gICAgICAgICdmaWx0ZXJbdXNlcl1bZXFdJzogcGF5bG9hZC5pZCxcbiAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgIHNvcnQ6ICctaWQnLFxuICAgICAgfSksXG4gICAgXSkudGhlbigodmFsdWVzOiBBcnJheTxJRmllbGQ8YW55Pj4pID0+IHtcbiAgICAgIGNvbnN0IFtjb2wsIHJvbGUsIHVzZXJdID0gdmFsdWVzO1xuXG4gICAgICBpZiAodXNlci5kYXRhICYmIHVzZXIuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB1c2VyLmRhdGFbMF0gYXMgVDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvbGUuZGF0YSAmJiByb2xlLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gcm9sZS5kYXRhWzBdIGFzIFQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2wuZGF0YSAmJiBjb2wuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjb2wuZGF0YVswXSBhcyBUO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge30gYXMgVDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vLyBQRVJNSVNTSU9OUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBHZXQgcGVybWlzc2lvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRQZXJtaXNzaW9uczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4ocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SUZpZWxkPFQ+PiB7XG4gICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsICdwYXJhbXMnKTtcbiAgICByZXR1cm4gdGhpcy5nZXRJdGVtczxUPignZGlyZWN0dXNfcGVybWlzc2lvbnMnLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyJ3MgcGVybWlzc2lvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRNeVBlcm1pc3Npb25zPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsICdwYXJhbXMnKTtcbiAgICByZXR1cm4gdGhpcy5nZXQoJy9wZXJtaXNzaW9ucy9tZScsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIG11bHRpcGxlIG5ldyBwZXJtaXNzaW9uc1xuICAgKi9cbiAgcHVibGljIGNyZWF0ZVBlcm1pc3Npb25zPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihkYXRhOiAvKiBUT0RPOiAqLyBhbnlbXSk6IFByb21pc2U8VD4ge1xuICAgIEFWLmFycmF5KGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnBvc3QoJy9wZXJtaXNzaW9ucycsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBtdWx0aXBsZSBwZXJtaXNzaW9uIHJlY29yZHNcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVQZXJtaXNzaW9uczxUIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oZGF0YTogLyogVE9ETzogKi8gYW55W10pOiBQcm9taXNlPFQ+IHtcbiAgICBBVi5hcnJheShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5wYXRjaDxUPignL3Blcm1pc3Npb25zJywgZGF0YSk7XG4gIH1cblxuICAvLy8gUkVMQVRJT05TIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR2V0IGFsbCByZWxhdGlvbnNoaXBzXG4gICAqL1xuICBwdWJsaWMgZ2V0UmVsYXRpb25zPFQgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLmdldDxUPignL3JlbGF0aW9ucycsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBuZXcgcmVsYXRpb25cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVSZWxhdGlvbjxUIGV4dGVuZHMgYW55ID0gYW55PihkYXRhOiAvKiBUT0RPOiAqLyBvYmplY3QpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5wb3N0PFQ+KCcvcmVsYXRpb25zJywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBleGlzdGluZyByZWxhdGlvblxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVJlbGF0aW9uPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBkYXRhOiAvKiBUT0RPOiAqLyBvYmplY3QpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5wYXRjaDxUPihgL3JlbGF0aW9ucy8ke3ByaW1hcnlLZXl9YCwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZWxhdGlvbnNoaXAgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29sbGVjdGlvblJlbGF0aW9uczxUIGV4dGVuZHMgYW55ID0gYW55Pihjb2xsZWN0aW9uOiBzdHJpbmcsIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFRbXT4ge1xuICAgIEFWLnN0cmluZyhjb2xsZWN0aW9uLCAnY29sbGVjdGlvbicpO1xuICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmdldDxUPignL3JlbGF0aW9ucycsIHtcbiAgICAgICAgJ2ZpbHRlcltjb2xsZWN0aW9uX2FdW2VxXSc6IGNvbGxlY3Rpb24sXG4gICAgICB9KSxcbiAgICAgIHRoaXMuZ2V0PFQ+KCcvcmVsYXRpb25zJywge1xuICAgICAgICAnZmlsdGVyW2NvbGxlY3Rpb25fYl1bZXFdJzogY29sbGVjdGlvbixcbiAgICAgIH0pLFxuICAgIF0pO1xuICB9XG5cbiAgLy8vIFJFVklTSU9OUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZSBpdGVtJ3MgcmV2aXNpb25zIGJ5IHByaW1hcnkga2V5XG4gICAqL1xuICBwdWJsaWMgZ2V0SXRlbVJldmlzaW9uczxUIGV4dGVuZHMgYW55ID0gYW55PihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgcHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsXG4gICAgcGFyYW1zOiBvYmplY3QgPSB7fVxuICApOiBQcm9taXNlPElSZXZpc2lvblJlc3BvbnNlPFQ+PiB7XG4gICAgQVYuc3RyaW5nKGNvbGxlY3Rpb24sICdjb2xsZWN0aW9uJyk7XG4gICAgQVYubm90TnVsbChwcmltYXJ5S2V5LCAncHJpbWFyeUtleScpO1xuICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCAncGFyYW1zJyk7XG5cbiAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKCdkaXJlY3R1c18nKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0PElSZXZpc2lvblJlc3BvbnNlPFQ+PihgLyR7Y29sbGVjdGlvbi5zdWJzdHJpbmcoOSl9LyR7cHJpbWFyeUtleX0vcmV2aXNpb25zYCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXQ8SVJldmlzaW9uUmVzcG9uc2U8VD4+KGAvaXRlbXMvJHtjb2xsZWN0aW9ufS8ke3ByaW1hcnlLZXl9L3JldmlzaW9uc2AsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJ0IGFuIGl0ZW0gdG8gYSBwcmV2aW91cyBzdGF0ZVxuICAgKi9cbiAgcHVibGljIHJldmVydChjb2xsZWN0aW9uOiBzdHJpbmcsIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCByZXZpc2lvbklEOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBBVi5zdHJpbmcoY29sbGVjdGlvbiwgJ2NvbGxlY3Rpb24nKTtcbiAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksICdwcmltYXJ5S2V5Jyk7XG4gICAgQVYubnVtYmVyKHJldmlzaW9uSUQsICdyZXZpc2lvbklEJyk7XG5cbiAgICBpZiAoY29sbGVjdGlvbi5zdGFydHNXaXRoKCdkaXJlY3R1c18nKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGF0Y2goYC8ke2NvbGxlY3Rpb24uc3Vic3RyaW5nKDkpfS8ke3ByaW1hcnlLZXl9L3JldmVydC8ke3JldmlzaW9uSUR9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGF0Y2goYC9pdGVtcy8ke2NvbGxlY3Rpb259LyR7cHJpbWFyeUtleX0vcmV2ZXJ0LyR7cmV2aXNpb25JRH1gKTtcbiAgfVxuXG4gIC8vLyBST0xFUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzaW5nbGUgdXNlciByb2xlXG4gICAqL1xuICBwdWJsaWMgZ2V0Um9sZShwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SVJvbGVSZXNwb25zZT4ge1xuICAgIEFWLm51bWJlcihwcmltYXJ5S2V5LCAncHJpbWFyeUtleScpO1xuICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCAncGFyYW1zJyk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0PElSb2xlUmVzcG9uc2U+KGAvcm9sZXMvJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIHJvbGVzXG4gICAqL1xuICBwdWJsaWMgZ2V0Um9sZXMocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SVJvbGVSZXNwb25zZVtdPiB7XG4gICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsICdwYXJhbXMnKTtcbiAgICByZXR1cm4gdGhpcy5nZXQ8SVJvbGVSZXNwb25zZVtdPignL3JvbGVzJywgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSB1c2VyIHJvbGVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVSb2xlKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBib2R5OiBCb2R5VHlwZSk6IFByb21pc2U8SVJvbGVSZXNwb25zZT4ge1xuICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgJ3ByaW1hcnlLZXknKTtcbiAgICBBVi5vYmplY3QoYm9keSwgJ2JvZHknKTtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtPElSb2xlUmVzcG9uc2U+KCdkaXJlY3R1c19yb2xlcycsIHByaW1hcnlLZXksIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB1c2VyIHJvbGVcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVSb2xlKGJvZHk6IEJvZHlUeXBlKTogUHJvbWlzZTxJUm9sZVJlc3BvbnNlPiB7XG4gICAgQVYub2JqZWN0KGJvZHksICdib2R5Jyk7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSXRlbTxJUm9sZVJlc3BvbnNlPignZGlyZWN0dXNfcm9sZXMnLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSB1c2VyIHJvbCBieSBwcmltYXJ5IGtleVxuICAgKi9cbiAgcHVibGljIGRlbGV0ZVJvbGUocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksICdwcmltYXJ5S2V5Jyk7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlSXRlbSgnZGlyZWN0dXNfcm9sZXMnLCBwcmltYXJ5S2V5KTtcbiAgfVxuXG4gIC8vLyBTRVRUSU5HUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBHZXQgRGlyZWN0dXMnIGdsb2JhbCBzZXR0aW5nc1xuICAgKi9cbiAgcHVibGljIGdldFNldHRpbmdzKHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPGFueT4ge1xuICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCAncGFyYW1zJyk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCcvc2V0dGluZ3MnLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgXCJmaWVsZHNcIiBmb3IgZGlyZWN0dXNfc2V0dGluZ3NcbiAgICovXG4gIHB1YmxpYyBnZXRTZXR0aW5nc0ZpZWxkcyhwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxhbnk+IHtcbiAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgJ3BhcmFtcycpO1xuICAgIHJldHVybiB0aGlzLmdldCgnL3NldHRpbmdzL2ZpZWxkcycsIHBhcmFtcyk7XG4gIH1cblxuICAvLy8gVVNFUlMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgYXZhaWxhYmxlIHVzZXJzIGluIERpcmVjdHVzXG4gICAqL1xuICBwdWJsaWMgZ2V0VXNlcnMocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SVVzZXJzUmVzcG9uc2U+IHtcbiAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgJ3BhcmFtcycpO1xuICAgIHJldHVybiB0aGlzLmdldCgnL3VzZXJzJywgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzaW5nbGUgRGlyZWN0dXMgdXNlclxuICAgKi9cbiAgcHVibGljIGdldFVzZXIocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPElVc2VyUmVzcG9uc2U+IHtcbiAgICBBVi5ub3ROdWxsKHByaW1hcnlLZXksICdwcmltYXJ5S2V5Jyk7XG4gICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsICdwYXJhbXMnKTtcbiAgICByZXR1cm4gdGhpcy5nZXQoYC91c2Vycy8ke3ByaW1hcnlLZXl9YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZXIgaW5mbyBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAqL1xuICBwdWJsaWMgZ2V0TWUocGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8SVVzZXJSZXNwb25zZT4ge1xuICAgIEFWLm9iamVjdE9yRW1wdHkocGFyYW1zLCAncGFyYW1zJyk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCcvdXNlcnMvbWUnLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHNpbmdsZSB1c2VyIGJhc2VkIG9uIHByaW1hcnlLZXlcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVVc2VyKHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBib2R5OiBCb2R5VHlwZSk6IFByb21pc2U8SVVzZXJSZXNwb25zZT4ge1xuICAgIEFWLm5vdE51bGwocHJpbWFyeUtleSwgJ3ByaW1hcnlLZXknKTtcbiAgICBBVi5vYmplY3QoYm9keSwgJ2JvZHknKTtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtKCdkaXJlY3R1c191c2VycycsIHByaW1hcnlLZXksIGJvZHkpO1xuICB9XG5cbiAgLy8vIFVUSUxTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIFBpbmcgdGhlIEFQSSB0byBjaGVjayBpZiBpdCBleGlzdHMgLyBpcyB1cCBhbmQgcnVubmluZ1xuICAgKi9cbiAgcHVibGljIHBpbmcoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0JywgJy9zZXJ2ZXIvcGluZycsIHt9LCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzZXJ2ZXIgaW5mbyBmcm9tIHRoZSBBUElcbiAgICovXG4gIHB1YmxpYyBzZXJ2ZXJJbmZvKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0JywgJy8nLCB7fSwge30sIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2VydmVyIGluZm8gZnJvbSB0aGUgcHJvamVjdFxuICAgKi9cbiAgcHVibGljIHByb2plY3RJbmZvKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0JywgJy8nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHRoZSBzZXR1cCB0aGlyZCBwYXJ0eSBhdXRoIHByb3ZpZGVyc1xuICAgKi9cbiAgcHVibGljIGdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCcvYXV0aC9zc28nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYW4gaW50ZXJ2YWwgb2YgMTAgc2Vjb25kcyB0aGF0IHdpbGwgY2hlY2sgaWYgdGhlIHRva2VuIG5lZWRzIHJlZnJlc2hpbmdcbiAgICovXG4gIHByaXZhdGUgc3RhcnRJbnRlcnZhbChmaXJlSW1tZWRpYXRlbHk/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgdGhpcy5yZWZyZXNoSWZOZWVkZWQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucmVmcmVzaElmTmVlZGVkLmJpbmQodGhpcyksIDEwMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYW5kIG51bGxpZmllcyB0aGUgdG9rZW4gcmVmcmVzaGluZyBpbnRlcnZhbFxuICAgKi9cbiAgcHJpdmF0ZSBzdG9wSW50ZXJ2YWwoKTogdm9pZCB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZnJlc2hJbnRlcnZhbCk7XG4gICAgdGhpcy5yZWZyZXNoSW50ZXJ2YWwgPSBudWxsO1xuICB9XG5cbiAgLy8vIFJFUVVFU1QgTUVUSE9EUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYW4gQVBJIHJlcXVlc3QgdG8gdGhlIERpcmVjdHVzIEFQSVxuICAgKi9cbiAgcHJpdmF0ZSByZXF1ZXN0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KFxuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZCxcbiAgICBlbmRwb2ludDogc3RyaW5nLFxuICAgIHBhcmFtczogb2JqZWN0ID0ge30sXG4gICAgZGF0YTogb2JqZWN0ID0ge30sXG4gICAgbm9FbnY6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge31cbiAgKTogUHJvbWlzZTxUPiB7XG4gICAgQVYuc3RyaW5nKG1ldGhvZCwgJ21ldGhvZCcpO1xuICAgIEFWLnN0cmluZyhlbmRwb2ludCwgJ2VuZHBvaW50Jyk7XG4gICAgQVYub2JqZWN0T3JFbXB0eShwYXJhbXMsICdwYXJhbXMnKTtcbiAgICBBcnJheS5pc0FycmF5KGRhdGEpID8gQVYuYXJyYXlPckVtcHR5KGRhdGEsICdkYXRhJykgOiBBVi5vYmplY3RPckVtcHR5KGRhdGEsICdkYXRhJyk7XG4gICAgQVYuc3RyaW5nKHRoaXMudXJsLCAndGhpcy51cmwnKTtcblxuICAgIGxldCBiYXNlVVJMID0gYCR7dGhpcy51cmx9L2A7XG5cbiAgICBpZiAobm9FbnYgPT09IGZhbHNlKSB7XG4gICAgICBiYXNlVVJMICs9IGAke3RoaXMucHJvamVjdH0vYDtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIGJhc2VVUkwsXG4gICAgICBkYXRhLFxuICAgICAgaGVhZGVycyxcbiAgICAgIG1ldGhvZCxcbiAgICAgIHBhcmFtcyxcbiAgICAgIHVybDogZW5kcG9pbnQsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnRva2VuICYmIHR5cGVvZiB0aGlzLnRva2VuID09PSAnc3RyaW5nJyAmJiB0aGlzLnRva2VuLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlcXVlc3RPcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgcmVxdWVzdE9wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3RoaXMudG9rZW59YDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy54aHJcbiAgICAgIC5yZXF1ZXN0KHJlcXVlc3RPcHRpb25zKVxuICAgICAgLnRoZW4oKHJlczogeyBkYXRhOiBhbnkgfSkgPT4gcmVzLmRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2VEYXRhOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFyZXNwb25zZURhdGEgfHwgcmVzcG9uc2VEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZURhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlRGF0YSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcG9uc2VEYXRhKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2VEYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IElFcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICB0aHJvdyBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmpzb24gPT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICBjb2RlOiAtMixcbiAgICAgICAgICAgIGRhdGE6IGVycm9yLmRhdGEsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IuZXJyb3IsXG4gICAgICAgICAgICBtZXNzYWdlOiAnQVBJIHJldHVybmVkIGludmFsaWQgSlNPTicsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgbWVzc2FnZTogJ05ldHdvcmsgRXJyb3InLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdFVCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqL1xuICBwcml2YXRlIGdldDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgQVYuc3RyaW5nKGVuZHBvaW50LCAnZW5kcG9pbnQnKTtcbiAgICBBVi5vYmplY3RPckVtcHR5KHBhcmFtcywgJ3BhcmFtcycpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZ2V0JywgZW5kcG9pbnQsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogUE9TVCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqL1xuICBwcml2YXRlIHBvc3Q8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keTogQm9keVR5cGUgPSB7fSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIEFWLnN0cmluZyhlbmRwb2ludCwgJ2VuZHBvaW50Jyk7XG4gICAgQXJyYXkuaXNBcnJheShib2R5KSA/IEFWLmFycmF5T3JFbXB0eShib2R5LCAnYm9keScpIDogQVYub2JqZWN0T3JFbXB0eShib2R5LCAnYm9keScpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxUPigncG9zdCcsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBBVENIIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICovXG4gIHByaXZhdGUgcGF0Y2g8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keTogQm9keVR5cGUgPSB7fSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIEFWLnN0cmluZyhlbmRwb2ludCwgJ2VuZHBvaW50Jyk7XG4gICAgQXJyYXkuaXNBcnJheShib2R5KSA/IEFWLmFycmF5T3JFbXB0eShib2R5LCAnYm9keScpIDogQVYub2JqZWN0T3JFbXB0eShib2R5LCAnYm9keScpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxUPigncGF0Y2gnLCBlbmRwb2ludCwgcGFyYW1zLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQVVQgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgKi9cbiAgcHJpdmF0ZSBwdXQ8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keTogQm9keVR5cGUgPSB7fSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIEFWLnN0cmluZyhlbmRwb2ludCwgJ2VuZHBvaW50Jyk7XG4gICAgQXJyYXkuaXNBcnJheShib2R5KSA/IEFWLmFycmF5T3JFbXB0eShib2R5LCAnYm9keScpIDogQVYub2JqZWN0T3JFbXB0eShib2R5LCAnYm9keScpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxUPigncHV0JywgZW5kcG9pbnQsIHBhcmFtcywgYm9keSk7XG4gIH1cblxuICAvKipcbiAgICogREVMRVRFIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICovXG4gIHByaXZhdGUgZGVsZXRlPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICBBVi5zdHJpbmcoZW5kcG9pbnQsICdlbmRwb2ludCcpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxUPignZGVsZXRlJywgZW5kcG9pbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBheWxvYWQgb2YgdGhlIGN1cnJlbnQgdG9rZW4sIHJldHVybiB0eXBlIGNhbiBiZSBnZW5lcmljXG4gICAqL1xuICBwcml2YXRlIGdldFBheWxvYWQ8VCBleHRlbmRzIG9iamVjdCA9IG9iamVjdD4oKTogVCB7XG4gICAgaWYgKCFBVi5pc1N0cmluZyh0aGlzLnRva2VuKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldFBheWxvYWQ8VD4odGhpcy50b2tlbik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU0RLO1xuIiwiaW1wb3J0ICogYXMgQVYgZnJvbSAnYXJndW1lbnQtdmFsaWRhdG9yJztcbmltcG9ydCAqIGFzIGJhc2U2NCBmcm9tICdiYXNlLTY0JztcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIHBheWxvYWQgZnJvbSBhIEpXVFxuICogQHBhcmFtICB7U3RyaW5nfSB0b2tlbiBUaGUgSldUIHRvIHJldHJpZXZlIHRoZSBwYXlsb2FkIGZyb21cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgVGhlIEpXVCBwYXlsb2FkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXlsb2FkPFQgZXh0ZW5kcyBvYmplY3QgPSBvYmplY3Q+KHRva2VuOiBzdHJpbmcpOiBUIHtcbiAgY29uc3QgcGF5bG9hZEJhc2U2NCA9IHRva2VuXG4gICAgLnNwbGl0KCcuJylbMV1cbiAgICAucmVwbGFjZSgnLScsICcrJylcbiAgICAucmVwbGFjZSgnXycsICcvJyk7XG4gIGNvbnN0IHBheWxvYWREZWNvZGVkID0gYmFzZTY0LmRlY29kZShwYXlsb2FkQmFzZTY0KTtcbiAgY29uc3QgcGF5bG9hZE9iamVjdCA9IEpTT04ucGFyc2UocGF5bG9hZERlY29kZWQpO1xuXG4gIGlmIChBVi5pc051bWJlcihwYXlsb2FkT2JqZWN0LmV4cCkpIHtcbiAgICBwYXlsb2FkT2JqZWN0LmV4cCA9IG5ldyBEYXRlKHBheWxvYWRPYmplY3QuZXhwICogMTAwMCk7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZE9iamVjdDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=