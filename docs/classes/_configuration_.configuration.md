> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["Configuration"](../modules/_configuration_.md) / [Configuration](_configuration_.configuration.md) /

# Class: Configuration

Configuration holder for directus implementations

**`author`** Jan Biasi <biasijan@gmail.com>

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

*Defined in [Configuration.ts:90](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L90)*

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

*Defined in [Configuration.ts:90](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L90)*

Saves the internal configuration values, **DO NOT modify** from the outside

___

### `Private` `Optional` storage

• **storage**? : *[IStorageAPI](../interfaces/_configuration_.istorageapi.md)*

*Defined in [Configuration.ts:98](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L98)*

Storage adapter for persistence

## Accessors

###  localExp

• **get localExp**(): *number | undefined*

*Defined in [Configuration.ts:161](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L161)*

**Returns:** *number | undefined*

• **set localExp**(`localExp`: number | undefined): *void*

*Defined in [Configuration.ts:165](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L165)*

**Parameters:**

Name | Type |
------ | ------ |
`localExp` | number \| undefined |

**Returns:** *void*

___

###  persist

• **get persist**(): *boolean*

*Defined in [Configuration.ts:169](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L169)*

**Returns:** *boolean*

• **set persist**(`persist`: boolean): *void*

*Defined in [Configuration.ts:173](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`persist` | boolean |

**Returns:** *void*

___

###  project

• **get project**(): *string*

*Defined in [Configuration.ts:151](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L151)*

**Returns:** *string*

• **set project**(`project`: string): *void*

*Defined in [Configuration.ts:155](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L155)*

**Parameters:**

Name | Type |
------ | ------ |
`project` | string |

**Returns:** *void*

___

###  token

• **get token**(): *string | undefined*

*Defined in [Configuration.ts:124](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L124)*

**Returns:** *string | undefined*

• **set token**(`token`: string): *void*

*Defined in [Configuration.ts:128](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L128)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *void*

___

###  tokenExpirationTime

• **get tokenExpirationTime**(): *number | undefined*

*Defined in [Configuration.ts:132](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L132)*

**Returns:** *number | undefined*

• **set tokenExpirationTime**(`tokenExpirationTime`: number): *void*

*Defined in [Configuration.ts:136](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`tokenExpirationTime` | number |

**Returns:** *void*

___

###  url

• **get url**(): *string*

*Defined in [Configuration.ts:143](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L143)*

**Returns:** *string*

• **set url**(`url`: string): *void*

*Defined in [Configuration.ts:147](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *void*

## Methods

###  dehydrate

▸ **dehydrate**(): *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) | undefined*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:227](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L227)*

**Returns:** *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) | undefined*

___

### `Private` dehydratedInitialConfiguration

▸ **dehydratedInitialConfiguration**(`storage`: [IStorageAPI](../interfaces/_configuration_.istorageapi.md)): *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)*

*Defined in [Configuration.ts:260](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L260)*

**Parameters:**

Name | Type |
------ | ------ |
`storage` | [IStorageAPI](../interfaces/_configuration_.istorageapi.md) |

**Returns:** *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)*

___

###  deleteHydratedConfig

▸ **deleteHydratedConfig**(): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:252](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L252)*

**Returns:** *void*

___

###  hydrate

▸ **hydrate**(`props`: [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:244](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) |

**Returns:** *void*

___

###  partialUpdate

▸ **partialUpdate**(`config`: `Partial<IConfigurationValues>`): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:203](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L203)*

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

*Defined in [Configuration.ts:215](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L215)*

Reset the whole confiugration and remove hydrated values from storage as well

**Returns:** *void*

___

###  update

▸ **update**(`config`: [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:193](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L193)*

Update the configuration values, will also hydrate them if persistance activated

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) |   |

**Returns:** *void*

___

###  validate

▸ **validate**(): *void*

*Defined in [Configuration.ts:183](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L183)*

Validates if the configuration is valid

**`throws`** {Error}

**Returns:** *void*

## Object literals

### `Static` defaults

### ▪ **defaults**: *object*

*Defined in [Configuration.ts:81](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L81)*

Defaults for all directus sdk instances, can be modified if preferred

**`type`** {IConfigurationDefaults}

###  project

• **project**: *string* = "_"

*Defined in [Configuration.ts:82](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L82)*

###  tokenExpirationTime

• **tokenExpirationTime**: *number* =  5 * 6 * 1000

*Defined in [Configuration.ts:83](https://github.com/janbiasi/sdk-js/blob/75383ea/src/Configuration.ts#L83)*