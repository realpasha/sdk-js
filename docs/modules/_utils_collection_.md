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

*Defined in [utils/collection.ts:5](https://github.com/direcuts/sdk-js/tree/master/utils/collection.ts#L5)*

## Functions

###  getCollectionItemPath

▸ **getCollectionItemPath**(`collection`: string): *string*

*Defined in [utils/collection.ts:22](https://github.com/direcuts/sdk-js/tree/master/utils/collection.ts#L22)*

Returns the correct API path for the collection. It will
strip the prefix {@link DIRECTUS_COLLECTION_PREFIX | collection-prefix} or will add the
'/items/' path as prefix if not provided. The 'substr(9)' defines
the length of the defined {@link DIRECTUS_COLLECTION_PREFIX | collection-prefix}.

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