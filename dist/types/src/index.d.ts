import { BodyType } from './schemes/http/Body';
import { ILoginCredentials, ILoginOptions } from './schemes/auth/Login';
import { IActivityResponse } from './schemes/response/Activity';
import { ICollectionResponse, ICollectionsResponse } from './schemes/response/Collection';
import { IField } from './schemes/response/Field';
import { ILoginResponse } from './schemes/response/Login';
import { IRevisionResponse } from './schemes/response/Revision';
import { IRoleResponse } from './schemes/response/Role';
import { IRefreshTokenResponse } from './schemes/response/Token';
import { IUserResponse, IUsersResponse } from './schemes/response/User';
import { getPayload } from './payload';
import { IClientOptions, PrimaryKeyType } from './types';
declare class SDK {
    /**
     * If the current auth status is logged in
     */
    readonly loggedIn: boolean;
    static getPayload: typeof getPayload;
    private token;
    private url;
    private project;
    private localExp?;
    private storage?;
    private refreshInterval?;
    private onAutoRefreshError?;
    private onAutoRefreshSuccess?;
    private readonly xhr;
    /**
     * Create a new SDK instance
     */
    constructor(options?: IClientOptions);
    /**
     * Login to the API; Gets a new token from the API and stores it in this.token.
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
    getActivity(params?: object): Promise<IActivityResponse>;
    /**
     * Get the bookmarks of the current user
     * TODO: Add deprecation warning
     * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
     */
    getMyBookmarks<T extends any[] = any[]>(params?: object): Promise<T>;
    /**
     * Get all available collections
     */
    getCollections(params?: object): Promise<ICollectionsResponse[]>;
    /**
     * Get collection info by name
     */
    getCollection(collection: string, params?: object): Promise<ICollectionResponse>;
    /**
     * Create a collection
     */
    createCollection(data: object): Promise<ICollectionResponse>;
    /**
     * Updates a certain collection
     */
    updateCollection(collection: string, data: object): Promise<ICollectionResponse>;
    /**
     * Deletes a certain collection
     */
    deleteCollection(collection: string): Promise<void>;
    /**
     * Create a new collection preset (bookmark / listing preferences)
     */
    createCollectionPreset<T extends any = any>(data: object): Promise<T>;
    /**
     * Update collection preset (bookmark / listing preference)
     */
    updateCollectionPreset<T extends any = any>(primaryKey: PrimaryKeyType, data: object): Promise<T>;
    /**
     * Delete collection preset by primarykey
     */
    deleteCollectionPreset(primaryKey: PrimaryKeyType): Promise<void>;
    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     */
    updateDatabase(): Promise<void>;
    /**
     * Get the meta information of all installed interfaces
     */
    getInterfaces<T extends any = any>(): Promise<T>;
    /**
     * Get the meta information of all installed layouts
     */
    getLayouts<T extends any = any>(): Promise<T>;
    /**
     * Get the meta information of all installed pages
     */
    getPages<T extends any = any>(): Promise<T>;
    /**
     * Get all fields that are in Directus
     */
    getAllFields<T extends any = any>(params?: object): Promise<T>;
    /**
     * Get the fields that have been setup for a given collection
     */
    getFields<T extends any = any>(collection: string, params?: object): Promise<T>;
    /**
     * Get the field information for a single given field
     */
    getField<T extends any = any>(collection: string, fieldName: string, params?: object): Promise<T>;
    /**
     * Create a field in the given collection
     */
    createField<T extends any = any>(collection: string, fieldInfo: object): Promise<T>;
    /**
     * Update a given field in a given collection
     */
    updateField<T extends any = any>(collection: string, fieldName: string, fieldInfo: object): Promise<T>;
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
    updateFields<T extends any[] = any[]>(collection: string, fieldsInfoOrFieldNames: string[] | object[], fieldInfo?: object): Promise<IField<T> | undefined>;
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
     */
    updateItem<T extends any = any>(collection: string, primaryKey: PrimaryKeyType, body: BodyType, params?: object): Promise<T>;
    /**
     * Update multiple items
     */
    updateItems<T extends any[] = any[]>(collection: string, body: BodyType, params?: object): Promise<T>;
    /**
     * Create a new item
     */
    createItem<T extends any = any>(collection: string, body: BodyType): Promise<T>;
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
    createItems<T extends any[] = any[]>(collection: string, body: BodyType): Promise<IField<T>>;
    /**
     * Get items from a given collection
     */
    getItems<T extends any[] = any[]>(collection: string, params?: object): Promise<IField<T>>;
    /**
     * Get a single item by primary key
     */
    getItem<T extends any = any>(collection: string, primaryKey: PrimaryKeyType, params?: object): Promise<IField<T>>;
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
    getMyListingPreferences<T extends any[] = any[]>(collection: string, params?: object): Promise<T>;
    /**
     * Get permissions
     */
    getPermissions<T extends any[] = any[]>(params?: object): Promise<IField<T>>;
    /**
     * Get the currently logged in user's permissions
     */
    getMyPermissions<T extends any[] = any[]>(params?: object): Promise<T>;
    /**
     * Create multiple new permissions
     */
    createPermissions<T extends any[] = any[]>(data: any[]): Promise<T>;
    /**
     * Update multiple permission records
     */
    updatePermissions<T extends any[] = any[]>(data: any[]): Promise<T>;
    /**
     * Get all relationships
     */
    getRelations<T extends any[] = any[]>(params?: object): Promise<T>;
    /**
     * Creates new relation
     */
    createRelation<T extends any = any>(data: object): Promise<T>;
    /**
     * Updates existing relation
     */
    updateRelation<T extends any = any>(primaryKey: PrimaryKeyType, data: object): Promise<T>;
    /**
     * Get the relationship information for the given collection
     */
    getCollectionRelations<T extends any = any>(collection: string, params?: object): Promise<T[]>;
    /**
     * Get a single item's revisions by primary key
     */
    getItemRevisions<T extends any = any>(collection: string, primaryKey: PrimaryKeyType, params?: object): Promise<IRevisionResponse<T>>;
    /**
     * Revert an item to a previous state
     */
    revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): Promise<void>;
    /**
     * Get a single user role
     */
    getRole(primaryKey: PrimaryKeyType, params?: object): Promise<IRoleResponse>;
    /**
     * Get the user roles
     */
    getRoles(params?: object): Promise<IRoleResponse[]>;
    /**
     * Update a user role
     */
    updateRole(primaryKey: PrimaryKeyType, body: BodyType): Promise<IRoleResponse>;
    /**
     * Create a new user role
     */
    createRole(body: BodyType): Promise<IRoleResponse>;
    /**
     * Delete a user rol by primary key
     */
    deleteRole(primaryKey: PrimaryKeyType): Promise<void>;
    /**
     * Get Directus' global settings
     */
    getSettings(params?: object): Promise<any>;
    /**
     * Get the "fields" for directus_settings
     */
    getSettingsFields(params?: object): Promise<any>;
    /**
     * Get a list of available users in Directus
     */
    getUsers(params?: object): Promise<IUsersResponse>;
    /**
     * Get a single Directus user
     */
    getUser(primaryKey: PrimaryKeyType, params?: object): Promise<IUserResponse>;
    /**
     * Get the user info of the currently logged in user
     */
    getMe(params?: object): Promise<IUserResponse>;
    /**
     * Update a single user based on primaryKey
     */
    updateUser(primaryKey: PrimaryKeyType, body: BodyType): Promise<IUserResponse>;
    /**
     * Ping the API to check if it exists / is up and running
     */
    ping(): Promise<void>;
    /**
     * Get the server info from the API
     */
    serverInfo(): Promise<any>;
    /**
     * Get the server info from the project
     */
    projectInfo(): Promise<any>;
    /**
     * Get all the setup third party auth providers
     */
    getThirdPartyAuthProviders(): Promise<any>;
    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
     */
    private startInterval;
    /**
     * Clears and nullifies the token refreshing interval
     */
    private stopInterval;
    /**
     * Perform an API request to the Directus API
     */
    private request;
    /**
     * GET convenience method. Calls the request method for you
     */
    private get;
    /**
     * POST convenience method. Calls the request method for you
     */
    private post;
    /**
     * PATCH convenience method. Calls the request method for you
     */
    private patch;
    /**
     * PUT convenience method. Calls the request method for you
     */
    private put;
    /**
     * DELETE convenience method. Calls the request method for you
     */
    private delete;
    /**
     * Gets the payload of the current token, return type can be generic
     */
    private getPayload;
}
export default SDK;
//# sourceMappingURL=index.d.ts.map