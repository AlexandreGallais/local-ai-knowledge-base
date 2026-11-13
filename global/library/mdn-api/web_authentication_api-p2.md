---
title: "Web Authentication API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_authentication_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Authentication API (part 2 of 3)

## WebAuthn concepts and usage

WebAuthn uses asymmetric (public-key) cryptography instead of passwords or SMS texts for registering, authenticating, and multi-factor authentication with websites. This has some benefits:

- **Protection against phishing:** An attacker who creates a fake login website can't login as the user because the signature changes with the origin of the website.
- **Reduced impact of data breaches:** Developers don't need to hash the public key, and if an attacker gets access to the public key used to verify the authentication, it can't authenticate because it needs the private key.
- **Invulnerable to password <example-value>:** Some users might reuse passwords, and an attacker may obtain the user's password for another website (e.g., via a data breach). Also, text passwords are much easier to brute-force than a digital signature.

Many websites already have pages that allow users to register new accounts or log into an existing account, and WebAuthn acts as a replacement or enhancement for the authentication part of the system. It extends the Credential <example-value> API, abstracting communication between the user agent and an authenticator and providing the following new functionality:

- When `navigator.credentials.create()` is used with the `publicKey` option, the user agent creates new credentials via an authenticator — either for registering a new account or for associating a new asymmetric key pair with an existing account.
  - When registering a new account, these credentials are stored on a server (also referred to as a service or a relying party) and can be subsequently used to log a user in.
  - The asymmetric key pair is stored in the authenticator, which can then be used to authenticate a user with a relying party for example during MFA. The authenticator may be embedded into the user agent, into an operating system, such as Windows Hello, or it may be a physical token, such as a USB or Bluetooth Security Key.
- When `navigator.credentials.get()` is used with the `publicKey` option, the user agent uses an existing set of credentials to authenticate to a relying party (either as the primary login or to provide an additional factor during MFA as described above).

In their most basic forms, both `create()` and `get()` receive a very large random number called the "<example-value>" from the server and return the challenge signed by the private key back to the server. This proves to the server that a user has the private key <example-value> for authentication without revealing any secrets over the network.

> **Note:**
> The "challenge" must be a buffer of random information at least 16 bytes in size.

### Creating a key pair and registering a user

To illustrate how the credential <example-value> process works, let's describe the typical flow that occurs when a user wants to register a credential to a relying party:

1. The relying party server sends user and relying party information to the web app handling the registration process, along with the "challenge", using an appropriate secure mechanism (for example Fetch or XMLHttpRequest).

   > **Note:**
   > The format for sharing information between the relying party server and the web app is up to the application.
   > A recommended approach is to exchange JSON type representation objects for credentials and credential options.
   > Convenience methods have been created in `PublicKeyCredential` for converting from the JSON representations to the form required by the authentication APIs: `parseCreationOptionsFromJSON()`, `parseRequestOptionsFromJSON()` and `PublicKeyCredential.toJSON()`.

2. The web app initiates generation of a new credential via the authenticator, on behalf of the relying party, via a `navigator.credentials.create()` call. This call is passed a `publicKey` option specifying device capabilities, e.g., whether the device provides its own user authentication (for example with biometrics).

   A typical `create()` call might look like so:

   ```js
   let credential = await navigator.credentials.create({
     publicKey: {
       challenge: new Uint8Array([117, 61, 252, 231, 191, 241 /* … */]),
       rp: { id: "acme.com", name: "ACME Corporation" },
       user: {
         id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
         name: "jamiedoe",
         displayName: "Jamie Doe",
       },
       pubKeyCredParams: [{ type: "public-key", alg: -7 }],
     },
   });
   ```

   The parameters of the `create()` call are passed to the authenticator, along with a SHA-256 hash that is signed to ensure that it isn't tampered with.

3. After the authenticator obtains user consent, it generates a key pair and returns the public key and optional signed attestation to the web app. This is provided when the `Promise` returned by the `create()` call fulfills, in the form of a `PublicKeyCredential` object instance (the `PublicKeyCredential.response` property contains the attestation information).

4. The web app forwards the `PublicKeyCredential` to the relying party server, again using an appropriate mechanism.

5. The relying party server stores the public key, coupled with the user identity, to remember the credential for future authentications. During this process, it performs a series of checks to ensure that the registration was complete and not tampered with. These include:
   1. Verifying that the challenge is the same as the challenge that was sent.
   2. Ensuring that the origin was the origin expected.
   3. Validating that the signature and attestation are using the correct certificate chain for the specific model of the authenticator used to generate the key pair in the first place.

> **Warning:**
> Attestation provides a way for a relying party to determine the provenance of an authenticator. Relying parties should not attempt to maintain allowlists of authenticators.

#### Conditional create

Many websites that want to adopt passkeys will have an existing userbase that uses passwords. These websites could ask users if they want to create a passkey <example-value> their existing password, but doing so can be an unwelcome interruption for users who are focused on signing in and actually using the site.

With _conditional create_, a website can create a new passkey for a user's account without requiring any user interaction at all, when certain conditions are met.

To request conditional create, a website calls `CredentialsContainer.create()` to create a new public key <example-value>, setting the `mediation` option to `"conditional"`.

- If the conditions are met, then the browser creates a new public key <example-value> without asking the user. If this is successful, then the browser may use a non-modal UI element to tell the user that the credential was created.

- If the conditions are not met, then the `create()` call rejects with an error, which the website can catch and discard.

