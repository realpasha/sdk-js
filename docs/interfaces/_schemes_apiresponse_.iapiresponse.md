> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/APIResponse"](../modules/_schemes_apiresponse_.md) / [IAPIResponse](_schemes_apiresponse_.iapiresponse.md) /

# Interface: IAPIResponse <**DataType, MetaDataType**>

## Type parameters

▪ **DataType**

▪ **MetaDataType**: *object*

## Hierarchy

* [IAbstractAPIResponse](_schemes_apiresponse_.iabstractapiresponse.md)

  * **IAPIResponse**

  * [IRefreshTokenResponse](_schemes_response_token_.irefreshtokenresponse.md)

  * [IRelationResponse](_schemes_response_relation_.irelationresponse.md)

  * [IRelationsResponse](_schemes_response_relation_.irelationsresponse.md)

  * [IActivityResponse](_schemes_response_activity_.iactivityresponse.md)

  * [ICollectionResponse](_schemes_response_collection_.icollectionresponse.md)

  * [ICollectionsResponse](_schemes_response_collection_.icollectionsresponse.md)

  * [ICollectionPresetResponse](_schemes_response_collectionpreset_.icollectionpresetresponse.md)

  * [ICollectionPresetsResponse](_schemes_response_collectionpreset_.icollectionpresetsresponse.md)

  * [IFieldResponse](_schemes_response_field_.ifieldresponse.md)

  * [IFieldsResponse](_schemes_response_field_.ifieldsresponse.md)

  * [IFileResponse](_schemes_response_file_.ifileresponse.md)

  * [IFilesResponse](_schemes_response_file_.ifilesresponse.md)

  * [IItemResponse](_schemes_response_item_.iitemresponse.md)

  * [IItemsResponse](_schemes_response_item_.iitemsresponse.md)

  * [IRevisionResponse](_schemes_response_revision_.irevisionresponse.md)

  * [IRoleResponse](_schemes_response_role_.iroleresponse.md)

  * [IUserResponse](_schemes_response_user_.iuserresponse.md)

  * [IUsersResponse](_schemes_response_user_.iusersresponse.md)

  * [IServerInformationResponse](_schemes_response_serverinformation_.iserverinformationresponse.md)

  * [ISettingResponse](_schemes_response_setting_.isettingresponse.md)

  * [ISettingsResponse](_schemes_response_setting_.isettingsresponse.md)

### Index

#### Properties

* [data](_schemes_apiresponse_.iapiresponse.md#data)
* [error](_schemes_apiresponse_.iapiresponse.md#optional-error)
* [meta](_schemes_apiresponse_.iapiresponse.md#meta)

## Properties

###  data

• **data**: *`DataType`*

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

*Defined in [schemes/APIResponse.ts:12](https://github.com/direcuts/sdk-js/tree/master/schemes/APIResponse.ts#L12)*