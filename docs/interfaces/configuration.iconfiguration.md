> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / [Configuration](../modules/configuration.md) / [IConfiguration](configuration.iconfiguration.md) /

# Interface: IConfiguration

## Hierarchy

* **IConfiguration**

## Implemented by

* [Configuration](../classes/configuration.configuration-1.md)

### Index

#### Properties

* [localExp](configuration.iconfiguration.md#optional-localexp)
* [persist](configuration.iconfiguration.md#persist)
* [project](configuration.iconfiguration.md#project)
* [token](configuration.iconfiguration.md#token)
* [tokenExpirationTime](configuration.iconfiguration.md#tokenexpirationtime)
* [url](configuration.iconfiguration.md#url)

#### Methods

* [dehydrate](configuration.iconfiguration.md#dehydrate)
* [deleteHydratedConfig](configuration.iconfiguration.md#deletehydratedconfig)
* [hydrate](configuration.iconfiguration.md#hydrate)
* [partialUpdate](configuration.iconfiguration.md#partialupdate)
* [reset](configuration.iconfiguration.md#reset)
* [update](configuration.iconfiguration.md#update)

## Properties

### `Optional` localExp

• **localExp**? : *number*

*Defined in [Configuration.ts:31](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L31)*

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

▸ **dehydrate**(): *[IConfigurationValues](configuration.iconfigurationvalues.md)*

*Defined in [Configuration.ts:34](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L34)*

**Returns:** *[IConfigurationValues](configuration.iconfigurationvalues.md)*

___

###  deleteHydratedConfig

▸ **deleteHydratedConfig**(): *any*

*Defined in [Configuration.ts:35](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L35)*

**Returns:** *any*

___

###  hydrate

▸ **hydrate**(`config`: [IConfigurationValues](configuration.iconfigurationvalues.md)): *any*

*Defined in [Configuration.ts:36](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [IConfigurationValues](configuration.iconfigurationvalues.md) |

**Returns:** *any*

___

###  partialUpdate

▸ **partialUpdate**(`config`: `Partial<IConfigurationValues>`): *void*

*Defined in [Configuration.ts:37](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | `Partial<IConfigurationValues>` |

**Returns:** *void*

___

###  reset

▸ **reset**(): *void*

*Defined in [Configuration.ts:38](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L38)*

**Returns:** *void*

___

###  update

▸ **update**(`config`: [IConfigurationValues](configuration.iconfigurationvalues.md)): *any*

*Defined in [Configuration.ts:39](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [IConfigurationValues](configuration.iconfigurationvalues.md) |

**Returns:** *any*