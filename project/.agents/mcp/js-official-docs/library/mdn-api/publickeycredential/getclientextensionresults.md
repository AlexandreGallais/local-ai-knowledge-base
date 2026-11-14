---
title: "PublicKeyCredential: getClientExtensionResults() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredential/getclientextensionresults/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredential: getClientExtensionResults() method

The **`getClientExtensionResults()`** method of the `PublicKeyCredential` interface returns an object mapping the identifiers of extensions requested during credential <example-value> or authentication, and their results after processing by the user agent.

During the creation or fetching of a `PublicKeyCredential` (via `navigator.credentials.create()` and `navigator.credentials.get()` respectively), it is possible to request "custom" processing by the client for different extensions, specified in the `publicKey` option's `extensions` property. You can find more information about requesting the different extensions in Web Authentication extensions.

> **Note:**
> `getClientExtensionResults()` only returns the results from extensions processed by the user agent (client). The results from extensions processed by the authenticator can be found in the authenticator data available in `AuthenticatorAssertionResponse.authenticatorData`.

## Syntax

```js
getClientExtensionResults()
```

### Parameters

None.

### Return value

An object with each entry being an extensions' identifier string as the key, and the output from the processing of the extension by the client as the value.

### Exceptions

- `SecurityError` `DOMException`
    The RP domain is not valid.

## Examples

```js
const publicKey = {
  // Here are the extension "inputs"
  extensions: {
    appid: "https://accounts.example.com",
  },
  allowCredentials: {
    id: "fgrt46jfgd...",
    transports: ["usb", "nfc"],
    type: "public-key",
  },
  challenge: new Uint8Array(16) /* from the server */,
};

navigator.credentials
  .get({ publicKey })
  .then((publicKeyCred) => {
    const myResults = publicKeyCred.getClientExtensionResults();
    // myResults will contain the output of processing the "appid" extension
  })
  .catch((err) => {
    console.error(err);
  });
```

## Browser compatibility

> **Note:**
> Extensions are optional and different browsers may recognize different extensions. Processing extensions is always optional for the client: if a browser does not recognize a given extension, it will just ignore it. For information on which extensions are supported by which browsers, see Web Authentication extensions.

## See also

- The list of the currently defined extensions
- `AuthenticatorAssertionResponse.authenticatorData` which contains the
  result of the authenticator's extensions processing
