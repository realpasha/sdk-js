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

*Defined in [ConcurrencyManager.ts:5](https://github.com/janbiasi/sdk-js/blob/75383ea/src/ConcurrencyManager.ts#L5)*

___

###  resolver

• **resolver**: *function*

*Defined in [ConcurrencyManager.ts:6](https://github.com/janbiasi/sdk-js/blob/75383ea/src/ConcurrencyManager.ts#L6)*

#### Type declaration:

▸ (`queuedRequest`: `AxiosRequestConfig`): *any*

**Parameters:**

Name | Type |
------ | ------ |
`queuedRequest` | `AxiosRequestConfig` |