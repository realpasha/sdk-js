[@directus/sdk-js](../README.md) > ["schemes/response/Collection"](../modules/_schemes_response_collection_.md) > [ICollectionsResponse](../interfaces/_schemes_response_collection_.icollectionsresponse.md)

# Interface: ICollectionsResponse

*__see__*: [https://docs.directus.io/api/reference.html#collections](https://docs.directus.io/api/reference.html#collections)

## Type parameters
#### MetaDataType :  `object`
## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<[ICollectionDataSet](_schemes_response_collection_.icollectiondataset.md)[]>

**↳ ICollectionsResponse**

## Index

### Properties

* [data](_schemes_response_collection_.icollectionsresponse.md#data)
* [error](_schemes_response_collection_.icollectionsresponse.md#error)
* [meta](_schemes_response_collection_.icollectionsresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *[ICollectionDataSet](_schemes_response_collection_.icollectiondataset.md)[]*

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

**● meta**: *`MetaDataType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/schemes/APIResponse.ts#L12)*

___

