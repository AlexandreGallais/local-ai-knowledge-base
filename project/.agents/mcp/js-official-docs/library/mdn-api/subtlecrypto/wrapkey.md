---
title: "SubtleCrypto: wrapKey() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subtlecrypto/wrapkey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubtleCrypto: wrapKey() method

The **`wrapKey()`** method of the `SubtleCrypto` interface "wraps" a key.
This means that it exports the key in an external, portable format, then encrypts the exported key.
Wrapping a key helps protect it in untrusted environments, such as inside an otherwise unprotected data store or in transmission over an unprotected network.

As with `SubtleCrypto.exportKey()`, you specify an export format for the key.
To export a key, it must have `CryptoKey.extractable` set to `true`.

But because `wrapKey()` also encrypts the key to be exported, you also need to pass in the key that must be used to encrypt it.
This is sometimes called the "wrapping key".

The inverse of `wrapKey()` is `SubtleCrypto.unwrapKey()`: while `wrapKey` is composed of export + encrypt, `unwrapKey` is composed of import + decrypt.

## Syntax

```js
wrapKey(format, key, wrappingKey, wrapAlgo)
```

### Parameters

- `format`
    A string describing the data format in which the key will be exported before it is encrypted. It can be one of the following:
    - `raw`
        Raw format.
    - `pkcs8`
        PKCS #8 format.
    - `spki`
        SubjectPublicKeyInfo format.
    - `jwk`
        JSON Web Key format.
- `key`
    The `CryptoKey` to wrap.
- `wrappingkey`
    The `CryptoKey` used to encrypt the exported key. The key must have the `wrapKey` usage set.
- `wrapAlgo`
    An object specifying the algorithm
    to be used to encrypt the exported key, and any required extra parameters:
    - To use RSA-OAEP,
      pass an `RsaOaepParams` object.
    - To use AES-CTR,
      pass an `AesCtrParams` object.
    - To use AES-CBC,
      pass an `AesCbcParams` object.
    - To use AES-GCM,
      pass an `AesGcmParams` object.
    - To use AES-KW,
      pass the string `"AES-KW"`, or an object of the form `{ name: "AES-KW" }`.

### Return value

A `Promise` that fulfills with
an `ArrayBuffer`
containing the encrypted exported key.

### Exceptions

The promise is rejected when one of the following exceptions is encountered:

- `InvalidAccessError` `DOMException`
    Raised when the wrapping key is not a key for the requested wrap algorithm.
- `NotSupportedError` `DOMException`
    Raised when trying to use an algorithm that is either unknown or isn't suitable for
    encryption or wrapping.
- `TypeError`
    Raised when trying to use an invalid format.

## Supported algorithms

All algorithms that are usable for encryption are also usable for key <example-value>, as long as the key has the "wrapKey" usage set.
For key <example-value> you have the additional option of AES-KW.

### AES-KW

AES-KW is a way to use the AES cipher for key wrapping.

One advantage of using AES-KW over another AES mode such as AES-GCM is that AES-KW does not require an initialization vector.
To use AES-KW, the input must be a multiple of 64 bits.

AES-KW is specified in RFC 3394.

## Examples

> **Note:**
> You can try the working examples out on GitHub.

### Raw wrap

This example wraps an AES key.
It uses "<example-value>" as the export format and AES-KW, with a password-derived key, to encrypt it. See the complete code on GitHub.

```js
let salt;

/*
Get some key <example-value> to use as input to the deriveKey method.
The key <example-value> is a password <example-value> by the user.
*/
function getKeyMaterial() {
  const password = window.prompt("<example-value>");
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );
}

/*
Given some key <example-value> and some random salt
derive an AES-KW key using PBKDF2.
*/
function getKey(keyMaterial, salt) {
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-KW", length: 256 },
    true,
    ["wrapKey", "unwrapKey"],
  );
}

/*
Wrap the given key.
*/
async function wrapCryptoKey(keyToWrap) {
  // get the key <example-value> key
  const keyMaterial = await getKeyMaterial();
  salt = window.crypto.getRandomValues(new Uint8Array(16));
  const wrappingKey = await getKey(keyMaterial, salt);

  return window.crypto.subtle.wrapKey("raw", keyToWrap, wrappingKey, "AES-KW");
}

/*
Generate an encrypt/decrypt secret key,
then wrap it.
*/
window.crypto.subtle
  .generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  )
  .then((secretKey) => wrapCryptoKey(secretKey))
  .then((wrappedKey) => console.log(wrappedKey));
```

### PKCS #8 wrap

