> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/Item"](../modules/_schemes_response_item_.md) / [IItemResponse](_schemes_response_item_.iitemresponse.md) /

# Interface: IItemResponse <**ItemType, MetaDataType**>

**`see`** https://docs.directus.io/api/reference.html#items

## Type parameters

▪ **ItemType**: *`__type`*

▪ **MetaDataType**: *object*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`ItemType`*›

  * **IItemResponse**

### Index

#### Properties

* [data](_schemes_response_item_.iitemresponse.md#data)
* [error](_schemes_response_item_.iitemresponse.md#optional-error)
* [meta](_schemes_response_item_.iitemresponse.md#meta)

## Properties

###  data

• **data**: *`ItemType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/janbiasi/sdk-js/blob/75383ea/src/schemes/APIResponse.ts#L13)*

___

### `Optional` error

• **error**? : *object*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#optional-error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/janbiasi/sdk-js/blob/75383ea/src/schemes/APIResponse.ts#L2)*

#### Type declaration:

* **code**: *number*

* **message**: *string*

___

###  meta

• **meta**: *`MetaDataType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/75383ea/src/schemes/APIResponse.ts#L12)*