[@directus/sdk-js](../README.md) > ["schemes/response/Revision"](../modules/_schemes_response_revision_.md) > [IRevisionResponse](../interfaces/_schemes_response_revision_.irevisionresponse.md)

# Interface: IRevisionResponse

*__see__*: [https://docs.directus.io/api/reference.html#revisions](https://docs.directus.io/api/reference.html#revisions)

## Type parameters
#### T 
#### MetaDataType :  `object`
## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<`Array`<[IRevision](_schemes_directus_revision_.irevision.md)<`T`>>>

**↳ IRevisionResponse**

## Index

### Properties

* [data](_schemes_response_revision_.irevisionresponse.md#data)
* [error](_schemes_response_revision_.irevisionresponse.md#error)
* [meta](_schemes_response_revision_.irevisionresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *`Array`<[IRevision](_schemes_directus_revision_.irevision.md)<`T`>>*

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

