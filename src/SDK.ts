// Schemes types
import { ILoginCredentials, ILoginOptions } from "./schemes/auth/Login";
import { BodyType } from "./schemes/http/Body";
import { IActivityResponse } from "./schemes/response/Activity";
import { ICollectionResponse, ICollectionsResponse } from "./schemes/response/Collection";
import { IError } from "./schemes/response/Error";
import { IField } from "./schemes/response/Field";
import { ILoginResponse } from "./schemes/response/Login";
import { IRevisionResponse } from "./schemes/response/Revision";
import { IRoleResponse } from "./schemes/response/Role";
import { IRefreshTokenResponse } from "./schemes/response/Token";
import { IUserResponse, IUsersResponse } from "./schemes/response/User";
import { PrimaryKeyType } from "./types";

// Utilities
import { getCollectionItemPath } from "./utils/collection";
import { getPayload } from "./utils/payload";

// Manager classes
import { API, IAPI } from "./API";
import { Configuration, IConfiguration, IConfigurationOptions } from "./Configuration";

// Invariant violation
import { invariant } from "./utils/invariant";
import { isArray, isNotNull, isNumber, isObject, isObjectOrEmpty, isString } from "./utils/is";

export interface ISDK {
  loggedIn: boolean;
  config: IConfiguration;
  api: IAPI;
  payload: any;
  login(credentials: ILoginCredentials, options?: ILoginOptions): Promise<ILoginResponse>;
  logout(): void;
  reset(): void;
  refreshIfNeeded(): Promise<[boolean, Error?]>;
  refresh(token: string): Promise<IRefreshTokenResponse>;
  requestPasswordReset<T extends any = any>(email: string): Promise<T>;
  getActivity(params?: object): Promise<IActivityResponse>;
  getMyBookmarks<T extends any[] = any[]>(params?: object): Promise<T>;
  getCollections(params?: object): Promise<ICollectionsResponse[]>;
  getCollection(collection: string, params?: object): Promise<ICollectionResponse>;
  createCollection(data: object): Promise<ICollectionResponse>;
  updateCollection(collection: string, data: object): Promise<ICollectionResponse>;
  deleteCollection(collection: string): Promise<void>;
  createCollectionPreset<T extends any = any>(data: object): Promise<T>;
  updateCollectionPreset<T extends any = any>(primaryKey: PrimaryKeyType, data: object): Promise<T>;
  deleteCollectionPreset(primaryKey: PrimaryKeyType): Promise<void>;
  updateDatabase(): Promise<void>;
  getInterfaces<T extends any = any>(): Promise<T>;
  getLayouts<T extends any = any>(): Promise<T>;
  getPages<T extends any = any>(): Promise<T>;
  getAllFields<T extends any = any>(params?: object): Promise<T>;
  getFields<T extends any = any>(collection: string, params?: object): Promise<T>;
  getField<T extends any = any>(collection: string, fieldName: string, params?: object): Promise<T>;
  createField<T extends any = any>(collection: string, fieldInfo: object): Promise<T>;
  updateField<T extends any = any>(collection: string, fieldName: string, fieldInfo: object): Promise<T>;
  updateFields<T extends any[] = any[]>(
    collection: string,
    fieldsInfoOrFieldNames: string[] | object[],
    fieldInfo?: object
  ): Promise<IField<T> | undefined>;
  deleteField(collection: string, fieldName: string): Promise<void>;
  uploadFiles<T extends any = any[]>(data: object, onUploadProgress?: () => object): Promise<T>;
  updateItem<T extends any = any>(
    collection: string,
    primaryKey: PrimaryKeyType,
    body: BodyType,
    params?: object
  ): Promise<T>;
  updateItems<T extends any[] = any[]>(collection: string, body: BodyType, params?: object): Promise<T>;
  createItem<T extends any = any>(collection: string, body: BodyType): Promise<T>;
  createItems<T extends any[] = any[]>(collection: string, body: BodyType): Promise<IField<T>>;
  getItems<T extends any[] = any[]>(collection: string, params: object): Promise<IField<T>>;
  getItem<T extends any = any>(
    collection: string,
    primaryKey: PrimaryKeyType,
    params?: object
  ): Promise<IField<T>>;
  deleteItem(collection: string, primaryKey: PrimaryKeyType): Promise<void>;
  deleteItems(collection: string, primaryKeys: PrimaryKeyType[]): Promise<void>;
  getMyListingPreferences<T extends any[] = any[]>(collection: string, params?: object): Promise<T>;
  getPermissions<T extends any[] = any[]>(params?: object): Promise<IField<T>>;
  getMyPermissions<T extends any[] = any[]>(params?: object): Promise<T>;
  createPermissions<T extends any[] = any[]>(data: any[]): Promise<T>;
  updatePermissions<T extends any[] = any[]>(data: any[]): Promise<T>;
  getRelations<T extends any[] = any[]>(params?: object): Promise<T>;
  createRelation<T extends any = any>(data: object): Promise<T>;
  updateRelation<T extends any = any>(primaryKey: PrimaryKeyType, data: object): Promise<T>;
  getCollectionRelations<T extends any = any>(collection: string, params?: object): Promise<T[]>;
  getItemRevisions<T extends any = any>(
    collection: string,
    primaryKey: PrimaryKeyType,
    params?: object
  ): Promise<IRevisionResponse<T>>;
  revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): Promise<void>;
  getRole(primaryKey: PrimaryKeyType, params?: object): Promise<IRoleResponse>;
  getRoles(params?: object): Promise<IRoleResponse[]>;
  updateRole(primaryKey: PrimaryKeyType, body: BodyType): Promise<IRoleResponse>;
  createRole(body: BodyType): Promise<IRoleResponse>;
  deleteRole(primaryKey: PrimaryKeyType): Promise<void>;
  getSettings(params?: object): Promise<any>;
  getSettingsFields(params?: object): Promise<any>;
  getUsers(params?: object): Promise<IUsersResponse>;
  getUser(primaryKey: PrimaryKeyType, params?: object): Promise<IUserResponse>;
  getMe(params?: object): Promise<IUserResponse>;
  updateUser(primaryKey: PrimaryKeyType, body: BodyType): Promise<IUserResponse>;
  ping(): Promise<void>;
  serverInfo(): Promise<any>;
  projectInfo(): Promise<any>;
  getThirdPartyAuthProviders(): Promise<any>;
}

