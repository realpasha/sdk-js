> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/Revision"](../modules/_schemes_response_revision_.md) / [IRevisionResponse](_schemes_response_revision_.irevisionresponse.md) /

# Interface: IRevisionResponse <**T, MetaDataType**>

**`see`** https://docs.directus.io/api/reference.html#revisions

## Type parameters

▪ **T**

▪ **MetaDataType**: *object*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`Array<IRevision<T>>`*›

  * **IRevisionResponse**

### Index

#### Properties

* [data](_schemes_response_revision_.irevisionresponse.md#data)
* [error](_schemes_response_revision_.irevisionresponse.md#optional-error)
* [meta](_schemes_response_revision_.irevisionresponse.md#meta)

## Properties

###  data

• **data**: *`Array<IRevision<T>>`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/direcuts/sdk-js/tree/master/schemes/APIResponse.ts#L13)*

___

### `Optional` error

• **error**? : *object*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#optional-error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/direcuts/sdk-js/tree/master/schemes/APIResponse.ts#L2)*

#### Type declaration:

* **code**: *number*

* **message**: *string*

___

###  meta

• **meta**: *`MetaDataType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/direcuts/sdk-js/tree/master/schemes/APIResponse.ts#L12)*