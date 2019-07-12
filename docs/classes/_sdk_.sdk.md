[@directus/sdk-js](../README.md) > ["SDK"](../modules/_sdk_.md) > [SDK](../classes/_sdk_.sdk.md)

# Class: SDK

Main SDK implementation provides the public API to interact with a remote directus instance.

*__uses__*: API

*__uses__*: Configuration

## Hierarchy

**SDK**

## Index

### Constructors

* [constructor](_sdk_.sdk.md#constructor)

### Properties

* [api](_sdk_.sdk.md#api)
* [config](_sdk_.sdk.md#config)
* [getPayload](_sdk_.sdk.md#getpayload)

### Accessors

* [loggedIn](_sdk_.sdk.md#loggedin)
* [payload](_sdk_.sdk.md#payload)

### Methods

* [createCollection](_sdk_.sdk.md#createcollection)
* [createCollectionPreset](_sdk_.sdk.md#createcollectionpreset)
* [createField](_sdk_.sdk.md#createfield)
* [createItem](_sdk_.sdk.md#createitem)
* [createItems](_sdk_.sdk.md#createitems)
* [createPermissions](_sdk_.sdk.md#createpermissions)
* [createRelation](_sdk_.sdk.md#createrelation)
* [createRole](_sdk_.sdk.md#createrole)
* [deleteCollection](_sdk_.sdk.md#deletecollection)
* [deleteCollectionPreset](_sdk_.sdk.md#deletecollectionpreset)
* [deleteField](_sdk_.sdk.md#deletefield)
* [deleteItem](_sdk_.sdk.md#deleteitem)
* [deleteItems](_sdk_.sdk.md#deleteitems)
* [deleteRole](_sdk_.sdk.md#deleterole)
* [getActivity](_sdk_.sdk.md#getactivity)
* [getAllFields](_sdk_.sdk.md#getallfields)
* [getCollection](_sdk_.sdk.md#getcollection)
* [getCollectionPresets](_sdk_.sdk.md#getcollectionpresets)
* [getCollectionRelations](_sdk_.sdk.md#getcollectionrelations)
* [getCollections](_sdk_.sdk.md#getcollections)
* [getField](_sdk_.sdk.md#getfield)
* [getFields](_sdk_.sdk.md#getfields)
* [getFile](_sdk_.sdk.md#getfile)
* [getFiles](_sdk_.sdk.md#getfiles)
* [getInterfaces](_sdk_.sdk.md#getinterfaces)
* [getItem](_sdk_.sdk.md#getitem)
* [getItemRevisions](_sdk_.sdk.md#getitemrevisions)
* [getItems](_sdk_.sdk.md#getitems)
* [getLayouts](_sdk_.sdk.md#getlayouts)
* [getMe](_sdk_.sdk.md#getme)
* [getMyBookmarks](_sdk_.sdk.md#getmybookmarks)
* [getMyListingPreferences](_sdk_.sdk.md#getmylistingpreferences)
* [getMyPermissions](_sdk_.sdk.md#getmypermissions)
* [getPages](_sdk_.sdk.md#getpages)
* [getPermissions](_sdk_.sdk.md#getpermissions)
* [getRelations](_sdk_.sdk.md#getrelations)
* [getRole](_sdk_.sdk.md#getrole)
* [getRoles](_sdk_.sdk.md#getroles)
* [getSettings](_sdk_.sdk.md#getsettings)
* [getSettingsFields](_sdk_.sdk.md#getsettingsfields)
* [getThirdPartyAuthProviders](_sdk_.sdk.md#getthirdpartyauthproviders)
* [getUser](_sdk_.sdk.md#getuser)
* [getUsers](_sdk_.sdk.md#getusers)
* [login](_sdk_.sdk.md#login)
* [logout](_sdk_.sdk.md#logout)
* [ping](_sdk_.sdk.md#ping)
* [projectInfo](_sdk_.sdk.md#projectinfo)
* [refresh](_sdk_.sdk.md#refresh)
* [refreshIfNeeded](_sdk_.sdk.md#refreshifneeded)
* [requestPasswordReset](_sdk_.sdk.md#requestpasswordreset)
* [reset](_sdk_.sdk.md#reset)
* [revert](_sdk_.sdk.md#revert)
* [serverInfo](_sdk_.sdk.md#serverinfo)
* [updateCollection](_sdk_.sdk.md#updatecollection)
* [updateCollectionPreset](_sdk_.sdk.md#updatecollectionpreset)
* [updateDatabase](_sdk_.sdk.md#updatedatabase)
* [updateField](_sdk_.sdk.md#updatefield)
* [updateFields](_sdk_.sdk.md#updatefields)
* [updateItem](_sdk_.sdk.md#updateitem)
* [updateItems](_sdk_.sdk.md#updateitems)
* [updatePermissions](_sdk_.sdk.md#updatepermissions)
* [updateRelation](_sdk_.sdk.md#updaterelation)
* [updateRole](_sdk_.sdk.md#updaterole)
* [updateUser](_sdk_.sdk.md#updateuser)
* [uploadFiles](_sdk_.sdk.md#uploadfiles)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SDK**(options: *[IConfigurationOptions](../interfaces/_configuration_.iconfigurationoptions.md)*): [SDK](_sdk_.sdk.md)

*Defined in [SDK.ts:75](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L75)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [IConfigurationOptions](../interfaces/_configuration_.iconfigurationoptions.md) |

**Returns:** [SDK](_sdk_.sdk.md)

___

## Properties

<a id="api"></a>

###  api

**● api**: *[IAPI](../interfaces/_api_.iapi.md)*

*Defined in [SDK.ts:75](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L75)*

___
<a id="config"></a>

###  config

**● config**: *[IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [SDK.ts:74](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L74)*

___
<a id="getpayload"></a>

### `<Static>` getPayload

**● getPayload**: *[getPayload](../modules/_utils_payload_.md#getpayload)* =  getPayload

*Defined in [SDK.ts:71](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L71)*

___

## Accessors

<a id="loggedin"></a>

###  loggedIn

**get loggedIn**(): `boolean`

*Defined in [SDK.ts:58](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L58)*

**Returns:** `boolean`

___
<a id="payload"></a>

###  payload

**get payload**(): `any`

*Defined in [SDK.ts:62](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L62)*

**Returns:** `any`

___

## Methods

<a id="createcollection"></a>

###  createCollection

▸ **createCollection**(data: *[ICollection](../interfaces/_schemes_directus_collection_.icollection.md)*): `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

*Defined in [SDK.ts:190](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L190)*

Create a collection

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | [ICollection](../interfaces/_schemes_directus_collection_.icollection.md) |

**Returns:** `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

___
<a id="createcollectionpreset"></a>

###  createCollectionPreset

▸ **createCollectionPreset**<`CollectionPreset`>(data: *`CollectionPreset`*): `Promise`<[ICollectionPresetResponse](../interfaces/_schemes_response_collectionpreset_.icollectionpresetresponse.md)<`CollectionPreset`>>

*Defined in [SDK.ts:249](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L249)*

Create a new collection preset (bookmark / listing preferences)

*__see__*: [https://docs.directus.io/api/reference.html#collection-presets](https://docs.directus.io/api/reference.html#collection-presets)

**Type parameters:**

#### CollectionPreset :  [ICollectionPreset](../interfaces/_schemes_directus_collectionpreset_.icollectionpreset.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `CollectionPreset` |

**Returns:** `Promise`<[ICollectionPresetResponse](../interfaces/_schemes_response_collectionpreset_.icollectionpresetresponse.md)<`CollectionPreset`>>

___
<a id="createfield"></a>

###  createField

▸ **createField**<`TFieldType`>(collection: *`string`*, fieldInfo: *`TFieldType`*): `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<`TFieldType`>>

*Defined in [SDK.ts:366](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L366)*

Create a field in the given collection

*__see__*: [https://docs.directus.io/api/reference.html#fields-2](https://docs.directus.io/api/reference.html#fields-2)

**Type parameters:**

#### TFieldType :  [IField](../interfaces/_schemes_directus_field_.ifield.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fieldInfo | `TFieldType` |

**Returns:** `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<`TFieldType`>>

___
<a id="createitem"></a>

###  createItem

▸ **createItem**<`TItemType`>(collection: *`string`*, body: *`TItemType`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`TItemType`>>

*Defined in [SDK.ts:577](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L577)*

Create a new item

**Type parameters:**

#### TItemType :  `object`

Defining an item and its fields in object schema

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| body | `TItemType` |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`TItemType`>>

___
<a id="createitems"></a>

###  createItems

▸ **createItems**<`TItemsType`>(collection: *`string`*, body: *[BodyType](../modules/_schemes_http_body_.md#bodytype)*): `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`TItemsType`>>

*Defined in [SDK.ts:591](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L591)*

Create multiple items

*__see__*: [https://docs.directus.io/api/reference.html#create-items](https://docs.directus.io/api/reference.html#create-items)

**Type parameters:**

#### TItemsType :  `Array`<`__type`>

Defining an array of items, each in object schema

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| body | [BodyType](../modules/_schemes_http_body_.md#bodytype) |

**Returns:** `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`TItemsType`>>

___
<a id="createpermissions"></a>

###  createPermissions

▸ **createPermissions**<`TResponse`>(data: *`any`[]*): `Promise`<`TResponse`>

*Defined in [SDK.ts:756](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L756)*

TODO: Fix type-def for param and return Create multiple new permissions

**Type parameters:**

#### TResponse :  `any`[]

Permissions type as array extending any\[\]

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any`[] |

**Returns:** `Promise`<`TResponse`>

___
<a id="createrelation"></a>

###  createRelation

▸ **createRelation**(data: *[IRelation](../interfaces/_schemes_directus_relation_.irelation.md)*): `Promise`<[IRelationResponse](../interfaces/_schemes_response_relation_.irelationresponse.md)>

*Defined in [SDK.ts:792](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L792)*

Creates new relation

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | [IRelation](../interfaces/_schemes_directus_relation_.irelation.md) |  \- |

**Returns:** `Promise`<[IRelationResponse](../interfaces/_schemes_response_relation_.irelationresponse.md)>

___
<a id="createrole"></a>

###  createRole

▸ **createRole**<`TRole`>(body: *`TRole`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`TRole`>>

*Defined in [SDK.ts:904](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L904)*

Create a new user role

**Type parameters:**

#### TRole :  [IRole](../interfaces/_schemes_directus_role_.irole.md)
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| body | `TRole` |   |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`TRole`>>

___
<a id="deletecollection"></a>

###  deleteCollection

▸ **deleteCollection**(collection: *`string`*): `Promise`<`void`>

*Defined in [SDK.ts:208](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L208)*

Deletes a certain collection

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |

**Returns:** `Promise`<`void`>

___
<a id="deletecollectionpreset"></a>

###  deleteCollectionPreset

▸ **deleteCollectionPreset**(primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*): `Promise`<`void`>

*Defined in [SDK.ts:282](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L282)*

Delete collection preset by primarykey

*__see__*: [https://docs.directus.io/api/reference.html#collection-presets](https://docs.directus.io/api/reference.html#collection-presets)

**Parameters:**

| Name | Type |
| ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) |

**Returns:** `Promise`<`void`>

___
<a id="deletefield"></a>

###  deleteField

▸ **deleteField**(collection: *`string`*, fieldName: *`string`*): `Promise`<`void`>

*Defined in [SDK.ts:450](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L450)*

Delete a field from a collection

*__see__*: @see [https://docs.directus.io/api/reference.html#fields-2](https://docs.directus.io/api/reference.html#fields-2)

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fieldName | `string` |

**Returns:** `Promise`<`void`>

___
<a id="deleteitem"></a>

###  deleteItem

▸ **deleteItem**(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*): `Promise`<`void`>

*Defined in [SDK.ts:643](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L643)*

Delete a single item by primary key

*__see__*: [https://docs.directus.io/api/reference.html#delete-items](https://docs.directus.io/api/reference.html#delete-items)

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) |

**Returns:** `Promise`<`void`>

___
<a id="deleteitems"></a>

###  deleteItems

▸ **deleteItems**(collection: *`string`*, primaryKeys: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)[]*): `Promise`<`void`>

*Defined in [SDK.ts:656](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L656)*

Delete multiple items by primary key

*__see__*: [https://docs.directus.io/api/reference.html#delete-items](https://docs.directus.io/api/reference.html#delete-items)

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| primaryKeys | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype)[] |

**Returns:** `Promise`<`void`>

___
<a id="deleterole"></a>

###  deleteRole

▸ **deleteRole**(primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*): `Promise`<`void`>

*Defined in [SDK.ts:914](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L914)*

Delete a user rol by primary key

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) |   |

**Returns:** `Promise`<`void`>

___
<a id="getactivity"></a>

###  getActivity

▸ **getActivity**(params?: *`QueryParamsType`*): `Promise`<[IActivityResponse](../interfaces/_schemes_response_activity_.iactivityresponse.md)>

*Defined in [SDK.ts:145](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L145)*

Get activity

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IActivityResponse](../interfaces/_schemes_response_activity_.iactivityresponse.md)>

___
<a id="getallfields"></a>

###  getAllFields

▸ **getAllFields**<`TFieldsType`>(params?: *`QueryParamsType`*): `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`TFieldsType`>>

*Defined in [SDK.ts:324](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L324)*

Get all fields that are in Directus

*__see__*: [https://docs.directus.io/api/reference.html#fields-2](https://docs.directus.io/api/reference.html#fields-2)

**Type parameters:**

#### TFieldsType :  [IField](../interfaces/_schemes_directus_field_.ifield.md)[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`TFieldsType`>>

___
<a id="getcollection"></a>

###  getCollection

▸ **getCollection**(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

*Defined in [SDK.ts:180](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L180)*

Get collection info by name

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

___
<a id="getcollectionpresets"></a>

###  getCollectionPresets

▸ **getCollectionPresets**<`TResponse`>(params?: *`QueryParamsType`*): `Promise`<`TResponse`>

*Defined in [SDK.ts:222](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L222)*

Get the collection presets of the current user

*__see__*: [https://docs.directus.io/api/reference.html#collection-presets](https://docs.directus.io/api/reference.html#collection-presets)

**Type parameters:**

#### TResponse :  `any`[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<`TResponse`>

___
<a id="getcollectionrelations"></a>

###  getCollectionRelations

▸ **getCollectionRelations**(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<`any`[]>

*Defined in [SDK.ts:807](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L807)*

TODO: Add type-def for return value(s) Get the relationship information for the given collection

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<`any`[]>

___
<a id="getcollections"></a>

###  getCollections

▸ **getCollections**(params?: *`QueryParamsType`*): `Promise`<[ICollectionsResponse](../interfaces/_schemes_response_collection_.icollectionsresponse.md)[]>

*Defined in [SDK.ts:171](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L171)*

Get all available collections

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[ICollectionsResponse](../interfaces/_schemes_response_collection_.icollectionsresponse.md)[]>

___
<a id="getfield"></a>

###  getField

▸ **getField**<`TFieldType`>(collection: *`string`*, fieldName: *`string`*, params?: *`QueryParamsType`*): `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<`TFieldType`>>

*Defined in [SDK.ts:350](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L350)*

Get the field information for a single given field

*__see__*: [https://docs.directus.io/api/reference.html#fields-2](https://docs.directus.io/api/reference.html#fields-2)

**Type parameters:**

#### TFieldType :  [IField](../interfaces/_schemes_directus_field_.ifield.md)
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| fieldName | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<`TFieldType`>>

___
<a id="getfields"></a>

###  getFields

▸ **getFields**<`TFieldsType`>(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`TFieldsType`>>

*Defined in [SDK.ts:336](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L336)*

Get the fields that have been setup for a given collection

*__see__*: [https://docs.directus.io/api/reference.html#fields-2](https://docs.directus.io/api/reference.html#fields-2)

**Type parameters:**

#### TFieldsType :  [IField](../interfaces/_schemes_directus_field_.ifield.md)[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`TFieldsType`>>

___
<a id="getfile"></a>

###  getFile

▸ **getFile**<`TFile`>(fileName: *`TFile`*, params?: *`QueryParamsType`*): `Promise`<`TFile extends string ? IFileResponse<IFile> : IFilesResponse<IFile[]>`>

*Defined in [SDK.ts:474](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L474)*

Get a certain file or certain file list from Directus

*__see__*: [https://docs.directus.io/api/reference.html#files](https://docs.directus.io/api/reference.html#files)

**Type parameters:**

#### TFile :  `string` \| `string`[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| fileName | `TFile` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<`TFile extends string ? IFileResponse<IFile> : IFilesResponse<IFile[]>`>

___
<a id="getfiles"></a>

###  getFiles

▸ **getFiles**(params?: *`QueryParamsType`*): `Promise`<[IFilesResponse](../interfaces/_schemes_response_file_.ifilesresponse.md)>

*Defined in [SDK.ts:465](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L465)*

Get a list of available files from Directus

*__see__*: [https://docs.directus.io/api/reference.html#files](https://docs.directus.io/api/reference.html#files)

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IFilesResponse](../interfaces/_schemes_response_file_.ifilesresponse.md)>

___
<a id="getinterfaces"></a>

###  getInterfaces

▸ **getInterfaces**<`TResponse`>(): `Promise`<`TResponse`>

*Defined in [SDK.ts:296](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L296)*

Get the information of all installed interfaces

*__see__*: [https://docs.directus.io/api/reference.html#get-extensions](https://docs.directus.io/api/reference.html#get-extensions)

**Type parameters:**

#### TResponse :  `any`[]

**Returns:** `Promise`<`TResponse`>

___
<a id="getitem"></a>

###  getItem

▸ **getItem**<`TItemType`>(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, params?: *`QueryParamsType`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`TItemType`>>

*Defined in [SDK.ts:625](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L625)*

Get a single item by primary key

*__see__*: [https://docs.directus.io/api/reference.html#get-item](https://docs.directus.io/api/reference.html#get-item)

**Type parameters:**

#### TItemType :  `object`

Defining fields of an item in object schema

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`TItemType`>>

___
<a id="getitemrevisions"></a>

###  getItemRevisions

▸ **getItemRevisions**<`TDataAndDelta`>(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, params?: *`QueryParamsType`*): `Promise`<[IRevisionResponse](../interfaces/_schemes_response_revision_.irevisionresponse.md)<`TDataAndDelta`>>

*Defined in [SDK.ts:832](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L832)*

Get a single item's revisions by primary key

*__typeparam__*: The data including delta type for the revision

**Type parameters:**

#### TDataAndDelta :  `object`
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| collection | `string` | - |  \- |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) | - |  \- |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IRevisionResponse](../interfaces/_schemes_response_revision_.irevisionresponse.md)<`TDataAndDelta`>>

___
<a id="getitems"></a>

###  getItems

▸ **getItems**<`TTItemsType`>(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`TTItemsType`>>

*Defined in [SDK.ts:608](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L608)*

Get items from a given collection

*__see__*: [https://docs.directus.io/api/reference.html#get-multiple-items](https://docs.directus.io/api/reference.html#get-multiple-items)

*__typeparam__*: Defining an array of items, each in object schema

**Type parameters:**

#### TTItemsType :  `Array`<`__type`>
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`TTItemsType`>>

___
<a id="getlayouts"></a>

###  getLayouts

▸ **getLayouts**<`TResponse`>(): `Promise`<`TResponse`>

*Defined in [SDK.ts:304](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L304)*

Get the information of all installed layouts

*__see__*: [https://docs.directus.io/api/reference.html#get-extensions](https://docs.directus.io/api/reference.html#get-extensions)

**Type parameters:**

#### TResponse :  `any`[]

**Returns:** `Promise`<`TResponse`>

___
<a id="getme"></a>

###  getMe

▸ **getMe**<`User`>(params?: *`QueryParamsType`*): `Promise`<[IUserResponse](../interfaces/_schemes_response_user_.iuserresponse.md)<`User`>>

*Defined in [SDK.ts:974](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L974)*

Get the user info of the currently logged in user

**Type parameters:**

#### User :  [IUser](../interfaces/_schemes_directus_user_.iuser.md)
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IUserResponse](../interfaces/_schemes_response_user_.iuserresponse.md)<`User`>>

___
<a id="getmybookmarks"></a>

###  getMyBookmarks

▸ **getMyBookmarks**<`TResponse`>(params?: *`QueryParamsType`*): `Promise`<`TResponse`>

*Defined in [SDK.ts:160](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L160)*

Get the bookmarks of the current user

*__deprecated__*: Will be removed in the next major version, please use [SDK.getCollectionPresets](_sdk_.sdk.md#getcollectionpresets) instead

*__see__*: [https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks](https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks)

**Type parameters:**

#### TResponse :  `any`[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<`TResponse`>

___
<a id="getmylistingpreferences"></a>

###  getMyListingPreferences

▸ **getMyListingPreferences**<`TResponse`>(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<`TResponse`>

*Defined in [SDK.ts:672](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L672)*

Get the collection presets of the current user for a single collection

**Type parameters:**

#### TResponse :  `any`[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<`TResponse`>

___
<a id="getmypermissions"></a>

###  getMyPermissions

▸ **getMyPermissions**<`TResponse`>(params?: *`QueryParamsType`*): `Promise`<`TResponse`>

*Defined in [SDK.ts:745](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L745)*

TODO: Fix type-def for return Get the currently logged in user's permissions

**Type parameters:**

#### TResponse :  `any`[]

Permissions type as array extending any\[\]

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<`TResponse`>

___
<a id="getpages"></a>

###  getPages

▸ **getPages**<`TResponse`>(): `Promise`<`TResponse`>

*Defined in [SDK.ts:312](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L312)*

Get the information of all installed pages

*__see__*: [https://docs.directus.io/api/reference.html#get-extensions](https://docs.directus.io/api/reference.html#get-extensions)

**Type parameters:**

#### TResponse :  `any`[]

**Returns:** `Promise`<`TResponse`>

___
<a id="getpermissions"></a>

###  getPermissions

▸ **getPermissions**(params?: *`QueryParamsType`*): `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<[IPermission](../interfaces/_schemes_directus_permission_.ipermission.md)[]>>

*Defined in [SDK.ts:734](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L734)*

Get permissions

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |  \- |

**Returns:** `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<[IPermission](../interfaces/_schemes_directus_permission_.ipermission.md)[]>>

___
<a id="getrelations"></a>

###  getRelations

▸ **getRelations**(params?: *`QueryParamsType`*): `Promise`<[IRelationsResponse](../interfaces/_schemes_response_relation_.irelationsresponse.md)>

*Defined in [SDK.ts:782](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L782)*

Get all relationships

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |  \- |

**Returns:** `Promise`<[IRelationsResponse](../interfaces/_schemes_response_relation_.irelationsresponse.md)>

___
<a id="getrole"></a>

###  getRole

▸ **getRole**(primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, params?: *`QueryParamsType`*): `Promise`<[IRoleResponse](../interfaces/_schemes_response_role_.iroleresponse.md)>

*Defined in [SDK.ts:871](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L871)*

Get a single user role

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) | - |  \- |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IRoleResponse](../interfaces/_schemes_response_role_.iroleresponse.md)>

___
<a id="getroles"></a>

###  getRoles

▸ **getRoles**(params?: *`QueryParamsType`*): `Promise`<[IRoleResponse](../interfaces/_schemes_response_role_.iroleresponse.md)[]>

*Defined in [SDK.ts:882](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L882)*

Get the user roles

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IRoleResponse](../interfaces/_schemes_response_role_.iroleresponse.md)[]>

___
<a id="getsettings"></a>

###  getSettings

▸ **getSettings**(params?: *`QueryParamsType`*): `Promise`<[ISettingsResponse](../interfaces/_schemes_response_setting_.isettingsresponse.md)>

*Defined in [SDK.ts:928](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L928)*

Get Directus' global settings

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[ISettingsResponse](../interfaces/_schemes_response_setting_.isettingsresponse.md)>

___
<a id="getsettingsfields"></a>

###  getSettingsFields

▸ **getSettingsFields**(params?: *`QueryParamsType`*): `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<[IField](../interfaces/_schemes_directus_field_.ifield.md)[]>>

*Defined in [SDK.ts:938](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L938)*

Get the "fields" for directus\_settings

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<[IField](../interfaces/_schemes_directus_field_.ifield.md)[]>>

___
<a id="getthirdpartyauthproviders"></a>

###  getThirdPartyAuthProviders

▸ **getThirdPartyAuthProviders**(): `Promise`<`any`>

*Defined in [SDK.ts:1035](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L1035)*

TODO: Add response type-def Get all the setup third party auth providers

**Returns:** `Promise`<`any`>

___
<a id="getuser"></a>

###  getUser

▸ **getUser**<`User`>(primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, params?: *`QueryParamsType`*): `Promise`<[IUserResponse](../interfaces/_schemes_response_user_.iuserresponse.md)<`User`>>

*Defined in [SDK.ts:963](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L963)*

Get a single Directus user

**Type parameters:**

#### User :  [IUser](../interfaces/_schemes_directus_user_.iuser.md)
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) | - |  \- |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IUserResponse](../interfaces/_schemes_response_user_.iuserresponse.md)<`User`>>

___
<a id="getusers"></a>

###  getUsers

▸ **getUsers**(params?: *`QueryParamsType`*): `Promise`<[IUsersResponse](../interfaces/_schemes_response_user_.iusersresponse.md)<[IUser](../interfaces/_schemes_directus_user_.iuser.md)[]>>

*Defined in [SDK.ts:952](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L952)*

Get a list of available users in Directus

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IUsersResponse](../interfaces/_schemes_response_user_.iusersresponse.md)<[IUser](../interfaces/_schemes_directus_user_.iuser.md)[]>>

___
<a id="login"></a>

###  login

▸ **login**(credentials: *[ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md)*, options?: *[ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md)*): `Promise`<[ILoginResponse](../interfaces/_schemes_response_login_.iloginresponse.md)>

*Defined in [SDK.ts:88](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L88)*

Login to the API; Gets a new token from the API and stores it in this.api.token.

**Parameters:**

| Name | Type |
| ------ | ------ |
| credentials | [ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md) |
| `Optional` options | [ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md) |

**Returns:** `Promise`<[ILoginResponse](../interfaces/_schemes_response_login_.iloginresponse.md)>

___
<a id="logout"></a>

###  logout

▸ **logout**(): `void`

*Defined in [SDK.ts:95](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L95)*

Logs the user out by "forgetting" the token, and clearing the refresh interval

**Returns:** `void`

___
<a id="ping"></a>

###  ping

▸ **ping**(): `Promise`<`string`>

*Defined in [SDK.ts:1009](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L1009)*

Ping the API to check if it exists / is up and running, returns "pong"

**Returns:** `Promise`<`string`>

___
<a id="projectinfo"></a>

###  projectInfo

▸ **projectInfo**(): `Promise`<`any`>

*Defined in [SDK.ts:1026](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L1026)*

TODO: Add response type-def Get the server info from the project

**Returns:** `Promise`<`any`>

___
<a id="refresh"></a>

###  refresh

▸ **refresh**(token: *`string`*): `Promise`<[IRefreshTokenResponse](../interfaces/_schemes_response_token_.irefreshtokenresponse.md)>

*Defined in [SDK.ts:119](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L119)*

Use the passed token to request a new one

**Parameters:**

| Name | Type |
| ------ | ------ |
| token | `string` |

**Returns:** `Promise`<[IRefreshTokenResponse](../interfaces/_schemes_response_token_.irefreshtokenresponse.md)>

___
<a id="refreshifneeded"></a>

###  refreshIfNeeded

▸ **refreshIfNeeded**(): `Promise`<[`boolean`, `Error`]>

*Defined in [SDK.ts:112](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L112)*

Refresh the token if it is about to expire (within 30 seconds of expiry date).

*   Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
*   Calls onAutoRefreshError if refreshing the token fails for some reason.

**Returns:** `Promise`<[`boolean`, `Error`]>

___
<a id="requestpasswordreset"></a>

###  requestPasswordReset

▸ **requestPasswordReset**<`TResponse`>(email: *`string`*): `Promise`<`TResponse`>

*Defined in [SDK.ts:128](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L128)*

Request to reset the password of the user with the given email address. The API will send an email to the given email address with a link to generate a new temporary password.

**Type parameters:**

#### TResponse :  `any`
**Parameters:**

| Name | Type |
| ------ | ------ |
| email | `string` |

**Returns:** `Promise`<`TResponse`>

___
<a id="reset"></a>

###  reset

▸ **reset**(): `void`

*Defined in [SDK.ts:102](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L102)*

Resets the client instance by logging out and removing the URL and project

**Returns:** `void`

___
<a id="revert"></a>

###  revert

▸ **revert**(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, revisionID: *`number`*): `Promise`<`void`>

*Defined in [SDK.ts:852](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L852)*

Revert an item to a previous state

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| collection | `string` |  \- |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) |  \- |
| revisionID | `number` |   |

**Returns:** `Promise`<`void`>

___
<a id="serverinfo"></a>

###  serverInfo

▸ **serverInfo**(): `Promise`<[IServerInformationResponse](../interfaces/_schemes_response_serverinformation_.iserverinformationresponse.md)>

*Defined in [SDK.ts:1017](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L1017)*

Get the server info from the API

**Returns:** `Promise`<[IServerInformationResponse](../interfaces/_schemes_response_serverinformation_.iserverinformationresponse.md)>

___
<a id="updatecollection"></a>

###  updateCollection

▸ **updateCollection**(collection: *`string`*, data: *`Partial`<[ICollection](../interfaces/_schemes_directus_collection_.icollection.md)>*): `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

*Defined in [SDK.ts:198](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L198)*

Updates a certain collection

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| data | `Partial`<[ICollection](../interfaces/_schemes_directus_collection_.icollection.md)> |

**Returns:** `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

___
<a id="updatecollectionpreset"></a>

###  updateCollectionPreset

▸ **updateCollectionPreset**<`PartialCollectionPreset`,`TResultCollectionPreset`>(primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, data: *[IUpdateCollectionPresetBody](../interfaces/_schemes_request_collection_.iupdatecollectionpresetbody.md)*): `Promise`<[ICollectionPresetResponse](../interfaces/_schemes_response_collectionpreset_.icollectionpresetresponse.md)<`PartialCollectionPreset` & `TResultCollectionPreset`>>

*Defined in [SDK.ts:262](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L262)*

Update collection preset (bookmark / listing preference)

*__see__*: [https://docs.directus.io/api/reference.html#collection-presets](https://docs.directus.io/api/reference.html#collection-presets)

**Type parameters:**

#### PartialCollectionPreset :  `Partial`<[ICollectionPreset](../interfaces/_schemes_directus_collectionpreset_.icollectionpreset.md)>
#### TResultCollectionPreset :  [ICollectionPreset](../interfaces/_schemes_directus_collectionpreset_.icollectionpreset.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) |
| data | [IUpdateCollectionPresetBody](../interfaces/_schemes_request_collection_.iupdatecollectionpresetbody.md) |

**Returns:** `Promise`<[ICollectionPresetResponse](../interfaces/_schemes_response_collectionpreset_.icollectionpresetresponse.md)<`PartialCollectionPreset` & `TResultCollectionPreset`>>

___
<a id="updatedatabase"></a>

###  updateDatabase

▸ **updateDatabase**(): `Promise`<`void`>

*Defined in [SDK.ts:1001](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L1001)*

This will update the database of the API instance to the latest version using the migrations in the API

**Returns:** `Promise`<`void`>

___
<a id="updatefield"></a>

###  updateField

▸ **updateField**<`TFieldType`>(collection: *`string`*, fieldName: *`string`*, fieldInfo: *`TFieldType`*): `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<[IField](../interfaces/_schemes_directus_field_.ifield.md) & `TFieldType`> \| `undefined`>

*Defined in [SDK.ts:380](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L380)*

Update a given field in a given collection

*__see__*: [https://docs.directus.io/api/reference.html#fields-2](https://docs.directus.io/api/reference.html#fields-2)

**Type parameters:**

#### TFieldType :  `Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)>
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fieldName | `string` |
| fieldInfo | `TFieldType` |

**Returns:** `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<[IField](../interfaces/_schemes_directus_field_.ifield.md) & `TFieldType`> \| `undefined`>

___
<a id="updatefields"></a>

###  updateFields

▸ **updateFields**<`TFieldsType`>(collection: *`string`*, fields: *`Array`<`Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)>>*): `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`TFieldsType` & [IField](../interfaces/_schemes_directus_field_.ifield.md)[]> \| `undefined`>

▸ **updateFields**<`TFieldsType`>(collection: *`string`*, fields: *`string`[]*, fieldInfo: *`Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)>*): `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`TFieldsType` & [IField](../interfaces/_schemes_directus_field_.ifield.md)[]> \| `undefined`>

*Defined in [SDK.ts:418](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L418)*

Update multiple fields at once

*__see__*: [https://docs.directus.io/api/reference.html#fields-2](https://docs.directus.io/api/reference.html#fields-2)

*__example__*: // Set multiple fields to the same value updateFields("projects", \["first\_name", "last\_name", "email"\], { default\_value: "" })

// Set multiple fields to different values updateFields("projects", \[ { id: 14, sort: 1 }, { id: 17, sort: 2 }, { id: 912, sort: 3 } \])

**Type parameters:**

#### TFieldsType :  [IField](../interfaces/_schemes_directus_field_.ifield.md)[]
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fields | `Array`<`Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)>> |

**Returns:** `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`TFieldsType` & [IField](../interfaces/_schemes_directus_field_.ifield.md)[]> \| `undefined`>

*Defined in [SDK.ts:422](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L422)*

**Type parameters:**

#### TFieldsType :  [IField](../interfaces/_schemes_directus_field_.ifield.md)[]
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fields | `string`[] |
| fieldInfo | `Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)> |

**Returns:** `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`TFieldsType` & [IField](../interfaces/_schemes_directus_field_.ifield.md)[]> \| `undefined`>

___
<a id="updateitem"></a>

###  updateItem

▸ **updateItem**<`TTPartialItem`,`TTResult`>(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, body: *`TTPartialItem`*, params?: *`QueryParamsType`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`TTPartialItem` & `TTResult`>>

*Defined in [SDK.ts:537](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L537)*

Update an existing item

*__see__*: [https://docs.directus.io/api/reference.html#update-item](https://docs.directus.io/api/reference.html#update-item)

**Type parameters:**

#### TTPartialItem :  `object`

Defining the item type in object schema

#### TTResult :  `object`

Extension of \[TPartialItem\] as expected result

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) | - |
| body | `TTPartialItem` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`TTPartialItem` & `TTResult`>>

___
<a id="updateitems"></a>

###  updateItems

▸ **updateItems**<`TPartialItem`,`TResult`>(collection: *`string`*, body: *`TPartialItem`*, params?: *`QueryParamsType`*): `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`TPartialItem` & `TResult`>>

*Defined in [SDK.ts:559](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L559)*

Update multiple items

*__see__*: [https://docs.directus.io/api/reference.html#update-items](https://docs.directus.io/api/reference.html#update-items)

**Type parameters:**

#### TPartialItem :  `object`[]

Defining an array of items, each in object schema

#### TResult :  `TPartialItem`

Extension of \[TPartialItem\] as expected result

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| body | `TPartialItem` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`TPartialItem` & `TResult`>>

___
<a id="updatepermissions"></a>

###  updatePermissions

▸ **updatePermissions**<`TResponse`>(data: *`any`[]*): `Promise`<`TResponse`>

*Defined in [SDK.ts:767](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L767)*

TODO: Fix type-def for param and return Update multiple permission records

**Type parameters:**

#### TResponse :  `any`[]

Permissions type as array extending any\[\]

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any`[] |

**Returns:** `Promise`<`TResponse`>

___
<a id="updaterelation"></a>

###  updateRelation

▸ **updateRelation**(primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, data: *`Partial`<[IRelation](../interfaces/_schemes_directus_relation_.irelation.md)>*): `Promise`<[IRelationResponse](../interfaces/_schemes_response_relation_.irelationresponse.md)>

*Defined in [SDK.ts:799](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L799)*

Updates existing relation

**Parameters:**

| Name | Type |
| ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) |
| data | `Partial`<[IRelation](../interfaces/_schemes_directus_relation_.irelation.md)> |

**Returns:** `Promise`<[IRelationResponse](../interfaces/_schemes_response_relation_.irelationresponse.md)>

___
<a id="updaterole"></a>

###  updateRole

▸ **updateRole**<`Role`>(primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, body: *`Role`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`Role` & [IRole](../interfaces/_schemes_directus_role_.irole.md)>>

*Defined in [SDK.ts:893](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L893)*

Update a user role

**Type parameters:**

#### Role :  `Partial`<[IRole](../interfaces/_schemes_directus_role_.irole.md)>
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) |  \- |
| body | `Role` |   |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`Role` & [IRole](../interfaces/_schemes_directus_role_.irole.md)>>

___
<a id="updateuser"></a>

###  updateUser

▸ **updateUser**<`User`>(primaryKey: *[PrimaryKeyType](../modules/_sdk_.md#primarykeytype)*, body: *`User`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`User` & [IUser](../interfaces/_schemes_directus_user_.iuser.md)>>

*Defined in [SDK.ts:985](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L985)*

Update a single user based on primaryKey

**Type parameters:**

#### User :  `Partial`<[IUser](../interfaces/_schemes_directus_user_.iuser.md)>
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_sdk_.md#primarykeytype) |  \- |
| body | `User` |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`User` & [IUser](../interfaces/_schemes_directus_user_.iuser.md)>>

___
<a id="uploadfiles"></a>

###  uploadFiles

▸ **uploadFiles**<`TResponse`>(data: *`object`*, onUploadProgress?: *`function`*): `Promise`<`TResponse`>

*Defined in [SDK.ts:488](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/SDK.ts#L488)*

Upload multipart files in multipart/form-data

*__see__*: [https://docs.directus.io/api/reference.html#files](https://docs.directus.io/api/reference.html#files)

**Type parameters:**

#### TResponse :  `any`
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | `object` | - |
| `Default value` onUploadProgress | `function` |  () &#x3D;&gt; ({}) |

**Returns:** `Promise`<`TResponse`>

___

