> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/request/Collection"](../modules/_schemes_request_collection_.md) / [ICollectionPresetData](_schemes_request_collection_.icollectionpresetdata.md) /

# Interface: ICollectionPresetData

## Hierarchy

  * [ICollectionPreset](_schemes_directus_collectionpreset_.icollectionpreset.md)

  * **ICollectionPresetData**

  * [ICreateCollectionPresetBody](_schemes_request_collection_.icreatecollectionpresetbody.md)

## Indexable

● \[▪ **otherFields**: *string*\]: any

### Index

#### Properties

* [title](_schemes_request_collection_.icollectionpresetdata.md#title)
* [view_query](_schemes_request_collection_.icollectionpresetdata.md#view_query)

## Properties

###  title

• **title**: *string*

*Overrides [IRequiredCollectionPresetData](_schemes_directus_collectionpreset_.irequiredcollectionpresetdata.md).[title](_schemes_directus_collectionpreset_.irequiredcollectionpresetdata.md#title)*

*Defined in [schemes/request/Collection.ts:4](https://github.com/direcuts/sdk-js/tree/master/schemes/request/Collection.ts#L4)*

___

###  view_query

• **view_query**: *object*

*Defined in [schemes/request/Collection.ts:5](https://github.com/direcuts/sdk-js/tree/master/schemes/request/Collection.ts#L5)*

#### Type declaration:

* **tabular**(): *object*

  * **fields**: *string[]*

  * **sort**? : *string*