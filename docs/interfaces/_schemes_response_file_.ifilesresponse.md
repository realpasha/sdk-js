> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/File"](../modules/_schemes_response_file_.md) / [IFilesResponse](_schemes_response_file_.ifilesresponse.md) /

# Interface: IFilesResponse <**T**>

**`see`** https://docs.directus.io/api/reference.html#file-object

## Type parameters

▪ **T**: *[IFile](_schemes_directus_file_.ifile.md)[]*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`T`[]*, *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*›

  * **IFilesResponse**

### Index

#### Properties

* [data](_schemes_response_file_.ifilesresponse.md#data)
* [error](_schemes_response_file_.ifilesresponse.md#optional-error)
* [meta](_schemes_response_file_.ifilesresponse.md#meta)

## Properties

###  data

• **data**: *`T`[]*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/janbiasi/sdk-js/blob/75383ea/src/schemes/APIResponse.ts#L13)*

___

### `Optional` error

• **error**? : *object*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#optional-error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/janbiasi/sdk-js/blob/75383ea/src/schemes/APIResponse.ts#L2)*

#### Type declaration:

* **code**: *number*

* **message**: *string*

___

###  meta

• **meta**: *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/75383ea/src/schemes/APIResponse.ts#L12)*