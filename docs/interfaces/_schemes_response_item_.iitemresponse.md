[@directus/sdk-js](../README.md) > ["schemes/response/Item"](../modules/_schemes_response_item_.md) > [IItemResponse](../interfaces/_schemes_response_item_.iitemresponse.md)

# Interface: IItemResponse

*__see__*: [https://docs.directus.io/api/reference.html#items](https://docs.directus.io/api/reference.html#items)

## Type parameters
#### ItemType :  `__type`
#### MetaDataType :  `object`
## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<`ItemType`>

**↳ IItemResponse**

## Index

### Properties

* [data](_schemes_response_item_.iitemresponse.md#data)
* [error](_schemes_response_item_.iitemresponse.md#error)
* [meta](_schemes_response_item_.iitemresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *`ItemType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/schemes/APIResponse.ts#L13)*

___
<a id="error"></a>

### `<Optional>` error

**● error**: *`object`*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/schemes/APIResponse.ts#L2)*

#### Type declaration

 code: `number`

*__see__*: [https://docs.directus.io/api/reference.html#error-codes](https://docs.directus.io/api/reference.html#error-codes)

 message: `string`

___
<a id="meta"></a>

###  meta

**● meta**: *`MetaDataType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/schemes/APIResponse.ts#L12)*

___

