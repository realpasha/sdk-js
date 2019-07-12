[@directus/sdk-js](../README.md) > ["schemes/response/Field"](../modules/_schemes_response_field_.md) > [IFieldResponse](../interfaces/_schemes_response_field_.ifieldresponse.md)

# Interface: IFieldResponse

*__see__*: [https://docs.directus.io/api/reference.html#fields-2](https://docs.directus.io/api/reference.html#fields-2)

## Type parameters
#### T :  [IField](_schemes_directus_field_.ifield.md)
## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<`T` & [IFieldResponseDataInfo](_schemes_response_field_.ifieldresponsedatainfo.md), [IFieldResponseMeta](_schemes_response_field_.ifieldresponsemeta.md)>

**↳ IFieldResponse**

## Index

### Properties

* [data](_schemes_response_field_.ifieldresponse.md#data)
* [error](_schemes_response_field_.ifieldresponse.md#error)
* [meta](_schemes_response_field_.ifieldresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *`T` & [IFieldResponseDataInfo](_schemes_response_field_.ifieldresponsedatainfo.md)*

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

**● meta**: *[IFieldResponseMeta](_schemes_response_field_.ifieldresponsemeta.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/schemes/APIResponse.ts#L12)*

___

