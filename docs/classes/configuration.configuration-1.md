> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / [Configuration](../modules/configuration.md) / [Configuration](configuration.configuration-1.md) /

# Class: Configuration

Configuration holder for directus implementations

**`author`** Jan Biasi <biasijan@gmail.com>

## Hierarchy

* **Configuration**

## Implements

* [IConfiguration](../interfaces/configuration.iconfiguration.md)

### Index

#### Constructors

* [constructor](configuration.configuration-1.md#constructor)

#### Properties

* [internalConfiguration](configuration.configuration-1.md#private-internalconfiguration)
* [storage](configuration.configuration-1.md#private-optional-storage)

#### Accessors

* [localExp](configuration.configuration-1.md#localexp)
* [persist](configuration.configuration-1.md#persist)
* [project](configuration.configuration-1.md#project)
* [token](configuration.configuration-1.md#token)
* [tokenExpirationTime](configuration.configuration-1.md#tokenexpirationtime)
* [url](configuration.configuration-1.md#url)

#### Methods

* [dehydrate](configuration.configuration-1.md#dehydrate)
* [dehydratedInitialConfiguration](configuration.configuration-1.md#private-dehydratedinitialconfiguration)
* [deleteHydratedConfig](configuration.configuration-1.md#deletehydratedconfig)
* [hydrate](configuration.configuration-1.md#hydrate)
* [partialUpdate](configuration.configuration-1.md#partialupdate)
* [reset](configuration.configuration-1.md#reset)
* [update](configuration.configuration-1.md#update)
* [validate](configuration.configuration-1.md#validate)

#### Object literals

* [defaults](configuration.configuration-1.md#static-defaults)

## Constructors

###  constructor

\+ **new Configuration**(`initialConfig`: [IConfigurationOptions](../interfaces/configuration.iconfigurationoptions.md), `storage?`: [IStorageAPI](../interfaces/configuration.istorageapi.md)): *[Configuration](configuration.configuration-1.md)*

*Defined in [Configuration.ts:93](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L93)*

Creates a new configuration instance, will be used once for each directus instance (passing refs).

**`constructor`** 

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`initialConfig` | [IConfigurationOptions](../interfaces/configuration.iconfigurationoptions.md) |  {} as any | Initial configuration values |
`storage?` | [IStorageAPI](../interfaces/configuration.istorageapi.md) | - | Storage adapter for persistence  |

**Returns:** *[Configuration](configuration.configuration-1.md)*

## Properties

### `Private` internalConfiguration

• **internalConfiguration**: *[IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md)*

*Defined in [Configuration.ts:93](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L93)*

Saves the internal configuration values, **DO NOT modify** from the outside

___

### `Private` `Optional` storage

• **storage**? : *[IStorageAPI](../interfaces/configuration.istorageapi.md)*

*Defined in [Configuration.ts:101](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L101)*

Storage adapter for persistence

## Accessors

###  localExp

• **get localExp**(): *number | undefined*

*Defined in [Configuration.ts:164](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L164)*

**Returns:** *number | undefined*

• **set localExp**(`localExp`: number | undefined): *void*

*Defined in [Configuration.ts:168](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L168)*

**Parameters:**

Name | Type |
------ | ------ |
`localExp` | number \| undefined |

**Returns:** *void*

___

###  persist

• **get persist**(): *boolean*

*Defined in [Configuration.ts:172](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L172)*

**Returns:** *boolean*

• **set persist**(`persist`: boolean): *void*

*Defined in [Configuration.ts:176](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`persist` | boolean |

**Returns:** *void*

___

###  project

• **get project**(): *string*

*Defined in [Configuration.ts:154](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L154)*

**Returns:** *string*

• **set project**(`project`: string): *void*

*Defined in [Configuration.ts:158](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L158)*

**Parameters:**

Name | Type |
------ | ------ |
`project` | string |

**Returns:** *void*

___

###  token

• **get token**(): *string | undefined*

*Defined in [Configuration.ts:127](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L127)*

**Returns:** *string | undefined*

• **set token**(`token`: string): *void*

*Defined in [Configuration.ts:131](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *void*

___

###  tokenExpirationTime

• **get tokenExpirationTime**(): *number | undefined*

*Defined in [Configuration.ts:135](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L135)*

**Returns:** *number | undefined*

• **set tokenExpirationTime**(`tokenExpirationTime`: number): *void*

*Defined in [Configuration.ts:139](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`tokenExpirationTime` | number |

**Returns:** *void*

___

###  url

• **get url**(): *string*

*Defined in [Configuration.ts:146](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L146)*

**Returns:** *string*

• **set url**(`url`: string): *void*

*Defined in [Configuration.ts:150](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *void*

## Methods

###  dehydrate

▸ **dehydrate**(): *[IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md) | undefined*

*Implementation of [IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [Configuration.ts:230](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L230)*

**Returns:** *[IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md) | undefined*

___

### `Private` dehydratedInitialConfiguration

▸ **dehydratedInitialConfiguration**(`storage`: [IStorageAPI](../interfaces/configuration.istorageapi.md)): *[IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md)*

*Defined in [Configuration.ts:263](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L263)*

**Parameters:**

Name | Type |
------ | ------ |
`storage` | [IStorageAPI](../interfaces/configuration.istorageapi.md) |

**Returns:** *[IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md)*

___

###  deleteHydratedConfig

▸ **deleteHydratedConfig**(): *void*

*Implementation of [IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [Configuration.ts:255](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L255)*

**Returns:** *void*

___

###  hydrate

▸ **hydrate**(`props`: [IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md)): *void*

*Implementation of [IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [Configuration.ts:247](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L247)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md) |

**Returns:** *void*

___

###  partialUpdate

▸ **partialUpdate**(`config`: `Partial<IConfigurationValues>`): *void*

*Implementation of [IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [Configuration.ts:206](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L206)*

Update partials of the configuration, behaves like the [update] method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | `Partial<IConfigurationValues>` |   |

**Returns:** *void*

___

###  reset

▸ **reset**(): *void*

*Implementation of [IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [Configuration.ts:218](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L218)*

Reset the whole confiugration and remove hydrated values from storage as well

**Returns:** *void*

___

###  update

▸ **update**(`config`: [IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md)): *void*

*Implementation of [IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [Configuration.ts:196](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L196)*

Update the configuration values, will also hydrate them if persistance activated

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | [IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md) |   |

**Returns:** *void*

___

###  validate

▸ **validate**(): *void*

*Defined in [Configuration.ts:186](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L186)*

Validates if the configuration is valid

**`throws`** {Error}

**Returns:** *void*

## Object literals

### `Static` defaults

### ▪ **defaults**: *object*

*Defined in [Configuration.ts:84](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L84)*

Defaults for all directus sdk instances, can be modified if preferred

**`type`** {IConfigurationDefaults}

###  project

• **project**: *string* = "_"

*Defined in [Configuration.ts:85](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L85)*

###  tokenExpirationTime

• **tokenExpirationTime**: *number* =  5 * 6 * 1000

*Defined in [Configuration.ts:86](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L86)*