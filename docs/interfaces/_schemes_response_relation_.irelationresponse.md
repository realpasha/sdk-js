> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/Relation"](../modules/_schemes_response_relation_.md) / [IRelationResponse](_schemes_response_relation_.irelationresponse.md) /

# Interface: IRelationResponse <**MetaDataType**>

**`see`** https://docs.directus.io/api/reference.html#relations

## Type parameters

▪ **MetaDataType**: *object*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*[IRelation](_schemes_directus_relation_.irelation.md)*›

  * **IRelationResponse**

### Index

#### Properties

* [data](_schemes_response_relation_.irelationresponse.md#data)
* [error](_schemes_response_relation_.irelationresponse.md#optional-error)
* [meta](_schemes_response_relation_.irelationresponse.md#meta)

## Properties

###  data

• **data**: *[IRelation](_schemes_directus_relation_.irelation.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/schemes/APIResponse.ts#L13)*

___

### `Optional` error

• **error**? : *object*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#optional-error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/schemes/APIResponse.ts#L2)*

#### Type declaration:

* **code**: *number*

* **message**: *string*

___

###  meta

• **meta**: *`MetaDataType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/schemes/APIResponse.ts#L12)*