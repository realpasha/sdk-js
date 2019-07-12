[@directus/sdk-js](../README.md) > ["schemes/response/Relation"](../modules/_schemes_response_relation_.md) > [IRelationsResponse](../interfaces/_schemes_response_relation_.irelationsresponse.md)

# Interface: IRelationsResponse

*__see__*: [https://docs.directus.io/api/reference.html#relations](https://docs.directus.io/api/reference.html#relations)

## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<[IRelation](_schemes_directus_relation_.irelation.md)[], [IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)>

**↳ IRelationsResponse**

## Index

### Properties

* [data](_schemes_response_relation_.irelationsresponse.md#data)
* [error](_schemes_response_relation_.irelationsresponse.md#error)
* [meta](_schemes_response_relation_.irelationsresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *[IRelation](_schemes_directus_relation_.irelation.md)[]*

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

**● meta**: *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/schemes/APIResponse.ts#L12)*

___

