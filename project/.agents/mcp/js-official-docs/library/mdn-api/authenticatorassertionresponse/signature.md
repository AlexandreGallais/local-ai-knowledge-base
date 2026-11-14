---
title: "AuthenticatorAssertionResponse: signature property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorassertionresponse/signature/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorAssertionResponse: signature property

The **`signature`** read-only property of the
`AuthenticatorAssertionResponse` interface is an `ArrayBuffer`
object which is the signature of the authenticator for both
`AuthenticatorAssertionResponse.authenticatorData` and a SHA-256 hash of
the client data
(`AuthenticatorAssertionResponse.clientDataJSON`).

This signature will be sent to the server for control, as part of the response. It
provides the proof that an authenticator does possess the private key which was used for
the credential's generation.

## Value

An `ArrayBuffer` object which the signature of the authenticator (using its
private key) for both `AuthenticatorAssertionResponse.authenticatorData`
and a SHA-256 hash given by the client for its data (the challenge, the origin, etc. and
available from
`AuthenticatorAssertionResponse.clientDataJSON`).

## Examples

See Retrieving a public key <example-value> for a detailed example.