export class SDK implements ISDK {
  /**
   * If the current auth status is logged in
   */
  public get loggedIn(): boolean {
    return this.api.auth.isLoggedIn();
  }

  public get payload(): any {
    if (!this.config.token) {
      return null;
    }

    return this.api.getPayload();
  }

  // convenience method
  public static getPayload = getPayload;

  // api connection and settings
  public config: IConfiguration;
  public api: IAPI;

  // create a new instance with an API
  constructor(options: IConfigurationOptions) {
    this.config = new Configuration(options);
    this.api = new API(this.config);
  }

  /// AUTHENTICATION -----------------------------------------------------------

  /**
   * Login to the API; Gets a new token from the API and stores it in this.api.token.
   */
  public login(
    credentials: ILoginCredentials,
    options: ILoginOptions = { persist: true, storage: false }
  ): Promise<ILoginResponse> {
    return this.api.auth.login(credentials, options);
  }

  /**
   * Logs the user out by "forgetting" the token, and clearing the refresh interval
   */
  public logout(): void {
    this.api.auth.logout();
  }

  /**
   * Resets the client instance by logging out and removing the URL and project
   */
  public reset(): void {
    this.api.reset();
  }

  /**
   * Refresh the token if it is about to expire (within 30 seconds of expiry date).
   * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
   * - Calls onAutoRefreshError if refreshing the token fails for some reason.
   * @returns {[boolean, Error?]}
   */
  public refreshIfNeeded(): Promise<[boolean, Error?]> {
    return this.api.auth.refreshIfNeeded();
  }

  /**
   * Use the passed token to request a new one
   */
  public refresh(token: string): Promise<IRefreshTokenResponse> {
    return this.api.auth.refresh(token);
  }

  /**
   * Request to reset the password of the user with the given email address.
   * The API will send an email to the given email address with a link to generate a new
   * temporary password.
   */
  public requestPasswordReset<T extends any = any>(email: string): Promise<T> {
    invariant(isString(email), "email must be a string");

    return this.api.post<T>("/auth/password/request", {
      email,
    });
  }

