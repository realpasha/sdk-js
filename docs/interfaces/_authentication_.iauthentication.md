[@directus/sdk-js](../README.md) > ["Authentication"](../modules/_authentication_.md) > [IAuthentication](../interfaces/_authentication_.iauthentication.md)

# Interface: IAuthentication

## Hierarchy

**IAuthentication**

## Implemented by

* [Authentication](../classes/_authentication_.authentication.md)

## Index

### Properties

* [refreshInterval](_authentication_.iauthentication.md#refreshinterval)

### Methods

* [isLoggedIn](_authentication_.iauthentication.md#isloggedin)
* [login](_authentication_.iauthentication.md#login)
* [logout](_authentication_.iauthentication.md#logout)
* [refresh](_authentication_.iauthentication.md#refresh)
* [refreshIfNeeded](_authentication_.iauthentication.md#refreshifneeded)

---

## Properties

<a id="refreshinterval"></a>

### `<Optional>` refreshInterval

**● refreshInterval**: *`number`*

*Defined in [Authentication.ts:27](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L27)*

___

## Methods

<a id="isloggedin"></a>

###  isLoggedIn

▸ **isLoggedIn**(): `boolean`

*Defined in [Authentication.ts:28](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L28)*

**Returns:** `boolean`

___
<a id="login"></a>

###  login

▸ **login**(credentials: *[ILoginCredentials](_schemes_auth_login_.ilogincredentials.md)*, options?: *[ILoginOptions](_schemes_auth_login_.iloginoptions.md)*): `Promise`<[ILoginResponse](_schemes_response_login_.iloginresponse.md)>

*Defined in [Authentication.ts:29](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| credentials | [ILoginCredentials](_schemes_auth_login_.ilogincredentials.md) |
| `Optional` options | [ILoginOptions](_schemes_auth_login_.iloginoptions.md) |

**Returns:** `Promise`<[ILoginResponse](_schemes_response_login_.iloginresponse.md)>

___
<a id="logout"></a>

###  logout

▸ **logout**(): `void`

*Defined in [Authentication.ts:30](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L30)*

**Returns:** `void`

___
<a id="refresh"></a>

###  refresh

▸ **refresh**(token: *`string`*): `Promise`<[IRefreshTokenResponse](_schemes_response_token_.irefreshtokenresponse.md)>

*Defined in [Authentication.ts:32](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| token | `string` |

**Returns:** `Promise`<[IRefreshTokenResponse](_schemes_response_token_.irefreshtokenresponse.md)>

___
<a id="refreshifneeded"></a>

###  refreshIfNeeded

▸ **refreshIfNeeded**(): `Promise`<[`boolean`, `Error`]>

*Defined in [Authentication.ts:31](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L31)*

**Returns:** `Promise`<[`boolean`, `Error`]>

___

