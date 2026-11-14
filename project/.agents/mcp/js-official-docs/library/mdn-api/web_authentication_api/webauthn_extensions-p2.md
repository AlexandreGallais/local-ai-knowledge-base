---
title: "Web Authentication extensions (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_authentication_api/webauthn_extensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Authentication extensions (part 2 of 3)

## Available extensions

The extensions below do not represent an exhaustive list of all the extensions available. We have elected to document extensions that we know to be standardized and supported by at least one rendering engine.

### `appid`

- Usable in: Authentication (`get()`)
- Processed by: User agent
- Specification: FIDO AppID Extension (appid)

Allows a relying party to request an assertion for a credential <example-value> registered using the legacy FIDO U2F JavaScript API, avoiding the hassle of re-registering the credential. The `appid` is that API's equivalent to the `rpId` in WebAuthn (although bear in mind that `appid`s are in the form of URLs, whereas `rpId`s are in the form of domains).

#### Input

The `publicKey`'s `extensions` property must contain an `appid` property, the value of which is the application identifier used in the legacy API. For example:

```js
({
  extensions: {
    appid: "https://accounts.example.com",
  },
});
```

You must also list the FIDO U2F credential IDs in the `publicKey`'s `allowCredentials` property, for example:

```js
({
  allowCredentials: [
    {
      id: arrayBuffer, // needs to contain decoded binary form of id
      transports: ["nfc", "usb"],
      type: "public-key",
    },
  ],
});
```

#### Output

Outputs `appid: true` if the `appid` was successfully used for the assertion, or `appid: false` otherwise.

### `appidExclude`

- Usable in: Registration (`create()`)
- Processed by: User agent
- Specification: FIDO AppID Exclusion Extension (appidExclude)

Allows a relying party to exclude authenticators containing specified credentials <example-value> registered using the legacy FIDO U2F JavaScript API during registration. This is required because by default the contents of the `excludeCredentials` field are assumed to be WebAuthn credentials. When using this extension, you can include legacy FIDO U2F credentials <example-value> `excludeCredentials`, and they will be recognized as such.

#### Input

The `publicKey`'s `extensions` property must contain an `appidExclude` property, the value of which is the identifier of the relying party requesting to exclude authenticators by legacy FIDO U2F credentials. For example:

```js
({
  extensions: {
    appidExclude: "https://accounts.example.com",
  },
});
```

You can then list FIDO U2F credentials in the `publicKey`'s `excludeCredentials` property, for example:

```js
({
  excludeCredentials: [
    {
      id: arrayBuffer, // needs to contain decoded binary form of id
      transports: ["nfc", "usb"],
      type: "public-key",
    },
  ],
});
```

#### Output

Outputs `appidExclude: true` if the extension was acted upon, or `appidExclude: false` otherwise.

### `credProps`

- Usable in: Registration (`create()`)
- Processed by: User agent
- Specification: Credential <example-value> Extension (credProps)

Allows a relying party to request additional information/properties about the credential that was created. This is currently only useful when calling `create()` with `publicKey.authenticatorSelection.residentKey = "preferred"`; it requests information on whether the created credential is discoverable.

#### Input

The `publicKey`'s `extensions` property must contain a `credProps` property with a value of `true`:

```js
({
  extensions: {
    credProps: true,
  },
});
```

You must also set `authenticatorSelection.requireResidentKey` to `true`, which indicates that a resident key is required.

```js
({
  authenticatorSelection: {
    requireResidentKey: true,
  },
});
```

#### Output

Outputs the following if the registered `PublicKeyCredential` is a client-side discoverable credential:

```js
({
  credProps: {
    rk: true,
  },
});
```

If `rk` is set to `false` in the output, the credential is a server-side credential. If `rk` is not present in the output, then it is not known whether the credential is client-side discoverable or server-side.

### `credProtect`

- Usable in: Registration (`create()`)
- Processed by: Authenticator
- Specification: Credential <example-value> (credProtect)

Allows a relying party to specify a minimum credential <example-value> policy when creating a credential.

#### Input

The `publicKey`'s `extensions` property must contain a `credentialProtectionPolicy` property specifying the protection level of the credential to be created, and a boolean `enforceCredentialProtectionPolicy` property specifying whether the `create()` call should fail rather than creating a credential that does not conform to the specified policy:

```js
({
  extensions: {
    credentialProtectionPolicy: "userVerificationOptional",
    enforceCredentialProtectionPolicy: true,
  },
});
```

The available `credentialProtectionPolicy` values are as follows:

- `"userVerificationOptional"` (experimental)
    User verification is optional. The equivalent `credProtect` value sent to the authenticator for processing is `0x01`.
- `"userVerificationOptionalWithCredentialIDList"`
    User verification is optional only if the credential is discoverable (i.e., it is client-side discoverable). The equivalent `credProtect` value sent to the authenticator for processing is `0x02`.
- `"userVerificationRequired"`
    User verification is always required. The equivalent `credProtect` value sent to the authenticator for processing is `0x03`.

