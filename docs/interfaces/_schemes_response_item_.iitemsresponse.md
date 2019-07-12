> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/Item"](../modules/_schemes_response_item_.md) / [IItemsResponse](_schemes_response_item_.iitemsresponse.md) /

# Interface: IItemsResponse <**ItemsType**>

**`see`** https://docs.directus.io/api/reference.html#items

## Type parameters

▪ **ItemsType**: *`Array<__type>`*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`ItemsType`*, *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*›

  * **IItemsResponse**

### Index

#### Properties

* [data](_schemes_response_item_.iitemsresponse.md#data)
* [error](_schemes_response_item_.iitemsresponse.md#optional-error)
* [meta](_schemes_response_item_.iitemsresponse.md#meta)

## Properties

###  data

• **data**: *`ItemsType`*

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

• **meta**: *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/75383ea/src/schemes/APIResponse.ts#L12)*