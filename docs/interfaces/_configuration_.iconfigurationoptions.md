> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["Configuration"](../modules/_configuration_.md) / [IConfigurationOptions](_configuration_.iconfigurationoptions.md) /

# Interface: IConfigurationOptions

## Hierarchy

* **IConfigurationOptions**

### Index

#### Properties

* [localExp](_configuration_.iconfigurationoptions.md#optional-localexp)
* [mode](_configuration_.iconfigurationoptions.md#optional-mode)
* [persist](_configuration_.iconfigurationoptions.md#optional-persist)
* [project](_configuration_.iconfigurationoptions.md#optional-project)
* [token](_configuration_.iconfigurationoptions.md#optional-token)
* [tokenExpirationTime](_configuration_.iconfigurationoptions.md#optional-tokenexpirationtime)
* [url](_configuration_.iconfigurationoptions.md#url)

## Properties

### `Optional` localExp

• **localExp**? : *number*

*Defined in [Configuration.ts:67](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L67)*

Default login expiration as number in ms

___

### `Optional` mode

• **mode**? : *[AuthModes](../modules/_authentication_.md#authmodes)*

*Defined in [Configuration.ts:75](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L75)*

Whether to use cookies or JWTs

___

### `Optional` persist

• **persist**? : *boolean*

*Defined in [Configuration.ts:71](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L71)*

If the token should be persitated or rehydrated

___

### `Optional` project

• **project**? : *string*

*Defined in [Configuration.ts:63](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L63)*

Project namespace

___

### `Optional` token

• **token**? : *string*

*Defined in [Configuration.ts:59](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L59)*

The token to authenticate if preferred

___

### `Optional` tokenExpirationTime

• **tokenExpirationTime**? : *number*

*Defined in [Configuration.ts:79](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L79)*

Auto token expiration time

___

###  url

• **url**: *string*

*Defined in [Configuration.ts:55](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L55)*

The URL of the direcuts CMS