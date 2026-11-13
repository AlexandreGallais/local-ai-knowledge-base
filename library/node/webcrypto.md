---
title: "Web Crypto API (part 1 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webcrypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Crypto API

> Stability: 2 - Stable

Node.js provides an implementation of the Web Crypto API standard.

Use `globalThis.crypto` or `require('node:crypto').webcrypto` to access this
module.

```js
const { subtle } = globalThis.crypto;

(async function() {

  const key = await subtle.generateKey({
    name: 'HMAC',
    hash: 'SHA-256',
    length: 256,
  }, true, ['sign', 'verify']);

  const enc = new TextEncoder();
  const message = enc.encode('I love cupcakes');

  const digest = await subtle.sign({
    name: 'HMAC',
  }, key, message);

})();
```

## Modern Algorithms in the Web Cryptography API

> Stability: 1.1 - Active development

Node.js provides an implementation of the following features from the
Modern Algorithms in the Web Cryptography API
WICG proposal:

Algorithms:

* `'AES-OCB'`[^openssl30]
* `'Argon2d'`[^openssl32]
* `'Argon2i'`[^openssl32]
* `'Argon2id'`[^openssl32]
* `'ChaCha20-Poly1305'`
* `'cSHAKE128'`
* `'cSHAKE256'`
* `'KMAC128'`[^openssl30]
* `'KMAC256'`[^openssl30]
* `'KT128'`
* `'KT256'`
* `'ML-DSA-44'`[^openssl35]
* `'ML-DSA-65'`[^openssl35]
* `'ML-DSA-87'`[^openssl35]
* `'ML-KEM-512'`[^openssl35]
* `'ML-KEM-768'`[^openssl35]
* `'ML-KEM-1024'`[^openssl35]
* `'MLKEM768-P256'`[^openssl35]
* `'MLKEM768-X25519'`[^openssl35]
* `'MLKEM1024-P384'`[^openssl35]
* `'SHA3-256'`
* `'SHA3-384'`
* `'SHA3-512'`
* `'TurboSHAKE128'`
* `'TurboSHAKE256'`

Key Formats:

* `'raw-public'`
* `'raw-secret'`
* `'raw-seed'`

Methods:

* `subtle.decapsulateBits()`
* `subtle.decapsulateKey()`
* `subtle.encapsulateBits()`
* `subtle.encapsulateKey()`
* `subtle.getPublicKey()`
* `SubtleCrypto.supports()`

## Secure Curves in the Web Cryptography API

> Stability: 1.1 - Active development

Node.js provides an implementation of the following features from the
Secure Curves in the Web Cryptography API
WICG proposal:

Algorithms:

* `'Ed448'`
* `'X448'`

## Examples

### Generating keys

The {SubtleCrypto} class can be used to generate symmetric (secret) keys
or asymmetric key pairs (public key and private key).

#### AES keys

```js
const { subtle } = globalThis.crypto;

async function generateAesKey(length = 256) {
  const key = await subtle.generateKey({
    name: 'AES-CBC',
    length,
  }, true, ['encrypt', 'decrypt']);

  return key;
}
```

#### ECDSA key pairs

```js
const { subtle } = globalThis.crypto;

async function generateEcKey(namedCurve = 'P-521') {
  const {
    publicKey,
    privateKey,
  } = await subtle.generateKey({
    name: 'ECDSA',
    namedCurve,
  }, true, ['sign', 'verify']);

  return { publicKey, privateKey };
}
```

#### Ed25519/X25519 key pairs

```js
const { subtle } = globalThis.crypto;

async function generateEd25519Key() {
  return subtle.generateKey({
    name: 'Ed25519',
  }, true, ['sign', 'verify']);
}

async function generateX25519Key() {
  return subtle.generateKey({
    name: 'X25519',
  }, true, ['deriveKey']);
}
```

#### HMAC keys

```js
const { subtle } = globalThis.crypto;

async function generateHmacKey(hash = 'SHA-256') {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return key;
}
```

#### RSA key pairs

```js
const { subtle } = globalThis.crypto;
const publicExponent = new Uint8Array([1, 0, 1]);

async function generateRsaKey(modulusLength = 2048, hash = 'SHA-256') {
  const {
    publicKey,
    privateKey,
  } = await subtle.generateKey({
    name: 'RSASSA-PKCS1-v1_5',
    modulusLength,
    publicExponent,
    hash,
  }, true, ['sign', 'verify']);

  return { publicKey, privateKey };
}
```

