import { getPayload } from './payload';
import { BodyType, DirectusResponse, IClientOptions, ICollection, ILoginCredentials, ILoginOptions, ILoginResponse, PrimaryKeyType } from './types';
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
    private readonly xhr;
    private refreshInterval?;
    private onAutoRefreshError?;
    private onAutoRefreshSuccess?;
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
     */
    refreshIfNeeded(): void;
    /**
     * Use the passed token to request a new one
     */
    refresh(token: string): DirectusResponse;
    /**
     * Request to reset the password of the user with the given email address.
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     */
    requestPasswordReset(email: string): DirectusResponse;
    /**
     * Get activity
     */
    getActivity(params?: object): DirectusResponse;
    /**
     * Get the bookmarks of the current user
     */
    getMyBookmarks(params?: object): Promise<any[]>;
    /**
     * Get all available collections
     */
    getCollections(params?: object): Promise<ICollection[]>;
    /**
     * Get collection info by name
     */
    getCollection(collection: string, params?: object): Promise<ICollection>;
    /**
     * Create a collection
     */
    createCollection(data: object): DirectusResponse;
    /**
     * Updates a certain collection
     */
    updateCollection(collection: string, data: object): DirectusResponse;
    /**
     * Deletes a certain collection
     */
    deleteCollection(collection: string): DirectusResponse;
    /**
     * Create a new collection preset (bookmark / listing preferences)
     */
    createCollectionPreset(data: object): DirectusResponse;
    /**
     * Update collection preset (bookmark / listing preference)
     */
    updateCollectionPreset(primaryKey: PrimaryKeyType, data: object): DirectusResponse;
    /**
     * Delete collection preset by primarykey
     */
    deleteCollectionPreset(primaryKey: PrimaryKeyType): DirectusResponse;
    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     */
    updateDatabase(): DirectusResponse;
    /**
     * Get the meta information of all installed interfaces
     */
    getInterfaces(): DirectusResponse;
    /**
     * Get the meta information of all installed layouts
     */
    getLayouts(): DirectusResponse;
    /**
     * Get the meta information of all installed pages
     */
    getPages(): DirectusResponse;
    /**
     * Get all fields that are in Directus
     */
    getAllFields(params?: object): DirectusResponse;
    /**
     * Get the fields that have been setup for a given collection
     */
    getFields(collection: string, params?: object): DirectusResponse;
    /**
     * Get the field information for a single given field
     */
    getField(collection: string, fieldName: string, params?: object): DirectusResponse;
    /**
     * Create a field in the given collection
     */
    createField(collection: string, fieldInfo: object): DirectusResponse;
    /**
     * Update a given field in a given collection
     */
    updateField(collection: string, fieldName: string, fieldInfo: object): DirectusResponse;
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
    updateFields(collection: string, fieldsInfoOrFieldNames: string[] | object[], fieldInfo?: object): DirectusResponse;
    /**
     * Delete a field from a collection
     */
    deleteField(collection: string, fieldName: string): DirectusResponse;
    /**
     * Upload multipart files in multipart/form-data
     */
    uploadFiles(data: object, onUploadProgress?: () => object): DirectusResponse;
    /**
     * Update an existing item
     */
    updateItem(collection: string, primaryKey: PrimaryKeyType, body: BodyType, params?: object): DirectusResponse;
    /**
     * Update multiple items
     */
    updateItems(collection: string, body: BodyType, params?: object): DirectusResponse;
    /**
     * Create a new item
     */
    createItem(collection: string, body: BodyType): DirectusResponse;
    /**
     * Create multiple items
     */
    createItems(collection: string, body: BodyType): DirectusResponse;
    /**
     * Get items from a given collection
     */
    getItems(collection: string, params?: object): DirectusResponse<any[]>;
    /**
     * Get a single item by primary key
     */
    getItem(collection: string, primaryKey: PrimaryKeyType, params?: object): DirectusResponse;
    /**
     * Delete a single item by primary key
     * @param  {String} collection  The collection to delete the item from
     * @param  {String|Number} primaryKey Primary key of the item
     * @return {DirectusResponse}
     */
    deleteItem(collection: string, primaryKey: PrimaryKeyType): Promise<any>;
    /**
     * Delete multiple items by primary key
     */
    deleteItems(collection: string, primaryKeys: PrimaryKeyType[]): DirectusResponse;
    /**
     * Get the collection presets of the current user for a single collection
     */
    getMyListingPreferences(collection: string, params?: object): DirectusResponse;
    /**
     * Get permissions
     */
    getPermissions(params?: object): DirectusResponse;
    /**
     * Get the currently logged in user's permissions
     */
    getMyPermissions(params?: object): DirectusResponse;
    /**
     * Create multiple new permissions
     */
    createPermissions(data: any[]): DirectusResponse;
    /**
     * Update multiple permission records
     */
    updatePermissions(data: any[]): DirectusResponse;
    /**
     * Get all relationships
     */
    getRelations(params?: object): DirectusResponse<any[]>;
    /**
     * Creates new relation
     */
    createRelation(data: object): DirectusResponse;
    /**
     * Updates existing relation
     */
    updateRelation(primaryKey: PrimaryKeyType, data: object): DirectusResponse;
    /**
     * Get the relationship information for the given collection
     */
    getCollectionRelations(collection: string, params?: object): DirectusResponse;
    /**
     * Get a single item's revisions by primary key
     */
    getItemRevisions(collection: string, primaryKey: PrimaryKeyType, params?: object): DirectusResponse;
    /**
     * Revert an item to a previous state
     */
    revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): DirectusResponse;
    /**
     * Get a single user role
     */
    getRole(primaryKey: PrimaryKeyType, params?: object): DirectusResponse;
    /**
     * Get the user roles
     */
    getRoles(params?: object): DirectusResponse;
    /**
     * Update a user role
     */
    updateRole(primaryKey: PrimaryKeyType, body: BodyType): DirectusResponse;
    /**
     * Create a new user role
     */
    createRole(body: BodyType): DirectusResponse;
    /**
     * Delete a user rol by primary key
     */
    deleteRole(primaryKey: PrimaryKeyType): DirectusResponse;
    /**
     * Get Directus' global settings
     */
    getSettings(params?: object): DirectusResponse;
    /**
     * Get the "fields" for directus_settings
     */
    getSettingsFields(params?: object): DirectusResponse;
    /**
     * Get a list of available users in Directus
     */
    getUsers(params?: object): DirectusResponse;
    /**
     * Get a single Directus user
     */
    getUser(primaryKey: PrimaryKeyType, params?: object): DirectusResponse;
    /**
     * Get the user info of the currently logged in user
     */
    getMe(params?: object): DirectusResponse;
    /**
     * Update a single user based on primaryKey
     */
    updateUser(primaryKey: PrimaryKeyType, body: BodyType): DirectusResponse;
    /**
     * Ping the API to check if it exists / is up and running
     */
    ping(): DirectusResponse;
    /**
     * Get the server info from the API
     */
    serverInfo(): DirectusResponse;
    /**
     * Get the server info from the project
     */
    projectInfo(): DirectusResponse;
    /**
     * Get all the setup third party auth providers
     */
    getThirdPartyAuthProviders(): DirectusResponse;
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