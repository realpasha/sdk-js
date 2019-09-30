> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/User"](../modules/_schemes_response_user_.md) / [IUserResponse](_schemes_response_user_.iuserresponse.md) /

# Interface: IUserResponse <**User, MetaDataType**>

**`see`** https://docs.directus.io/api/reference.html#users

## Type parameters

▪ **User**: *[IUser](_schemes_directus_user_.iuser.md)*

▪ **MetaDataType**: *object*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`User`*›

  * **IUserResponse**

### Index

#### Properties

* [data](_schemes_response_user_.iuserresponse.md#data)
* [error](_schemes_response_user_.iuserresponse.md#optional-error)
* [meta](_schemes_response_user_.iuserresponse.md#meta)

## Properties

###  data

• **data**: *`User`*

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