### Encryption and decryption

```js
const crypto = globalThis.crypto;

async function aesEncrypt(plaintext) {
  const ec = new TextEncoder();
  const key = await generateAesKey();
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const ciphertext = await crypto.subtle.encrypt({
    name: 'AES-CBC',
    iv,
  }, key, ec.encode(plaintext));

  return {
    key,
    iv,
    ciphertext,
  };
}

async function aesDecrypt(ciphertext, key, iv) {
  const dec = new TextDecoder();
  const plaintext = await crypto.subtle.decrypt({
    name: 'AES-CBC',
    iv,
  }, key, ciphertext);

  return dec.decode(plaintext);
}
```

### Exporting and importing keys

```js
const { subtle } = globalThis.crypto;

async function generateAndExportHmacKey(format = 'jwk', hash = 'SHA-512') {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return subtle.exportKey(format, key);
}

async function importHmacKey(keyData, format = 'jwk', hash = 'SHA-512') {
  const key = await subtle.importKey(format, keyData, {
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return key;
}
```

### Wrapping and unwrapping keys

```js
const { subtle } = globalThis.crypto;

async function generateAndWrapHmacKey(format = 'jwk', hash = 'SHA-512') {
  const [
    key,
    wrappingKey,
  ] = await Promise.all([
    subtle.generateKey({
      name: 'HMAC', hash,
    }, true, ['sign', 'verify']),
    subtle.generateKey({
      name: 'AES-KW',
      length: 256,
    }, true, ['wrapKey', 'unwrapKey']),
  ]);

  const wrappedKey = await subtle.wrapKey(format, key, wrappingKey, 'AES-KW');

  return { wrappedKey, wrappingKey };
}

async function unwrapHmacKey(
  wrappedKey,
  wrappingKey,
  format = 'jwk',
  hash = 'SHA-512') {

  const key = await subtle.unwrapKey(
    format,
    wrappedKey,
    wrappingKey,
    'AES-KW',
    { name: 'HMAC', hash },
    true,
    ['sign', 'verify']);

  return key;
}
```

### Sign and verify

```js
const { subtle } = globalThis.crypto;

async function sign(key, data) {
  const ec = new TextEncoder();
  const signature =
    await subtle.sign('RSASSA-PKCS1-v1_5', key, ec.encode(data));
  return signature;
}

async function verify(key, signature, data) {
  const ec = new TextEncoder();
  const verified =
    await subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      signature,
      ec.encode(data));
  return verified;
}
```

### Deriving bits and keys

```js
const { subtle } = globalThis.crypto;

async function pbkdf2(pass, salt, iterations = 1000, length = 256) {
  const ec = new TextEncoder();
  const key = await subtle.importKey(
    'raw',
    ec.encode(pass),
    'PBKDF2',
    false,
    ['deriveBits']);
  const bits = await subtle.deriveBits({
    name: 'PBKDF2',
    hash: 'SHA-512',
    salt: ec.encode(salt),
    iterations,
  }, key, length);
  return bits;
}

async function pbkdf2Key(pass, salt, iterations = 1000, length = 256) {
  const ec = new TextEncoder();
  const keyMaterial = await subtle.importKey(
    'raw',
    ec.encode(pass),
    'PBKDF2',
    false,
    ['deriveKey']);
  const key = await subtle.deriveKey({
    name: 'PBKDF2',
    hash: 'SHA-512',
    salt: ec.encode(salt),
    iterations,
  }, keyMaterial, {
    name: 'AES-GCM',
    length,
  }, true, ['encrypt', 'decrypt']);
  return key;
}
```

### Digest

```js
const { subtle } = globalThis.crypto;

async function digest(data, algorithm = 'SHA-512') {
  const ec = new TextEncoder();
  const digest = await subtle.digest(algorithm, ec.encode(data));
  return digest;
}
```

### Checking for runtime algorithm support

`SubtleCrypto.supports()` allows feature detection in Web Crypto API,
which can be used to detect whether a given algorithm identifier
(including its parameters) is supported for the given operation.

This example derives a key from a password using Argon2, if available,
or PBKDF2, otherwise; and then encrypts and decrypts some text with it
using AES-OCB, if available, and AES-GCM, otherwise.

