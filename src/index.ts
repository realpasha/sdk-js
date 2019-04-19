import * as AV from 'argument-validator';
import axios, { AxiosError } from 'axios';
import * as qsStringify from 'qs/lib/stringify';

import { getPayload } from './payload';
import {
  BodyType,
  DirectusResponse,
  IClientOptions,
  ICollection,
  ILoginCredentials,
  ILoginOptions,
  ILoginResponse,
  IStorage,
  PrimaryKeyType,
  RequestMethod,
} from './types';

class SDK {
  /**
   * If the current auth status is logged in
   */
  public get loggedIn(): boolean {
    if (
      AV.isString(this.token) &&
      AV.isString(this.url) &&
      AV.isString(this.project) &&
      AV.isObject(this.getPayload())
    ) {
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
  private project: string = '_';
  private localExp?: number;
  private storage?: IStorage;
  private readonly xhr = axios.create({
    paramsSerializer: qsStringify,
    timeout: 10 * 60 * 1000, // 10 min
  });
  private refreshInterval?: number;
  private onAutoRefreshError?: (msg: object) => void;
  private onAutoRefreshSuccess?: (msg: IClientOptions) => void;

  /**
   * Create a new SDK instance
   */
  constructor(options: IClientOptions = { url: '#no-url-specified' }) {
    if (options.storage) {
      let storedInfo = options.storage.getItem('directus-sdk-js');

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

  /// AUTHENTICATION -----------------------------------------------------------

  /**
   * Login to the API; Gets a new token from the API and stores it in this.token.
   */
  public login(
    credentials: ILoginCredentials,
    options: ILoginOptions = { persist: true, storage: false }
  ): Promise<ILoginResponse> {
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

    return new Promise((resolve, reject) => {
      this.post('/auth/authenticate', {
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
              'directus-sdk-js',
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
      this.storage.removeItem('directus-sdk-js');
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
   */
  public refreshIfNeeded(): void {
    const payload = this.getPayload<{ exp: any }>();

    if (!AV.hasStringKeys(this, ['token', 'url', 'project'])) {
      return;
    }

    if (!payload || !payload.exp) {
      return;
    }

    const timeDiff = this.localExp - Date.now();

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
      this.refresh(this.token)
        .then((res: { data: { token: string } }) => {
          this.token = res.data.token;
          this.localExp = new Date(Date.now() + 5 * 60000).getTime();

          if (AV.isFunction(this.onAutoRefreshSuccess)) {
            this.onAutoRefreshSuccess({
              localExp: this.localExp,
              project: this.project,
              token: this.token,
              url: this.url,
            });
          }

          if (this.storage) {
            this.storage.setItem(
              'directus-sdk-js',
              JSON.stringify({
                localExp: this.localExp,
                project: this.project,
                token: this.token,
                url: this.url,
              })
            );
          }
        })
        .catch((error: Error) => {
          if (AV.isFunction(this.onAutoRefreshError)) {
            this.onAutoRefreshError(error);
          }
        });
    }
  }

  /**
   * Use the passed token to request a new one
   */
  public refresh(token: string): DirectusResponse {
    AV.string(token, 'token');
    return this.post('/auth/refresh', { token });
  }

  /**
   * Request to reset the password of the user with the given email address.
   * The API will send an email to the given email address with a link to generate a new
   * temporary password.
   */
  public requestPasswordReset(email: string): DirectusResponse {
    AV.string(email, 'email');
    return this.post('/auth/password/request', {
      email,
    });
  }

  /// ACTIVITY -----------------------------------------------------------------

  /**
   * Get activity
   */
  public getActivity(params: object = {}): DirectusResponse {
    AV.objectOrEmpty(params, 'params');
    return this.get('/activity', params);
  }

  /// BOOKMARKS ----------------------------------------------------------------

  /**
   * Get the bookmarks of the current user
   */
  public getMyBookmarks(params: object = {}): Promise<any[]> {
    AV.string(this.token, 'this.token');
    AV.objectOrEmpty(params);

    const payload = this.getPayload<{ id: string; role: string }>();

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
    ]).then((values: Array<{ data: any }>) => {
      const [user, role] = values; // eslint-disable-line no-shadow
      return [...(user.data || []), ...(role.data || [])];
    });
  }

  /// COLLECTIONS --------------------------------------------------------------

  /**
   * Get all available collections
   */
  public getCollections(params: object = {}): Promise<ICollection[]> {
    AV.objectOrEmpty(params, 'params');
    return this.get('/collections', params);
  }

  /**
   * Get collection info by name
   */
  public getCollection(collection: string, params: object = {}): Promise<ICollection> {
    AV.string(collection, 'collection');
    AV.objectOrEmpty(params, 'params');
    return this.get(`/collections/${collection}`, params);
  }

  /**
   * Create a collection
   */
  public createCollection(data: object): DirectusResponse {
    AV.object(data, 'data');
    return this.post('/collections', data);
  }

  /**
   * Updates a certain collection
   */
  public updateCollection(collection: string, data: object): DirectusResponse {
    AV.string(collection, 'collection');
    AV.object(data, 'data');
    return this.patch(`/collections/${collection}`, data);
  }

  /**
   * Deletes a certain collection
   */
  public deleteCollection(collection: string): DirectusResponse {
    AV.string(collection, 'collection');
    return this.delete(`/collections/${collection}`);
  }

  /// COLLECTION PRESETS -------------------------------------------------------

  /**
   * Create a new collection preset (bookmark / listing preferences)
   */
  public createCollectionPreset(data: object): DirectusResponse {
    AV.object(data);
    return this.post('/collection_presets', data);
  }

  /**
   * Update collection preset (bookmark / listing preference)
   */
  public updateCollectionPreset(primaryKey: PrimaryKeyType, data: object): DirectusResponse {
    AV.notNull(primaryKey, 'primaryKey');
    AV.object(data, 'data');

    return this.patch(`/collection_presets/${primaryKey}`, data);
  }

  /**
   * Delete collection preset by primarykey
   */
  public deleteCollectionPreset(primaryKey: PrimaryKeyType): DirectusResponse {
    AV.notNull(primaryKey, 'primaryKey');
    return this.delete(`/collection_presets/${primaryKey}`);
  }

  /// DATABASE -----------------------------------------------------------------

  /**
   * This will update the database of the API instance to the latest version
   * using the migrations in the API
   */
  public updateDatabase(): DirectusResponse {
    return this.post('/update');
  }

  /// EXTENSIONS ---------------------------------------------------------------

  /**
   * Get the meta information of all installed interfaces
   */
  public getInterfaces(): DirectusResponse {
    return this.request('get', '/interfaces', {}, {}, true);
  }

  /**
   * Get the meta information of all installed layouts
   */
  public getLayouts(): DirectusResponse {
    return this.request('get', '/layouts', {}, {}, true);
  }

  /**
   * Get the meta information of all installed pages
   */
  public getPages(): DirectusResponse {
    return this.request('get', '/pages', {}, {}, true);
  }

  /// FIELDS -------------------------------------------------------------------

  /**
   * Get all fields that are in Directus
   */
  public getAllFields(params: object = {}): DirectusResponse {
    AV.objectOrEmpty(params, 'params');
    return this.get('/fields', params);
  }

  /**
   * Get the fields that have been setup for a given collection
   */
  public getFields(collection: string, params: object = {}): DirectusResponse {
    AV.string(collection, 'collection');
    AV.objectOrEmpty(params, 'params');
    return this.get(`/fields/${collection}`, params);
  }

  /**
   * Get the field information for a single given field
   */
  public getField(collection: string, fieldName: string, params: object = {}): DirectusResponse {
    AV.string(collection, 'collection');
    AV.string(fieldName, 'fieldName');
    AV.objectOrEmpty(params, 'params');
    return this.get(`/fields/${collection}/${fieldName}`, params);
  }

  /**
   * Create a field in the given collection
   */
  public createField(collection: string, fieldInfo: object): DirectusResponse {
    AV.string(collection, 'collection');
    AV.object(fieldInfo, 'fieldInfo');
    return this.post(`/fields/${collection}`, fieldInfo);
  }

  /**
   * Update a given field in a given collection
   */
  public updateField(collection: string, fieldName: string, fieldInfo: object): DirectusResponse {
    AV.string(collection, 'collection');
    AV.string(fieldName, 'fieldName');
    AV.object(fieldInfo, 'fieldInfo');
    return this.patch(`/fields/${collection}/${fieldName}`, fieldInfo);
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
  public updateFields(
    collection: string,
    fieldsInfoOrFieldNames: string[] | object[],
    fieldInfo: object = null
  ): DirectusResponse {
    AV.string(collection, 'collection');
    AV.array(fieldsInfoOrFieldNames, 'fieldsInfoOrFieldNames');

    if (fieldInfo) {
      AV.object(fieldInfo);
    }

    if (fieldInfo) {
      return this.patch(`/fields/${collection}/${fieldsInfoOrFieldNames.join(',')}`, fieldInfo);
    }

    return this.patch(`/fields/${collection}`, fieldsInfoOrFieldNames);
  }

  /**
   * Delete a field from a collection
   */
  public deleteField(collection: string, fieldName: string): DirectusResponse {
    AV.string(collection, 'collection');
    AV.string(fieldName, 'fieldName');
    return this.delete(`/fields/${collection}/${fieldName}`);
  }

  /// FILES --------------------------------------------------------------------

  /**
   * Upload multipart files in multipart/form-data
   */
  public uploadFiles(data: object, onUploadProgress: () => object = () => ({})): DirectusResponse {
    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'multipart/form-data',
    };

    return this.xhr
      .post(`${this.url}/${this.project}/files`, data, {
        headers,
        onUploadProgress,
      })
      .then((res: { data: any }) => res.data)
      .catch((error: AxiosError) => {
        if (error.response) {
          throw error.response.data.error;
        } else {
          throw {
            code: -1,
            error,
            message: 'Network Error',
          };
        }
      });
  }

  /// ITEMS --------------------------------------------------------------------

  /**
   * Update an existing item
   */
  public updateItem(
    collection: string,
    primaryKey: PrimaryKeyType,
    body: BodyType,
    params: object = {}
  ): DirectusResponse {
    AV.string(collection, 'collection');
    AV.notNull(primaryKey, 'primaryKey');
    AV.object(body, 'body');

    if (collection.startsWith('directus_')) {
      return this.patch(`/${collection.substring(9)}/${primaryKey}`, body, params);
    }

    return this.patch(`/items/${collection}/${primaryKey}`, body, params);
  }

  /**
   * Update multiple items
   */
  public updateItems(collection: string, body: BodyType, params: object = {}): DirectusResponse {
    AV.string(collection, 'collection');
    AV.array(body, 'body');

    if (collection.startsWith('directus_')) {
      return this.patch(`/${collection.substring(9)}`, body, params);
    }

    return this.patch(`/items/${collection}`, body, params);
  }

  /**
   * Create a new item
   */
  public createItem(collection: string, body: BodyType): DirectusResponse {
    AV.string(collection, 'collection');
    AV.object(body, 'body');

    if (collection.startsWith('directus_')) {
      return this.post(`/${collection.substring(9)}`, body);
    }

    return this.post(`/items/${collection}`, body);
  }

  /**
   * Create multiple items
   */
  public createItems(collection: string, body: BodyType): DirectusResponse {
    AV.string(collection, 'collection');
    AV.array(body, 'body');

    if (collection.startsWith('directus_')) {
      return this.post(`/${collection.substring(9)}`, body);
    }

    return this.post(`/items/${collection}`, body);
  }

  /**
   * Get items from a given collection
   */
  public getItems(collection: string, params: object = {}): DirectusResponse<any[]> {
    AV.string(collection, 'collection');
    AV.objectOrEmpty(params, 'params');

    if (collection.startsWith('directus_')) {
      return this.get(`/${collection.substring(9)}`, params);
    }

    return this.get(`/items/${collection}`, params);
  }

  /**
   * Get a single item by primary key
   */
  public getItem(collection: string, primaryKey: PrimaryKeyType, params: object = {}): DirectusResponse {
    AV.string(collection, 'collection');
    AV.notNull(primaryKey, 'primaryKey');
    AV.objectOrEmpty(params, 'params');

    if (collection.startsWith('directus_')) {
      return this.get(`/${collection.substring(9)}/${primaryKey}`, params);
    }

    return this.get(`/items/${collection}/${primaryKey}`, params);
  }

  /**
   * Delete a single item by primary key
   * @param  {String} collection  The collection to delete the item from
   * @param  {String|Number} primaryKey Primary key of the item
   * @return {DirectusResponse}
   */
  public deleteItem(collection: string, primaryKey: PrimaryKeyType) {
    AV.string(collection, 'collection');
    AV.notNull(primaryKey, 'primaryKey');

    if (collection.startsWith('directus_')) {
      return this.delete(`/${collection.substring(9)}/${primaryKey}`);
    }

    return this.delete(`/items/${collection}/${primaryKey}`);
  }

  /**
   * Delete multiple items by primary key
   */
  public deleteItems(collection: string, primaryKeys: PrimaryKeyType[]): DirectusResponse {
    AV.string(collection, 'collection');
    AV.array(primaryKeys, 'primaryKeys');

    if (collection.startsWith('directus_')) {
      return this.delete(`/${collection.substring(9)}/${primaryKeys.join()}`);
    }

    return this.delete(`/items/${collection}/${primaryKeys.join()}`);
  }

  /// LISTING PREFERENCES ------------------------------------------------------

  /**
   * Get the collection presets of the current user for a single collection
   */
  public getMyListingPreferences(collection: string, params: object = {}): DirectusResponse {
    AV.string(this.token, 'this.token');
    AV.objectOrEmpty(params, 'params');

    const payload = this.getPayload<{ role: string; id: string }>();

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
    ]).then((values: any[]) => {
      const [col, role, user] = values;
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
  }

  /// PERMISSIONS --------------------------------------------------------------

  /**
   * Get permissions
   */
  public getPermissions(params: object = {}): DirectusResponse {
    AV.objectOrEmpty(params, 'params');
    return this.getItems('directus_permissions', params);
  }

  /**
   * Get the currently logged in user's permissions
   */
  public getMyPermissions(params: object = {}): DirectusResponse {
    AV.objectOrEmpty(params, 'params');
    return this.get('/permissions/me', params);
  }

  /**
   * Create multiple new permissions
   */
  public createPermissions(data: /* TODO: */ any[]): DirectusResponse {
    AV.array(data);
    return this.post('/permissions', data);
  }

  /**
   * Update multiple permission records
   */
  public updatePermissions(data: /* TODO: */ any[]): DirectusResponse {
    AV.array(data);
    return this.patch('/permissions', data);
  }

  /// RELATIONS ----------------------------------------------------------------

  /**
   * Get all relationships
   */
  public getRelations(params: object = {}): DirectusResponse<any[]> {
    AV.objectOrEmpty(params);
    return this.get('/relations', params);
  }

  /**
   * Creates new relation
   */
  public createRelation(data: /* TODO: */ object): DirectusResponse {
    return this.post('/relations', data);
  }

  /**
   * Updates existing relation
   */
  public updateRelation(primaryKey: PrimaryKeyType, data: /* TODO: */ object): DirectusResponse {
    return this.patch(`/relations/${primaryKey}`, data);
  }

  /**
   * Get the relationship information for the given collection
   */
  public getCollectionRelations(collection: string, params: object = {}): DirectusResponse {
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
  }

  /// REVISIONS ----------------------------------------------------------------

  /**
   * Get a single item's revisions by primary key
   */
  public getItemRevisions(collection: string, primaryKey: PrimaryKeyType, params: object = {}): DirectusResponse {
    AV.string(collection, 'collection');
    AV.notNull(primaryKey, 'primaryKey');
    AV.objectOrEmpty(params, 'params');

    if (collection.startsWith('directus_')) {
      return this.get(`/${collection.substring(9)}/${primaryKey}/revisions`, params);
    }

    return this.get(`/items/${collection}/${primaryKey}/revisions`, params);
  }

  /**
   * Revert an item to a previous state
   */
  public revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): DirectusResponse {
    AV.string(collection, 'collection');
    AV.notNull(primaryKey, 'primaryKey');
    AV.number(revisionID, 'revisionID');

    if (collection.startsWith('directus_')) {
      return this.patch(`/${collection.substring(9)}/${primaryKey}/revert/${revisionID}`);
    }

    return this.patch(`/items/${collection}/${primaryKey}/revert/${revisionID}`);
  }

  /// ROLES --------------------------------------------------------------------

  /**
   * Get a single user role
   */
  public getRole(primaryKey: PrimaryKeyType, params: object = {}): DirectusResponse {
    AV.number(primaryKey, 'primaryKey');
    AV.objectOrEmpty(params, 'params');
    return this.get(`/roles/${primaryKey}`, params);
  }

  /**
   * Get the user roles
   */
  public getRoles(params: object = {}): DirectusResponse {
    AV.objectOrEmpty(params, 'params');
    return this.get('/roles', params);
  }

  /**
   * Update a user role
   */
  public updateRole(primaryKey: PrimaryKeyType, body: BodyType): DirectusResponse {
    AV.notNull(primaryKey, 'primaryKey');
    AV.object(body, 'body');
    return this.updateItem('directus_roles', primaryKey, body);
  }

  /**
   * Create a new user role
   */
  public createRole(body: BodyType): DirectusResponse {
    AV.object(body, 'body');
    return this.createItem('directus_roles', body);
  }

  /**
   * Delete a user rol by primary key
   */
  public deleteRole(primaryKey: PrimaryKeyType): DirectusResponse {
    AV.notNull(primaryKey, 'primaryKey');
    return this.deleteItem('directus_roles', primaryKey);
  }

  /// SETTINGS -----------------------------------------------------------------

  /**
   * Get Directus' global settings
   */
  public getSettings(params: object = {}): DirectusResponse {
    AV.objectOrEmpty(params, 'params');
    return this.get('/settings', params);
  }

  /**
   * Get the "fields" for directus_settings
   */
  public getSettingsFields(params: object = {}): DirectusResponse {
    AV.objectOrEmpty(params, 'params');
    return this.get('/settings/fields', params);
  }

  /// USERS ---------------------------------------------------------------------

  /**
   * Get a list of available users in Directus
   */
  public getUsers(params: object = {}): DirectusResponse {
    AV.objectOrEmpty(params, 'params');
    return this.get('/users', params);
  }

  /**
   * Get a single Directus user
   */
  public getUser(primaryKey: PrimaryKeyType, params: object = {}): DirectusResponse {
    AV.notNull(primaryKey, 'primaryKey');
    AV.objectOrEmpty(params, 'params');
    return this.get(`/users/${primaryKey}`, params);
  }

  /**
   * Get the user info of the currently logged in user
   */
  public getMe(params: object = {}): DirectusResponse {
    AV.objectOrEmpty(params, 'params');
    return this.get('/users/me', params);
  }

  /**
   * Update a single user based on primaryKey
   */
  public updateUser(primaryKey: PrimaryKeyType, body: BodyType): DirectusResponse {
    AV.notNull(primaryKey, 'primaryKey');
    AV.object(body, 'body');
    return this.updateItem('directus_users', primaryKey, body);
  }

  /// UTILS --------------------------------------------------------------------

  /**
   * Ping the API to check if it exists / is up and running
   */
  public ping(): DirectusResponse {
    return this.request('get', '/server/ping', {}, {}, true);
  }

  /**
   * Get the server info from the API
   */
  public serverInfo(): DirectusResponse {
    return this.request('get', '/', {}, {}, true);
  }

  /**
   * Get the server info from the project
   */
  public projectInfo(): DirectusResponse {
    return this.request('get', '/');
  }

  /**
   * Get all the setup third party auth providers
   */
  public getThirdPartyAuthProviders(): DirectusResponse {
    return this.get('/auth/sso');
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
    AV.string(method, 'method');
    AV.string(endpoint, 'endpoint');
    AV.objectOrEmpty(params, 'params');
    Array.isArray(data) ? AV.arrayOrEmpty(data, 'data') : AV.objectOrEmpty(data, 'data');
    AV.string(this.url, 'this.url');

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

    if (this.token && typeof this.token === 'string' && this.token.length > 0) {
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

        if (typeof responseData !== 'object') {
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
      .catch((error: AxiosError & { json?: boolean; error: Error; data: any }) => {
        if (error.response) {
          throw error.response.data.error;
        } else if (error.json === true) {
          throw {
            code: -2,
            data: error.data,
            error: error.error,
            message: 'API returned invalid JSON',
          };
        } else {
          throw {
            code: -1,
            error,
            message: 'Network Error',
          };
        }
      });
  }

  /**
   * GET convenience method. Calls the request method for you
   */
  private get<T extends any = any>(endpoint: string, params: object = {}): DirectusResponse<T> {
    AV.string(endpoint, 'endpoint');
    AV.objectOrEmpty(params, 'params');

    return this.request('get', endpoint, params);
  }

  /**
   * POST convenience method. Calls the request method for you
   */
  private post<T extends any = any>(endpoint: string, body: BodyType = {}, params: object = {}): DirectusResponse<T> {
    AV.string(endpoint, 'endpoint');
    Array.isArray(body) ? AV.arrayOrEmpty(body, 'body') : AV.objectOrEmpty(body, 'body');

    return this.request<T>('post', endpoint, params, body);
  }

  /**
   * PATCH convenience method. Calls the request method for you
   */
  private patch<T extends any = any>(endpoint: string, body: BodyType = {}, params: object = {}): DirectusResponse<T> {
    AV.string(endpoint, 'endpoint');
    Array.isArray(body) ? AV.arrayOrEmpty(body, 'body') : AV.objectOrEmpty(body, 'body');

    return this.request<T>('patch', endpoint, params, body);
  }

  /**
   * PUT convenience method. Calls the request method for you
   */
  private put<T extends any = any>(endpoint: string, body: BodyType = {}, params: object = {}): DirectusResponse<T> {
    AV.string(endpoint, 'endpoint');
    Array.isArray(body) ? AV.arrayOrEmpty(body, 'body') : AV.objectOrEmpty(body, 'body');

    return this.request<T>('put', endpoint, params, body);
  }

  /**
   * DELETE convenience method. Calls the request method for you
   */
  private delete<T extends any = any>(endpoint: string): DirectusResponse<T> {
    AV.string(endpoint, 'endpoint');

    return this.request<T>('delete', endpoint);
  }

  /**
   * Gets the payload of the current token, return type can be generic
   */
  private getPayload<T extends object = object>(): T {
    if (!AV.isString(this.token)) {
      return null;
    }

    return getPayload<T>(this.token);
  }
}

export default SDK;
