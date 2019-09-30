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

*Defined in [SDK.ts:79](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IConfigurationOptions](../interfaces/configuration.iconfigurationoptions.md) |

**Returns:** *[SDK](sdk.sdk-1.md)*

## Properties

###  api

• **api**: *[IAPI](../interfaces/api.iapi.md)*

*Defined in [SDK.ts:79](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L79)*

___

###  config

• **config**: *[IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [SDK.ts:78](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L78)*

___

### `Static` getPayload

▪ **getPayload**: *[getPayload](../modules/utils.md#getpayload)* =  getPayload

*Defined in [SDK.ts:75](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L75)*

## Accessors

###  loggedIn

• **get loggedIn**(): *boolean*

*Defined in [SDK.ts:62](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L62)*

**Returns:** *boolean*

___

###  payload

• **get payload**(): *any*

*Defined in [SDK.ts:66](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L66)*

**Returns:** *any*

## Methods

###  createCollection

▸ **createCollection**(`data`: [ICollection](../interfaces/_schemes_directus_collection_.icollection.md)): *`Promise<ICollectionResponse>`*

*Defined in [SDK.ts:194](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L194)*

Create a collection

**Parameters:**

Name | Type |
------ | ------ |
`data` | [ICollection](../interfaces/_schemes_directus_collection_.icollection.md) |

**Returns:** *`Promise<ICollectionResponse>`*

___

###  createCollectionPreset

▸ **createCollectionPreset**<**CollectionPreset**>(`data`: `CollectionPreset`): *`Promise<ICollectionPresetResponse<CollectionPreset>>`*

*Defined in [SDK.ts:253](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L253)*

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

*Defined in [SDK.ts:370](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L370)*

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

*Defined in [SDK.ts:581](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L581)*

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

*Defined in [SDK.ts:595](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L595)*

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

*Defined in [SDK.ts:760](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L760)*

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

*Defined in [SDK.ts:796](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L796)*

Creates new relation

**Parameters:**

Name | Type |
------ | ------ |
`data` | [IRelation](../interfaces/_schemes_directus_relation_.irelation.md) |

**Returns:** *`Promise<IRelationResponse>`*

___

###  createRole

▸ **createRole**<**TRole**>(`body`: `TRole`): *`Promise<IItemResponse<TRole>>`*

*Defined in [SDK.ts:908](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L908)*

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

*Defined in [SDK.ts:212](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L212)*

Deletes a certain collection

**Parameters:**

Name | Type |
------ | ------ |
`collection` | string |

**Returns:** *`Promise<void>`*

___

###  deleteCollectionPreset

▸ **deleteCollectionPreset**(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype)): *`Promise<void>`*

*Defined in [SDK.ts:286](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L286)*

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

*Defined in [SDK.ts:454](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L454)*

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

*Defined in [SDK.ts:647](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L647)*

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

*Defined in [SDK.ts:660](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L660)*

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

*Defined in [SDK.ts:918](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L918)*

Delete a user rol by primary key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`primaryKey` | [PrimaryKeyType](../modules/sdk.md#primarykeytype) |   |

**Returns:** *`Promise<void>`*

___

###  getActivity

▸ **getActivity**(`params`: `QueryParamsType`): *`Promise<IActivityResponse>`*

*Defined in [SDK.ts:149](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L149)*

Get activity

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IActivityResponse>`*

___

###  getAllFields

▸ **getAllFields**<**TFieldsType**>(`params`: `QueryParamsType`): *`Promise<IFieldsResponse<TFieldsType>>`*

*Defined in [SDK.ts:328](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L328)*

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

*Defined in [SDK.ts:184](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L184)*

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

*Defined in [SDK.ts:226](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L226)*

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

*Defined in [SDK.ts:811](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L811)*

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

*Defined in [SDK.ts:175](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L175)*

Get all available collections

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<ICollectionsResponse[]>`*

___

###  getField

▸ **getField**<**TFieldType**>(`collection`: string, `fieldName`: string, `params`: `QueryParamsType`): *`Promise<IFieldResponse<TFieldType>>`*

*Defined in [SDK.ts:354](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L354)*

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

*Defined in [SDK.ts:340](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L340)*

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

*Defined in [SDK.ts:478](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L478)*

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

*Defined in [SDK.ts:469](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L469)*

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

*Defined in [SDK.ts:300](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L300)*

Get the information of all installed interfaces

**`see`** https://docs.directus.io/api/reference.html#get-extensions

**Type parameters:**

▪ **TResponse**: *any[]*

**Returns:** *`Promise<TResponse>`*

___

###  getItem

▸ **getItem**<**TItemType**>(`collection`: string, `primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `params`: `QueryParamsType`): *`Promise<IItemResponse<TItemType>>`*

*Defined in [SDK.ts:629](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L629)*

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

*Defined in [SDK.ts:836](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L836)*

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

*Defined in [SDK.ts:612](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L612)*

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

*Defined in [SDK.ts:308](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L308)*

Get the information of all installed layouts

**`see`** https://docs.directus.io/api/reference.html#get-extensions

**Type parameters:**

▪ **TResponse**: *any[]*

**Returns:** *`Promise<TResponse>`*

___

###  getMe

▸ **getMe**<**User**>(`params`: `QueryParamsType`): *`Promise<IUserResponse<User>>`*

*Defined in [SDK.ts:978](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L978)*

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

*Defined in [SDK.ts:164](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L164)*

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

*Defined in [SDK.ts:676](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L676)*

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

*Defined in [SDK.ts:749](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L749)*

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

*Defined in [SDK.ts:316](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L316)*

Get the information of all installed pages

**`see`** https://docs.directus.io/api/reference.html#get-extensions

**Type parameters:**

▪ **TResponse**: *any[]*

**Returns:** *`Promise<TResponse>`*

___

###  getPermissions

▸ **getPermissions**(`params`: `QueryParamsType`): *`Promise<IItemsResponse<IPermission[]>>`*

*Defined in [SDK.ts:738](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L738)*

Get permissions

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IItemsResponse<IPermission[]>>`*

___

###  getRelations

▸ **getRelations**(`params`: `QueryParamsType`): *`Promise<IRelationsResponse>`*

*Defined in [SDK.ts:786](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L786)*

Get all relationships

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |

**Returns:** *`Promise<IRelationsResponse>`*

___

###  getRole

▸ **getRole**(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `params`: `QueryParamsType`): *`Promise<IRoleResponse>`*

*Defined in [SDK.ts:875](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L875)*

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

*Defined in [SDK.ts:886](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L886)*

Get the user roles

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IRoleResponse[]>`*

___

###  getSettings

▸ **getSettings**(`params`: `QueryParamsType`): *`Promise<ISettingsResponse>`*

*Defined in [SDK.ts:932](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L932)*

Get Directus' global settings

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<ISettingsResponse>`*

___

###  getSettingsFields

▸ **getSettingsFields**(`params`: `QueryParamsType`): *`Promise<IFieldsResponse<IField[]>>`*

*Defined in [SDK.ts:942](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L942)*

Get the "fields" for directus_settings

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IFieldsResponse<IField[]>>`*

___

###  getThirdPartyAuthProviders

▸ **getThirdPartyAuthProviders**(): *`Promise<any>`*

*Defined in [SDK.ts:1039](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1039)*

TODO: Add response type-def
Get all the setup third party auth providers

**Returns:** *`Promise<any>`*

___

###  getUser

▸ **getUser**<**User**>(`primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `params`: `QueryParamsType`): *`Promise<IUserResponse<User>>`*

*Defined in [SDK.ts:967](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L967)*

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

*Defined in [SDK.ts:956](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L956)*

Get a list of available users in Directus

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`params` | `QueryParamsType` |  {} |   |

**Returns:** *`Promise<IUsersResponse<IUser[]>>`*

___

###  login

▸ **login**(`credentials`: [ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md), `options?`: [ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md)): *`Promise<ILoginResponse>`*

*Defined in [SDK.ts:92](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L92)*

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

*Defined in [SDK.ts:99](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L99)*

Logs the user out by "forgetting" the token, and clearing the refresh interval

**Returns:** *void*

___

###  ping

▸ **ping**(): *`Promise<string>`*

*Defined in [SDK.ts:1013](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1013)*

Ping the API to check if it exists / is up and running, returns "pong"

**Returns:** *`Promise<string>`*

___

###  projectInfo

▸ **projectInfo**(): *`Promise<any>`*

*Defined in [SDK.ts:1030](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1030)*

TODO: Add response type-def
Get the server info from the project

**Returns:** *`Promise<any>`*

___

###  refresh

▸ **refresh**(`token`: string): *`Promise<IRefreshTokenResponse>`*

*Defined in [SDK.ts:123](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L123)*

Use the passed token to request a new one

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *`Promise<IRefreshTokenResponse>`*

___

###  refreshIfNeeded

▸ **refreshIfNeeded**(): *`Promise<[boolean, Error]>`*

*Defined in [SDK.ts:116](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L116)*

Refresh the token if it is about to expire (within 30 seconds of expiry date).
- Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
- Calls onAutoRefreshError if refreshing the token fails for some reason.

**Returns:** *`Promise<[boolean, Error]>`*

___

###  requestPasswordReset

▸ **requestPasswordReset**<**TResponse**>(`email`: string): *`Promise<TResponse>`*

*Defined in [SDK.ts:132](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L132)*

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

*Defined in [SDK.ts:106](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L106)*

Resets the client instance by logging out and removing the URL and project

**Returns:** *void*

___

###  revert

▸ **revert**(`collection`: string, `primaryKey`: [PrimaryKeyType](../modules/sdk.md#primarykeytype), `revisionID`: number): *`Promise<void>`*

*Defined in [SDK.ts:856](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L856)*

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

*Defined in [SDK.ts:1021](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1021)*

Get the server info from the API

**Returns:** *`Promise<IServerInformationResponse>`*

___

###  updateCollection

▸ **updateCollection**(`collection`: string, `data`: `Partial<ICollection>`): *`Promise<ICollectionResponse>`*

*Defined in [SDK.ts:202](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L202)*

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

*Defined in [SDK.ts:266](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L266)*

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

*Defined in [SDK.ts:1005](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L1005)*

This will update the database of the API instance to the latest version
using the migrations in the API

**Returns:** *`Promise<void>`*

___

###  updateField

▸ **updateField**<**TFieldType**>(`collection`: string, `fieldName`: string, `fieldInfo`: `TFieldType`): *`Promise<IFieldResponse<IField & TFieldType> | undefined>`*

*Defined in [SDK.ts:384](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L384)*

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

*Defined in [SDK.ts:422](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L422)*

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

*Defined in [SDK.ts:426](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L426)*

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

*Defined in [SDK.ts:541](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L541)*

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

*Defined in [SDK.ts:563](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L563)*

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

*Defined in [SDK.ts:771](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L771)*

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

*Defined in [SDK.ts:803](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L803)*

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

*Defined in [SDK.ts:897](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L897)*

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

*Defined in [SDK.ts:989](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L989)*

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

*Defined in [SDK.ts:492](https://github.com/direcuts/sdk-js/tree/master/SDK.ts#L492)*

Upload multipart files in multipart/form-data

**`see`** https://docs.directus.io/api/reference.html#files

**Type parameters:**

▪ **TResponse**: *any*

**Parameters:**

▪ **data**: *object*

▪`Default value`  **onUploadProgress**: *function*=  () => ({})

▸ (): *object*

**Returns:** *`Promise<TResponse>`*