```mjs
const { SubtleCrypto, crypto } = globalThis;

const password = 'correct horse battery staple';
const derivationAlg =
  SubtleCrypto.supports?.('importKey', 'Argon2id') ?
    'Argon2id' :
    'PBKDF2';
const encryptionAlg =
  SubtleCrypto.supports?.('importKey', 'AES-OCB') ?
    'AES-OCB' :
    'AES-GCM';
const passwordKey = await crypto.subtle.importKey(
  derivationAlg === 'Argon2id' ? 'raw-secret' : 'raw',
  new TextEncoder().encode(password),
  derivationAlg,
  false,
  ['deriveKey'],
);
const nonce = crypto.getRandomValues(new Uint8Array(16));
const derivationParams =
  derivationAlg === 'Argon2id' ?
    {
      nonce,
      parallelism: 4,
      memory: 2 ** 21,
      passes: 1,
    } :
    {
      salt: nonce,
      iterations: 100_000,
      hash: 'SHA-256',
    };
const key = await crypto.subtle.deriveKey(
  {
    name: derivationAlg,
    ...derivationParams,
  },
  passwordKey,
  {
    name: encryptionAlg,
    length: 256,
  },
  false,
  ['encrypt', 'decrypt'],
);
const plaintext = 'Hello, world!';
const iv = crypto.getRandomValues(new Uint8Array(12));
const encrypted = await crypto.subtle.encrypt(
  { name: encryptionAlg, iv },
  key,
  new TextEncoder().encode(plaintext),
);
const decrypted = new TextDecoder().decode(await crypto.subtle.decrypt(
  { name: encryptionAlg, iv },
  key,
  encrypted,
));
```

## Algorithm support

The following sections detail the algorithms supported by the Node.js Web
Crypto API implementation and the APIs supported for each:

### Key Management APIs

* `subtle.generateKey()`, `subtle.exportKey()`, and
  `subtle.importKey()` support `'AES-CBC'`, `'AES-CTR'`, `'AES-GCM'`,
  `'AES-KW'`, `'AES-OCB'`, `'ChaCha20-Poly1305'`[^modern-algos], `'HMAC'`,
  `'KMAC128'`[^modern-algos], and `'KMAC256'`[^modern-algos].
* `subtle.importKey()` supports `'Argon2d'`, `'Argon2i'`, `'Argon2id'`,
  `'HKDF'`, and `'PBKDF2'`.
* `subtle.generateKey()`, `subtle.exportKey()`,
  `subtle.importKey()`, and `subtle.getPublicKey()` support `'ECDH'`,
  `'ECDSA'`, `'Ed25519'`, `'Ed448'`[^secure-curves],
  `'ML-DSA-44'`[^modern-algos], `'ML-DSA-65'`[^modern-algos],
  `'ML-DSA-87'`[^modern-algos], `'ML-KEM-512'`[^modern-algos],
  `'ML-KEM-768'`[^modern-algos], `'ML-KEM-1024'`[^modern-algos],
  `'MLKEM768-P256'`[^modern-algos], `'MLKEM768-X25519'`[^modern-algos],
  `'MLKEM1024-P384'`[^modern-algos], `'RSA-OAEP'`, `'RSA-PSS'`,
  `'RSASSA-PKCS1-v1_5'`, `'X25519'`, and `'X448'`[^secure-curves].

### Crypto Operation APIs

* `subtle.encrypt()` and `subtle.decrypt()` support `'AES-CBC'`,
  `'AES-CTR'`, `'AES-GCM'`, `'AES-OCB'`,
  `'ChaCha20-Poly1305'`[^modern-algos], and `'RSA-OAEP'`.
* `subtle.sign()` and `subtle.verify()` support `'ECDSA'`, `'Ed25519'`,
  `'Ed448'`[^secure-curves], `'HMAC'`, `'KMAC128'`[^modern-algos],
  `'KMAC256'`[^modern-algos], `'ML-DSA-44'`[^modern-algos],
  `'ML-DSA-65'`[^modern-algos], `'ML-DSA-87'`[^modern-algos], `'RSA-PSS'`, and
  `'RSASSA-PKCS1-v1_5'`.
* `subtle.deriveBits()` and `subtle.deriveKey()` support `'Argon2d'`,
  `'Argon2i'`, `'Argon2id'`, `'ECDH'`, `'HKDF'`, `'PBKDF2'`, `'X25519'`, and
  `'X448'`[^secure-curves].
* `subtle.wrapKey()` and `subtle.unwrapKey()` support `'AES-CBC'`,
  `'AES-CTR'`, `'AES-GCM'`, `'AES-KW'`, `'AES-OCB'`,
  `'ChaCha20-Poly1305'`[^modern-algos], and `'RSA-OAEP'`.
