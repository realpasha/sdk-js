// Schemes types
import { ILoginCredentials, ILoginOptions } from "./schemes/auth/Login";
import { BodyType } from "./schemes/http/Body";
import { IActivityResponse } from "./schemes/response/Activity";
import { ICollectionResponse, ICollectionsResponse } from "./schemes/response/Collection";
import { IErrorResponse } from "./schemes/response/Error";
import { IFieldResponse, IFieldsResponse } from "./schemes/response/Field";
import { ILoginResponse } from "./schemes/response/Login";
import { IRevisionResponse } from "./schemes/response/Revision";
import { IRoleResponse } from "./schemes/response/Role";
import { IRefreshTokenResponse } from "./schemes/response/Token";
import { IUserResponse, IUsersResponse } from "./schemes/response/User";

// Utilities
import { getCollectionItemPath } from "./utils/collection";
import { getPayload } from "./utils/payload";

// Manager classes
import { API, IAPI } from "./API";
import { Configuration, IConfiguration, IConfigurationOptions } from "./Configuration";

// Invariant violation
import { IField } from "schemes/directus/Field";
import { IRelation } from "schemes/directus/Relation";
import { IRole } from "schemes/directus/Role";
import { ICreateCollectionPresetBody } from "schemes/request/Collection";
import { IRelationsResponse } from "schemes/response/Relation";
import { ISettingResponse } from "schemes/response/Setting";
import { ICollection } from "./schemes/directus/Collection";
import { ICollectionPreset } from "./schemes/directus/CollectionPreset";
import { IPermission } from "./schemes/directus/Permission";
import { IUser } from "./schemes/directus/User";
import { QueryParams as QueryParamsType } from "./schemes/http/Query";
import { IUpdateCollectionPresetBody } from "./schemes/request/Collection";
import { ICollectionPresetResponse } from "./schemes/response/CollectionPreset";
import { IItemResponse, IItemsResponse } from "./schemes/response/Item";
import { IRelationResponse } from "./schemes/response/Relation";
import { IServerInformationResponse } from "./schemes/response/ServerInformation";
import { ISettingsResponse } from "./schemes/response/Setting";
import { invariant } from "./utils/invariant";
import { isArray, isNotNull, isNumber, isObject, isObjectOrEmpty, isString } from "./utils/is";

type PrimaryKeyType = string | number;

export class SDK {
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

  // #region authentication

  /**
   * Login to the API; Gets a new token from the API and stores it in this.api.token.
   */
  public login(credentials: ILoginCredentials, options?: ILoginOptions): Promise<ILoginResponse> {
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

  // #endregion authentication

  // #endregion collection presets

  // #region activity

  /**
   * Get activity
   */
  public getActivity(params: QueryParamsType = {}): Promise<IActivityResponse> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IActivityResponse>("/activity", params);
  }

  // #endregion activity

  // #region bookmarks

  /**
   * Get the bookmarks of the current user
   * TODO: Add deprecation warning
   * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
   */
  public getMyBookmarks<T extends any[] = any[]>(params: QueryParamsType = {}): Promise<T> {
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

  // #endregion bookmarks

  // #region collections

  /**
   * Get all available collections
   */
  public getCollections(params: QueryParamsType = {}): Promise<ICollectionsResponse[]> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<ICollectionsResponse[]>("/collections", params);
  }

