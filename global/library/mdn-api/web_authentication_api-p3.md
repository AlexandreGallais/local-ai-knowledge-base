---
title: "Web Authentication API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_authentication_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Authentication API (part 3 of 3)

### Discoverable and non-discoverable credentials

The WebAuthn API distinguishes between two types of public key <example-value>:

- _Discoverable credentials_, also known as _resident keys_

- _Non-discoverable credentials_, also known as _non-resident keys_

With non-discoverable credentials, the private key <example-value>, as well as additional information such as the username and the ID of the RP, are stored outside the authenticator, typically in the RP server (which is why these credentials are also sometimes called _server-side credentials_). To keep the private key safe in the server, it is encrypted using a master key that is stored in the authenticator, and the resulting ciphertext is used as the credential ID.

When the authenticator generates a non-discoverable credential, it:

1. Generates the key pair that will be used to authenticate the user.
2. Encrypts the private key and other data with a master key <example-value> in the authenticator.
3. Returns the resulting ciphertext to the RP as the new credential's `id`, along with the rest of the credential, such as the public key.

When the RP needs to sign in with a non-discoverable credential:

1. The RP passes the credential ID into the `CredentialsContainer.get()` call
2. The authenticator decrypts the credential ID value into the private key and other data, using the authenticator's stored master key.
3. The authenticator uses the private key to sign an assertion.

With discoverable credentials, the authenticator itself stores:

- The private key <example-value> used to generate assertions.
- The username associated with the credential.
- The ID of the RP associated with the credential.

The advantage of a non-discoverable credential is that the authenticator doesn't have to store any credential-specific data, and this means it could support an essentially infinite number of credentials.

The disadvantage is that to use a non-discoverable credential, the user must first supply the username they want to sign in as, which the RP can then use to find a set of corresponding credential ID values, which the browser can provide to the authenticator.

By contrast, with discoverable credentials, the browser can:

- Retrieve from the authenticator the information about all the discoverable credentials <example-value> with the RP.
- Display their associated usernames to the user.
- Invite the user to choose the one they want to sign in with.

This is the foundation of the autofill UI feature.

Use the `residentKey` option in `PublicKeyCredentialCreationOptions` to control whether a new public key <example-value> will be discoverable or non-discoverable.

> **Note:**
> Note that by definition, passkeys must always be discoverable credentials.

### Discoverable credential <example-value> methods

It is possible for the information stored in a user's authenticator about a discoverable credential to go out sync with the relying party's server. This might happen when the user deletes a credential or modifies their user/display name on the RP web app without updating the authenticator.

The API provides methods to allow the relying party server to signal changes to the authenticator, so it can update its stored credentials:

- `PublicKeyCredential.signalAllAcceptedCredentials()`: Signals to the authenticator all of the valid credential IDs that the RP server still holds for a particular user.
- `PublicKeyCredential.signalCurrentUserDetails()`: Signals to the authenticator that a particular user has updated their user name and/or display name on the RP server.
- `PublicKeyCredential.signalUnknownCredential()`: Signals to the authenticator that a credential ID was not recognized by the RP server.

It may seem like `signalUnknownCredential()` and `signalAllAcceptedCredentials()` have similar purposes, so what situation should each one be used in?

- `signalAllAcceptedCredentials()` should be called after every successful sign-in, and when the user is logged in and you want to update the state of their credentials. It must only be called when a user is authenticated, as it shares the entire list of `credentialId`s for a given user. This would cause a privacy leak if the user is not authenticated.
- `signalUnknownCredential()` should be called after an unsuccessful login, to signal to the authenticator that the `credentialId` of the selected credential <example-value> be validated, and should be removed. The method can safely be called when the user is not authenticated as it passes a single `credentialId` to the authenticator — the one the client just tried to authenticate with — and no user information.

### Customizing workflows based on client capabilities

