> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/Field"](../modules/_schemes_response_field_.md) / [IFieldsResponse](_schemes_response_field_.ifieldsresponse.md) /

# Interface: IFieldsResponse <**T**>

**`see`** https://docs.directus.io/api/reference.html#fields-2

## Type parameters

▪ **T**: *[IField](_schemes_directus_field_.ifield.md)[]*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`Array<T & IFieldResponseDataInfo>`*, *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*›

  * **IFieldsResponse**

### Index

#### Properties

* [data](_schemes_response_field_.ifieldsresponse.md#data)
* [error](_schemes_response_field_.ifieldsresponse.md#optional-error)
* [meta](_schemes_response_field_.ifieldsresponse.md#meta)

## Properties

###  data

• **data**: *`Array<T & IFieldResponseDataInfo>`*

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