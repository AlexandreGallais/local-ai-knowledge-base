---
title: "AuthenticatorAssertionResponse: authenticatorData property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorassertionresponse/authenticatordata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorAssertionResponse: authenticatorData property

The **`authenticatorData`** read-only property of the `AuthenticatorAssertionResponse` interface returns an `ArrayBuffer` containing information from the authenticator such as the Relying Party ID Hash (rpIdHash), a signature counter, test of user presence, user verification flags, and any extensions processed by the authenticator.

## Value

An `ArrayBuffer` with a `byteLength` of at least 37 bytes, which contains the data structure explained in Authenticator data.

## Examples

See Retrieving a public key <example-value> for a detailed example.
