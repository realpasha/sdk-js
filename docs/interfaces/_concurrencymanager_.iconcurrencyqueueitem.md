> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["ConcurrencyManager"](../modules/_concurrencymanager_.md) / [IConcurrencyQueueItem](_concurrencymanager_.iconcurrencyqueueitem.md) /

# Interface: IConcurrencyQueueItem

## Hierarchy

* **IConcurrencyQueueItem**

### Index

#### Properties

* [request](_concurrencymanager_.iconcurrencyqueueitem.md#request)
* [resolver](_concurrencymanager_.iconcurrencyqueueitem.md#resolver)

## Properties

###  request

• **request**: *`AxiosRequestConfig`*

*Defined in [ConcurrencyManager.ts:8](https://github.com/direcuts/sdk-js/tree/master/ConcurrencyManager.ts#L8)*

___

###  resolver

• **resolver**: *function*

*Defined in [ConcurrencyManager.ts:9](https://github.com/direcuts/sdk-js/tree/master/ConcurrencyManager.ts#L9)*

#### Type declaration:

▸ (`queuedRequest`: `AxiosRequestConfig`): *any*

**Parameters:**

Name | Type |
------ | ------ |
`queuedRequest` | `AxiosRequestConfig` |