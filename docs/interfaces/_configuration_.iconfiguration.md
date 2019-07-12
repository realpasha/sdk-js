[@directus/sdk-js](../README.md) > ["Configuration"](../modules/_configuration_.md) > [IConfiguration](../interfaces/_configuration_.iconfiguration.md)

# Interface: IConfiguration

## Hierarchy

**IConfiguration**

## Implemented by

* [Configuration](../classes/_configuration_.configuration.md)

## Index

### Properties

* [localExp](_configuration_.iconfiguration.md#localexp)
* [persist](_configuration_.iconfiguration.md#persist)
* [project](_configuration_.iconfiguration.md#project)
* [token](_configuration_.iconfiguration.md#token)
* [tokenExpirationTime](_configuration_.iconfiguration.md#tokenexpirationtime)
* [url](_configuration_.iconfiguration.md#url)

### Methods

* [dehydrate](_configuration_.iconfiguration.md#dehydrate)
* [deleteHydratedConfig](_configuration_.iconfiguration.md#deletehydratedconfig)
* [hydrate](_configuration_.iconfiguration.md#hydrate)
* [partialUpdate](_configuration_.iconfiguration.md#partialupdate)
* [reset](_configuration_.iconfiguration.md#reset)
* [update](_configuration_.iconfiguration.md#update)

---

## Properties

<a id="localexp"></a>

### `<Optional>` localExp

**● localExp**: *`number`*

*Defined in [Configuration.ts:27](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L27)*

___
<a id="persist"></a>

###  persist

**● persist**: *`boolean`*

*Defined in [Configuration.ts:29](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L29)*

___
<a id="project"></a>

###  project

**● project**: *`string`*

*Defined in [Configuration.ts:26](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L26)*

___
<a id="token"></a>

###  token

**● token**: *`string`*

*Defined in [Configuration.ts:24](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L24)*

___
<a id="tokenexpirationtime"></a>

###  tokenExpirationTime

**● tokenExpirationTime**: *`number`*

*Defined in [Configuration.ts:28](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L28)*

___
<a id="url"></a>

###  url

**● url**: *`string`*

*Defined in [Configuration.ts:25](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L25)*

___

## Methods

<a id="dehydrate"></a>

###  dehydrate

▸ **dehydrate**(): [IConfigurationValues](_configuration_.iconfigurationvalues.md)

*Defined in [Configuration.ts:30](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L30)*

**Returns:** [IConfigurationValues](_configuration_.iconfigurationvalues.md)

___
<a id="deletehydratedconfig"></a>

###  deleteHydratedConfig

▸ **deleteHydratedConfig**(): `any`

*Defined in [Configuration.ts:31](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L31)*

**Returns:** `any`

___
<a id="hydrate"></a>

###  hydrate

▸ **hydrate**(config: *[IConfigurationValues](_configuration_.iconfigurationvalues.md)*): `any`

*Defined in [Configuration.ts:32](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | [IConfigurationValues](_configuration_.iconfigurationvalues.md) |

**Returns:** `any`

___
<a id="partialupdate"></a>

###  partialUpdate

▸ **partialUpdate**(config: *`Partial`<[IConfigurationValues](_configuration_.iconfigurationvalues.md)>*): `void`

*Defined in [Configuration.ts:33](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | `Partial`<[IConfigurationValues](_configuration_.iconfigurationvalues.md)> |

**Returns:** `void`

___
<a id="reset"></a>

###  reset

▸ **reset**(): `void`

*Defined in [Configuration.ts:34](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L34)*

**Returns:** `void`

___
<a id="update"></a>

###  update

▸ **update**(config: *[IConfigurationValues](_configuration_.iconfigurationvalues.md)*): `any`

*Defined in [Configuration.ts:35](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Configuration.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | [IConfigurationValues](_configuration_.iconfigurationvalues.md) |

**Returns:** `any`

___