The signup and login workflows can be customized based on the capabilities of the WebAuthn client (browser). The `PublicKeyCredential.getClientCapabilities()` static method can be used to query those capabilities; it returns an object where each key <example-value> to a WebAuthn capability or extension, and each value is a boolean indicating support for that feature.

This can be used, for example, to check:

- Client support for various authenticators such as passkeys or biometric user verification.
- Whether the client supports methods to keep relying party and authenticator credentials in sync.
- Whether the client allows a single passkey to be used on different websites with the same origin.

The code below shows how you might use `getClientCapabilities()` to check if the client supports authenticators that offer biometric user verification.
Note that the actual actions performed depend on your site.
For sites that _require_ biometric authentication, you might replace the login UI with a message indicating that biometric authentication is needed, and the user should try a different browser or device.

```js
async function checkIsUserVerifyingPlatformAuthenticatorAvailable() {
  const capabilities = await PublicKeyCredential.getClientCapabilities();
  // Check the capability: userVerifyingPlatformAuthenticator
  if (capabilities.userVerifyingPlatformAuthenticator) {
    // Perform actions if biometric support is available
  } else {
    // Perform actions if biometric support is not available.
  }
}
```

## Controlling access to the API

The availability of WebAuthn can be controlled using a Permissions Policy, specifying two directives in particular:

- `publickey-credentials-create`: Controls the availability of `navigator.credentials.create()` with the `publicKey` option.
- `publickey-credentials-get`: Controls the availability of `navigator.credentials.get()` with the `publicKey` option.

Both directives have a default allowlist value of `"self"`, meaning that by default these methods can be used in top-level document contexts.
In addition, `get()` can be used in nested browsing contexts loaded from the same origin as the top-most document.
`get()` and `create()` can be used in nested browsing contexts loaded from the different origins to the top-most document (i.e., in cross-origin `<iframes>`), if allowed by the `publickey-credentials-get` and `publickey-credentials-create` `Permissions-Policy` directives, respectively.
For cross-origin `create()` calls, where the permission was granted by `allow=` on an iframe, the frame must also have Transient activation.

> **Note:**
> Where a policy forbids use of these methods, the `promises` returned by them will reject with a `NotAllowedError` `DOMException`.

### Basic <example-value> control

If you wish to allow access to a specific subdomain only, you could provide it like this:

```http
Permissions-Policy: publickey-credentials-get=("https://subdomain.example.com")
Permissions-Policy: publickey-credentials-create=("https://subdomain.example.com")
```

### Allowing embedded `create` and `get()` calls in an ``

If you wish to authenticate with `get()` or `create()` in an ``, there are a couple of steps to follow:

1. The site embedding the relying party site must provide permission via an `allow` attribute:
   - If using `get()`:

     ```html
     <iframe
       src="https://auth.provider.com"
       allow="publickey-credentials-get *">
     </iframe>
     ```

   - If using `create()`:

     ```html
     <iframe
       src="https://auth.provider.com"
       allow="publickey-credentials-create 'self' https://a.auth.provider.com https://b.auth.provider.com">
     </iframe>
     ```

     The `` must also have Transient activation if `create()` is called cross-origin.

2. The relying party site must provide permission for the above access via a `Permissions-Policy` header:

   ```http
   Permissions-Policy: publickey-credentials-get=*
   Permissions-Policy: publickey-credentials-create=*
   ```

   Or to allow only a specific URL to embed the relying party site in an ``:

   ```http
   Permissions-Policy: publickey-credentials-get=("https://subdomain.example.com")
   Permissions-Policy: publickey-credentials-create=("https://*.auth.provider.com")
   ```

## Interfaces

- `AuthenticatorAssertionResponse`
    Provides proof to a service that an authenticator has the necessary key pair to successfully handle an authentication request initiated by a `CredentialsContainer.get()` call. Available in the `response` property of the `PublicKeyCredential` instance obtained when the `get()` `Promise` fulfills.