  /// ACTIVITY -----------------------------------------------------------------

  /**
   * Get activity
   */
  public getActivity(params: object = {}): Promise<IActivityResponse> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IActivityResponse>("/activity", params);
  }

  /// BOOKMARKS ----------------------------------------------------------------

  /**
   * Get the bookmarks of the current user
   * TODO: Add deprecation warning
   * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
   */
  public getMyBookmarks<T extends any[] = any[]>(params: object = {}): Promise<T> {
    invariant(isString(this.config.token), "defined token is not a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    const payload = this.api.getPayload<{ id: string; role: string }>();

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

    return this.api.get<ICollectionsResponse[]>("/collections", params);
  }

  /**
   * Get collection info by name
   */
  public getCollection(collection: string, params: object = {}): Promise<ICollectionResponse> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<ICollectionResponse>(`/collections/${collection}`, params);
  }

  /**
   * Create a collection
   */
  public createCollection(data: object): Promise<ICollectionResponse> {
    invariant(isObject(data), "data must be an object");
    return this.api.post<ICollectionResponse>("/collections", data);
  }

  /**
   * Updates a certain collection
   */
  public updateCollection(collection: string, data: object): Promise<ICollectionResponse> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObject(data), "data must be an object");

    return this.api.patch<ICollectionResponse>(`/collections/${collection}`, data);
  }

  /**
   * Deletes a certain collection
   */
  public deleteCollection(collection: string): Promise<void> {
    invariant(isString(collection), "collection must be a string");

    return this.api.delete<void>(`/collections/${collection}`);
  }

  /// COLLECTION PRESETS -------------------------------------------------------

  /**
   * Create a new collection preset (bookmark / listing preferences)
   */
  public createCollectionPreset<T extends any = any>(data: object): Promise<T> {
    invariant(isObject(data), "data must be an object");

    return this.api.post<T>("/collection_presets", data);
  }

  /**
   * Update collection preset (bookmark / listing preference)
   */
  public updateCollectionPreset<T extends any = any>(primaryKey: PrimaryKeyType, data: object): Promise<T> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObject(data), "data must be an object");

    return this.api.patch<T>(`/collection_presets/${primaryKey}`, data);
  }

  /**
   * Delete collection preset by primarykey
   */
  public deleteCollectionPreset(primaryKey: PrimaryKeyType): Promise<void> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");

    return this.api.delete<void>(`/collection_presets/${primaryKey}`);
  }

  /// DATABASE -----------------------------------------------------------------

  /**
   * This will update the database of the API instance to the latest version
   * using the migrations in the API
   */
  public updateDatabase(): Promise<void> {
    return this.api.post("/update");
  }

  /// EXTENSIONS ---------------------------------------------------------------

  /**
   * Get the meta information of all installed interfaces
   */
  public getInterfaces<T extends any = any>(): Promise<T> {
    return this.api.request<T>("get", "/interfaces", {}, {}, true);
  }

  /**
   * Get the meta information of all installed layouts
   */
  public getLayouts<T extends any = any>(): Promise<T> {
    return this.api.request<T>("get", "/layouts", {}, {}, true);
  }

  /**
   * Get the meta information of all installed pages
   */
  public getPages<T extends any = any>(): Promise<T> {
    return this.api.request<T>("get", "/pages", {}, {}, true);
  }

  /// FIELDS -------------------------------------------------------------------

  /**
   * Get all fields that are in Directus
   */
  public getAllFields<T extends any = any>(params: object = {}): Promise<T> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<T>("/fields", params);
  }

  /**
   * Get the fields that have been setup for a given collection
   */
  public getFields<T extends any = any>(collection: string, params: object = {}): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<T>(`/fields/${collection}`, params);
  }

  /**
   * Get the field information for a single given field
   */
  public getField<T extends any = any>(collection: string, fieldName: string, params: object = {}): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isString(fieldName), "fieldName must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<T>(`/fields/${collection}/${fieldName}`, params);
  }

  /**
   * Create a field in the given collection
   */
  public createField<T extends any = any>(collection: string, fieldInfo: object): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObject(fieldInfo), "fieldInfo must be an object");

    return this.api.post<T>(`/fields/${collection}`, fieldInfo);
  }

  /**
   * Update a given field in a given collection
   */
  public updateField<T extends any = any>(collection: string, fieldName: string, fieldInfo: object): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isString(fieldName), "fieldName must be a string");
    invariant(isObject(fieldInfo), "fieldInfo must be an object");

    return this.api.patch<T>(`/fields/${collection}/${fieldName}`, fieldInfo);
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
      return this.api.patch(`/fields/${collection}/${fieldsInfoOrFieldNames.join(",")}`, fieldInfo);
    }

    return this.api.patch(`/fields/${collection}`, fieldsInfoOrFieldNames);
  }

  /**
   * Delete a field from a collection
   */
  public deleteField(collection: string, fieldName: string): Promise<void> {
    invariant(isString(collection), "collection must be a string");
    invariant(isString(fieldName), "fieldName must be a string");

    return this.api.delete(`/fields/${collection}/${fieldName}`);
  }

  /// FILES --------------------------------------------------------------------

  /**
   * Upload multipart files in multipart/form-data
   */
  public uploadFiles<T extends any = any[]>(data: object, onUploadProgress: () => object = () => ({})): Promise<T> {
    const headers = {
      Authorization: `Bearer ${this.config.token}`,
      "Content-Type": "multipart/form-data",
    };

    // limit concurrent requests to 5
    this.api.concurrent.attach(5);

    return this.api.xhr
      .post(`${this.config.url}/${this.config.project}/files`, data, {
        headers,
        onUploadProgress,
      })
      .then((res: { data: any }) => {
        // detach concurrency manager
        this.api.concurrent.detach();

        return res.data;
      })
      .catch((error: IError) => {
        // detach concurrency manager
        this.api.concurrent.detach();

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

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.patch<T>(`${collectionBasePath}/${primaryKey}`, body, params);
  }

  /**
   * Update multiple items
   */
  public updateItems<T extends any[] = any[]>(collection: string, body: BodyType, params: object = {}): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isArray(body), "body must be an array");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.patch<T>(collectionBasePath, body, params);
  }

  /**
   * Create a new item
   */
  public createItem<T extends any = any>(collection: string, body: BodyType): Promise<T> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObject(body), "body must be an object");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.post<T>(collectionBasePath, body);
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

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.post<IField<T>>(collectionBasePath, body);
  }

  /**
   * Get items from a given collection
   */
  public getItems<T extends any[] = any[]>(collection: string, params: object = {}): Promise<IField<T>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.get<IField<T>>(collectionBasePath, params);
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

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.get<IField<T>>(`${collectionBasePath}/${primaryKey}`, params);
  }

  /**
   * Delete a single item by primary key
   */
  public deleteItem(collection: string, primaryKey: PrimaryKeyType): Promise<void> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.delete<void>(`${collectionBasePath}/${primaryKey}`);
  }

  /**
   * Delete multiple items by primary key
   */
  public deleteItems(collection: string, primaryKeys: PrimaryKeyType[]): Promise<void> {
    invariant(isString(collection), "collection must be a string");
    invariant(isArray(primaryKeys), "primaryKeys must be an array");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.delete(`${collectionBasePath}/${primaryKeys.join()}`);
  }

  /// LISTING PREFERENCES ------------------------------------------------------

  /**
   * Get the collection presets of the current user for a single collection
   */
  public getMyListingPreferences<T extends any[] = any[]>(collection: string, params: object = {}): Promise<T> {
    invariant(isString(this.config.token), "token must be defined");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    const payload = this.api.getPayload<{ role: string; id: string }>();

    return Promise.all([
      this.api.get<IField<any>>("/collection_presets", {
        "filter[collection][eq]": collection,
        "filter[role][null]": 1,
        "filter[title][null]": 1,
        "filter[user][null]": 1,
        limit: 1,
        sort: "-id",
      }),
      this.api.get<IField<any>>("/collection_presets", {
        "filter[collection][eq]": collection,
        "filter[role][eq]": payload.role,
        "filter[title][null]": 1,
        "filter[user][null]": 1,
        limit: 1,
        sort: "-id",
      }),
      this.api.get<IField<any>>("/collection_presets", {
        "filter[collection][eq]": collection,
        "filter[role][eq]": payload.role,
        "filter[title][null]": 1,
        "filter[user][eq]": payload.id,
        limit: 1,
        sort: "-id",
      }),
    ]).then((values: Array<IField<any>>) => {
      console.log('#getMyListing->resolve', values);
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

    return this.api.get("/permissions/me", params);
  }

  /**
   * Create multiple new permissions
   */
  public createPermissions<T extends any[] = any[]>(data: /* TODO: */ any[]): Promise<T> {
    invariant(isArray(data), "data must be anarry");

    return this.api.post("/permissions", data);
  }

  /**
   * Update multiple permission records
   */
  public updatePermissions<T extends any[] = any[]>(data: /* TODO: */ any[]): Promise<T> {
    invariant(isArray(data), "data must be anarry");

    return this.api.patch<T>("/permissions", data);
  }

  /// RELATIONS ----------------------------------------------------------------

  /**
   * Get all relationships
   */
  public getRelations<T extends any[] = any[]>(params: object = {}): Promise<T> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");
    return this.api.get<T>("/relations", params);
  }

  /**
   * Creates new relation
   */
  public createRelation<T extends any = any>(data: /* TODO: */ object): Promise<T> {
    return this.api.post<T>("/relations", data);
  }

  /**
   * Updates existing relation
   */
  public updateRelation<T extends any = any>(primaryKey: PrimaryKeyType, data: /* TODO: */ object): Promise<T> {
    return this.api.patch<T>(`/relations/${primaryKey}`, data);
  }

  /**
   * Get the relationship information for the given collection
   */
  public getCollectionRelations<T extends any = any>(collection: string, params: object = {}): Promise<T[]> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return Promise.all([
      this.api.get<T>("/relations", {
        "filter[collection_a][eq]": collection,
      }),
      this.api.get<T>("/relations", {
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

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.get<IRevisionResponse<T>>(`${collectionBasePath}/${primaryKey}/revisions`, params);
  }

  /**
   * Revert an item to a previous state
   */
  public revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): Promise<void> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isNumber(revisionID), "revisionID must be a number");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.patch(`${collectionBasePath}/${primaryKey}/revert/${revisionID}`);
  }

  /// ROLES --------------------------------------------------------------------

  /**
   * Get a single user role
   */
  public getRole(primaryKey: PrimaryKeyType, params: object = {}): Promise<IRoleResponse> {
    invariant(isNumber(primaryKey), "primaryKey must be a number");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IRoleResponse>(`/roles/${primaryKey}`, params);
  }

  /**
   * Get the user roles
   */
  public getRoles(params: object = {}): Promise<IRoleResponse[]> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IRoleResponse[]>("/roles", params);
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

    return this.api.get("/settings", params);
  }

  /**
   * Get the "fields" for directus_settings
   */
  public getSettingsFields(params: object = {}): Promise<any> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get("/settings/fields", params);
  }

  /// USERS ---------------------------------------------------------------------

  /**
   * Get a list of available users in Directus
   */
  public getUsers(params: object = {}): Promise<IUsersResponse> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get("/users", params);
  }

  /**
   * Get a single Directus user
   */
  public getUser(primaryKey: PrimaryKeyType, params: object = {}): Promise<IUserResponse> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get(`/users/${primaryKey}`, params);
  }

  /**
   * Get the user info of the currently logged in user
   */
  public getMe(params: object = {}): Promise<IUserResponse> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get("/users/me", params);
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
    return this.api.request("get", "/server/ping", {}, {}, true);
  }

  /**
   * Get the server info from the API
   */
  public serverInfo(): Promise<any> {
    return this.api.request("get", "/", {}, {}, true);
  }

  /**
   * Get the server info from the project
   */
  public projectInfo(): Promise<any> {
    return this.api.request("get", "/");
  }

  /**
   * Get all the setup third party auth providers
   */
  public getThirdPartyAuthProviders(): Promise<any> {
    return this.api.get("/auth/sso");
  }
}
