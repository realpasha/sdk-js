import axios from "axios";
import * as qsStringify from "qs/lib/stringify";

// HTTP schemes
import { BodyType } from "./schemes/http/Body";
import { RequestMethod } from "./schemes/http/Request";

// Authentication schemes
import { ILoginCredentials, ILoginOptions } from "./schemes/auth/Login";

// Response schemes
import { IActivityResponse } from "./schemes/response/Activity";
import { ICollectionResponse, ICollectionsResponse } from "./schemes/response/Collection";
import { IError } from "./schemes/response/Error";
import { IField } from "./schemes/response/Field";
import { ILoginResponse } from "./schemes/response/Login";
import { IRevisionResponse } from "./schemes/response/Revision";
import { IRoleResponse } from "./schemes/response/Role";
import { IRefreshTokenResponse } from "./schemes/response/Token";
import { IUserResponse, IUsersResponse } from "./schemes/response/User";

import { getPayload } from "./payload";
import { IClientOptions, IStorage, PrimaryKeyType } from "./types";

// Invariant violation
import { invariant } from "./utils/invariant";
import {
  hasKeysWithString,
  isArray,
  isArrayOrEmpty,
  isFunction,
  isNotNull,
  isNumber,
  isObject,
  isObjectOrEmpty,
  isString,
} from "./utils/is";

class SDK {
  /**
   * If the current auth status is logged in
   */
  public get loggedIn(): boolean {
    if (isString(this.token) && isString(this.url) && isString(this.project) && isObject(this.getPayload())) {
      if (this.localExp > Date.now()) {
        return true;
      }
    }
    return false;
  }

  // convenience method
  public static getPayload = getPayload;

  private token: string;
  private url: string;
  private project: string = "_";
  private localExp?: number;
  private storage?: IStorage;
  private refreshInterval?: number;
  private onAutoRefreshError?: (msg: object) => void;
  private onAutoRefreshSuccess?: (msg: IClientOptions) => void;
  private readonly xhr = axios.create({
    paramsSerializer: qsStringify,
    timeout: 10 * 60 * 1000, // 10 min
  });

