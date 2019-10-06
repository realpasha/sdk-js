> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["Configuration"](../modules/_configuration_.md) / [IConfiguration](_configuration_.iconfiguration.md) /

# Interface: IConfiguration

## Hierarchy

* **IConfiguration**

## Implemented by

* [Configuration](../classes/_configuration_.configuration.md)

### Index

#### Properties

* [localExp](_configuration_.iconfiguration.md#optional-localexp)
* [mode](_configuration_.iconfiguration.md#mode)
* [persist](_configuration_.iconfiguration.md#persist)
* [project](_configuration_.iconfiguration.md#project)
* [token](_configuration_.iconfiguration.md#token)
* [tokenExpirationTime](_configuration_.iconfiguration.md#tokenexpirationtime)
* [url](_configuration_.iconfiguration.md#url)

#### Methods

* [dehydrate](_configuration_.iconfiguration.md#dehydrate)
* [deleteHydratedConfig](_configuration_.iconfiguration.md#deletehydratedconfig)
* [hydrate](_configuration_.iconfiguration.md#hydrate)
* [partialUpdate](_configuration_.iconfiguration.md#partialupdate)
* [reset](_configuration_.iconfiguration.md#reset)
* [update](_configuration_.iconfiguration.md#update)

## Properties

### `Optional` localExp

• **localExp**? : *number*

*Defined in [Configuration.ts:31](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L31)*

___

###  mode

• **mode**: *[AuthModes](../modules/_authentication_.md#authmodes)*

*Defined in [Configuration.ts:34](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L34)*

___

###  persist

• **persist**: *boolean*

*Defined in [Configuration.ts:33](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L33)*

___

###  project

• **project**: *string*

*Defined in [Configuration.ts:30](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L30)*

___

###  token

• **token**: *string*

*Defined in [Configuration.ts:28](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L28)*

___

###  tokenExpirationTime

• **tokenExpirationTime**: *number*

*Defined in [Configuration.ts:32](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L32)*

___

###  url

• **url**: *string*

*Defined in [Configuration.ts:29](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L29)*

## Methods

###  dehydrate

▸ **dehydrate**(): *[IConfigurationValues](_configuration_.iconfigurationvalues.md)*

*Defined in [Configuration.ts:35](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L35)*

**Returns:** *[IConfigurationValues](_configuration_.iconfigurationvalues.md)*

___

###  deleteHydratedConfig

▸ **deleteHydratedConfig**(): *any*

*Defined in [Configuration.ts:36](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L36)*

**Returns:** *any*

___

###  hydrate

▸ **hydrate**(`config`: [IConfigurationValues](_configuration_.iconfigurationvalues.md)): *any*

*Defined in [Configuration.ts:37](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [IConfigurationValues](_configuration_.iconfigurationvalues.md) |

**Returns:** *any*

___

###  partialUpdate

▸ **partialUpdate**(`config`: `Partial<IConfigurationValues>`): *void*

*Defined in [Configuration.ts:38](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | `Partial<IConfigurationValues>` |

**Returns:** *void*

___

###  reset

▸ **reset**(): *void*

*Defined in [Configuration.ts:39](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L39)*

**Returns:** *void*

___

###  update

▸ **update**(`config`: [IConfigurationValues](_configuration_.iconfigurationvalues.md)): *any*

*Defined in [Configuration.ts:40](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [IConfigurationValues](_configuration_.iconfigurationvalues.md) |

**Returns:** *any*