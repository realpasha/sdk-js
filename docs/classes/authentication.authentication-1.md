> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / [Authentication](../modules/authentication.md) / [Authentication](authentication.authentication-1.md) /

# Class: Authentication

Handles all authentication related logic, decoupled from the core

**`author`** Jan Biasi <biasijan@gmail.com>

## Hierarchy

* **Authentication**

## Implements

* [IAuthentication](../interfaces/authentication.iauthentication.md)

### Index

#### Constructors

* [constructor](authentication.authentication-1.md#constructor)

#### Properties

* [config](authentication.authentication-1.md#private-config)
* [inject](authentication.authentication-1.md#private-inject)
* [onAutoRefreshError](authentication.authentication-1.md#private-optional-onautorefresherror)
* [onAutoRefreshSuccess](authentication.authentication-1.md#private-optional-onautorefreshsuccess)
* [refreshInterval](authentication.authentication-1.md#optional-refreshinterval)

#### Methods

* [getPayload](authentication.authentication-1.md#private-getpayload)
* [isLoggedIn](authentication.authentication-1.md#isloggedin)
* [login](authentication.authentication-1.md#login)
* [logout](authentication.authentication-1.md#logout)
* [refresh](authentication.authentication-1.md#refresh)
* [refreshIfNeeded](authentication.authentication-1.md#refreshifneeded)
* [startInterval](authentication.authentication-1.md#private-startinterval)
* [stopInterval](authentication.authentication-1.md#private-stopinterval)

## Constructors

###  constructor

\+ **new Authentication**(`config`: [IConfiguration](../interfaces/configuration.iconfiguration.md), `inject`: [IAuthenticationInjectableProps](../interfaces/authentication.iauthenticationinjectableprops.md)): *[Authentication](authentication.authentication-1.md)*

*Defined in [Authentication.ts:59](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L59)*

Creates a new authentication instance

**`constructor`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | [IConfiguration](../interfaces/configuration.iconfiguration.md) | - |
`inject` | [IAuthenticationInjectableProps](../interfaces/authentication.iauthenticationinjectableprops.md) |   |

**Returns:** *[Authentication](authentication.authentication-1.md)*

## Properties

### `Private` config

• **config**: *[IConfiguration](../interfaces/configuration.iconfiguration.md)*

*Defined in [Authentication.ts:67](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L67)*

___

### `Private` inject

• **inject**: *[IAuthenticationInjectableProps](../interfaces/authentication.iauthenticationinjectableprops.md)*

*Defined in [Authentication.ts:67](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L67)*

___

### `Private` `Optional` onAutoRefreshError

• **onAutoRefreshError**? : *function*

*Defined in [Authentication.ts:53](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L53)*

Optional customized error handler

#### Type declaration:

▸ (`msg`: [IAuthenticationRefreshError](../interfaces/authentication.iauthenticationrefresherror.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`msg` | [IAuthenticationRefreshError](../interfaces/authentication.iauthenticationrefresherror.md) |

___

### `Private` `Optional` onAutoRefreshSuccess

• **onAutoRefreshSuccess**? : *function*

*Defined in [Authentication.ts:59](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L59)*

Optional customized success handler

#### Type declaration:

▸ (`config`: [IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [IConfigurationValues](../interfaces/configuration.iconfigurationvalues.md) |

___

### `Optional` refreshInterval

• **refreshInterval**? : *number*

*Implementation of [IAuthentication](../interfaces/authentication.iauthentication.md).[refreshInterval](../interfaces/authentication.iauthentication.md#optional-refreshinterval)*

*Defined in [Authentication.ts:47](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L47)*

Current set auto-refresh interval or undefined

**`type`** {number|undefined}

## Methods

### `Private` getPayload

▸ **getPayload**<**T**>(): *`T`*

*Defined in [Authentication.ts:252](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L252)*

Gets the payload of the current token, return type can be generic

**Type parameters:**

▪ **T**: *object*

The payload response type, arbitrary object

**Returns:** *`T`*

___

###  isLoggedIn

▸ **isLoggedIn**(): *boolean*

*Implementation of [IAuthentication](../interfaces/authentication.iauthentication.md)*

*Defined in [Authentication.ts:78](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L78)*

If the current auth status is logged in

**Returns:** *boolean*

___

###  login

▸ **login**(`credentials`: [ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md), `options?`: [ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md)): *`Promise<ILoginResponse>`*

*Implementation of [IAuthentication](../interfaces/authentication.iauthentication.md)*

*Defined in [Authentication.ts:99](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L99)*

Login to the API; Gets a new token from the API and stores it in this.token.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`credentials` | [ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md) | User login credentials |
`options?` | [ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md) | Additional options regarding persistance and co. |

**Returns:** *`Promise<ILoginResponse>`*

___

###  logout

▸ **logout**(): *void*

*Implementation of [IAuthentication](../interfaces/authentication.iauthentication.md)*

*Defined in [Authentication.ts:149](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L149)*

Logs the user out by "forgetting" the token, and clearing the refresh interval

**Returns:** *void*

___

###  refresh

▸ **refresh**(`token`: string): *`Promise<IRefreshTokenResponse>`*

*Implementation of [IAuthentication](../interfaces/authentication.iauthentication.md)*

*Defined in [Authentication.ts:221](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L221)*

Use the passed token to request a new one.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | string |   |

**Returns:** *`Promise<IRefreshTokenResponse>`*

___

###  refreshIfNeeded

▸ **refreshIfNeeded**(): *`Promise<RefreshIfNeededResponse>`*

*Implementation of [IAuthentication](../interfaces/authentication.iauthentication.md)*

*Defined in [Authentication.ts:165](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L165)*

Refresh the token if it is about to expire (within 30 seconds of expiry date).
- Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
- Calls onAutoRefreshError if refreshing the token fails for some reason.

**Returns:** *`Promise<RefreshIfNeededResponse>`*

___

### `Private` startInterval

▸ **startInterval**(`fireImmediately?`: boolean): *void*

*Defined in [Authentication.ts:231](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L231)*

Starts an interval of 10 seconds that will check if the token needs refreshing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fireImmediately?` | boolean | If it should immediately call [refreshIfNeeded]  |

**Returns:** *void*

___

### `Private` stopInterval

▸ **stopInterval**(): *void*

*Defined in [Authentication.ts:242](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L242)*

Clears and nullifies the token refreshing interval

**Returns:** *void*