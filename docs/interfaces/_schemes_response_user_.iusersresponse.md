> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/User"](../modules/_schemes_response_user_.md) / [IUsersResponse](_schemes_response_user_.iusersresponse.md) /

# Interface: IUsersResponse <**Users**>

**`see`** https://docs.directus.io/api/reference.html#users

## Type parameters

▪ **Users**: *[IUser](_schemes_directus_user_.iuser.md)[]*

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*`Users`*, *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*›

  * **IUsersResponse**

### Index

#### Properties

* [data](_schemes_response_user_.iusersresponse.md#data)
* [error](_schemes_response_user_.iusersresponse.md#optional-error)
* [meta](_schemes_response_user_.iusersresponse.md#meta)

## Properties

###  data

• **data**: *`Users`*

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

• **meta**: *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/schemes/APIResponse.ts#L12)*