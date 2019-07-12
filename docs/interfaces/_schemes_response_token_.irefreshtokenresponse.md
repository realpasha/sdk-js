> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/Token"](../modules/_schemes_response_token_.md) / [IRefreshTokenResponse](_schemes_response_token_.irefreshtokenresponse.md) /

# Interface: IRefreshTokenResponse <**MetaDataType**>

## Type parameters

▪ **MetaDataType**: *object*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*object*›

  * **IRefreshTokenResponse**

### Index

#### Properties

* [data](_schemes_response_token_.irefreshtokenresponse.md#data)
* [error](_schemes_response_token_.irefreshtokenresponse.md#optional-error)
* [meta](_schemes_response_token_.irefreshtokenresponse.md#meta)

## Properties

###  data

• **data**: *object*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/janbiasi/sdk-js/blob/b445ae7/src/schemes/APIResponse.ts#L13)*

#### Type declaration:

* **token**: *string*

___

### `Optional` error

• **error**? : *object*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#optional-error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/janbiasi/sdk-js/blob/b445ae7/src/schemes/APIResponse.ts#L2)*

#### Type declaration:

* **code**: *number*

* **message**: *string*

___

###  meta

• **meta**: *`MetaDataType`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/b445ae7/src/schemes/APIResponse.ts#L12)*