  /**
   * Create a new SDK instance
   */
  constructor(options: IClientOptions = { url: "#no-url-specified" }) {
    if (options.storage) {
      let storedInfo = options.storage.getItem("directus-sdk-js");

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
    if (this.token && this.token.includes(".")) {
      this.startInterval(true);
    }
  }

  /// AUTHENTICATION -----------------------------------------------------------

  /**
   * Login to the API; Gets a new token from the API and stores it in this.token.
   */
  public login(
    credentials: ILoginCredentials,
    options: ILoginOptions = { persist: true, storage: false }
  ): Promise<ILoginResponse> {
    invariant(isObject(credentials), "Malformed credentials");
    invariant(hasKeysWithString(credentials, ["email", "password"]), "email & password required in credentials");

    this.token = null;

    if (hasKeysWithString(credentials, ["url"])) {
      this.url = credentials.url;
    }

    if (hasKeysWithString(credentials, ["project"])) {
      this.project = credentials.project;
    }

    if (credentials.persist || options.persist) {
      this.startInterval();
    }

    return new Promise((resolve, reject) => {
      this.post("/auth/authenticate", {
        email: credentials.email,
        password: credentials.password,
      })
        .then((res: { data: { token: string } }) => res.data.token)
        .then((token: string) => {
          this.token = token;

          // Expiry date is the moment we got the token + 5 minutes
          this.localExp = new Date(Date.now() + 5 * 60000).getTime();

          if (this.storage) {
            this.storage.setItem(
              "directus-sdk-js",
              JSON.stringify({
                localExp: this.localExp,
                project: this.project,
                token: this.token,
                url: this.url,
              })
            );
          }

          resolve({
            localExp: this.localExp,
            project: this.project,
            token: this.token,
            url: this.url,
          });
        })
        .catch(reject);
    });
  }

  /**
   * Logs the user out by "forgetting" the token, and clearing the refresh interval
   */
  public logout(): void {
    this.token = null;

    if (this.refreshInterval) {
      this.stopInterval();
    }

    if (this.storage) {
      this.storage.removeItem("directus-sdk-js");
    }
  }

  /**
   * Resets the client instance by logging out and removing the URL and project
   */
  public reset(): void {
    this.logout();
    this.url = null;
    this.project = null;
  }

  /**
   * Refresh the token if it is about to expire (within 30 seconds of expiry date).
   * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
   * - Calls onAutoRefreshError if refreshing the token fails for some reason.
   * @returns {[boolean, Error?]}
   */
  public refreshIfNeeded(): Promise<[boolean, Error?]> {
    const payload = this.getPayload<{ exp: any }>();

    if (!hasKeysWithString(this, ["token", "url", "project"])) {
      return;
    }

    if (!payload || !payload.exp) {
      return;
    }

    const timeDiff = this.localExp - Date.now();

    if (timeDiff <= 0) {
      if (isFunction(this.onAutoRefreshError)) {
        this.onAutoRefreshError({
          code: 102,
          message: "auth_expired_token",
        });
      }
      return;
    }

    if (timeDiff < 30000) {
      return new Promise<[boolean, Error?]>((resolve: (res: [boolean, Error?]) => any) => {
        this.refresh(this.token)
          .then((res: IRefreshTokenResponse) => {
            this.token = res.data.token;
            this.localExp = new Date(Date.now() + 5 * 60000).getTime();

            // if autorefresh succeeded
            if (isFunction(this.onAutoRefreshSuccess)) {
              this.onAutoRefreshSuccess({
                localExp: this.localExp,
                project: this.project,
                token: this.token,
                url: this.url,
              });
              resolve([true]);
            }

            // if expiration via storage
            if (this.storage) {
              this.storage.setItem(
                "directus-sdk-js",
                JSON.stringify({
                  localExp: this.localExp,
                  project: this.project,
                  token: this.token,
                  url: this.url,
                })
              );
              resolve([true]);
            }
          })
          .catch((error: Error) => {
            if (isFunction(this.onAutoRefreshError)) {
              this.onAutoRefreshError(error);
            }
            resolve([true, error]);
          });
      });
    } else {
      Promise.resolve([false]);
    }
  }

  /**
   * Use the passed token to request a new one
   */
  public refresh(token: string): Promise<IRefreshTokenResponse> {
    invariant(isString(token), "token must be a string");

    return this.post<IRefreshTokenResponse>("/auth/refresh", { token });
  }

  /**
   * Request to reset the password of the user with the given email address.
   * The API will send an email to the given email address with a link to generate a new
   * temporary password.
   */
  public requestPasswordReset<T extends any = any>(email: string): Promise<T> {
    invariant(isString(email), "email must be a string");

    return this.post<T>("/auth/password/request", {
      email,
    });
  }

  /// ACTIVITY -----------------------------------------------------------------

  /**
   * Get activity
   */
  public getActivity(params: object = {}): Promise<IActivityResponse> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get<IActivityResponse>("/activity", params);
  }

  /// BOOKMARKS ----------------------------------------------------------------

  /**
   * Get the bookmarks of the current user
   * TODO: Add deprecation warning
   * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
   */
  public getMyBookmarks<T extends any[] = any[]>(params: object = {}): Promise<T> {
    invariant(isString(this.token), "defined token is not a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    const payload = this.getPayload<{ id: string; role: string }>();

    return Promise.all([
      this.get("/collection_presets", {
        "filter[title][nnull]": 1,
        "filter[user][eq]": payload.id,
      }),
      this.get("/collection_presets", {
        "filter[role][eq]": payload.role,
        "filter[title][nnull]": 1,
        "filter[user][null]": 1,
      }),
    ]).then((values: Array<{ data: any }>) => {
      const [user, role] = values;

      return [...(user.data || []), ...(role.data || [])] as T;
    });
  }

  /// COLLECTIONS --------------------------------------------------------------

  /**
   * Get all available collections
   */
  public getCollections(params: object = {}): Promise<ICollectionsResponse[]> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get<ICollectionsResponse[]>("/collections", params);
  }

