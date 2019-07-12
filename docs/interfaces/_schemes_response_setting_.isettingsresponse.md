[@directus/sdk-js](../README.md) > ["schemes/response/Setting"](../modules/_schemes_response_setting_.md) > [ISettingsResponse](../interfaces/_schemes_response_setting_.isettingsresponse.md)

# Interface: ISettingsResponse

*__see__*: [https://docs.directus.io/api/reference.html#settings](https://docs.directus.io/api/reference.html#settings)

## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<[ISetting](_schemes_directus_setting_.isetting.md)[], [IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)>

**↳ ISettingsResponse**

## Index

### Properties

* [data](_schemes_response_setting_.isettingsresponse.md#data)
* [error](_schemes_response_setting_.isettingsresponse.md#error)
* [meta](_schemes_response_setting_.isettingsresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *[ISetting](_schemes_directus_setting_.isetting.md)[]*

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

