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

#### Object literals

* [defaults](_configuration_.configuration.md#static-defaults)

## Constructors

###  constructor

\+ **new Configuration**(`initialConfig`: [IConfigurationOptions](../interfaces/_configuration_.iconfigurationoptions.md), `storage?`: [IStorageAPI](../interfaces/_configuration_.istorageapi.md)): *[Configuration](_configuration_.configuration.md)*

*Defined in [Configuration.ts:91](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L91)*

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

*Defined in [Configuration.ts:91](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L91)*

Saves the internal configuration values, **DO NOT modify** from the outside

___

### `Private` `Optional` storage

• **storage**? : *[IStorageAPI](../interfaces/_configuration_.istorageapi.md)*

*Defined in [Configuration.ts:99](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L99)*

Storage adapter for persistence

## Accessors

###  localExp

• **get localExp**(): *number | undefined*

*Defined in [Configuration.ts:162](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L162)*

**Returns:** *number | undefined*

• **set localExp**(`localExp`: number | undefined): *void*

*Defined in [Configuration.ts:166](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L166)*

**Parameters:**

Name | Type |
------ | ------ |
`localExp` | number \| undefined |

**Returns:** *void*

___

###  persist

• **get persist**(): *boolean*

*Defined in [Configuration.ts:170](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L170)*

**Returns:** *boolean*

• **set persist**(`persist`: boolean): *void*

*Defined in [Configuration.ts:174](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L174)*

**Parameters:**

Name | Type |
------ | ------ |
`persist` | boolean |

**Returns:** *void*

___

###  project

• **get project**(): *string*

*Defined in [Configuration.ts:152](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L152)*

**Returns:** *string*

• **set project**(`project`: string): *void*

*Defined in [Configuration.ts:156](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`project` | string |

**Returns:** *void*

___

###  token

• **get token**(): *string | undefined*

*Defined in [Configuration.ts:125](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L125)*

**Returns:** *string | undefined*

• **set token**(`token`: string): *void*

*Defined in [Configuration.ts:129](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L129)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *void*

___

###  tokenExpirationTime

• **get tokenExpirationTime**(): *number | undefined*

*Defined in [Configuration.ts:133](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L133)*

**Returns:** *number | undefined*

• **set tokenExpirationTime**(`tokenExpirationTime`: number): *void*

*Defined in [Configuration.ts:137](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L137)*

**Parameters:**

Name | Type |
------ | ------ |
`tokenExpirationTime` | number |

**Returns:** *void*

___

###  url

• **get url**(): *string*

*Defined in [Configuration.ts:144](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L144)*

**Returns:** *string*

• **set url**(`url`: string): *void*

*Defined in [Configuration.ts:148](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *void*

## Methods

###  dehydrate

▸ **dehydrate**(): *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) | undefined*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:218](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L218)*

**Returns:** *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) | undefined*

___

### `Private` dehydratedInitialConfiguration

▸ **dehydratedInitialConfiguration**(`storage`: [IStorageAPI](../interfaces/_configuration_.istorageapi.md)): *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)*

*Defined in [Configuration.ts:251](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L251)*

**Parameters:**

Name | Type |
------ | ------ |
`storage` | [IStorageAPI](../interfaces/_configuration_.istorageapi.md) |

**Returns:** *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)*

___

###  deleteHydratedConfig

▸ **deleteHydratedConfig**(): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:243](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L243)*

**Returns:** *void*

___

###  hydrate

▸ **hydrate**(`props`: [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:235](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L235)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) |

**Returns:** *void*

___

###  partialUpdate

▸ **partialUpdate**(`config`: `Partial<IConfigurationValues>`): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:194](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L194)*

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

*Defined in [Configuration.ts:206](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L206)*

Reset the whole confiugration and remove hydrated values from storage as well

**Returns:** *void*

___

###  update

▸ **update**(`config`: [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)): *void*

*Implementation of [IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Configuration.ts:184](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L184)*

Update the configuration values, will also hydrate them if persistance activated

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) |   |

**Returns:** *void*

## Object literals

### `Static` defaults

### ▪ **defaults**: *object*

*Defined in [Configuration.ts:82](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L82)*

Defaults for all directus sdk instances, can be modified if preferred

**`type`** {IConfigurationDefaults}

###  project

• **project**: *string* = "_"

*Defined in [Configuration.ts:83](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L83)*

###  tokenExpirationTime

• **tokenExpirationTime**: *number* =  5 * 6 * 1000

*Defined in [Configuration.ts:84](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L84)*