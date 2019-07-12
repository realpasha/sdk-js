[@directus/sdk-js](../README.md) > ["schemes/response/CollectionPreset"](../modules/_schemes_response_collectionpreset_.md) > [ICollectionPresetResponse](../interfaces/_schemes_response_collectionpreset_.icollectionpresetresponse.md)

# Interface: ICollectionPresetResponse

*__see__*: [https://docs.directus.io/api/reference.html#collection-presets](https://docs.directus.io/api/reference.html#collection-presets)

## Type parameters
#### CollectionPreset :  [ICollectionPreset](_schemes_directus_collectionpreset_.icollectionpreset.md)
#### MetaDataType :  `object`
## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<`CollectionPreset`>

**↳ ICollectionPresetResponse**

## Index

### Properties

* [data](_schemes_response_collectionpreset_.icollectionpresetresponse.md#data)
* [error](_schemes_response_collectionpreset_.icollectionpresetresponse.md#error)
* [meta](_schemes_response_collectionpreset_.icollectionpresetresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *`CollectionPreset`*

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

