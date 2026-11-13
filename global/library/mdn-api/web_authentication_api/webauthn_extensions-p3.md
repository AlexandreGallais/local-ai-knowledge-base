---
title: "Web Authentication extensions (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_authentication_api/webauthn_extensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Authentication extensions (part 3 of 3)

### `prf`

- Usable in: Registration (`create()`) and authentication (`get()`)
- Processed by: User agent
- Specification: Pseudo-random function extension (prf)

Allows a relying party to get outputs for either one or two inputs from a pseudo-random function (PRF) associated with a credential.
A PRF is effectively a random oracle — a function that returns a random value for any given input, but will always return the same value for the same input.

The ability to generate a random number associated with a user's credential is useful in a number of cryptographic applications.
For example, it can be used to generate a symmetric key for encrypting sensitive data, and that can only be decrypted by a user who has the seed and the associated authenticator.
It could similarly be used to create a symmetric key for end-to-end encryption, seeded with a value from the server and unique for that credential and session.

The extension allows you to pass <example-value> values of type `ArrayBuffer` or `TypedArray` to the authenticator, which will return the result of evaluating the value with the PRF of the associated credential.
This can be done in an assertion, as part of the authentication workflow — specifying the credential or credentials for which the result is to be evaluated.
It can also be done when creating a credential; but fewer authenticators support the generation of outputs when creating credentials.

#### Input

During a `create()` call, the `publicKey`'s `extensions` property may contain a `prf` property which has `eval` object with the property `first` and optional property `second`.
These properties are either `ArrayBuffer` or `TypedArray` instances that the contain values to pass to the PRF for the credential.

For example, the definition below might be used when creating a new credential in order to create a new symmetric key from a server-provided secret.

```js
({
  extensions: {
    prf: {
      eval: { first: new TextEncoder().encode("Salt for new symmetric key") },
    },
  },
});
```

The optional `second` property can be used if two random values need to be created for a credential, such as in a workflow where the encryption key is rotated on each session.
As an example of such a workflow, in each session you pass two salts: the `first` salt returns a value that can be used to decrypt the previous session data, while the `second` salt returns a value that can be used to encrypt this session data.
In subsequent sessions the `second` salt is moved to the position of the `first` salt, so the lifetime where a particular salt can be usefully compromised is bounded.

```js
({
  extensions: {
    prf: {
      eval: {
        first: currentSessionKey, // salt for current session
        second: nextSessionKey, // salt for next session
      },
    },
  },
});
```

The `create()` call may reject with the following exceptions:

- `NotSupportedError` `DomException`
  - The `evalByCredential` key is present in the `eval` object.

Note that evaluating a PRF when creating a credential may not be supported, and this would be reported in the output.
You could still try evaluating the PRF in an assertion as shown below.

During a `get()` call, the `publicKey`'s `extensions` property may contain a `prf` property with the `evalByCredential` sub-property.
This is an object that maps Base64 URL-encoded credential IDs to evaluation objects with the same form as shown above.
In other words, this allows you to specify values to evaluate for different credentials.

```js
({
  extensions: {
    prf: {
      evalByCredential: {
        "<credentialId>": { first: bufferOne, second: bufferTwo },
        // …
        "<credentialId2>": {
          first: anotherBufferOne,
          second: anotherBufferTwo,
        },
      },
    },
  },
});
```

The `get()` call may reject with the following exceptions:

- `NotSupportedError` `DomException`
    If `eval` is the `prf` object, or if `allowCredentials` is empty when `evalByCredential` is not empty.
- `SyntaxError` `DomException`
    Any key in `evalByCredential` is the empty string or is not a valid Base64 URL encoding, or does not match the id of some element with `publicKey.allowCredentials`.

#### Output

A successful `create()` call provides the following extension output if the registered credential <example-value> using the PRF when creating credentials.

```js
({
  prf: {
    enabled: true, // PRF can be used when creating credentials.
    results: { first: outputBuffer1, second: outputBuffer2 },
  },
});
```

The `enabled` property indicates whether the PRF can be used when creating credentials.
The `first` and `second` properties contain the result of evaluating `first` and `second` on the input, and `second` will be omitted if the corresponding input was not specified.

If the authenticator doesn't support using the PRF on creation, the output on `create()` will look like this:

```js
({
  prf: {
    enabled: false, // PRF cannot be used when creating credentials.
  },
});
```

A `get()` returns a same `prf` object with the same structure as `create()`, except that it omits the `enabled` key.
The object contains PRF values that correspond to the inputs for the credential that was selected by the user.

```js
({
  prf: {
    results: { first: outputBuffer1, second: outputBuffer2 },
  },
});
```

Note that `enabled` is only present as an output for `create()`, and indicates if PRF is supported by the authenticator when a credential is created.
If the authenticator doesn't support PRF at all, the result for the `get()` call will be:

```js
({
  prf: {},
});
```

## Specifications

There are a number of places that WebAuthn extensions are specified. IANA's WebAuthn Extension Identifiers provides a registry of all extensions, but bear in mind that some may be deprecated.

## Browser compatibility

The compatibility data for WebAuthn extensions has been broken down into two tables — extensions that can be used during credential <example-value> (`create()`), and extensions that can be used during authentication (`get()`). Some extensions are usable during both operations.
