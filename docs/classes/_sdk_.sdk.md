[@directus/sdk-js](../README.md) > ["SDK"](../modules/_sdk_.md) > [SDK](../classes/_sdk_.sdk.md)

# Class: SDK

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
* [getCollectionRelations](_sdk_.sdk.md#getcollectionrelations)
* [getCollections](_sdk_.sdk.md#getcollections)
* [getField](_sdk_.sdk.md#getfield)
* [getFields](_sdk_.sdk.md#getfields)
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

*Defined in [SDK.ts:147](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L147)*

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

*Defined in [SDK.ts:147](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L147)*

___
<a id="config"></a>

###  config

**● config**: *[IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [SDK.ts:146](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L146)*

___
<a id="getpayload"></a>

### `<Static>` getPayload

**● getPayload**: *[getPayload](../modules/_utils_payload_.md#getpayload)* =  getPayload

*Defined in [SDK.ts:143](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L143)*

___

## Accessors

<a id="loggedin"></a>

###  loggedIn

**get loggedIn**(): `boolean`

*Defined in [SDK.ts:130](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L130)*

**Returns:** `boolean`

___
<a id="payload"></a>

###  payload

**get payload**(): `any`

*Defined in [SDK.ts:134](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L134)*

**Returns:** `any`

___

## Methods

<a id="createcollection"></a>

###  createCollection

▸ **createCollection**(data: *[ICollection](../interfaces/_schemes_directus_collection_.icollection.md)*): `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

*Defined in [SDK.ts:281](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L281)*

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

*Defined in [SDK.ts:312](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L312)*

Create a new collection preset (bookmark / listing preferences)

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

▸ **createField**<`T`>(collection: *`string`*, fieldInfo: *`T`*): `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<`T`>>

*Defined in [SDK.ts:415](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L415)*

Create a field in the given collection

**Type parameters:**

#### T :  [IField](../interfaces/_schemes_directus_field_.ifield.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fieldInfo | `T` |

**Returns:** `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<`T`>>

___
<a id="createitem"></a>

###  createItem

▸ **createItem**<`ItemType`>(collection: *`string`*, body: *`ItemType`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`ItemType`>>

*Defined in [SDK.ts:593](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L593)*

Create a new item

**Type parameters:**

#### ItemType :  `object`

Defining an item and its fields in object schema

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| body | `ItemType` |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`ItemType`>>

___
<a id="createitems"></a>

###  createItems

▸ **createItems**<`ItemsType`>(collection: *`string`*, body: *[BodyType](../modules/_schemes_http_body_.md#bodytype)*): `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`ItemsType`>>

*Defined in [SDK.ts:607](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L607)*

Create multiple items

**Type parameters:**

#### ItemsType :  `Array`<`__type`>

Defining an array of items, each in object schema

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| body | [BodyType](../modules/_schemes_http_body_.md#bodytype) |

**Returns:** `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`ItemsType`>>

___
<a id="createpermissions"></a>

###  createPermissions

▸ **createPermissions**<`T`>(data: *`any`[]*): `Promise`<`T`>

*Defined in [SDK.ts:774](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L774)*

TODO: Fix type-def for param and return Create multiple new permissions

**Type parameters:**

#### T :  `any`[]

Permissions type as array extending any\[\]

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `any`[] |  \- |

**Returns:** `Promise`<`T`>

___
<a id="createrelation"></a>

###  createRelation

▸ **createRelation**(data: *[IRelation](../interfaces/_schemes_directus_relation_.irelation.md)*): `Promise`<[IRelationResponse](../interfaces/_schemes_response_relation_.irelationresponse.md)>

*Defined in [SDK.ts:812](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L812)*

Creates new relation

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | [IRelation](../interfaces/_schemes_directus_relation_.irelation.md) |  \- |

**Returns:** `Promise`<[IRelationResponse](../interfaces/_schemes_response_relation_.irelationresponse.md)>

___
<a id="createrole"></a>

###  createRole

▸ **createRole**<`Role`>(body: *`Role`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`Role`>>

*Defined in [SDK.ts:930](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L930)*

Create a new user role

**Type parameters:**

#### Role :  [IRole](../interfaces/_schemes_directus_role_.irole.md)
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| body | `Role` |   |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`Role`>>

___
<a id="deletecollection"></a>

###  deleteCollection

▸ **deleteCollection**(collection: *`string`*): `Promise`<`void`>

*Defined in [SDK.ts:299](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L299)*

Deletes a certain collection

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |

**Returns:** `Promise`<`void`>

___
<a id="deletecollectionpreset"></a>

###  deleteCollectionPreset

▸ **deleteCollectionPreset**(primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*): `Promise`<`void`>

*Defined in [SDK.ts:343](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L343)*

Delete collection preset by primarykey

**Parameters:**

| Name | Type |
| ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) |

**Returns:** `Promise`<`void`>

___
<a id="deletefield"></a>

###  deleteField

▸ **deleteField**(collection: *`string`*, fieldName: *`string`*): `Promise`<`void`>

*Defined in [SDK.ts:494](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L494)*

Delete a field from a collection

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fieldName | `string` |

**Returns:** `Promise`<`void`>

___
<a id="deleteitem"></a>

###  deleteItem

▸ **deleteItem**(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*): `Promise`<`void`>

*Defined in [SDK.ts:658](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L658)*

Delete a single item by primary key

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) |

**Returns:** `Promise`<`void`>

___
<a id="deleteitems"></a>

###  deleteItems

▸ **deleteItems**(collection: *`string`*, primaryKeys: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)[]*): `Promise`<`void`>

*Defined in [SDK.ts:670](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L670)*

Delete multiple items by primary key

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| primaryKeys | [PrimaryKeyType](../modules/_types_.md#primarykeytype)[] |

**Returns:** `Promise`<`void`>

___
<a id="deleterole"></a>

###  deleteRole

▸ **deleteRole**(primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*): `Promise`<`void`>

*Defined in [SDK.ts:940](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L940)*

Delete a user rol by primary key

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) |   |

**Returns:** `Promise`<`void`>

___
<a id="getactivity"></a>

###  getActivity

▸ **getActivity**(params?: *`QueryParamsType`*): `Promise`<[IActivityResponse](../interfaces/_schemes_response_activity_.iactivityresponse.md)>

*Defined in [SDK.ts:217](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L217)*

Get activity

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IActivityResponse](../interfaces/_schemes_response_activity_.iactivityresponse.md)>

___
<a id="getallfields"></a>

###  getAllFields

▸ **getAllFields**<`T`>(params?: *`QueryParamsType`*): `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`T`>>

*Defined in [SDK.ts:381](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L381)*

Get all fields that are in Directus

**Type parameters:**

#### T :  [IField](../interfaces/_schemes_directus_field_.ifield.md)[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`T`>>

___
<a id="getcollection"></a>

###  getCollection

▸ **getCollection**(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

*Defined in [SDK.ts:271](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L271)*

Get collection info by name

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

___
<a id="getcollectionrelations"></a>

###  getCollectionRelations

▸ **getCollectionRelations**(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<`any`[]>

*Defined in [SDK.ts:833](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L833)*

TODO: Add type-def for return value(s) Get the relationship information for the given collection

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| collection | `string` | - |  \- |
| `Default value` params | `QueryParamsType` |  {} |  \- |

**Returns:** `Promise`<`any`[]>

___
<a id="getcollections"></a>

###  getCollections

▸ **getCollections**(params?: *`QueryParamsType`*): `Promise`<[ICollectionsResponse](../interfaces/_schemes_response_collection_.icollectionsresponse.md)[]>

*Defined in [SDK.ts:262](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L262)*

Get all available collections

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[ICollectionsResponse](../interfaces/_schemes_response_collection_.icollectionsresponse.md)[]>

___
<a id="getfield"></a>

###  getField

▸ **getField**<`T`>(collection: *`string`*, fieldName: *`string`*, params?: *`QueryParamsType`*): `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<`T`>>

*Defined in [SDK.ts:400](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L400)*

Get the field information for a single given field

**Type parameters:**

#### T :  [IField](../interfaces/_schemes_directus_field_.ifield.md)
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| fieldName | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<`T`>>

___
<a id="getfields"></a>

###  getFields

▸ **getFields**<`T`>(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`T`>>

*Defined in [SDK.ts:390](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L390)*

Get the fields that have been setup for a given collection

**Type parameters:**

#### T :  [IField](../interfaces/_schemes_directus_field_.ifield.md)[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`T`>>

___
<a id="getinterfaces"></a>

###  getInterfaces

▸ **getInterfaces**<`T`>(): `Promise`<`T`>

*Defined in [SDK.ts:356](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L356)*

Get the meta information of all installed interfaces

**Type parameters:**

#### T :  `any`[]

**Returns:** `Promise`<`T`>

___
<a id="getitem"></a>

###  getItem

▸ **getItem**<`ItemType`>(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, params?: *`QueryParamsType`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`ItemType`>>

*Defined in [SDK.ts:641](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L641)*

Get a single item by primary key

**Type parameters:**

#### ItemType :  `object`

Defining fields of an item in object schema

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`ItemType`>>

___
<a id="getitemrevisions"></a>

###  getItemRevisions

▸ **getItemRevisions**<`DataAndDelta`>(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, params?: *`QueryParamsType`*): `Promise`<[IRevisionResponse](../interfaces/_schemes_response_revision_.irevisionresponse.md)<`DataAndDelta`>>

*Defined in [SDK.ts:858](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L858)*

Get a single item's revisions by primary key

**Type parameters:**

#### DataAndDelta :  `object`

The data including delta type for the revision

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| collection | `string` | - |  \- |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) | - |  \- |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IRevisionResponse](../interfaces/_schemes_response_revision_.irevisionresponse.md)<`DataAndDelta`>>

___
<a id="getitems"></a>

###  getItems

▸ **getItems**<`ItemsType`>(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`ItemsType`>>

*Defined in [SDK.ts:624](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L624)*

Get items from a given collection

**Type parameters:**

#### ItemsType :  `Array`<`__type`>

Defining an array of items, each in object schema

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`ItemsType`>>

___
<a id="getlayouts"></a>

###  getLayouts

▸ **getLayouts**<`T`>(): `Promise`<`T`>

*Defined in [SDK.ts:363](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L363)*

Get the meta information of all installed layouts

**Type parameters:**

#### T :  `any`[]

**Returns:** `Promise`<`T`>

___
<a id="getme"></a>

###  getMe

▸ **getMe**<`User`>(params?: *`QueryParamsType`*): `Promise`<[IUserResponse](../interfaces/_schemes_response_user_.iuserresponse.md)<`User`>>

*Defined in [SDK.ts:1000](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L1000)*

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

▸ **getMyBookmarks**<`T`>(params?: *`QueryParamsType`*): `Promise`<`T`>

*Defined in [SDK.ts:232](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L232)*

Get the bookmarks of the current user TODO: Add deprecation warning

*__see__*: [https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks](https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks)

**Type parameters:**

#### T :  `any`[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<`T`>

___
<a id="getmylistingpreferences"></a>

###  getMyListingPreferences

▸ **getMyListingPreferences**<`T`>(collection: *`string`*, params?: *`QueryParamsType`*): `Promise`<`T`>

*Defined in [SDK.ts:686](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L686)*

Get the collection presets of the current user for a single collection

**Type parameters:**

#### T :  `any`[]
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<`T`>

___
<a id="getmypermissions"></a>

###  getMyPermissions

▸ **getMyPermissions**<`T`>(params?: *`QueryParamsType`*): `Promise`<`T`>

*Defined in [SDK.ts:761](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L761)*

TODO: Fix type-def for return Get the currently logged in user's permissions

**Type parameters:**

#### T :  `any`[]

Permissions type as array extending any\[\]

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |  \- |

**Returns:** `Promise`<`T`>

___
<a id="getpages"></a>

###  getPages

▸ **getPages**<`T`>(): `Promise`<`T`>

*Defined in [SDK.ts:370](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L370)*

Get the meta information of all installed pages

**Type parameters:**

#### T :  `any`[]

**Returns:** `Promise`<`T`>

___
<a id="getpermissions"></a>

###  getPermissions

▸ **getPermissions**(params?: *`QueryParamsType`*): `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<[IPermission](../interfaces/_schemes_directus_permission_.ipermission.md)[]>>

*Defined in [SDK.ts:748](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L748)*

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

*Defined in [SDK.ts:802](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L802)*

Get all relationships

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` params | `QueryParamsType` |  {} |  \- |

**Returns:** `Promise`<[IRelationsResponse](../interfaces/_schemes_response_relation_.irelationsresponse.md)>

___
<a id="getrole"></a>

###  getRole

▸ **getRole**(primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, params?: *`QueryParamsType`*): `Promise`<[IRoleResponse](../interfaces/_schemes_response_role_.iroleresponse.md)>

*Defined in [SDK.ts:897](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L897)*

Get a single user role

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) | - |  \- |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IRoleResponse](../interfaces/_schemes_response_role_.iroleresponse.md)>

___
<a id="getroles"></a>

###  getRoles

▸ **getRoles**(params?: *`QueryParamsType`*): `Promise`<[IRoleResponse](../interfaces/_schemes_response_role_.iroleresponse.md)[]>

*Defined in [SDK.ts:908](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L908)*

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

*Defined in [SDK.ts:954](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L954)*

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

*Defined in [SDK.ts:964](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L964)*

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

*Defined in [SDK.ts:1061](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L1061)*

TODO: Add response type-def Get all the setup third party auth providers

**Returns:** `Promise`<`any`>

___
<a id="getuser"></a>

###  getUser

▸ **getUser**<`User`>(primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, params?: *`QueryParamsType`*): `Promise`<[IUserResponse](../interfaces/_schemes_response_user_.iuserresponse.md)<`User`>>

*Defined in [SDK.ts:989](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L989)*

Get a single Directus user

**Type parameters:**

#### User :  [IUser](../interfaces/_schemes_directus_user_.iuser.md)
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) | - |  \- |
| `Default value` params | `QueryParamsType` |  {} |   |

**Returns:** `Promise`<[IUserResponse](../interfaces/_schemes_response_user_.iuserresponse.md)<`User`>>

___
<a id="getusers"></a>

###  getUsers

▸ **getUsers**(params?: *`QueryParamsType`*): `Promise`<[IUsersResponse](../interfaces/_schemes_response_user_.iusersresponse.md)<[IUser](../interfaces/_schemes_directus_user_.iuser.md)[]>>

*Defined in [SDK.ts:978](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L978)*

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

*Defined in [SDK.ts:160](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L160)*

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

*Defined in [SDK.ts:167](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L167)*

Logs the user out by "forgetting" the token, and clearing the refresh interval

**Returns:** `void`

___
<a id="ping"></a>

###  ping

▸ **ping**(): `Promise`<`string`>

*Defined in [SDK.ts:1035](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L1035)*

Ping the API to check if it exists / is up and running, returns "pong"

**Returns:** `Promise`<`string`>

___
<a id="projectinfo"></a>

###  projectInfo

▸ **projectInfo**(): `Promise`<`any`>

*Defined in [SDK.ts:1052](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L1052)*

TODO: Add response type-def Get the server info from the project

**Returns:** `Promise`<`any`>

___
<a id="refresh"></a>

###  refresh

▸ **refresh**(token: *`string`*): `Promise`<[IRefreshTokenResponse](../interfaces/_schemes_response_token_.irefreshtokenresponse.md)>

*Defined in [SDK.ts:191](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L191)*

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

*Defined in [SDK.ts:184](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L184)*

Refresh the token if it is about to expire (within 30 seconds of expiry date).

*   Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
*   Calls onAutoRefreshError if refreshing the token fails for some reason.

**Returns:** `Promise`<[`boolean`, `Error`]>

___
<a id="requestpasswordreset"></a>

###  requestPasswordReset

▸ **requestPasswordReset**<`T`>(email: *`string`*): `Promise`<`T`>

*Defined in [SDK.ts:200](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L200)*

Request to reset the password of the user with the given email address. The API will send an email to the given email address with a link to generate a new temporary password.

**Type parameters:**

#### T :  `any`
**Parameters:**

| Name | Type |
| ------ | ------ |
| email | `string` |

**Returns:** `Promise`<`T`>

___
<a id="reset"></a>

###  reset

▸ **reset**(): `void`

*Defined in [SDK.ts:174](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L174)*

Resets the client instance by logging out and removing the URL and project

**Returns:** `void`

___
<a id="revert"></a>

###  revert

▸ **revert**(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, revisionID: *`number`*): `Promise`<`void`>

*Defined in [SDK.ts:878](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L878)*

Revert an item to a previous state

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| collection | `string` |  \- |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) |  \- |
| revisionID | `number` |   |

**Returns:** `Promise`<`void`>

___
<a id="serverinfo"></a>

###  serverInfo

▸ **serverInfo**(): `Promise`<[IServerInformationResponse](../interfaces/_schemes_response_serverinformation_.iserverinformationresponse.md)>

*Defined in [SDK.ts:1043](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L1043)*

Get the server info from the API

**Returns:** `Promise`<[IServerInformationResponse](../interfaces/_schemes_response_serverinformation_.iserverinformationresponse.md)>

___
<a id="updatecollection"></a>

###  updateCollection

▸ **updateCollection**(collection: *`string`*, data: *`Partial`<[ICollection](../interfaces/_schemes_directus_collection_.icollection.md)>*): `Promise`<[ICollectionResponse](../interfaces/_schemes_response_collection_.icollectionresponse.md)>

*Defined in [SDK.ts:289](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L289)*

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

▸ **updateCollectionPreset**<`PartialCollectionPreset`,`ResultCollectionPreset`>(primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, data: *[IUpdateCollectionPresetBody](../interfaces/_schemes_request_collection_.iupdatecollectionpresetbody.md)*): `Promise`<[ICollectionPresetResponse](../interfaces/_schemes_response_collectionpreset_.icollectionpresetresponse.md)<`PartialCollectionPreset` & `ResultCollectionPreset`>>

*Defined in [SDK.ts:324](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L324)*

Update collection preset (bookmark / listing preference)

**Type parameters:**

#### PartialCollectionPreset :  `Partial`<[ICollectionPreset](../interfaces/_schemes_directus_collectionpreset_.icollectionpreset.md)>
#### ResultCollectionPreset :  [ICollectionPreset](../interfaces/_schemes_directus_collectionpreset_.icollectionpreset.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) |
| data | [IUpdateCollectionPresetBody](../interfaces/_schemes_request_collection_.iupdatecollectionpresetbody.md) |

**Returns:** `Promise`<[ICollectionPresetResponse](../interfaces/_schemes_response_collectionpreset_.icollectionpresetresponse.md)<`PartialCollectionPreset` & `ResultCollectionPreset`>>

___
<a id="updatedatabase"></a>

###  updateDatabase

▸ **updateDatabase**(): `Promise`<`void`>

*Defined in [SDK.ts:1027](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L1027)*

This will update the database of the API instance to the latest version using the migrations in the API

**Returns:** `Promise`<`void`>

___
<a id="updatefield"></a>

###  updateField

▸ **updateField**<`T`>(collection: *`string`*, fieldName: *`string`*, fieldInfo: *`T`*): `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<[IField](../interfaces/_schemes_directus_field_.ifield.md) & `T`> \| `undefined`>

*Defined in [SDK.ts:425](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L425)*

Update a given field in a given collection

**Type parameters:**

#### T :  `Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)>
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fieldName | `string` |
| fieldInfo | `T` |

**Returns:** `Promise`<[IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)<[IField](../interfaces/_schemes_directus_field_.ifield.md) & `T`> \| `undefined`>

___
<a id="updatefields"></a>

###  updateFields

▸ **updateFields**<`T`>(collection: *`string`*, fields: *`Array`<`Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)>>*): `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`T` & [IField](../interfaces/_schemes_directus_field_.ifield.md)[]> \| `undefined`>

▸ **updateFields**<`T`>(collection: *`string`*, fields: *`string`[]*, fieldInfo: *`Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)>*): `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`T` & [IField](../interfaces/_schemes_directus_field_.ifield.md)[]> \| `undefined`>

*Defined in [SDK.ts:463](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L463)*

Update multiple fields at once

*__example__*: // Set multiple fields to the same value updateFields("projects", \["first\_name", "last\_name", "email"\], { default\_value: "" })

// Set multiple fields to different values updateFields("projects", \[ { id: 14, sort: 1 }, { id: 17, sort: 2 }, { id: 912, sort: 3 } \])

**Type parameters:**

#### T :  [IField](../interfaces/_schemes_directus_field_.ifield.md)[]
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fields | `Array`<`Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)>> |

**Returns:** `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`T` & [IField](../interfaces/_schemes_directus_field_.ifield.md)[]> \| `undefined`>

*Defined in [SDK.ts:467](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L467)*

**Type parameters:**

#### T :  [IField](../interfaces/_schemes_directus_field_.ifield.md)[]
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | `string` |
| fields | `string`[] |
| fieldInfo | `Partial`<[IField](../interfaces/_schemes_directus_field_.ifield.md)> |

**Returns:** `Promise`<[IFieldsResponse](../interfaces/_schemes_response_field_.ifieldsresponse.md)<`T` & [IField](../interfaces/_schemes_directus_field_.ifield.md)[]> \| `undefined`>

___
<a id="updateitem"></a>

###  updateItem

▸ **updateItem**<`PartialItem`,`Result`>(collection: *`string`*, primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, body: *`PartialItem`*, params?: *`QueryParamsType`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`PartialItem` & `Result`>>

*Defined in [SDK.ts:554](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L554)*

Update an existing item

**Type parameters:**

#### PartialItem :  `object`

Defining the item type in object schema

#### Result :  `object`

Extension of \[PartialItem\] as expected result

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) | - |
| body | `PartialItem` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`PartialItem` & `Result`>>

___
<a id="updateitems"></a>

###  updateItems

▸ **updateItems**<`PartialItem`,`Result`>(collection: *`string`*, body: *`PartialItem`*, params?: *`QueryParamsType`*): `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`PartialItem` & `Result`>>

*Defined in [SDK.ts:575](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L575)*

Update multiple items

**Type parameters:**

#### PartialItem :  `object`[]

Defining an array of items, each in object schema

#### Result :  `PartialItem`

Extension of \[PartialItem\] as expected result

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| collection | `string` | - |
| body | `PartialItem` | - |
| `Default value` params | `QueryParamsType` |  {} |

**Returns:** `Promise`<[IItemsResponse](../interfaces/_schemes_response_item_.iitemsresponse.md)<`PartialItem` & `Result`>>

___
<a id="updatepermissions"></a>

###  updatePermissions

▸ **updatePermissions**<`T`>(data: *`any`[]*): `Promise`<`T`>

*Defined in [SDK.ts:787](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L787)*

TODO: Fix type-def for param and return Update multiple permission records

**Type parameters:**

#### T :  `any`[]

Permissions type as array extending any\[\]

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `any`[] |  \- |

**Returns:** `Promise`<`T`>

___
<a id="updaterelation"></a>

###  updateRelation

▸ **updateRelation**(primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, data: *`Partial`<[IRelation](../interfaces/_schemes_directus_relation_.irelation.md)>*): `Promise`<[IRelationResponse](../interfaces/_schemes_response_relation_.irelationresponse.md)>

*Defined in [SDK.ts:822](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L822)*

Updates existing relation

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) |  \- |
| data | `Partial`<[IRelation](../interfaces/_schemes_directus_relation_.irelation.md)> |  \- |

**Returns:** `Promise`<[IRelationResponse](../interfaces/_schemes_response_relation_.irelationresponse.md)>

___
<a id="updaterole"></a>

###  updateRole

▸ **updateRole**<`Role`>(primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, body: *`Role`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`Role` & [IRole](../interfaces/_schemes_directus_role_.irole.md)>>

*Defined in [SDK.ts:919](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L919)*

Update a user role

**Type parameters:**

#### Role :  `Partial`<[IRole](../interfaces/_schemes_directus_role_.irole.md)>
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) |  \- |
| body | `Role` |   |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`Role` & [IRole](../interfaces/_schemes_directus_role_.irole.md)>>

___
<a id="updateuser"></a>

###  updateUser

▸ **updateUser**<`User`>(primaryKey: *[PrimaryKeyType](../modules/_types_.md#primarykeytype)*, body: *`User`*): `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`User` & [IUser](../interfaces/_schemes_directus_user_.iuser.md)>>

*Defined in [SDK.ts:1011](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L1011)*

Update a single user based on primaryKey

**Type parameters:**

#### User :  `Partial`<[IUser](../interfaces/_schemes_directus_user_.iuser.md)>
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| primaryKey | [PrimaryKeyType](../modules/_types_.md#primarykeytype) |  \- |
| body | `User` |

**Returns:** `Promise`<[IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)<`User` & [IUser](../interfaces/_schemes_directus_user_.iuser.md)>>

___
<a id="uploadfiles"></a>

###  uploadFiles

▸ **uploadFiles**<`T`>(data: *`object`*, onUploadProgress?: *`function`*): `Promise`<`T`>

*Defined in [SDK.ts:508](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/SDK.ts#L508)*

Upload multipart files in multipart/form-data

**Type parameters:**

#### T :  `any`
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | `object` | - |
| `Default value` onUploadProgress | `function` |  () &#x3D;&gt; ({}) |

**Returns:** `Promise`<`T`>

___

