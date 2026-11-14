---
title: "PublicKeyCredential: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: toJSON() method

The **`toJSON()`** method of the `PublicKeyCredential` interface returns a JSON-serializable plain object representing the `PublicKeyCredential` object.

The method is automatically called by `JSON.stringify()` when a `PublicKeyCredential` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `authenticatorAttachment` (optional): not present if its value is `null`
- `clientExtensionResults`: a JSON-serializable object representing the values returned by `getClientExtensionResults()`, with buffer values encoded as base64url strings
- `id`
- `rawId`: encoded as a base64url string
- `response`: a JSON-serializable object representing the `AuthenticatorResponse` value, with buffer values encoded as base64url strings. Namely:
  - When it's an `AuthenticatorAssertionResponse`, contains the following properties:
    - `authenticatorData`
    - `clientDataJSON`
    - `signature`
    - `userHandle` (optional): not present if its value is `null`
  - When it's an `AuthenticatorAttestationResponse`, contains the following properties:
    - `attestationObject`
    - `authenticatorData`: the value returned by `getAuthenticatorData()`
    - `clientDataJSON`
    - `publicKey` (optional): the value returned by `getPublicKey()`, omitted if it is `null`
    - `publicKeyAlgorithm`: the value returned by `getPublicKeyAlgorithm()`
    - `transports`: the value returned by `getTransports()`
- `type`

Unless stated otherwise, each property's value is copied as-is.

### Exceptions

- `SecurityError` `DOMException`
    The RP domain is not valid.

## Examples

### Calling toJSON() directly

When registering a new user, a relying party server will supply information about the expected credentials to the web app.
The web app calls `navigator.credentials.create()` with the received information (`createCredentialOptions` below), which returns a promise that fulfills with the new credential (a `PublicKeyCredential`).

Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const credential = await navigator.credentials.create({
  publicKey: <example-value>,
});

const json = credential.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.id); // Same value as credential.id
```

### Serializing to a JSON string

The returned credential is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically. The web app posts the serialized credential back to the server.

```js
const jsonString = JSON.stringify(credential);
console.log(jsonString);

const registrationURL = "https://example.com/registration";
const apiRegOptsResp = await fetch(registrationURL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: jsonString,
});
```

This would log a JSON string like so (formatted for readability):

```json
{
  "authenticatorAttachment": "platform",
  "clientExtensionResults": {},
  "id": "...",
  "rawId": "...",
  "response": {
    "attestationObject": "...",
    "authenticatorData": "...",
    "clientDataJSON": "...",
    "publicKey": "...",
    "publicKeyAlgorithm": -7,
    "transports": ["internal"]
  },
  "type": "public-key"
}
```

The base64url-encoded values are abbreviated as `"..."` for readability.

## See also

- Web Authentication API
- `PublicKeyCredential.parseCreationOptionsFromJSON()`
- `PublicKeyCredential.parseRequestOptionsFromJSON()`
