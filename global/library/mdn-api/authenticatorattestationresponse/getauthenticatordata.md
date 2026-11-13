---
title: "AuthenticatorAttestationResponse: getAuthenticatorData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorattestationresponse/getauthenticatordata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorAttestationResponse: getAuthenticatorData() method

The **`getAuthenticatorData()`** method of the `AuthenticatorAttestationResponse` interface returns an `ArrayBuffer` containing the authenticator data contained within the `AuthenticatorAttestationResponse.attestationObject` property.

This is a convenience function, created to allow easy access to the authenticator data without having to write extra parsing code to extract it from the `attestationObject`.

## Syntax

```js
getAuthenticatorData()
```

### Parameters

None.

### Return value

An `ArrayBuffer` with a `byteLength` of at least 37 bytes, which contains the data structure explained in Authenticator data.

This will be equivalent to the authenticator data contained within the `AuthenticatorAttestationResponse.attestationObject` property.

## Examples

See Creating a public key <example-value> for a detailed example.
