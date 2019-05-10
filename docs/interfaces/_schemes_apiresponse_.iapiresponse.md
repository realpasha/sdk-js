[@directus/sdk-js](../README.md) > ["schemes/APIResponse"](../modules/_schemes_apiresponse_.md) > [IAPIResponse](../interfaces/_schemes_apiresponse_.iapiresponse.md)

# Interface: IAPIResponse

## Type parameters
#### DataType 
#### MetaDataType :  `object`
## Hierarchy

 [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md)

**↳ IAPIResponse**

↳  [IRefreshTokenResponse](_schemes_response_token_.irefreshtokenresponse.md)

↳  [IActivityResponse](_schemes_response_activity_.iactivityresponse.md)

↳  [ICollectionResponse](_schemes_response_collection_.icollectionresponse.md)

↳  [ICollectionsResponse](_schemes_response_collection_.icollectionsresponse.md)

↳  [IFieldResponse](_schemes_response_field_.ifieldresponse.md)

↳  [IFieldsResponse](_schemes_response_field_.ifieldsresponse.md)

↳  [IRevisionResponse](_schemes_response_revision_.irevisionresponse.md)

↳  [IRoleResponse](_schemes_response_role_.iroleresponse.md)

↳  [IUserResponse](_schemes_response_user_.iuserresponse.md)

↳  [IUsersResponse](_schemes_response_user_.iusersresponse.md)

↳  [IRelationResponse](_schemes_response_relation_.irelationresponse.md)

↳  [IRelationsResponse](_schemes_response_relation_.irelationsresponse.md)

↳  [ISettingResponse](_schemes_response_setting_.isettingresponse.md)

↳  [ISettingsResponse](_schemes_response_setting_.isettingsresponse.md)

↳  [ICollectionPresetResponse](_schemes_response_collectionpreset_.icollectionpresetresponse.md)

↳  [ICollectionPresetsResponse](_schemes_response_collectionpreset_.icollectionpresetsresponse.md)

↳  [IItemResponse](_schemes_response_item_.iitemresponse.md)

↳  [IItemsResponse](_schemes_response_item_.iitemsresponse.md)

↳  [IServerInformationResponse](_schemes_response_serverinformation_.iserverinformationresponse.md)

## Index

### Properties

* [data](_schemes_apiresponse_.iapiresponse.md#data)
* [error](_schemes_apiresponse_.iapiresponse.md#error)
* [meta](_schemes_apiresponse_.iapiresponse.md#meta)

---

## Properties

<a id="data"></a>

###  data

**● data**: *`DataType`*

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

**● meta**: *`MetaDataType`*

*Defined in [schemes/APIResponse.ts:12](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/schemes/APIResponse.ts#L12)*

___

