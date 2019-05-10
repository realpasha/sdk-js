import { ILoginCredentials, ILoginOptions } from "./schemes/auth/Login";
import { BodyType } from "./schemes/http/Body";
import { IActivityResponse } from "./schemes/response/Activity";
import { ICollectionResponse, ICollectionsResponse } from "./schemes/response/Collection";
import { IFieldResponse, IFieldsResponse } from "./schemes/response/Field";
import { ILoginResponse } from "./schemes/response/Login";
import { IRevisionResponse } from "./schemes/response/Revision";
import { IRoleResponse } from "./schemes/response/Role";
import { IRefreshTokenResponse } from "./schemes/response/Token";
import { IUserResponse, IUsersResponse } from "./schemes/response/User";
import { getPayload } from "./utils/payload";
import { IAPI } from "./API";
import { IConfiguration, IConfigurationOptions } from "./Configuration";
import { IField } from "schemes/directus/Field";
import { IRelation } from "schemes/directus/Relation";
import { IRole } from "schemes/directus/Role";
import { IRelationsResponse } from "schemes/response/Relation";
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
declare type PrimaryKeyType = string | number;
export declare class SDK {
    readonly loggedIn: boolean;
    readonly payload: any;
    static getPayload: typeof getPayload;
    config: IConfiguration;
    api: IAPI;
    constructor(options: IConfigurationOptions);
    /**
     * Login to the API; Gets a new token from the API and stores it in this.api.token.
     */
    login(credentials: ILoginCredentials, options?: ILoginOptions): Promise<ILoginResponse>;
    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    logout(): void;
    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    reset(): void;
    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date).
     * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
     * - Calls onAutoRefreshError if refreshing the token fails for some reason.
     * @returns {[boolean, Error?]}
     */
    refreshIfNeeded(): Promise<[boolean, Error?]>;
    /**
     * Use the passed token to request a new one
     */
    refresh(token: string): Promise<IRefreshTokenResponse>;
    /**
     * Request to reset the password of the user with the given email address.
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     */
    requestPasswordReset<T extends any = any>(email: string): Promise<T>;
    /**
     * Get activity
     */
    getActivity(params?: QueryParamsType): Promise<IActivityResponse>;
    /**
     * Get the bookmarks of the current user
     * TODO: Add deprecation warning
     * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
     */
    getMyBookmarks<T extends any[] = any[]>(params?: QueryParamsType): Promise<T>;
    /**
     * Get all available collections
     */
    getCollections(params?: QueryParamsType): Promise<ICollectionsResponse[]>;
    /**
     * Get collection info by name
     */
    getCollection(collection: string, params?: QueryParamsType): Promise<ICollectionResponse>;
    /**
     * Create a collection
     */
    createCollection(data: ICollection): Promise<ICollectionResponse>;
    /**
     * Updates a certain collection
     */
    updateCollection(collection: string, data: Partial<ICollection>): Promise<ICollectionResponse>;
    /**
     * Deletes a certain collection
     */
    deleteCollection(collection: string): Promise<void>;
    /**
     * Create a new collection preset (bookmark / listing preferences)
     */
    createCollectionPreset<CollectionPreset extends ICollectionPreset>(data: CollectionPreset): Promise<ICollectionPresetResponse<CollectionPreset>>;
    /**
     * Update collection preset (bookmark / listing preference)
     */
    updateCollectionPreset<PartialCollectionPreset extends Partial<ICollectionPreset>, ResultCollectionPreset extends ICollectionPreset = ICollectionPreset>(primaryKey: PrimaryKeyType, data: IUpdateCollectionPresetBody): Promise<ICollectionPresetResponse<PartialCollectionPreset & ResultCollectionPreset>>;
    /**
     * Delete collection preset by primarykey
     */
    deleteCollectionPreset(primaryKey: PrimaryKeyType): Promise<void>;
    /**
     * Get the meta information of all installed interfaces
     */
    getInterfaces<T extends any[] = any[]>(): Promise<T>;
    /**
     * Get the meta information of all installed layouts
     */
    getLayouts<T extends any[] = any[]>(): Promise<T>;
    /**
     * Get the meta information of all installed pages
     */
    getPages<T extends any[] = any[]>(): Promise<T>;
    /**
     * Get all fields that are in Directus
     */
    getAllFields<T extends IField[]>(params?: QueryParamsType): Promise<IFieldsResponse<T>>;
    /**
     * Get the fields that have been setup for a given collection
     */
    getFields<T extends IField[]>(collection: string, params?: QueryParamsType): Promise<IFieldsResponse<T>>;
    /**
     * Get the field information for a single given field
     */
    getField<T extends IField>(collection: string, fieldName: string, params?: QueryParamsType): Promise<IFieldResponse<T>>;
    /**
     * Create a field in the given collection
     */
    createField<T extends IField>(collection: string, fieldInfo: T): Promise<IFieldResponse<T>>;
    /**
     * Update a given field in a given collection
     */
    updateField<T extends Partial<IField>>(collection: string, fieldName: string, fieldInfo: T): Promise<IFieldResponse<IField & T> | undefined>;
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
    updateFields<T extends IField[]>(collection: string, fields: Array<Partial<IField>>): Promise<IFieldsResponse<T & IField[]> | undefined>;
    updateFields<T extends IField[]>(collection: string, fields: string[], fieldInfo: Partial<IField>): Promise<IFieldsResponse<T & IField[]> | undefined>;
    /**
     * Delete a field from a collection
     */
    deleteField(collection: string, fieldName: string): Promise<void>;
    /**
     * Upload multipart files in multipart/form-data
     */
    uploadFiles<T extends any = any[]>(data: object, onUploadProgress?: () => object): Promise<T>;
    /**
     * Update an existing item
     * @typeparam PartialItem    Defining the item type in object schema
     * @typeparam Result         Extension of [PartialItem] as expected result
     * @return {Promise<IItemResponse<PartialItem & Result>>}
     */
    updateItem<PartialItem extends object, Result extends object = PartialItem>(collection: string, primaryKey: PrimaryKeyType, body: PartialItem, params?: QueryParamsType): Promise<IItemResponse<PartialItem & Result>>;
    /**
     * Update multiple items
     * @typeparam PartialItem    Defining an array of items, each in object schema
     * @typeparam Result         Extension of [PartialItem] as expected result
     * @return {Promise<IItemsResponse<PartialItem & Result>>}
     */
    updateItems<PartialItem extends object[], Result extends PartialItem = PartialItem>(collection: string, body: PartialItem, params?: QueryParamsType): Promise<IItemsResponse<PartialItem & Result>>;
    /**
     * Create a new item
     * @typeparam ItemType    Defining an item and its fields in object schema
     * @return {Promise<IItemsResponse<ItemType>>}
     */
    createItem<ItemType extends object>(collection: string, body: ItemType): Promise<IItemResponse<ItemType>>;
    /**
     * Create multiple items
     * @typeparam ItemsType    Defining an array of items, each in object schema
     * @return {Promise<IItemsResponse<ItemsType>>}
     */
    createItems<ItemsType extends Array<{}>>(collection: string, body: BodyType): Promise<IItemsResponse<ItemsType>>;
    /**
     * Get items from a given collection
     * @typeparam ItemsType    Defining an array of items, each in object schema
     * @return {Promise<IItemsResponse<ItemsType>>}
     */
    getItems<ItemsType extends Array<{}>>(collection: string, params?: QueryParamsType): Promise<IItemsResponse<ItemsType>>;
    /**
     * Get a single item by primary key
     * @typeparam ItemType    Defining fields of an item in object schema
     * @return {Promise<IItemResponse<ItemType>>}
     */
    getItem<ItemType extends object = {}>(collection: string, primaryKey: PrimaryKeyType, params?: QueryParamsType): Promise<IItemResponse<ItemType>>;
    /**
     * Delete a single item by primary key
     */
    deleteItem(collection: string, primaryKey: PrimaryKeyType): Promise<void>;
    /**
     * Delete multiple items by primary key
     */
    deleteItems(collection: string, primaryKeys: PrimaryKeyType[]): Promise<void>;
    /**
     * Get the collection presets of the current user for a single collection
     */
    getMyListingPreferences<T extends any[] = any[]>(collection: string, params?: QueryParamsType): Promise<T>;
    /**
     * Get permissions
     * @param {QueryParamsType?} params
     * @return {Promise<IPermission>}
     */
    getPermissions(params?: QueryParamsType): Promise<IItemsResponse<IPermission[]>>;
    /**
     * TODO: Fix type-def for return
     * Get the currently logged in user's permissions
     * @param {QueryParamsType?} params
     * @typeparam T   Permissions type as array extending any[]
     * @return {Promise<T>}
     */
    getMyPermissions<T extends any[] = any[]>(params?: QueryParamsType): Promise<T>;
    /**
     * TODO: Fix type-def for param and return
     * Create multiple new permissions
     * @param {any[]} data
     * @typeparam T   Permissions type as array extending any[]
     * @return {Promise<T>}
     */
    createPermissions<T extends any[] = any[]>(data: any[]): Promise<T>;
    /**
     * TODO: Fix type-def for param and return
     * Update multiple permission records
     * @param {any[]} data
     * @typeparam T   Permissions type as array extending any[]
     * @return {Promise<T>}
     */
    updatePermissions<T extends any[] = any[]>(data: any[]): Promise<T>;
    /**
     * Get all relationships
     * @param {QueryParamsType?} params
     * @return {Promise<IRelationsResponse>}
     */
    getRelations(params?: QueryParamsType): Promise<IRelationsResponse>;
    /**
     * Creates new relation
     * @param {IRelation} data
     * @return {Promise<IRelationResponse>}
     */
    createRelation(data: IRelation): Promise<IRelationResponse>;
    /**
     * Updates existing relation
     * @param {PrimaryKeyType} primaryKey
     * @param {Partial<IRelation>} data
     * @return {Promise<IRelationResponse>}
     */
    updateRelation(primaryKey: PrimaryKeyType, data: Partial<IRelation>): Promise<IRelationResponse>;
    /**
     * TODO: Add type-def for return value(s)
     * Get the relationship information for the given collection
     * @param {string} collection
     * @param {QueryParamsType?} params
     * @return {Promise<any[]>}
     */
    getCollectionRelations(collection: string, params?: QueryParamsType): Promise<any[]>;
    /**
     * Get a single item's revisions by primary key
     * @typeparam DataAndDelta  The data including delta type for the revision
     * @param {string} collection
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    getItemRevisions<DataAndDelta extends object = {}>(collection: string, primaryKey: PrimaryKeyType, params?: QueryParamsType): Promise<IRevisionResponse<DataAndDelta>>;
    /**
     * Revert an item to a previous state
     * @param {string} collection
     * @param {PrimaryKeyType} primaryKey
     * @param {number} revisionID
     */
    revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): Promise<void>;
    /**
     * Get a single user role
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    getRole(primaryKey: PrimaryKeyType, params?: QueryParamsType): Promise<IRoleResponse>;
    /**
     * Get the user roles
     * @param {QueryParamsType?} params
     */
    getRoles(params?: QueryParamsType): Promise<IRoleResponse[]>;
    /**
     * Update a user role
     * @param {PrimaryKeyType} primaryKey
     * @param {Role} body
     */
    updateRole<Role extends Partial<IRole>>(primaryKey: PrimaryKeyType, body: Role): Promise<IItemResponse<Role & IRole>>;
    /**
     * Create a new user role
     * @param {Role} body
     */
    createRole<Role extends IRole>(body: Role): Promise<IItemResponse<Role>>;
    /**
     * Delete a user rol by primary key
     * @param {PrimaryKeyType} primaryKey
     */
    deleteRole(primaryKey: PrimaryKeyType): Promise<void>;
    /**
     * Get Directus' global settings
     * @param {QueryParamsType?} params
     */
    getSettings(params?: QueryParamsType): Promise<ISettingsResponse>;
    /**
     * Get the "fields" for directus_settings
     * @param {QueryParamsType?} params
     */
    getSettingsFields(params?: QueryParamsType): Promise<IFieldsResponse<IField[]>>;
    /**
     * Get a list of available users in Directus
     * @param {QueryParamsType?} params
     */
    getUsers(params?: QueryParamsType): Promise<IUsersResponse<IUser[]>>;
    /**
     * Get a single Directus user
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    getUser<User extends IUser = IUser>(primaryKey: PrimaryKeyType, params?: QueryParamsType): Promise<IUserResponse<User>>;
    /**
     * Get the user info of the currently logged in user
     * @param {QueryParamsType?} params
     */
    getMe<User extends IUser = IUser>(params?: QueryParamsType): Promise<IUserResponse<User>>;
    /**
     * Update a single user based on primaryKey
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    updateUser<User extends Partial<IUser>>(primaryKey: PrimaryKeyType, body: User): Promise<IItemResponse<User & IUser>>;
    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     * @return {Promise<void>}
     */
    updateDatabase(): Promise<void>;
    /**
     * Ping the API to check if it exists / is up and running, returns "pong"
     * @return {Promise<string>}
     */
    ping(): Promise<string>;
    /**
     * Get the server info from the API
     * @return {Promise<IServerInformationResponse>}
     */
    serverInfo(): Promise<IServerInformationResponse>;
    /**
     * TODO: Add response type-def
     * Get the server info from the project
     * @return {Promise<any>}
     */
    projectInfo(): Promise<any>;
    /**
     * TODO: Add response type-def
     * Get all the setup third party auth providers
     * @return {Promise<any>}
     */
    getThirdPartyAuthProviders(): Promise<any>;
}
export {};
//# sourceMappingURL=SDK.d.ts.map