  /**
   * Get collection info by name
   */
  public getCollection(collection: string, params: QueryParamsType = {}): Promise<ICollectionResponse> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<ICollectionResponse>(`/collections/${collection}`, params);
  }

  /**
   * Create a collection
   */
  public createCollection(data: ICollection): Promise<ICollectionResponse> {
    invariant(isObject(data), "data must be an object");
    return this.api.post<ICollectionResponse>("/collections", data);
  }

  /**
   * Updates a certain collection
   */
  public updateCollection(collection: string, data: Partial<ICollection>): Promise<ICollectionResponse> {
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

  // #endregion collections

  // #region collection presets

  /**
   * Create a new collection preset (bookmark / listing preferences)
   */
  public createCollectionPreset<CollectionPreset extends ICollectionPreset>(
    data: CollectionPreset
  ): Promise<ICollectionPresetResponse<CollectionPreset>> {
    invariant(isObject(data), "data must be an object");

    return this.api.post<ICollectionPresetResponse<CollectionPreset>>("/collection_presets", data);
  }

  /**
   * Update collection preset (bookmark / listing preference)
   */
  // tslint:disable-next-line: max-line-length
  public updateCollectionPreset<
    PartialCollectionPreset extends Partial<ICollectionPreset>,
    ResultCollectionPreset extends ICollectionPreset = ICollectionPreset
  >(
    primaryKey: PrimaryKeyType,
    data: IUpdateCollectionPresetBody
  ): Promise<ICollectionPresetResponse<PartialCollectionPreset & ResultCollectionPreset>> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObject(data), "data must be an object");

    return this.api.patch<ICollectionPresetResponse<PartialCollectionPreset & ResultCollectionPreset>>(
      `/collection_presets/${primaryKey}`,
      data
    );
  }

  /**
   * Delete collection preset by primarykey
   */
  public deleteCollectionPreset(primaryKey: PrimaryKeyType): Promise<void> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");

    return this.api.delete<void>(`/collection_presets/${primaryKey}`);
  }

  // #endregion collection presets

  // #region extensions

  /**
   * Get the meta information of all installed interfaces
   */
  public getInterfaces<T extends any[] = any[]>(): Promise<T> {
    return this.api.request<T>("get", "/interfaces", {}, {}, true);
  }

  /**
   * Get the meta information of all installed layouts
   */
  public getLayouts<T extends any[] = any[]>(): Promise<T> {
    return this.api.request<T>("get", "/layouts", {}, {}, true);
  }

  /**
   * Get the meta information of all installed pages
   */
  public getPages<T extends any[] = any[]>(): Promise<T> {
    return this.api.request<T>("get", "/pages", {}, {}, true);
  }

  // #endregion extensions

  // #region fields

  /**
   * Get all fields that are in Directus
   */
  public getAllFields<T extends IField[]>(params: QueryParamsType = {}): Promise<IFieldsResponse<T>> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IFieldsResponse<T>>("/fields", params);
  }

  /**
   * Get the fields that have been setup for a given collection
   */
  public getFields<T extends IField[]>(collection: string, params: QueryParamsType = {}): Promise<IFieldsResponse<T>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IFieldsResponse<T>>(`/fields/${collection}`, params);
  }

  /**
   * Get the field information for a single given field
   */
  public getField<T extends IField>(
    collection: string,
    fieldName: string,
    params: QueryParamsType = {}
  ): Promise<IFieldResponse<T>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isString(fieldName), "fieldName must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IFieldResponse<T>>(`/fields/${collection}/${fieldName}`, params);
  }

  /**
   * Create a field in the given collection
   */
  public createField<T extends IField>(collection: string, fieldInfo: T): Promise<IFieldResponse<T>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObject(fieldInfo), "fieldInfo must be an object");

    return this.api.post<IFieldResponse<T>>(`/fields/${collection}`, fieldInfo);
  }

  /**
   * Update a given field in a given collection
   */
  public updateField<T extends Partial<IField>>(
    collection: string,
    fieldName: string,
    fieldInfo: T
  ): Promise<IFieldResponse<IField & T> | undefined> {
    invariant(isString(collection), "collection must be a string");
    invariant(isString(fieldName), "fieldName must be a string");
    invariant(isObject(fieldInfo), "fieldInfo must be an object");

    return this.api.patch<IFieldResponse<IField & T>>(`/fields/${collection}/${fieldName}`, fieldInfo);
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
  public updateFields<T extends IField[]>(
    collection: string,
    fields: Array<Partial<IField>>
  ): Promise<IFieldsResponse<T & IField[]> | undefined>;
  public updateFields<T extends IField[]>(
    collection: string,
    fields: string[],
    fieldInfo: Partial<IField>
  ): Promise<IFieldsResponse<T & IField[]> | undefined>;
  public updateFields<T extends IField[]>(
    collection: string,
    fieldsInfoOrFieldNames: string[] | Array<Partial<IField>>,
    fieldInfo: Partial<IField> | null = null
  ): Promise<IFieldsResponse<T & IField[]> | undefined> {
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

  // #endregion fields

  // #region files

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
      .catch((error: IErrorResponse) => {
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

  // #endregion files

  // #region items

  /**
   * Update an existing item
   * @typeparam PartialItem    Defining the item type in object schema
   * @typeparam Result         Extension of [PartialItem] as expected result
   * @return {Promise<IItemResponse<PartialItem & Result>>}
   */
  public updateItem<PartialItem extends object, Result extends object = PartialItem>(
    collection: string,
    primaryKey: PrimaryKeyType,
    body: PartialItem,
    params: QueryParamsType = {}
  ): Promise<IItemResponse<PartialItem & Result>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObject(body), "body must be an object");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.patch<IItemResponse<PartialItem & Result>>(`${collectionBasePath}/${primaryKey}`, body, params);
  }

  /**
   * Update multiple items
   * @typeparam PartialItem    Defining an array of items, each in object schema
   * @typeparam Result         Extension of [PartialItem] as expected result
   * @return {Promise<IItemsResponse<PartialItem & Result>>}
   */
  public updateItems<PartialItem extends object[], Result extends PartialItem = PartialItem>(
    collection: string,
    body: PartialItem,
    params: QueryParamsType = {}
  ) {
    invariant(isString(collection), "collection must be a string");
    invariant(isArray(body), "body must be an array");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.patch<IItemsResponse<PartialItem & Result>>(collectionBasePath, body, params);
  }

  /**
   * Create a new item
   * @typeparam ItemType    Defining an item and its fields in object schema
   * @return {Promise<IItemsResponse<ItemType>>}
   */
  public createItem<ItemType extends object>(collection: string, body: ItemType): Promise<IItemResponse<ItemType>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObject(body), "body must be an object");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.post<IItemResponse<ItemType>>(collectionBasePath, body);
  }

  /**
   * Create multiple items
   * @typeparam ItemsType    Defining an array of items, each in object schema
   * @return {Promise<IItemsResponse<ItemsType>>}
   */
  public createItems<ItemsType extends Array<{}>>(
    collection: string,
    body: BodyType
  ): Promise<IItemsResponse<ItemsType>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isArray(body), "body must be an array");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.post<IItemsResponse<ItemsType>>(collectionBasePath, body);
  }

  /**
   * Get items from a given collection
   * @typeparam ItemsType    Defining an array of items, each in object schema
   * @return {Promise<IItemsResponse<ItemsType>>}
   */
  public getItems<ItemsType extends Array<{}>>(
    collection: string,
    params: QueryParamsType = {}
  ): Promise<IItemsResponse<ItemsType>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.get<IItemsResponse<ItemsType>>(collectionBasePath, params);
  }

  /**
   * Get a single item by primary key
   * @typeparam ItemType    Defining fields of an item in object schema
   * @return {Promise<IItemResponse<ItemType>>}
   */
  public getItem<ItemType extends object = {}>(
    collection: string,
    primaryKey: PrimaryKeyType,
    params: QueryParamsType = {}
  ): Promise<IItemResponse<ItemType>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.get<IItemResponse<ItemType>>(`${collectionBasePath}/${primaryKey}`, params);
  }

  /**
   * Delete a single item by primary key
   */
  public deleteItem(collection: string, primaryKey: PrimaryKeyType) {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.delete<void>(`${collectionBasePath}/${primaryKey}`);
  }

  /**
   * Delete multiple items by primary key
   */
  public deleteItems(collection: string, primaryKeys: PrimaryKeyType[]) {
    invariant(isString(collection), "collection must be a string");
    invariant(isArray(primaryKeys), "primaryKeys must be an array");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.delete<void>(`${collectionBasePath}/${primaryKeys.join()}`);
  }

  // #endregion items

  // #region listing preferences

  /**
   * Get the collection presets of the current user for a single collection
   */
  public getMyListingPreferences<T extends any[] = any[]>(
    collection: string,
    params: QueryParamsType = {}
  ): Promise<T> {
    invariant(isString(this.config.token), "token must be defined");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    const payload = this.api.getPayload<{ role: string; id: string }>();

    return Promise.all([
      this.api.get<IFieldResponse<any>>("/collection_presets", {
        "filter[collection][eq]": collection,
        "filter[role][null]": 1,
        "filter[title][null]": 1,
        "filter[user][null]": 1,
        limit: 1,
        sort: "-id",
      }),
      this.api.get<IFieldResponse<any>>("/collection_presets", {
        "filter[collection][eq]": collection,
        "filter[role][eq]": payload.role,
        "filter[title][null]": 1,
        "filter[user][null]": 1,
        limit: 1,
        sort: "-id",
      }),
      this.api.get<IFieldResponse<any>>("/collection_presets", {
        "filter[collection][eq]": collection,
        "filter[role][eq]": payload.role,
        "filter[title][null]": 1,
        "filter[user][eq]": payload.id,
        limit: 1,
        sort: "-id",
      }),
    ]).then((values: Array<IFieldResponse<any>>) => {
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

  // #endregion listing preferences

  // #region permissions

  /**
   * Get permissions
   * @param {QueryParamsType?} params
   * @return {Promise<IPermission>}
   */
  public getPermissions(params: QueryParamsType = {}): Promise<IItemsResponse<IPermission[]>> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.getItems<IPermission[]>("directus_permissions", params);
  }

  /**
   * TODO: Fix type-def for return
   * Get the currently logged in user's permissions
   * @param {QueryParamsType?} params
   * @typeparam T   Permissions type as array extending any[]
   * @return {Promise<T>}
   */
  public getMyPermissions<T extends any[] = any[]>(params: QueryParamsType = {}): Promise<T> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get("/permissions/me", params);
  }

  /**
   * TODO: Fix type-def for param and return
   * Create multiple new permissions
   * @param {any[]} data
   * @typeparam T   Permissions type as array extending any[]
   * @return {Promise<T>}
   */
  public createPermissions<T extends any[] = any[]>(data: any[]): Promise<T> {
    invariant(isArray(data), "data must be anarry");

    return this.api.post("/permissions", data);
  }

  /**
   * TODO: Fix type-def for param and return
   * Update multiple permission records
   * @param {any[]} data
   * @typeparam T   Permissions type as array extending any[]
   * @return {Promise<T>}
   */
  public updatePermissions<T extends any[] = any[]>(data: any[]): Promise<T> {
    invariant(isArray(data), "data must be anarry");

    return this.api.patch<T>("/permissions", data);
  }

  // #endregion permissions

  // #region relations

  /**
   * Get all relationships
   * @param {QueryParamsType?} params
   * @return {Promise<IRelationsResponse>}
   */
  public getRelations(params: QueryParamsType = {}) {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");
    return this.api.get<IRelationsResponse>("/relations", params);
  }

  /**
   * Creates new relation
   * @param {IRelation} data
   * @return {Promise<IRelationResponse>}
   */
  public createRelation(data: IRelation) {
    return this.api.post<IRelationResponse>("/relations", data);
  }

  /**
   * Updates existing relation
   * @param {PrimaryKeyType} primaryKey
   * @param {Partial<IRelation>} data
   * @return {Promise<IRelationResponse>}
   */
  public updateRelation(primaryKey: PrimaryKeyType, data: Partial<IRelation>) {
    return this.api.patch<IRelationResponse>(`/relations/${primaryKey}`, data);
  }

  /**
   * TODO: Add type-def for return value(s)
   * Get the relationship information for the given collection
   * @param {string} collection
   * @param {QueryParamsType?} params
   * @return {Promise<any[]>}
   */
  public getCollectionRelations(collection: string, params: QueryParamsType = {}): Promise<any[]> {
    invariant(isString(collection), "collection must be a string");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return Promise.all([
      this.api.get<any>("/relations", {
        "filter[collection_a][eq]": collection,
      }),
      this.api.get<any>("/relations", {
        "filter[collection_b][eq]": collection,
      }),
    ]);
  }

  // #endregion relations

  // #region revisions

  /**
   * Get a single item's revisions by primary key
   * @typeparam DataAndDelta  The data including delta type for the revision
   * @param {string} collection
   * @param {PrimaryKeyType} primaryKey
   * @param {QueryParamsType?} params
   */
  public getItemRevisions<DataAndDelta extends object = {}>(
    collection: string,
    primaryKey: PrimaryKeyType,
    params: QueryParamsType = {}
  ): Promise<IRevisionResponse<DataAndDelta>> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.get<IRevisionResponse<DataAndDelta>>(`${collectionBasePath}/${primaryKey}/revisions`, params);
  }

  /**
   * Revert an item to a previous state
   * @param {string} collection
   * @param {PrimaryKeyType} primaryKey
   * @param {number} revisionID
   */
  public revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): Promise<void> {
    invariant(isString(collection), "collection must be a string");
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isNumber(revisionID), "revisionID must be a number");

    const collectionBasePath = getCollectionItemPath(collection);

    return this.api.patch(`${collectionBasePath}/${primaryKey}/revert/${revisionID}`);
  }

  // #endregion revisions

  // #region roles

  /**
   * Get a single user role
   * @param {PrimaryKeyType} primaryKey
   * @param {QueryParamsType?} params
   */
  public getRole(primaryKey: PrimaryKeyType, params: QueryParamsType = {}): Promise<IRoleResponse> {
    invariant(isNumber(primaryKey), "primaryKey must be a number");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IRoleResponse>(`/roles/${primaryKey}`, params);
  }

  /**
   * Get the user roles
   * @param {QueryParamsType?} params
   */
  public getRoles(params: QueryParamsType = {}): Promise<IRoleResponse[]> {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IRoleResponse[]>("/roles", params);
  }

  /**
   * Update a user role
   * @param {PrimaryKeyType} primaryKey
   * @param {Role} body
   */
  public updateRole<Role extends Partial<IRole>>(primaryKey: PrimaryKeyType, body: Role) {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObject(body), "body must be an object");

    return this.updateItem<Role, IRole>("directus_roles", primaryKey, body);
  }

  /**
   * Create a new user role
   * @param {Role} body
   */
  public createRole<Role extends IRole>(body: Role) {
    invariant(isObject(body), "body must be an object");

    return this.createItem("directus_roles", body);
  }

  /**
   * Delete a user rol by primary key
   * @param {PrimaryKeyType} primaryKey
   */
  public deleteRole(primaryKey: PrimaryKeyType): Promise<void> {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");

    return this.deleteItem("directus_roles", primaryKey);
  }

  // #endregion roles

  // #region settings

  /**
   * Get Directus' global settings
   * @param {QueryParamsType?} params
   */
  public getSettings(params: QueryParamsType = {}) {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<ISettingsResponse>("/settings", params);
  }

  /**
   * Get the "fields" for directus_settings
   * @param {QueryParamsType?} params
   */
  public getSettingsFields(params: QueryParamsType = {}) {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IFieldsResponse>("/settings/fields", params);
  }

  // #endregion settings

  // #region users

  /**
   * Get a list of available users in Directus
   * @param {QueryParamsType?} params
   */
  public getUsers(params: QueryParamsType = {}) {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IUsersResponse>("/users", params);
  }

  /**
   * Get a single Directus user
   * @param {PrimaryKeyType} primaryKey
   * @param {QueryParamsType?} params
   */
  public getUser<User extends IUser = IUser>(primaryKey: PrimaryKeyType, params: QueryParamsType = {}) {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IUserResponse<User>>(`/users/${primaryKey}`, params);
  }

  /**
   * Get the user info of the currently logged in user
   * @param {QueryParamsType?} params
   */
  public getMe<User extends IUser = IUser>(params: QueryParamsType = {}) {
    invariant(isObjectOrEmpty(params), "params must be an object or empty");

    return this.api.get<IUserResponse<User>>("/users/me", params);
  }

  /**
   * Update a single user based on primaryKey
   * @param {PrimaryKeyType} primaryKey
   * @param {QueryParamsType?} params
   */
  public updateUser<User extends Partial<IUser>>(primaryKey: PrimaryKeyType, body: User) {
    invariant(isNotNull(primaryKey), "primaryKey must be defined");
    invariant(isObject(body), "body must be an object");

    return this.updateItem<User, IUser>("directus_users", primaryKey, body);
  }

  // #endregion users

  // #region server admin

  /**
   * This will update the database of the API instance to the latest version
   * using the migrations in the API
   * @return {Promise<void>}
   */
  public updateDatabase(): Promise<void> {
    return this.api.post("/update");
  }

  /**
   * Ping the API to check if it exists / is up and running, returns "pong"
   * @return {Promise<string>}
   */
  public ping(): Promise<string> {
    return this.api.request("get", "/server/ping", {}, {}, true, {}, true);
  }

  /**
   * Get the server info from the API
   * @return {Promise<IServerInformationResponse>}
   */
  public serverInfo(): Promise<IServerInformationResponse> {
    return this.api.request("get", "/", {}, {}, true);
  }

  /**
   * TODO: Add response type-def
   * Get the server info from the project
   * @return {Promise<any>}
   */
  public projectInfo(): Promise<any> {
    return this.api.request("get", "/");
  }

  /**
   * TODO: Add response type-def
   * Get all the setup third party auth providers
   * @return {Promise<any>}
   */
  public getThirdPartyAuthProviders(): Promise<any> {
    return this.api.get("/auth/sso");
  }

  // #endregion server admin
}
