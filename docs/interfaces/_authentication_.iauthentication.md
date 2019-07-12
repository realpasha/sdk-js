> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / ["Authentication"](../modules/_authentication_.md) / [IAuthentication](_authentication_.iauthentication.md) /

# Interface: IAuthentication

## Hierarchy

* **IAuthentication**

## Implemented by

* [Authentication](../classes/_authentication_.authentication.md)

### Index

#### Properties

* [refreshInterval](_authentication_.iauthentication.md#optional-refreshinterval)

#### Methods

* [isLoggedIn](_authentication_.iauthentication.md#isloggedin)
* [login](_authentication_.iauthentication.md#login)
* [logout](_authentication_.iauthentication.md#logout)
* [refresh](_authentication_.iauthentication.md#refresh)
* [refreshIfNeeded](_authentication_.iauthentication.md#refreshifneeded)

## Properties

### `Optional` refreshInterval

• **refreshInterval**? : *number*

*Defined in [Authentication.ts:27](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Authentication.ts#L27)*

## Methods

###  isLoggedIn

▸ **isLoggedIn**(): *boolean*

*Defined in [Authentication.ts:28](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Authentication.ts#L28)*

**Returns:** *boolean*

___

###  login

▸ **login**(`credentials`: [ILoginCredentials](_schemes_auth_login_.ilogincredentials.md), `options?`: [ILoginOptions](_schemes_auth_login_.iloginoptions.md)): *`Promise<ILoginResponse>`*

*Defined in [Authentication.ts:29](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Authentication.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`credentials` | [ILoginCredentials](_schemes_auth_login_.ilogincredentials.md) |
`options?` | [ILoginOptions](_schemes_auth_login_.iloginoptions.md) |

**Returns:** *`Promise<ILoginResponse>`*

___

###  logout

▸ **logout**(): *void*

*Defined in [Authentication.ts:30](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Authentication.ts#L30)*

**Returns:** *void*

___

###  refresh

▸ **refresh**(`token`: string): *`Promise<IRefreshTokenResponse>`*

*Defined in [Authentication.ts:32](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Authentication.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *`Promise<IRefreshTokenResponse>`*

___

###  refreshIfNeeded

▸ **refreshIfNeeded**(): *`Promise<[boolean, Error]>`*

*Defined in [Authentication.ts:31](https://github.com/janbiasi/sdk-js/blob/6d04a0b/src/Authentication.ts#L31)*

**Returns:** *`Promise<[boolean, Error]>`*