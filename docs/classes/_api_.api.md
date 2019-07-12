[@directus/sdk-js](../README.md) > ["API"](../modules/_api_.md) > [API](../classes/_api_.api.md)

# Class: API

API definition for HTTP transactions

*__uses__*: Authentication

*__uses__*: axios

## Hierarchy

**API**

## Implements

* [IAPI](../interfaces/_api_.iapi.md)

## Index

### Constructors

* [constructor](_api_.api.md#constructor)

### Properties

* [auth](_api_.api.md#auth)
* [concurrent](_api_.api.md#concurrent)
* [config](_api_.api.md#config)
* [xhr](_api_.api.md#xhr)

### Methods

* [delete](_api_.api.md#delete)
* [get](_api_.api.md#get)
* [getPayload](_api_.api.md#getpayload)
* [patch](_api_.api.md#patch)
* [post](_api_.api.md#post)
* [put](_api_.api.md#put)
* [request](_api_.api.md#request-1)
* [reset](_api_.api.md#reset)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new API**(config: *[IConfiguration](../interfaces/_configuration_.iconfiguration.md)*): [API](_api_.api.md)

*Defined in [API.ts:51](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L51)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | [IConfiguration](../interfaces/_configuration_.iconfiguration.md) |

**Returns:** [API](_api_.api.md)

___

## Properties

<a id="auth"></a>

###  auth

**● auth**: *[IAuthentication](../interfaces/_authentication_.iauthentication.md)*

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[auth](../interfaces/_api_.iapi.md#auth)*

*Defined in [API.ts:46](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L46)*

___
<a id="concurrent"></a>

###  concurrent

**● concurrent**: *`object`* =  concurrencyManager(this.xhr, 10)

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[concurrent](../interfaces/_api_.iapi.md#concurrent)*

*Defined in [API.ts:51](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L51)*

#### Type declaration

 limit: `number`

 queue: [IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md)[]

 running: [IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md)[]

 attach : function
▸ **attach**(limitConcurrentRequestsTo?: *`number`*): `void`

*Defined in [ConcurrencyManager.ts:66](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` limitConcurrentRequestsTo | `number` |

**Returns:** `void`

 detach : function
▸ **detach**(): `void`

*Defined in [ConcurrencyManager.ts:62](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L62)*

**Returns:** `void`

 push : function
▸ **push**(reqHandler: *[IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md)*): `void`

*Defined in [ConcurrencyManager.ts:27](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| reqHandler | [IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md) |

**Returns:** `void`

 requestHandler : function
▸ **requestHandler**(req: *`AxiosRequestConfig`*): `Promise`<`AxiosRequestConfig`>

*Defined in [ConcurrencyManager.ts:47](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | `AxiosRequestConfig` |

**Returns:** `Promise`<`AxiosRequestConfig`>

 responseHandler : function
▸ **responseHandler**(res: *`AxiosResponse`<`any`>*): `AxiosResponse`<`any`>

*Defined in [ConcurrencyManager.ts:56](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| res | `AxiosResponse`<`any`> |

**Returns:** `AxiosResponse`<`any`>

 shift : function
▸ **shift**(): `void`

*Defined in [ConcurrencyManager.ts:38](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L38)*

**Returns:** `void`

 shiftInitial : function
▸ **shiftInitial**(): `void`

*Defined in [ConcurrencyManager.ts:31](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L31)*

**Returns:** `void`

 interceptors: `object`

 request: `null`

 response: `null`

___
<a id="config"></a>

### `<Private>` config

**● config**: *[IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [API.ts:53](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L53)*

___
<a id="xhr"></a>

###  xhr

**● xhr**: *`AxiosInstance`* =  axios.create({
    paramsSerializer: qsStringify,
    timeout: 10 * 60 * 1000, // 10 min
  })

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[xhr](../interfaces/_api_.iapi.md#xhr)*

*Defined in [API.ts:47](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L47)*

___

## Methods

<a id="delete"></a>

###  delete

▸ **delete**<`T`>(endpoint: *`string`*): `Promise`<`T`>

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[delete](../interfaces/_api_.iapi.md#delete)*

*Defined in [API.ts:122](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L122)*

DELETE convenience method. Calls the request method for you

**Type parameters:**

#### T :  `any`

response type

**Parameters:**

| Name | Type |
| ------ | ------ |
| endpoint | `string` |

**Returns:** `Promise`<`T`>

___
<a id="get"></a>

###  get

▸ **get**<`T`>(endpoint: *`string`*, params?: *`object`*): `Promise`<`T`>

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[get](../interfaces/_api_.iapi.md#get)*

*Defined in [API.ts:74](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L74)*

GET convenience method. Calls the request method for you

**Type parameters:**

#### T :  `any`

response type

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| endpoint | `string` | - |
| `Default value` params | `object` |  {} |

**Returns:** `Promise`<`T`>

___
<a id="getpayload"></a>

###  getPayload

▸ **getPayload**<`T`>(): `T`

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[getPayload](../interfaces/_api_.iapi.md#getpayload)*

*Defined in [API.ts:133](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L133)*

Gets the payload of the current token, return type can be generic

**Type parameters:**

#### T :  `object`

extends object, payload type

**Returns:** `T`

___
<a id="patch"></a>

###  patch

▸ **patch**<`T`>(endpoint: *`string`*, body?: *[BodyType](../modules/_schemes_http_body_.md#bodytype)*, params?: *`object`*): `Promise`<`T`>

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[patch](../interfaces/_api_.iapi.md#patch)*

*Defined in [API.ts:98](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L98)*

PATCH convenience method. Calls the request method for you

**Type parameters:**

#### T :  `any`

response type

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| endpoint | `string` | - |
| `Default value` body | [BodyType](../modules/_schemes_http_body_.md#bodytype) |  {} |
| `Default value` params | `object` |  {} |

**Returns:** `Promise`<`T`>

___
<a id="post"></a>

###  post

▸ **post**<`T`>(endpoint: *`string`*, body?: *[BodyType](../modules/_schemes_http_body_.md#bodytype)*, params?: *`object`*): `Promise`<`T`>

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[post](../interfaces/_api_.iapi.md#post)*

*Defined in [API.ts:86](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L86)*

POST convenience method. Calls the request method for you

**Type parameters:**

#### T :  `any`

response type

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| endpoint | `string` | - |
| `Default value` body | [BodyType](../modules/_schemes_http_body_.md#bodytype) |  {} |
| `Default value` params | `object` |  {} |

**Returns:** `Promise`<`T`>

___
<a id="put"></a>

###  put

▸ **put**<`T`>(endpoint: *`string`*, body?: *[BodyType](../modules/_schemes_http_body_.md#bodytype)*, params?: *`object`*): `Promise`<`T`>

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[put](../interfaces/_api_.iapi.md#put)*

*Defined in [API.ts:110](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L110)*

PUT convenience method. Calls the request method for you

**Type parameters:**

#### T :  `any`

response type

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| endpoint | `string` | - |
| `Default value` body | [BodyType](../modules/_schemes_http_body_.md#bodytype) |  {} |
| `Default value` params | `object` |  {} |

**Returns:** `Promise`<`T`>

___
<a id="request-1"></a>

###  request

▸ **request**<`T`>(method: *[RequestMethod](../modules/_schemes_http_request_.md#requestmethod)*, endpoint: *`string`*, params?: *`object`*, data?: *`object`*, noEnv?: *`boolean`*, headers?: *`object`*, skipParseToJSON?: *`boolean`*): `Promise`<`T`>

*Defined in [API.ts:153](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L153)*

Perform an API request to the Directus API

**Type parameters:**

#### T :  `any`

Response type definition, defaults to `any`

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| method | [RequestMethod](../modules/_schemes_http_request_.md#requestmethod) | - |  Selected HTTP method |
| endpoint | `string` | - |  Endpoint definition as path |
| `Default value` params | `object` |  {} |  Query parameters |
| `Default value` data | `object` |  {} |  Data passed to directus |
| `Default value` noEnv | `boolean` | false |  Do not include the \`env\` in the url (for system calls) |
| `Default value` headers | `object` |  {} |  Optional headers to include |
| `Default value` skipParseToJSON | `boolean` | false |  Whether to skip \`JSON.parse\` or not |

**Returns:** `Promise`<`T`>

___
<a id="reset"></a>

###  reset

▸ **reset**(): `void`

*Implementation of [IAPI](../interfaces/_api_.iapi.md).[reset](../interfaces/_api_.iapi.md#reset)*

*Defined in [API.ts:62](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/API.ts#L62)*

Resets the client instance by logging out and removing the URL and project

**Returns:** `void`

___

