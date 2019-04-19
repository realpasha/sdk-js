export interface IStorage {
  getItem<T extends any = any>(key: string): T;
  setItem(key: string, value: any): void;
  removeItem(key: string): void;
}

export interface IClientOptions {
  url: string;
  project?: string;
  token?: string;
  localExp?: number;
  storage?: IStorage;
}

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
 *
 * type NumberResponse = DirectusResponse<number>;
 * // this would define the response "100" or "-192"
 *
 * type MyResponse = DirectusResponse<IResponse<{ name: string }>>;
 * //  this would define a fully featured directus response
 * //  {
 * //    meta: { ... },
 * //    data: {
 * //       name: "Max Mustermann"
 * //       ...
 * //    }
 * //  }
 *
 *
 * type MyMultiResponse = DirectusResponse<IResponse<{ age: number }[]>>
 * //  this would define a fully featured array directus response
 * //  {
 * //    meta: { ... },
 * //    data: [
 * //       { age: 58 },
 * //       { age: 31 }
 * //    ]
 * //  }
 *
 */
export type DirectusResponse<T extends any = any> = Promise<T>;

export type HashAlgorithm = 'core' | 'bcrypt' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512';
