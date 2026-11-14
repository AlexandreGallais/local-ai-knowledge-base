---
title: "AuthenticatorResponse: clientDataJSON property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/authenticatorresponse/clientdatajson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AuthenticatorResponse: clientDataJSON property

The **`clientDataJSON`** property of the `AuthenticatorResponse` interface stores a JSON string in an
`ArrayBuffer`, representing the client data that was passed to `navigator.credentials.create()` or `navigator.credentials.get()`. This property is only accessed on one of the child objects of `AuthenticatorResponse`, specifically `AuthenticatorAttestationResponse` or `AuthenticatorAssertionResponse`.

## Value

An `ArrayBuffer`.

## Instance properties

After the `clientDataJSON` object is converted from an
`ArrayBuffer` to a JavaScript object, it will have the following properties:

- `challenge`
    The base64url
    encoded version of the cryptographic challenge sent from the relying party's server.
    The original value are passed as the `challenge` option in
    `CredentialsContainer.get()` or
    `CredentialsContainer.create()`.

- `crossOrigin` (optional)
    A boolean. If set to `true`, it means that the calling context is an `` that is not same origin with its ancestor frames.

- `origin`
    The fully qualified origin of the relying party which has been given by the
    client/browser to the authenticator. We should expect the _relying party's
    id_ to be a suffix of this value.

- `tokenBinding` (optional) (deprecated)
    An object describing the state of the token <example-value> protocol for the communication with the relying party. It has two properties:
    - `status`: A string which is either `"supported"` which
      indicates the client support token <example-value> but did not negotiate with the relying
      party or `"<example-value>"` when token <example-value> was used already
    - `id`: A string which is the base64url
      encoding of the token <example-value> ID which was used for the communication.

    Should this property be absent, it would indicate that the client does not support
    token binding.

    > **Note:**
    > `tokenBinding` is deprecated as of Level 3 of the spec, but the field is reserved so that it won't be reused for a different purpose.

- `topOrigin` (optional)
    Contains the fully qualified top-level origin of the relying party. It is set only if it `crossOrigin` is `true`.

- `type`
    A string which is either `"webauthn.get"` when an existing credential is
    retrieved or `"webauthn.create"` when a new credential is created.

## Examples

```js
function arrayBufferToStr(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

// pk is a PublicKeyCredential that is the result of a create() or get() Promise
const clientDataStr = arrayBufferToStr(pk.response.clientDataJSON);
const clientDataObj = JSON.parse(clientDataStr);

console.log(clientDataObj.type); // "webauthn.create" or "webauthn.get"
console.log(clientDataObj.challenge); // base64 encoded String containing the original challenge
console.log(clientDataObj.origin); // the window.origin
```
