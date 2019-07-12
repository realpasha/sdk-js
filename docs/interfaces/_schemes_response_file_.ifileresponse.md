> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/File"](../modules/_schemes_response_file_.md) / [IFileResponse](_schemes_response_file_.ifileresponse.md) /

# Interface: IFileResponse <**T, MetaDataType**>

**`see`** https://docs.directus.io/api/reference.html#file-object

## Type parameters

▪ **T**: *[IFile](_schemes_directus_file_.ifile.md)*

▪ **MetaDataType**: *object*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`T`*›

  * **IFileResponse**

### Index

#### Properties

* [data](_schemes_response_file_.ifileresponse.md#data)
* [error](_schemes_response_file_.ifileresponse.md#optional-error)
* [meta](_schemes_response_file_.ifileresponse.md#meta)

## Properties

###  data

• **data**: *`T`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/schemes/APIResponse.ts#L13)*

___

### `Optional` error

• **error**? : *object*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#optional-error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/schemes/APIResponse.ts#L2)*

#### Type declaration:

* **code**: *number*

* **message**: *string*

___

###  meta

• **meta**: *`MetaDataType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/schemes/APIResponse.ts#L12)*