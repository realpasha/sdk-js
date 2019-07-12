> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/CollectionPreset"](../modules/_schemes_response_collectionpreset_.md) / [ICollectionPresetResponse](_schemes_response_collectionpreset_.icollectionpresetresponse.md) /

# Interface: ICollectionPresetResponse <**CollectionPreset, MetaDataType**>

**`see`** https://docs.directus.io/api/reference.html#collection-presets

## Type parameters

▪ **CollectionPreset**: *[ICollectionPreset](_schemes_directus_collectionpreset_.icollectionpreset.md)*

▪ **MetaDataType**: *object*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`CollectionPreset`*›

  * **ICollectionPresetResponse**

### Index

#### Properties

* [data](_schemes_response_collectionpreset_.icollectionpresetresponse.md#data)
* [error](_schemes_response_collectionpreset_.icollectionpresetresponse.md#optional-error)
* [meta](_schemes_response_collectionpreset_.icollectionpresetresponse.md#meta)

## Properties

###  data

• **data**: *`CollectionPreset`*

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