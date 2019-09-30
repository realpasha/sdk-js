> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["ConcurrencyManager"](_concurrencymanager_.md) /

# External module: "ConcurrencyManager"

### Index

#### Interfaces

* [IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md)

#### Functions

* [concurrencyManager](_concurrencymanager_.md#const-concurrencymanager)

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

* **queue**: *[IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md)[]* =  [] as IConcurrencyQueueItem[]

* **running**: *[IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md)[]* =  [] as IConcurrencyQueueItem[]

* **attach**(`limitConcurrentRequestsTo?`: number): *void*

* **detach**(): *void*

* **push**(`reqHandler`: [IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md)): *void*

* **requestHandler**(`req`: `AxiosRequestConfig`): *`Promise<AxiosRequestConfig>`*

* **responseHandler**(`res`: `AxiosResponse<any>`): *`AxiosResponse<any>`*

* **shift**(): *void*

* **shiftInitial**(): *void*

* ### **interceptors**: *object*

  * **request**: *null* =  null

  * **response**: *null* =  null