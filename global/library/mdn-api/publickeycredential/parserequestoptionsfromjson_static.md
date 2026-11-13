---
title: "PublicKeyCredential: parseRequestOptionsFromJSON() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/parserequestoptionsfromjson_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: parseRequestOptionsFromJSON() static method

The **`parseRequestOptionsFromJSON()`** static method of the `PublicKeyCredential` interface converts a JSON type representation into a `PublicKeyCredentialRequestOptions` instance.

The method is a convenience function for converting information provided by a relying server to a web app in order to request an existing credential.

## Syntax

```js
PublicKeyCredential.parseRequestOptionsFromJSON(options)
```

### Parameters

- `options`
    An object with the same structure as a `PublicKeyCredentialRequestOptions` instance, but with base64url-encoded strings used in place of buffer properties.

### Return value

A `PublicKeyCredentialRequestOptions` instance.

### Exceptions

- `EncodingError` `DOMException`
    Thrown if any part of the `options` object cannot be converted into a `PublicKeyCredentialRequestOptions` instance.
- `SecurityError` `DOMException`
    The RP domain is not valid.

## Description

The Web Authentication process for authenticating a (registered) user involves a relying party server sending the web app information needed to find an existing credential, including details about the user identity, the relying party, a "challenge", and optionally where to look for the credential: for example on a local built-in authenticator, or on an external one over USB, BLE, and so on.
The web app passes this information to an authenticator to find the credential, by calling `navigator.credentials.get()` with an argument that contains the server-supplied data as a `PublicKeyCredentialRequestOptions` instance

The specification does not define how the information needed for requesting a credential is sent.
A convenient approach is for the server to encapsulate the information in a JSON type representation of a `PublicKeyCredentialRequestOptions` instance, that mirrors its structure but encodes buffer properties such as the `challenge` as base64url strings.
This object can be serialized to a JSON string, sent to the web app and deserialized, and then converted to a `PublicKeyCredentialRequestOptions` instance using **`parseRequestOptionsFromJSON()`**.

## Examples

When authorizing an already registered user, a relying party server will supply the web app with information about the requested credentials, the relying party, and a challenge.
The code below defines this information in the form described in the `options` parameter above:

```js
const requestCredentialOptionsJSON = {
  challenge: new Uint8Array([139, 66, 181, 87, 7, 203 /* … */]),
  rpId: "acme.com",
  allowCredentials: [
    {
      type: "public-key",
      id: new Uint8Array([64, 66, 25, 78, 168, 226, 174 /* … */]),
    },
  ],
  userVerification: "required",
};
```

Because this object only uses JSON data types, it can be serialized to JSON using `JSON.stringify()` and sent to the web app.

```js
JSON.stringify(requestCredentialOptionsJSON);
```

The web app can deserialize the JSON string back to a `requestCredentialOptionsJSON` object (not shown).
The **`parseRequestOptionsFromJSON()`** method is used to convert that object to the form that can be used in `navigator.credentials.get()`:

```js
// Convert options to form used by get()
const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(
  requestCredentialOptionsJSON, // JSON-type representation
);

navigator.credentials
  .get({ publicKey })
  .then((returnedCredentialInfo) => {
    // Handle the returned credential <example-value> here.
  })
  .catch((err) => {
    console.error(err);
  });
```

## See also

- Web Authentication API
- `PublicKeyCredential.parseCreationOptionsFromJSON()`