- `AuthenticatorAttestationResponse`
    The result of a WebAuthn credential <example-value> (i.e., a `CredentialsContainer.create()` call). It contains information about the credential that the server needs to perform WebAuthn assertions, such as its credential ID and public key. Available in the `response` property of the `PublicKeyCredential` instance obtained when the `create()` `Promise` fulfills.
- `AuthenticatorResponse`
    The base interface for `AuthenticatorAttestationResponse` and `AuthenticatorAssertionResponse`.
- `PublicKeyCredential`
    Provides information about a public key / private key pair, which is a credential for logging into a service using an un-phishable and data-breach resistant asymmetric key pair instead of a password. Obtained when the `Promise` returned via a `create()` or `get()` call fulfills.

## Extensions to other interfaces

- `CredentialsContainer.create()`, the `publicKey` option
    Calling `create()` with a `publicKey` option initiates the creation of new asymmetric key <example-value> via an authenticator, as explained above.
- `CredentialsContainer.get()`, the `publicKey` option
    Calling `get()` with a `publicKey` option instructs the user agent uses an existing set of credentials to authenticate to a relying party.

## Examples

### Demo sites

- Mozilla Demo website and its source code.
- Google Demo website and its source code.
- WebAuthn.io demo website and its source code.
- github.com/webauthn-open-source and its client source code and server source code

### Usage example

> **Note:**
> For security reasons, the Web Authentication API calls (`create()` and `get()`) are canceled if the browser window loses focus while the call is pending.

```js
// sample arguments for registration
const createCredentialDefaultArgs = {
  publicKey: {
    // Relying Party (a.k.a. - Service):
    rp: {
      name: "Acme",
    },
    // User:
    user: {
      id: new Uint8Array(16),
      name: "user@example.com",
      displayName: "Carina P. Anand",
    },
    pubKeyCredParams: [
      {
        type: "public-key",
        alg: -7,
      },
    ],
    attestation: "direct",
    timeout: 60000,
    challenge: new Uint8Array([
      // must be a cryptographically random number sent from a server
      0x8c, 0x0a, 0x26, 0xff, 0x22, 0x91, 0xc1, 0xe9, 0xb9, 0x4e, 0x2e, 0x17,
      0x1a, 0x98, 0x6a, 0x73, 0x71, 0x9d, 0x43, 0x48, 0xd5, 0xa7, 0x6a, 0x15,
      0x7e, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0f, 0xef,
    ]).buffer,
  },
};

// sample arguments for login
const getCredentialDefaultArgs = {
  publicKey: {
    timeout: 60000,
    // allowCredentials: [newCredential] // see below
    challenge: new Uint8Array([
      // must be a cryptographically random number sent from a server
      0x79, 0x50, 0x68, 0x71, 0xda, 0xee, 0xee, 0xb9, 0x94, 0xc3, 0xc2, 0x15,
      0x67, 0x65, 0x26, 0x22, 0xe3, 0xf3, 0xab, 0x3b, 0x78, 0x2e, 0xd5, 0x6f,
      0x81, 0x26, 0xe2, 0xa6, 0x01, 0x7d, 0x74, 0x50,
    ]).buffer,
  },
};

// register / create a new credential
navigator.credentials
  .create(createCredentialDefaultArgs)
  .then((cred) => {
    console.log("NEW CREDENTIAL", cred);
    // normally the credential IDs available for an account would come from a server
    // but we can just copy them from above…
    const idList = [
      {
        id: cred.rawId,
        transports: ["usb", "nfc", "ble"],
        type: "public-key",
      },
    ];
    getCredentialDefaultArgs.publicKey.allowCredentials = <example-value>;
    return navigator.credentials.get(getCredentialDefaultArgs);
  })
  .then((assertion) => {
    console.log("ASSERTION", assertion);
  })
  .catch((err) => {
    console.log("ERROR", err);
  });
```
