import axios, { AxiosInstance } from "axios";
import * as qsStringify from "qs/lib/stringify";

import { Authentication, IAuthentication } from "./Authentication";
import { concurrencyManager } from "./ConcurrencyManager";
import { IConfiguration } from "./Configuration";

// Scheme types
import { BodyType } from "./schemes/http/Body";
import { RequestMethod } from "./schemes/http/Request";
import { IErrorResponse } from "./schemes/response/Error";

// Utilities
import { invariant } from "./utils/invariant";
import { isArrayOrEmpty, isObjectOrEmpty, isString } from "./utils/is";
import { getPayload } from "./utils/payload";

export interface IAPI {
  auth: IAuthentication;
  xhr: AxiosInstance;
  concurrent: ReturnType<typeof concurrencyManager>;
  reset(): void;
  get<T extends any = any>(endpoint: string, params?: object): Promise<T>;
  post<T extends any = any>(endpoint: string, body?: BodyType, params?: object): Promise<T>;
  patch<T extends any = any>(endpoint: string, body?: BodyType, params?: object): Promise<T>;
  put<T extends any = any>(endpoint: string, body?: BodyType, params?: object): Promise<T>;
  delete<T extends any = any>(endpoint: string): Promise<T>;
  getPayload<T extends object = object>(): T;
  request<T extends any = any>(
    method: RequestMethod,
    endpoint: string,
    params?: object,
    data?: object,
    noEnv?: boolean,
    headers?: { [key: string]: string },
    skipParseToJSON?: boolean
  ): Promise<T>;
}

export class API implements IAPI {
  public auth: IAuthentication;
  public xhr = axios.create({
    paramsSerializer: qsStringify,
    timeout: 10 * 60 * 1000, // 10 min
  });
  public concurrent = concurrencyManager(this.xhr, 10);

  constructor(private config: IConfiguration) {
    this.auth = new Authentication(config, {
      post: this.post.bind(this),
    });
  }

  /**
   * Resets the client instance by logging out and removing the URL and project
   */
  public reset(): void {
    this.auth.logout();
    this.config.deleteHydratedConfig();
  }

  /// REQUEST METHODS ----------------------------------------------------------

  /**
   * GET convenience method. Calls the request method for you
   * @typeparam T   response type
   * @return {Promise<T>}
   */
  public get<T extends any = any>(endpoint: string, params: object = {}): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.request("get", endpoint, params);
  }

  /**
   * POST convenience method. Calls the request method for you
   * @typeparam T   response type
   * @return {Promise<T>}
   */
  public post<T extends any = any>(endpoint: string, body: BodyType = {}, params: object = {}): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(Array.isArray(body) ? isArrayOrEmpty(body) : isObjectOrEmpty(body), "body must be an array or object");

    return this.request<T>("post", endpoint, params, body);
  }

  /**
   * PATCH convenience method. Calls the request method for you
   * @typeparam T   response type
   * @return {Promise<T>}
   */
  public patch<T extends any = any>(endpoint: string, body: BodyType = {}, params: object = {}): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(Array.isArray(body) ? isArrayOrEmpty(body) : isObjectOrEmpty(body), "body must be an array or object");

    return this.request<T>("patch", endpoint, params, body);
  }

  /**
   * PUT convenience method. Calls the request method for you
   * @typeparam T   response type
   * @return {Promise<T>}
   */
  public put<T extends any = any>(endpoint: string, body: BodyType = {}, params: object = {}): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(Array.isArray(body) ? isArrayOrEmpty(body) : isObjectOrEmpty(body), "body must be an array or object");

    return this.request<T>("put", endpoint, params, body);
  }

  /**
   * DELETE convenience method. Calls the request method for you
   * @typeparam T   response type
   * @return {Promise<T>}
   */
  public delete<T extends any = any>(endpoint: string): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");

    return this.request<T>("delete", endpoint);
  }

  /**
   * Gets the payload of the current token, return type can be generic
   * @typeparam T   extends object, payload type
   * @return {Promise<T>}
   */
  public getPayload<T extends object = object>(): T {
    if (!isString(this.config.token)) {
      return null;
    }

    return getPayload<T>(this.config.token);
  }

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
  public request<T extends any = any>(
    method: RequestMethod,
    endpoint: string,
    params: object = {},
    data: object = {},
    noEnv: boolean = false,
    headers: { [key: string]: string } = {},
    skipParseToJSON: boolean = false
  ): Promise<T> {
    invariant(isString(method), "method must be a string");
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");
    invariant(isString(this.config.url), "main url must be defined (see constructor)");
    invariant(Array.isArray(data) ? isArrayOrEmpty(data) : isObjectOrEmpty(data), "data must be an array or object");

    let baseURL = `${this.config.url}/`;

    if (noEnv === false) {
      baseURL += `${this.config.project}/`;
    }

    const requestOptions = {
      baseURL,
      data,
      headers,
      method,
      params,
      url: endpoint,
    };

    if (this.config.token && isString(this.config.token) && this.config.token.length > 0) {
      requestOptions.headers = headers;
      requestOptions.headers.Authorization = `Bearer ${this.config.token}`;
    }

    return this.xhr
      .request(requestOptions)
      .then((res: { data: any }) => res.data)
      .then((responseData: any) => {
        if (!responseData || responseData.length === 0) {
          return responseData;
        }

        if (typeof responseData !== "object") {
          try {
            return skipParseToJSON ? responseData : JSON.parse(responseData);
          } catch (error) {
            throw {
              data: responseData,
              error,
              json: true,
            };
          }
        }

        return responseData as T;
      })
      .catch((error: IErrorResponse) => {
        if (error.response) {
          throw error.response.data.error;
        } else if (error.json === true) {
          throw {
            code: -2,
            data: error.data,
            error: error.error,
            message: "API returned invalid JSON",
          };
        } else {
          throw {
            code: -1,
            error,
            message: "Network Error",
          };
        }
      });
  }
}
