> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["API"](../modules/_api_.md) / [APIError](_api_.apierror.md) /

# Class: APIError

## Hierarchy

* `Error`

  * **APIError**

### Index

#### Constructors

* [constructor](_api_.apierror.md#constructor)

#### Properties

* [info](_api_.apierror.md#private-info)
* [message](_api_.apierror.md#message)
* [name](_api_.apierror.md#name)
* [stack](_api_.apierror.md#optional-stack)
* [Error](_api_.apierror.md#static-error)

#### Accessors

* [code](_api_.apierror.md#code)
* [method](_api_.apierror.md#method)
* [params](_api_.apierror.md#params)
* [url](_api_.apierror.md#url)

#### Methods

* [toString](_api_.apierror.md#tostring)

## Constructors

###  constructor

\+ **new APIError**(`message`: string, `info`: object): *[APIError](_api_.apierror.md)*

*Defined in [API.ts:43](https://github.com/direcuts/sdk-js/tree/master/API.ts#L43)*

**Parameters:**

▪ **message**: *string*

▪ **info**: *object*

Name | Type |
------ | ------ |
`code` | number \| string |
`data?` | any |
`error?` | [IErrorResponse](../interfaces/_schemes_response_error_.ierrorresponse.md) |
`method` | string |
`params?` | object |
`url` | string |

**Returns:** *[APIError](_api_.apierror.md)*

## Properties

### `Private` info

• **info**: *object*

*Defined in [API.ts:44](https://github.com/direcuts/sdk-js/tree/master/API.ts#L44)*

#### Type declaration:

* **code**: *number | string*

* **data**? : *any*

* **error**? : *[IErrorResponse](../interfaces/_schemes_response_error_.ierrorresponse.md)*

* **method**: *string*

* **params**? : *object*

* **url**: *string*

___

###  message

• **message**: *string*

*Overrides void*

*Defined in [API.ts:44](https://github.com/direcuts/sdk-js/tree/master/API.ts#L44)*

___

###  name

• **name**: *string*

*Inherited from void*

*Defined in [/Users/rijk/Development/directus/sdk-js/node_modules/typescript/lib/lib.es5.d.ts:973](https://github.com/direcuts/sdk-js/tree/master//Users/rijk/Development/directus/sdk-js/node_modules/typescript/lib/lib.es5.d.ts#L973)*

___

### `Optional` stack

• **stack**? : *string*

*Inherited from void*

*Overrides void*

*Defined in [/Users/rijk/Development/directus/sdk-js/node_modules/typescript/lib/lib.es5.d.ts:975](https://github.com/direcuts/sdk-js/tree/master//Users/rijk/Development/directus/sdk-js/node_modules/typescript/lib/lib.es5.d.ts#L975)*

___

### `Static` Error

▪ **Error**: *`ErrorConstructor`*

*Defined in [/Users/rijk/Development/directus/sdk-js/node_modules/typescript/lib/lib.es5.d.ts:984](https://github.com/direcuts/sdk-js/tree/master//Users/rijk/Development/directus/sdk-js/node_modules/typescript/lib/lib.es5.d.ts#L984)*

## Accessors

###  code

• **get code**(): *string*

*Defined in [API.ts:64](https://github.com/direcuts/sdk-js/tree/master/API.ts#L64)*

**Returns:** *string*

___

###  method

• **get method**(): *string*

*Defined in [API.ts:60](https://github.com/direcuts/sdk-js/tree/master/API.ts#L60)*

**Returns:** *string*

___

###  params

• **get params**(): *object*

*Defined in [API.ts:68](https://github.com/direcuts/sdk-js/tree/master/API.ts#L68)*

**Returns:** *object*

___

###  url

• **get url**(): *string*

*Defined in [API.ts:56](https://github.com/direcuts/sdk-js/tree/master/API.ts#L56)*

**Returns:** *string*

## Methods

###  toString

▸ **toString**(): *string*

*Defined in [API.ts:72](https://github.com/direcuts/sdk-js/tree/master/API.ts#L72)*

**Returns:** *string*