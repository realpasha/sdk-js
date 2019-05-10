[@directus/sdk-js](../README.md) > ["types"](../modules/_types_.md)

# External module: "types"

## Index

### Interfaces

* [IRequestError](../interfaces/_types_.irequesterror.md)
* [IRequestResponse](../interfaces/_types_.irequestresponse.md)

### Type aliases

* [DirectusResponse](_types_.md#directusresponse)
* [HashAlgorithm](_types_.md#hashalgorithm)
* [PrimaryKeyType](_types_.md#primarykeytype)

---

## Type aliases

<a id="directusresponse"></a>

###  DirectusResponse

**Ƭ DirectusResponse**: *`Promise`<`T`>*

*Defined in [types.ts:45](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/types.ts#L45)*

Arbitrary wrapper for any kind of responses. Mostly used together with the Response scheme to define the responded data

*__see__*: IResponse ./schemes/Response

*__example__*:   
  
`type NumberResponse = DirectusResponse<number>;`  
// this would define the response "100" or "-192"  
  
`type MyResponse = DirectusResponse<IResponse<{ name: string }>>;`  
this would define a fully featured directus response like: { meta: { ... }, data: { name: "Max Mustermann" } ... }  
  
`type MyMultiResponse = DirectusResponse<IResponse<{ age: number }[]>>;`  
this would define a fully featured array directus response like: { meta: { ... }, data: \[{ age: 58 }, { age: 31 }\] }

___
<a id="hashalgorithm"></a>

###  HashAlgorithm

**Ƭ HashAlgorithm**: *"core" \| "bcrypt" \| "sha1" \| "sha224" \| "sha256" \| "sha384" \| "sha512"*

*Defined in [types.ts:47](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/types.ts#L47)*

___
<a id="primarykeytype"></a>

###  PrimaryKeyType

**Ƭ PrimaryKeyType**: *`string` \| `number`*

*Defined in [types.ts:22](https://github.com/janbiasi/sdk-js/blob/0ae3664/src/types.ts#L22)*

Logging in promise

*__promise__*: LoginPromise

*__fulfill__*: {Object} Object containing URL, ENV, and TOKEN

*__reject__*: {Error} Network error (if no connection to API)

*__reject__*: {Error} Directus error (eg not logged in or 404)

___

