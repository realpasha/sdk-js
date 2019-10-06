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

* [login](_authentication_.iauthentication.md#login)
* [logout](_authentication_.iauthentication.md#logout)
* [refresh](_authentication_.iauthentication.md#refresh)
* [refreshIfNeeded](_authentication_.iauthentication.md#refreshifneeded)

## Properties

### `Optional` refreshInterval

• **refreshInterval**? : *number*

*Defined in [Authentication.ts:30](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L30)*

## Methods

###  login

▸ **login**(`credentials`: [ILoginCredentials](_schemes_auth_login_.ilogincredentials.md), `options?`: [ILoginOptions](_schemes_auth_login_.iloginoptions.md)): *`Promise<ILoginResponse>`*

*Defined in [Authentication.ts:31](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`credentials` | [ILoginCredentials](_schemes_auth_login_.ilogincredentials.md) |
`options?` | [ILoginOptions](_schemes_auth_login_.iloginoptions.md) |

**Returns:** *`Promise<ILoginResponse>`*

___

###  logout

▸ **logout**(): *`Promise<ILogoutResponse>`*

*Defined in [Authentication.ts:32](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L32)*

**Returns:** *`Promise<ILogoutResponse>`*

___

###  refresh

▸ **refresh**(`token`: string): *`Promise<IRefreshTokenResponse>`*

*Defined in [Authentication.ts:34](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *`Promise<IRefreshTokenResponse>`*

___

###  refreshIfNeeded

▸ **refreshIfNeeded**(): *`Promise<[boolean, Error]>`*

*Defined in [Authentication.ts:33](https://github.com/direcuts/sdk-js/tree/master/Authentication.ts#L33)*

**Returns:** *`Promise<[boolean, Error]>`*