* `subtle.encapsulateBits()`, `subtle.decapsulateBits()`,
  `subtle.encapsulateKey()`, and `subtle.decapsulateKey()` support
  `'ML-KEM-512'`[^modern-algos], `'ML-KEM-768'`[^modern-algos],
  `'ML-KEM-1024'`[^modern-algos], `'MLKEM768-P256'`[^modern-algos],
  `'MLKEM768-X25519'`[^modern-algos], and
  `'MLKEM1024-P384'`[^modern-algos].
* `subtle.digest()` supports `'cSHAKE128'`[^modern-algos],
  `'cSHAKE256'`[^modern-algos], `'KT128'`[^modern-algos],
  `'KT256'`[^modern-algos], `'SHA-1'`, `'SHA-256'`, `'SHA-384'`, `'SHA-512'`,
  `'SHA3-256'`[^modern-algos], `'SHA3-384'`[^modern-algos],
  `'SHA3-512'`[^modern-algos], `'TurboSHAKE128'`[^modern-algos], and
  `'TurboSHAKE256'`[^modern-algos].

### Key Formats

The following list describes the formats supported by `subtle.importKey()`
and `subtle.exportKey()`.

* **`'AES-CBC'`, `'AES-CTR'`, `'AES-GCM'`, `'AES-KW'`, and `'HMAC'`** can
  be imported and exported using `'jwk'`, `'raw'`, and
  `'raw-secret'`[^modern-algos].
* **`'AES-OCB'`[^modern-algos], `'ChaCha20-Poly1305'`[^modern-algos],
  `'KMAC128'`[^modern-algos], and `'KMAC256'`[^modern-algos]** can be imported
  and exported using `'jwk'` and `'raw-secret'`[^modern-algos].
* **`'Argon2d'`[^modern-algos], `'Argon2i'`[^modern-algos], and
  `'Argon2id'`[^modern-algos]** can be imported using
  `'raw-secret'`[^modern-algos]; export is not supported.
* **`'ECDH'`, `'ECDSA'`, `'Ed25519'`, `'Ed448'`[^secure-curves], `'X25519'`,
  and `'X448'`[^secure-curves]** can be imported and exported using `'spki'`,
  `'pkcs8'`, `'jwk'`, `'raw'`, and `'raw-public'`[^modern-algos].
* **`'HKDF'` and `'PBKDF2'`** can be imported using `'raw'` and
  `'raw-secret'`[^modern-algos]; export is not supported.
* **`'ML-DSA-44'`[^modern-algos], `'ML-DSA-65'`[^modern-algos],
  `'ML-DSA-87'`[^modern-algos], `'ML-KEM-512'`[^modern-algos],
  `'ML-KEM-768'`[^modern-algos], and `'ML-KEM-1024'`[^modern-algos]** can be
  imported and exported using `'spki'`, `'pkcs8'`, `'jwk'`,
  `'raw-public'`[^modern-algos], and `'raw-seed'`[^modern-algos].
* **`'MLKEM768-P256'`[^modern-algos],
  `'MLKEM768-X25519'`[^modern-algos], and
  `'MLKEM1024-P384'`[^modern-algos]** can be imported and exported using
  `'jwk'`, `'raw-public'`[^modern-algos], and `'raw-seed'`[^modern-algos].
* **`'RSA-OAEP'`, `'RSA-PSS'`, and `'RSASSA-PKCS1-v1_5'`** can be imported
  and exported using `'spki'`, `'pkcs8'`, and `'jwk'`.

## Class: `Crypto`

`globalThis.crypto` is an instance of the `Crypto`
class. `Crypto` is a singleton that provides access to the remainder of the
crypto API.

### `crypto.subtle`

* Type: {SubtleCrypto}

Provides access to the `SubtleCrypto` API.

### `crypto.getRandomValues(typedArray)`

* `typedArray` {Buffer|TypedArray}
* Returns: {Buffer|TypedArray}

Generates cryptographically strong random values. The given `typedArray` is
filled with random values, and a reference to `typedArray` is returned.

The given `typedArray` must be an integer-based instance of {TypedArray},
i.e. `Float32Array` and `Float64Array` are not accepted.

An error will be thrown if the given `typedArray` is larger than 65,536 bytes.

### `crypto.randomUUID()`

* Returns: {string}

Generates a random RFC 4122 version 4 UUID. The UUID is generated using a
cryptographic pseudorandom number generator.
