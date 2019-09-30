> **[@directus/sdk-js](../README.md)**

[Globals](../README.md) / [Authentication](../modules/authentication.md) / [IAuthentication](authentication.iauthentication.md) /

# Interface: IAuthentication

## Hierarchy

* **IAuthentication**

## Implemented by

* [Authentication](../classes/authentication.authentication-1.md)

### Index

#### Properties

* [refreshInterval](authentication.iauthentication.md#optional-refreshinterval)

#### Methods

* [isLoggedIn](authentication.iauthentication.md#isloggedin)
* [login](authentication.iauthentication.md#login)
* [logout](authentication.iauthentication.md#logout)
* [refresh](authentication.iauthentication.md#refresh)
* [refreshIfNeeded](authentication.iauthentication.md#refreshifneeded)

## Properties

### `Optional` refreshInterval

• **refreshInterval**? : *number*

*Defined in [Authentication.ts:31](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L31)*

## Methods

###  isLoggedIn

▸ **isLoggedIn**(): *boolean*

*Defined in [Authentication.ts:32](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L32)*

**Returns:** *boolean*

___

###  login

▸ **login**(`credentials`: [ILoginCredentials](_schemes_auth_login_.ilogincredentials.md), `options?`: [ILoginOptions](_schemes_auth_login_.iloginoptions.md)): *`Promise<ILoginResponse>`*

*Defined in [Authentication.ts:33](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`credentials` | [ILoginCredentials](_schemes_auth_login_.ilogincredentials.md) |
`options?` | [ILoginOptions](_schemes_auth_login_.iloginoptions.md) |

**Returns:** *`Promise<ILoginResponse>`*

___

###  logout

▸ **logout**(): *void*

*Defined in [Authentication.ts:34](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L34)*

**Returns:** *void*

___

###  refresh

▸ **refresh**(`token`: string): *`Promise<IRefreshTokenResponse>`*

*Defined in [Authentication.ts:36](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *`Promise<IRefreshTokenResponse>`*

___

###  refreshIfNeeded

▸ **refreshIfNeeded**(): *`Promise<[boolean, Error]>`*

*Defined in [Authentication.ts:35](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L35)*

**Returns:** *`Promise<[boolean, Error]>`*