This example wraps an RSA private signing key. It uses "pkcs8" as the export format and
AES-GCM, with a password-derived key, to encrypt it.
See the complete code on GitHub.

```js
let salt;
let iv;

/*
Get some key <example-value> to use as input to the deriveKey method.
The key <example-value> is a password <example-value> by the user.
*/
function getKeyMaterial() {
  const password = window.prompt("<example-value>");
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );
}

/*
Given some key <example-value> and some random salt
derive an AES-GCM key using PBKDF2.
*/
function getKey(keyMaterial, salt) {
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["wrapKey", "unwrapKey"],
  );
}

/*
Wrap the given key.
*/
async function wrapCryptoKey(keyToWrap) {
  // get the key <example-value> key
  const keyMaterial = await getKeyMaterial();
  salt = window.crypto.getRandomValues(new Uint8Array(16));
  const wrappingKey = await getKey(keyMaterial, salt);
  iv = window.crypto.getRandomValues(new Uint8Array(12));

  return window.crypto.subtle.wrapKey("pkcs8", keyToWrap, wrappingKey, {
    name: "AES-GCM",
    iv,
  });
}

/*
Generate a sign/verify key pair,
then wrap the private key.
*/
window.crypto.subtle
  .generateKey(
    {
      name: "RSA-PSS",
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  )
  .then((keyPair) => wrapCryptoKey(keyPair.privateKey))
  .then((wrappedKey) => {
    console.log(wrappedKey);
  });
```

### SubjectPublicKeyInfo wrap

This example wraps an RSA public encryption key. It uses "<example-value>" as the export format and AES-CBC, with a password-derived key, to encrypt it.
See the complete code on GitHub.

```js
let salt;
let iv;

/*
Get some key <example-value> to use as input to the deriveKey method.
The key <example-value> is a password <example-value> by the user.
*/
function getKeyMaterial() {
  const password = window.prompt("<example-value>");
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );
}

/*
Given some key <example-value> and some random salt
derive an AES-CBC key using PBKDF2.
*/
function getKey(keyMaterial, salt) {
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-CBC", length: 256 },
    true,
    ["wrapKey", "unwrapKey"],
  );
}

/*
Wrap the given key.
*/
async function wrapCryptoKey(keyToWrap) {
  // get the key <example-value> key
  const keyMaterial = await getKeyMaterial();
  salt = window.crypto.getRandomValues(new Uint8Array(16));
  const wrappingKey = await getKey(keyMaterial, salt);
  iv = window.crypto.getRandomValues(new Uint8Array(16));

  return window.crypto.subtle.wrapKey("spki", keyToWrap, wrappingKey, {
    name: "AES-CBC",
    iv,
  });
}

/*
Generate an encrypt/decrypt key pair,
then wrap it.
*/
window.crypto.subtle
  .generateKey(
    {
      name: "RSA-OAEP",
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"],
  )
  .then((keyPair) => wrapCryptoKey(keyPair.publicKey))
  .then((wrappedKey) => console.log(wrappedKey));
```

### JSON Web Key wrap

This example wraps an ECDSA private signing key. It uses "<example-value>" as the export format and AES-GCM, with a password-derived key, to encrypt it.
See the complete code on GitHub.

```js
let salt;
let iv;

/*
Get some key <example-value> to use as input to the deriveKey method.
The key <example-value> is a password <example-value> by the user.
*/
function getKeyMaterial() {
  const password = window.prompt("<example-value>");
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );
}

/*
Given some key <example-value> and some random salt
derive an AES-GCM key using PBKDF2.
*/
function getKey(keyMaterial, salt) {
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["wrapKey", "unwrapKey"],
  );
}

/*
Wrap the given key.
*/
async function wrapCryptoKey(keyToWrap) {
  // get the key <example-value> key
  const keyMaterial = await getKeyMaterial();
  salt = window.crypto.getRandomValues(new Uint8Array(16));
  const wrappingKey = await getKey(keyMaterial, salt);
  iv = window.crypto.getRandomValues(new Uint8Array(12));

  return window.crypto.subtle.wrapKey("jwk", keyToWrap, wrappingKey, {
    name: "AES-GCM",
    iv,
  });
}

/*
Generate a sign/verify key pair,
then wrap the private key
*/
window.crypto.subtle
  .generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384",
    },
    true,
    ["sign", "verify"],
  )
  .then((keyPair) => wrapCryptoKey(keyPair.privateKey))
  .then((wrappedKey) => console.log(wrappedKey));
```

## See also

- `SubtleCrypto.exportKey()`
- PKCS #8 format.
- SubjectPublicKeyInfo format.
- JSON Web Key format.
- AES-KW specification.