  /**
   * Get collection info by name
   */
  public getCollection(collection: string, params: object = {}): Promise<ICollectionResponse> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get<ICollectionResponse>(`/collections/${collection}`, params);
  }

  /**
   * Create a collection
   */
  public createCollection(data: object): Promise<ICollectionResponse> {
    invariant(isObject(data), "data must be an object");
    return this.post<ICollectionResponse>("/collections", data);
  }

  /**
   * Updates a certain collection
   */
  public updateCollection(collection: string, data: object): Promise<ICollectionResponse> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObject(data), "data must be an object");

    return this.patch<ICollectionResponse>(`/collections/${collection}`, data);
  }

  /**
   * Deletes a certain collection
   */
  public deleteCollection(collection: string): Promise<void> {
    invariant(isString(collection), "collection must be a string");

    return this.delete<void>(`/collections/${collection}`);
  }

  /// COLLECTION PRESETS -------------------------------------------------------

  /**
   * Create a new collection preset (bookmark / listing preferences)
   */
  public createCollectionPreset<T extends any = any>(data: object): Promise<T> {
    invariant(isObject(data), "data must be an object");

    return this.post<T>("/collection_presets", data);
  }

  /**
   * Update collection preset (bookmark / listing preference)
   */
  public updateCollectionPreset<T extends any = any>(primaryKey: PrimaryKeyType, data: object): Promise<T> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObject(data), "data must be an object");

    return this.patch<T>(`/collection_presets/${primaryKey}`, data);
  }

  /**
   * Delete collection preset by primarykey
   */
  public deleteCollectionPreset(primaryKey: PrimaryKeyType): Promise<void> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");

    return this.delete<void>(`/collection_presets/${primaryKey}`);
  }

  /// DATABASE -----------------------------------------------------------------

  /**
   * This will update the database of the API instance to the latest version
   * using the migrations in the API
   */
  public updateDatabase(): Promise<void> {
    return this.post("/update");
  }

  /// EXTENSIONS ---------------------------------------------------------------

  /**
   * Get the meta information of all installed interfaces
   */
  public getInterfaces<T extends any = any>(): Promise<T> {
    return this.request<T>("get", "/interfaces", {}, {}, true);
  }

  /**
   * Get the meta information of all installed layouts
   */
  public getLayouts<T extends any = any>(): Promise<T> {
    return this.request<T>("get", "/layouts", {}, {}, true);
  }

  /**
   * Get the meta information of all installed pages
   */
  public getPages<T extends any = any>(): Promise<T> {
    return this.request<T>("get", "/pages", {}, {}, true);
  }

  /// FIELDS -------------------------------------------------------------------

  /**
   * Get all fields that are in Directus
   */
  public getAllFields<T extends any = any>(params: object = {}): Promise<T> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get<T>("/fields", params);
  }

  /**
   * Get the fields that have been setup for a given collection
   */
  public getFields<T extends any = any>(collection: string, params: object = {}): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get<T>(`/fields/${collection}`, params);
  }

  /**
   * Get the field information for a single given field
   */
  public getField<T extends any = any>(collection: string, fieldName: string, params: object = {}): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isString(fieldName), "fieldName must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get<T>(`/fields/${collection}/${fieldName}`, params);
  }

  /**
   * Create a field in the given collection
   */
  public createField<T extends any = any>(collection: string, fieldInfo: object): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObject(fieldInfo), "fieldInfo must be an object");

    return this.post<T>(`/fields/${collection}`, fieldInfo);
  }

  /**
   * Update a given field in a given collection
   */
  public updateField<T extends any = any>(collection: string, fieldName: string, fieldInfo: object): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isString(fieldName), "fieldName must be a string");
    invariant(isObject(fieldInfo), "fieldInfo must be an object");

    return this.patch<T>(`/fields/${collection}/${fieldName}`, fieldInfo);
  }

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
  public updateFields<T extends any[] = any[]>(
    collection: string,
    fieldsInfoOrFieldNames: string[] | object[],
    fieldInfo: object = null
  ): Promise<IField<T> | undefined> {
    invariant(isString(collection), "collection must be a string");
    invariant(isArray(fieldsInfoOrFieldNames), "fieldsInfoOrFieldNames must be an array");

    if (fieldInfo) {
      invariant(isObject(fieldInfo), "fieldInfo must be an object");
    }

    if (fieldInfo) {
      return this.patch(`/fields/${collection}/${fieldsInfoOrFieldNames.join(",")}`, fieldInfo);
    }

    return this.patch(`/fields/${collection}`, fieldsInfoOrFieldNames);
  }

  /**
   * Delete a field from a collection
   */
  public deleteField(collection: string, fieldName: string): Promise<void> {
    invariant(isString(collection), "collection must be a string");
    invariant(isString(fieldName), "fieldName must be a string");

    return this.delete(`/fields/${collection}/${fieldName}`);
  }

  /// FILES --------------------------------------------------------------------

  /**
   * Upload multipart files in multipart/form-data
   */
  public uploadFiles<T extends any = any[]>(data: object, onUploadProgress: () => object = () => ({})): Promise<T> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "multipart/form-data",
    };

    return this.xhr
      .post(`${this.url}/${this.project}/files`, data, {
        headers,
        onUploadProgress,
      })
      .then((res: { data: any }) => res.data)
      .catch((error: IError) => {
        if (error.response) {
          throw error.response.data.error;
        } else {
          throw {
            code: -1,
            error,
            message: "Network Error",
          };
        }
      });
  }

  /// ITEMS --------------------------------------------------------------------

  /**
   * Update an existing item
   */
  public updateItem<T extends any = any>(
    collection: string,
    primaryKey: PrimaryKeyType,
    body: BodyType,
    params: object = {}
  ): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObject(body), "body must be an object");

    if (collection.startsWith("directus_")) {
      return this.patch(`/${collection.substring(9)}/${primaryKey}`, body, params);
    }

    return this.patch<T>(`/items/${collection}/${primaryKey}`, body, params);
  }

  /**
   * Update multiple items
   */
  public updateItems<T extends any[] = any[]>(collection: string, body: BodyType, params: object = {}): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isArray(body), "body must be an array");

    if (collection.startsWith("directus_")) {
      return this.patch<T>(`/${collection.substring(9)}`, body, params);
    }

    return this.patch<T>(`/items/${collection}`, body, params);
  }

  /**
   * Create a new item
   */
  public createItem<T extends any = any>(collection: string, body: BodyType): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObject(body), "body must be an object");

    if (collection.startsWith("directus_")) {
      return this.post<T>(`/${collection.substring(9)}`, body);
    }

    return this.post<T>(`/items/${collection}`, body);
  }

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
  public createItems<T extends any[] = any[]>(collection: string, body: BodyType): Promise<IField<T>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isArray(body), "body must be an array");

    if (collection.startsWith("directus_")) {
      return this.post(`/${collection.substring(9)}`, body);
    }

    return this.post<IField<T>>(`/items/${collection}`, body);
  }

  /**
   * Get items from a given collection
   */
  public getItems<T extends any[] = any[]>(collection: string, params: object = {}): Promise<IField<T>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    if (collection.startsWith("directus_")) {
      return this.get(`/${collection.substring(9)}`, params);
    }

    return this.get<IField<T>>(`/items/${collection}`, params);
  }

  /**
   * Get a single item by primary key
   */
  public getItem<T extends any = any>(
    collection: string,
    primaryKey: PrimaryKeyType,
    params: object = {}
  ): Promise<IField<T>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    if (collection.startsWith("directus_")) {
      return this.get(`/${collection.substring(9)}/${primaryKey}`, params);
    }

    return this.get<IField<T>>(`/items/${collection}/${primaryKey}`, params);
  }

  /**
   * Delete a single item by primary key
   */
  public deleteItem(collection: string, primaryKey: PrimaryKeyType): Promise<void> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");

    if (collection.startsWith("directus_")) {
      return this.delete<void>(`/${collection.substring(9)}/${primaryKey}`);
    }

    return this.delete<void>(`/items/${collection}/${primaryKey}`);
  }

  /**
   * Delete multiple items by primary key
   */
  public deleteItems(collection: string, primaryKeys: PrimaryKeyType[]): Promise<void> {
    invariant(isString(collection), "collection must be a string");
    invariant(isArray(primaryKeys), "primaryKeys must be an array");

    if (collection.startsWith("directus_")) {
      return this.delete(`/${collection.substring(9)}/${primaryKeys.join()}`);
    }

    return this.delete(`/items/${collection}/${primaryKeys.join()}`);
  }

  /// LISTING PREFERENCES ------------------------------------------------------

  /**
   * Get the collection presets of the current user for a single collection
   */
  public getMyListingPreferences<T extends any[] = any[]>(collection: string, params: object = {}): Promise<T> {
    invariant(isString(this.token), "token must be defined in constructor");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    const payload = this.getPayload<{ role: string; id: string }>();

    return Promise.all([
      this.get<IField<any>>("/collection_presets", {
        "filter[collection][eq]": collection,
        "filter[role][null]": 1,
        "filter[title][null]": 1,
        "filter[user][null]": 1,
        limit: 1,
        sort: "-id",
      }),
      this.get<IField<any>>("/collection_presets", {
        "filter[collection][eq]": collection,
        "filter[role][eq]": payload.role,
        "filter[title][null]": 1,
        "filter[user][null]": 1,
        limit: 1,
        sort: "-id",
      }),
      this.get<IField<any>>("/collection_presets", {
        "filter[collection][eq]": collection,
        "filter[role][eq]": payload.role,
        "filter[title][null]": 1,
        "filter[user][eq]": payload.id,
        limit: 1,
        sort: "-id",
      }),
    ]).then((values: Array<IField<any>>) => {
      const [col, role, user] = values;

      if (user.data && user.data.length > 0) {
        return user.data[0] as T;
      }

      if (role.data && role.data.length > 0) {
        return role.data[0] as T;
      }

      if (col.data && col.data.length > 0) {
        return col.data[0] as T;
      }

      return {} as T;
    });
  }

  /// PERMISSIONS --------------------------------------------------------------

  /**
   * Get permissions
   */
  public getPermissions<T extends any[] = any[]>(params: object = {}): Promise<IField<T>> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");
    return this.getItems<T>("directus_permissions", params);
  }

  /**
   * Get the currently logged in user's permissions
   */
  public getMyPermissions<T extends any[] = any[]>(params: object = {}): Promise<T> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");
    return this.get("/permissions/me", params);
  }

  /**
   * Create multiple new permissions
   */
  public createPermissions<T extends any[] = any[]>(data: /* TODO: */ any[]): Promise<T> {
    invariant(isArray(data), "data must be anarry");
    return this.post("/permissions", data);
  }

  /**
   * Update multiple permission records
   */
  public updatePermissions<T extends any[] = any[]>(data: /* TODO: */ any[]): Promise<T> {
    invariant(isArray(data), "data must be anarry");
    return this.patch<T>("/permissions", data);
  }

  /// RELATIONS ----------------------------------------------------------------

  /**
   * Get all relationships
   */
  public getRelations<T extends any[] = any[]>(params: object = {}): Promise<T> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");
    return this.get<T>("/relations", params);
  }

  /**
   * Creates new relation
   */
  public createRelation<T extends any = any>(data: /* TODO: */ object): Promise<T> {
    return this.post<T>("/relations", data);
  }

  /**
   * Updates existing relation
   */
  public updateRelation<T extends any = any>(primaryKey: PrimaryKeyType, data: /* TODO: */ object): Promise<T> {
    return this.patch<T>(`/relations/${primaryKey}`, data);
  }

  /**
   * Get the relationship information for the given collection
   */
  public getCollectionRelations<T extends any = any>(collection: string, params: object = {}): Promise<T[]> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return Promise.all([
      this.get<T>("/relations", {
        "filter[collection_a][eq]": collection,
      }),
      this.get<T>("/relations", {
        "filter[collection_b][eq]": collection,
      }),
    ]);
  }

  /// REVISIONS ----------------------------------------------------------------

  /**
   * Get a single item's revisions by primary key
   */
  public getItemRevisions<T extends any = any>(
    collection: string,
    primaryKey: PrimaryKeyType,
    params: object = {}
  ): Promise<IRevisionResponse<T>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    if (collection.startsWith("directus_")) {
      return this.get<IRevisionResponse<T>>(`/${collection.substring(9)}/${primaryKey}/revisions`, params);
    }

    return this.get<IRevisionResponse<T>>(`/items/${collection}/${primaryKey}/revisions`, params);
  }

  /**
   * Revert an item to a previous state
   */
  public revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): Promise<void> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isNumber(revisionID), "revisionID must be a number");

    if (collection.startsWith("directus_")) {
      return this.patch(`/${collection.substring(9)}/${primaryKey}/revert/${revisionID}`);
    }

    return this.patch(`/items/${collection}/${primaryKey}/revert/${revisionID}`);
  }

  /// ROLES --------------------------------------------------------------------

  /**
   * Get a single user role
   */
  public getRole(primaryKey: PrimaryKeyType, params: object = {}): Promise<IRoleResponse> {
    invariant(isNumber(primaryKey), "primaryKey must be a number");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");
    return this.get<IRoleResponse>(`/roles/${primaryKey}`, params);
  }

  /**
   * Get the user roles
   */
  public getRoles(params: object = {}): Promise<IRoleResponse[]> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");
    return this.get<IRoleResponse[]>("/roles", params);
  }

  /**
   * Update a user role
   */
  public updateRole(primaryKey: PrimaryKeyType, body: BodyType): Promise<IRoleResponse> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObject(body), "body must be an object");
    return this.updateItem<IRoleResponse>("directus_roles", primaryKey, body);
  }

  /**
   * Create a new user role
   */
  public createRole(body: BodyType): Promise<IRoleResponse> {
    invariant(isObject(body), "body must be an object");
    return this.createItem<IRoleResponse>("directus_roles", body);
  }

  /**
   * Delete a user rol by primary key
   */
  public deleteRole(primaryKey: PrimaryKeyType): Promise<void> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    return this.deleteItem("directus_roles", primaryKey);
  }

  /// SETTINGS -----------------------------------------------------------------

  /**
   * Get Directus' global settings
   */
  public getSettings(params: object = {}): Promise<any> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get("/settings", params);
  }

  /**
   * Get the "fields" for directus_settings
   */
  public getSettingsFields(params: object = {}): Promise<any> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get("/settings/fields", params);
  }

  /// USERS ---------------------------------------------------------------------

  /**
   * Get a list of available users in Directus
   */
  public getUsers(params: object = {}): Promise<IUsersResponse> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get("/users", params);
  }

  /**
   * Get a single Directus user
   */
  public getUser(primaryKey: PrimaryKeyType, params: object = {}): Promise<IUserResponse> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get(`/users/${primaryKey}`, params);
  }

  /**
   * Get the user info of the currently logged in user
   */
  public getMe(params: object = {}): Promise<IUserResponse> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.get("/users/me", params);
  }

  /**
   * Update a single user based on primaryKey
   */
  public updateUser(primaryKey: PrimaryKeyType, body: BodyType): Promise<IUserResponse> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObject(body), "body must be an object");

    return this.updateItem("directus_users", primaryKey, body);
  }

  /// UTILS --------------------------------------------------------------------

  /**
   * Ping the API to check if it exists / is up and running
   */
  public ping(): Promise<void> {
    return this.request("get", "/server/ping", {}, {}, true);
  }

  /**
   * Get the server info from the API
   */
  public serverInfo(): Promise<any> {
    return this.request("get", "/", {}, {}, true);
  }

  /**
   * Get the server info from the project
   */
  public projectInfo(): Promise<any> {
    return this.request("get", "/");
  }

  /**
   * Get all the setup third party auth providers
   */
  public getThirdPartyAuthProviders(): Promise<any> {
    return this.get("/auth/sso");
  }

  /**
   * Starts an interval of 10 seconds that will check if the token needs refreshing
   */
  private startInterval(fireImmediately?: boolean): void {
    if (fireImmediately) {
      this.refreshIfNeeded();
    }

    this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
  }

  /**
   * Clears and nullifies the token refreshing interval
   */
  private stopInterval(): void {
    clearInterval(this.refreshInterval);
    this.refreshInterval = null;
  }

  /// REQUEST METHODS ----------------------------------------------------------

  /**
   * Perform an API request to the Directus API
   */
  private request<T extends any = any>(
    method: RequestMethod,
    endpoint: string,
    params: object = {},
    data: object = {},
    noEnv: boolean = false,
    headers: { [key: string]: string } = {}
  ): Promise<T> {
    invariant(isString(method), "method must be a string");
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");
    invariant(isString(this.url), "main url must be defined (see constructor)");
    invariant(Array.isArray(data) ? isArrayOrEmpty(data) : isObjectOrEmpty(data), "data must be an array or object");

    let baseURL = `${this.url}/`;

    if (noEnv === false) {
      baseURL += `${this.project}/`;
    }

    const requestOptions = {
      baseURL,
      data,
      headers,
      method,
      params,
      url: endpoint,
    };

    if (this.token && typeof this.token === "string" && this.token.length > 0) {
      requestOptions.headers = headers;
      requestOptions.headers.Authorization = `Bearer ${this.token}`;
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
            return JSON.parse(responseData);
          } catch (error) {
            throw {
              data: responseData,
              error,
              json: true,
            };
          }
        }

        return responseData;
      })
      .catch((error: IError) => {
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

  /**
   * GET convenience method. Calls the request method for you
   */
  private get<T extends any = any>(endpoint: string, params: object = {}): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.request("get", endpoint, params);
  }

  /**
   * POST convenience method. Calls the request method for you
   */
  private post<T extends any = any>(endpoint: string, body: BodyType = {}, params: object = {}): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(Array.isArray(body) ? isArrayOrEmpty(body) : isObjectOrEmpty(body), "body must be an array or object");

    return this.request<T>("post", endpoint, params, body);
  }

  /**
   * PATCH convenience method. Calls the request method for you
   */
  private patch<T extends any = any>(endpoint: string, body: BodyType = {}, params: object = {}): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(Array.isArray(body) ? isArrayOrEmpty(body) : isObjectOrEmpty(body), "body must be an array or object");

    return this.request<T>("patch", endpoint, params, body);
  }

  /**
   * PUT convenience method. Calls the request method for you
   */
  private put<T extends any = any>(endpoint: string, body: BodyType = {}, params: object = {}): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");
    invariant(Array.isArray(body) ? isArrayOrEmpty(body) : isObjectOrEmpty(body), "body must be an array or object");

    return this.request<T>("put", endpoint, params, body);
  }

  /**
   * DELETE convenience method. Calls the request method for you
   */
  private delete<T extends any = any>(endpoint: string): Promise<T> {
    invariant(isString(endpoint), "endpoint must be a string");

    return this.request<T>("delete", endpoint);
  }

  /**
   * Gets the payload of the current token, return type can be generic
   */
  private getPayload<T extends object = object>(): T {
    if (!isString(this.token)) {
      return null;
    }

    return getPayload<T>(this.token);
  }
}

export default SDK;
