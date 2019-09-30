> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["utils/qs"](_utils_qs_.md) /

# External module: "utils/qs"

### Index

#### Type aliases

* [QuerifySerializer](_utils_qs_.md#querifyserializer)

#### Functions

* [defaultSerializeTransform](_utils_qs_.md#const-defaultserializetransform)
* [querify](_utils_qs_.md#querify)

## Type aliases

###  QuerifySerializer

Ƭ **QuerifySerializer**: *function*

*Defined in [utils/qs.ts:1](https://github.com/direcuts/sdk-js/tree/master/utils/qs.ts#L1)*

#### Type declaration:

▸ (`key`: string, `value`: string | number | boolean | undefined | null): *string*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | string \| number \| boolean \| undefined \| null |

## Functions

### `Const` defaultSerializeTransform

▸ **defaultSerializeTransform**(`key`: string, `value`: string | number | false | true): *string*

*Defined in [utils/qs.ts:3](https://github.com/direcuts/sdk-js/tree/master/utils/qs.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | string \| number \| false \| true |

**Returns:** *string*

___

###  querify

▸ **querify**(`obj`: object, `prefix?`: string, `serializer`: [QuerifySerializer](_utils_qs_.md#querifyserializer)): *string*

*Defined in [utils/qs.ts:5](https://github.com/direcuts/sdk-js/tree/master/utils/qs.ts#L5)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`obj` | object | - |
`prefix?` | string | - |
`serializer` | [QuerifySerializer](_utils_qs_.md#querifyserializer) |  defaultSerializeTransform |

**Returns:** *string*