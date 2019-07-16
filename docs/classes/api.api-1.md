> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / [API](../modules/api.md) / [API](api.api-1.md) /

# Class: API

API definition for HTTP transactions

**`uses`** Authentication

**`uses`** axios

**`author`** Jan Biasi <biasijan@gmail.com>

## Hierarchy

* **API**

## Implements

* [IAPI](../interfaces/api.iapi.md)

### Index

#### Constructors

* [constructor](api.api-1.md#constructor)

#### Properties

* [auth](api.api-1.md#auth)
* [concurrent](api.api-1.md#concurrent)
* [config](api.api-1.md#private-config)
* [xhr](api.api-1.md#xhr)

#### Methods

* [delete](api.api-1.md#delete)
* [get](api.api-1.md#get)
* [getPayload](api.api-1.md#getpayload)
* [patch](api.api-1.md#patch)
* [post](api.api-1.md#post)
* [put](api.api-1.md#put)
* [request](api.api-1.md#request)
* [reset](api.api-1.md#reset)

## Constructors

###  constructor

\+ **new API**(`config`: [IConfiguration](../interfaces/configuration.iconfiguration.md)): *[API](api.api-1.md)*

*Defined in [API.ts:54](https://github.com/direcuts/sdk-js/tree/master/API.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [IConfiguration](../interfaces/configuration.iconfiguration.md) |

**Returns:** *[API](api.api-1.md)*

## Properties

###  auth

• **auth**: *[IAuthentication](../interfaces/authentication.iauthentication.md)*

*Implementation of [IAPI](../interfaces/api.iapi.md).[auth](../interfaces/api.iapi.md#auth)*

*Defined in [API.ts:49](https://github.com/direcuts/sdk-js/tree/master/API.ts#L49)*

___

###  concurrent

• **concurrent**: *object* =  concurrencyManager(this.xhr, 10)

*Implementation of [IAPI](../interfaces/api.iapi.md).[concurrent](../interfaces/api.iapi.md#concurrent)*

*Defined in [API.ts:54](https://github.com/direcuts/sdk-js/tree/master/API.ts#L54)*

#### Type declaration:

* **limit**: *number*

* **queue**: *[IConcurrencyQueueItem](../interfaces/concurrencymanager.iconcurrencyqueueitem.md)[]* =  [] as IConcurrencyQueueItem[]

* **running**: *[IConcurrencyQueueItem](../interfaces/concurrencymanager.iconcurrencyqueueitem.md)[]* =  [] as IConcurrencyQueueItem[]

* **attach**(`limitConcurrentRequestsTo?`: number): *void*

* **detach**(): *void*

* **push**(`reqHandler`: [IConcurrencyQueueItem](../interfaces/concurrencymanager.iconcurrencyqueueitem.md)): *void*

* **requestHandler**(`req`: `AxiosRequestConfig`): *`Promise<AxiosRequestConfig>`*

* **responseHandler**(`res`: `AxiosResponse<any>`): *`AxiosResponse<any>`*

* **shift**(): *void*

* **shiftInitial**(): *void*

* ### **interceptors**: *object*

  * **request**: *null* =  null

  * **response**: *null* =  null

___

### `Private` config

• **config**: *[IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [API.ts:56](https://github.com/direcuts/sdk-js/tree/master/API.ts#L56)*

___

###  xhr

• **xhr**: *`AxiosInstance`* =  axios.create({
    paramsSerializer: qsStringify,
    timeout: 10 * 60 * 1000, // 10 min
  })

*Implementation of [IAPI](../interfaces/api.iapi.md).[xhr](../interfaces/api.iapi.md#xhr)*

*Defined in [API.ts:50](https://github.com/direcuts/sdk-js/tree/master/API.ts#L50)*

## Methods

###  delete

▸ **delete**<**T**>(`endpoint`: string): *`Promise<T>`*

*Implementation of [IAPI](../interfaces/api.iapi.md)*

*Defined in [API.ts:125](https://github.com/direcuts/sdk-js/tree/master/API.ts#L125)*

DELETE convenience method. Calls the request method for you

**Type parameters:**

▪ **T**: *any*

response type

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | string |

**Returns:** *`Promise<T>`*

___

###  get

▸ **get**<**T**>(`endpoint`: string, `params`: object): *`Promise<T>`*

*Implementation of [IAPI](../interfaces/api.iapi.md)*

*Defined in [API.ts:77](https://github.com/direcuts/sdk-js/tree/master/API.ts#L77)*

GET convenience method. Calls the request method for you

**Type parameters:**

▪ **T**: *any*

response type

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`endpoint` | string | - |
`params` | object |  {} |

**Returns:** *`Promise<T>`*

___

###  getPayload

▸ **getPayload**<**T**>(): *`T`*

*Implementation of [IAPI](../interfaces/api.iapi.md)*

*Defined in [API.ts:136](https://github.com/direcuts/sdk-js/tree/master/API.ts#L136)*

Gets the payload of the current token, return type can be generic

**Type parameters:**

▪ **T**: *object*

extends object, payload type

**Returns:** *`T`*

___

###  patch

▸ **patch**<**T**>(`endpoint`: string, `body`: [BodyType](../modules/_schemes_http_body_.md#bodytype), `params`: object): *`Promise<T>`*

*Implementation of [IAPI](../interfaces/api.iapi.md)*

*Defined in [API.ts:101](https://github.com/direcuts/sdk-js/tree/master/API.ts#L101)*

PATCH convenience method. Calls the request method for you

**Type parameters:**

▪ **T**: *any*

response type

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`endpoint` | string | - |
`body` | [BodyType](../modules/_schemes_http_body_.md#bodytype) |  {} |
`params` | object |  {} |

**Returns:** *`Promise<T>`*

___

###  post

▸ **post**<**T**>(`endpoint`: string, `body`: [BodyType](../modules/_schemes_http_body_.md#bodytype), `params`: object): *`Promise<T>`*

*Implementation of [IAPI](../interfaces/api.iapi.md)*

*Defined in [API.ts:89](https://github.com/direcuts/sdk-js/tree/master/API.ts#L89)*

POST convenience method. Calls the request method for you

**Type parameters:**

▪ **T**: *any*

response type

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`endpoint` | string | - |
`body` | [BodyType](../modules/_schemes_http_body_.md#bodytype) |  {} |
`params` | object |  {} |

**Returns:** *`Promise<T>`*

___

###  put

▸ **put**<**T**>(`endpoint`: string, `body`: [BodyType](../modules/_schemes_http_body_.md#bodytype), `params`: object): *`Promise<T>`*

*Implementation of [IAPI](../interfaces/api.iapi.md)*

*Defined in [API.ts:113](https://github.com/direcuts/sdk-js/tree/master/API.ts#L113)*

PUT convenience method. Calls the request method for you

**Type parameters:**

▪ **T**: *any*

response type

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`endpoint` | string | - |
`body` | [BodyType](../modules/_schemes_http_body_.md#bodytype) |  {} |
`params` | object |  {} |

**Returns:** *`Promise<T>`*

___

###  request

▸ **request**<**T**>(`method`: [RequestMethod](../modules/_schemes_http_request_.md#requestmethod), `endpoint`: string, `params`: object, `data`: object, `noEnv`: boolean, `headers`: object, `skipParseToJSON`: boolean): *`Promise<T>`*

*Defined in [API.ts:156](https://github.com/direcuts/sdk-js/tree/master/API.ts#L156)*

Perform an API request to the Directus API

**Type parameters:**

▪ **T**: *any*

Response type definition, defaults to `any`

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`method` | [RequestMethod](../modules/_schemes_http_request_.md#requestmethod) | - | Selected HTTP method |
`endpoint` | string | - | Endpoint definition as path |
`params` | object |  {} | Query parameters |
`data` | object |  {} | Data passed to directus |
`noEnv` | boolean | false | Do not include the `env` in the url (for system calls) |
`headers` | object |  {} | Optional headers to include |
`skipParseToJSON` | boolean | false | Whether to skip `JSON.parse` or not |

**Returns:** *`Promise<T>`*

___

###  reset

▸ **reset**(): *void*

*Implementation of [IAPI](../interfaces/api.iapi.md)*

*Defined in [API.ts:65](https://github.com/direcuts/sdk-js/tree/master/API.ts#L65)*

Resets the client instance by logging out and removing the URL and project

**Returns:** *void*