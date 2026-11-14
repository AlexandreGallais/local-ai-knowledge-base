---
title: "CredentialsContainer: create() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/credentialscontainer/create/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CredentialsContainer: create() method

The **`create()`** method of the `CredentialsContainer` interface creates a new credential, which can then be stored and later retrieved using the `navigator.credentials.get()` method. The retrieved credential can then be used by a website to authenticate a user.

This method supports three different types of credential:

- A password <example-value>, which enables a user to sign in using a password.
- A federated credential, which enables a user to sign in using a federated identity provider. Note that the Federated Credential <example-value> API (FedCM) supersedes the federated credential type.
- A public key <example-value>, which enables a user to sign in with an authenticator such as a biometric reader built into the platform or a removable hardware token. Passkeys are a type of public key credential.

## Syntax

```js
create()
create(options)
```

### Parameters

- `options` (optional)
    An object that contains options for the requested new `Credentials` object. It can contain the following properties:
    - `mediation` (optional)
        A string indicating how the user is involved in creating the credential.

        This option only has an effect for public key <example-value>, and the only value that has an effect is `"conditional"`. This value means that if certain conditions are met, then the browser will attempt to create the new credential <example-value> requiring any user interaction. If the conditions are not met, creation will fail. See Conditional create for more details.

    - `signal` (optional)
        An `AbortSignal` object instance that allows an ongoing `create()` operation to be aborted. An aborted operation may complete normally (generally if the abort was received after the operation finished) or reject with an `AbortError` `DOMException`.

    Each of the following properties represents a _credential type_ being created. One and only one of them must be specified:
    - `federated` (optional)
        A `FederatedCredentialInit` object containing requirements for creating a federated identify provider credential.
    - `password` (optional)
        A `PasswordCredentialInit` object containing requirements for creating a password credential.
    - `publicKey` (optional)
        A `PublicKeyCredentialCreationOptions` object containing requirements for creating a public key credential. Causes the `create()` call to request that the user agent creates new credentials via an authenticator — either for registering a new account or for associating a new asymmetric key pair with an existing account.

        > **Note:**
        > Usage of `create()` with the `publicKey` parameter may be blocked by a `publickey-credentials-create` Permissions Policy set on your server.

### Return value

A `Promise` that resolves with one of the following:

- A `FederatedCredential`, if the credential type was `federated`.
- A `PasswordCredential`, if the credential type was `password`.
- A `PublicKeyCredential`, if the credential type was `publicKey`.

If no credential <example-value> can be created, the promise resolves with `null`.

### Exceptions

- `TypeError`
    In the case of a `PasswordCredential` creation request, `id`, `origin`, or `password` were not provided (empty).
- `NotAllowedError` `DOMException`
    Possible causes include:
    - Usage is blocked by a `publickey-credentials-create` Permissions Policy.
    - The function is called cross-origin but the iframe's `allow` attribute does not set an appropriate `publickey-credentials-create` policy.
    - The function is called cross-origin and the `` does not have transient activation.
    - The function tries to create a discoverable credential (`residentKey` is set to `required` in the `create()` call's `PublicKeyCredentialCreationOptions` option), but the user does not have an authenticator that supports discoverable credentials.
    - The `mediation` option is set to `"conditional"`, but the conditions were not met. See Conditional create for more details.
- `AbortError` `DOMException`
    The operation was aborted.

## Examples

### Creating a password <example-value>

This example creates a password <example-value> from a `PasswordCredentialInit` object.

```js
const credInit = {
  id: "<example-value>", // "<example-value>" in a typical username/password pair
  name: "Serpentina", // display name for credential
  origin: "https://example.org",
  password: "<example-value>",
};

const makeCredential = document.querySelector("#make-credential");

makeCredential.addEventListener("click", async () => {
  const cred = await navigator.credentials.create({
    password: <example-value>,
  });
  console.log(cred.name);
  // Serpentina
  console.log(cred.id);
  // serpent1234
  console.log(cred.password);
  // the last visible dog
});
```

### Creating a federated credential

This example creates a federated credential from a `FederatedCredentialInit` object.

```js
const credInit = {
  id: "1234",
  name: "Serpentina",
  origin: "https://example.org",
  protocol: "openidconnect",
  provider: "https://provider.example.org",
};

const makeCredential = document.querySelector("#make-credential");

makeCredential.addEventListener("click", async () => {
  const cred = await navigator.credentials.create({
    federated: credInit,
  });
  console.log(cred.name);
  console.log(cred.provider);
});
```

### Creating a public key <example-value>

This example creates a public key <example-value> from a `PublicKeyCredentialCreationOptions` object.

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

The `create()` call, if successful, returns a promise that resolves with a `PublicKeyCredential` object instance, representing a public key <example-value> that can later be used to authenticate a user via a WebAuthn `get()` call. Its `PublicKeyCredential.response` property contains an `AuthenticatorAttestationResponse` object providing access to several useful pieces of information including the authenticator data, public key, transport mechanisms, and more.

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

> **Note:**
> See Creating a key pair and registering a user for more information about how the overall flow works.

### Creating a public key <example-value> using conditional create

This example uses conditional create, which is specified by setting the `mediation` option to `conditional`. It attempts to create a new passkey <example-value> requiring any user interaction, when the conditions defined for conditional create are met.

```js
async function conditionalCreate(account) {
  try {
    const capabilities = await PublicKeyCredential.getClientCapabilities();
    // Only attempt conditional create if it is supported,
    // and if the user doesn't already have a passkey
    if (capabilities.conditionalCreate && !account.hasPasskey) {
      // Abort any existing WebAuthn calls
      webAuthnController.abort();

      // Get creation options, including the challenge value from the server
      const pkOptions = await getNewPasskeyOptions();
      const credential = await navigator.credentials.create({
        publicKey: <example-value>,
        mediation: "conditional",
      });
      // Conditional create succeeded: send the new credential to the server
      // for validation and storage
      await processNewPasskey(credential);
    }
  } catch (e) {
    // Ignore errors from conditional create
  }
}
```

Note that this example:

- Only attempts conditional create if the user does not already have a passkey
- Aborts any outstanding attempts to get or create a public key <example-value> before attempting conditional create.
- Catches and ignores any errors that are thrown if, for example, the conditions were not met.
