[@directus/sdk-js](../README.md) > ["schemes/response/CollectionPreset"](../modules/_schemes_response_collectionpreset_.md) > [ICollectionPresetsResponse](../interfaces/_schemes_response_collectionpreset_.icollectionpresetsresponse.md)

# Interface: ICollectionPresetsResponse

*__see__*: [https://docs.directus.io/api/reference.html#collection-presets](https://docs.directus.io/api/reference.html#collection-presets)

## Type parameters
#### CollectionPresets :  [ICollectionPreset](_schemes_directus_collectionpreset_.icollectionpreset.md)[]
## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<`CollectionPresets`, [IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)>

**↳ ICollectionPresetsResponse**

## Index

### Properties

* [data](_schemes_response_collectionpreset_.icollectionpresetsresponse.md#data)
* [error](_schemes_response_collectionpreset_.icollectionpresetsresponse.md#error)
* [meta](_schemes_response_collectionpreset_.icollectionpresetsresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *`CollectionPresets`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/schemes/APIResponse.ts#L13)*

___
<a id="error"></a>

### `<Optional>` error

**● error**: *`object`*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/schemes/APIResponse.ts#L2)*

#### Type declaration

 code: `number`

*__see__*: [https://docs.directus.io/api/reference.html#error-codes](https://docs.directus.io/api/reference.html#error-codes)

 message: `string`

___
<a id="meta"></a>

###  meta

**● meta**: *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/schemes/APIResponse.ts#L12)*

___

