> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/Role"](../modules/_schemes_response_role_.md) / [IRoleResponse](_schemes_response_role_.iroleresponse.md) /

# Interface: IRoleResponse <**MetaDataType**>

**`see`** https://docs.directus.io/api/reference.html#roles

## Type parameters

▪ **MetaDataType**: *object*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*[IRole](_schemes_directus_role_.irole.md)[]*›

  * **IRoleResponse**

### Index

#### Properties

* [data](_schemes_response_role_.iroleresponse.md#data)
* [error](_schemes_response_role_.iroleresponse.md#optional-error)
* [meta](_schemes_response_role_.iroleresponse.md#meta)

## Properties

###  data

• **data**: *[IRole](_schemes_directus_role_.irole.md)[]*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/direcuts/sdk-js/tree/master/schemes/APIResponse.ts#L13)*

___

### `Optional` error

• **error**? : *object*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#optional-error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/direcuts/sdk-js/tree/master/schemes/APIResponse.ts#L2)*

#### Type declaration:

* **code**: *number*

* **message**: *string*

___

###  meta

• **meta**: *`MetaDataType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/direcuts/sdk-js/tree/master/schemes/APIResponse.ts#L12)*