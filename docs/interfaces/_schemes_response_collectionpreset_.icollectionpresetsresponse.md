> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/CollectionPreset"](../modules/_schemes_response_collectionpreset_.md) / [ICollectionPresetsResponse](_schemes_response_collectionpreset_.icollectionpresetsresponse.md) /

# Interface: ICollectionPresetsResponse <**CollectionPresets**>

**`see`** https://docs.directus.io/api/reference.html#collection-presets

## Type parameters

▪ **CollectionPresets**: *[ICollectionPreset](_schemes_directus_collectionpreset_.icollectionpreset.md)[]*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`CollectionPresets`*, *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*›

  * **ICollectionPresetsResponse**

### Index

#### Properties

* [data](_schemes_response_collectionpreset_.icollectionpresetsresponse.md#data)
* [error](_schemes_response_collectionpreset_.icollectionpresetsresponse.md#optional-error)
* [meta](_schemes_response_collectionpreset_.icollectionpresetsresponse.md#meta)

## Properties

###  data

• **data**: *`CollectionPresets`*

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

• **meta**: *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/b445ae7/src/schemes/APIResponse.ts#L12)*