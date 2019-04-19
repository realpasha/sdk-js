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
export interface ILoginCredentials {
    email: string;
    password: string;
    url?: string;
    project?: string;
    persist?: boolean;
}
export interface ILoginOptions {
    persist: boolean;
    storage: boolean;
}
/**
 * Logging in promise
 * @promise LoginPromise
 * @fulfill {Object} Object containing URL, ENV, and TOKEN
 * @reject {Error}   Network error (if no connection to API)
 * @reject {Error}   Directus error (eg not logged in or 404)
 */
export interface ILoginResponse {
    url: string;
    project: string;
    token: string;
    localExp: number;
}
export interface IField {
    collection: string;
    id: number;
    field: string;
    type: string;
}
export interface ICollection {
    collection: string;
    fields: {
        string: IField;
    };
    hidden: boolean;
    icon?: string;
    managed: boolean;
    note?: string;
    single: boolean;
    translation?: string;
}
export interface IItem {
    id: number;
}
export declare type BodyType = object | any[];
export declare type PrimaryKeyType = string | number;
export declare type DirectusResponse<T extends any = any> = Promise<T>;
export declare type HashAlgorithm = 'core' | 'bcrypt' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512';
export declare type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
//# sourceMappingURL=types.d.ts.map