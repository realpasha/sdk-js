> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / [utils](utils.md) /

# External module: utils

### Index

#### Variables

* [DIRECTUS_COLLECTION_PREFIX](utils.md#const-directus_collection_prefix)

#### Functions

* [getCollectionItemPath](utils.md#getcollectionitempath)
* [getPayload](utils.md#getpayload)
* [invariant](utils.md#const-invariant)
* [isArray](utils.md#const-isarray)
* [isArrayOrEmpty](utils.md#const-isarrayorempty)
* [isFunction](utils.md#const-isfunction)
* [isNotNull](utils.md#const-isnotnull)
* [isNumber](utils.md#const-isnumber)
* [isObject](utils.md#const-isobject)
* [isObjectOrEmpty](utils.md#const-isobjectorempty)
* [isString](utils.md#const-isstring)
* [isType](utils.md#const-istype)

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

___

###  getPayload

▸ **getPayload**<**T**>(`token`: string): *`T`*

*Defined in [utils/payload.ts:14](https://github.com/direcuts/sdk-js/tree/master/utils/payload.ts#L14)*

Retrieves the payload from a JWT

**Type parameters:**

▪ **T**: *object*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | string | The JWT to retrieve the payload from |

**Returns:** *`T`*

The JWT payload

___

### `Const` invariant

▸ **invariant**(`condition`: boolean | null | undefined, `message`: string): *void*

*Defined in [utils/invariant.ts:11](https://github.com/direcuts/sdk-js/tree/master/utils/invariant.ts#L11)*

Checks invariant violation against a condition, will throw an error if not fulfilled

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`condition` | boolean \| null \| undefined | - |
`message` | string |   |

**Returns:** *void*

___

### `Const` isArray

▸ **isArray**(`v`: any): *boolean*

*Defined in [utils/is.ts:36](https://github.com/direcuts/sdk-js/tree/master/utils/is.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Const` isArrayOrEmpty

▸ **isArrayOrEmpty**(`v`: any): *boolean*

*Defined in [utils/is.ts:32](https://github.com/direcuts/sdk-js/tree/master/utils/is.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Const` isFunction

▸ **isFunction**(`v`: any): *boolean*

*Defined in [utils/is.ts:24](https://github.com/direcuts/sdk-js/tree/master/utils/is.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Const` isNotNull

▸ **isNotNull**(`v`: any): *boolean*

*Defined in [utils/is.ts:12](https://github.com/direcuts/sdk-js/tree/master/utils/is.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Const` isNumber

▸ **isNumber**(`v`: any): *boolean*

*Defined in [utils/is.ts:20](https://github.com/direcuts/sdk-js/tree/master/utils/is.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Const` isObject

▸ **isObject**(`v`: any): *boolean*

*Defined in [utils/is.ts:40](https://github.com/direcuts/sdk-js/tree/master/utils/is.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Const` isObjectOrEmpty

▸ **isObjectOrEmpty**(`v`: any): *boolean*

*Defined in [utils/is.ts:28](https://github.com/direcuts/sdk-js/tree/master/utils/is.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Const` isString

▸ **isString**(`v`: any): *boolean*

*Defined in [utils/is.ts:16](https://github.com/direcuts/sdk-js/tree/master/utils/is.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

**Returns:** *boolean*

___

### `Const` isType

▸ **isType**(`t`: string, `v`: any): *boolean*

*Defined in [utils/is.ts:8](https://github.com/direcuts/sdk-js/tree/master/utils/is.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | string |
`v` | any |

**Returns:** *boolean*