> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["Configuration"](../modules/_configuration_.md) / [IConfigurationOptions](_configuration_.iconfigurationoptions.md) /

# Interface: IConfigurationOptions

## Hierarchy

* **IConfigurationOptions**

### Index

#### Properties

* [localExp](_configuration_.iconfigurationoptions.md#optional-localexp)
* [persist](_configuration_.iconfigurationoptions.md#optional-persist)
* [project](_configuration_.iconfigurationoptions.md#optional-project)
* [token](_configuration_.iconfigurationoptions.md#optional-token)
* [tokenExpirationTime](_configuration_.iconfigurationoptions.md#optional-tokenexpirationtime)
* [url](_configuration_.iconfigurationoptions.md#url)

## Properties

### `Optional` localExp

• **localExp**? : *number*

*Defined in [Configuration.ts:61](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L61)*

Default login expiration as number in ms

___

### `Optional` persist

• **persist**? : *boolean*

*Defined in [Configuration.ts:65](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L65)*

If the token should be persitated or rehydrated

___

### `Optional` project

• **project**? : *string*

*Defined in [Configuration.ts:57](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L57)*

Project namespace

___

### `Optional` token

• **token**? : *string*

*Defined in [Configuration.ts:53](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L53)*

The token to authenticate if preferred

___

### `Optional` tokenExpirationTime

• **tokenExpirationTime**? : *number*

*Defined in [Configuration.ts:69](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L69)*

Auto token expiration time

___

###  url

• **url**: *string*

*Defined in [Configuration.ts:49](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Configuration.ts#L49)*

The URL of the direcuts CMS