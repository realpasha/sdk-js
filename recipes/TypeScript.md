## `@directus/sdk-js` with TypeScript

First off; each method provided in the SDK supports a generic parameter which 
controls what the return value should be. If you don't know what generic parameters 
are please head over to the [TypeScript documentation about generics](https://www.typescriptlang.org/docs/handbook/generics.html).

> In all our provided cases, the `client` will be an instance of the SDK!

#### Items

```ts
getItem<T>(collection: string, pk: PrimaryKey): Promise<IField<T>>;
getItems<T>(collection: string): Promise<IField<T>>;
```

###### getItems
> [index.ts#L625](../src/index.ts#L625)
```ts
type Article = {
    title: string,
    body: string
};

const posts = client.getItems<Article[]>('posts');
/*
{
    meta: { ... },
    data: [
        { title: 'My first post', body: 'Lorem ipsum ...' },
        ...
    ]
}
*/
```

#### All Signatures
```ts
// Authentication
login(credentials: ILoginCredentials, options?: ILoginOptions): Promise<ILoginResponse>;
logout(): void;
reset(): void;
refreshIfNeeded(): Promise<[boolean, Error?]>;
refresh(token: string): Promise<IRefreshTokenResponse>;
requestPasswordReset<T extends any = any>(email: string): Promise<T>;
getThirdPartyAuthProviders(): Promise<any>;

// Activity and user based
getActivity(params?: object): Promise<IActivityResponse>;
getMyBookmarks<T extends any[] = any[]>(params?: object): Promise<T>;

// Collection
getCollections(params?: object): Promise<ICollectionsResponse[]>;
getCollection(collection: string, params?: object): Promise<ICollectionResponse>;
createCollection(data: object): Promise<ICollectionResponse>;
updateCollection(collection: string, data: object): Promise<ICollectionResponse>;
deleteCollection(collection: string): Promise<void>;
createCollectionPreset<T extends any = any>(data: object): Promise<T>;
updateCollectionPreset<T extends any = any>(primaryKey: PrimaryKeyType, data: object): Promise<T>;
deleteCollectionPreset(primaryKey: PrimaryKeyType): Promise<void>;

// Database
updateDatabase(): Promise<void>;

// Predefined
getInterfaces<T extends any = any>(): Promise<T>;
getLayouts<T extends any = any>(): Promise<T>;
getPages<T extends any = any>(): Promise<T>;

// Fields
getAllFields<T extends any = any>(params?: object): Promise<T>;
getFields<T extends any = any>(collection: string, params?: object): Promise<T>;
getField<T extends any = any>(collection: string, fieldName: string, params?: object): Promise<T>;
createField<T extends any = any>(collection: string, fieldInfo: object): Promise<T>;
updateField<T extends any = any>(collection: string, fieldName: string, fieldInfo: object): Promise<T>;
updateFields<T extends any[] = any[]>(collection: string, fieldsInfoOrFieldNames: string[] | object[], fieldInfo?: object): Promise<IField<T> | undefined>;
deleteField(collection: string, fieldName: string): Promise<void>;

// Files
uploadFiles<T extends any = any[]>(data: object, onUploadProgress?: () => object): Promise<T>;

// Items
updateItem<T extends any = any>(collection: string, primaryKey: PrimaryKeyType, body: BodyType, params?: object): Promise<T>;
updateItems<T extends any[] = any[]>(collection: string, body: BodyType, params?: object): Promise<T>;
createItem<T extends any = any>(collection: string, body: BodyType): Promise<T>;
createItems<T extends any[] = any[]>(collection: string, body: BodyType): Promise<IField<T>>;
getItems<T extends any[] = any[]>(collection: string, params?: object): Promise<IField<T>>;
getItem<T extends any = any>(collection: string, primaryKey: PrimaryKeyType, params?: object): Promise<IField<T>>;
deleteItem(collection: string, primaryKey: PrimaryKeyType): Promise<void>;
deleteItems(collection: string, primaryKeys: PrimaryKeyType[]): Promise<void>;

// Listing preferences
getMyListingPreferences<T extends any[] = any[]>(collection: string, params?: object): Promise<T>;

// Permissions
getPermissions<T extends any[] = any[]>(params?: object): Promise<IField<T>>;
getMyPermissions<T extends any[] = any[]>(params?: object): Promise<T>;
createPermissions<T extends any[] = any[]>(data: any[]): Promise<T>;
updatePermissions<T extends any[] = any[]>(data: any[]): Promise<T>;

// Relations
getRelations<T extends any[] = any[]>(params?: object): Promise<T>;
createRelation<T extends any = any>(data: object): Promise<T>;
updateRelation<T extends any = any>(primaryKey: PrimaryKeyType, data: object): Promise<T>;
getCollectionRelations<T extends any = any>(collection: string, params?: object): Promise<T[]>;

// Revision and versioning
getItemRevisions<T extends any = any>(collection: string, primaryKey: PrimaryKeyType, params?: object): Promise<IRevisionResponse<T>>;
revert(collection: string, primaryKey: PrimaryKeyType, revisionID: number): Promise<void>;

// Roles
getRole(primaryKey: PrimaryKeyType, params?: object): Promise<IRoleResponse>;
getRoles(params?: object): Promise<IRoleResponse[]>;
updateRole(primaryKey: PrimaryKeyType, body: BodyType): Promise<IRoleResponse>;
createRole(body: BodyType): Promise<IRoleResponse>;
deleteRole(primaryKey: PrimaryKeyType): Promise<void>;

// Settings
getSettings(params?: object): Promise<any>;
getSettingsFields(params?: object): Promise<any>;

// Users
getUsers(params?: object): Promise<IUsersResponse>;
getUser(primaryKey: PrimaryKeyType, params?: object): Promise<IUserResponse>;
getMe(params?: object): Promise<IUserResponse>;
updateUser(primaryKey: PrimaryKeyType, body: BodyType): Promise<IUserResponse>;

// Meta
ping(): Promise<void>;
serverInfo(): Promise<any>;
projectInfo(): Promise<any>;
```
