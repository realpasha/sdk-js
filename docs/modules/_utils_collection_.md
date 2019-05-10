[@directus/sdk-js](../README.md) > ["utils/collection"](../modules/_utils_collection_.md)

# External module: "utils/collection"

## Index

### Variables

* [DIRECTUS_COLLECTION_PREFIX](_utils_collection_.md#directus_collection_prefix)

### Functions

* [getCollectionItemPath](_utils_collection_.md#getcollectionitempath)

---

## Variables

<a id="directus_collection_prefix"></a>

### `<Const>` DIRECTUS_COLLECTION_PREFIX

**● DIRECTUS_COLLECTION_PREFIX**: *"directus_"* = "directus_"

*Defined in [utils/collection.ts:1](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/utils/collection.ts#L1)*

___

## Functions

<a id="getcollectionitempath"></a>

###  getCollectionItemPath

▸ **getCollectionItemPath**(collection: *`string`*): `string`

*Defined in [utils/collection.ts:18](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/utils/collection.ts#L18)*

Returns the correct API path for the collection. It will strip the prefix @{DIRECTUS\_COLLECTION\_PREFIX} or will add the '/items/' path as prefix if not provided. The 'substr(9)' defines the length of the defined @{DIRECTUS\_COLLECTION\_PREFIX}.

*__example__*: getCollectionItemPath('directus\_users'); // => '/users' getCollectionItemPath('users'); // => '/items/users'

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| collection | `string` |  The name of the collection |

**Returns:** `string`

___

