[@directus/sdk-js](../README.md) > ["ConcurrencyManager"](../modules/_concurrencymanager_.md) > [IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md)

# Interface: IConcurrencyQueueItem

## Hierarchy

**IConcurrencyQueueItem**

## Index

### Properties

* [request](_concurrencymanager_.iconcurrencyqueueitem.md#request)
* [resolver](_concurrencymanager_.iconcurrencyqueueitem.md#resolver)

---

## Properties

<a id="request"></a>

###  request

**● request**: *`AxiosRequestConfig`*

*Defined in [ConcurrencyManager.ts:5](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L5)*

___
<a id="resolver"></a>

###  resolver

**● resolver**: *`function`*

*Defined in [ConcurrencyManager.ts:6](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L6)*

#### Type declaration
▸(queuedRequest: *`AxiosRequestConfig`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| queuedRequest | `AxiosRequestConfig` |

**Returns:** `any`

___