> **Note:**
> Chromium will default to `userVerificationOptionalWithCredentialIDList` or `userVerificationRequired`, depending on the type of request:
>
> - Chromium will request a protection level of `userVerificationOptionalWithCredentialIDList` when creating a credential if `residentKey` is set to `preferred` or `required`. (Setting `requireResidentKey` is treated the same as required.) This ensures that simple physical possession of a security key does not allow the presence of a discoverable credential for a given `rpId` to be queried.
> - Additionally, if `residentKey` is `required` and `userVerification` is preferred, the protection level will be increased to `userVerificationRequired`. This ensures that physical possession of a security key does not allow sign-in to a site that doesn't require user verification. (This is not complete protection; sites should still carefully consider the security of their users.)
> - If the site requests an explicit `credProtect` level, that will override these defaults. These defaults never cause the protection level to be lower than the security key's default if that is higher.
>
> Suppose the `enforceCredentialProtectionPolicy` value is `true`. In that case, the `create()` call will fail if the policy cannot be adhered to (for example, it requires user verification, but the authenticator does not support user verification). If it is `false`, the system will make the best attempt to create a credential that conforms to the policy, but it will still create one that conforms as closely as it can if this is not possible.

#### Output

If the `create()` call is successful, the authenticator data will contain a representation of the `credProtect` value representing the set policy in the following form:

```js
({ credProtect: 0x01 });
```

### `largeBlob`

- Usable in: Registration (`create()`) and authentication (`get()`)
- Processed by: User agent
- Specification: Large blob storage extension (largeBlob)

Allows a relying party to store blobs associated with a credential on the authenticator — for example, it may wish to directly store certificates rather than run a centralized authentication service.

#### Input

During a `create()` call, the `publicKey`'s `extensions` property must contain a `largeBlob` property with the following object structure:

```js
({
  extensions: {
    largeBlob: {
      support: "required",
    },
  },
});
```

The `support` property's value is a string, which can be one of the following:

- `"preferred"`: The credential will be created with an authenticator that can store blobs if possible, but it will still create one if not. The output' supported' property reports the authenticator's ability to store blobs.
- `"required"`: The credential will be created with an authenticator to store blobs. The `create()` call will fail if this is impossible.

During a `get()` call, the `publicKey`'s `extensions` property must contain a `largeBlob` property with one of two sub-properties — `read` or `write` (`get()` fails if both are present):

The `read` property is a boolean. A value of `true` indicates that the relying party would like to fetch a previously-written blob associated with the asserted credential:

```js
({
  extensions: {
    largeBlob: {
      read: true,
    },
  },
});
```

The `write` property takes as a value an `ArrayBuffer`, `TypedArray`, or `DataView` representing a blob that the relying party wants to store alongside an existing credential:

```js
({
  extensions: {
    largeBlob: {
      write: arrayBuffer,
    },
  },
});
```

> **Note:**
> For a write authentication operation to be successful, `publicKey.allowCredentials` must contain only a single element representing the credential you want the blob stored alongside.

#### Output

A successful `create()` call provides the following extension output if the registered credential is capable of storing blobs:

```js
({
  largeBlob: {
    supported: true, // false if it cannot store blobs
  },
});
```

A `get()` read call makes the blob available as an `ArrayBuffer` in the extension output if successful:

```js
({
  largeBlob: {
    blob: arrayBuffer,
  },
});
```

> **Note:**
> If unsuccessful, the `largeBlob` object will be returned, but `blob` will not be present.

A `get()` write call indicates whether the write operation was successful with a `written` boolean value in the extension output. A `true` value means it was written successfully to the associated authenticator, and `false` means it was unsuccessful.

```js
({
  largeBlob: {
    written: true,
  },
});
```

### `minPinLength`

- Usable in: Registration (`create()`)
- Processed by: Authenticator
- Specification: Minimum PIN Length Extension (minPinLength)

Allows relying parties to request the authenticator's minimum PIN length.

#### Input

The `publicKey`'s `extensions` property must contain a `minPinLength` property with a value of `true`:

```js
({
  extensions: {
    minPinLength: true,
  },
});
```

#### Output

If the relying party is authorized to receive the `minPinLength` value (if its `rpId` is present on the authenticator's authorized relying party list), the authenticator data will contain a representation of it in the following form:

```js
({ minPinLength: uint });
```

If the relying party is not authorized, the extension is ignored, and no `"minPinLength"` output value is provided.

### `payment`

- Usable in: Registration (`create()`)
- Processed by: User agent
- Specification: Secure Payment Confirmation

Allows a relying party to request the creation of a WebAuthn credential that may be used – by both the Relying Party and other parties – with Secure Payment Confirmation; see Using Secure Payment Confirmation.

#### Input

The inputs for the `payment` extension are defined in the AuthenticationExtensionsPaymentInputs dictionary

- `isPayment`
    A boolean that indicates that the extension is active.
- `rpID`
    The Relying Party id of the credential(s) being used. Only used at authentication time; not registration.
- `topOrigin`
    The origin of the top-level frame. Only used at authentication time; not registration.
- `payeeName`
    The payee name, if present, that was displayed to the user. Only used at authentication time; not registration.
- `payeeOrigin`
    The payee origin, if present, that was displayed to the user. Only used at authentication time; not registration.
- `total`
    The transaction amount that was displayed to the user. Only used at authentication time; not registration. The total is of type PaymentCurrencyAmount.
- `instrument`
    The instrument details that were displayed to the user. Only used at authentication time; not registration. The instrument is of type PaymentCredentialInstrument.

#### Output

None
