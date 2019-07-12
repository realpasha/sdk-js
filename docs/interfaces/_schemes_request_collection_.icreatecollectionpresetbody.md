> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["schemes/request/Collection"](../modules/_schemes_request_collection_.md) / [ICreateCollectionPresetBody](_schemes_request_collection_.icreatecollectionpresetbody.md) /

# Interface: ICreateCollectionPresetBody

## Hierarchy

  * [ICollectionPresetData](_schemes_request_collection_.icollectionpresetdata.md)

  * **ICreateCollectionPresetBody**

## Indexable

● \[▪ **otherFields**: *string*\]: any

### Index

#### Properties

* [title](_schemes_request_collection_.icreatecollectionpresetbody.md#title)
* [view_query](_schemes_request_collection_.icreatecollectionpresetbody.md#view_query)

## Properties

###  title

• **title**: *string*

*Inherited from [ICollectionPresetData](_schemes_request_collection_.icollectionpresetdata.md).[title](_schemes_request_collection_.icollectionpresetdata.md#title)*

*Overrides [IRequiredCollectionPresetData](_schemes_directus_collectionpreset_.irequiredcollectionpresetdata.md).[title](_schemes_directus_collectionpreset_.irequiredcollectionpresetdata.md#title)*

*Defined in [schemes/request/Collection.ts:4](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/schemes/request/Collection.ts#L4)*

___

###  view_query

• **view_query**: *object*

*Inherited from [ICollectionPresetData](_schemes_request_collection_.icollectionpresetdata.md).[view_query](_schemes_request_collection_.icollectionpresetdata.md#view_query)*

*Defined in [schemes/request/Collection.ts:5](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/schemes/request/Collection.ts#L5)*

#### Type declaration:

* **tabular**(): *object*

  * **fields**: *string[]*

  * **sort**? : *string*