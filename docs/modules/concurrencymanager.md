> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / [ConcurrencyManager](concurrencymanager.md) /

# External module: ConcurrencyManager

### Index

#### Interfaces

* [IConcurrencyQueueItem](../interfaces/concurrencymanager.iconcurrencyqueueitem.md)

#### Functions

* [concurrencyManager](concurrencymanager.md#const-concurrencymanager)

## Functions

### `Const` concurrencyManager

▸ **concurrencyManager**(`axios`: `AxiosInstance`, `limit`: number): *object*

*Defined in [ConcurrencyManager.ts:18](https://github.com/direcuts/sdk-js/tree/master/ConcurrencyManager.ts#L18)*

Handling and limiting concurrent requests for the API.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`axios` | `AxiosInstance` | - | Reference to the caller instance |
`limit` | number | 10 | When to reate-limit outgoing requests |

**Returns:** *object*

* **limit**: *number*

* **queue**: *[IConcurrencyQueueItem](../interfaces/concurrencymanager.iconcurrencyqueueitem.md)[]* =  [] as IConcurrencyQueueItem[]

* **running**: *[IConcurrencyQueueItem](../interfaces/concurrencymanager.iconcurrencyqueueitem.md)[]* =  [] as IConcurrencyQueueItem[]

* **attach**(`limitConcurrentRequestsTo?`: number): *void*

* **detach**(): *void*

* **push**(`reqHandler`: [IConcurrencyQueueItem](../interfaces/concurrencymanager.iconcurrencyqueueitem.md)): *void*

* **requestHandler**(`req`: `AxiosRequestConfig`): *`Promise<AxiosRequestConfig>`*

* **responseHandler**(`res`: `AxiosResponse<any>`): *`AxiosResponse<any>`*

* **shift**(): *void*

* **shiftInitial**(): *void*

* ### **interceptors**: *object*

  * **request**: *null* =  null

  * **response**: *null* =  null