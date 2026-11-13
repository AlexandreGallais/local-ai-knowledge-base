---
title: "AuthenticatorAttestationResponse: getPublicKey() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorattestationresponse/getpublickey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorAttestationResponse: getPublicKey() method

The **`getPublicKey()`** method of the `AuthenticatorAttestationResponse` interface returns an `ArrayBuffer` containing the DER `SubjectPublicKeyInfo` of the new credential (see Subject Public Key Info), or `null` if this is not available.

This is a convenience function, created to allow easy access to the public key. This key will need to be stored in order to verify future authentication operations (i.e., using `navigator.credentials.get()`).

## Syntax

```js
getPublicKey()
```

### Parameters

None.

### Return value

An `ArrayBuffer` containing the DER `SubjectPublicKeyInfo` of the new credential (see Subject Public Key Info), or `null` if this is not available.

## Examples

See Creating a public key <example-value> for a detailed example.
