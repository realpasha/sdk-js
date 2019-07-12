> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/Collection"](../modules/_schemes_response_collection_.md) / [ICollectionResponse](_schemes_response_collection_.icollectionresponse.md) /

# Interface: ICollectionResponse <**MetaDataType**>

**`see`** https://docs.directus.io/api/reference.html#collections

## Type parameters

▪ **MetaDataType**: *object*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*[ICollectionDataSet](_schemes_response_collection_.icollectiondataset.md)*›

  * **ICollectionResponse**

### Index

#### Properties

* [data](_schemes_response_collection_.icollectionresponse.md#data)
* [error](_schemes_response_collection_.icollectionresponse.md#optional-error)
* [meta](_schemes_response_collection_.icollectionresponse.md#meta)

## Properties

###  data

• **data**: *[ICollectionDataSet](_schemes_response_collection_.icollectiondataset.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/janbiasi/sdk-js/blob/b445ae7/src/schemes/APIResponse.ts#L13)*

___

### `Optional` error

• **error**? : *object*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#optional-error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/janbiasi/sdk-js/blob/b445ae7/src/schemes/APIResponse.ts#L2)*

#### Type declaration:

* **code**: *number*

* **message**: *string*

___

###  meta

• **meta**: *`MetaDataType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/b445ae7/src/schemes/APIResponse.ts#L12)*