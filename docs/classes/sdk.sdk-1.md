> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / [SDK](../modules/sdk.md) / [SDK](sdk.sdk-1.md) /

# Class: SDK

Main SDK implementation provides the public API to interact with a
remote directus instance.

**`uses`** API

**`uses`** Configuration

## Hierarchy

* **SDK**

### Index

#### Constructors

* [constructor](sdk.sdk-1.md#constructor)

#### Properties

* [api](sdk.sdk-1.md#api)
* [config](sdk.sdk-1.md#config)
* [getPayload](sdk.sdk-1.md#static-getpayload)

#### Accessors

* [loggedIn](sdk.sdk-1.md#loggedin)
* [payload](sdk.sdk-1.md#payload)

#### Methods

* [createCollection](sdk.sdk-1.md#createcollection)
* [createCollectionPreset](sdk.sdk-1.md#createcollectionpreset)
* [createField](sdk.sdk-1.md#createfield)
* [createItem](sdk.sdk-1.md#createitem)
* [createItems](sdk.sdk-1.md#createitems)
* [createPermissions](sdk.sdk-1.md#createpermissions)
* [createRelation](sdk.sdk-1.md#createrelation)
* [createRole](sdk.sdk-1.md#createrole)
* [deleteCollection](sdk.sdk-1.md#deletecollection)
* [deleteCollectionPreset](sdk.sdk-1.md#deletecollectionpreset)
* [deleteField](sdk.sdk-1.md#deletefield)
* [deleteItem](sdk.sdk-1.md#deleteitem)
* [deleteItems](sdk.sdk-1.md#deleteitems)
* [deleteRole](sdk.sdk-1.md#deleterole)
* [getActivity](sdk.sdk-1.md#getactivity)
* [getAllFields](sdk.sdk-1.md#getallfields)
* [getCollection](sdk.sdk-1.md#getcollection)
* [getCollectionPresets](sdk.sdk-1.md#getcollectionpresets)
* [getCollectionRelations](sdk.sdk-1.md#getcollectionrelations)
* [getCollections](sdk.sdk-1.md#getcollections)
* [getField](sdk.sdk-1.md#getfield)
* [getFields](sdk.sdk-1.md#getfields)
* [getFile](sdk.sdk-1.md#getfile)
* [getFiles](sdk.sdk-1.md#getfiles)
* [getInterfaces](sdk.sdk-1.md#getinterfaces)
* [getItem](sdk.sdk-1.md#getitem)
* [getItemRevisions](sdk.sdk-1.md#getitemrevisions)
* [getItems](sdk.sdk-1.md#getitems)
* [getLayouts](sdk.sdk-1.md#getlayouts)
* [getMe](sdk.sdk-1.md#getme)
* [getMyBookmarks](sdk.sdk-1.md#getmybookmarks)
* [getMyListingPreferences](sdk.sdk-1.md#getmylistingpreferences)
* [getMyPermissions](sdk.sdk-1.md#getmypermissions)
* [getPages](sdk.sdk-1.md#getpages)
* [getPermissions](sdk.sdk-1.md#getpermissions)
* [getRelations](sdk.sdk-1.md#getrelations)
* [getRole](sdk.sdk-1.md#getrole)
* [getRoles](sdk.sdk-1.md#getroles)
* [getSettings](sdk.sdk-1.md#getsettings)
* [getSettingsFields](sdk.sdk-1.md#getsettingsfields)
* [getThirdPartyAuthProviders](sdk.sdk-1.md#getthirdpartyauthproviders)
* [getUser](sdk.sdk-1.md#getuser)
* [getUsers](sdk.sdk-1.md#getusers)
* [login](sdk.sdk-1.md#login)
* [logout](sdk.sdk-1.md#logout)
* [ping](sdk.sdk-1.md#ping)
* [projectInfo](sdk.sdk-1.md#projectinfo)
* [refresh](sdk.sdk-1.md#refresh)
* [refreshIfNeeded](sdk.sdk-1.md#refreshifneeded)
* [requestPasswordReset](sdk.sdk-1.md#requestpasswordreset)
* [reset](sdk.sdk-1.md#reset)
* [revert](sdk.sdk-1.md#revert)
* [serverInfo](sdk.sdk-1.md#serverinfo)
* [updateCollection](sdk.sdk-1.md#updatecollection)
* [updateCollectionPreset](sdk.sdk-1.md#updatecollectionpreset)
* [updateDatabase](sdk.sdk-1.md#updatedatabase)
* [updateField](sdk.sdk-1.md#updatefield)
* [updateFields](sdk.sdk-1.md#updatefields)
* [updateItem](sdk.sdk-1.md#updateitem)
* [updateItems](sdk.sdk-1.md#updateitems)
* [updatePermissions](sdk.sdk-1.md#updatepermissions)
* [updateRelation](sdk.sdk-1.md#updaterelation)
* [updateRole](sdk.sdk-1.md#updaterole)
* [updateUser](sdk.sdk-1.md#updateuser)
* [uploadFiles](sdk.sdk-1.md#uploadfiles)

## Constructors

###  constructor

\+ **new SDK**(`options`: [IConfigurationOptions](../interfaces/configuration.iconfigurationoptions.md)): *[SDK](sdk.sdk-1.md)*

*Defined in [SDK.ts:78](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IConfigurationOptions](../interfaces/configuration.iconfigurationoptions.md) |

**Returns:** *[SDK](sdk.sdk-1.md)*

## Properties

###  api

• **api**: *[IAPI](../interfaces/api.iapi.md)*

*Defined in [SDK.ts:78](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L78)*

___

###  config

• **config**: *[IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [SDK.ts:77](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L77)*

___

### `Static` getPayload

▪ **getPayload**: *[getPayload](../modules/utils.md#getpayload)* =  getPayload

*Defined in [SDK.ts:74](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L74)*

## Accessors

###  loggedIn

• **get loggedIn**(): *boolean*

*Defined in [SDK.ts:61](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L61)*

**Returns:** *boolean*

___

###  payload

• **get payload**(): *any*

*Defined in [SDK.ts:65](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L65)*

**Returns:** *any*

## Methods

###  createCollection

▸ **createCollection**(`data`: [ICollection](../interfaces/_schemes_directus_collection_.icollection.md)): *`Promise<ICollectionResponse>`*

*Defined in [SDK.ts:193](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L193)*

Create a collection

**Parameters:**

Name | Type |
------ | ------ |
`data` | [ICollection](../interfaces/_schemes_directus_collection_.icollection.md) |

**Returns:** *`Promise<ICollectionResponse>`*

___

###  createCollectionPreset

▸ **createCollectionPreset**<**CollectionPreset**>(`data`: `CollectionPreset`): *`Promise<ICollectionPresetResponse<CollectionPreset>>`*

*Defined in [SDK.ts:252](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L252)*

Create a new collection preset (bookmark / listing preferences)

**`see`** https://docs.directus.io/api/reference.html#collection-presets

**Type parameters:**

▪ **CollectionPreset**: *[ICollectionPreset](../interfaces/_schemes_directus_collectionpreset_.icollectionpreset.md)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | `CollectionPreset` |

**Returns:** *`Promise<ICollectionPresetResponse<CollectionPreset>>`*

___

###  createField

▸ **createField**<**TFieldType**>(`collection`: string, `fieldInfo`: `TFieldType`): *`Promise<IFieldResponse<TFieldType>>`*

*Defined in [SDK.ts:369](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L369)*

Create a field in the given collection

**`see`** https://docs.directus.io/api/reference.html#fields-2

**Type parameters:**

▪ **TFieldType**: *[IField](../interfaces/_schemes_directus_field_.ifield.md)*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`fieldInfo` | `TFieldType` |

**Returns:** *`Promise<IFieldResponse<TFieldType>>`*

___

###  createItem

▸ **createItem**<**TItemType**>(`collection`: string, `body`: `TItemType`): *`Promise<IItemResponse<TItemType>>`*

*Defined in [SDK.ts:580](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L580)*

Create a new item

**Type parameters:**

▪ **TItemType**: *object*

Defining an item and its fields in object schema

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`body` | `TItemType` |

**Returns:** *`Promise<IItemResponse<TItemType>>`*

___

###  createItems

▸ **createItems**<**TItemsType**>(`collection`: string, `body`: [BodyType](../modules/_schemes_http_body_.md#bodytype)): *`Promise<IItemsResponse<TItemsType>>`*

*Defined in [SDK.ts:594](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L594)*

Create multiple items

**`see`** https://docs.directus.io/api/reference.html#create-items

**Type parameters:**

▪ **TItemsType**: *`Array<__type>`*

Defining an array of items, each in object schema

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`body` | [BodyType](../modules/_schemes_http_body_.md#bodytype) |

**Returns:** *`Promise<IItemsResponse<TItemsType>>`*

___

###  createPermissions

▸ **createPermissions**<**TResponse**>(`data`: any[]): *`Promise<TResponse>`*

*Defined in [SDK.ts:759](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L759)*

TODO: Fix type-def for param and return
Create multiple new permissions

**Type parameters:**

▪ **TResponse**: *any[]*

Permissions type as array extending any[]

**Parameters:**

Name | Type |
------ | ------ |
`data` | any[] |

**Returns:** *`Promise<TResponse>`*

___

###  createRelation

▸ **createRelation**(`data`: [IRelation](../interfaces/_schemes_directus_relation_.irelation.md)): *`Promise<IRelationResponse>`*

*Defined in [SDK.ts:795](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L795)*

Creates new relation

**Parameters:**

Name | Type |
------ | ------ |
`data` | [IRelation](../interfaces/_schemes_directus_relation_.irelation.md) |

**Returns:** *`Promise<IRelationResponse>`*

___

###  createRole

▸ **createRole**<**TRole**>(`body`: `TRole`): *`Promise<IItemResponse<TRole>>`*

*Defined in [SDK.ts:907](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L907)*

Create a new user role

**Type parameters:**

▪ **TRole**: *[IRole](../interfaces/_schemes_directus_role_.irole.md)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`body` | `TRole` |   |

**Returns:** *`Promise<IItemResponse<TRole>>`*

___

###  deleteCollection

▸ **deleteCollection**(`collection`: string): *`Promise<void>`*

*Defined in [SDK.ts:211](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L211)*

Deletes a certain collection

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |

**Returns:** *`Promise<void>`*

___

###  deleteCollectionPreset

▸ **deleteCollectionPreset**(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype)): *`Promise<void>`*

*Defined in [SDK.ts:285](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L285)*

Delete collection preset by primarykey

**`see`** https://docs.directus.io/api/reference.html#collection-presets

**Parameters:**

Name | Type |
------ | ------ |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) |

**Returns:** *`Promise<void>`*

___

###  deleteField

▸ **deleteField**(`collection`: string, `fieldName`: string): *`Promise<void>`*

*Defined in [SDK.ts:453](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L453)*

Delete a field from a collection

**`see`** @see https://docs.directus.io/api/reference.html#fields-2

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`fieldName` | string |

**Returns:** *`Promise<void>`*

___

###  deleteItem

▸ **deleteItem**(`collection`: string, `primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype)): *`Promise<void>`*

*Defined in [SDK.ts:646](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L646)*

Delete a single item by primary key

**`see`** https://docs.directus.io/api/reference.html#delete-items

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) |

**Returns:** *`Promise<void>`*

___

###  deleteItems

▸ **deleteItems**(`collection`: string, `primaryKeys`: [PrimaryKeyType](../modules/sdk.md#primarykeytype)[]): *`Promise<void>`*

*Defined in [SDK.ts:659](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L659)*

Delete multiple items by primary key

**`see`** https://docs.directus.io/api/reference.html#delete-items

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`primaryKeys` | [PrimaryKeyType](../modules/sdk.md#primarykeytype)[] |

**Returns:** *`Promise<void>`*

___

###  deleteRole

▸ **deleteRole**(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype)): *`Promise<void>`*

*Defined in [SDK.ts:917](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L917)*

Delete a user rol by primary key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) |   |

**Returns:** *`Promise<void>`*

___

###  getActivity

▸ **getActivity**(`params`: `QueryParamsType`): *`Promise<IActivityResponse>`*

*Defined in [SDK.ts:148](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L148)*

Get activity

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IActivityResponse>`*

___

###  getAllFields

▸ **getAllFields**<**TFieldsType**>(`params`: `QueryParamsType`): *`Promise<IFieldsResponse<TFieldsType>>`*

*Defined in [SDK.ts:327](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L327)*

Get all fields that are in Directus

**`see`** https://docs.directus.io/api/reference.html#fields-2

**Type parameters:**

▪ **TFieldsType**: *[IField](../interfaces/_schemes_directus_field_.ifield.md)[]*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IFieldsResponse<TFieldsType>>`*

___

###  getCollection

▸ **getCollection**(`collection`: string, `params`: `QueryParamsType`): *`Promise<ICollectionResponse>`*

*Defined in [SDK.ts:183](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L183)*

Get collection info by name

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collection` | string | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<ICollectionResponse>`*

___

###  getCollectionPresets

▸ **getCollectionPresets**<**TResponse**>(`params`: `QueryParamsType`): *`Promise<TResponse>`*

*Defined in [SDK.ts:225](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L225)*

Get the collection presets of the current user

**`see`** https://docs.directus.io/api/reference.html#collection-presets

**Type parameters:**

▪ **TResponse**: *any[]*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<TResponse>`*

___

###  getCollectionRelations

▸ **getCollectionRelations**(`collection`: string, `params`: `QueryParamsType`): *`Promise<any[]>`*

*Defined in [SDK.ts:810](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L810)*

TODO: Add type-def for return value(s)
Get the relationship information for the given collection

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collection` | string | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<any[]>`*

___

###  getCollections

▸ **getCollections**(`params`: `QueryParamsType`): *`Promise<ICollectionsResponse[]>`*

*Defined in [SDK.ts:174](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L174)*

Get all available collections

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<ICollectionsResponse[]>`*

___

###  getField

▸ **getField**<**TFieldType**>(`collection`: string, `fieldName`: string, `params`: `QueryParamsType`): *`Promise<IFieldResponse<TFieldType>>`*

*Defined in [SDK.ts:353](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L353)*

Get the field information for a single given field

**`see`** https://docs.directus.io/api/reference.html#fields-2

**Type parameters:**

▪ **TFieldType**: *[IField](../interfaces/_schemes_directus_field_.ifield.md)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collection` | string | - |
`fieldName` | string | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IFieldResponse<TFieldType>>`*

___

###  getFields

▸ **getFields**<**TFieldsType**>(`collection`: string, `params`: `QueryParamsType`): *`Promise<IFieldsResponse<TFieldsType>>`*

*Defined in [SDK.ts:339](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L339)*

Get the fields that have been setup for a given collection

**`see`** https://docs.directus.io/api/reference.html#fields-2

**Type parameters:**

▪ **TFieldsType**: *[IField](../interfaces/_schemes_directus_field_.ifield.md)[]*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collection` | string | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IFieldsResponse<TFieldsType>>`*

___

###  getFile

▸ **getFile**<**TFile**>(`fileName`: `TFile`, `params`: `QueryParamsType`): *`Promise<TFile extends string ? IFileResponse<IFile> : IFilesResponse<IFile[]>>`*

*Defined in [SDK.ts:477](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L477)*

Get a certain file or certain file list from Directus

**`see`** https://docs.directus.io/api/reference.html#files

**Type parameters:**

▪ **TFile**: *string | string[]*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fileName` | `TFile` | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<TFile extends string ? IFileResponse<IFile> : IFilesResponse<IFile[]>>`*

___

###  getFiles

▸ **getFiles**(`params`: `QueryParamsType`): *`Promise<IFilesResponse>`*

*Defined in [SDK.ts:468](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L468)*

Get a list of available files from Directus

**`see`** https://docs.directus.io/api/reference.html#files

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IFilesResponse>`*

___

###  getInterfaces

▸ **getInterfaces**<**TResponse**>(): *`Promise<TResponse>`*

*Defined in [SDK.ts:299](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L299)*

Get the information of all installed interfaces

**`see`** https://docs.directus.io/api/reference.html#get-extensions

**Type parameters:**

▪ **TResponse**: *any[]*

**Returns:** *`Promise<TResponse>`*

___

###  getItem

▸ **getItem**<**TItemType**>(`collection`: string, `primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `params`: `QueryParamsType`): *`Promise<IItemResponse<TItemType>>`*

*Defined in [SDK.ts:628](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L628)*

Get a single item by primary key

**`see`** https://docs.directus.io/api/reference.html#get-item

**Type parameters:**

▪ **TItemType**: *object*

Defining fields of an item in object schema

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collection` | string | - |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IItemResponse<TItemType>>`*

___

###  getItemRevisions

▸ **getItemRevisions**<**TDataAndDelta**>(`collection`: string, `primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `params`: `QueryParamsType`): *`Promise<IRevisionResponse<TDataAndDelta>>`*

*Defined in [SDK.ts:835](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L835)*

Get a single item's revisions by primary key

**`typeparam`** The data including delta type for the revision

**Type parameters:**

▪ **TDataAndDelta**: *object*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`collection` | string | - | - |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) | - | - |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IRevisionResponse<TDataAndDelta>>`*

___

###  getItems

▸ **getItems**<**TTItemsType**>(`collection`: string, `params`: `QueryParamsType`): *`Promise<IItemsResponse<TTItemsType>>`*

*Defined in [SDK.ts:611](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L611)*

Get items from a given collection

**`see`** https://docs.directus.io/api/reference.html#get-multiple-items

**`typeparam`** Defining an array of items, each in object schema

**Type parameters:**

▪ **TTItemsType**: *`Array<__type>`*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collection` | string | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IItemsResponse<TTItemsType>>`*

___

###  getLayouts

▸ **getLayouts**<**TResponse**>(): *`Promise<TResponse>`*

*Defined in [SDK.ts:307](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L307)*

Get the information of all installed layouts

**`see`** https://docs.directus.io/api/reference.html#get-extensions

**Type parameters:**

▪ **TResponse**: *any[]*

**Returns:** *`Promise<TResponse>`*

___

###  getMe

▸ **getMe**<**User**>(`params`: `QueryParamsType`): *`Promise<IUserResponse<User>>`*

*Defined in [SDK.ts:977](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L977)*

Get the user info of the currently logged in user

**Type parameters:**

▪ **User**: *[IUser](../interfaces/_schemes_directus_user_.iuser.md)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IUserResponse<User>>`*

___

###  getMyBookmarks

▸ **getMyBookmarks**<**TResponse**>(`params`: `QueryParamsType`): *`Promise<TResponse>`*

*Defined in [SDK.ts:163](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L163)*

Get the bookmarks of the current user

**`deprecated`** Will be removed in the next major version, please use [SDK.getCollectionPresets](sdk.sdk-1.md#getcollectionpresets) instead

**`see`** https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks

**Type parameters:**

▪ **TResponse**: *any[]*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<TResponse>`*

___

###  getMyListingPreferences

▸ **getMyListingPreferences**<**TResponse**>(`collection`: string, `params`: `QueryParamsType`): *`Promise<TResponse>`*

*Defined in [SDK.ts:675](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L675)*

Get the collection presets of the current user for a single collection

**Type parameters:**

▪ **TResponse**: *any[]*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collection` | string | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<TResponse>`*

___

###  getMyPermissions

▸ **getMyPermissions**<**TResponse**>(`params`: `QueryParamsType`): *`Promise<TResponse>`*

*Defined in [SDK.ts:748](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L748)*

TODO: Fix type-def for return
Get the currently logged in user's permissions

**Type parameters:**

▪ **TResponse**: *any[]*

Permissions type as array extending any[]

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<TResponse>`*

___

###  getPages

▸ **getPages**<**TResponse**>(): *`Promise<TResponse>`*

*Defined in [SDK.ts:315](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L315)*

Get the information of all installed pages

**`see`** https://docs.directus.io/api/reference.html#get-extensions

**Type parameters:**

▪ **TResponse**: *any[]*

**Returns:** *`Promise<TResponse>`*

___

###  getPermissions

▸ **getPermissions**(`params`: `QueryParamsType`): *`Promise<IItemsResponse<IPermission[]>>`*

*Defined in [SDK.ts:737](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L737)*

Get permissions

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IItemsResponse<IPermission[]>>`*

___

###  getRelations

▸ **getRelations**(`params`: `QueryParamsType`): *`Promise<IRelationsResponse>`*

*Defined in [SDK.ts:785](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L785)*

Get all relationships

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IRelationsResponse>`*

___

###  getRole

▸ **getRole**(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `params`: `QueryParamsType`): *`Promise<IRoleResponse>`*

*Defined in [SDK.ts:874](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L874)*

Get a single user role

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) | - | - |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IRoleResponse>`*

___

###  getRoles

▸ **getRoles**(`params`: `QueryParamsType`): *`Promise<IRoleResponse[]>`*

*Defined in [SDK.ts:885](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L885)*

Get the user roles

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IRoleResponse[]>`*

___

###  getSettings

▸ **getSettings**(`params`: `QueryParamsType`): *`Promise<ISettingsResponse>`*

*Defined in [SDK.ts:931](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L931)*

Get Directus' global settings

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<ISettingsResponse>`*

___

###  getSettingsFields

▸ **getSettingsFields**(`params`: `QueryParamsType`): *`Promise<IFieldsResponse<IField[]>>`*

*Defined in [SDK.ts:941](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L941)*

Get the "fields" for directus_settings

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IFieldsResponse<IField[]>>`*

___

###  getThirdPartyAuthProviders

▸ **getThirdPartyAuthProviders**(): *`Promise<any>`*

*Defined in [SDK.ts:1038](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1038)*

TODO: Add response type-def
Get all the setup third party auth providers

**Returns:** *`Promise<any>`*

___

###  getUser

▸ **getUser**<**User**>(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `params`: `QueryParamsType`): *`Promise<IUserResponse<User>>`*

*Defined in [SDK.ts:966](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L966)*

Get a single Directus user

**Type parameters:**

▪ **User**: *[IUser](../interfaces/_schemes_directus_user_.iuser.md)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) | - | - |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IUserResponse<User>>`*

___

###  getUsers

▸ **getUsers**(`params`: `QueryParamsType`): *`Promise<IUsersResponse<IUser[]>>`*

*Defined in [SDK.ts:955](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L955)*

Get a list of available users in Directus

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IUsersResponse<IUser[]>>`*

___

###  login

▸ **login**(`credentials`: [ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md), `options?`: [ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md)): *`Promise<ILoginResponse>`*

*Defined in [SDK.ts:91](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L91)*

Login to the API; Gets a new token from the API and stores it in this.api.token.

**Parameters:**

Name | Type |
------ | ------ |
`credentials` | [ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md) |
`options?` | [ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md) |

**Returns:** *`Promise<ILoginResponse>`*

___

###  logout

▸ **logout**(): *void*

*Defined in [SDK.ts:98](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L98)*

Logs the user out by "forgetting" the token, and clearing the refresh interval

**Returns:** *void*

___

###  ping

▸ **ping**(): *`Promise<string>`*

*Defined in [SDK.ts:1012](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1012)*

Ping the API to check if it exists / is up and running, returns "pong"

**Returns:** *`Promise<string>`*

___

###  projectInfo

▸ **projectInfo**(): *`Promise<any>`*

*Defined in [SDK.ts:1029](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1029)*

TODO: Add response type-def
Get the server info from the project

**Returns:** *`Promise<any>`*

___

###  refresh

▸ **refresh**(`token`: string): *`Promise<IRefreshTokenResponse>`*

*Defined in [SDK.ts:122](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L122)*

Use the passed token to request a new one

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *`Promise<IRefreshTokenResponse>`*

___

###  refreshIfNeeded

▸ **refreshIfNeeded**(): *`Promise<[boolean, Error]>`*

*Defined in [SDK.ts:115](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L115)*

Refresh the token if it is about to expire (within 30 seconds of expiry date).
- Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
- Calls onAutoRefreshError if refreshing the token fails for some reason.

**Returns:** *`Promise<[boolean, Error]>`*

___

###  requestPasswordReset

▸ **requestPasswordReset**<**TResponse**>(`email`: string): *`Promise<TResponse>`*

*Defined in [SDK.ts:131](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L131)*

Request to reset the password of the user with the given email address.
The API will send an email to the given email address with a link to generate a new
temporary password.

**Type parameters:**

▪ **TResponse**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`email` | string |

**Returns:** *`Promise<TResponse>`*

___

###  reset

▸ **reset**(): *void*

*Defined in [SDK.ts:105](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L105)*

Resets the client instance by logging out and removing the URL and project

**Returns:** *void*

___

###  revert

▸ **revert**(`collection`: string, `primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `revisionID`: number): *`Promise<void>`*

*Defined in [SDK.ts:855](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L855)*

Revert an item to a previous state

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`collection` | string | - |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) | - |
`revisionID` | number |   |

**Returns:** *`Promise<void>`*

___

###  serverInfo

▸ **serverInfo**(): *`Promise<IServerInformationResponse>`*

*Defined in [SDK.ts:1020](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1020)*

Get the server info from the API

**Returns:** *`Promise<IServerInformationResponse>`*

___

###  updateCollection

▸ **updateCollection**(`collection`: string, `data`: `Partial<ICollection>`): *`Promise<ICollectionResponse>`*

*Defined in [SDK.ts:201](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L201)*

Updates a certain collection

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`data` | `Partial<ICollection>` |

**Returns:** *`Promise<ICollectionResponse>`*

___

###  updateCollectionPreset

▸ **updateCollectionPreset**<**PartialCollectionPreset**, **TResultCollectionPreset**>(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `data`: [IUpdateCollectionPresetBody](../interfaces/_schemes_request_collection_.iupdatecollectionpresetbody.md)): *`Promise<ICollectionPresetResponse<PartialCollectionPreset & TResultCollectionPreset>>`*

*Defined in [SDK.ts:265](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L265)*

Update collection preset (bookmark / listing preference)

**`see`** https://docs.directus.io/api/reference.html#collection-presets

**Type parameters:**

▪ **PartialCollectionPreset**: *`Partial<ICollectionPreset>`*

▪ **TResultCollectionPreset**: *[ICollectionPreset](../interfaces/_schemes_directus_collectionpreset_.icollectionpreset.md)*

**Parameters:**

Name | Type |
------ | ------ |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) |
`data` | [IUpdateCollectionPresetBody](../interfaces/_schemes_request_collection_.iupdatecollectionpresetbody.md) |

**Returns:** *`Promise<ICollectionPresetResponse<PartialCollectionPreset & TResultCollectionPreset>>`*

___

###  updateDatabase

▸ **updateDatabase**(): *`Promise<void>`*

*Defined in [SDK.ts:1004](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1004)*

This will update the database of the API instance to the latest version
using the migrations in the API

**Returns:** *`Promise<void>`*

___

###  updateField

▸ **updateField**<**TFieldType**>(`collection`: string, `fieldName`: string, `fieldInfo`: `TFieldType`): *`Promise<IFieldResponse<IField & TFieldType> | undefined>`*

*Defined in [SDK.ts:383](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L383)*

Update a given field in a given collection

**`see`** https://docs.directus.io/api/reference.html#fields-2

**Type parameters:**

▪ **TFieldType**: *`Partial<IField>`*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`fieldName` | string |
`fieldInfo` | `TFieldType` |

**Returns:** *`Promise<IFieldResponse<IField & TFieldType> | undefined>`*

___

###  updateFields

▸ **updateFields**<**TFieldsType**>(`collection`: string, `fields`: `Array<Partial<IField>>`): *`Promise<IFieldsResponse<TFieldsType & IField[]> | undefined>`*

*Defined in [SDK.ts:421](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L421)*

Update multiple fields at once

**`see`** https://docs.directus.io/api/reference.html#fields-2

**`example`** 

// Set multiple fields to the same value
updateFields("projects", ["first_name", "last_name", "email"], {
  default_value: ""
})

// Set multiple fields to different values
updateFields("projects", [
  {
    id: 14,
    sort: 1
  },
  {
    id: 17,
    sort: 2
  },
  {
    id: 912,
    sort: 3
  }
])

**Type parameters:**

▪ **TFieldsType**: *[IField](../interfaces/_schemes_directus_field_.ifield.md)[]*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`fields` | `Array<Partial<IField>>` |

**Returns:** *`Promise<IFieldsResponse<TFieldsType & IField[]> | undefined>`*

▸ **updateFields**<**TFieldsType**>(`collection`: string, `fields`: string[], `fieldInfo`: `Partial<IField>`): *`Promise<IFieldsResponse<TFieldsType & IField[]> | undefined>`*

*Defined in [SDK.ts:425](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L425)*

**Type parameters:**

▪ **TFieldsType**: *[IField](../interfaces/_schemes_directus_field_.ifield.md)[]*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |
`fields` | string[] |
`fieldInfo` | `Partial<IField>` |

**Returns:** *`Promise<IFieldsResponse<TFieldsType & IField[]> | undefined>`*

___

###  updateItem

▸ **updateItem**<**TTPartialItem**, **TTResult**>(`collection`: string, `primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `body`: `TTPartialItem`, `params`: `QueryParamsType`): *`Promise<IItemResponse<TTPartialItem & TTResult>>`*

*Defined in [SDK.ts:540](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L540)*

Update an existing item

**`see`** https://docs.directus.io/api/reference.html#update-item

**Type parameters:**

▪ **TTPartialItem**: *object*

Defining the item type in object schema

▪ **TTResult**: *object*

Extension of [TPartialItem] as expected result

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collection` | string | - |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) | - |
`body` | `TTPartialItem` | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IItemResponse<TTPartialItem & TTResult>>`*

___

###  updateItems

▸ **updateItems**<**TPartialItem**, **TResult**>(`collection`: string, `body`: `TPartialItem`, `params`: `QueryParamsType`): *`Promise<IItemsResponse<TPartialItem & TResult>>`*

*Defined in [SDK.ts:562](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L562)*

Update multiple items

**`see`** https://docs.directus.io/api/reference.html#update-items

**Type parameters:**

▪ **TPartialItem**: *object[]*

Defining an array of items, each in object schema

▪ **TResult**: *`TPartialItem`*

Extension of [TPartialItem] as expected result

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collection` | string | - |
`body` | `TPartialItem` | - |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IItemsResponse<TPartialItem & TResult>>`*

___

###  updatePermissions

▸ **updatePermissions**<**TResponse**>(`data`: any[]): *`Promise<TResponse>`*

*Defined in [SDK.ts:770](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L770)*

TODO: Fix type-def for param and return
Update multiple permission records

**Type parameters:**

▪ **TResponse**: *any[]*

Permissions type as array extending any[]

**Parameters:**

Name | Type |
------ | ------ |
`data` | any[] |

**Returns:** *`Promise<TResponse>`*

___

###  updateRelation

▸ **updateRelation**(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `data`: `Partial<IRelation>`): *`Promise<IRelationResponse>`*

*Defined in [SDK.ts:802](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L802)*

Updates existing relation

**Parameters:**

Name | Type |
------ | ------ |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) |
`data` | `Partial<IRelation>` |

**Returns:** *`Promise<IRelationResponse>`*

___

###  updateRole

▸ **updateRole**<**Role**>(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `body`: `Role`): *`Promise<IItemResponse<Role & IRole>>`*

*Defined in [SDK.ts:896](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L896)*

Update a user role

**Type parameters:**

▪ **Role**: *`Partial<IRole>`*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) | - |
`body` | `Role` |   |

**Returns:** *`Promise<IItemResponse<Role & IRole>>`*

___

###  updateUser

▸ **updateUser**<**User**>(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `body`: `User`): *`Promise<IItemResponse<User & IUser>>`*

*Defined in [SDK.ts:988](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L988)*

Update a single user based on primaryKey

**Type parameters:**

▪ **User**: *`Partial<IUser>`*

**Parameters:**

Name | Type |
------ | ------ |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) |
`body` | `User` |

**Returns:** *`Promise<IItemResponse<User & IUser>>`*

___

###  uploadFiles

▸ **uploadFiles**<**TResponse**>(`data`: object, `onUploadProgress`: function): *`Promise<TResponse>`*

*Defined in [SDK.ts:491](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L491)*

Upload multipart files in multipart/form-data

**`see`** https://docs.directus.io/api/reference.html#files

**Type parameters:**

▪ **TResponse**: *any*

**Parameters:**

▪ **data**: *object*

▪`Default value`  **onUploadProgress**: *function*=  () => ({})

▸ (): *object*

**Returns:** *`Promise<TResponse>`*