> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["Configuration"](../modules/_configuration_.md) / [Configuration](_configuration_.configuration.md) /

# Class: Configuration

Configuration holder for directus implementations

## Hierarchy

* **Configuration**

## Implements

* [IConfiguration](../interfaces/_configuration_.iconfiguration.md)

### Index

#### Constructors

* [constructor](_configuration_.configuration.md#constructor)

#### Properties

* [internalConfiguration](_configuration_.configuration.md#private-internalconfiguration)
* [storage](_configuration_.configuration.md#private-optional-storage)

#### Accessors

* [localExp](_configuration_.configuration.md#localexp)
* [persist](_configuration_.configuration.md#persist)
* [project](_configuration_.configuration.md#project)
* [token](_configuration_.configuration.md#token)
* [tokenExpirationTime](_configuration_.configuration.md#tokenexpirationtime)
* [url](_configuration_.configuration.md#url)

#### Methods

* [dehydrate](_configuration_.configuration.md#dehydrate)
* [dehydratedInitialConfiguration](_configuration_.configuration.md#private-dehydratedinitialconfiguration)
* [deleteHydratedConfig](_configuration_.configuration.md#deletehydratedconfig)
* [hydrate](_configuration_.configuration.md#hydrate)
* [partialUpdate](_configuration_.configuration.md#partialupdate)
* [reset](_configuration_.configuration.md#reset)
* [update](_configuration_.configuration.md#update)
* [validate](_configuration_.configuration.md#validate)

#### Object literals

* [defaults](_configuration_.configuration.md#static-defaults)

## Constructors

###  constructor

\+ **new Configuration**(`initialConfig`: [IConfigurationOptions](../interfaces/_configuration_.iconfigurationoptions.md), `storage?`: [IStorageAPI](../interfaces/_configuration_.istorageapi.md)): *[Configuration](_configuration_.configuration.md)*

*Defined in [Configuration.ts:89](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L89)*

Creates a new configuration instance, will be used once for each directus instance (passing refs).

**`constructor`** 

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`initialConfig` | [IConfigurationOptions](../interfaces/_configuration_.iconfigurationoptions.md) |  {} as any | Initial configuration values |
`storage?` | [IStorageAPI](../interfaces/_configuration_.istorageapi.md) | - | Storage adapter for persistence  |

**Returns:** *[Configuration](_configuration_.configuration.md)*

## Properties

### `Private` internalConfiguration

• **internalConfiguration**: *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)*

*Defined in [Configuration.ts:89](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L89)*

Saves the internal configuration values, **DO NOT modify** from the outside

___

### `Private` `Optional` storage

• **storage**? : *[IStorageAPI](../interfaces/_configuration_.istorageapi.md)*

*Defined in [Configuration.ts:97](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L97)*

Storage adapter for persistence

## Accessors

###  localExp

• **get localExp**(): *number | undefined*

*Defined in [Configuration.ts:160](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L160)*

**Returns:** *number | undefined*

• **set localExp**(`localExp`: number | undefined): *void*

*Defined in [Configuration.ts:164](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`localExp` | number \| undefined |

**Returns:** *void*

___

###  persist

• **get persist**(): *boolean*

*Defined in [Configuration.ts:168](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L168)*

**Returns:** *boolean*

• **set persist**(`persist`: boolean): *void*

*Defined in [Configuration.ts:172](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L172)*

**Parameters:**

Name | Type |
------ | ------ |
`persist` | boolean |

**Returns:** *void*

___

###  project

• **get project**(): *string*

*Defined in [Configuration.ts:150](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L150)*

**Returns:** *string*

• **set project**(`project`: string): *void*

*Defined in [Configuration.ts:154](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`project` | string |

**Returns:** *void*

___

###  token

• **get token**(): *string | undefined*

*Defined in [Configuration.ts:123](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L123)*

**Returns:** *string | undefined*

• **set token**(`token`: string): *void*

*Defined in [Configuration.ts:127](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *void*

___

###  tokenExpirationTime

• **get tokenExpirationTime**(): *number | undefined*

*Defined in [Configuration.ts:131](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L131)*

**Returns:** *number | undefined*

• **set tokenExpirationTime**(`tokenExpirationTime`: number): *void*

*Defined in [Configuration.ts:135](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`tokenExpirationTime` | number |

**Returns:** *void*

___

###  url

• **get url**(): *string*

*Defined in [Configuration.ts:142](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L142)*

**Returns:** *string*

• **set url**(`url`: string): *void*

*Defined in [Configuration.ts:146](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *void*

## Methods

###  dehydrate

▸ **dehydrate**(): *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) | undefined*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:226](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L226)*

**Returns:** *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) | undefined*

___

### `Private` dehydratedInitialConfiguration

▸ **dehydratedInitialConfiguration**(`storage`: [IStorageAPI](../interfaces/_configuration_.istorageapi.md)): *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)*

*Defined in [Configuration.ts:259](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L259)*

**Parameters:**

Name | Type |
------ | ------ |
`storage` | [IStorageAPI](../interfaces/_configuration_.istorageapi.md) |

**Returns:** *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)*

___

###  deleteHydratedConfig

▸ **deleteHydratedConfig**(): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:251](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L251)*

**Returns:** *void*

___

###  hydrate

▸ **hydrate**(`props`: [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:243](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L243)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) |

**Returns:** *void*

___

###  partialUpdate

▸ **partialUpdate**(`config`: `Partial<IConfigurationValues>`): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:202](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L202)*

Update partials of the configuration, behaves like the [update] method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | `Partial<IConfigurationValues>` |   |

**Returns:** *void*

___

###  reset

▸ **reset**(): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:214](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L214)*

Reset the whole confiugration and remove hydrated values from storage as well

**Returns:** *void*

___

###  update

▸ **update**(`config`: [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:192](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L192)*

Update the configuration values, will also hydrate them if persistance activated

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) |   |

**Returns:** *void*

___

###  validate

▸ **validate**(): *void*

*Defined in [Configuration.ts:182](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L182)*

Validates if the configuration is valid

**`throws`** {Error}

**Returns:** *void*

## Object literals

### `Static` defaults

### ▪ **defaults**: *object*

*Defined in [Configuration.ts:80](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L80)*

Defaults for all directus sdk instances, can be modified if preferred

**`type`** {IConfigurationDefaults}

###  project

• **project**: *string* = "_"

*Defined in [Configuration.ts:81](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L81)*

###  tokenExpirationTime

• **tokenExpirationTime**: *number* =  5 * 6 * 1000

*Defined in [Configuration.ts:82](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L82)*