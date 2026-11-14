---
title: "AuthenticatorAssertionResponse: userHandle property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorassertionresponse/userhandle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorAssertionResponse: userHandle property

The **`userHandle`** read-only property of the `AuthenticatorAssertionResponse` interface is an `ArrayBuffer` object providing an opaque identifier for the given user. Such an identifier can be used by the relying party's server to link the user account with its corresponding credentials and other data.

This value is specified as `user.id` in the options passed to the originating `navigator.credentials.create()` call.

## Value

An `ArrayBuffer` object representing an identifier for the current user. This is not intended to be human-readable. The relying party should make sure that the `user.id` passed into the originating `create()` call does **not** contain any personally identifying information (for example user name, email, or phone number).

For `navigator.credentials.create()` calls made with a non-empty `allowCredentials` properties, the returned `userHandle` may be null.

## Examples

See Retrieving a public key <example-value> for a detailed example.

## See also

- `CredentialsContainer.create()` that sets the value of this property
