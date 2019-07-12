[@directus/sdk-js](../README.md) > ["Authentication"](../modules/_authentication_.md) > [Authentication](../classes/_authentication_.authentication.md)

# Class: Authentication

Handles all authentication related logic, decoupled from the core

## Hierarchy

**Authentication**

## Implements

* [IAuthentication](../interfaces/_authentication_.iauthentication.md)

## Index

### Constructors

* [constructor](_authentication_.authentication.md#constructor)

### Properties

* [config](_authentication_.authentication.md#config)
* [inject](_authentication_.authentication.md#inject)
* [onAutoRefreshError](_authentication_.authentication.md#onautorefresherror)
* [onAutoRefreshSuccess](_authentication_.authentication.md#onautorefreshsuccess)
* [refreshInterval](_authentication_.authentication.md#refreshinterval)

### Methods

* [getPayload](_authentication_.authentication.md#getpayload)
* [isLoggedIn](_authentication_.authentication.md#isloggedin)
* [login](_authentication_.authentication.md#login)
* [logout](_authentication_.authentication.md#logout)
* [refresh](_authentication_.authentication.md#refresh)
* [refreshIfNeeded](_authentication_.authentication.md#refreshifneeded)
* [startInterval](_authentication_.authentication.md#startinterval)
* [stopInterval](_authentication_.authentication.md#stopinterval)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Authentication**(config: *[IConfiguration](../interfaces/_configuration_.iconfiguration.md)*, inject: *[IAuthenticationInjectableProps](../interfaces/_authentication_.iauthenticationinjectableprops.md)*): [Authentication](_authentication_.authentication.md)

*Defined in [Authentication.ts:56](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L56)*

Creates a new authentication instance

*__constructor__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| config | [IConfiguration](../interfaces/_configuration_.iconfiguration.md) |  \- |
| inject | [IAuthenticationInjectableProps](../interfaces/_authentication_.iauthenticationinjectableprops.md) |   |

**Returns:** [Authentication](_authentication_.authentication.md)

___

## Properties

<a id="config"></a>

### `<Private>` config

**● config**: *[IConfiguration](../interfaces/_configuration_.iconfiguration.md)*

*Defined in [Authentication.ts:64](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L64)*

___
<a id="inject"></a>

### `<Private>` inject

**● inject**: *[IAuthenticationInjectableProps](../interfaces/_authentication_.iauthenticationinjectableprops.md)*

*Defined in [Authentication.ts:64](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L64)*

___
<a id="onautorefresherror"></a>

### `<Private>``<Optional>` onAutoRefreshError

**● onAutoRefreshError**: *`function`*

*Defined in [Authentication.ts:50](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L50)*

Optional customized error handler

#### Type declaration
▸(msg: *[IAuthenticationRefreshError](../interfaces/_authentication_.iauthenticationrefresherror.md)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| msg | [IAuthenticationRefreshError](../interfaces/_authentication_.iauthenticationrefresherror.md) |

**Returns:** `void`

___
<a id="onautorefreshsuccess"></a>

### `<Private>``<Optional>` onAutoRefreshSuccess

**● onAutoRefreshSuccess**: *`function`*

*Defined in [Authentication.ts:56](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L56)*

Optional customized success handler

#### Type declaration
▸(config: *[IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | [IConfigurationValues](../interfaces/_configuration_.iconfigurationvalues.md) |

**Returns:** `void`

___
<a id="refreshinterval"></a>

### `<Optional>` refreshInterval

**● refreshInterval**: *`number`*

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md).[refreshInterval](../interfaces/_authentication_.iauthentication.md#refreshinterval)*

*Defined in [Authentication.ts:44](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L44)*

Current set auto-refresh interval or undefined

*__type__*: {number\|undefined}

___

## Methods

<a id="getpayload"></a>

### `<Private>` getPayload

▸ **getPayload**<`T`>(): `T`

*Defined in [Authentication.ts:249](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L249)*

Gets the payload of the current token, return type can be generic

**Type parameters:**

#### T :  `object`

The payload response type, arbitrary object

**Returns:** `T`

___
<a id="isloggedin"></a>

###  isLoggedIn

▸ **isLoggedIn**(): `boolean`

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md).[isLoggedIn](../interfaces/_authentication_.iauthentication.md#isloggedin)*

*Defined in [Authentication.ts:75](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L75)*

If the current auth status is logged in

**Returns:** `boolean`

___
<a id="login"></a>

###  login

▸ **login**(credentials: *[ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md)*, options?: *[ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md)*): `Promise`<[ILoginResponse](../interfaces/_schemes_response_login_.iloginresponse.md)>

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md).[login](../interfaces/_authentication_.iauthentication.md#login)*

*Defined in [Authentication.ts:96](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L96)*

Login to the API; Gets a new token from the API and stores it in this.token.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| credentials | [ILoginCredentials](../interfaces/_schemes_auth_login_.ilogincredentials.md) |  User login credentials |
| `Optional` options | [ILoginOptions](../interfaces/_schemes_auth_login_.iloginoptions.md) |  Additional options regarding persistance and co. |

**Returns:** `Promise`<[ILoginResponse](../interfaces/_schemes_response_login_.iloginresponse.md)>

___
<a id="logout"></a>

###  logout

▸ **logout**(): `void`

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md).[logout](../interfaces/_authentication_.iauthentication.md#logout)*

*Defined in [Authentication.ts:146](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L146)*

Logs the user out by "forgetting" the token, and clearing the refresh interval

**Returns:** `void`

___
<a id="refresh"></a>

###  refresh

▸ **refresh**(token: *`string`*): `Promise`<[IRefreshTokenResponse](../interfaces/_schemes_response_token_.irefreshtokenresponse.md)>

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md).[refresh](../interfaces/_authentication_.iauthentication.md#refresh)*

*Defined in [Authentication.ts:218](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L218)*

Use the passed token to request a new one.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| token | `string` |   |

**Returns:** `Promise`<[IRefreshTokenResponse](../interfaces/_schemes_response_token_.irefreshtokenresponse.md)>

___
<a id="refreshifneeded"></a>

###  refreshIfNeeded

▸ **refreshIfNeeded**(): `Promise`<[RefreshIfNeededResponse](../modules/_schemes_response_login_.md#refreshifneededresponse)>

*Implementation of [IAuthentication](../interfaces/_authentication_.iauthentication.md).[refreshIfNeeded](../interfaces/_authentication_.iauthentication.md#refreshifneeded)*

*Defined in [Authentication.ts:162](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L162)*

Refresh the token if it is about to expire (within 30 seconds of expiry date).

*   Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
*   Calls onAutoRefreshError if refreshing the token fails for some reason.

**Returns:** `Promise`<[RefreshIfNeededResponse](../modules/_schemes_response_login_.md#refreshifneededresponse)>

___
<a id="startinterval"></a>

### `<Private>` startInterval

▸ **startInterval**(fireImmediately?: *`boolean`*): `void`

*Defined in [Authentication.ts:228](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L228)*

Starts an interval of 10 seconds that will check if the token needs refreshing

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` fireImmediately | `boolean` |  If it should immediately call \[refreshIfNeeded\] |

**Returns:** `void`

___
<a id="stopinterval"></a>

### `<Private>` stopInterval

▸ **stopInterval**(): `void`

*Defined in [Authentication.ts:239](https://github.com/janbiasi/sdk-js/blob/a08c70e/src/Authentication.ts#L239)*

Clears and nullifies the token refreshing interval

**Returns:** `void`

___

