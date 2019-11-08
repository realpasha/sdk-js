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

*Defined in [Configuration.ts:66](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L66)*

Default login expiration as number in ms

___

### `Optional` mode

• **mode**? : *[AuthModes](../modules/_authentication_.md#authmodes)*

*Defined in [Configuration.ts:74](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L74)*

Whether to use cookies or JWTs

___

### `Optional` persist

• **persist**? : *boolean*

*Defined in [Configuration.ts:70](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L70)*

If the token should be persitated or rehydrated

___

### `Optional` project

• **project**? : *string*

*Defined in [Configuration.ts:62](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L62)*

Project namespace

___

### `Optional` token

• **token**? : *string*

*Defined in [Configuration.ts:58](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L58)*

The token to authenticate if preferred

___

### `Optional` tokenExpirationTime

• **tokenExpirationTime**? : *number*

*Defined in [Configuration.ts:78](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L78)*

Auto token expiration time

___

###  url

• **url**: *string*

*Defined in [Configuration.ts:54](https://github.com/direcuts/sdk-js/tree/master/Configuration.ts#L54)*

The URL of the direcuts CMS