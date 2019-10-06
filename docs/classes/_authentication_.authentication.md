> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["Authentication"](../modules/_authentication_.md) / [Authentication](_authentication_.authentication.md) /

# Class: Authentication

Handles all authentication related logic, decoupled from the core

**`author`** Jan Biasi <biasijan@gmail.com>

## Hierarchy

* **Authentication**

## Implements

* [IAuthentication](../interfaces/_authentication_.iauthentication.md)

### Index

#### Constructors

* [constructor](_authentication_.authentication.md#constructor)

#### Properties

* [config](_authentication_.authentication.md#private-config)
* [inject](_authentication_.authentication.md#private-inject)
* [onAutoRefreshError](_authentication_.authentication.md#private-optional-onautorefresherror)
* [onAutoRefreshSuccess](_authentication_.authentication.md#private-optional-onautorefreshsuccess)
* [refreshInterval](_authentication_.authentication.md#optional-refreshinterval)

#### Methods

* [getPayload](_authentication_.authentication.md#private-getpayload)
* [login](_authentication_.authentication.md#login)
* [logout](_authentication_.authentication.md#logout)
* [refresh](_authentication_.authentication.md#refresh)
* [refreshIfNeeded](_authentication_.authentication.md#refreshifneeded)
* [startInterval](_authentication_.authentication.md#private-startinterval)
* [stopInterval](_authentication_.authentication.md#private-stopinterval)

## Constructors

###  constructor

\+ **new Authentication**(`config`: [IConfiguration](../interfaces/_configuration_.iconfiguration.md), `inject`: [IAuthenticationInjectableProps](../interfaces/_authentication_.iauthenticationinjectableprops.md)): *[Authentication](_authentication_.authentication.md)*

*Defined in [Authentication.ts:61](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L61)*

Creates a new authentication instance

**`constructor`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | [IConfiguration](../interfaces/_configuration_.iconfiguration.md) | - |
`inject` | [IAuthenticationInjectableProps](../interfaces/_authentication_.iauthenticationinjectableprops.md) |   |

**Returns:** *[Authentication](_authentication_.authentication.md)*

## Properties

### `Private` config

• **config**: *[IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Authentication.ts:69](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L69)*

___

### `Private` inject

• **inject**: *[IAuthenticationInjectableProps](../interfaces/_authentication_.iauthenticationinjectableprops.md)*

*Defined in [Authentication.ts:69](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L69)*

___

### `Private` `Optional` onAutoRefreshError

• **onAutoRefreshError**? : *function*

*Defined in [Authentication.ts:55](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L55)*

Optional customized error handler

#### Type declaration:

▸ (`msg`: [IAuthenticationRefreshError](../interfaces/_authentication_.iauthenticationrefresherror.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`msg` | [IAuthenticationRefreshError](../interfaces/_authentication_.iauthenticationrefresherror.md) |

___

### `Private` `Optional` onAutoRefreshSuccess

• **onAutoRefreshSuccess**? : *function*

*Defined in [Authentication.ts:61](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L61)*

Optional customized success handler

#### Type declaration:

▸ (`config`: [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) |

___

### `Optional` refreshInterval

• **refreshInterval**? : *number*

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md).[refreshInterval](../interfaces/_authentication_.iauthentication.md#optional-refreshinterval)*

*Defined in [Authentication.ts:49](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L49)*

Current set auto-refresh interval or undefined

**`type`** {number|undefined}

## Methods

### `Private` getPayload

▸ **getPayload**<**T**>(): *`T`*

*Defined in [Authentication.ts:251](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L251)*

Gets the payload of the current token, return type can be generic

**Type parameters:**

▪ **T**: *object*

The payload response type, arbitrary object

**Returns:** *`T`*

___

###  login

▸ **login**(`credentials`: [ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md), `options?`: [ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md)): *`Promise<ILoginResponse>`*

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md)*

*Defined in [Authentication.ts:82](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L82)*

Login to the API; Gets a new token from the API and stores it in this.token.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`credentials` | [ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md) | User login credentials |
`options?` | [ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md) | Additional options regarding persistance and co. |

**Returns:** *`Promise<ILoginResponse>`*

___

###  logout

▸ **logout**(): *`Promise<ILogoutResponse>`*

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md)*

*Defined in [Authentication.ts:148](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L148)*

Logs the user out by "forgetting" the token, and clearing the refresh interval

**Returns:** *`Promise<ILogoutResponse>`*

___

###  refresh

▸ **refresh**(`token`: string): *`Promise<IRefreshTokenResponse>`*

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md)*

*Defined in [Authentication.ts:222](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L222)*

Use the passed token to request a new one.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | string |   |

**Returns:** *`Promise<IRefreshTokenResponse>`*

___

###  refreshIfNeeded

▸ **refreshIfNeeded**(): *`Promise<RefreshIfNeededResponse>`*

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md)*

*Defined in [Authentication.ts:166](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L166)*

Refresh the token if it is about to expire (within 30 seconds of expiry date).
- Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
- Calls onAutoRefreshError if refreshing the token fails for some reason.

**Returns:** *`Promise<RefreshIfNeededResponse>`*

___

### `Private` startInterval

▸ **startInterval**(`fireImmediately?`: boolean): *void*

*Defined in [Authentication.ts:230](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L230)*

Starts an interval of 10 seconds that will check if the token needs refreshing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fireImmediately?` | boolean | If it should immediately call [refreshIfNeeded]  |

**Returns:** *void*

___

### `Private` stopInterval

▸ **stopInterval**(): *void*

*Defined in [Authentication.ts:241](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L241)*

Clears and nullifies the token refreshing interval

**Returns:** *void*