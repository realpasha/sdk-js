[@directus/sdk-js](../README.md) > ["schemes/response/File"](../modules/_schemes_response_file_.md) > [IFileResponse](../interfaces/_schemes_response_file_.ifileresponse.md)

# Interface: IFileResponse

*__see__*: [https://docs.directus.io/api/reference.html#file-object](https://docs.directus.io/api/reference.html#file-object)

## Type parameters
#### T :  [IFile](_schemes_directus_file_.ifile.md)
#### MetaDataType :  `object`
## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<`T`>

**↳ IFileResponse**

## Index

### Properties

* [data](_schemes_response_file_.ifileresponse.md#data)
* [error](_schemes_response_file_.ifileresponse.md#error)
* [meta](_schemes_response_file_.ifileresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *`T`*

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

