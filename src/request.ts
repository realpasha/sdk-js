import { querify } from "./utils/qs";
import { RequestMethod } from "./schemes/http/Request";

export interface RequestOptions {
  params?: object,
  skipToJSON?: boolean,
  headers?: Record<string, string>
}

export type RequestBody = any;

function withTimeout<T>(fn: () => Promise<T>, timeout: number): Promise<T> {
  return Promise.race<Promise<T>>([
    fn(),
    new Promise((_resolve, reject) => {
      setTimeout(() => reject(new Error(`Timeout of ${timeout} reached`)), timeout);
    })
  ]);
}

async function request<T extends any>(method: RequestMethod, url: string): Promise<T>;
async function request<T extends any>(method: RequestMethod, url: string, opts?: RequestOptions): Promise<T>;
async function request<T extends any>(method: RequestMethod, url: string, body?: RequestBody, opts?: RequestOptions): Promise<T>;
async function request<T extends any>(method: RequestMethod, url: string, bodyOrOpts?: RequestBody | RequestOptions, opts?: RequestOptions): Promise<T> {
  if (!opts && bodyOrOpts) {
    opts = bodyOrOpts;
    bodyOrOpts = undefined;
  }

  if (opts && opts.params) {
    url = `${url}?${querify(opts.params)}`
  }

  const response = await withTimeout(
    () => fetch(url, {
      method,
      body: bodyOrOpts,
      headers: opts.headers,
      credentials: 'include'
    }), 2000);

  // skip if skipToJSON was set to true
  if (opts && opts.skipToJSON) {
    return await response.text() as any as T;
  }

  // return parsed values
  return await response.json() as T;
}

export { request };
