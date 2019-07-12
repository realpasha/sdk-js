> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/response/Activity"](../modules/_schemes_response_activity_.md) / [IActivityResponse](_schemes_response_activity_.iactivityresponse.md) /

# Interface: IActivityResponse

**`see`** https://docs.directus.io/api/reference.html#activity

## Hierarchy

  * [IAPIResponse](_schemes_apiresponse_.iapiresponse.md)‹*[IActivity](_schemes_directus_activity_.iactivity.md)[]*, *[IAPIMetaList](_schemes_apiresponse_.iapimetalist.md)*›

  * **IActivityResponse**

### Index

#### Properties

* [data](_schemes_response_activity_.iactivityresponse.md#data)
* [error](_schemes_response_activity_.iactivityresponse.md#optional-error)
* [meta](_schemes_response_activity_.iactivityresponse.md#meta)

## Properties

###  data

• **data**: *[IActivity](_schemes_directus_activity_.iactivity.md)[]*

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