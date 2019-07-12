> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["utils/collection"](_utils_collection_.md) /

# External module: "utils/collection"

### Index

#### Variables

* [DIRECTUS_COLLECTION_PREFIX](_utils_collection_.md#const-directus_collection_prefix)

#### Functions

* [getCollectionItemPath](_utils_collection_.md#getcollectionitempath)

## Variables

### `Const` DIRECTUS_COLLECTION_PREFIX

• **DIRECTUS_COLLECTION_PREFIX**: *"directus_"* = "directus_"

*Defined in [utils/collection.ts:1](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/utils/collection.ts#L1)*

## Functions

###  getCollectionItemPath

▸ **getCollectionItemPath**(`collection`: string): *string*

*Defined in [utils/collection.ts:18](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/utils/collection.ts#L18)*

Returns the correct API path for the collection. It will
strip the prefix @{DIRECTUS_COLLECTION_PREFIX} or will add the
'/items/' path as prefix if not provided. The 'substr(9)' defines
the length of the defined @{DIRECTUS_COLLECTION_PREFIX}.

**`example`** 
getCollectionItemPath('directus_users');
// => '/users'
getCollectionItemPath('users');
// => '/items/users'

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`collection` | string | The name of the collection |

**Returns:** *string*