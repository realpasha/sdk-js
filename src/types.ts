export interface IRequestError {
  json: boolean;
  code: number;
  message: string;
  error: Error;
  data?: any;
}

export interface IRequestResponse {
  object: any;
  error?: Error;
}

/**
 * Logging in promise
 * @promise LoginPromise
 * @fulfill {Object} Object containing URL, ENV, and TOKEN
 * @reject {Error}   Network error (if no connection to API)
 * @reject {Error}   Directus error (eg not logged in or 404)
 */

export type PrimaryKeyType = string | number;

/**
 * Arbitrary wrapper for any kind of responses.
 * Mostly used together with the Response scheme to define
 * the responded data
 * @see IResponse ./schemes/Response
 *
 * @example
 * <br/>
 * <br/>
 * <code>type NumberResponse = DirectusResponse&lt;number&gt;;</code><br/>
 * // this would define the response "100" or "-192"
 * <br/>
 * <br/>
 * <code>type MyResponse = DirectusResponse&lt;IResponse&lt;{ name: string }&gt;&gt;;</code><br/>
 * this would define a fully featured directus response like: { meta: { ... }, data: { name: "Max Mustermann" } ... }
 * <br/>
 * <br/>
 * <code>type MyMultiResponse = DirectusResponse&lt;IResponse&lt;{ age: number }[]&gt;&gt;;</code><br/>
 * this would define a fully featured array directus response like: { meta: { ... }, data: [{ age: 58 }, { age: 31 }] }
 *
 */
export type DirectusResponse<T extends any = any> = Promise<T>;

export type HashAlgorithm = "core" | "bcrypt" | "sha1" | "sha224" | "sha256" | "sha384" | "sha512";
