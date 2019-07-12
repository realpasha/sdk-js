[@directus/sdk-js](../README.md) > ["ConcurrencyManager"](../modules/_concurrencymanager_.md)

# External module: "ConcurrencyManager"

## Index

### Interfaces

* [IConcurrencyQueueItem](../interfaces/_concurrencymanager_.iconcurrencyqueueitem.md)

### Functions

* [concurrencyManager](_concurrencymanager_.md#concurrencymanager)

---

## Functions

<a id="concurrencymanager"></a>

### `<Const>` concurrencyManager

▸ **concurrencyManager**(axios: *`AxiosInstance`*, limit?: *`number`*): `object`

*Defined in [ConcurrencyManager.ts:14](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/ConcurrencyManager.ts#L14)*

Handling and limiting concurrent requests for the API.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| axios | `AxiosInstance` | - |  Reference to the caller instance |
| `Default value` limit | `number` | 10 |  When to reate-limit outgoing requests |

**Returns:** `object`

___

