> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / [API](../modules/api.md) / [IAPI](api.iapi.md) /

# Interface: IAPI

## Hierarchy

* **IAPI**

## Implemented by

* [API](../classes/api.api-1.md)

### Index

#### Properties

* [auth](api.iapi.md#auth)
* [concurrent](api.iapi.md#concurrent)
* [xhr](api.iapi.md#xhr)

#### Methods

* [delete](api.iapi.md#delete)
* [get](api.iapi.md#get)
* [getPayload](api.iapi.md#getpayload)
* [patch](api.iapi.md#patch)
* [post](api.iapi.md#post)
* [put](api.iapi.md#put)
* [request](api.iapi.md#request)
* [reset](api.iapi.md#reset)

## Properties

###  auth

• **auth**: *[IAuthentication](authentication.iauthentication.md)*

*Defined in [API.ts:23](https://github.com/direcuts/sdk-js/tree/master/API.ts#L23)*

___

###  concurrent

• **concurrent**: *`ReturnType<concurrencyManager>`*

*Defined in [API.ts:25](https://github.com/direcuts/sdk-js/tree/master/API.ts#L25)*

___

###  xhr

• **xhr**: *`AxiosInstance`*

*Defined in [API.ts:24](https://github.com/direcuts/sdk-js/tree/master/API.ts#L24)*

## Methods

###  delete

▸ **delete**<**T**>(`endpoint`: string): *`Promise<T>`*

*Defined in [API.ts:31](https://github.com/direcuts/sdk-js/tree/master/API.ts#L31)*

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | string |

**Returns:** *`Promise<T>`*

___

###  get

▸ **get**<**T**>(`endpoint`: string, `params?`: object): *`Promise<T>`*

*Defined in [API.ts:27](https://github.com/direcuts/sdk-js/tree/master/API.ts#L27)*

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | string |
`params?` | object |

**Returns:** *`Promise<T>`*

___

###  getPayload

▸ **getPayload**<**T**>(): *`T`*

*Defined in [API.ts:32](https://github.com/direcuts/sdk-js/tree/master/API.ts#L32)*

**Type parameters:**

▪ **T**: *object*

**Returns:** *`T`*

___

###  patch

▸ **patch**<**T**>(`endpoint`: string, `body?`: [BodyType](../modules/_schemes_http_body_.md#bodytype), `params?`: object): *`Promise<T>`*

*Defined in [API.ts:29](https://github.com/direcuts/sdk-js/tree/master/API.ts#L29)*

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | string |
`body?` | [BodyType](../modules/_schemes_http_body_.md#bodytype) |
`params?` | object |

**Returns:** *`Promise<T>`*

___

###  post

▸ **post**<**T**>(`endpoint`: string, `body?`: [BodyType](../modules/_schemes_http_body_.md#bodytype), `params?`: object): *`Promise<T>`*

*Defined in [API.ts:28](https://github.com/direcuts/sdk-js/tree/master/API.ts#L28)*

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | string |
`body?` | [BodyType](../modules/_schemes_http_body_.md#bodytype) |
`params?` | object |

**Returns:** *`Promise<T>`*

___

###  put

▸ **put**<**T**>(`endpoint`: string, `body?`: [BodyType](../modules/_schemes_http_body_.md#bodytype), `params?`: object): *`Promise<T>`*

*Defined in [API.ts:30](https://github.com/direcuts/sdk-js/tree/master/API.ts#L30)*

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | string |
`body?` | [BodyType](../modules/_schemes_http_body_.md#bodytype) |
`params?` | object |

**Returns:** *`Promise<T>`*

___

###  request

▸ **request**<**T**>(`method`: [RequestMethod](../modules/_schemes_http_request_.md#requestmethod), `endpoint`: string, `params?`: object, `data?`: object, `noEnv?`: boolean, `headers?`: object, `skipParseToJSON?`: boolean): *`Promise<T>`*

*Defined in [API.ts:33](https://github.com/direcuts/sdk-js/tree/master/API.ts#L33)*

**Type parameters:**

▪ **T**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`method` | [RequestMethod](../modules/_schemes_http_request_.md#requestmethod) |
`endpoint` | string |
`params?` | object |
`data?` | object |
`noEnv?` | boolean |
`headers?` | object |
`skipParseToJSON?` | boolean |

**Returns:** *`Promise<T>`*

___

###  reset

▸ **reset**(): *void*

*Defined in [API.ts:26](https://github.com/direcuts/sdk-js/tree/master/API.ts#L26)*

**Returns:** *void*