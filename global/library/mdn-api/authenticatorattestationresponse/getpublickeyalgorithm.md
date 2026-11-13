---
title: "AuthenticatorAttestationResponse: getPublicKeyAlgorithm() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorattestationresponse/getpublickeyalgorithm/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorAttestationResponse: getPublicKeyAlgorithm() method

The **`getPublicKeyAlgorithm()`** method of the `AuthenticatorAttestationResponse` interface returns a number that is equal to a COSE Algorithm Identifier, representing the cryptographic algorithm used for the new credential.

This is a convenience function created to allow easy access to the algorithm type. This information will need to be stored in order to verify future authentication operations (i.e., using `navigator.credentials.get()`).

## Syntax

```js
getPublicKeyAlgorithm()
```

### Parameters

None.

### Return value

A number that is equal to a COSE Algorithm Identifier, representing the cryptographic algorithm used for the new credential.

## Examples

See Creating a public key <example-value> for a detailed example.