The specification allows some leeway for browsers in determining whether the conditions are met. However, as a rule, conditional create is allowed if the user has already created a credential (such as a password) in the credential <example-value>, and has recently used that credential to sign into the site.

The rationale for this is that if the user already trusts the credential <example-value> to manage their account security, then they can trust the credential <example-value> to create a new passkey for them.

This means that the best time for a website to attempt conditional create is immediately after the user has successfully signed in, using a password that was stored in the credential manager.

Note that:

- Before attempting conditional create, a website must abort any existing WebAuthn `create()` or `get()` calls. This applies especially to conditional get, because these calls will wait until their conditions are met.
- Conditional create is not allowed from a cross-origin iframe: the call will reject with an `NotAllowedError` exception.
- The `AuthenticatorAttestationResponse.attestationObject` object returned from the `create()` call will always have the User Presence (UP) authenticator data flag set to `false`. This means that in the case of conditional creation, the server should not require this flag to be set.

The following code sample shows how a website might use conditional create:

```js
async function signInWithConditionalCreate() {
  const accountDetails = await signIn();
  try {
    conditionalCreate(accountDetails);
  } catch (e) {
    // Conditional create failed: ignore the error
  }
}

async function conditionalCreate(account) {
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
}
```

Note that the code:

- Attempts conditional create after a successful sign in.
- Only attempts conditional create if conditional create is supported and the user does not already have a passkey.
- Aborts any outstanding WebAuthn operations, by calling `abort()` on the `AbortController` associated with the `signal` that was passed into the operation.
- Attempts conditional create, then processes the new passkey if it is successful, or ignores the error if it isn't.

### Authenticating a user

After a user has registered with WebAuthn, they can authenticate (login) with the service. The authentication flow looks similar to the registration flow, the main differences being that authentication:

1. Doesn't require user or relying party information
2. Creates an assertion using the previously-generated key pair for the service, rather than the authenticator's key pair.

A typical authentication flow is as follows:

1. The relying party generates a "challenge" and sends it to the user agent using an appropriate secure mechanism, along with a list of relying party and user credentials. It can also indicate where to look for the credential, e.g., on a local built-in authenticator, or on an external one over USB, BLE, etc.

2. The browser asks the authenticator to sign the challenge via a `navigator.credentials.get()` call, which is passed the credentials in a `publicKey` option.

   A typical `get()` call might look like so:

   ```js
   let credential = await navigator.credentials.get({
     publicKey: {
       challenge: new Uint8Array([139, 66, 181, 87, 7, 203 /* … */]),
       rpId: "acme.com",
       allowCredentials: [
         {
           type: "public-key",
           id: new Uint8Array([64, 66, 25, 78, 168, 226, 174 /* … */]),
         },
       ],
       userVerification: "required",
     },
   });
   ```

   The parameters of the `get()` call are passed to the authenticator to handle the authentication.

3. If the authenticator contains one of the given credentials and is able to successfully sign the challenge, it returns a signed assertion to the web app after receiving user consent. This is provided when the `Promise` returned by the `get()` call fulfills, in the form of a `PublicKeyCredential` object instance (the `PublicKeyCredential.response` property contains the assertion information).

4. The web app forwards the signed assertion to the relying party server for the relying party to validate. The validation checks include:
   1. Using the public key that was stored during the registration request to validate the signature by the authenticator.
   2. Ensuring that the challenge that was signed by the authenticator matches the challenge that was generated by the server.
   3. Checking that the Relying Party ID is the one expected for this service.

5. Once verified by the server, the authentication flow is considered successful.

#### Autofill UI

Autofill UI, also sometimes called _conditional get_, is a feature that makes it easier for users to sign in using public key <example-value>, especially when they also have passwords for the site.

It's expected that websites that adopt passkeys will typically add them alongside existing support for password-based authentication, so a user might, for a given site, have a password, one or more passkeys, or both. In this situation, a UI that asks them which method they want to sign in with can be confusing: they might not remember which method they have for which account. Autofill UI helps with this problem, by inviting users to sign in with a passkey if and only if a suitable passkey is currently available.

To enable autofill UI, the website's sign-in page contains a form, which invites them to sign in. In the field for the username, the website includes an `autocomplete` value of "webauthn":

```html
<input type="text" name="username" autocomplete="username webauthn" />
```

When the page loads, the website first checks that conditional get is supported, and if it is, makes a call to `CredentialsContainer.get()`. The call:

- Passes `"conditional"` as the value of the `mediation` option.
- Omits the `allowCredentials` option, to indicate that any applicable credentials are acceptable.

```js
const support = await PublicKeyCredential.getClientCapabilities();
const supported = support.conditionalGet;

if (supported) {
  const options = {
    challenge: challengeFromServer,
    rpId: "example.com",
    userVerification: "required",
    // allowCredentials is omitted here
  };

  const assertion = await navigator.credentials.get({
    publicKey: <example-value>,
    mediation: "conditional",
  });
}
```

This will wait until the user has interacted with the username field.

If and when the user does interact with the field, the browser will ask any available authenticators for public key <example-value> that can be used to sign into this website, and display the associated usernames as autofill options for the user, alongside any saved passwords for the account. If the user selects one of these options, the browser will use that credential to sign the user in.

This essentially enables a website to provide a unified autofill, including both passwords and public key <example-value> for a single account.

> **Note:**
> Note that only discoverable credentials are included in calls that use conditional get, because the browser needs to request applicable credentials <example-value> knowing the credential ID values for them.
