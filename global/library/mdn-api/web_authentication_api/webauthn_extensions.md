---
title: "Web Authentication extensions (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_authentication_api/webauthn_extensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Authentication extensions

The Web Authentication API has a system of extensions — extra functionality that can be requested during credential <example-value> (`navigator.credentials.create()`) or authentication (`navigator.credentials.get()`) operations. This article explains how to request WebAuthn extensions, retrieve information about the responses from those requests, and the available extensions — including browser support and expected inputs and outputs.

## How to use WebAuthn extensions

When invoking `navigator.credentials.create()` or `navigator.credentials.get()`, the `publicKey` object parameter required to initiate a WebAuthn flow can include an `extensions` property. The value of `extensions` is itself an object, the properties of which are the input values for any extensions the relying party wishes to request the use of in the method you call.

Behind the scenes, the inputs are processed by the user agent and/or the authenticator.

For example, in a `publicKey` object for a `create()` call, we might want to request the use of two extensions:

1. The `credProps` extension. Relying parties set `credProps` to request that the browser tells the relying party whether the credential is resident/discoverable after registration. This is useful when calling `create()` with `publicKey.authenticatorSelection.residentKey = "preferred"`. To request it, you also need to set `publicKey.extensions.credProps = true` when the browser makes a credential and, depending on the type of authenticator used, it will be discoverable (for example, the FIDO2 authenticator would typically make it discoverable; FIDO1/U2F security key would be non-discoverable). `credProps` is processed by the user agent only.
2. The `minPinLength` extension allows relying parties to request the authenticator's minimum PIN length. This requires `extensions.minPinLength` to be set to `true`. `minPinLength` is processed by the authenticator, with the user agent only serving to pass the input data along to it.

```js
const publicKey = {
  challenge: new Uint8Array([117, 61, 252, 231, 191, 241 /* … */]),
  rp: { id: "acme.com", name: "ACME Corporation" },
  user: {
    id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
    name: "jamiedoe",
    displayName: "Jamie Doe",
  },
  pubKeyCredParams: [{ type: "public-key", alg: -7 }],
  authenticatorSelection: {
    residentKey: "preferred",
  },
  extensions: {
    credProps: true,
    minPinLength: true,
  },
};
```

We can then pass the `publicKey` object into a `create()` call to initiate the credential <example-value> flow:

```js
navigator.credentials.create({ publicKey });
```

## Retrieving extension request results

If successful, the `create()` call will return a `Promise` that resolves with a `PublicKeyCredential` object. Once extension processing has completed, the results of the processing are communicated in the response (although not in all cases — it is possible for extensions to have no output).

```js
navigator.credentials
  .create({ publicKey })
  .then((publicKeyCred) => {
    const myClientExtResults = publicKeyCred.getClientExtensionResults();
    // myClientExtResults will contain the output of processing
    // the "credProps" extension

    const authData = publicKeyCred.response.getAuthenticatorData();
    // authData will contain authenticator data, which will include
    // authenticator extension processing results, i.e., minPinLength
  })
  .catch((err) => {
    console.error(err);
  });
```

As demonstrated by the above code snippet, there are two different places to find your output extension results:

1. You can find the results of client (user agent) extension processing by calling the `PublicKeyCredential.getClientExtensionResults()` method. This returns a `map`, with each entry being an extensions' identifier string as the key, and the output from the processing of the extension by the client as the value. In the example above, if the browser supported the `credProps` extension and it was processed correctly, the `myClientExtResults` map object would contain one entry, `"credProps"`, with a value of `{ rk: true }`. This would verify that the created credential is indeed discoverable.

2. You can find the results of authenticator extension processing in the authenticator data for the operation:
   - In the case of `PublicKeyCredential`s returned from successful `create()` calls, this can be returned via a call to `publicKeyCredential.response.getAuthenticatorData()`.
   - In the case of `PublicKeyCredential`s returned from successful `get()` calls, this can be found in the `publicKeyCredential.response.authenticatorData` property.

   Authenticator data takes the form of an `ArrayBuffer` with a consistent structure — see authenticator data. The authenticator extension results data is always found in a section at the end, as a CBOR map representing the results. See `AuthenticatorAssertionResponse.authenticatorData` for a detailed description of the complete authenticator data structure.

   Back to our example, if the relying party is authorized to receive the `minPinLength` value, the authenticator data would contain a representation of it in the following form: `"minPinLength": uint`.
