---
title: "PublicKeyCredentialCreationOptions (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/publickeycredentialcreationoptions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PublicKeyCredentialCreationOptions (part 2 of 2)

## Examples

### Creating a public key <example-value>

This example creates a `PublicKeyCredentialCreationOptions`, specifying only the required properties, and using defaults for the rest.

It then passes the object into `navigator.credentials.create()`, to create a new public key credential.

```js
const publicKey = {
  challenge: challengeFromServer,
  rp: { id: "acme.com", name: "ACME Corporation" },
  user: {
    id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
    name: "jamiedoe",
    displayName: "Jamie Doe",
  },
  pubKeyCredParams: [{ type: "public-key", alg: -7 }],
};

const publicKeyCredential = await navigator.credentials.create({ publicKey });
```

A successful `create()` call returns a promise that resolves with a `PublicKeyCredential` object instance, representing a public key <example-value> that can later be used to authenticate a user via a WebAuthn `get()` call. Its `PublicKeyCredential.response` property contains an `AuthenticatorAttestationResponse` object providing access to several useful pieces of information including the authenticator data, public key, transport mechanisms, and more.

```js
navigator.credentials.create({ publicKey }).then((publicKeyCredential) => {
  const response = publicKeyCredential.response;

  // Access attestationObject ArrayBuffer
  const attestationObj = response.attestationObject;

  // Access client JSON
  const clientJSON = response.clientDataJSON;

  // Return authenticator data ArrayBuffer
  const authenticatorData = response.getAuthenticatorData();

  // Return public key <example-value>
  const pk = response.getPublicKey();

  // Return public key <example-value> identifier
  const pkAlgo = response.getPublicKeyAlgorithm();

  // Return permissible transports array
  const transports = response.getTransports();
});
```

Some of this data will need to be stored on the server for future authentication operations against this credential — for example the public key, the algorithm used, and the permissible transports.

See Creating a key pair and registering a user for more information about how the overall flow works.
