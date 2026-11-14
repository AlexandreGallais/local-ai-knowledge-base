---
title: "AuthenticatorAssertionResponse"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorassertionresponse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorAssertionResponse

The **`AuthenticatorAssertionResponse`** interface of the Web Authentication API contains a digital signature from the private key of a particular WebAuthn credential. The relying party's server can verify this signature to authenticate a user, for example when they sign in.

An `AuthenticatorAssertionResponse` object instance is available in the `response` property of a `PublicKeyCredential` object returned by a successful `navigator.credentials.get()` call.

This interface inherits from `AuthenticatorResponse`.

> **Note:**
> This interface is restricted to top-level contexts. Use from within an `` element will not have any effect.

## Instance properties

_Also inherits properties from its parent, `AuthenticatorResponse`._

- `AuthenticatorAssertionResponse.authenticatorData` (read-only)
    An `ArrayBuffer` containing information from the authenticator such as the Relying Party ID Hash (rpIdHash), a signature counter, test of user presence and user verification flags, and any extensions processed by the authenticator.
- `AuthenticatorResponse.clientDataJSON` (read-only)
    Contains the JSON-compatible serialization of the data passed from the browser to the authenticator in order to authenticate with this credential — i.e., when `CredentialsContainer.get()` is called with a `publicKey` option. This data contains some information from the options passed into the `get()` call, and some information controlled by the browser.
- `AuthenticatorAssertionResponse.signature` (read-only)
    An assertion signature over `AuthenticatorAssertionResponse.authenticatorData` and `AuthenticatorResponse.clientDataJSON`. The assertion signature is created with the private key of the key pair that was created during the originating `navigator.credentials.create()` call and verified using the public key of that same key pair.
- `AuthenticatorAssertionResponse.userHandle` (read-only)
    An `ArrayBuffer` containing an opaque user identifier, specified as `user.id` in the options passed to the originating `navigator.credentials.create()` call.

## Instance methods

None.

## Examples

See Retrieving a public key <example-value> for a detailed example.

## See also

- `AuthenticatorAttestationResponse`: the interface for the type of response given when creating a new credential
- `AuthenticatorResponse`: the parent interface
