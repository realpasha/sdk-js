[@directus/sdk-js](../README.md) > ["schemes/response/User"](../modules/_schemes_response_user_.md) > [IUsersResponse](../interfaces/_schemes_response_user_.iusersresponse.md)

# Interface: IUsersResponse

*__see__*: [https://docs.directus.io/api/reference.html#users](https://docs.directus.io/api/reference.html#users)

## Type parameters
#### Users :  [IUser](_schemes_directus_user_.iuser.md)[]
## Hierarchy

↳  [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)<`Users`, [IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)>

**↳ IUsersResponse**

## Index

### Properties

* [data](_schemes_response_user_.iusersresponse.md#data)
* [error](_schemes_response_user_.iusersresponse.md#error)
* [meta](_schemes_response_user_.iusersresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *`Users`*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[data](_schemes_apiresponse_.iapiresponse.md#data)*

*Defined in [schemes/APIResponse.ts:13](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/schemes/APIResponse.ts#L13)*

___
<a id="error"></a>

### `<Optional>` error

**● error**: *`object`*

*Inherited from [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md).[error](_schemes_apiresponse_.iabstractapiresponse.md#error)*

*Defined in [schemes/APIResponse.ts:2](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/schemes/APIResponse.ts#L2)*

#### Type declaration

 code: `number`

*__see__*: [https://docs.directus.io/api/reference.html#error-codes](https://docs.directus.io/api/reference.html#error-codes)

 message: `string`

___
<a id="meta"></a>

###  meta

**● meta**: *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*

*Inherited from [IAPIResponse](_schemes_apiresponse_.iapiresponse.md).[meta](_schemes_apiresponse_.iapiresponse.md#meta)*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/schemes/APIResponse.ts#L12)*

___

